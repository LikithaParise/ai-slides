# AI Slides Generator

An intelligent presentation generator built with Next.js that creates PowerPoint slides from natural language prompts.

## 🌟 Features

- **AI-Powered Slide Generation**: Generate complete slide decks from simple text prompts
- **Smart Topic Detection**: Automatically detects topics and creates contextually relevant content
- **Multiple Topic Templates**: Pre-configured templates for:
  - Technology & AI
  - Business & Marketing
  - Environment & Sustainability
  - Education & Learning
  - Health & Fitness
  - General Topics
- **Interactive Chat Interface**: Conversational UI to refine and modify slides
- **Real-time Preview**: See your slides before downloading
- **PowerPoint Export**: Download presentations as `.pptx` files
- **Slide Management**: Add, remove, or modify individual slides

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or download the project files

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

<img width="960" height="539" alt="image" src="https://github.com/user-attachments/assets/90a03b0d-9ecb-4705-a327-d855e940fa52" />


### Creating a New Presentation

Simply type a prompt describing what you want. Examples:

```
Create a 5-slide deck about artificial intelligence
```

```
Generate a presentation on renewable energy with 4 slides
```

```
Make slides about digital marketing strategies
```

### Modifying Existing Slides

Once you have slides, you can modify them:

```
Add a new slide
```

```
Remove the last slide
```

```
Change slide 2
```

### Downloading Your Presentation

Click the **"Generate PPT"** button to download your slides as a PowerPoint file.

## 🛠️ Technical Architecture

### Frontend (`src/app/page.tsx`)
- React-based chat interface
- Real-time slide preview
- Integration with pptxgenjs for PowerPoint generation

### Backend API (`src/app/api/generate/route.ts`)
- Next.js API Route
- Natural language processing for prompt understanding
- Template-based slide generation system
- Support for slide CRUD operations

### Key Technologies

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **PptxGenJS**: PowerPoint file generation
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Styling framework

## 📁 Project Structure

```
ai-slides/
├── src/
│   └── app/
│       ├── api/
│       │   └── generate/
│       │       └── route.ts      # API endpoint for slide generation
│       ├── globals.css           # Global styles
│       ├── layout.tsx            # Root layout
│       └── page.tsx              # Main application page
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── next.config.ts               # Next.js configuration
```

<img width="1920" height="1078" alt="image" src="https://github.com/user-attachments/assets/ee8f11f7-fd22-43ce-8cf0-b69e0d1d4037" />


## 🎯 Features Breakdown

### Intelligent Prompt Parsing

The system analyzes prompts to:
- Extract the number of slides requested
- Identify the topic/subject
- Determine user intent (create, modify, delete)

### Template System

Pre-built content templates for different domains ensure:
- Contextually relevant slide content
- Professional structure and flow
- Consistent formatting across presentations

### Slide Types

- **Title Slide**: Introductory slide with main title and subtitle
- **Content Slide**: Standard slide with title and bullet points
- **Conclusion Slide**: Summary and closing remarks

## 🔧 API Reference

### POST `/api/generate`

Generate or modify slides based on a text prompt.

**Request Body:**
```json
{
  "prompt": "Create 4 slides about machine learning",
  "slideJson": [] // Optional: existing slides for modifications
}
```

**Response:**
```json
{
  "slides": [
    {
      "id": "slide-1234567890-0",
      "type": "title",
      "title": "Machine Learning",
      "subtitle": "AI Generated Presentation",
      "notes": "This is the title slide..."
    }
  ],
  "message": "Slides generated successfully"
}
```

## 🎨 Customization

### Adding New Topic Templates

Edit `src/app/api/generate/route.ts` and add your template to the `getContentTemplates()` function:

```typescript
if (topic.includes("your-topic")) {
  return [
    {
      title: "Your Slide Title",
      bullets: ["Point 1", "Point 2", "Point 3"],
      notes: "Slide notes here"
    }
  ];
}
```

### Modifying Slide Styling

Edit the PowerPoint generation in `src/app/page.tsx`:

```typescript
function generatePptx() {
  // Customize fonts, colors, positions
  slide.addText(s.title, { 
    x: 0.5, 
    y: 0.3, 
    fontSize: 26, 
    bold: true,
    color: "363636" // Add custom colors
  });
}
```

## 🧪 Testing

Test different prompt types:

1. **Basic Generation**: "Create 5 slides about Python programming"
2. **Specific Count**: "Make a 3-slide presentation on climate change"
3. **Topic Variations**: Try different topics to see template variety
4. **Modifications**: "Add a new slide", "Remove last slide"

## 📋 Assignment Requirements Checklist

✅ Next.js application with API routes  
✅ TypeScript implementation  
✅ Natural language prompt processing  
✅ Dynamic slide generation  
✅ PowerPoint export functionality  
✅ Real-time preview  
✅ Clean, maintainable code structure  
✅ Error handling  
✅ Responsive UI  

## 🐛 Troubleshooting

### Slides Not Generating
- Check browser console for errors
- Ensure development server is running
- Verify API endpoint is accessible at `/api/generate`

### PowerPoint Download Issues
- Check if browser allows downloads
- Ensure pptxgenjs library is properly installed
- Verify slide data structure is correct

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## 🔮 Future Enhancements

Potential improvements for this project:

- Integration with real AI APIs (OpenAI, Claude, etc.)
- Image search and insertion
- Custom themes and templates
- Collaboration features
- Version history
- Export to PDF and Google Slides
- Slide animations and transitions

## 📄 License

This project is created for educational and assessment purposes.

## 👨‍💻 Developer

Created as part of a Naukri technical assignment demonstrating:
- Full-stack development skills
- API design and implementation
- Frontend architecture
- TypeScript proficiency
- Problem-solving abilities

---

**Note**: This is a demo application. For production use, consider integrating with actual AI APIs for more sophisticated content generation.
