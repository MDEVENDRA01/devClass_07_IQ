// ============================================
// AI Lesson Content Analyzer
// ============================================

import { SUBJECTS, TEACHING_METHODS } from './constants';

// Subject configurations for rich dynamic response generation
const SUBJECT_PROFILES = {
  'Biology': {
    concepts: ['Cell Structure', 'Photosynthesis', 'Mitosis', 'Respiration', 'Genetics', 'Ecosystem', 'Circulatory System', 'Plant Nutrition'],
    methods: ['Demonstration', 'Inquiry-Based', 'Lecture'],
    outcomes: [
      'Explain structural differences between plant and animal cells',
      'Detail the chemical process of carbon assimilation',
      'Identify key stages of cellular division under a microscope',
      'Draw and label complex biological systems accurately'
    ],
    missingList: ['Formative lab safety checkpoint', 'Cross-sectional microscopic diagram reference', 'Anticipatory hook connecting cell biology to everyday energy'],
    activities: [
      { name: 'Microscope Lab Exploration', duration: '15 mins', method: 'Inquiry-Based' },
      { name: 'Cell Organelle Roleplay', duration: '10 mins', method: 'Collaborative' },
      { name: 'Diagram Labeling Relay', duration: '8 mins', method: 'Mixed' }
    ],
    visuals: [
      '3D cell organelle animation or interactive board model',
      'High-resolution electron micrographs showing organelles',
      'Step-by-step flowchart of metabolic pathways'
    ],
    realWorld: [
      'Compare cellular organelles to functions within a city (e.g., mitochondria as the power plant)',
      'Explain how bread rises due to yeast respiration',
      'Link photosynthesis directly to the oxygen level of the school garden'
    ]
  },
  'Mathematics': {
    concepts: ['Quadratic Equations', 'Trigonometric Ratios', 'Probability Distribution', 'Linear Systems', 'Geometric Theorems', 'Statistical Mean', 'Calculus Derivatives'],
    methods: ['Lecture', 'Discussion', 'Mixed'],
    outcomes: [
      'Formulate and solve quadratic equations using factorization and formula methods',
      'Apply trigonometric ratios to solve right-angled triangle word problems',
      'Calculate joint probability events using Venn diagrams',
      'Understand the geometric properties of theorems and write coherent proofs'
    ],
    missingList: ['Step-by-step visual algebraic proof', 'Error-analysis activity for common mistakes', 'Prerequisite diagnostic question on basic arithmetic/linear equations'],
    activities: [
      { name: 'Pair-Share Problem Solving', duration: '12 mins', method: 'Collaborative' },
      { name: 'Common Mistakes Post-Mortem', duration: '8 mins', method: 'Discussion' },
      { name: 'Math Jeopardy Speed Round', duration: '10 mins', method: 'Mixed' }
    ],
    visuals: [
      'Interactive Cartesian graph overlays showing equation curves',
      'Geometric shapes animation showing theorem transformations',
      'Colored algebraic tiles representation on the board'
    ],
    realWorld: [
      'Use parabolas in quadratic equations to explain the path of a thrown basketball',
      'Determine the height of the school building using shadows and tangent ratios',
      'Use probability to analyze risk in simple insurance or board game scenarios'
    ]
  },
  'Physics': {
    concepts: ['Newtonian Mechanics', 'Electromagnetism', 'Wave Optics', 'Thermodynamics', 'Kinematics', 'Gravitational Force', 'Electrical Circuits'],
    methods: ['Demonstration', 'Project-Based', 'Lecture'],
    outcomes: [
      'Relate force, mass, and acceleration using Newton\'s second law (F=ma)',
      'Construct a simple parallel and series circuit and measure current flow',
      'Distinguish between transverse and longitudinal waves with real-world examples',
      'Solve kinetic and potential energy conversion calculations'
    ],
    missingList: ['Formula derivation flowchart', 'Interactive simulation links (e.g. PhET)', 'Real-world hazard warning for electrical or moving experiments'],
    activities: [
      { name: 'PhET Simulation Lab', duration: '15 mins', method: 'Inquiry-Based' },
      { name: 'Formula Triangle Building', duration: '5 mins', method: 'Individual' },
      { name: 'Physics Concept Scavenger Hunt', duration: '12 mins', method: 'Collaborative' }
    ],
    visuals: [
      'Slow-motion mechanics experiment video clip',
      'Vector force diagram overlays with color-coded directional arrows',
      'Live oscilloscope or circuit builder schematic visualization'
    ],
    realWorld: [
      'Connect inertia to why we wear seatbelts in cars',
      'Use a playground slide to explain friction and gravity forces',
      'Explain how double glazing in windows keeps classrooms warm using heat conduction principles'
    ]
  },
  'Chemistry': {
    concepts: ['Ionic and Covalent Bonding', 'Acid-Base Titration', 'Stoichiometry', 'Organic Hydrocarbons', 'Periodic Trends', 'Exothermic Reactions', 'Gas Laws'],
    methods: ['Demonstration', 'Collaborative', 'Lecture'],
    outcomes: [
      'Draw Lewis dot structures for basic covalent and ionic molecules',
      'Balance chemical equations and compute molar ratios',
      'Explain pH scale and define neutralization reactions',
      'Distinguish between physical and chemical reaction indicators'
    ],
    missingList: ['Molecular structure diagrams', 'Limiting reactant checklist', 'Lab cleanup protocol and safety details'],
    activities: [
      { name: 'Lewis Dot Structure Building', duration: '10 mins', method: 'Collaborative' },
      { name: 'Reaction Rate Virtual Experiment', duration: '12 mins', method: 'Inquiry-Based' },
      { name: 'Formula Balancing Sprint', duration: '7 mins', method: 'Individual' }
    ],
    visuals: [
      '3D atomic bond rotation animations',
      'Color-coded periodic table focusing on electron valence',
      'Chemical reaction video showing visual phase shifts (gas release/precipitation)'
    ],
    realWorld: [
      'Compare ionic bonds to sharing/borrowing toys and covalent bonds to holding hands',
      'Explain how baking soda neutralizes stomach acid to relieve indigestion',
      'Discuss how rust forms on bicycles as an oxidation reaction'
    ]
  },
  'English': {
    concepts: ['Narrative Structure', 'Metaphors and Similes', 'Poetic Meter', 'Active vs Passive Voice', 'Descriptive Vocabulary', 'Argumentative Essay', 'Character Development'],
    methods: ['Discussion', 'Collaborative', 'Flipped'],
    outcomes: [
      'Identify and construct stories using the 5-stage plot mountain structure',
      'Incorporate figurative language devices (metaphor, personification) in creative drafts',
      'Analyze author intent and thematic shifts in selected texts',
      'Rewrite dry passive sentences into persuasive active sentences'
    ],
    missingList: ['Vocabulary glossary list', 'Peer critique checklist guidelines', 'Paragraph structure graphic organizer'],
    activities: [
      { name: 'Collaborative Story Boarding', duration: '15 mins', method: 'Collaborative' },
      { name: 'Sentence Transformation Drill', duration: '8 mins', method: 'Individual' },
      { name: 'Theme Debate Panel', duration: '10 mins', method: 'Discussion' }
    ],
    visuals: [
      'Plot structure diagram/arc visual',
      'Side-by-side active/passive grammar flowchart',
      'Descriptive word-cloud for sensory verbs'
    ],
    realWorld: [
      'Compare the rising action of a story to the buildup of a favorite movie trailer',
      'Explain how advertising copies use persuasive devices (pathos/ethos/logos)',
      'Analyze direct text messages for subtext and voice style comparison'
    ]
  },
  'Computer Science': {
    concepts: ['Array Indexing', 'Loops and Iterations', 'Conditional Statements', 'Binary Arithmetic', 'Relational Databases', 'Algorithm Complexity', 'Object-Oriented Classes'],
    methods: ['Project-Based', 'Inquiry-Based', 'Lecture'],
    outcomes: [
      'Trace loop execution values and prevent infinite recursion errors',
      'Write simple conditional structures (if-else) solving arithmetic problems',
      'Convert decimal digits into 8-bit binary structures',
      'Define class constructor methods and construct multiple objects'
    ],
    missingList: ['Dry-run table template', 'Code syntax cheatsheet', 'Complexity flowchart or Big-O table'],
    activities: [
      { name: 'Coding Sandbox Challenge', duration: '15 mins', method: 'Project-Based' },
      { name: 'Manual Code Dry-Run', duration: '10 mins', method: 'Individual' },
      { name: 'Bug-Hunting Pair Hunt', duration: '8 mins', method: 'Collaborative' }
    ],
    visuals: [
      'Interactive code flow visualizer showing pointer moves',
      'Logic gate truth tables or code execution trees',
      'Database tables mapping relational entity keys'
    ],
    realWorld: [
      'Compare an algorithm to a kitchen recipe with steps, loops (stir 10 times), and branches (if salt is low)',
      'Explain binary using light switches (on = 1, off = 0)',
      'Relate database keys to student roll numbers'
    ]
  },
  'History': {
    concepts: ['French Revolution', 'Industrialization Era', 'Constitutional Rights', 'Imperialism Impacts', 'Decolonization Movements', 'Cold War Politics', 'Ancient River Civilizations'],
    methods: ['Discussion', 'Lecture', 'Inquiry-Based'],
    outcomes: [
      'Explain the socioeconomic causes of the French Revolution (Three Estates system)',
      'Analyze the impact of steam engine invention on urbanization rates',
      'Differentiate between fundamental rights and directive duties',
      'Trace chronological event flow leading to decolonization'
    ],
    missingList: ['Detailed chronological timeline map', 'Primary source diary excerpt', 'Debate rubric checklist'],
    activities: [
      { name: 'Primary Source Analysis', duration: '12 mins', method: 'Inquiry-Based' },
      { name: 'Estate Assembly Debate Roleplay', duration: '15 mins', method: 'Collaborative' },
      { name: 'Timeline Puzzle Sort', duration: '8 mins', method: 'Mixed' }
    ],
    visuals: [
      'Historical map overlays showing territorial shifts',
      'Caricature drawings illustrating social class divides',
      'Chronological timeline flowchart highlighting critical dates'
    ],
    realWorld: [
      'Connect the complaints of French peasants to contemporary student representations and protests',
      'Discuss how smartphone adoption is a mini modern Industrial Revolution',
      'Link historical decolonization lines to modern border disputes seen on global news'
    ]
  }
};

