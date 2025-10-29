# ⚡ Quick Start Guide

## 🚀 Get Running in 3 Steps

### Step 1: Clear Cache and Restart

```bash
# Stop the server (Ctrl+C or Cmd+C)

# Delete the .next folder to clear cache
# On Windows:
rmdir /s .next

# On Mac/Linux:
rm -rf .next

# Restart the server
npm run dev
```

### Step 2: Open Browser

Navigate to: **http://localhost:3000**

### Step 3: Test the App

Try this prompt:
```
Create 5 slides about artificial intelligence
```

Click **"✨ Generate"** and watch the magic happen!

---

## 🎯 What You'll See

### When Page Loads:
```
┌─────────────────────────────────────────────────┐
│ 🎨 AI Slides Generator                          │
│ Create professional presentations with AI       │
├─────────────────────────────────────────────────┤
│                                                 │
│ 💬 Welcome Message:                             │
│ "👋 Welcome to AI Slides Generator!"            │
│ "Ask me to create a presentation on any topic." │
│                                                 │
│ 💡 Example prompts:                             │
│ "Create 5 slides about renewable energy"        │
│                                                 │
│ [Input Field: Type your prompt here...]         │
│ [✨ Generate] [📥 Download PPT]                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

### After Generating Slides:
```
┌──────────────────────┬──────────────────────────┐
│ CHAT (Left)          │ PREVIEW (Right)          │
├──────────────────────┼──────────────────────────┤
│ 👤 YOU:              │ 📊 Slides Preview        │
│ Create 5 slides...   │ 5 slides created         │
│                      │                          │
│ 🤖 AI:               │ 📌 TITLE SLIDE          │
│ ✅ Slides generated! │ Artificial Intelligence  │
│                      │                          │
│                      │ 📄 SLIDE 1              │
│                      │ Introduction to AI       │
│                      │ • Definition            │
│                      │ • History               │
│                      │                          │
│                      │ 📄 SLIDE 2              │
│                      │ [More slides...]        │
└──────────────────────┴──────────────────────────┘
```

---

## 🧪 Test These Prompts

### Basic Generation:
```
1. "Create 5 slides about artificial intelligence"
2. "Generate a presentation on renewable energy"
3. "Make 4 slides about digital marketing"
4. "Create 3 slides about climate change"
5. "Generate 6 slides on machine learning"
```

### Modifications:
```
6. "Add a new slide"
7. "Remove the last slide"
8. "Delete the first slide"
9. "Change slide 2"
```

### Different Topics:
```
10. "Create slides about healthy lifestyle" (Health template)
11. "Generate presentation on online learning" (Education template)
12. "Make slides about startup strategies" (Business template)
```

---

## 🎨 Visual Guide

### Colors You'll See:

**Chat Interface:**
- 🔵 **Your messages**: Light blue background
- 🟢 **AI messages**: Light green background
- 🔵 **Generate button**: Blue (#0b5fff)
- 🟢 **Download button**: Green (#10b981)

**Slide Preview:**
- 🟣 **Title slides**: Purple gradient
- ⚪ **Content slides**: Light gray
- 🔵 **Section headers**: Blue accent

---

## 📥 Download Your Presentation

1. Generate slides using any prompt
2. Wait for "✅ Slides generated successfully!"
3. Click **"📥 Download PPT"** button
4. File downloads as **"AI-Slides-Presentation.pptx"**
5. Open in PowerPoint, Google Slides, or LibreOffice

---

## ⚙️ Keyboard Shortcuts

- **Enter**: Submit prompt (same as clicking Generate)
- **Tab**: Navigate between input and buttons
- **Ctrl+A**: Select all text in input

---

## 🐛 Troubleshooting

### Issue: "node:fs error"
**Solution:**
```bash
rm -rf .next
npm run dev
```

### Issue: "Module not found"
**Solution:**
```bash
npm install
npm run dev
```

### Issue: "Download button disabled"
**Solution:**
- Make sure you've generated slides first
- Wait for the message "✅ Slides generated successfully!"
- The library needs a moment to load on first page visit

### Issue: "Blank page"
**Solution:**
1. Open browser console (F12)
2. Look for errors
3. Try clearing cache: Ctrl+Shift+R (or Cmd+Shift+R)

---

## 📊 Expected Performance

- **Page Load**: < 2 seconds
- **Slide Generation**: < 1 second
- **PPT Download**: < 3 seconds
- **UI Interactions**: Instant

---

## ✅ Success Indicators

You know it's working when you see:

1. ✅ Welcome message appears
2. ✅ Example prompts are shown
3. ✅ Input field is active and styled
4. ✅ Buttons have proper colors and hover effects
5. ✅ After generating: Slides appear in preview panel
6. ✅ Download button becomes active (green)
7. ✅ PPT file downloads successfully

---

## 🎯 Quick Test Checklist

Run through this in 2 minutes:

- [ ] Page loads without errors
- [ ] Welcome message displays
- [ ] Input field accepts text
- [ ] Enter key submits prompt
- [ ] Generate button works
- [ ] Slides appear in preview
- [ ] Download button becomes enabled
- [ ] PPT file downloads
- [ ] PPT opens in PowerPoint

---

## 💡 Pro Tips

1. **Keyboard Shortcut**: Press Enter instead of clicking Generate
2. **Topic Variety**: Try different domains (tech, business, health, education)
3. **Slide Count**: Specify any number from 1-20 slides
4. **Modifications**: Use "add", "remove", "change" commands
5. **Multiple Generations**: You can generate new presentations anytime

---

## 🎉 You're Ready!

Everything is set up and working. Just:

```bash
npm run dev
```

And start creating presentations! 🚀

---

## 📞 Need Help?

Check these files for more info:
- **README.md** - Full documentation
- **TESTING.md** - Test scenarios
- **LAYOUT_GUIDE.md** - Visual layout
- **FIX_APPLIED.md** - Recent fixes

**Happy presenting! 🎨✨**
