import { FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

const MinimalImageTemplate = ({ data, accentColor }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // ✅ FIX: Ensure proper URLs
  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };
  const projects = Array.isArray(data.projects) ? data.projects : [];

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800 shadow-lg">
      <div className="grid grid-cols-3">

        {/* IMAGE */}
        <div className="col-span-1 py-10">
          {data.personal_info?.image && (
            <div className="mb-6">
              <img
                src={
                  typeof data.personal_info.image === "string"
                    ? data.personal_info.image
                    : URL.createObjectURL(data.personal_info.image)
                }
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto border-2"
                style={{ borderColor: accentColor }}
              />
            </div>
          )}
        </div>

        {/* NAME */}
        <div className="col-span-2 flex flex-col justify-center py-10 px-8">
          <h1 className="text-4xl font-bold tracking-widest">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          <p className="uppercase text-zinc-600 text-sm tracking-widest">
            {data.personal_info?.profession || "Profession"}
          </p>
        </div>

        {/* SIDEBAR */}
        <aside className="col-span-1 border-r border-zinc-300 p-6 pt-0">

          {/* CONTACT */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
              CONTACT
            </h2>

            <div className="space-y-3 text-sm">

              {data.personal_info?.phone && (
                <div className="flex items-center gap-3">
                  <FaPhone size={18} className="text-gray-700" />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}

              {data.personal_info?.email && (
                <div className="flex items-center gap-3">
                <IoMail size={18} style={{ color: "#374151" }} />
                  <span>{data.personal_info.email}</span>
                </div>
              )}

              {data.personal_info?.location && (
                <div className="flex items-center gap-3">
                  <MdLocationOn size={18} className="text-gray-700" />
                  <span>{data.personal_info.location}</span>
                </div>
              )}

              {data.personal_info?.linkedin && (
                <div className="flex items-center gap-3">
                  <FaLinkedin size={18} className="text-gray-700" />
                  <a
                    href={formatUrl(data.personal_info.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all hover:underline"
                  >
                    {data.personal_info.linkedin}
                  </a>
                </div>
              )}

              {data.personal_info?.github && (
                <div className="flex items-center gap-3">
                  <FaGithub size={18} className="text-gray-700" />
                  <a
                    href={formatUrl(data.personal_info.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline break-all"
                  >
                    {data.personal_info.github}
                  </a>
                </div>
              )}

            </div>
          </section>

          {/* SKILLS */}
          {(data.skills?.technical?.length > 0 || data.skills?.soft?.length > 0) && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-2">
                SKILLS
              </h2>

              {data.skills.technical?.length > 0 && (
                <>
                  <p className="font-medium text-sm">Technical</p>
                  <ul className="mb-2 text-sm list-disc list-inside">
                    {data.skills.technical.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </>
              )}

              {data.skills.soft?.length > 0 && (
                <>
                  <p className="font-medium text-sm">Soft</p>
                  <ul className="text-sm list-disc list-inside">
                    {data.skills.soft.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}

          {/* EDUCATION */}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                EDUCATION
              </h2>

              <div className="space-y-3 text-sm">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <p className="font-semibold uppercase">{edu.degree}</p>
                    <p className="text-zinc-600">{edu.institution}</p>
                    <p className="text-xs text-zinc-500">
                      {formatDate(edu.graduation_date)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </aside>

        {/* MAIN CONTENT */}
        <main className="col-span-2 p-8 pt-0">

          {/* SUMMARY */}
          {data.professional_summary && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest mb-3" style={{ color: accentColor }}>
                SUMMARY
              </h2>
              <p className="leading-relaxed">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* EXPERIENCE */}
          {data.experience?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest mb-4" style={{ color: accentColor }}>
                EXPERIENCE
              </h2>

              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <span className="text-xs text-zinc-500">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>

                    <p className="text-sm mb-2" style={{ color: accentColor }}>
                      {exp.company}
                    </p>

                    {exp.description && (
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {exp.description.split("\n").map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
           {projects.length > 0 && (
  <section>
    <h2
      className="text-sm uppercase tracking-widest font-semibold mb-3"
      style={{ color: accentColor }}
    >
      PROJECTS
    </h2>

    <div className="space-y-4">
      {projects.map((project, i) => (
        <div key={i}>
          
          {/* Project Name */}
          <h3 className="text-md font-medium">
            {project.name || "Untitled Project"}
          </h3>

          {/* Project Type */}
          {project.type && (
            <p
              className="text-sm mb-1"
              style={{ color: accentColor }}
            >
              {project.type}
            </p>
          )}

          {/* Description */}
          {project.description && (
            <ul className="list-disc list-inside text-sm space-y-1">
              {project.description
                .split("\n")
                .filter(line => line.trim() !== "")
                .map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
            </ul>
          )}

        </div>
      ))}
    </div>
  </section>
)}

        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;