// General fallback profile
const GENERAL_PROFILE = {
  concepts: ['Core Definitions', 'Theoretical Framework', 'Core Methodologies', 'Key Applications', 'Assessment Methods', 'Summary & Synthesis'],
  methods: ['Lecture', 'Discussion'],
  outcomes: [
    'Understand primary principles of the lesson content',
    'Demonstrate ability to apply concepts to simple exercises',
    'Evaluate core arguments and summarize key takeaways'
  ],
  missingList: ['Interactive student-centered check', 'Detailed rubrics for assessment evaluation', 'Anticipatory set to engage students at the outset'],
  activities: [
    { name: 'Concept Mind Map', duration: '10 mins', method: 'Collaborative' },
    { name: '3-2-1 Exit Ticket Reflection', duration: '5 mins', method: 'Individual' },
    { name: 'Guided Q&A Discussion', duration: '8 mins', method: 'Discussion' }
  ],
  visuals: [
    'Concept map connecting main keywords on the board',
    'Summary infographics outlining lesson components',
    'Bullet-point slides highlighting core framework'
  ],
  realWorld: [
    'Relate the main topic to everyday community decisions',
    'Connect the lesson concepts to recent scientific or public news',
    'Show how this topic influences personal decision-making'
  ]
};

// Helper to clean extracted text
function cleanText(text) {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ');
}

