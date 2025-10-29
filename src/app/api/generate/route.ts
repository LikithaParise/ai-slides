import { NextRequest, NextResponse } from "next/server";

type SlideItem = {
  id: string;
  type: string;
  title?: string;
  subtitle?: string | null;
  bullets?: string[];
  notes?: string;
  image?: string | null;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, slideJson } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string" },
        { status: 400 }
      );
    }

    // Generate slides based on the prompt
    const generatedSlides = generateSlidesFromPrompt(prompt, slideJson);

    return NextResponse.json({
      slides: generatedSlides,
      message: "Slides generated successfully",
    });
  } catch (error) {
    console.error("Error generating slides:", error);
    return NextResponse.json(
      { error: "Failed to generate slides" },
      { status: 500 }
    );
  }
}

function generateSlidesFromPrompt(
  prompt: string,
  existingSlides: SlideItem[] | null
): SlideItem[] {
  const lowerPrompt = prompt.toLowerCase();

  // Parse the prompt to understand user intent
  const isUpdate = existingSlides && existingSlides.length > 0;
  const isAdd = lowerPrompt.includes("add") || lowerPrompt.includes("insert");
  const isRemove = lowerPrompt.includes("remove") || lowerPrompt.includes("delete");
  const isModify = lowerPrompt.includes("change") || lowerPrompt.includes("modify") || lowerPrompt.includes("update");

  // Handle updates to existing slides
  if (isUpdate && (isAdd || isRemove || isModify)) {
    return handleSlideUpdate(prompt, existingSlides);
  }

  // Extract number of slides requested
  const slideCountMatch = prompt.match(/(\d+)\s*slide/i);
  const requestedSlideCount = slideCountMatch ? parseInt(slideCountMatch[1]) : 5;

  // Extract topic from prompt
  const topic = extractTopic(prompt);

  // Generate new slide deck
  return generateNewSlides(topic, requestedSlideCount);
}

function extractTopic(prompt: string): string {
  // Remove common phrases to extract the core topic
  const cleanedPrompt = prompt
    .replace(/create|make|generate|build/gi, "")
    .replace(/\d+\s*slides?/gi, "")
    .replace(/about|on|for|regarding/gi, "")
    .replace(/deck|presentation|ppt|powerpoint/gi, "")
    .trim();

  return cleanedPrompt || "General Topic";
}

function generateNewSlides(topic: string, count: number): SlideItem[] {
  const slides: SlideItem[] = [];

  // Title slide
  slides.push({
    id: `slide-${Date.now()}-0`,
    type: "title",
    title: formatTitle(topic),
    subtitle: "AI Generated Presentation",
    notes: "This is the title slide introducing the presentation topic.",
  });

  // Content slides based on topic
  const contentSlides = generateContentForTopic(topic, count - 2); // -2 for title and conclusion
  slides.push(...contentSlides);

  // Conclusion slide
  slides.push({
    id: `slide-${Date.now()}-${count - 1}`,
    type: "content",
    title: "Conclusion",
    bullets: [
      `${formatTitle(topic)} is an important subject`,
      "Key takeaways have been presented",
      "Further exploration is encouraged",
      "Thank you for your attention",
    ],
    notes: "Summary slide wrapping up the presentation.",
  });

  return slides;
}

