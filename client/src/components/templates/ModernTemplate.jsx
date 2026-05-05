import { Mail, Phone, MapPin, Link as LinkIcon, Globe } from "lucide-react";
import { IoLogoGithub } from "react-icons/io5";

const ModernTemplate = ({ data, accentColor }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  // ✅ SAFE SKILLS EXTRACTION
  const skills = data.skills || {};
  const technical = Array.isArray(skills.technical) ? skills.technical : [];
  const soft = Array.isArray(skills.soft) ? skills.soft : [];

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800">

      {/* Header */}
      <header className="p-8 text-white bg-black" style={{ backgroundColor: accentColor }}>
        <h1 className="text-4xl font-light mb-3 bg-">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">

          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} stroke="white" />
              <a href={`mailto:${data.personal_info.email}`} className="hover:underline">
                {data.personal_info.email}
              </a>
            </div>
          )}

          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} stroke="white" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}

          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} stroke="white" />
              <span>{data.personal_info.location}</span>
            </div>
          )}

          {data.personal_info?.linkedin && (
            <a
              href={formatUrl(data.personal_info.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <LinkIcon size={16} stroke="white" />
              <span className="break-all text-xs">
                {data.personal_info.linkedin.replace(/^https?:\/\//, "")}
              </span>
            </a>
          )}

          {data.personal_info?.github && (
            <a
              href={formatUrl(data.personal_info.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <IoLogoGithub size={16} color="white" />
              <span className="break-all text-xs">
                {data.personal_info.github.replace(/^https?:\/\//, "")}
              </span>
            </a>
          )}

          {data.personal_info?.website && (
            <a
              href={formatUrl(data.personal_info.website)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <Globe size={16} stroke="white" />
              <span className="break-all text-xs">
                {data.personal_info.website.replace(/^https?:\/\//, "")}
              </span>
            </a>
          )}
        </div>
      </header>

      <div className="p-8">

        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b">
              Professional Summary
            </h2>
            <p>{data.professional_summary}</p>
          </section>
        )}

        {/* ✅ SKILLS (FIXED) */}
        {(technical.length > 0 || soft.length > 0) && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b">
              Skills
            </h2>

            {technical.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium">Technical</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {technical.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-black rounded-full text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {soft.length > 0 && (
              <div>
                <h3 className="text-sm font-medium">Soft</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {soft.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-black rounded-full text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b">
              Experience
            </h2>

            {data.experience.map((exp, i) => (
              <div key={i} className="pl-6 border-l border-gray-200 mb-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{exp.position}</h3>
                    <p style={{ color: accentColor }}>{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                {exp.description && (
                  <p className="mt-2 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b">
              Projects
            </h2>

            {data.projects.map((p, i) => (
              <div key={i} className="pl-6 border-l mb-4" style={{ borderColor: accentColor }}>
                <h3 className="font-medium">{p.name}</h3>
                {p.description && <p className="text-sm mt-2">{p.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section>
            <h2 className="text-2xl font-light mb-6 pb-2 border-b">
              Education
            </h2>

            {data.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p style={{ color: accentColor }}>{edu.institution}</p>
                <span className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </section>
        )}

      </div>
    </div>
  );
};

export default ModernTemplate;