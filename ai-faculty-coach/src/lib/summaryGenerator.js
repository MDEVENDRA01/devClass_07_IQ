// ============================================
// AI Summary Generator Engine
// ============================================

export function generateSummaries(metadata) {
  const { subject, topic, title, keyConcepts, difficultyLevel } = metadata;
  
  const conceptsStr = keyConcepts && keyConcepts.length > 0 
    ? keyConcepts.join(', ') 
    : 'fundamental principles';

  // 1. Short Summary (2-3 sentences)
  const shortSummary = `This lesson plan covers the essential curriculum details for the topic "${topic}" within the ${subject} syllabus. It outlines key principles like ${conceptsStr} designed to develop student understanding and practical applications. The lesson structure includes guided instruction, active practice modules, and evaluation tools appropriate for a ${difficultyLevel} difficulty tier.`;

  // 2. Detailed Summary (comprehensive paragraph)
  const detailedSummary = `This comprehensive educational unit on "${topic}" is specifically formatted to target core outcomes in ${subject}. The curriculum addresses critical concepts, specifically focusing on ${conceptsStr}, establishing a logical cognitive progression from introductory defintions to complex analytical problem-solving. Throughout the lesson, the instructor is guided to blend direct lecture instruction with active inquiry-based student modules. Formative review checkpoints and structured diagnostic activities are embedded to ensure teachers can measure real-time student outcomes, reinforcing understanding before progressing to higher-order assessment tasks.`;

  // 3. Student-Friendly Summary (simplified language)
  const studentFriendlySummary = `In this lesson, we will explore the exciting world of ${subject} by focusing on "${topic}". You will learn all about ${conceptsStr} in a simple, step-by-step way. We will break down how these concepts work in our daily life, participate in fun class activities to test our skills, and use quick checks to make sure we understand everything. By the end, you'll be able to explain these topics and show how they connect to the world around you!`;

  // 4. Revision Notes (bullet points of key concepts)
  const revisionNotes = [
    `**Core Theme**: Introduction and definition of "${topic}" under the ${subject} framework.`,
    `**Primary Concept — ${keyConcepts[0] || 'Basics'}**: The foundational rule or entity, representing the main parameter of analysis.`,
    `**Secondary Concept — ${keyConcepts[1] || 'Intermediate'}**: Connecting the primary principles to secondary actions or formulas.`,
    `**Third Concept — ${keyConcepts[2] || 'Advanced'}**: Extended application of theory to resolve real-world problems and practical scenarios.`,
    `**Key Vocabulary**: Review specific terminologies associated with ${conceptsStr} to ensure spelling and operational precision.`,
    `**Check-out Goal**: Be ready to explain the relationships between these terms and complete the end-of-lesson MCQs and assessments.`
  ];

  return {
    short: shortSummary,
    detailed: detailedSummary,
    studentFriendly: studentFriendlySummary,
    revisionNotes: revisionNotes
  };
}