// Subject detector based on keyword matches
function detectSubject(text) {
  const content = text.toLowerCase();
  let maxMatches = 0;
  let detected = 'Other';

  const subjectKeywords = {
    'Biology': ['cell', 'mitosis', 'photosynthesis', 'plant', 'organism', 'biology', 'digestive', 'circulatory', 'dna', 'genetics', 'respiration', 'chlorophyll'],
    'Physics': ['force', 'motion', 'acceleration', 'gravity', 'velocity', 'momentum', 'inertia', 'energy', 'wave', 'light', 'circuit', 'electricity', 'physics', 'kinematics'],
    'Chemistry': ['bond', 'molecule', 'atom', 'reaction', 'acid', 'base', 'stoichiometry', 'molar', 'chemistry', 'compound', 'periodic table', 'valency', 'hydrocarbon'],
    'Mathematics': ['equation', 'quadratic', 'triangle', 'ratio', 'trigonometry', 'probability', 'algebra', 'calculus', 'geometry', 'theorem', 'math', 'solve', 'variables'],
    'English': ['grammar', 'writing', 'essay', 'narrative', 'poem', 'creative', 'literature', 'adjective', 'metaphor', 'simile', 'character', 'comprehension'],
    'Computer Science': ['programming', 'code', 'loop', 'array', 'binary', 'database', 'class', 'python', 'javascript', 'algorithm', 'logic gate', 'software', 'recursion'],
    'History': ['war', 'revolution', 'constitution', 'independence', 'treaty', 'empire', 'civilization', 'historical', 'century', 'king', 'rights', 'decolonization']
  };

  for (const [subject, keywords] of Object.entries(subjectKeywords)) {
    let matches = 0;
    keywords.forEach(keyword => {
      const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
      const count = (content.match(regex) || []).length;
      matches += count;
    });

    if (matches > maxMatches) {
      maxMatches = matches;
      detected = subject;
    }
  }

  // Double check list from constant subject strings
  if (detected === 'Other') {
    // Basic heuristics: default to Science if physics/chemistry/biology words popped up generally
    if (content.includes('science') || content.includes('lab') || content.includes('experiment')) {
      return 'Physics'; // Or Biology or Chemistry, let's say Chemistry as a filler
    }
    return 'Other';
  }

  return detected;
}

