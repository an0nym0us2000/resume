import { TemplateProps } from '@/types/template';

export function TwoColumnTemplate({ data, style }: TemplateProps) {
  const colors = style?.colors || {
    primary: '#0ea5e9',
    secondary: '#64748b',
    accent: '#06b6d4',
    text: '#1e293b',
    background: '#f8fafc',
  };

  return (
    <div
      className="resume-template flex w-full bg-white shadow-lg"
      style={{ color: colors.text, fontFamily: 'Inter, sans-serif' }}
    >
      {/* Left Column - Sidebar */}
      <div
        className="w-1/3 p-6"
        style={{ backgroundColor: colors.background }}
      >
        {/* Personal Info */}
        {data.personalInfo && (
          <div className="mb-6">
            <h1
              className="text-2xl font-bold leading-tight"
              style={{ color: colors.primary }}
            >
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
          </div>
        )}

        {/* Contact */}
        {data.personalInfo && (
          <div className="mb-6">
            <h2
              className="mb-2 text-sm font-semibold uppercase"
              style={{ color: colors.primary }}
            >
              Contact
            </h2>
            <div className="space-y-1 text-xs">
              {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
              {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
              {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
              {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
              {data.personalInfo.github && <p>{data.personalInfo.github}</p>}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h2
              className="mb-2 text-sm font-semibold uppercase"
              style={{ color: colors.primary }}
            >
              Skills
            </h2>
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-xs font-semibold">{skill.category}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {skill.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="rounded px-2 py-0.5 text-xs"
                        style={{
                          backgroundColor: colors.primary + '20',
                          color: colors.primary,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-6">
            <h2
              className="mb-2 text-sm font-semibold uppercase"
              style={{ color: colors.primary }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <p className="font-semibold">{edu.institution}</p>
                  <p style={{ color: colors.secondary }}>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </p>
                  {edu.endDate && (
                    <p style={{ color: colors.secondary }}>{edu.endDate}</p>
                  )}
                  {edu.gpa && (
                    <p style={{ color: colors.secondary }}>GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Main Content */}
      <div className="w-2/3 p-6">
        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2
              className="mb-2 text-sm font-semibold uppercase"
              style={{ color: colors.primary }}
            >
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience && data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2
              className="mb-3 text-sm font-semibold uppercase"
              style={{ color: colors.primary }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-sm" style={{ color: colors.secondary }}>
                        {exp.company}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    <div className="text-xs" style={{ color: colors.secondary }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm">
                      {exp.bullets.map((bullet, idx) => (
                        bullet && (
                          <li key={idx} className="flex gap-2">
                            <span style={{ color: colors.accent }}>▪</span>
                            <span>{bullet}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-6">
            <h2
              className="mb-3 text-sm font-semibold uppercase"
              style={{ color: colors.primary }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-semibold">{project.name}</h3>
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-xs" style={{ color: colors.secondary }}>
                      {project.technologies.join(', ')}
                    </p>
                  )}
                  <p className="mt-1 text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
