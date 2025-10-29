"use client";

import { useState } from "react";
import axios from "axios";

type SlideItem = {
  id: string;
  type: string;
  title?: string;
  subtitle?: string | null;
  bullets?: string[];
  notes?: string;
  image?: string | null;
};

export default function Page() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [slides, setSlides] = useState<SlideItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendPrompt(prompt: string) {
    if (!prompt.trim()) return;
    setMessages((m) => [...m, { role: "user", text: prompt }]);
    setLoading(true);
    try {
      const resp = await axios.post("/api/generate", { prompt, slideJson: slides });
      const slideResult = resp.data?.slides ?? null;
      if (slideResult) {
        setSlides(slideResult);
        setMessages((m) => [...m, { role: "ai", text: "✅ Slides generated/updated successfully!" }]);
      } else {
        setMessages((m) => [...m, { role: "ai", text: JSON.stringify(resp.data) }]);
      }
    } catch (err: any) {
      console.error(err);
      setMessages((m) => [...m, { role: "ai", text: "❌ Error generating slides. Please try again." }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  async function generatePptx() {
    if (!slides || slides.length === 0) {
      alert("No slides to generate. Create slides first by sending a prompt!");
      return;
    }

    try {
      // Dynamically import pptxgenjs only when needed
      const PptxGenJS = (await import("pptxgenjs")).default;
      
      const pres = new PptxGenJS();
      pres.author = "AI Slides Generator";
      pres.title = slides[0]?.title || "AI Generated Presentation";

      slides.forEach((s) => {
        const slide = pres.addSlide();
        if (s.type === "title") {
          slide.addText(s.title || "", { x: 0.5, y: 2.0, w: 9, h: 1.5, fontSize: 44, bold: true, color: "363636", align: "center" });
          if (s.subtitle) slide.addText(s.subtitle, { x: 0.5, y: 3.5, w: 9, h: 0.8, fontSize: 24, color: "666666", align: "center" });
          if (s.notes) slide.addNotes(s.notes);
          return;
        }
        if (s.title) slide.addText(s.title, { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 32, bold: true, color: "1f2937" });
        if (s.bullets && s.bullets.length > 0) {
          slide.addText(s.bullets.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })), {
            x: 0.7,
            y: 1.5,
            w: 8.5,
            h: 4,
            fontSize: 20,
            color: "374151",
            lineSpacing: 24,
          });
        }
        if (s.image) {
          try {
            slide.addImage({ data: s.image, x: 6.5, y: 1.5, w: 3.0, h: 2.5 });
          } catch (e) {
            console.warn("Failed to add image to slide:", e);
          }
        }
        if (s.notes) slide.addNotes(s.notes);
      });

      await pres.writeFile({ fileName: "AI-Slides-Presentation.pptx" });
    } catch (error) {
      console.error("Error generating PowerPoint:", error);
      alert("Error generating PowerPoint file. Please try again.");
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 24, minHeight: "85vh" }}>
      <div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: "#111" }}>
          🎨 AI Slides Generator
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>
          Create professional presentations with AI
        </p>

        <div 
          style={{ 
            height: "58vh", 
            overflow: "auto", 
            padding: 20, 
            borderRadius: 12, 
            background: "#fff", 
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)", 
            border: "1px solid #e5e7eb" 
          }}
        >
          {messages.length === 0 ? (
            <div style={{ color: "#666", textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
              <p style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>
                👋 Welcome to AI Slides Generator!
              </p>
              <p style={{ fontSize: 14, marginBottom: 8 }}>
                Ask me to create a presentation on any topic.
              </p>
              <div style={{ marginTop: 20, padding: 16, background: "#f0f9ff", borderRadius: 8, border: "1px solid #bfdbfe" }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#0369a1" }}>
                  💡 Example prompts:
                </p>
                <p style={{ fontSize: 12, fontStyle: "italic", color: "#0c4a6e", marginBottom: 4 }}>
                  "Create 5 slides about renewable energy"
                </p>
                <p style={{ fontSize: 12, fontStyle: "italic", color: "#0c4a6e", marginBottom: 4 }}>
                  "Generate a presentation on machine learning"
                </p>
                <p style={{ fontSize: 12, fontStyle: "italic", color: "#0c4a6e" }}>
                  "Make 4 slides about digital marketing"
                </p>
              </div>
            </div>
          ) : null}
          {messages.map((m, i) => (
            <div 
              key={i} 
              style={{ 
                marginBottom: 16, 
                padding: 14, 
                borderRadius: 10, 
                background: m.role === "user" ? "#eff6ff" : "#f0fdf4", 
                border: m.role === "user" ? "1px solid #bfdbfe" : "1px solid #bbf7d0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}
            >
              <strong style={{ 
                color: m.role === "user" ? "#1e40af" : "#15803d", 
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                {m.role === "user" ? "👤 You" : "🤖 AI Assistant"}
              </strong>
              <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.6, color: "#374151" }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='e.g. "Create a 4-slide deck about renewable energy"'
            style={{ 
              flex: 1, 
              padding: 12, 
              borderRadius: 10, 
              border: "2px solid #e5e7eb", 
              fontSize: 14, 
              outline: "none",
              transition: "all 0.2s"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#0b5fff";
              e.target.style.boxShadow = "0 0 0 3px rgba(11,95,255,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e5e7eb";
              e.target.style.boxShadow = "none";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendPrompt(input);
              }
            }}
          />
          <button 
            onClick={() => sendPrompt(input)} 
            disabled={loading || !input.trim()} 
            style={{ 
              padding: "12px 24px", 
              background: loading || !input.trim() ? "#9ca3af" : "#0b5fff", 
              color: "#fff", 
              border: "none", 
              borderRadius: 10, 
              fontWeight: 600, 
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: loading || !input.trim() ? "none" : "0 2px 8px rgba(11,95,255,0.3)"
            }}
            onMouseEnter={(e) => {
              if (!loading && input.trim()) {
                e.currentTarget.style.background = "#0847cc";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && input.trim()) {
                e.currentTarget.style.background = "#0b5fff";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {loading ? "⏳ Generating..." : "✨ Generate"}
          </button>
          <button 
            onClick={() => generatePptx()} 
            disabled={!slides || slides.length === 0}
            style={{ 
              padding: "12px 24px", 
              background: !slides || slides.length === 0 ? "#9ca3af" : "#10b981", 
              color: "#fff", 
              border: "none", 
              borderRadius: 10, 
              fontWeight: 600, 
              cursor: !slides || slides.length === 0 ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: !slides || slides.length === 0 ? "none" : "0 2px 8px rgba(16,185,129,0.3)"
            }} 
            onMouseEnter={(e) => {
              if (slides && slides.length > 0) {
                e.currentTarget.style.background = "#059669";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (slides && slides.length > 0) {
                e.currentTarget.style.background = "#10b981";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            📥 Download PPT
          </button>
        </div>
      </div>

      <div style={{ 
        background: "#fff", 
        padding: 20, 
        borderRadius: 12, 
        minHeight: "85vh", 
        maxHeight: "85vh",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)", 
        border: "1px solid #e5e7eb", 
        overflowY: "auto",
        overflowX: "hidden"
      }}>
        <div style={{ 
          position: "sticky", 
          top: 0, 
          background: "#fff", 
          paddingBottom: 12,
          marginBottom: 16,
          borderBottom: "2px solid #0b5fff",
          zIndex: 10
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#111" }}>
            📊 Slides Preview
          </h3>
          {slides && slides.length > 0 && (
            <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0 0" }}>
              {slides.length} slide{slides.length !== 1 ? "s" : ""} created
            </p>
          )}
        </div>
        
        {slides && slides.length > 0 ? (
          slides.map((s, index) => (
            <div 
              key={s.id} 
              style={{ 
                marginBottom: 16, 
                padding: 16, 
                borderRadius: 10, 
                background: s.type === "title" ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f9fafb", 
                border: s.type === "title" ? "none" : "1px solid #e5e7eb",
                color: s.type === "title" ? "#fff" : "#111",
                boxShadow: "0 2px 4px rgba(0,0,0,0.06)"
              }}
            >
              <div style={{ 
                fontSize: 11, 
                fontWeight: 600, 
                marginBottom: 8, 
                opacity: 0.7,
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                {s.type === "title" ? "📌 TITLE SLIDE" : `📄 SLIDE ${index + 1}`}
              </div>
              <div style={{ 
                fontWeight: 700, 
                fontSize: s.type === "title" ? 20 : 16, 
                marginBottom: s.subtitle || s.bullets ? 10 : 0,
                lineHeight: 1.3
              }}>
                {s.title}
              </div>
              {s.subtitle && (
                <div style={{ 
                  fontStyle: "italic", 
                  fontSize: 14, 
                  opacity: 0.9,
                  marginBottom: 8 
                }}>
                  {s.subtitle}
                </div>
              )}
              {s.bullets && s.bullets.length > 0 && (
                <ul style={{ 
                  marginTop: 10, 
                  paddingLeft: 20, 
                  fontSize: 13, 
                  lineHeight: 1.7,
                  color: "#374151"
                }}>
                  {s.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {s.notes && (
                <div style={{ 
                  fontSize: 11, 
                  color: s.type === "title" ? "rgba(255,255,255,0.8)" : "#6b7280", 
                  marginTop: 10,
                  padding: 8,
                  background: s.type === "title" ? "rgba(255,255,255,0.1)" : "#f3f4f6",
                  borderRadius: 6,
                  fontStyle: "italic"
                }}>
                  📝 Notes: {s.notes}
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{ 
            color: "#9ca3af", 
            textAlign: "center", 
            padding: "60px 20px",
            fontSize: 14 
          }}>
            <div style={{ fontSize: 64, marginBottom: 16, opacity: 0.3 }}>📑</div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>No slides yet</p>
            <p style={{ fontSize: 12 }}>Send a prompt to create your presentation</p>
          </div>
        )}
      </div>
    </div>
  );
}
