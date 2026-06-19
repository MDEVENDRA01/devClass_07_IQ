// ============================================
// AI Question Generator Engine
// ============================================

const GENERIC_QUESTIONS = {
  MCQ: {
    Easy: [
      {
        question: "What is the primary definition of {concept}?",
        options: ["The fundamental building block or rule", "A temporary state of matter", "An advanced formula for calculation", "An obsolete concept in the field"],
        answer: "The fundamental building block or rule"
      },
      {
        question: "Which of the following best represents an example of {concept} in everyday life?",
        options: ["A static object at rest", "A standard application of the core principles", "A complex equation on a chalkboard", "A system operating in vacuum"],
        answer: "A standard application of the core principles"
      }
    ],
    Medium: [
      {
        question: "How does {concept} directly relate to the overall process of {topic}?",
        options: ["It has no relationship", "It acts as a primary catalyst/step", "It is only a byproduct", "It negates the chemical/logical stability"],
        answer: "It acts as a primary catalyst/step"
      },
      {
        question: "What is a common misconception about {concept}?",
        options: ["That it happens instantly under all conditions", "That it requires external electrical charge", "That it is only valid in laboratory conditions", "That it is identical to standard equations"],
        answer: "That it happens instantly under all conditions"
      }
    ],
    Hard: [
      {
        question: "Under which specific constraints does the mathematical/logical theorem governing {concept} break down?",
        options: ["At absolute zero temperature", "When boundary limits exceed infinity", "When assumptions of uniformity and continuity are violated", "During standard temperature and pressure shifts"],
        answer: "When assumptions of uniformity and continuity are violated"
      }
    ]
  },
  ShortAnswer: {
    Easy: [
      { question: "Define the term {concept} in your own words.", answer: "{concept} is a core principle in this topic representing the foundational behaviors/methods studied." },
      { question: "State two basic features or characteristics of {concept}.", answer: "1. It forms the baseline for understanding {topic}. 2. It is easily observable/calculable in standard conditions." }
    ],
    Medium: [
      { question: "Explain the difference between {concept} and standard processes in {subject}.", answer: "Unlike ordinary processes, {concept} specifically requires balanced configurations and direct integration within {topic}." },
      { question: "Describe the step-by-step mechanism of {concept}.", answer: "First, the system initializes parameters. Second, energy/logic transitions occur. Finally, it reaches an equilibrium or output state." }
    ],
    Hard: [
      { question: "Critically analyze how changing the external variables of a system affects the stability of {concept}.", answer: "Changing variables alters the rate coefficient or computational limits, which can destabilize the equilibrium and lead to anomalous behaviors." }
    ]
  },
  LongAnswer: {
    Easy: [
      { question: "Provide a comprehensive explanation of {topic}, detailing the role played by {concept}.", answer: "Students should structure their answer into an introduction of {topic}, a detailed explanation of its parts, and a paragraph explaining how {concept} behaves as a cornerstone." }
    ],
    Medium: [
      { question: "Design an experiment or outline a proof to verify the behavior of {concept} under standard conditions.", answer: "Students should list required tools/materials, formulate a clear hypothesis, describe control and experimental setups, and state expected observation outcomes." }
    ],
    Hard: [
      { question: "Evaluate the historical development or advanced application of {concept} in modern research. What are its current limitations?", answer: "Students must discuss the evolution of the concept, write down its practical applications in modern industry, and critically examine issues like efficiency bounds or resolution limits." }
    ]
  },
  Conceptual: {
    Easy: [
      { question: "Why is {concept} considered essential to the study of {topic}?", answer: "Because without understanding {concept}, one cannot model the complex interactions that follow in {topic}." }
    ],
    Medium: [
      { question: "If {concept} did not exist, how would the balance in {topic} be affected? Predict the consequences.", answer: "The system would lose its balancing mechanism, resulting in an unregulated cascade or mathematical undefined behavior." }
    ],
    Hard: [
      { question: "Formulate a mathematical or conceptual model that links {concept} to secondary components in {subject}.", answer: "Students must construct a clear schematic or equation showing direct and inverse relationships between {concept} and outer parameters." }
    ]
  },
  CriticalThinking: {
    Easy: [
      { question: "Classify the elements of {topic} from simplest to most complex. Where does {concept} fit?", answer: "Identify simple constituents, place {concept} in the transition zone, and link it to the complex macro-structures." }
    ],
    Medium: [
      { question: "Compare and contrast {concept} with alternative theories or methods in {subject}.", answer: "List at least two similarities (like conservation laws or logic structures) and three key differences (like scope and precision)." }
    ],
    Hard: [
      { question: "A scientist claims that {concept} is a subset of a larger, unobserved phenomenon. Formulate an argument supporting or refuting this claim.", answer: "Evaluate theoretical consistency, cite empirical testability, and outline potential validation mechanisms." }
    ]
  },
  ScenarioBased: {
    Easy: [
      { question: "Suppose you observe {concept} happening in a local environment. Describe what you would see.", answer: "Explain visual cues or data outputs indicating that the process is actively occurring." }
    ],
    Medium: [
      { question: "A school laboratory is attempting to demonstrate {concept} but keeps failing. The temperature is extremely high. Diagnose the issue.", answer: "Since {concept} is temperature-sensitive or operates under specific parameter bounds, high temperatures likely denatured catalysts or created computational overflows." }
    ],
    Hard: [
      { question: "You are an engineer designing a system that relies on {concept}. You have a limited budget and strict weight constraints. How would you optimize the design?", answer: "Draft a plan maximizing efficiency per unit mass, focusing on high-selectivity reactions or high-performance algorithms." }
    ]
  },
  ActivityBased: {
    Easy: [
      { question: "Create a simple poster or flashcard explaining the definition and formula for {concept}.", answer: "Poster must contain: Large clear title, concise definition, colored illustration, and one sample calculation." }
    ],
    Medium: [
      { question: "Conduct a survey of 5 classmates about their understanding of {topic}. Summarize the common doubts.", answer: "Collect survey responses, group them by theme (e.g. math errors vs conceptual blocks), and propose a 5-minute explanation patch." }
    ],
    Hard: [
      { question: "Build a physical or digital model demonstrating the dynamic behavior of {concept} in action. Prepare a 2-minute pitch.", answer: "Deliver a working demo showing inputs, transitions, and outputs with labeled indicators." }
    ]
  }
};