// Substring parser to extract potential title/topic from first few lines
function inferTitleAndTopic(text, detectedSubject) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  let title = '';
  let topic = '';

  // Look for prefixes
  for (const line of lines.slice(0, 10)) {
    const titleMatch = line.match(/^(?:lesson title|title|lesson|topic|concept|subject)\s*:\s*(.+)$/i);
    if (titleMatch) {
      const val = titleMatch[1].trim();
      if (line.toLowerCase().startsWith('title') || line.toLowerCase().startsWith('lesson title')) {
        title = val;
      } else if (line.toLowerCase().startsWith('topic') || line.toLowerCase().startsWith('concept')) {
        topic = val;
      }
    }
  }

  // Fallback title
  if (!title) {
    // Grab first non-trivial line that is under 60 characters
    for (const line of lines.slice(0, 5)) {
      if (line.length > 3 && line.length < 60 && !line.includes(':')) {
        title = line;
        break;
      }
    }
    if (!title) {
      title = `${detectedSubject} Lesson Plan`;
    }
  }

  // Fallback topic
  if (!topic) {
    // Try to find a line starting with "Topic:" or similar in first 15 lines, else make one up based on title
    topic = title;
  }

  return { title, topic };
}

// Detect learning objectives in text
function extractObjectives(text, subjectProfile) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const foundObjectives = [];

  for (const line of lines) {
    if (foundObjectives.length >= 4) break;
    // Look for bullet points or lists in sections related to objectives
    const isObjectiveLine = 
      /^(?:students will be able to|swbat|objectives?|goals?|learning outcomes?)\s*[:-]?\s*(.+)$/i.test(line) ||
      (line.match(/^[\d•\-\*]\s+(.+)/) && (line.toLowerCase().includes('understand') || line.toLowerCase().includes('explain') || line.toLowerCase().includes('apply') || line.toLowerCase().includes('identify') || line.toLowerCase().includes('calculate') || line.toLowerCase().includes('solve')));
    
    if (isObjectiveLine) {
      const cleaned = line.replace(/^[\d•\-\*\s]+/, '').replace(/^(?:students will be able to|swbat|objectives?|goals?|learning outcomes?)\s*[:-]?\s*/i, '').trim();
      if (cleaned.length > 10 && cleaned.length < 150) {
        foundObjectives.push(cleaned);
      }
    }
  }

  // If we couldn't parse objectives from text, use custom subject ones
  if (foundObjectives.length < 2) {
    return subjectProfile.outcomes.slice(0, 3).join('\n');
  }

  return foundObjectives.join('\n');
}

