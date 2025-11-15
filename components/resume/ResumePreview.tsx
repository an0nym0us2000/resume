'use client';

import { useResumeStore } from '@/lib/store/resumeStore';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export function ResumePreview() {
  const { resumeData, style } = useResumeStore();

  if (!resumeData) {
    return (
      <Card className="mx-auto w-full max-w-[8.5in] bg-white p-12 shadow-xl">
        <div className="text-center text-muted-foreground">
          <p>Start editing to see your resume preview</p>
        </div>
      </Card>
    );
  }

  const { personalInfo, summary, workExperience, education, skills, projects } = resumeData;

  return (
    <Card className="mx-auto w-full max-w-[8.5in] bg-white p-8 shadow-xl" style={{ fontFamily: style.fontFamily }}>
      {/* Personal Info Header */}
      {personalInfo && (
        <div className="mb-6 border-b-2 border-gray-900 pb-4">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-3 w-3" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="h-3 w-3" />
                <span className="break-all">{personalInfo.github}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-bold uppercase text-gray-900">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-800">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-bold uppercase text-gray-900">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="mb-1 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-sm font-semibold text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {exp.location && <p>{exp.location}</p>}
                    <p>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="ml-5 list-disc space-y-1 text-sm text-gray-800">
                    {exp.bullets.map(
                      (bullet, index) =>
                        bullet && <li key={index}>{bullet}</li>
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-bold uppercase text-gray-900">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                  <p className="text-sm text-gray-700">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <div className="text-right text-sm text-gray-600">
                  {edu.location && <p>{edu.location}</p>}
                  {edu.endDate && <p>{edu.endDate}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-bold uppercase text-gray-900">
            Skills
          </h2>
          <div className="space-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="text-sm">
                <span className="font-semibold text-gray-900">
                  {skill.category}:{' '}
                </span>
                <span className="text-gray-800">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-bold uppercase text-gray-900">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="mb-1">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-xs italic text-gray-600">
                      Technologies: {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-800">{project.description}</p>
                {(project.url || project.github) && (
                  <div className="mt-1 flex gap-3 text-xs text-gray-600">
                    {project.url && <span>URL: {project.url}</span>}
                    {project.github && <span>GitHub: {project.github}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
