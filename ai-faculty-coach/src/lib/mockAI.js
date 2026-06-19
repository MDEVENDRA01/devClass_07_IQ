// ============================================
// Mock AI Response Generator
// ============================================

const sampleResponses = [
  {
    qualityScore: 8.2,
    overallAssessment: "This is a well-structured lesson plan that demonstrates clear alignment between the stated learning objectives and the planned activities. The teacher has thoughtfully incorporated multiple teaching methods, creating opportunities for both passive and active learning. The use of visual aids and group activities shows awareness of diverse learning styles.",
    strengths: [
      "Excellent use of scaffolded learning — moving from teacher demonstration to guided practice to independent work",
      "Clear, measurable learning objectives aligned with Bloom's Taxonomy (Remember, Understand, Apply levels)",
      "Effective time management with appropriate allocation for each activity segment",
      "Integration of real-world examples that connect theory to practical applications",
      "Good balance between teacher-led instruction and student-centered activities"
    ],
    improvements: [
      "Consider adding a formative assessment checkpoint mid-lesson to gauge understanding before moving to advanced concepts",
      "The lesson could benefit from differentiated activities for students at varying proficiency levels",
      "Include a brief anticipatory set or hook at the beginning to activate prior knowledge and build curiosity"
    ],
    deliveryRecommendations: [
      "Open with a 2-minute real-world scenario or problem that the lesson content will help solve — this creates immediate relevance",
      "Use think-pair-share during the explanation phase to maintain engagement and check understanding",
      "Add a 'parking lot' for student questions that arise during the lesson but are better addressed later",
      "Close with a 1-minute exit ticket: ask students to write one thing they learned and one question they still have"
    ],
    alignmentAnalysis: "The lesson plan shows strong alignment (85%) between stated objectives and planned activities. All three learning objectives are addressed through the lesson flow. The assessment method (MCQ) partially measures the objectives — consider adding an open-ended question to assess higher-order thinking.",
    suggestedActivities: [
      { name: "Concept Mapping Challenge", duration: "8 mins", method: "Collaborative" },
      { name: "Real-World Application Gallery Walk", duration: "10 mins", method: "Inquiry-Based" },
      { name: "Two-Minute Paper Summary", duration: "3 mins", method: "Individual" }
    ],
    assessmentTips: [
      "Use a mix of MCQs (for recall) and short-answer questions (for understanding) in your formative assessment",
      "Consider peer assessment during the group activity — provide a simple rubric for students to evaluate each other's work"
    ]
  },
  {
    qualityScore: 6.5,
    overallAssessment: "The lesson plan covers the essential content and has a logical sequence of activities. However, it relies heavily on lecture-based delivery which may limit student engagement. The learning objectives are somewhat broad and could benefit from more specific, measurable outcomes.",
    strengths: [
      "Logical sequencing of topics from simple to complex concepts",
      "Good use of textbook resources and relevant chapter references",
      "Adequate time allocation for the overall lesson duration"
    ],
    improvements: [
      "Transform at least one passive learning segment into an active learning opportunity — e.g., replace 10 min of lecture with a guided discovery activity",
      "Make learning objectives more specific using Bloom's action verbs (e.g., 'explain' instead of 'understand')",
      "Add technology integration to make abstract concepts more visual and tangible",
      "Include provisions for students who finish early (extension activities)"
    ],
    deliveryRecommendations: [
      "Break the long lecture segment into 7-minute chunks with 2-minute interactive breaks",
      "Use visual organizers (concept maps, flowcharts) on the board to help students organize information",
      "Incorporate at least one hands-on activity that allows students to manipulate materials or data",
      "Begin each major section with a question to stimulate thinking before providing the answer"
    ],
    alignmentAnalysis: "Moderate alignment (65%) between objectives and activities. The first two objectives are well-covered, but the third objective lacks a dedicated activity. Consider adding a specific task that directly addresses the gap.",
    suggestedActivities: [
      { name: "Jigsaw Reading Activity", duration: "12 mins", method: "Collaborative" },
      { name: "Quick Quiz Relay", duration: "5 mins", method: "Discussion" },
      { name: "Visual Note-Taking Exercise", duration: "7 mins", method: "Individual" }
    ],
    assessmentTips: [
      "Add a quick formative check after the first 15 minutes using thumbs up/down or mini-whiteboards",
      "Replace the single end-of-class quiz with three spaced mini-assessments throughout the lesson"
    ]
  },
  {
    qualityScore: 9.1,
    overallAssessment: "This is an exemplary lesson plan that demonstrates sophisticated pedagogical thinking. The teacher has created a dynamic, student-centered learning experience with excellent scaffolding, multiple engagement strategies, and thoughtful assessment integration. The plan shows strong understanding of constructivist learning principles.",
    strengths: [
      "Outstanding integration of multiple teaching methodologies that cater to diverse learning styles",
      "Excellent use of formative assessment embedded throughout the lesson rather than only at the end",
      "Creative use of technology and hands-on materials to make abstract concepts tangible",
      "Strong emphasis on higher-order thinking skills (Bloom's Analyze and Evaluate levels)",
      "Well-planned transitions between activities that maintain lesson momentum"
    ],
    improvements: [
      "Consider adding a brief self-reflection component where students assess their own understanding",
      "The lesson could include a cross-curricular connection to help students see broader applications"
    ],
    deliveryRecommendations: [
      "Maintain the excellent pace — the 5-7 minute activity segments are ideal for sustained attention",
      "Consider video-recording one delivery for self-review and professional development",
      "Share this lesson structure as a template with colleagues — it's a model for effective planning",
      "Add student voice by letting them choose between two suggested activities for the practice segment"
    ],
    alignmentAnalysis: "Excellent alignment (95%) between learning objectives and lesson activities. Every stated objective has at least two activities supporting it, and the assessment method captures both knowledge recall and application skills.",
    suggestedActivities: [
      { name: "Socratic Seminar Discussion", duration: "10 mins", method: "Discussion" },
      { name: "Create-a-Question Challenge", duration: "5 mins", method: "Individual" },
      { name: "Cross-Curricular Connection Map", duration: "8 mins", method: "Collaborative" }
    ],
    assessmentTips: [
      "Your current assessment strategy is strong — consider adding a reflective journal entry as homework to deepen understanding",
      "Use the data from today's formative assessments to plan tomorrow's differentiated warm-up activity"
    ]
  }
];

