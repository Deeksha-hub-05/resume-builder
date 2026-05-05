import { Mail, Phone, MapPin, Link as LinkIcon, Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const MinimalTemplate = ({ data, accentColor }) => {

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    // ✅ Fix URL (important)
    const formatUrl = (url) => {
        if (!url) return "#";
        return url.startsWith("http") ? url : `https://${url}`;
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">

            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-sm mb-4 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-4 text-[12px] text-gray-600">

                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail size={14} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}

                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone size={14} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}

                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}

                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <FaLinkedin size={14} />
                            <a
                                href={formatUrl(data.personal_info.linkedin)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline break-all"
                            >
                                LinkedIn
                            </a>
                        </div>
                    )}

                    {data.personal_info?.github && (
                        <div className="flex items-center gap-1">
                            <FaGithub size={14} />
                            <a
                                href={formatUrl(data.personal_info.github)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline break-all"
                            >
                                GitHub
                            </a>
                        </div>
                    )}

                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe size={14} />
                            <a
                                href={formatUrl(data.personal_info.website)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline break-all"
                            >
                                Website
                            </a>
                        </div>
                    )}

                </div>
            </header>

            {/* Summary */}
            {data.professional_summary && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Professional Summary
                    </h2>
                    <p className="text-gray-700 text-[10px]">{data.professional_summary}</p>
                </section>
            )}

            {/* Skills */}
            {data.skills && (
                <section>
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Skills
                    </h2>

                    {data.skills.technical?.length > 0 && (
                        <div className="mb-2">
                            <p className="font-medium text-[12px]">Technical:</p>
                            <p className="text-[10px]">{data.skills.technical.join(" • ")}</p>
                        </div>
                    )}

                    {data.skills.soft?.length > 0 && (
                        <div>
                            <p className="font-medium text-[12px]">Soft:</p>
                            <p className="text-[10px]">{data.skills.soft.join(" • ")}</p>
                        </div>
                    )}
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section className="mb-10 mt-[20px]">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    {data.experience.map((exp, index) => (
                        <div key={index} className="mb-6 text-[10px]">
                            <div className="flex justify-between">
                                <h3 className="text-[12px] font-medium">{exp.position}</h3>
                                <span className="text-gray-500">
                                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                </span>
                            </div>
                            <p className="text-gray-600">{exp.company}</p>

                            {exp.description && (
                                <ul className="list-disc ml-5 mt-2 text-gray-700">
                                    {exp.description.split("\n").map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {data.projects?.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    {data.projects.map((proj, index) => (
                        <div key={index} className="mb-4 text-[10px]">
                            <h3 className="text-[12px] font-medium">{proj.name}</h3>

                            {proj.description && (
                                <ul className="list-disc ml-5 text-gray-700">
                                    {proj.description.split("\n").map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Education
                    </h2>

                    {data.education.map((edu, index) => (
                        <div key={index} className="flex justify-between text-[10px] mb-3">
                            <div>
                                <h3 className="font-medium">
                                    {edu.degree} {edu.field && `in ${edu.field}`}
                                </h3>
                                <p className="text-gray-600">{edu.institution}</p>
                                {edu.gpa && <p className="text-gray-500">GPA: {edu.gpa}</p>}
                            </div>

                            <span className="text-gray-500">
                                {formatDate(edu.graduation_date)}
                            </span>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default MinimalTemplate;