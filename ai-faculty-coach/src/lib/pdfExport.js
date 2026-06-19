// ============================================
// PDF Export System (using jsPDF)
// ============================================

import { jsPDF } from 'jspdf';
import { APP_NAME, INSTITUTION } from './constants';

export function exportToPdf(type, data) {
  const { metadata, feedback, recommendations, questions, summaries } = data;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let y = 20;

  // Colors
  const COLOR_PRIMARY = [13, 13, 13];    // #0D0D0D - Black
  const COLOR_ACCENT = [196, 30, 58];   // #C41E3A - Red
  const COLOR_GOLD = [212, 165, 55];    // #D4A537 - Gold
  const COLOR_MUTED = [107, 107, 107];  // #6B6B6B - Muted Grey

  // Helper: Draw page header
  const drawHeader = (titleText) => {
    // Top border accent
    doc.setFillColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.rect(0, 0, pageWidth, 4, 'F');

    // Institution & App Info
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.text(INSTITUTION.toUpperCase(), margin, 12);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(`${APP_NAME} | Digital Evaluation`, pageWidth - margin, 12, { align: 'right' });

    // Divider Line
    doc.setDrawColor(224, 213, 197); // light gold/border color
    doc.setLineWidth(0.3);
    doc.line(margin, 14, pageWidth - margin, 14);

    // Title of the current document page
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(titleText, margin, 24);

    // Date
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(`Generated: ${today}`, pageWidth - margin, 24, { align: 'right' });

    doc.line(margin, 27, pageWidth - margin, 27);
  };

  // Helper: Draw footer
  const drawFooter = (pageNum) => {
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text('CONFIDENTIAL - FOR INTERNAL EDUCATIONAL USE ONLY', margin, pageHeight - 10);
  };

  // Helper: Check page bounds and auto-page break
  const checkPageBreak = (neededHeight, titleText) => {
    if (y + neededHeight > pageHeight - 20) {
      drawFooter(doc.getNumberOfPages());
      doc.addPage();
      y = 35;
      drawHeader(titleText);
      return true;
    }
    return false;
  };

  // Helper: Add wrapped paragraph
  const addParagraph = (text, fontSize = 10, style = 'normal', color = COLOR_PRIMARY, titleText) => {
    doc.setFont('Helvetica', style);
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);

    const lines = doc.splitTextToSize(text, contentWidth);
    const lineHeight = fontSize * 0.45;
    const blockHeight = lines.length * lineHeight;

    checkPageBreak(blockHeight + 2, titleText);

    lines.forEach(line => {
      doc.text(line, margin, y);
      y += lineHeight;
    });
    y += 2; // spacing after paragraph
  };

  // Helper: Add section heading
  const addHeading = (text, titleText) => {
    y += 4;
    checkPageBreak(12, titleText);
    
    // Draw gold block indicator
    doc.setFillColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    doc.rect(margin, y - 4, 3, 5, 'F');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.text(text, margin + 5, y);
    y += 5;
    
    doc.setDrawColor(COLOR_GOLD[0], COLOR_GOLD[1], COLOR_GOLD[2]);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
  };

  // Begin Generating Document based on Type
  let documentTitle = '';
  let filename = '';

  if (type === 'full') {
    documentTitle = 'Full Lesson Evaluation Report';
    filename = `Evaluation_Report_${metadata.topic.replace(/\s+/g, '_')}.pdf`;
  } else if (type === 'questions') {
    documentTitle = 'Student Handout: Question Bank';
    filename = `Questions_${metadata.topic.replace(/\s+/g, '_')}.pdf`;
  } else if (type === 'recommendations') {
    documentTitle = 'Teaching Improvement & Recommendations';
    filename = `Recommendations_${metadata.topic.replace(/\s+/g, '_')}.pdf`;
  }

  // Draw Page 1 header
  drawHeader(documentTitle);
  y = 36;

  if (type === 'full') {
    // ----------------------------------------------------
    // FULL REPORT EXPORT
    // ----------------------------------------------------
    
    // Meta box
    checkPageBreak(40, documentTitle);
    doc.setFillColor(250, 246, 238); // light beige card
    doc.setDrawColor(224, 213, 197);
    doc.setLineWidth(0.3);
    doc.rect(margin, y, contentWidth, 34, 'FD');
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    
    doc.text(`Lesson Title: ${metadata.title}`, margin + 5, y + 6);
    doc.text(`Subject: ${metadata.subject}`, margin + 5, y + 13);
    doc.text(`Topic: ${metadata.topic}`, margin + 5, y + 20);
    doc.text(`Estimated Difficulty: ${metadata.difficultyLevel}`, margin + 5, y + 27);
    
    doc.text(`Completeness Score: ${metadata.completenessScore}%`, pageWidth - margin - 5, y + 6, { align: 'right' });
    doc.text(`Teaching Method: ${metadata.teachingMethod}`, pageWidth - margin - 5, y + 13, { align: 'right' });
    doc.text(`Effectiveness Score: ${feedback.effectivenessScore}/10`, pageWidth - margin - 5, y + 20, { align: 'right' });
    
    y += 38;

    // Objectives Section
    addHeading('Learning Objectives', documentTitle);
    const objectiveLines = metadata.objectives.split('\n');
    objectiveLines.forEach((obj, idx) => {
      if (obj.trim().length > 0) {
        addParagraph(`${idx + 1}. ${obj.trim()}`, 10, 'normal', COLOR_PRIMARY, documentTitle);
      }
    });

    // Feedback Assessment Section
    addHeading('AI Educational Feedback & Quality Scores', documentTitle);
    addParagraph(`Overall Assessment:`, 10, 'bold', COLOR_ACCENT, documentTitle);
    addParagraph(feedback.overallAssessment, 10, 'normal', COLOR_PRIMARY, documentTitle);
    
    y += 2;
    addParagraph(`Evaluation Metrics:`, 10, 'bold', COLOR_PRIMARY, documentTitle);
    addParagraph(`- Clarity of Explanation: ${feedback.clarityScore}/10`, 10, 'normal', COLOR_PRIMARY, documentTitle);
    doc.text(`- Content Structure Quality: ${feedback.structureScore}/10`, margin, y - 2); // inline
    y += 4;
    addParagraph(`- Student Engagement Potential: ${feedback.engagementScore}/10`, 10, 'normal', COLOR_PRIMARY, documentTitle);
    doc.text(`- Vocabulary Simplicity Score: ${feedback.vocabularyScore}/10`, margin, y - 2); // inline
    y += 4;
    
    // Strengths
    addParagraph(`Key Strengths:`, 10, 'bold', COLOR_PRIMARY, documentTitle);
    feedback.strengths.forEach(str => {
      addParagraph(`[+] ${str}`, 10, 'normal', [45, 139, 78], documentTitle); // green
    });
    
    // Areas of Improvement
    y += 2;
    addParagraph(`Suggested Areas of Improvement:`, 10, 'bold', COLOR_PRIMARY, documentTitle);
    feedback.improvements.forEach(imp => {
      addParagraph(`[-] ${imp}`, 10, 'normal', COLOR_ACCENT, documentTitle);
    });

    // Missing Concepts
    if (feedback.missingConcepts && feedback.missingConcepts.length > 0) {
      y += 2;
      addParagraph(`Detected Missing Pedagogical Concepts:`, 10, 'bold', COLOR_PRIMARY, documentTitle);
      feedback.missingConcepts.forEach(mis => {
        addParagraph(`[!] ${mis}`, 10, 'normal', COLOR_GOLD, documentTitle);
      });
    }

    // Classroom Activities
    addHeading('Classroom Activity Recommendations', documentTitle);
    recommendations.classroomActivities.forEach((act, idx) => {
      addParagraph(`${idx + 1}. ${act.name} (${act.duration}) - Method: ${act.method}`, 10, 'bold', COLOR_PRIMARY, documentTitle);
    });

    // Real-world examples
    y += 2;
    addParagraph('Real-World Examples to Integrate:', 10, 'bold', COLOR_PRIMARY, documentTitle);
    recommendations.realWorldExamples.forEach((ex, idx) => {
      addParagraph(`* ${ex}`, 10, 'normal', COLOR_PRIMARY, documentTitle);
    });

    // Summaries
    addHeading('Lesson Summary Formats', documentTitle);
    addParagraph('Short Summary:', 10, 'bold', COLOR_ACCENT, documentTitle);
    addParagraph(summaries.short, 9, 'normal', COLOR_PRIMARY, documentTitle);
    
    addParagraph('Revision Notes (Key Bullet Points):', 10, 'bold', COLOR_ACCENT, documentTitle);
    summaries.revisionNotes.forEach(note => {
      addParagraph(note.replace(/\*\*/g, ''), 9, 'normal', COLOR_PRIMARY, documentTitle);
    });

  } else if (type === 'questions') {
    // ----------------------------------------------------
    // QUESTIONS EXPORT
    // ----------------------------------------------------
    addParagraph(`Topic: ${metadata.topic} | Subject: ${metadata.subject} | Difficulty: ${metadata.difficultyLevel}`, 10, 'bold', COLOR_MUTED, documentTitle);
    y += 4;

    const questionTypes = {
      MCQ: 'Multiple Choice Questions (MCQ)',
      ShortAnswer: 'Short Answer Questions',
      LongAnswer: 'Long Answer Questions',
      Conceptual: 'Conceptual Questions',
      CriticalThinking: 'Critical Thinking Questions',
      ScenarioBased: 'Scenario-Based Questions',
      ActivityBased: 'Activity-Based Tasks'
    };

    Object.entries(questionTypes).forEach(([key, label]) => {
      const diffs = ['Easy', 'Medium', 'Hard'];
      let typeHasQuestions = false;
      diffs.forEach(d => {
        if (questions[key]?.[d] && questions[key][d].length > 0) typeHasQuestions = true;
      });

      if (typeHasQuestions) {
        addHeading(label, documentTitle);

        diffs.forEach(d => {
          const qList = questions[key]?.[d] || [];
          if (qList.length > 0) {
            addParagraph(`${d} Difficulty:`, 9, 'bold', COLOR_GOLD, documentTitle);
            
            qList.forEach((q, idx) => {
              addParagraph(`Q${idx + 1}: ${q.question}`, 10, 'bold', COLOR_PRIMARY, documentTitle);
              
              if (key === 'MCQ' && q.options) {
                q.options.forEach((opt, oIdx) => {
                  const letter = String.fromCharCode(65 + oIdx);
                  const isCorrect = opt === q.answer;
                  addParagraph(`   (${letter}) ${opt} ${isCorrect ? ' [Correct]' : ''}`, 9.5, 'normal', isCorrect ? [45, 139, 78] : COLOR_PRIMARY, documentTitle);
                });
              } else {
                addParagraph(`Suggested Answer: ${q.answer}`, 9.5, 'italic', COLOR_MUTED, documentTitle);
              }
              y += 2;
            });
          }
        });
      }
    });

  } else if (type === 'recommendations') {
    // ----------------------------------------------------
    // RECOMMENDATIONS EXPORT
    // ----------------------------------------------------
    addParagraph(`Pedagogical improvement strategies customized for "${metadata.topic}" (${metadata.subject}).`, 10, 'italic', COLOR_MUTED, documentTitle);
    y += 4;

    // Improvement tips
    addHeading('General Lesson Improvements', documentTitle);
    recommendations.improvementTips.forEach((tip, idx) => {
      addParagraph(`- ${tip}`, 10, 'normal', COLOR_PRIMARY, documentTitle);
    });

    // Explanation strategies
    addHeading('Advanced Explanation Strategies', documentTitle);
    recommendations.explanationStrategies.forEach((strat, idx) => {
      addParagraph(`- ${strat}`, 10, 'normal', COLOR_PRIMARY, documentTitle);
    });

    // Classroom activities
    addHeading('Targeted Classroom Activities', documentTitle);
    recommendations.classroomActivities.forEach((act, idx) => {
      addParagraph(`${idx + 1}. ${act.name} - Duration: ${act.duration}`, 10, 'bold', COLOR_PRIMARY, documentTitle);
      addParagraph(`   Teaching methodology group: ${act.method}`, 9.5, 'normal', COLOR_MUTED, documentTitle);
      y += 1;
    });

    // Visual aids
    addHeading('Suggested Visual Aids & Graphic Organizers', documentTitle);
    recommendations.visualSuggestions.forEach((vis, idx) => {
      addParagraph(`- ${vis}`, 10, 'normal', COLOR_PRIMARY, documentTitle);
    });

    // Real world links
    addHeading('Real-World Relevance & Applications', documentTitle);
    recommendations.realWorldExamples.forEach((ex, idx) => {
      addParagraph(`* ${ex}`, 10, 'normal', COLOR_PRIMARY, documentTitle);
    });
  }

  // Draw final footer
  drawFooter(doc.getNumberOfPages());

  // Download PDF
  doc.save(filename);
}