export function generateMockAIResponse(formData) {
  return new Promise((resolve) => {
    const delay = 2000 + Math.random() * 2000;
    setTimeout(() => {
      const idx = Math.floor(Math.random() * sampleResponses.length);
      const response = JSON.parse(JSON.stringify(sampleResponses[idx]));

      // Slightly randomize the score
      response.qualityScore = Math.round((response.qualityScore + (Math.random() - 0.5) * 2) * 10) / 10;
      response.qualityScore = Math.max(1, Math.min(10, response.qualityScore));

      resolve(response);
    }, delay);
  });
}

// Mock generation history
export function generateMockHistory() {
  const topics = [
    'Photosynthesis in Higher Plants', 'Quadratic Equations', 'World War II',
    'Chemical Bonding', 'Shakespearean Sonnets', 'Supply and Demand',
    'Laws of Motion', 'Cell Division — Mitosis', 'Indian Constitution',
    'Probability and Statistics', 'Organic Chemistry Basics', 'Essay Writing Skills',
    'Trigonometric Identities', 'Ecosystem and Biodiversity', 'French Revolution',
  ];

  const subjects = ['Biology', 'Mathematics', 'History', 'Chemistry', 'English', 'Economics', 'Physics', 'Science', 'Political Science'];
  const grades = ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

  const history = [];
  for (let i = 0; i < 25; i++) {
    const score = Math.round((4 + Math.random() * 6) * 10) / 10;
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    history.push({
      id: `gen-${i + 1}`,
      topic: topics[i % topics.length],
      subject: subjects[i % subjects.length],
      grade: grades[i % grades.length],
      qualityScore: score,
      date: date.toISOString(),
      rating: Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 3 : null,
      bookmarked: Math.random() > 0.8,
      preview: sampleResponses[i % sampleResponses.length].overallAssessment.substring(0, 120) + '...',
      fullResponse: sampleResponses[i % sampleResponses.length],
    });
  }

  return history.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Mock analytics data
export function generateMockAnalytics() {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      avgScore: Math.round((5.5 + Math.random() * 3.5) * 10) / 10,
      count: Math.floor(3 + Math.random() * 12),
    });
  }

  const ratingDist = [
    { name: '1 Star', value: 3, fill: '#C41E3A' },
    { name: '2 Stars', value: 8, fill: '#e06050' },
    { name: '3 Stars', value: 18, fill: '#D4A537' },
    { name: '4 Stars', value: 32, fill: '#6cb86c' },
    { name: '5 Stars', value: 24, fill: '#2D8B4E' },
  ];

  const methodData = [
    { method: 'Lecture', avgScore: 6.2, fullMark: 10 },
    { method: 'Discussion', avgScore: 7.8, fullMark: 10 },
    { method: 'Demonstration', avgScore: 7.5, fullMark: 10 },
    { method: 'Project-Based', avgScore: 8.1, fullMark: 10 },
    { method: 'Collaborative', avgScore: 8.4, fullMark: 10 },
    { method: 'Inquiry-Based', avgScore: 7.9, fullMark: 10 },
    { method: 'Flipped', avgScore: 7.2, fullMark: 10 },
    { method: 'Mixed', avgScore: 7.6, fullMark: 10 },
  ];

  const topTeachers = [
    { name: 'Dr. Priya Sharma', dept: 'Science', count: 28, avgScore: 8.4, avatar: 'PS' },
    { name: 'Prof. Anita Reddy', dept: 'Mathematics', count: 24, avgScore: 8.1, avatar: 'AR' },
    { name: 'Mr. Venkat Rao', dept: 'English', count: 22, avgScore: 7.9, avatar: 'VR' },
    { name: 'Dr. Suresh Babu', dept: 'Physics', count: 19, avgScore: 7.7, avatar: 'SB' },
    { name: 'Ms. Lakshmi Devi', dept: 'Commerce', count: 16, avgScore: 7.5, avatar: 'LD' },
  ];

  return { days, ratingDist, methodData, topTeachers };
}

