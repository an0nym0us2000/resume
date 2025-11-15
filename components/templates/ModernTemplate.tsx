import { TemplateProps } from '@/types/template';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export function ModernTemplate({ data, style }: TemplateProps) {
  const colors = style?.colors || {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#3b82f6',
    text: '#1e293b',
    background: '#ffffff',
  };

  return (
    <div
      className="resume-template w-full bg-white p-8 shadow-lg"
      style={{ color: colors.text, fontFamily: 'Inter, sans-serif' }}
    >
      {/* Header */}
      {data.personalInfo && (
        <div className="mb-6 border-b-2 pb-6" style={{ borderColor: colors.primary }}>
          <h1
            className="text-4xl font-bold"
            style={{ color: colors.primary }}
          >
            {data.personalInfo.fullName || 'Your Name'}
          </h1>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: colors.secondary }}>
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                <span>{data.personalInfo.linkedin}</span>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <span>{data.personalInfo.github}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{data.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2
            className="mb-2 text-xl font-semibold uppercase tracking-wide"
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
            className="mb-3 text-xl font-semibold uppercase tracking-wide"
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
                  <div className="text-right text-sm" style={{ color: colors.secondary }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm">
                    {exp.bullets.map((bullet, idx) => (
                      bullet && (
                        <li key={idx} className="flex gap-2">
                          <span style={{ color: colors.accent }}>•</span>
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
            className="mb-3 text-xl font-semibold uppercase tracking-wide"
            style={{ color: colors.primary }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-sm" style={{ color: colors.secondary }}>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
                {edu.endDate && (
                  <div className="text-sm" style={{ color: colors.secondary }}>
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
            className="mb-3 text-xl font-semibold uppercase tracking-wide"
            style={{ color: colors.primary }}
          >
            Skills
          </h2>
          <div className="space-y-2">
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
        <div className="mb-6">
          <h2
            className="mb-3 text-xl font-semibold uppercase tracking-wide"
            style={{ color: colors.primary }}
          >
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold">{project.name}</h3>
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-xs italic" style={{ color: colors.secondary }}>
                    {project.technologies.join(', ')}
                  </p>
                )}
                <p className="mt-1 text-sm">{project.description}</p>
                {(project.url || project.github) && (
                  <div className="mt-1 text-xs" style={{ color: colors.accent }}>
                    {project.url && <span>URL: {project.url}</span>}
                    {project.github && <span className="ml-3">GitHub: {project.github}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
