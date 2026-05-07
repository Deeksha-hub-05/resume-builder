import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";
import {IoLogoGithub} from 'react-icons/io5'

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
            {/* Header */}
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-xl font-bold mb-2" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex text-[12px] flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                    <div className="flex items-center gap-1">
                       <Link className="size-4" />
                      <a
                         href={data.personal_info.linkedin}
                         target="_blank"
                          rel="noopener noreferrer"
                         className="break-all hover:underline"
                       >
                       {data.personal_info.linkedin}
                     </a>
                 </div>
                  )}

                 {data.personal_info?.website && (
                 <div className="flex items-center gap-1">
                 <Globe className="size-4" />
                  <a
                 href={data.personal_info.website}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="break-all hover:underline"
                >
                 {data.personal_info.website}
                 </a> 
               </div>
                )}

         {data.personal_info?.github && (
         <div className="flex items-center gap-1">
          <IoLogoGithub className="size-4" />
               <a
                href={data.personal_info.github}
               target="_blank"
               rel="noopener noreferrer"
            className="break-all hover:underline"
            >
            {data.personal_info.github}
              </a>
              </div>
                )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="text-sm font-semibold mb-3" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 text-[10px] leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

           
              {/* Skills */}
            {data.skills && (
  <section className="mb-6">
    <h2 className="text-sm font-semibold mb-4" style={{ color: accentColor }}>
      SKILLS
    </h2>

    {data.skills.technical?.length > 0 && (
      <div className="mb-2">
        <h3 className="font-medium text-[14px]">Technical Skills</h3>
        <div className="flex flex-wrap gap-2 text-[10px]">
          {data.skills.technical.map((skill, i) => (
            <span key={i}>• {skill}</span>
          ))}
        </div>
      </div>
    )}

    {data.skills.soft?.length > 0 && (
      <div>
        <h3 className="font-medium text-[14px]">Soft Skills</h3>
        <div className="flex flex-wrap gap-2 text-[10px]">
          {data.skills.soft.map((skill, i) => (
            <span key={i}>• {skill}</span>
          ))}
        </div>
      </div>
    )}
  </section>
)}



           {/* Projects */}
{/* Projects */}
{data.projects && data.projects.length > 0 && (
    <section className="mb-6">
        <h2
            className="text-sm font-semibold mb-4"
            style={{ color: accentColor }}
        >
            PROJECTS
        </h2>

        <ul className="space-y-3">
            {data.projects.map((proj, index) => (
                <div
                    key={index}
                    className="flex justify-between items-start border-l-3 border-gray-300 pl-6"
                >
                    <div>
                        {/* Title + Link */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <li className="font-semibold text-[14px] text-gray-800">
                                {proj.name}
                            </li>

                            {proj.link && (
                                <a
                                    href={proj.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 text-[11px] underline"
                                >
                                    Live Link
                                </a>
                            )}
                        </div>

                        {/* Description */}
                        <ul className="list-disc pl-5 text-black-600 text-[10px] space-y-1 mt-1">
                            {proj.description
                                ?.split('\n')
                                .map(
                                    (point, i) =>
                                        point.trim() && (
                                            <li key={i}>{point}</li>
                                        )
                                )}
                        </ul>
                    </div>
                </div>
            ))}
        </ul>
    </section>
)}
  {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-semibold mb-4" style={{ color: accentColor }}>
                        CERTIFICATIONS
                    </h2>

                    <div className="space-y-4 text-[10px]">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                        <p className="text-gray-700 font-medium">{exp.company}</p>
                                    </div>
                                    <div className="text-right text-[10px] text-gray-600">
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-semibold mb-4" style={{ color: accentColor }}>
                        EDUCATION
                    </h2>

                    <div className="space-y-3 text-[10px]">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-700">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                                </div>
                                <div className="text-sm text-gray-600 text-[10px]">
                                    <p>{formatDate(edu.graduation_date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

          
        </div>
    );
}

export default ClassicTemplate;