// Mock admin data
export function generateMockAdminData() {
  const users = [
    { id: 'u1', name: 'Dr. Priya Sharma', email: 'priya@gowthami.edu.in', role: 'teacher', department: 'Science', status: 'active', lastActive: '2 hours ago', avatar: 'PS' },
    { id: 'u2', name: 'Prof. Rajesh Kumar', email: 'rajesh@gowthami.edu.in', role: 'hod', department: 'Mathematics', status: 'active', lastActive: '1 hour ago', avatar: 'RK' },
    { id: 'u3', name: 'Ms. Anita Reddy', email: 'anita@gowthami.edu.in', role: 'teacher', department: 'Mathematics', status: 'active', lastActive: '3 hours ago', avatar: 'AR' },
    { id: 'u4', name: 'Mr. Venkat Rao', email: 'venkat@gowthami.edu.in', role: 'teacher', department: 'English', status: 'inactive', lastActive: '5 days ago', avatar: 'VR' },
    { id: 'u5', name: 'Dr. Suresh Babu', email: 'suresh@gowthami.edu.in', role: 'hod', department: 'Physics', status: 'active', lastActive: '30 min ago', avatar: 'SB' },
    { id: 'u6', name: 'Ms. Lakshmi Devi', email: 'lakshmi@gowthami.edu.in', role: 'teacher', department: 'Commerce', status: 'active', lastActive: '1 day ago', avatar: 'LD' },
    { id: 'u7', name: 'Admin User', email: 'admin@gowthami.edu.in', role: 'admin', department: 'Administration', status: 'active', lastActive: 'Just now', avatar: 'AU' },
  ];

  const promptVersions = [
    { version: 'v4', status: 'active', createdAt: '2026-06-10', tokens: 1500, description: 'Production prompt with Bloom\'s Taxonomy reference' },
    { version: 'v3', status: 'archived', createdAt: '2026-06-05', tokens: 1200, description: 'Added alignment analysis section' },
    { version: 'v2', status: 'archived', createdAt: '2026-06-01', tokens: 1000, description: 'Initial structured JSON output' },
    { version: 'v1', status: 'archived', createdAt: '2026-05-28', tokens: 800, description: 'Basic evaluation prompt' },
  ];

  const systemLogs = [
    { time: '16:42:01', type: 'API', message: 'POST /api/generate — 200 OK — 2.3s', user: 'Dr. Priya Sharma' },
    { time: '16:38:15', type: 'AUTH', message: 'Login successful', user: 'Prof. Rajesh Kumar' },
    { time: '16:35:22', type: 'API', message: 'GET /api/history — 200 OK — 0.4s', user: 'Ms. Anita Reddy' },
    { time: '16:30:00', type: 'SYSTEM', message: 'Daily analytics rollup completed', user: 'System' },
    { time: '16:28:45', type: 'API', message: 'POST /api/generate — 200 OK — 3.1s', user: 'Mr. Venkat Rao' },
    { time: '16:25:10', type: 'ERROR', message: 'Rate limit exceeded — 429', user: 'Dr. Suresh Babu' },
  ];

  return { users, promptVersions, systemLogs };
}
