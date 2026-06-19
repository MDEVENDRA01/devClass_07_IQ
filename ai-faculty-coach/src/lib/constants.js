// ============================================
// AI Faculty Coach — Constants & Configuration
// ============================================

export const APP_NAME = 'AI Faculty Coach';
export const INSTITUTION = 'Sri Gowthami Educational Institutions';
export const TAGLINE = 'Elevate Every Lesson with AI';

// Roles
export const ROLES = {
  TEACHER: 'teacher',
  HOD: 'hod',
  ADMIN: 'admin',
};

// Routes
export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  COACH: '/coach',
  LESSON_EVAL: '/lesson-eval',
  HISTORY: '/history',
  ANALYTICS: '/analytics',
  ADMIN: '/admin',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

// Nav Links
export const NAV_LINKS = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: '📊', roles: ['teacher', 'hod', 'admin'] },
  { label: 'Coach', href: ROUTES.COACH, icon: '🎯', roles: ['teacher', 'hod'] },
  { label: 'Lesson Eval', href: ROUTES.LESSON_EVAL, icon: '📄', roles: ['teacher', 'hod'] },
  { label: 'History', href: ROUTES.HISTORY, icon: '📜', roles: ['teacher', 'hod'] },
  { label: 'Analytics', href: ROUTES.ANALYTICS, icon: '📈', roles: ['hod', 'admin'] },
  { label: 'Admin', href: ROUTES.ADMIN, icon: '⚙️', roles: ['admin'] },
];

// Subjects
export const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
  'Hindi', 'Telugu', 'Social Studies', 'Computer Science', 'Commerce',
  'Economics', 'Accountancy', 'Political Science', 'History', 'Geography',
  'Physical Education', 'Art & Craft', 'Other',
];

// Grades
export const GRADES = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12',
  'UG Year 1', 'UG Year 2', 'UG Year 3',
  'PG Year 1', 'PG Year 2',
  'ITI', 'B.Ed', 'M.Ed',
];

// Teaching Methods
export const TEACHING_METHODS = [
  'Lecture', 'Demonstration', 'Discussion', 'Project-Based',
  'Flipped', 'Inquiry-Based', 'Collaborative', 'Mixed',
];

// Resources
export const RESOURCES = [
  'Whiteboard', 'Projector', 'Lab Equipment', 'Digital Devices',
  'Textbook', 'Video', 'Hands-on Materials',
];

// Assessment Methods
export const ASSESSMENT_METHODS = [
  'Quiz', 'Observation', 'Assignment', 'MCQ',
  'Verbal Q&A', 'Practical', 'None',
];

// Mock Users
export const MOCK_USERS = {
  teacher: {
    id: 'u1',
    name: 'Dr. Priya Sharma',
    email: 'priya@gowthami.edu.in',
    role: 'teacher',
    department: 'Science',
    avatar: 'PS',
  },
  hod: {
    id: 'u2',
    name: 'Prof. Rajesh Kumar',
    email: 'rajesh@gowthami.edu.in',
    role: 'hod',
    department: 'Mathematics',
    avatar: 'RK',
  },
  admin: {
    id: 'u3',
    name: 'Admin User',
    email: 'admin@gowthami.edu.in',
    role: 'admin',
    department: 'Administration',
    avatar: 'AU',
  },
};

// Template Presets
export const TEMPLATE_PRESETS = [
  {
    name: '🔬 Science — Photosynthesis',
    subject: 'Biology',
    grade: 'Class 9',
    topic: 'Photosynthesis in Higher Plants',
    teachingMethods: ['Lecture', 'Demonstration'],
    duration: 45,
    learningObjectives: 'After this lesson, students will be able to explain the process of photosynthesis, identify the role of chlorophyll, and describe the light and dark reactions.',
    lessonPlanSummary: 'Begin with a 5-min recap of plant nutrition. Show a 3-min animation of photosynthesis. Explain light reactions (15 min) with diagram on board. Group activity: label photosynthesis stages (10 min). Dark reactions explanation (10 min). Close with 3 MCQs.',
    resources: ['Projector', 'Whiteboard', 'Lab Equipment'],
    assessmentMethod: 'MCQ',
  },
  {
    name: '📐 Maths — Quadratic Equations',
    subject: 'Mathematics',
    grade: 'Class 10',
    topic: 'Solving Quadratic Equations by Factorisation',
    teachingMethods: ['Lecture', 'Discussion'],
    duration: 50,
    learningObjectives: 'Students will be able to identify quadratic equations, solve them using factorisation method, and verify solutions by substitution.',
    lessonPlanSummary: 'Start with 5-min warm-up on linear equations. Introduce quadratic form ax²+bx+c=0 (10 min). Demonstrate factorisation method with 3 examples (15 min). Students practice 4 problems in pairs (15 min). Board work by 2 students (5 min).',
    resources: ['Whiteboard', 'Textbook'],
    assessmentMethod: 'Assignment',
  },
  {
    name: '📖 English — Creative Writing',
    subject: 'English',
    grade: 'Class 8',
    topic: 'Narrative Essay Writing',
    teachingMethods: ['Discussion', 'Collaborative'],
    duration: 45,
    learningObjectives: 'Students will learn to structure a narrative essay with introduction, body, and conclusion. They will use descriptive language and dialogue effectively.',
    lessonPlanSummary: 'Read aloud a short story excerpt (5 min). Discuss narrative elements: setting, character, conflict, resolution (10 min). Show essay structure template (5 min). Brainstorming activity in groups (10 min). Individual writing: first paragraph (10 min). Peer review of 1 paragraph (5 min).',
    resources: ['Textbook', 'Whiteboard'],
    assessmentMethod: 'Assignment',
  },
];
