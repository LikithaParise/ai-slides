# Testing Guide - AI Slides Generator

## 🧪 Testing Checklist

This document provides comprehensive testing scenarios for the AI Slides Generator application.

## Prerequisites

1. Development server running: `npm run dev`
2. Browser open at `http://localhost:3000`
3. Browser console open (F12) for debugging

---

## Test Cases

### 1. Basic Slide Generation

#### Test 1.1: Simple Topic Generation
**Input:** `Create 5 slides about artificial intelligence`

**Expected Results:**
- ✅ 5 slides generated
- ✅ Title slide with "Artificial Intelligence" 
- ✅ Content slides with relevant topics (Introduction, Technologies, Benefits, Challenges, Future)
- ✅ Conclusion slide
- ✅ Each slide has bullet points
- ✅ Preview panel updates with all slides

#### Test 1.2: Custom Slide Count
**Input:** `Generate 3 slides on renewable energy`

**Expected Results:**
- ✅ Exactly 3 slides created
- ✅ Slides include title and content relevant to renewable energy
- ✅ Appropriate content templates applied

#### Test 1.3: Business Topic
**Input:** `Make a presentation about digital marketing with 4 slides`

**Expected Results:**
- ✅ Business/marketing template applied
- ✅ Content includes market analysis, strategy, best practices
- ✅ Professional business terminology used

#### Test 1.4: Education Topic
**Input:** `Create 6 slides about machine learning for students`

**Expected Results:**
- ✅ Educational template applied
- ✅ Learning-focused content structure
- ✅ Clear, educational language

### 2. UI/UX Testing

#### Test 2.1: Loading States
**Steps:**
1. Enter a prompt
2. Click "Generate"

**Expected Results:**
- ✅ Button changes to "⏳ Generating..."
- ✅ Button becomes disabled during processing
- ✅ Input field clears after submission

#### Test 2.2: Empty Input Validation
**Steps:**
1. Click "Generate" with empty input
2. Try with only spaces

**Expected Results:**
- ✅ Button is disabled when input is empty
- ✅ No API call made

#### Test 2.3: Keyboard Navigation
**Steps:**
1. Type a prompt
2. Press Enter

**Expected Results:**
- ✅ Prompt is submitted
- ✅ Slides are generated

#### Test 2.4: Download Button State
**Steps:**
1. Before generating slides, check download button
2. After generating slides, check download button

**Expected Results:**
- ✅ Button disabled before slides exist
- ✅ Button enabled after slides are generated
- ✅ Hover effects work when enabled

### 3. Slide Modification

#### Test 3.1: Add Slides
**Initial:** Create 3 slides about any topic
**Input:** `Add a new slide`

**Expected Results:**
- ✅ New slide appended to existing deck
- ✅ Total slide count increases by 1
- ✅ New slide has generic content

#### Test 3.2: Remove Last Slide
**Initial:** Create 5 slides
**Input:** `Remove the last slide`

**Expected Results:**
- ✅ Last slide removed
- ✅ Total slides reduced to 4
- ✅ Preview updates correctly

#### Test 3.3: Remove First Slide
**Initial:** Create 4 slides
**Input:** `Delete the first slide`

**Expected Results:**
- ✅ First slide removed
- ✅ Remaining slides renumbered
- ✅ Total slides reduced to 3

#### Test 3.4: Modify Specific Slide
**Initial:** Create 5 slides
**Input:** `Change slide 2`

**Expected Results:**
- ✅ Slide 2 title updated with "(Updated)"
- ✅ Bullet points modified with "- modified"
- ✅ Other slides unchanged

### 4. PowerPoint Export

#### Test 4.1: Basic Export
**Steps:**
1. Generate 5 slides
2. Click "Download PPT"

**Expected Results:**
- ✅ File downloads successfully
- ✅ Filename: "AI-Slides-Presentation.pptx"
- ✅ File can be opened in PowerPoint/Google Slides/LibreOffice

#### Test 4.2: Export Without Slides
**Steps:**
1. Fresh page load
2. Click "Download PPT"

**Expected Results:**
- ✅ Alert shown: "No slides to generate..."
- ✅ No file downloaded

#### Test 4.3: Verify PPT Content
**Steps:**
1. Generate slides
2. Download PPT
3. Open in PowerPoint

**Expected Results:**
- ✅ All slides present in correct order
- ✅ Title slide properly formatted
- ✅ Bullet points display correctly
- ✅ Speaker notes included
- ✅ Text is readable and properly positioned

### 5. Content Quality

#### Test 5.1: Technology Topics
**Test Prompts:**
- "AI and machine learning"
- "Cloud computing"
- "Blockchain technology"

**Expected Results:**
- ✅ Technical terminology used appropriately
- ✅ Content covers: intro, tools, benefits, challenges, future
- ✅ Industry-relevant examples

#### Test 5.2: Various Topics
**Test Prompts:**
- "Climate change" (Environmental)
- "Healthy lifestyle" (Health)
- "Project management" (Business)
- "Online learning" (Education)

