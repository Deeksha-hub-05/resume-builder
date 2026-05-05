import ai from "../config/ai.js";
import Resume from "../models/Resume.js";

export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an expert resume writing assistant. Enhance the professional summary in 1-2 sentences highlighting key skills, experience, and goals. Make it ATS-friendly. Return ONLY the text.'
                },
                {
                    role: 'user',
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: 'system',
                    content:
                        "Enhance the job description in 1-2 sentences using action verbs and measurable impact. Make it ATS-friendly. Return ONLY text."
                },
                {
                    role: 'user',
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const systemPrompt = "You are an expert AI that extracts structured data from resumes.";

        const userPrompt = `
Extract structured data from this resume:

${resumeText}

Return ONLY valid JSON in this format:

{
  "professional_summary": "",
  "skills": {
    "technical": [],
    "soft": []
  },
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "projects": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}
`;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            response_format: { type: 'json_object' }
        });

        const extractedData = response.choices[0].message.content;

        let parsedData;
        try {
            parsedData = JSON.parse(extractedData);
        } catch (err) {
            return res.status(400).json({ message: "Invalid AI response format" });
        }

        // ✅ Normalize skills safely
        if (!parsedData.skills) {
            parsedData.skills = { technical: [], soft: [] };
        } else if (Array.isArray(parsedData.skills)) {
            parsedData.skills = {
                technical: parsedData.skills,
                soft: []
            };
        } else {
            parsedData.skills = {
                technical: parsedData.skills.technical || [],
                soft: parsedData.skills.soft || []
            };
        }

        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData
        });

        res.json({ resumeId: newResume._id });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};