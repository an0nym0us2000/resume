import ReactPDF, { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottom: '2pt solid #000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 9,
    color: '#333',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactItem: {
    marginRight: 10,
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subsectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 10,
    fontWeight: 'semibold',
    color: '#333',
  },
  date: {
    fontSize: 9,
    color: '#666',
    textAlign: 'right',
  },
  location: {
    fontSize: 9,
    color: '#666',
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    paddingLeft: 15,
    color: '#333',
  },
  bullet: {
    position: 'absolute',
    left: 0,
  },
  skillCategory: {
    fontSize: 10,
    marginBottom: 3,
  },
  skillCategoryName: {
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 10,
    color: '#333',
    lineHeight: 1.4,
  },
});

// Create PDF Document Component
const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header - Personal Info */}
      {data.personalInfo && (
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName || 'Your Name'}</Text>
          <View style={styles.contactInfo}>
            {data.personalInfo.email && (
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            )}
            {data.personalInfo.phone && (
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.location && (
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            )}
            {data.personalInfo.linkedin && (
              <Text style={styles.contactItem}>{data.personalInfo.linkedin}</Text>
            )}
            {data.personalInfo.github && (
              <Text style={styles.contactItem}>{data.personalInfo.github}</Text>
            )}
            {data.personalInfo.website && (
              <Text style={styles.contactItem}>{data.personalInfo.website}</Text>
            )}
          </View>
        </View>
      )}

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>
      )}

      {/* Work Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.workExperience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <View style={styles.subsectionHeader}>
                <View>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  {exp.location && <Text style={styles.location}>{exp.location}</Text>}
                </View>
                <View>
                  <Text style={styles.date}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </Text>
                </View>
              </View>
              {exp.bullets && exp.bullets.length > 0 && (
                <View style={{ marginTop: 4 }}>
                  {exp.bullets.map((bullet, bIndex) => (
                    bullet && (
                      <View key={bIndex} style={{ position: 'relative', marginBottom: 3 }}>
                        <Text style={styles.bulletPoint}>• {bullet}</Text>
                      </View>
                    )
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <View style={styles.subsectionHeader}>
                <View>
                  <Text style={styles.jobTitle}>{edu.institution}</Text>
                  <Text style={styles.company}>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </Text>
                  {edu.gpa && <Text style={styles.location}>GPA: {edu.gpa}</Text>}
                </View>
                <View>
                  {edu.location && <Text style={styles.date}>{edu.location}</Text>}
                  {edu.endDate && <Text style={styles.date}>{edu.endDate}</Text>}
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills.map((skill, index) => (
            <View key={index} style={styles.skillCategory}>
              <Text>
                <Text style={styles.skillCategoryName}>{skill.category}: </Text>
                <Text>{skill.items.join(', ')}</Text>
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((project, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text style={styles.jobTitle}>{project.name}</Text>
              {project.technologies && project.technologies.length > 0 && (
                <Text style={{ fontSize: 9, fontStyle: 'italic', color: '#666', marginBottom: 2 }}>
                  Technologies: {project.technologies.join(', ')}
                </Text>
              )}
              <Text style={styles.summary}>{project.description}</Text>
              {(project.url || project.github) && (
                <View style={{ fontSize: 9, marginTop: 2 }}>
                  {project.url && <Text>URL: {project.url}</Text>}
                  {project.github && <Text>GitHub: {project.github}</Text>}
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export async function generateResumePDF(data: any): Promise<Buffer> {
  const resumeData = data as ResumeData;
  const pdfStream = await ReactPDF.renderToStream(<ResumePDF data={resumeData} />);

  // Convert stream to buffer
  const chunks: Uint8Array[] = [];

  return new Promise((resolve, reject) => {
    pdfStream.on('data', (chunk) => chunks.push(chunk));
    pdfStream.on('end', () => resolve(Buffer.concat(chunks)));
    pdfStream.on('error', reject);
  });
}