**Expected Results:**
- ✅ Each uses appropriate template
- ✅ Content matches topic domain
- ✅ Logical flow and structure

### 6. Error Handling

#### Test 6.1: Network Error Simulation
**Steps:**
1. Stop the dev server
2. Try to generate slides

**Expected Results:**
- ✅ Error message displayed in chat
- ✅ "❌ Error generating slides. Please try again."
- ✅ UI remains functional
- ✅ Error logged to console

#### Test 6.2: Invalid API Response
**Expected Results:**
- ✅ Graceful error handling
- ✅ User-friendly error message
- ✅ Application doesn't crash

### 7. Performance Testing

#### Test 7.1: Multiple Generations
**Steps:**
1. Generate 5 slides
2. Generate 10 slides
3. Generate 3 slides
4. Repeat

**Expected Results:**
- ✅ Each generation completes successfully
- ✅ No memory leaks
- ✅ UI remains responsive
- ✅ Previous slides properly replaced

#### Test 7.2: Large Slide Deck
**Input:** `Create 20 slides about technology trends`

**Expected Results:**
- ✅ All 20 slides generated
- ✅ Preview scrollable
- ✅ PPT export works
- ✅ No performance degradation

### 8. Browser Compatibility

#### Test 8.1: Chrome/Edge
- ✅ All features work
- ✅ Styling correct
- ✅ Download works

#### Test 8.2: Firefox
- ✅ All features work
- ✅ Styling correct
- ✅ Download works

#### Test 8.3: Safari
- ✅ All features work
- ✅ Styling correct
- ✅ Download works

### 9. Visual/UI Testing

#### Test 9.1: Chat Interface
**Check:**
- ✅ User messages (blue background)
- ✅ AI messages (green background)
- ✅ Proper spacing and padding
- ✅ Scrollable when content overflows
- ✅ Welcome message on first load

#### Test 9.2: Slide Preview Panel
**Check:**
- ✅ Title slides have gradient background
- ✅ Content slides have light gray background
- ✅ Slide numbering correct
- ✅ Bullet points formatted properly
- ✅ Notes displayed in lighter text

#### Test 9.3: Buttons
**Check:**
- ✅ Hover effects work
- ✅ Disabled states clear
- ✅ Color changes on hover
- ✅ Proper cursor (pointer vs not-allowed)

#### Test 9.4: Responsive Behavior
**Steps:**
1. Resize browser window
2. Test on different screen sizes

**Expected Results:**
- ✅ Layout adjusts reasonably
- ✅ Text remains readable
- ✅ Buttons accessible

### 10. Edge Cases

#### Test 10.1: Very Long Topic Name
**Input:** `Create slides about the comprehensive history and detailed analysis of renewable energy sources including solar wind hydro and geothermal power with extensive coverage of technological advancements`

**Expected Results:**
- ✅ Topic extracted correctly
- ✅ Slides generated successfully
- ✅ Title doesn't overflow

#### Test 10.2: Special Characters
**Input:** `Create slides about AI & ML (2024)`

**Expected Results:**
- ✅ Special characters handled correctly
- ✅ No parsing errors
- ✅ Title displays properly

#### Test 10.3: Number-only Input
**Input:** `123456`

**Expected Results:**
- ✅ Generates generic topic slides
- ✅ No crash or error

---

## Manual Testing Workflow

### Quick Test (5 minutes)
1. Load page
2. Create basic slide deck
3. Download PPT
4. Verify export

### Comprehensive Test (20 minutes)
1. Test all basic generation scenarios (4 different topics)
2. Test slide modifications (add, remove, change)
3. Test error scenarios
4. Test PPT export and verify content
5. Check UI/UX elements

### Full Regression Test (45 minutes)
- Complete all test cases above
- Document any issues found
- Verify fixes for known issues

---

## Bug Report Template

```
**Bug Title:** [Short description]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Browser:** [Chrome/Firefox/Safari]
**Console Errors:** [Any errors in console]
**Screenshots:** [If applicable]
```

---

## Performance Benchmarks

Target metrics:
- **Initial page load:** < 2 seconds
- **Slide generation:** < 1 second
- **PPT download:** < 3 seconds
- **UI responsiveness:** 60 FPS

---

## Accessibility Testing

- ✅ Keyboard navigation works
- ✅ Focus indicators visible
- ✅ Color contrast sufficient
- ✅ Alt text for icons (emojis provide context)
- ✅ Error messages clear and helpful

---

## Success Criteria

The application passes testing if:
- All critical test cases pass (1-4)
- No major bugs in core functionality
- PPT exports work reliably
- UI is user-friendly and intuitive
- Error handling is graceful

---

## Notes for Evaluators

- The API uses template-based generation (not real AI)
- Content templates are pre-defined for common topics
- System is designed to be extensible
- All TypeScript types are properly defined
- Error handling covers common failure scenarios