const SUBJECT_SPECIFIC_QUESTIONS = {
  'Biology': {
    MCQ: {
      Easy: [
        {
          question: "Which organelle is known as the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
          answer: "Mitochondria"
        }
      ],
      Medium: [
        {
          question: "During which phase of mitosis do chromosomes align at the equatorial plate?",
          options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
          answer: "Metaphase"
        }
      ],
      Hard: [
        {
          question: "What is the primary role of plastoquinone in the light-dependent reactions of photosynthesis?",
          options: ["To absorb green light wavelengths", "To transfer electrons from PSII to the cytochrome b6f complex", "To catalyze the synthesis of ATP from ADP", "To split water molecules into oxygen"],
          answer: "To transfer electrons from PSII to the cytochrome b6f complex"
        }
      ]
    },
    ShortAnswer: {
      Easy: [
        { question: "Explain the difference between autotrophic and heterotrophic nutrition.", answer: "Autotrophs synthesize their own food using light or chemical energy (e.g., plants), whereas heterotrophs consume organic matter for energy (e.g., animals)." }
      ],
      Medium: [
        { question: "Why is water splitting (photolysis) essential in photosynthesis?", answer: "Photolysis provides electrons to replace those lost by Photosystem II, generates protons (H+) to build a gradient for ATP synthesis, and releases oxygen as a byproduct." }
      ],
      Hard: [
        { question: "Differentiate between C3 and C4 photosynthetic pathways regarding their adaptation to hot climates.", answer: "C4 plants use PEP carboxylase to initially fix carbon in mesophyll cells, raising local CO2 concentration around RuBisCO in bundle-sheath cells, which minimizes photorespiration in hot, dry environments compared to C3 plants." }
      ]
    }
  },
  'Mathematics': {
    MCQ: {
      Easy: [
        {
          question: "What is the degree of a quadratic equation?",
          options: ["1", "2", "3", "4"],
          answer: "2"
        }
      ],
      Medium: [
        {
          question: "If the discriminant (b² - 4ac) of a quadratic equation is zero, the roots are:",
          options: ["Real and distinct", "Real and equal", "Imaginary/Complex", "Rational and unequal"],
          answer: "Real and equal"
        }
      ],
      Hard: [
        {
          question: "For a quadratic equation ax² + bx + c = 0, which condition guarantees that the roots are reciprocal to each other?",
          options: ["a = b", "b = c", "a = c", "b² = 4ac"],
          answer: "a = c"
        }
      ]
    },
    ShortAnswer: {
      Easy: [
        { question: "State the quadratic formula for solving ax² + bx + c = 0.", answer: "x = [-b ± √(b² - 4ac)] / 2a" }
      ],
      Medium: [
        { question: "Solve by factorization: x² - 5x + 6 = 0.", answer: "Factor into (x - 2)(x - 3) = 0. Therefore, the roots are x = 2 and x = 3." }
      ],
      Hard: [
        { question: "If α and β are the roots of equation 2x² - 5x + 7 = 0, find the value of (1/α + 1/β).", answer: "Since α+β = -b/a = 5/2 and αβ = c/a = 7/2. Then 1/α + 1/β = (α+β)/(αβ) = (5/2) / (7/2) = 5/7." }
      ]
    }
  }
};

export function generateQuestionsForLesson(metadata) {
  const { subject, topic, keyConcepts } = metadata;
  
  // Choose primary concept to inject into templates
  const concept = keyConcepts && keyConcepts.length > 0 ? keyConcepts[0] : 'core concepts';
  
  const questionTypes = ['MCQ', 'ShortAnswer', 'LongAnswer', 'Conceptual', 'CriticalThinking', 'ScenarioBased', 'ActivityBased'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  
  const result = {};
  
  questionTypes.forEach(type => {
    result[type] = {};
    
    difficulties.forEach(diff => {
      let list = [];
      
      // Check if we have subject specific overrides
      if (SUBJECT_SPECIFIC_QUESTIONS[subject]?.[type]?.[diff]) {
        list = [...SUBJECT_SPECIFIC_QUESTIONS[subject][type][diff]];
      }
      
      // Fallback/fill up with generic templates
      const genericTemplates = GENERIC_QUESTIONS[type]?.[diff] || [];
      genericTemplates.forEach(tpl => {
        // String replace keywords
        let qText = tpl.question
          .replace(/{concept}/gi, concept)
          .replace(/{topic}/gi, topic)
          .replace(/{subject}/gi, subject);
          
        let aText = tpl.answer
          .replace(/{concept}/gi, concept)
          .replace(/{topic}/gi, topic)
          .replace(/{subject}/gi, subject);
          
        let opts = tpl.options ? tpl.options.map(opt => 
          opt.replace(/{concept}/gi, concept)
             .replace(/{topic}/gi, topic)
             .replace(/{subject}/gi, subject)
        ) : null;
        
        list.push({
          question: qText,
          answer: aText,
          ...(opts && { options: opts })
        });
      });
      
      // Ensure we limit each to 2 questions max per sub-difficulty to prevent UI bloat
      result[type][diff] = list.slice(0, 2);
    });
  });
  
  return result;
}
