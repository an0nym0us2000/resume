import { TemplateProps } from '@/types/template';

export function MinimalTemplate({ data, style }: TemplateProps) {
  const colors = style?.colors || {
    primary: '#000000',
    secondary: '#666666',
    accent: '#000000',
    text: '#000000',
    background: '#ffffff',
  };

  return (
    <div
      className="resume-template w-full bg-white p-8 shadow-lg"
      style={{ color: colors.text, fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
      {/* Header */}
      {data.personalInfo && (
        <div className="mb-8">
          <h1
            className="text-5xl font-light tracking-tight"
            style={{ color: colors.primary }}
          >
            {data.personalInfo.fullName || 'Your Name'}
          </h1>

          <div className="mt-3 space-x-3 text-xs" style={{ color: colors.secondary }}>
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>•</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>•</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: colors.primary }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            {data.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-sm" style={{ color: colors.secondary }}>
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right text-xs" style={{ color: colors.secondary }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm">
                    {exp.bullets.map((bullet, idx) => (
                      bullet && (
                        <li key={idx} className="flex gap-2">
                          <span>—</span>
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

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: colors.primary }}
          >
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-medium">{edu.institution}</h3>
                  <p className="text-sm" style={{ color: colors.secondary }}>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </p>
                </div>
                {edu.endDate && (
                  <div className="text-xs" style={{ color: colors.secondary }}>
                    {edu.endDate}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h2
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: colors.primary }}
          >
            Skills
          </h2>
          <div className="space-y-1">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-sm">
                <span className="font-medium">{skill.category}:</span>{' '}
                <span>{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: colors.primary }}
          >
            Projects
          </h2>
          <div className="space-y-2">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