function formatTitle(text: string): string {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function generateContentForTopic(topic: string, count: number): SlideItem[] {
  const slides: SlideItem[] = [];
  const topicLower = topic.toLowerCase();

  // Define content templates based on common topics
  const contentTemplates = getContentTemplates(topicLower);

  for (let i = 0; i < count; i++) {
    const template = contentTemplates[i % contentTemplates.length];
    slides.push({
      id: `slide-${Date.now()}-${i + 1}`,
      type: "content",
      title: template.title.replace("{{topic}}", formatTitle(topic)),
      bullets: template.bullets.map((b) =>
        b.replace("{{topic}}", formatTitle(topic))
      ),
      notes: template.notes.replace("{{topic}}", formatTitle(topic)),
    });
  }

  return slides;
}

function getContentTemplates(topic: string): Array<{
  title: string;
  bullets: string[];
  notes: string;
}> {
  // Technology topics
  if (
    topic.includes("ai") ||
    topic.includes("artificial intelligence") ||
    topic.includes("machine learning") ||
    topic.includes("technology")
  ) {
    return [
      {
        title: "Introduction to {{topic}}",
        bullets: [
          "Definition and core concepts",
          "Historical development and evolution",
          "Current state of the technology",
          "Key applications and use cases",
        ],
        notes: "This slide introduces the fundamental concepts of {{topic}}.",
      },
      {
        title: "Key Technologies and Tools",
        bullets: [
          "Primary frameworks and platforms",
          "Essential tools and libraries",
          "Development environments",
          "Integration capabilities",
        ],
        notes: "Overview of the technological ecosystem around {{topic}}.",
      },
      {
        title: "Benefits and Advantages",
        bullets: [
          "Improved efficiency and productivity",
          "Cost reduction opportunities",
          "Enhanced accuracy and reliability",
          "Scalability and flexibility",
        ],
        notes: "This slide highlights the positive impacts of {{topic}}.",
      },
      {
        title: "Challenges and Limitations",
        bullets: [
          "Technical complexities and requirements",
          "Resource and infrastructure needs",
          "Ethical considerations",
          "Implementation barriers",
        ],
        notes: "Discussion of challenges faced in {{topic}}.",
      },
      {
        title: "Future Trends",
        bullets: [
          "Emerging technologies and innovations",
          "Predicted market growth",
          "Research and development directions",
          "Potential breakthrough applications",
        ],
        notes: "Looking ahead at the future of {{topic}}.",
      },
    ];
  }

  // Business/Marketing topics
  if (
    topic.includes("business") ||
    topic.includes("marketing") ||
    topic.includes("sales") ||
    topic.includes("strategy")
  ) {
    return [
      {
        title: "{{topic}} Overview",
        bullets: [
          "Market landscape and opportunities",
          "Target audience identification",
          "Competitive analysis",
          "Value proposition",
        ],
        notes: "Overview of the business context for {{topic}}.",
      },
      {
        title: "Strategic Approach",
        bullets: [
          "Core objectives and goals",
          "Implementation methodology",
          "Key performance indicators",
          "Resource allocation",
        ],
        notes: "Strategic framework for {{topic}}.",
      },
      {
        title: "Best Practices",
        bullets: [
          "Industry-proven techniques",
          "Success factors and criteria",
          "Common pitfalls to avoid",
          "Optimization strategies",
        ],
        notes: "Practical guidance for implementing {{topic}}.",
      },
    ];
  }

  // Environmental/Science topics
  if (
    topic.includes("environment") ||
    topic.includes("climate") ||
    topic.includes("energy") ||
    topic.includes("renewable") ||
    topic.includes("sustainability")
  ) {
    return [
      {
        title: "Understanding {{topic}}",
        bullets: [
          "Scientific background and principles",
          "Current global situation",
          "Impact on ecosystems",
          "Importance for future generations",
        ],
        notes: "Foundational knowledge about {{topic}}.",
      },
      {
        title: "Key Solutions and Innovations",
        bullets: [
          "Technological advancements",
          "Policy and regulatory frameworks",
          "Community-based initiatives",
          "International cooperation efforts",
        ],
        notes: "Exploring solutions related to {{topic}}.",
      },
      {
        title: "Taking Action",
        bullets: [
          "Individual responsibility and actions",
          "Corporate sustainability practices",
          "Government policies and programs",
          "Measurable outcomes and goals",
        ],
        notes: "Practical steps for addressing {{topic}}.",
      },
    ];
  }

  // Education topics
  if (
    topic.includes("education") ||
    topic.includes("learning") ||
    topic.includes("teaching") ||
    topic.includes("training")
  ) {
    return [
      {
        title: "{{topic}} Fundamentals",
        bullets: [
          "Core principles and theories",
          "Learning objectives",
          "Pedagogical approaches",
          "Assessment methods",
        ],
        notes: "Introduction to {{topic}} concepts.",
      },
      {
        title: "Modern Methodologies",
        bullets: [
          "Interactive learning techniques",
          "Technology integration",
          "Personalized learning paths",
          "Collaborative approaches",
        ],
        notes: "Contemporary methods in {{topic}}.",
      },
      {
        title: "Measuring Success",
        bullets: [
          "Performance metrics",
          "Feedback mechanisms",
          "Continuous improvement",
          "Long-term outcomes",
        ],
        notes: "Evaluating effectiveness of {{topic}}.",
      },
    ];
  }

  // Health/Fitness topics
  if (
    topic.includes("health") ||
    topic.includes("fitness") ||
    topic.includes("wellness") ||
    topic.includes("nutrition")
  ) {
    return [
      {
        title: "{{topic}} Basics",
        bullets: [
          "Essential principles",
          "Health benefits",
          "Scientific foundations",
          "Common misconceptions",
        ],
        notes: "Fundamental concepts of {{topic}}.",
      },
      {
        title: "Practical Guidelines",
        bullets: [
          "Daily recommendations",
          "Best practices",
          "Safety considerations",
          "Personalization strategies",
        ],
        notes: "Actionable advice for {{topic}}.",
      },
      {
        title: "Long-term Wellness",
        bullets: [
          "Sustainable habits",
          "Progress tracking",
          "Overcoming challenges",
          "Lifestyle integration",
        ],
        notes: "Building lasting results with {{topic}}.",
      },
    ];
  }

  // Default/Generic template
  return [
    {
      title: "Introduction to {{topic}}",
      bullets: [
        "Background and context",
        "Why this topic matters",
        "Key concepts and definitions",
        "Scope of this presentation",
      ],
      notes: "Introductory slide about {{topic}}.",
    },
    {
      title: "Main Points",
      bullets: [
        "First major point about {{topic}}",
        "Second important aspect",
        "Third key consideration",
        "Supporting details and evidence",
      ],
      notes: "Core content related to {{topic}}.",
    },
    {
      title: "Analysis and Insights",
      bullets: [
        "Critical analysis of {{topic}}",
        "Data and research findings",
        "Expert perspectives",
        "Practical implications",
      ],
      notes: "Deeper dive into {{topic}}.",
    },
    {
      title: "Applications",
      bullets: [
        "Real-world applications",
        "Case studies and examples",
        "Industry implementations",
        "Success stories",
      ],
      notes: "Practical applications of {{topic}}.",
    },
    {
      title: "Recommendations",
      bullets: [
        "Best practices for {{topic}}",
        "Action items and next steps",
        "Resources for further learning",
        "Common pitfalls to avoid",
      ],
      notes: "Actionable recommendations for {{topic}}.",
    },
  ];
}

function handleSlideUpdate(
  prompt: string,
  existingSlides: SlideItem[]
): SlideItem[] {
  const lowerPrompt = prompt.toLowerCase();

  // Handle adding new slides
  if (lowerPrompt.includes("add") || lowerPrompt.includes("insert")) {
    const newSlide: SlideItem = {
      id: `slide-${Date.now()}-new`,
      type: "content",
      title: "New Slide",
      bullets: [
        "New content point 1",
        "New content point 2",
        "New content point 3",
      ],
      notes: "This is a newly added slide.",
    };
    return [...existingSlides, newSlide];
  }

  // Handle removing slides
  if (lowerPrompt.includes("remove") || lowerPrompt.includes("delete")) {
    if (lowerPrompt.includes("last")) {
      return existingSlides.slice(0, -1);
    }
    if (lowerPrompt.includes("first")) {
      return existingSlides.slice(1);
    }
    // Remove slides with matching content
    return existingSlides.filter((slide) => {
      const slideText = `${slide.title} ${slide.bullets?.join(" ")}`.toLowerCase();
      return !prompt.split(" ").some((word) => {
        if (word.length > 4) {
          return slideText.includes(word);
        }
        return false;
      });
    });
  }

  // Handle modifying slides
  if (lowerPrompt.includes("change") || lowerPrompt.includes("modify")) {
    return existingSlides.map((slide, index) => {
      if (lowerPrompt.includes(`slide ${index + 1}`)) {
        return {
          ...slide,
          title: slide.title + " (Updated)",
          bullets: slide.bullets?.map((b) => b + " - modified") || [],
        };
      }
      return slide;
    });
  }

  // Default: return existing slides unchanged
  return existingSlides;
}
