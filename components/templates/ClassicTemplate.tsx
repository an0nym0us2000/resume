import { TemplateProps } from '@/types/template';

export function ClassicTemplate({ data, style }: TemplateProps) {
  const colors = style?.colors || {
    primary: '#1e293b',
    secondary: '#64748b',
    accent: '#0f172a',
    text: '#1e293b',
    background: '#ffffff',
  };

  return (
    <div
      className="resume-template w-full bg-white p-8 shadow-lg"
      style={{ color: colors.text, fontFamily: 'Georgia, serif' }}
    >
      {/* Header */}
      {data.personalInfo && (
        <div className="mb-6 text-center">
          <h1
            className="text-3xl font-bold"
            style={{ color: colors.primary }}
          >
            {data.personalInfo.fullName || 'Your Name'}
          </h1>

          <div className="mt-2 text-sm" style={{ color: colors.secondary }}>
            {[
              data.personalInfo.email,
              data.personalInfo.phone,
              data.personalInfo.location,
              data.personalInfo.linkedin,
            ]
              .filter(Boolean)
              .join(' • ')}
          </div>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2
            className="mb-2 border-b pb-1 text-lg font-semibold"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <div className="mb-5">
          <h2
            className="mb-2 border-b pb-1 text-lg font-semibold"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-3">
            {data.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-sm italic" style={{ color: colors.secondary }}>
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right text-sm" style={{ color: colors.secondary }}>
                    <div>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                    {exp.location && <div>{exp.location}</div>}
                  </div>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
                    {exp.bullets.map((bullet, idx) => (
                      bullet && <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-5">
          <h2
            className="mb-2 border-b pb-1 text-lg font-semibold"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            EDUCATION
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-sm" style={{ color: colors.secondary }}>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                    {edu.gpa && ` - GPA: ${edu.gpa}`}
                  </p>
                </div>
                <div className="text-sm" style={{ color: colors.secondary }}>
                  {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-5">
          <h2
            className="mb-2 border-b pb-1 text-lg font-semibold"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            SKILLS
          </h2>
          <div className="space-y-1">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-sm">
                <span className="font-semibold">{skill.category}:</span>{' '}
                <span>{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-5">
          <h2
            className="mb-2 border-b pb-1 text-lg font-semibold"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            PROJECTS
          </h2>
          <div className="space-y-2">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-xs italic" style={{ color: colors.secondary }}>
                    Technologies: {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