// Core analyzer handler
export function analyzeLessonContent(rawText) {
  const cleaned = cleanText(rawText);
  const subject = detectSubject(cleaned);
  const profile = SUBJECT_PROFILES[subject] || GENERAL_PROFILE;
  
  const { title, topic } = inferTitleAndTopic(rawText, subject);
  
  // Extract or synthesize objectives
  const objectives = extractObjectives(rawText, profile);

  // Teaching methods detection
  let detectedMethod = 'Lecture';
  for (const m of TEACHING_METHODS) {
    if (cleaned.toLowerCase().includes(m.toLowerCase())) {
      detectedMethod = m;
      break;
    }
  }
  if (detectedMethod === 'Lecture' && profile.methods && profile.methods.length > 0) {
    detectedMethod = profile.methods[0];
  }

  // Key Concepts detection: filter subject profile concepts that appear, or use them as reference
  const keyConcepts = [];
  profile.concepts.forEach(concept => {
    if (cleaned.toLowerCase().includes(concept.toLowerCase())) {
      keyConcepts.push(concept);
    }
  });
  // Pad with profile concepts if we didn't find enough
  while (keyConcepts.length < 3 && profile.concepts.length > keyConcepts.length) {
    const candidate = profile.concepts[keyConcepts.length];
    if (!keyConcepts.includes(candidate)) {
      keyConcepts.push(candidate);
    }
  }

  // Expected outcomes: derived from profile
  const expectedOutcomes = profile.outcomes.slice(0, 3);

  // Difficulty level estimation: based on text density and advanced keywords
  let difficultyLevel = 'Medium';
  const advancedKeywords = ['derivation', 'quantum', 'complex', 'hypothesis', 'algorithm', 'differential', 'synthesis', 'critical', 'decolonization', 'thermodynamics'];
  let advCount = 0;
  advancedKeywords.forEach(kw => {
    if (cleaned.toLowerCase().includes(kw)) advCount++;
  });
  if (advCount >= 3 || cleaned.length > 15000) {
    difficultyLevel = 'Hard';
  } else if (cleaned.length < 2000 && advCount === 0) {
    difficultyLevel = 'Easy';
  }

  // Content completeness score: calculate based on section presence in text
  let completenessScore = 55; // Base
  if (cleaned.toLowerCase().includes('objective') || cleaned.toLowerCase().includes('goal')) completenessScore += 10;
  if (cleaned.toLowerCase().includes('activity') || cleaned.toLowerCase().includes('exercise')) completenessScore += 10;
  if (cleaned.toLowerCase().includes('assessment') || cleaned.toLowerCase().includes('quiz') || cleaned.toLowerCase().includes('test')) completenessScore += 10;
  if (cleaned.toLowerCase().includes('summary') || cleaned.toLowerCase().includes('recap') || cleaned.toLowerCase().includes('conclusion')) completenessScore += 10;
  if (cleaned.length > 4000) completenessScore += 5;
  completenessScore = Math.min(98, completenessScore);

  // Feedback Engine calculation
  const clarityScore = Math.round((7.5 + (cleaned.length % 15) / 10) * 10) / 10; // 7.5 - 9.0
  const structureScore = Math.round((7.0 + (cleaned.split('\n').length % 20) / 10) * 10) / 10;
  const engagementScore = Math.round((6.0 + (cleaned.toLowerCase().includes('activity') ? 2.5 : 0.5) + (Math.random() * 1.0)) * 10) / 10;
  
  // Vocabulary simplicity: inverse of length & density of long words
  const words = cleaned.split(' ').filter(w => w.length > 0);
  const longWords = words.filter(w => w.length > 8).length;
  const longWordRatio = words.length > 0 ? (longWords / words.length) : 0;
  const vocabularyScore = Math.round((9.5 - (longWordRatio * 10) - (difficultyLevel === 'Hard' ? 1.0 : 0)) * 10) / 10;

  const effectivenessScore = Math.round(((clarityScore + structureScore + engagementScore) / 3) * 10) / 10;

  // Weakness detection for improvements/suggestions
  const improvements = [];
  const strengths = [
    `Strong core coverage of ${keyConcepts.slice(0, 2).join(' and ')}.`,
    `Clear logical progression in explaining ${topic}.`,
    `Objectives are appropriate for the target ${difficultyLevel} level.`
  ];

  if (!cleaned.toLowerCase().includes('activity') && !cleaned.toLowerCase().includes('group')) {
    improvements.push('Incorporate more collaborative peer-to-peer activities to boost student engagement.');
  }
  if (!cleaned.toLowerCase().includes('assessment') && !cleaned.toLowerCase().includes('quiz')) {
    improvements.push('Add an explicit formative assessment element (like a verbal checkout or mini-quiz) mid-lesson.');
  }
  if (improvements.length === 0) {
    improvements.push('Consider adding differentiated extension tasks for high-achieving student subgroups.');
    improvements.push('Provide a visual scaffolding framework (like a Venn diagram or map) for complex subsections.');
  } else {
    // Add one general
    improvements.push('Explicitly link learning objectives to real-world applications in the introductory hook.');
  }

  const missingConcepts = profile.missingList.slice(0, improvements.length + 1);

  // Overall assessment
  const overallAssessment = `This lesson document provides a ${completenessScore >= 80 ? 'highly thorough' : 'decent'} structured approach to teaching ${topic} in ${subject}. The key concepts are laid out logically, which helps in clarity. However, the plan could be enhanced by strengthening the ${engagementScore < 7.5 ? 'student engagement potential' : 'formative assessment indicators'} and integrating active learning methods rather than focusing mainly on teacher-led instruction.`;

  // Recommendations
  const improvementTips = [
    `Transform the passive reading sections into active 'guided discovery' tasks.`,
    `Use a visual note-taking format (like Cornell notes or sketch-noting) to aid concept retention.`,
    `Explicitly address the detected missing elements: ${missingConcepts.slice(0, 2).join(', ')}.`,
    `Set a strict timer (e.g. 10 mins maximum) for continuous lecture segments before executing a student checkout.`
  ];

  return {
    metadata: {
      subject,
      topic,
      title,
      objectives,
      teachingMethod: detectedMethod,
      expectedOutcomes,
      keyConcepts,
      difficultyLevel,
      completenessScore
    },
    feedback: {
      clarityScore,
      structureScore,
      engagementScore,
      vocabularyScore,
      effectivenessScore,
      overallAssessment,
      strengths,
      improvements,
      missingConcepts
    },
    recommendations: {
      improvementTips,
      classroomActivities: profile.activities,
      explanationStrategies: [
        'Analogous Explanations: Use structural mapping to explain abstract relationships.',
        'Socratic Questioning: Guide students to the answer through sequence of logical questions.',
        'Model-Practice-Check: Demonstrate live on the board, practice in pairs, check with index cards.'
      ],
      visualSuggestions: profile.visuals,
      realWorldExamples: profile.realWorld
    }
  };
}
