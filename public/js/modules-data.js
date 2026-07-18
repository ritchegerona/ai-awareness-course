// ===== UNIFIED COURSE DATA =====
// All modules from Foundations, Intermediate, and Advanced tracks

const MODULES = [
  // ===== FOUNDATIONS TRACK (Part 1) =====
  {
    id: 1,
    track: 'foundations',
    title: 'What is AI?',
    subtitle: 'Beyond the Hype — Understanding Artificial Intelligence',
    duration: '25 min',
    icon: '🤖',
    content: `
      <div class="content-section">
        <h3>What Comes to Mind When You Hear "AI"?</h3>
        <p>For most people, "AI" brings up images of sentient robots, self-driving cars, or ChatGPT. But artificial intelligence is much broader — and already deeply embedded in tools you use every single day at work.</p>
      </div>
      <div class="content-section">
        <h3>Types of AI: A Simple Framework</h3>
        <table class="compare-table">
          <tr><th>Type</th><th>What It Does</th><th>Example</th></tr>
          <tr><td><strong>Narrow AI</strong></td><td>Excels at one specific task</td><td>ChatGPT, Google Maps, facial recognition</td></tr>
          <tr><td><strong>General AI</strong></td><td>Human-level intelligence across tasks</td><td>Doesn't exist yet (and isn't close)</td></tr>
          <tr><td><strong>Super AI</strong></td><td>Beyond human intelligence</td><td>Pure science fiction</td></tr>
        </table>
        <p><strong>Every AI system in use today is Narrow AI.</strong> It's incredibly good at one thing — but has no consciousness, understanding, or general intelligence.</p>
      </div>
      <div class="content-section">
        <h3>Myths vs. Reality</h3>
        <div class="two-col">
          <div class="callout warning">
            <strong>❌ Myth</strong>
            <p>"AI will become conscious and take over the world."</p>
          </div>
          <div class="callout success">
            <strong>✅ Reality</strong>
            <p>Today's AI has zero consciousness. It's a pattern-matching tool, not a mind.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What type of AI do all current systems fall under?', options: ['General AI', 'Narrow AI', 'Super AI', 'Conscious AI'], answer: 1 },
      { q: 'Which of these is an example of AI you might use at work?', options: ['A stapler', 'Email spam filters', 'A whiteboard', 'A filing cabinet'], answer: 1 },
      { q: 'Can today\'s AI systems think and understand like humans?', options: ['Yes, ChatGPT can think', 'No, they are pattern-matching tools without consciousness', 'Only some advanced systems can', 'Scientists disagree on this'], answer: 1 },
      { q: 'How does an LLM actually generate text?', options: ['It thinks and formulates ideas', 'It predicts the next most likely word based on patterns', 'It searches the internet for answers', 'It asks another AI for help'], answer: 1 },
      { q: 'What does "hallucination" mean in generative AI?', options: ['The AI is dreaming about cats', 'The AI generates confidently false information', 'The AI refuses to answer', 'The AI creates images from text'], answer: 1 }
    ]
  },
  {
    id: 2,
    track: 'foundations',
    title: 'AI Beyond Chatbots',
    subtitle: 'Computer Vision, Speech, Recommendations & More',
    duration: '30 min',
    icon: '👁',
    content: `
      <div class="content-section">
        <h3>AI Is Much More Than a Chatbot</h3>
        <p>ChatGPT made AI famous, but the technology behind it — machine learning — powers dozens of capabilities that don't involve typing messages.</p>
      </div>
      <div class="content-section">
        <h3>👁 Computer Vision — AI That "Sees"</h3>
        <p>Computer vision enables machines to interpret and understand visual information from the world.</p>
        <div class="two-col">
          <div class="concept-card">
            <h4>📄 Document Scanning</h4>
            <p>Apps like Adobe Scan and Google Lens turn photos of documents into searchable PDFs.</p>
          </div>
          <div class="concept-card">
            <h4>🖼 Image Recognition</h4>
            <p>Google Photos recognizes faces, objects, and places without manual tagging.</p>
          </div>
        </div>
      </div>
      <div class="content-section">
        <h3>📊 Predictive Analytics — AI That "Forecasts"</h3>
        <p>Predictive analytics uses historical data to forecast future outcomes.</p>
        <table class="compare-table">
          <tr><th>Department</th><th>What AI Predicts</th></tr>
          <tr><td>HR</td><td>Which employees might leave (attrition risk)</td></tr>
          <tr><td>Sales</td><td>Which leads are most likely to convert</td></tr>
        </table>
      </div>
    `,
    questions: [
      { q: 'Which AI capability would you use to automatically transcribe meeting recordings?', options: ['Computer Vision', 'Speech Recognition', 'Predictive Analytics', 'Recommendation System'], answer: 1 },
      { q: 'HR teams can use predictive analytics to:', options: ['Generate meeting transcripts', 'Identify employees at risk of leaving', 'Recognize faces in photos', 'Write emails automatically'], answer: 1 },
      { q: 'What does Robotic Process Automation (RPA) primarily do?', options: ['Chat with customers', 'Handle repetitive digital tasks automatically', 'Recognize images', 'Predict future trends'], answer: 1 },
      { q: 'How does Netflix\'s recommendation system work?', options: ['It randomly picks shows', 'It analyzes your viewing history to predict what you\'ll like', 'Editors manually choose recommendations', 'It asks you to rate every show'], answer: 1 },
      { q: 'Computer Vision in the workplace could be used for:', options: ['Writing emails', 'Scanning and extracting info from documents', 'Predicting sales', 'Recommending training courses'], answer: 1 }
    ]
  },
  {
    id: 3,
    track: 'foundations',
    title: 'How AI Works',
    subtitle: 'A Non-Technical Guide to Machine Learning',
    duration: '25 min',
    icon: '⚙️',
    content: `
      <div class="content-section">
        <h3>The Core Idea: Learning from Examples</h3>
        <p>Traditional programming is like giving someone a recipe book. You give the computer exact instructions for every step.</p>
        <p><strong>Machine learning is different.</strong> Instead of giving instructions, you show the computer thousands of examples and let it figure out the patterns itself.</p>
      </div>
      <div class="content-section">
        <h3>The 3-Step AI Process</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>1️⃣ Training</h4>
            <p>Feed the AI thousands of examples (data). The AI finds patterns and creates rules.</p>
          </div>
          <div class="concept-card">
            <h4>2️⃣ Testing</h4>
            <p>Give the AI NEW examples. Check if it correctly applies patterns to new data.</p>
          </div>
          <div class="concept-card">
            <h4>3️⃣ Inference</h4>
            <p>Deploy the trained AI to work on real data. It makes predictions or decisions.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is the main difference between traditional programming and machine learning?', options: ['ML is faster to write', 'ML learns patterns from examples instead of following explicit instructions', 'Traditional programming is newer', 'ML doesn\'t use computers'], answer: 1 },
      { q: 'What determines the quality of an AI system the most?', options: ['The programming language used', 'The speed of the computer', 'The quality and quantity of training data', 'The color of the UI'], answer: 2 },
      { q: 'Which type of machine learning uses labeled examples?', options: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Random Learning'], answer: 2 },
      { q: 'What does "Garbage In, Garbage Out" mean in AI?', options: ['AI refuses to process messy data', 'Poor quality data produces poor quality AI results', 'AI generates garbage content', 'AI cleans up messy data automatically'], answer: 1 },
      { q: 'What happens during the "inference" stage?', options: ['The AI is being trained', 'The AI is tested against new data', 'The trained AI is deployed to work on real data', 'The AI is turned off'], answer: 2 }
    ]
  },
  {
    id: 4,
    track: 'foundations',
    title: 'AI in the Workplace',
    subtitle: 'Practical Applications for Your Daily Work',
    duration: '30 min',
    icon: '🏢',
    content: `
      <div class="content-section">
        <h3>AI Is Already Transforming How We Work</h3>
        <p>From HR to finance to operations — every department can benefit from AI.</p>
      </div>
      <div class="content-section">
        <h3>📋 HR & Recruitment</h3>
        <ul>
          <li><strong>Resume Screening:</strong> AI scans resumes and ranks candidates automatically.</li>
          <li><strong>Candidate Chatbots:</strong> AI chatbots answer questions and schedule interviews 24/7.</li>
        </ul>
      </div>
      <div class="content-section">
        <h3>🛠 Common AI Tools for the Workplace</h3>
        <table class="compare-table">
          <tr><th>Tool</th><th>What It Does</th><th>Best For</th></tr>
          <tr><td><strong>Microsoft Copilot</strong></td><td>AI assistant integrated into Office 365</td><td>Writing documents, analyzing Excel data</td></tr>
          <tr><td><strong>ChatGPT / Claude</strong></td><td>General-purpose AI assistant</td><td>Research, drafting, brainstorming</td></tr>
        </table>
      </div>
    `,
    questions: [
      { q: 'Which AI tool is best for improving written communication in emails?', options: ['Canva AI', 'Grammarly', 'Otter.ai', 'Excel'], answer: 1 },
      { q: 'How can AI help in HR recruitment?', options: ['Generating payroll', 'Screening and ranking resumes automatically', 'Scheduling team parties', 'Designing office layout'], answer: 1 },
      { q: 'What should you do before using a public AI tool at work?', options: ['Nothing, just use it', 'Check with IT about data privacy policies', 'Buy a license first', 'Ask a colleague for permission'], answer: 1 },
      { q: 'Microsoft Copilot is best for:', options: ['Graphic design', 'Video editing', 'Writing documents and analyzing Excel data', 'Social media management'], answer: 2 },
      { q: 'What is the first step in adopting AI at work?', options: ['Buy the most expensive tool', 'Identify repetitive, routine tasks', 'Train everyone for a week', 'Replace all manual work with AI'], answer: 1 }
    ]
  },
  {
    id: 5,
    track: 'foundations',
    title: 'Generative AI & LLMs',
    subtitle: 'How ChatGPT and Similar AI Actually Work',
    duration: '30 min',
    icon: '🧠',
    content: `
      <div class="content-section">
        <h3>What Is Generative AI?</h3>
        <p>Generative AI creates new content — text, images, music, code, videos — rather than just analyzing existing data.</p>
      </div>
      <div class="content-section">
        <h3>What is an LLM (Large Language Model)?</h3>
        <p>LLMs are the technology behind ChatGPT, Claude, Gemini. An LLM is like an incredibly well-read assistant.</p>
      </div>
      <div class="content-section">
        <h3>What LLMs Are Good At</h3>
        <ul>
          <li><strong>Writing & Editing:</strong> Drafts, summaries, rewrites, translations.</li>
          <li><strong>Brainstorming:</strong> Generating ideas, outlines, frameworks.</li>
          <li><strong>Research Assistance:</strong> Summarizing documents, extracting key points.</li>
        </ul>
      </div>
    `,
    questions: [
      { q: 'What does LLM stand for?', options: ['Large Learning Model', 'Large Language Model', 'Long Logic Machine', 'Linear Language Module'], answer: 1 },
      { q: 'How does an LLM generate text?', options: ['It thinks and formulates ideas', 'It predicts the next most likely word based on patterns', 'It searches the internet for answers', 'It asks another AI for help'], answer: 1 },
      { q: 'What is a "hallucination" in generative AI?', options: ['The AI is dreaming', 'The AI generates confidently false information', 'The AI refuses to answer', 'The AI creates images from text'], answer: 1 },
      { q: 'Which of these is an image generation AI?', options: ['GitHub Copilot', 'DALL-E', 'Otter.ai', 'Grammarly'], answer: 1 },
      { q: 'Why should you be careful about sharing information with public AI tools?', options: ['They are slow', 'They cost too much', 'Data is processed on external servers', 'They don\'t understand your language'], answer: 2 }
    ]
  },
  {
    id: 6,
    track: 'foundations',
    title: 'Prompting & Practical Use',
    subtitle: 'How to Talk to AI and Get Great Results',
    duration: '25 min',
    icon: '💬',
    content: `
      <div class="content-section">
        <h3>Prompting Is a Skill — And You Can Learn It</h3>
        <p>A "prompt" is simply the instruction you give to an AI. The quality of what you get back depends heavily on how you ask.</p>
      </div>
      <div class="content-section">
        <h3>The C.O.R.E. Prompting Framework</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>C — Context</h4>
            <p>Give background. Who are you? What are you working on?</p>
          </div>
          <div class="concept-card">
            <h4>O — Objective</h4>
            <p>State clearly what you want. "Draft an email," "Summarize this document."</p>
          </div>
          <div class="concept-card">
            <h4>R — Requirements</h4>
            <p>Specify format, tone, length, audience.</p>
          </div>
          <div class="concept-card">
            <h4>E — Examples</h4>
            <p>Show the AI what you want. "Like this template..."</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What does the "C" in the C.O.R.E. prompting framework stand for?', options: ['Command', 'Context', 'Code', 'Copy'], answer: 1 },
      { q: 'What is the best approach if an AI gives you an imperfect answer?', options: ['Give up and do it manually', 'Use a different AI tool', 'Refine your prompt and iterate', 'Complain to IT'], answer: 2 },
      { q: 'Which prompt would likely get the BEST result?', options: ['"Write something"', '"Draft a polite reminder email..."', '"Email vendor"', '"Help"'], answer: 1 },
      { q: 'What does "role assignment" mean in prompting?', options: ['Giving the AI a job title', 'Asking the AI to adopt a specific persona', 'Assigning the AI a task', 'Changing the AI\'s name'], answer: 1 },
      { q: 'What should you do BEFORE pasting information into a public AI tool?', options: ['Nothing, it\'s fine', 'Check that it is not confidential', 'Ask a colleague', 'Translate it first'], answer: 1 }
    ]
  },
  {
    id: 7,
    track: 'foundations',
    title: 'AI Ethics & Responsibility',
    subtitle: 'Bias, Privacy, and Using AI Responsibly',
    duration: '20 min',
    icon: '🛡️',
    content: `
      <div class="content-section">
        <h3>With Great Power Comes Great Responsibility</h3>
        <p>AI is a powerful tool — but like any tool, it can be misused.</p>
      </div>
      <div class="content-section">
        <h3>1. Bias in AI</h3>
        <p>AI systems learn from data. If that data contains human biases, the AI will learn and amplify them.</p>
      </div>
      <div class="content-section">
        <h3>2. Privacy & Data Protection</h3>
        <p>When you use AI tools, you're often sending data to external servers. Never share sensitive information.</p>
      </div>
    `,
    questions: [
      { q: 'How does bias enter AI systems?', options: ['AI develops bias on its own', 'Bias enters from biased training data', 'Only deliberately programmed bias', 'Bias only comes from code'], answer: 1 },
      { q: 'What is the "kindergarten rule" for AI privacy?', options: ['Only adults should use AI', 'Only share what you\'d be comfortable seeing on a billboard', 'AI is only for simple questions', 'Don\'t share anything with AI'], answer: 1 },
      { q: 'According to the World Economic Forum, how will AI affect jobs?', options: ['AI will eliminate all jobs', 'AI will create more jobs than it displaces', 'AI has no effect', 'Only tech jobs affected'], answer: 1 },
      { q: 'Who is responsible for AI-generated content?', options: ['The AI company', 'No one', 'The person who used the AI', 'IT department'], answer: 2 },
      { q: 'What should you check before using an AI tool?', options: ['Nothing', 'Whether your organization allows it and protects data', 'Only the price', 'Whether colleagues use it'], answer: 1 }
    ]
  },
  {
    id: 8,
    track: 'foundations',
    title: 'The Future of AI',
    subtitle: 'Where We\'re Headed and How to Stay Ahead',
    duration: '15 min',
    icon: '🚀',
    content: `
      <div class="content-section">
        <h3>What's Coming Next?</h3>
        <p>AI is evolving rapidly. Here are the major trends that will shape how we work.</p>
      </div>
      <div class="content-section">
        <h3>🔮 Key Trends to Watch</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>🤖 AI Agents</h4>
            <p>AI will perform multi-step tasks independently — booking travel, managing projects.</p>
          </div>
          <div class="concept-card">
            <h4>📱 AI in Every App</h4>
            <p>AI is becoming a standard feature in every software product.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is an "AI agent"?', options: ['An AI that only answers questions', 'AI that performs multi-step tasks independently', 'A chatbot with different interface', 'An AI that manages other AIs'], answer: 1 },
      { q: 'How will AI change by 2030?', options: ['AI will replace all human workers', 'AI will be embedded in every app', 'AI will be banned', 'AI will only be used by IT'], answer: 1 },
      { q: 'What is a major challenge?', options: ['AI is too expensive', 'Regulation, deepfakes, and digital divide', 'No one wants to use AI', 'AI doesn\'t work for business'], answer: 1 },
      { q: 'What is the best way to stay ahead?', options: ['Ignore AI', 'Practice weekly, share knowledge, stay informed', 'Only use AI for personal tasks', 'Wait for company training'], answer: 1 },
      { q: 'What determines whether AI is positive?', options: ['The AI technology', 'Government regulation', 'How we choose to use it as humans', 'How fast computers become'], answer: 2 }
    ]
  },
  {
    id: 9,
    track: 'foundations',
    title: 'Data Privacy & AI',
    subtitle: 'What You Can and Cannot Share with AI Tools',
    duration: '20 min',
    icon: '🔒',
    content: `
      <div class="content-section">
        <h3>Privacy Is the #1 Risk in AI Adoption</h3>
        <p>Most AI tools process your data on external servers. Never share sensitive information.</p>
      </div>
      <div class="content-section">
        <h3>Categories of Data: Safe vs. Not Safe</h3>
        <table class="compare-table">
          <tr><th>Safe to Share ✅</th><th>Never Share ❌</th></tr>
          <tr><td>Public information, generic questions</td><td>PII, client data, financial statements, trade secrets</td></tr>
        </table>
      </div>
    `,
    questions: [
      { q: 'What is the "kindergarten rule" for AI privacy?', options: ['Only adults should use AI', 'Only share what you\'d be comfortable seeing on a billboard', 'Don\'t share anything', 'AI is only for simple tasks'], answer: 1 },
      { q: 'Which type of data is safe to share?', options: ['Client contact lists', 'Company financial statements', 'General knowledge questions', 'Employee payroll data'], answer: 2 },
      { q: 'What should you do if unsure?', options: ['Share it anyway', 'Ask your IT or legal department', 'Post on social media', 'Use private browser'], answer: 1 },
      { q: 'Why are enterprise versions different?', options: ['They have better AI models', 'They keep your data within your organization', 'They are cheaper', 'They don\'t use AI'], answer: 1 },
      { q: 'What could happen with GDPR violation?', options: ['Nothing', 'Potential GDPR violation with fines', 'The AI will refuse', 'Only a warning'], answer: 1 }
    ]
  },
  {
    id: 10,
    track: 'foundations',
    title: 'AI Tools Hands-On Guide',
    subtitle: 'Free & Paid Tools You Can Use Today',
    duration: '25 min',
    icon: '🛠',
    content: `
      <div class="content-section">
        <h3>Your AI Toolkit: What's Available Right Now</h3>
        <p>There are dozens of AI tools available — some free, some paid.</p>
      </div>
      <div class="content-section">
        <h3>🗣 ChatGPT (OpenAI)</h3>
        <p><strong>Best for:</strong> General writing, brainstorming, research.</p>
      </div>
      <div class="content-section">
        <h3>How to Choose the Right Tool</h3>
        <div class="callout info">
          <strong>🔑 Simple Decision Framework</strong>
          <p>1. Need sources? → Perplexity. 2. Writing or brainstorming? → ChatGPT. 3. Analyzing long documents? → Claude.</p>
        </div>
      </div>
    `,
    questions: [
      { q: 'Which AI tool is best for research with citations?', options: ['ChatGPT', 'Claude', 'Perplexity AI', 'Notion AI'], answer: 2 },
      { q: 'What is Microsoft Copilot best for?', options: ['Image generation', 'Integration with Office 365', 'Social media management', 'Video editing'], answer: 1 },
      { q: 'Which is key difference between free and enterprise?', options: ['Enterprise tools have worse AI', 'Enterprise keep your data within organization', 'Free tools are faster', 'Free tools don\'t use AI'], answer: 1 },
      { q: 'Which tool for analyzing contracts?', options: ['ChatGPT', 'Claude for document analysis', 'Perplexity', 'Gemini'], answer: 1 },
      { q: 'What for sensitive company data?', options: ['Free version', 'Enterprise tool or no AI', 'Different computer', 'Private browser'], answer: 1 }
    ]
  },
  {
    id: 11,
    track: 'foundations',
    title: 'AI & Communication at Work',
    subtitle: 'Emails, Reports, Presentations & Internal Comms',
    duration: '20 min',
    icon: '📝',
    content: `
      <div class="content-section">
        <h3>AI Is Transforming Workplace Communication</h3>
        <p>Communication is one of the most time-consuming parts of any office job.</p>
      </div>
      <div class="content-section">
        <h3>📧 Email Excellence with AI</h3>
        <ul>
          <li><strong>Drafting:</strong> Give AI the key points and let it write the first draft.</li>
          <li><strong>Summarizing:</strong> Paste a long email thread and ask AI to summarize.</li>
        </ul>
      </div>
    `,
    questions: [
      { q: 'What is best use of AI for email?', options: ['Let AI send without review', 'Use AI to draft, then personalize', 'Never use AI', 'Only personal emails'], answer: 1 },
      { q: 'How can AI help with meeting minutes?', options: ['AI attends meetings', 'AI extracts decisions and action items', 'AI cancels meetings', 'AI records video'], answer: 1 },
      { q: 'What to ALWAYS do before sending AI email?', options: ['Nothing', 'Review, personalize, fact-check', 'Send to manager', 'Only send to close colleagues'], answer: 1 },
      { q: 'Which task is NOT appropriate?', options: ['Drafting weekly report', 'Writing performance review without human input', 'Creating outline', 'Translating email'], answer: 1 },
      { q: 'What % less time on emails?', options: ['About 10%', 'About 40%', 'About 80%', 'About 100%'], answer: 1 }
    ]
  },
  {
    id: 12,
    track: 'foundations',
    title: 'Critical Thinking with AI',
    subtitle: 'When to Trust, When to Verify, When to Ignore',
    duration: '20 min',
    icon: '🧐',
    content: `
      <div class="content-section">
        <h3>The Most Important AI Skill Isn't Technical</h3>
        <p>Knowing when to trust AI output, when to verify it, and when to ignore it entirely.</p>
      </div>
      <div class="content-section">
        <h3>The AI Trust Spectrum</h3>
        <table class="compare-table">
          <tr><th>Trust Level</th><th>Task Type</th><th>Examples</th></tr>
          <tr><td><strong>High Trust</strong></td><td>Creative, low-stakes</td><td>Brainstorming, rewriting sentences</td></tr>
          <tr><td><strong>Low Trust</strong></td><td>Critical, high-stakes</td><td>Medical advice, financial calculations</td></tr>
        </table>
      </div>
    `,
    questions: [
      { q: 'How should you think of AI for critical tasks?', options: ['As an expert', 'As a brilliant but unreliable assistant', 'As a search engine', 'As a replacement'], answer: 1 },
      { q: 'What does "C" in C.H.E.C.K. stand for?', options: ['Computer', 'Claim Check', 'Create', 'Copy'], answer: 1 },
      { q: 'Which task should get ZERO trust?', options: ['Brainstorming', 'Contract language', 'Rewriting sentences', 'Simple questions'], answer: 1 },
      { q: 'What is a common AI red flag?', options: ['AI refusing to answer', 'Being confidently wrong about facts', 'AI being too slow', 'AI asking too many questions'], answer: 1 },
      { q: 'What is the best approach for decision support?', options: ['Follow all recommendations', 'Use AI as starting point and verify', 'Never use AI', 'Only use AI with 3 colleagues'], answer: 1 }
    ]
  },

  // ===== INTERMEDIATE TRACK (Part 2) =====
  {
    id: 13,
    track: 'intermediate',
    title: 'Prompt Engineering Fundamentals',
    subtitle: 'Getting the Most Out of AI Language Models',
    duration: '30 min',
    icon: '🎯',
    content: `
      <div class="content-section">
        <h3>What Is Prompt Engineering?</h3>
        <p>Prompt engineering is the skill of designing effective prompts to get desired outputs from AI models.</p>
      </div>
      <div class="content-section">
        <h3>Core Principles of Effective Prompts</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>🎯 Clarity</h4>
            <p>Use simple, direct language. Avoid ambiguity and jargon.</p>
          </div>
          <div class="concept-card">
            <h4>📋 Specificity</h4>
            <p>Be precise about what you want. Instead of "Write a report," say "Write a one-page executive summary."</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is most important for effective prompts?', options: ['Length', 'Creativity', 'Clarity and specificity', 'Technical jargon'], answer: 2 },
      { q: 'What does "few-shot prompting" mean?', options: ['Using very few words', 'Providing examples to guide AI', 'Limiting responses', 'Quick questions'], answer: 1 },
      { q: 'Which technique helps with complex reasoning?', options: ['Role prompting', 'Zero-shot', 'Chain-of-thought', 'Format specification'], answer: 2 },
      { q: 'When should you use role prompting?', options: ['Always', 'When you need domain-specific expertise', 'When being creative', 'Never'], answer: 1 },
      { q: 'What is a common workplace application?', options: ['Playing games', 'Writing fiction', 'Drafting professional emails', 'Designing games'], answer: 2 }
    ]
  },
  {
    id: 14,
    track: 'intermediate',
    title: 'AI-Powered Data Analysis',
    subtitle: 'Using AI to Understand and Visualize Data',
    duration: '35 min',
    icon: '📊',
    content: `
      <div class="content-section">
        <h3>AI as Your Data Analyst</h3>
        <p>AI can help you explore, understand, and visualize data without needing to be a data scientist.</p>
      </div>
      <div class="content-section">
        <h3>Capabilities of AI in Data Analysis</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>📈 Trend Identification</h4>
            <p>AI can spot trends, seasonality, and anomalies in time-series data.</p>
          </div>
          <div class="concept-card">
            <h4>📝 Natural Language Queries</h4>
            <p>Ask questions like "What were our sales last quarter?" and get answers instantly.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is a key strength of AI in data analysis?', options: ['Replacing analysts', 'Perfect predictions', 'Finding patterns in data', 'Eliminating data cleaning'], answer: 2 },
      { q: 'What does "natural language query" mean?', options: ['Programming languages', 'SQL queries', '"What were our sales last month?"', 'Statistical formulas'], answer: 2 },
      { q: 'Which tool for quick spreadsheet analysis?', options: ['TensorFlow', 'Excel with AI features', 'Photoshop', 'AutoCAD'], answer: 1 },
      { q: 'What should you always do when using AI for analysis?', options: ['Trust completely', 'Verify insights and understand limitations', 'Share sensitive data', 'Ignore quality issues'], answer: 1 },
      { q: 'AI can suggest which visualizations?', options: ['Only pie charts', 'Any chart type based on data', 'Only bar graphs', 'No visualizations'], answer: 1 }
    ]
  },
  {
    id: 15,
    track: 'intermediate',
    title: 'AI for Content Creation',
    subtitle: 'Writing, Design, and Multimedia with AI Assistance',
    duration: '30 min',
    icon: '✨',
    content: `
      <div class="content-section">
        <h3>Beyond Text: AI as a Creative Partner</h3>
        <p>AI isn't just for writing—it can help create images, videos, presentations, and more.</p>
      </div>
      <div class="content-section">
        <h3>AI-Powered Writing Assistance</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>📝 Drafting and Editing</h4>
            <p>AI helps draft emails, reports, proposals, and social media posts.</p>
          </div>
          <div class="concept-card">
            <h4>🎯 Targeted Messaging</h4>
            <p>Adapt your message for different audiences with AI assistance.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is primary benefit of using AI for content?', options: ['Removing creativity', 'Generating perfect content', 'Speeding up drafting and ideas', 'Eliminating editing'], answer: 2 },
      { q: 'Which capability helps turn text into images?', options: ['Text-to-speech', 'Image recognition', 'Text-to-image generation', 'Data clustering'], answer: 2 },
      { q: 'When creating presentations with AI?', options: ['Use output exactly', 'Never use AI', 'Review and customize', 'Only use for title'], answer: 2 },
      { q: 'What is an ethical consideration?', options: ['Long content', 'Ensuring content is funny', 'Disclosing AI involvement', 'Using expensive tool'], answer: 2 },
      { q: 'AI can help with which multimedia tasks?', options: ['Only text', 'Transcription, translation, voice, video', 'Only images', 'None'], answer: 1 }
    ]
  },
  {
    id: 16,
    track: 'intermediate',
    title: 'AI-Powered Automation',
    subtitle: 'Streamlining Repetitive Tasks with Smart Automation',
    duration: '35 min',
    icon: '🤖',
    content: `
      <div class="content-section">
        <h3>From RPA to Intelligent Automation</h3>
        <p>Automation has evolved from simple macros to AI-powered systems that can understand context.</p>
      </div>
      <div class="content-section">
        <h3>Types of AI-Powered Automation</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>📧 Intelligent Email Processing</h4>
            <p>AI can read, categorize, and even draft replies to emails.</p>
          </div>
          <div class="concept-card">
            <h4>📄 Smart Document Processing</h4>
            <p>Go beyond OCR—AI understands document structure and extracts key data.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What distinguishes AI-powered automation from basic?', options: ['More electricity', 'No human involvement', 'Handle variability and context', 'Only text data'], answer: 2 },
      { q: 'Which department benefits most from invoice processing?', options: ['Human Resources', 'Finance', 'Marketing', 'R&D'], answer: 1 },
      { q: 'What is key principle when implementing?', options: ['Automate everything', 'Start small and scale', 'Eliminate oversight', 'Use largest model'], answer: 1 },
      { q: 'What does "human-in-the-loop" mean?', options: ['Humans removed', 'Humans monitor and intervene', 'Humans setup only', 'Humans work separately'], answer: 1 },
      { q: 'AI document processing can do what traditional OCR cannot?', options: ['Scan faster', 'Understand structure and context', 'Work without electricity', 'Only handwritten'], answer: 1 }
    ]
  },
  {
    id: 17,
    track: 'intermediate',
    title: 'AI for Decision Making',
    subtitle: 'Using AI Insights to Make Better Business Choices',
    duration: '30 min',
    icon: '🎯',
    content: `
      <div class="content-section">
        <h3>AI as a Decision Support Tool</h3>
        <p>AI doesn't make decisions for you—it provides insights, predictions, and options to help you decide.</p>
      </div>
      <div class="content-section">
        <h3>How AI Supports Decision Making</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>📊 Predictive Analytics</h4>
            <p>AI forecasts future outcomes based on historical data.</p>
          </div>
          <div class="concept-card">
            <h4>🔍 Scenario Analysis</h4>
            <p>AI can model different "what-if" scenarios.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is primary role of AI in decisions?', options: ['Make final decision', 'Provide insights and analysis', 'Replace meetings', 'Guarantee correct outcomes'], answer: 1 },
      { q: 'Which is NOT a way AI supports decisions?', options: ['Predictive analytics', 'Emotional intuition', 'Scenario analysis', 'Risk assessment'], answer: 1 },
      { q: 'In AI-assisted workflow, what comes after gathering data?', options: ['Make decision', 'Use AI for analysis', 'Define criteria', 'Ignore AI'], answer: 1 },
      { q: 'What is key risk when using AI for decisions?', options: ['AI too slow', 'Over-reliance without judgment', 'AI too fast', 'AI requiring memory'], answer: 1 },
      { q: 'AI can help with strategic planning by?', options: ['Write the plan', 'Analyzing market trends', 'Design logo', 'Handle payroll'], answer: 1 }
    ]
  },
  {
    id: 18,
    track: 'intermediate',
    title: 'AI Ethics and Responsible Use',
    subtitle: 'Beyond the Basics: Fairness, Transparency, Accountability',
    duration: '30 min',
    icon: '⚖️',
    content: `
      <div class="content-section">
        <h3>Deepening Your Understanding of AI Ethics</h3>
        <p>As AI becomes more integrated, ethical considerations become increasingly important.</p>
      </div>
      <div class="content-section">
        <h3>Bias and Fairness in AI Systems</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>🔍 Types of Bias</h4>
            <p>Data bias, algorithmic bias, and interaction bias can lead to unfair outcomes.</p>
          </div>
          <div class="concept-card">
            <h4>📊 Measuring Fairness</h4>
            <p>Metrics used to evaluate whether AI systems treat different groups equitably.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is algorithmic bias in AI?', options: ['Runs too slowly', 'Produces systematically unfair outcomes', 'Prefers certain algorithms', 'Works only business hours'], answer: 1 },
      { q: 'What is key aspect of transparency?', options: ['Making code secret', 'Using complex model', 'Clear documentation', 'Never explaining'], answer: 2 },
      { q: 'What is data minimization?', options: ['Use as much data as possible', 'Only data necessary for purpose', 'Store data in multiple locations', 'Share data with everyone'], answer: 1 },
      { q: 'Why is human oversight important?', options: ['Makes AI faster', 'Catch errors and biases', 'Humans enjoy overseeing', 'Make AI feel appreciated'], answer: 1 },
      { q: 'An AI ethics committee typically:', options: ['Writes code', 'Reviews projects for ethical implications', 'Handles infrastructure', 'Manages payroll'], answer: 1 }
    ]
  },
  {
    id: 19,
    track: 'intermediate',
    title: 'Advanced Prompt Engineering',
    subtitle: 'Complex Techniques for Specialized Tasks',
    duration: '35 min',
    icon: '🔬',
    content: `
      <div class="content-section">
        <h3>Beyond Basic Prompts: Advanced Techniques</h3>
        <p>Once you've mastered basics, these techniques can help with more complex tasks.</p>
      </div>
      <div class="content-section">
        <h3>Advanced Prompting Techniques</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>🔗 Chaining Prompts</h4>
            <p>Break complex tasks into multiple steps, using output of one prompt as input to next.</p>
          </div>
          <div class="concept-card">
            <h4>🎯 Role Chaining</h4>
            <p>Sequence different roles: researcher → writer → editor.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is prompt chaining used for?', options: ['Make AI talk in chains', 'Break complex into steps', 'Encrypt text', 'Make AI speak faster'], answer: 1 },
      { q: 'Which technique helps get structured data?', options: ['Free-form prompting', 'Role prompting only', 'Structured output prompting', 'Using all caps'], answer: 2 },
      { q: 'What does low temperature produce?', options: ['More random', 'More focused', 'Shorter responses', 'No output'], answer: 1 },
      { q: 'When refining prompts iteratively?', options: ['Immediately give up', 'Identify gaps between got and wanted', 'Ignore output', 'Always increase temperature'], answer: 1 },
      { q: 'What is common pitfall?', options: ['Making prompts too short', 'Having conflicting instructions', 'Always getting perfect results', 'Using periods'], answer: 1 }
    ]
  },
  {
    id: 20,
    track: 'intermediate',
    title: 'AI in Specific Industries',
    subtitle: 'Applications in Healthcare, Finance, Marketing, and More',
    duration: '40 min',
    icon: '🏭',
    content: `
      <div class="content-section">
        <h3>AI Across Different Sectors</h3>
        <p>While AI fundamentals are universal, specific industries have unique applications.</p>
      </div>
      <div class="content-section">
        <h3>Healthcare and Life Sciences</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>🩺 Diagnostics and Imaging</h4>
            <p>AI assists in analyzing medical images to detect anomalies.</p>
          </div>
          <div class="concept-card">
            <h4>💊 Drug Discovery</h4>
            <p>AI accelerates identification of potential drug candidates.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'In healthcare, what is one way AI assists with imaging?', options: ['Taking X-rays', 'Replacing radiologists', 'Analyzing images for anomalies', 'Scheduling appointments'], answer: 2 },
      { q: 'Which financial application uses AI for transaction analysis?', options: ['Credit scoring', 'Fraud detection', 'Loan approval', 'Customer service'], answer: 1 },
      { q: 'How does AI help with marketing personalization?', options: ['Same email to everyone', 'Ignoring customer data', 'Tailoring content to individuals', 'Only billboards'], answer: 2 },
      { q: 'What is predictive maintenance in manufacturing?', options: ['Fixing after break', 'Maintenance on fixed schedule', 'Predict when equipment needs service', 'Only newest machines'], answer: 2 },
      { q: 'Why is regulatory compliance important?', options: ['Makes AI expensive', 'Ensures safety and privacy', 'Slows innovation', 'No impact'], answer: 1 }
    ]
  },
  {
    id: 21,
    track: 'intermediate',
    title: 'Evaluating and Selecting AI Tools',
    subtitle: 'How to Choose the Right Solutions for Your Needs',
    duration: '30 min',
    icon: '🔍',
    content: `
      <div class="content-section">
        <h3>Beyond the Hype: Practical Evaluation</h3>
        <p>With countless AI tools available, knowing how to evaluate them is crucial.</p>
      </div>
      <div class="content-section">
        <h3>Evaluation Framework: Key Criteria</h3>
        <table class="compare-table">
          <tr><th>Category</th><th>What to Evaluate</th><th>Questions</th></tr>
          <tr><td><strong>Functionality</strong></td><td>Does it solve your problem?</td><td>Does it perform specific tasks?</td></tr>
          <tr><td><strong>Security</strong></td><td>How does it handle your data?</td><td>What are data protection measures?</td></tr>
        </table>
      </div>
    `,
    questions: [
      { q: 'What is most important first step?', options: ['Cheapest option', 'Most popular tool', 'Define your needs', 'Buy all features'], answer: 2 },
      { q: 'Which category asks about data protection?', options: ['Functionality', 'Usability', 'Cost', 'Security and Privacy'], answer: 3 },
      { q: 'What is a red flag?', options: ['Clear pricing', 'Can explain AI', 'Vague marketing claims', 'Positive reviews'], answer: 2 },
      { q: 'During pilot, why involve end-users?', options: ['Blame if fails', 'Real-world feedback', 'Reduce manager workload', 'Avoid training'], answer: 1 },
      { q: 'What after selecting but before rollout?', options: ['Use immediately company-wide', 'Plan implementation with training', 'Forget project', 'Tell no one'], answer: 1 }
    ]
  },
  {
    id: 22,
    track: 'intermediate',
    title: 'Change Management and AI Adoption',
    subtitle: 'Helping Your Team Embrace AI Tools Successfully',
    duration: '35 min',
    icon: '👥',
    content: `
      <div class="content-section">
        <h3>The Human Side of AI Implementation</h3>
        <p>Technology adoption succeeds or fails based on people, not just features.</p>
      </div>
      <div class="content-section">
        <h3>Common Reactions to AI in the Workplace</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>😨 Fear and Anxiety</h4>
            <p>Concerns about job loss, obsolescence of skills.</p>
          </div>
          <div class="concept-card">
            <h4>🤔 Skepticism and Doubt</h4>
            <p>Questions about whether AI actually works.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is most effective first step?', options: ['Buy expensive tool', 'Mandatory company memo', 'Communicate purpose and benefits', 'Implement without explanation'], answer: 2 },
      { q: 'Which strategy helps with job security concerns?', options: ['Ignoring concerns', 'Explaining augmentation and opportunities', 'Forcing immediate use', 'Promising no learning needed'], answer: 1 },
      { q: 'What is key benefit of starting with quick wins?', options: ['No issues ever', 'Builds confidence and shows value', 'Eliminates training', 'More expensive'], answer: 1 },
      { q: 'How can leaders help build AI-positive culture?', options: ['Never mention AI', 'Prohibiting use', 'Visibly using and discussing AI themselves', 'Assign all to interns'], answer: 2 },
      { q: 'What metric shows learners building capabilities?', options: ['Coffee breaks', 'Training sessions completed', 'Office temperature', 'Pens ordered'], answer: 1 }
    ]
  },
  {
    id: 23,
    track: 'intermediate',
    title: 'Measuring ROI and Impact of AI',
    subtitle: 'Tracking the Value of Your AI Investments',
    duration: '30 min',
    icon: '📈',
    content: `
      <div class="content-section">
        <h3>Why Measure AI Impact?</h3>
        <p>Investing in AI requires resources. Measuring ROI helps justify investments.</p>
      </div>
      <div class="content-section">
        <h3>Types of AI Benefits to Measure</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>💰 Quantitative Benefits</h4>
            <p>Cost savings, revenue increases, reduced processing time.</p>
          </div>
          <div class="concept-card">
            <h4>📊 Qualitative Benefits</h4>
            <p>Improved decision quality, better customer experiences.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is primary purpose of measuring AI ROI?', options: ['Spend as much as possible', 'Justify investment and guide decisions', 'Make AI work faster', 'Eliminate human workers'], answer: 1 },
      { q: 'Which is a quantitative benefit?', options: ['Improved morale', 'Cost savings from reduced time', 'Better decision quality', 'Increased satisfaction'], answer: 1 },
      { q: 'What is first step in setting up measurement?', options: ['Buy more powerful computers', 'Define objectives', 'Choose expensive metrics', 'Wait to see what happens'], answer: 1 },
      { q: 'What is common challenge?', options: ['AI too accurate', 'Isolating AI effect from other changes', 'Too much data', 'AI working too quickly'], answer: 1 },
      { q: 'When reporting to executives, what emphasize?', options: ['Technical details', 'How results support business objectives', 'Number of lines of code', 'Color scheme'], answer: 1 }
    ]
  },
  {
    id: 24,
    track: 'intermediate',
    title: 'Future Trends and Preparing for What\'s Next',
    subtitle: 'Staying Ahead in the Rapidly Evolving AI Landscape',
    duration: '35 min',
    icon: '🔮',
    content: `
      <div class="content-section">
        <h3>The Only Constant is Change</h3>
        <p>AI technology evolves rapidly. Staying informed and adaptable is key.</p>
      </div>
      <div class="content-section">
        <h3>Near-Term Trends (1-2 Years)</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>🚀 Multimodal AI</h4>
            <p>AI that seamlessly works with text, images, audio, and video.</p>
          </div>
          <div class="concept-card">
            <h4>🔗 Increased Integration</h4>
            <p>AI capabilities built directly into everyday software.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is multimodal AI?', options: ['Only text', 'Works with multiple data types', 'Requires multiple devices', 'Only translations'], answer: 1 },
      { q: 'Which near-term trend involves AI in everyday software?', options: ['Quantum AI', 'Increased Integration', 'AI isolation', 'Manual processing'], answer: 1 },
      { q: 'What is key aspect of staying prepared?', options: ['Learn every tool immediately', 'Focus on fundamentals and adaptability', 'Ignore all AI', 'Becoming manager'], answer: 1 },
      { q: 'When building personal roadmap, after assessing?', options: ['Ignore weaknesses', 'Identify your goals', 'Buy expensive equipment', 'Stop learning'], answer: 1 },
      { q: 'What builds AI literacy?', options: ['Only watching movies', 'Learning continuously about capabilities and limitations', 'Reading fiction', 'Avoiding technical details'], answer: 1 }
    ]
  },

  // ===== ADVANCED TRACK (Part 3) =====
  {
    id: 25,
    track: 'advanced',
    title: 'AI Architecture Fundamentals',
    subtitle: 'Systems Thinking for AI Solutions',
    duration: '25 min',
    icon: '🏛️',
    content: `
      <div class="content-section">
        <h3>Designing AI Systems That Scale</h3>
        <p>Like traditional software, AI applications benefit from modular, well-structured designs.</p>
      </div>
      <div class="content-section">
        <h3>The Retrieval-Augmented Generation (RAG) Pattern</h3>
        <p>RAG combines a search/retrieval component with a generative model.</p>
      </div>
      <div class="content-section">
        <h3>Circuit Breakers and Fallbacks</h3>
        <p>Protect your system when upstream AI services are slow or unavailable.</p>
      </div>
    `,
    questions: [
      { q: 'What is primary purpose of circuit breaker?', options: ['Reduce costs', 'Prevent cascade failures', 'Compress prompts', 'Route requests'], answer: 1 },
      { q: 'Which retrieval combines semantic with keyword?', options: ['Pure vector', 'Hybrid search', 'Knowledge graph', 'SQL only'], answer: 1 },
      { q: 'What is key principle for designing agents?', options: ['Give all tools', 'Single responsibility', 'Share all context', 'Use largest model'], answer: 1 },
      { q: 'Why treat prompts as code in production?', options: ['Written in Python', 'They are functions needing tests and monitoring', 'Stored in database', 'Compiled'], answer: 1 },
      { q: 'Which fine-tuning updates ~1% via adapters?', options: ['Full fine-tuning', 'LoRA / QLoRA', 'Continued pre-training', 'RLHF'], answer: 1 }
    ]
  },
  {
    id: 26,
    track: 'advanced',
    title: 'Prompt Engineering at Scale',
    subtitle: 'Production Patterns and Evaluation',
    duration: '30 min',
    icon: '⚡',
    content: `
      <div class="content-section">
        <h3>Prompts as Code</h3>
        <p>Treat prompts with the same rigor as application code: version control, testing, staging.</p>
      </div>
      <div class="content-section">
        <h3>Chain-of-Prompts Pattern</h3>
        <p>Decompose complex tasks into sequential prompts with structured intermediate outputs.</p>
      </div>
      <div class="content-section">
        <h3>Structured Output Enforcement</h3>
        <p>Use JSON Schema, function calling, or constrained decoding to guarantee valid outputs.</p>
      </div>
    `,
    questions: [
      { q: 'Which pattern decomposes tasks into sequential prompts?', options: ['Modular Composition', 'Chain-of-Prompts', 'Mixture-of-Experts', 'Self-Correction'], answer: 1 },
      { q: 'What is purpose of structured output?', options: ['Make prompts shorter', 'Guarantee valid outputs', 'Increase creativity', 'Reduce tokens'], answer: 1 },
      { q: 'What is a "golden dataset"?', options: ['Perfect prompts', '50-200 representative inputs with outputs', 'Training data', 'Dataset of complaints'], answer: 1 },
      { q: 'What is recommended deployment strategy?', options: ['Direct production', 'Canary deployment with auto-rollback', 'Deploy only weekends', 'No deployment needed'], answer: 1 },
      { q: 'How many prompts in golden dataset?', options: ['5-10', '50-200', '1000+', 'Only 1'], answer: 1 }
    ]
  },
  {
    id: 27,
    track: 'advanced',
    title: 'RAG Deep Dive',
    subtitle: 'Retrieval, Chunking, and Evaluation',
    duration: '35 min',
    icon: '🔍',
    content: `
      <div class="content-section">
        <h3>Beyond Vector Search</h3>
        <p>Standard RAG with only vector similarity has limitations. Advanced retrieval combines multiple signals.</p>
      </div>
      <div class="content-section">
        <h3>Chunking Strategies</h3>
        <ul>
          <li><strong>Fixed-size chunks:</strong> Simple but may break sentences.</li>
          <li><strong>Semantic chunking:</strong> Split at natural boundaries using AI.</li>
        </ul>
      </div>
    `,
    questions: [
      { q: 'What is main limitation of standard RAG?', options: ['Too fast', 'Retrieval errors, no reasoning, static knowledge', 'Only open-source', 'Too much GPU'], answer: 1 },
      { q: 'Which technique improves retrieval by expanding queries?', options: ['Query rewriting', 'Prompt compression', 'Temperature adjustment', 'Token limiting'], answer: 0 },
      { q: 'What is primary difference between RAG and fine-tuning?', options: ['RAG is cheaper', 'RAG teaches facts; fine-tuning teaches behavior', 'Fine-tuning doesn\'t need GPUs', 'RAG only open-source'], answer: 1 },
      { q: 'What is catastrophic forgetting?', options: ['Forgets training data', 'Loses general capabilities', 'Training crashes', 'Forgets prompt template'], answer: 1 },
      { q: 'What is main purpose of query rewriting?', options: ['Make queries shorter', 'Expand and transform for better coverage', 'Translate queries', 'Filter malicious'], answer: 1 }
    ]
  },
  {
    id: 28,
    track: 'advanced',
    title: 'Fine-Tuning Strategies',
    subtitle: 'When and How to Adapt Models',
    duration: '30 min',
    icon: '🔧',
    content: `
      <div class="content-section">
        <h3>Full Fine-Tuning vs. Parameter-Efficient</h3>
        <p>Full fine-tuning updates all parameters but is expensive. Parameter-efficient methods update only a small fraction.</p>
      </div>
      <div class="content-section">
        <h3>LoRA and QLoRA</h3>
        <p>Low-rank adapters train ~1% of original parameters, making fine-tuning accessible on modest hardware.</p>
      </div>
    `,
    questions: [
      { q: 'Which fine-tuning updates ~1% via low-rank adapters?', options: ['Full fine-tuning', 'LoRA / QLoRA', 'Continued pre-training', 'RLHF'], answer: 1 },
      { q: 'What is catastrophic forgetting?', options: ['Forgets training', 'Loses general capabilities', 'Training crashes', 'Forgets template'], answer: 1 },
      { q: 'What is primary advantage of inference-time alignment?', options: ['Permanently change model', 'Applied without retraining', 'More effective than training', 'Cost nothing'], answer: 1 },
      { q: 'When prefer fine-tuning over RAG?', options: ['Always — RAG obsolete', 'Facts, RAG is better', 'Teaching behavior', 'Never use fine-tuning'], answer: 2 },
      { q: 'What does instruction tuning improve?', options: ['Model size', 'Ability to follow instructions', 'Training speed', 'Parameter count'], answer: 1 }
    ]
  },
  {
    id: 29,
    track: 'advanced',
    title: 'AI Governance',
    subtitle: 'Risk Management and Compliance',
    duration: '25 min',
    icon: '🛡️',
    content: `
      <div class="content-section">
        <h3>AI Inventory and Classification</h3>
        <p>Create a comprehensive inventory of all AI systems and classify by risk level.</p>
      </div>
      <div class="content-section">
        <h3>EU AI Act Risk Tiers</h3>
        <p>Regulation that classifies AI systems into: unacceptable, high, limited, minimal risk.</p>
      </div>
      <div class="content-section">
        <h3>Model Risk Management</h3>
        <p>Adapts the SR 11-7 framework from financial services for model validation.</p>
      </div>
    `,
    questions: [
      { q: 'What is first step in establishing AI governance?', options: ['Hiring Chief AI Officer', 'Creating comprehensive AI inventory', 'Buy governance platform', 'Write policy document'], answer: 1 },
      { q: 'Which regulation classifies AI into risk tiers?', options: ['GDPR', 'EU AI Act', 'NIST AI RMF', 'US Executive Order'], answer: 1 },
      { q: 'What does "Model Risk Management" adapt?', options: ['SR 11-7 framework', 'Basel III requirements', 'SOX compliance', 'MiFID II reporting'], answer: 0 },
      { q: 'Which operating model recommended for enterprises?', options: ['Fully centralized', 'Fully decentralized', 'Hybrid platform + standards', 'No governance'], answer: 2 },
      { q: 'What is key technical control for bias detection?', options: ['Disaggregated evaluation by protected attributes', 'More GPUs', 'Increase temperature', 'Larger context'], answer: 0 }
    ]
  },
  {
    id: 30,
    track: 'advanced',
    title: 'Security in AI',
    subtitle: 'Threats and Mitigation Strategies',
    duration: '25 min',
    icon: '🔐',
    content: `
      <div class="content-section">
        <h3>Threat Landscape for LLM Applications</h3>
        <p>LLMs introduce unique security vulnerabilities.</p>
      </div>
      <div class="content-section">
        <h3>Prompt Injection</h3>
        <p>The #1 security vulnerability: user input that manipulates model behavior.</p>
      </div>
      <div class="content-section">
        <h3>Mitigation Strategies</h3>
        <ul>
          <li><strong>Input sanitization:</strong> Remove or escape malicious content.</li>
          <li><strong>Prompt isolation:</strong> Keep system instructions separate.</li>
          <li><strong>Adversarial testing:</strong> Probe for vulnerabilities.</li>
        </ul>
      </div>
    `,
    questions: [
      { q: 'What is #1 security vulnerability in LLM applications?', options: ['Data poisoning', 'Prompt injection', 'Model extraction', 'Membership inference'], answer: 1 },
      { q: 'What is specification gaming?', options: ['AI optimizes literal objective', 'AI refuses to follow', 'AI creates own specifications', 'AI ignores rewards'], answer: 0 },
      { q: 'How mitigate prompt injection?', options: ['Ignore — not real threat', 'Input sanitization and isolation', 'Always use larger model', 'Disable all user input'], answer: 1 },
      { q: 'What distinguishes Stage 3 from Stage 2?', options: ['First production', 'Self-serve platform, 10+ use cases', 'Executive sponsorship', 'Shadow AI experiments'], answer: 1 },
      { q: 'What is "pilot trap" in AI adoption?', options: ['Pilots too expensive', 'Successful pilots that fail to scale', 'Pilots never work', 'Too many pilots'], answer: 1 }
    ]
  },
  {
    id: 31,
    track: 'advanced',
    title: 'MLOps for Generative AI',
    subtitle: 'Operationalizing LLMs: Data, Training, Deployment, Monitoring',
    duration: '40 min',
    icon: '🔧',
    content: `
      <div class="content-section">
        <h3>MLOps Meets GenAI</h3>
        <p>Traditional MLOps must adapt for LLMs: prompt versioning, RAG pipelines, new failure modes.</p>
      </div>
      <div class="content-section">
        <h3>Data & Prompt Versioning</h3>
        <table class="compare-table">
          <tr><th>Artifact</th><th>Versioning Strategy</th></tr>
          <tr><td><strong>Prompts</strong></td><td>Git with semantic versioning</td></tr>
          <tr><td><strong>Eval Datasets</strong></td><td>Golden sets versioned with metadata</td></tr>
        </table>
      </div>
      <div class="content-section">
        <h3>CI/CD for GenAI Systems</h3>
        <p>Pipeline stages for prompt/model changes: Static Analysis, Unit Tests, Eval Suite, Canary Deploy.</p>
      </div>
    `,
    questions: [
      { q: 'What is key difference between traditional MLOps and GenAI?', options: ['GenAI adds prompt engineering and observability', 'Traditional only for smaller models', 'GenAI doesn\'t need versioning', 'No difference'], answer: 0 },
      { q: 'Why is non-determinism challenge for CI/CD?', options: ['LLM outputs vary, need statistical thresholds', 'Models too slow', 'Prompts too long', 'Eval datasets small'], answer: 0 },
      { q: 'Which serving provides continuous batching?', options: ['TensorFlow Serving', 'vLLM / TGI', 'TorchServe', 'BentoML'], answer: 1 },
      { q: 'What is speculative decoding?', options: ['Small model proposes tokens, large verifies', 'Guessing randomly', 'Decoding without model', 'Using embedding layer'], answer: 0 },
      { q: 'What are two types of feedback loops?', options: ['Implicit and Explicit', 'Positive and negative', 'Automated and manual', 'Real-time and batch'], answer: 0 }
    ]
  },
  {
    id: 32,
    track: 'advanced',
    title: 'AI Product Strategy & ROI',
    subtitle: 'Identifying, Prioritizing, and Measuring High-Impact AI Investments',
    duration: '35 min',
    icon: '💰',
    content: `
      <div class="content-section">
        <h3>From Tech-First to Value-First</h3>
        <p>Many AI initiatives fail because they start with technology instead of business problems.</p>
      </div>
      <div class="content-section">
        <h3>AI Opportunity Identification Framework</h3>
        <table class="compare-table">
          <tr><th>Dimension</th><th>High-Potential Signals</th></tr>
          <tr><td><strong>Volume</strong></td><td>High-frequency, repetitive tasks (1000s/day)</td></tr>
          <tr><td><strong>Data Availability</strong></td><td>Existing digital traces, labels, or easy to collect</td></tr>
        </table>
      </div>
    `,
    questions: [
      { q: 'What is fundamental principle of AI product strategy?', options: ['Use latest technology everywhere', 'Work backwards from measurable outcomes', 'Build everything in-house', 'Maximize accuracy'], answer: 1 },
      { q: 'Which dimension indicates HIGH potential?', options: ['Rare tasks', 'Low-cost labor', 'High-frequency repetitive tasks', 'Highly subjective work'], answer: 2 },
      { q: 'What is recommended investment portfolio split?', options: ['100% transformational', '70% Core, 20% Adjacent, 10% Transformational', '50% Build, 50% Buy', 'Equal split'], answer: 1 },
      { q: 'When "Build" vs "Buy"?', options: ['Always build', 'Core to advantage + unique data = Build; commodity = Buy', 'Always buy', 'Build if 100+ ML engineers'], answer: 1 },
      { q: 'How measure ROI for strategic AI?', options: ['Only direct financial', 'Qualitative assessment and market position', 'Time saved only', 'Accuracy scores'], answer: 1 }
    ]
  },
  {
    id: 33,
    track: 'advanced',
    title: 'Emerging Architectures',
    subtitle: 'RAG Alternatives & Beyond',
    duration: '40 min',
    icon: '🚀',
    content: `
      <div class="content-section">
        <h3>Beyond Standard RAG</h3>
        <p>RAG with vector search is the current default, but it has limits.</p>
      </div>
      <div class="content-section">
        <h3>Long-Context Models (128K - 2M+ tokens)</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>📖 Full-Document In-Context</h4>
            <p>Feed entire documents directly. No retrieval needed.</p>
          </div>
          <div class="concept-card">
            <h4>💰 Cost/Latency Trade-off</h4>
            <p>Long context = quadratic cost. Use for few docs, high accuracy.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is main limitation of standard RAG?', options: ['Too fast', 'Retrieval errors, no reasoning, static knowledge', 'Only open-source', 'Too much GPU'], answer: 1 },
      { q: 'When use long-context instead of RAG?', options: ['Always', 'Few docs, high accuracy, cost secondary', 'Millions of docs', 'No GPU'], answer: 1 },
      { q: 'What is agentic retrieval?', options: ['Agent writes code', 'Model actively searches and decides what to fetch', 'Only agents', 'Type of database'], answer: 1 },
      { q: 'What is hybrid memory approach?', options: ['Model knows "how"; RAG provides "what"', 'Two RAG systems', 'Model + database', 'Fine-tuning twice'], answer: 0 },
      { q: 'What is GraphRAG?', options: ['Graph + RAG: entities → relations → subgraph', 'Graph database only', 'RAG with graphics', 'Only GNN retrieval'], answer: 0 }
    ]
  },
  {
    id: 34,
    track: 'advanced',
    title: 'AI Leadership & Strategic Vision',
    subtitle: 'Leading AI Transformation at the Executive Level',
    duration: '35 min',
    icon: '👑',
    content: `
      <div class="content-section">
        <h3>The Leadership Gap</h3>
        <p>Technical teams know how to build; executives must decide what to build, why, and how to sustain advantage.</p>
      </div>
      <div class="content-section">
        <h3>Strategic Framing: Three Horizons</h3>
        <table class="compare-table">
          <tr><th>Horizon</th><th>Focus</th><th>Timeframe</th></tr>
          <tr><td><strong>H1: Optimize</strong></td><td>Efficiency, cost reduction</td><td>0-12 months</td></tr>
          <tr><td><strong>H2: Differentiate</strong></td><td>New products, competitive moats</td><td>1-3 years</td></tr>
        </table>
      </div>
    `,
    questions: [
      { q: 'What is fundamental mindset shift?', options: ['AI is IT project to delegate', 'AI is business transformation leadership must own', 'AI only for tech companies', 'AI strategy = buying tools'], answer: 1 },
      { q: 'What distinguishes Horizon 2 from H1?', options: ['H2 focuses on new products; H1 on efficiency', 'H2 is shorter term', 'H2 has lower risk', 'H2 requires no investment'], answer: 0 },
      { q: 'What creates durable competitive moat?', options: ['Building "ChatGPT for X"', 'Proprietary data, workflow, eval, talent, trust', 'Largest model', 'First to market'], answer: 1 },
      { q: 'What is board\'s role in AI governance?', options: ['Write code', 'Strategy oversight, risk, capital, talent', 'Choose vector database', 'Manage standups'], answer: 1 },
      { q: 'What should leader personally develop?', options: ['Only business skills', 'Technical fluency, foresight, ethics, communication', 'Only coding skills', 'Only hiring skills'], answer: 1 }
    ]
  },
  {
    id: 35,
    track: 'advanced',
    title: 'Advanced Agent Design',
    subtitle: 'Planning, Memory, and Tool Use',
    duration: '40 min',
    icon: '🤖',
    content: `
      <div class="content-section">
        <h3>Advanced Agent Architectures</h3>
        <p>Modern AI agents combine planning, memory, and tool use to solve complex problems.</p>
      </div>
      <div class="content-section">
        <h3>Planning in Agents</h3>
        <ul>
          <li><strong>Task Decomposition:</strong> Break goals into subtasks (chain-of-thought).</li>
          <li><strong>Execution Loop:</strong> Plan → Execute → Observe → Revise.</li>
        </ul>
      </div>
      <div class="content-section">
        <h3>Tool Integration Patterns</h3>
        <table class="compare-table">
          <tr><th>Tool Type</th><th>Use Case</th></tr>
          <tr><td><strong>Search</strong></td><td>Find relevant information</td></tr>
          <tr><td><strong>Calculator</strong></td><td>Numerical computation</td></tr>
        </table>
      </div>
    `,
    questions: [
      { q: 'What is key principle for designing agents?', options: ['Give all tools', 'Single responsibility', 'Share all context', 'Use largest model'], answer: 1 },
      { q: 'What distinguishes basic chatbot from agent?', options: ['Agents have more colors', 'Agents can plan, use tools, remember', 'Agents are free', 'Chatbots for technical'], answer: 1 },
      { q: 'What is working memory in agent?', options: ['GPU memory', 'Current conversation context', 'Training data', 'Internet connection'], answer: 1 },
      { q: 'How should agents handle calculations?', options: ['Guess', 'Delegate to calculator tools', 'Ask user', 'Ignore'], answer: 1 },
      { q: 'What is execution loop?', options: ['Plan → Wait → Give up', 'Plan → Execute → Observe → Revise', 'Execute → Revise → Observe → Plan', 'Observe → Plan → Execute → Revise'], answer: 1 }
    ]
  },
  {
    id: 36,
    track: 'advanced',
    title: 'Capstone Project',
    subtitle: 'Build Your AI Solution',
    duration: '60 min',
    icon: '🏆',
    content: `
      <div class="content-section">
        <h3>Your Turn: Build and Deploy</h3>
        <p>Apply everything you've learned to design, implement, and evaluate an AI solution.</p>
      </div>
      <div class="content-section">
        <h3>Project Requirements</h3>
        <ol>
          <li><strong>Define Scope:</strong> Choose a problem solvable in 1-2 hours.</li>
          <li><strong>Data Source:</strong> Use existing data or create simple dataset.</li>
          <li><strong>Architecture:</strong> Decide between RAG, fine-tuning, or agent approach.</li>
          <li><strong>Evaluation:</strong> Define success metrics and test solution.</li>
        </ol>
      </div>
    `,
    questions: [
      { q: 'What is first step in capstone?', options: ['Start coding immediately', 'Define Scope and choose problem', 'Buy expensive tool', 'Hire consultant'], answer: 1 },
      { q: 'How much time for capstone problem?', options: ['Weeks', '1-2 hours', 'Just minutes', 'Years'], answer: 1 },
      { q: 'What to include in documentation?', options: ['Your favorite color', 'Problem, architecture, outputs, lessons', 'Only code', 'Random thoughts'], answer: 1 },
      { q: 'What is key concept?', options: ['Speed is everything', 'Capstone tests end-to-end skills', 'Tools don\'t matter', 'Just get done'], answer: 1 },
      { q: 'What architecture for capstone?', options: ['Undecided', 'RAG, fine-tuning, prompting, or agent', 'Only prompting', 'No architecture'], answer: 1 }
    ]
  }
];

const EXAM_QUESTIONS = [
  { q: 'What is the main difference between traditional AI and Generative AI?', options: ['Generative AI creates; traditional analyzes', 'Traditional AI is faster', 'Generative AI doesn\'t use data', 'No difference'], answer: 0 },
  { q: 'Which is NOT a capability of modern AI?', options: ['Computer vision', 'Speech recognition', 'Conscious thought', 'Predictive analytics'], answer: 2 },
  { q: 'What does "Garbage In, Garbage Out" mean?', options: ['AI cleans bad data', 'Poor quality data leads to poor results', 'AI refuses messy data', 'Garbage is better'], answer: 1 },
  { q: 'What is most important rule when using AI?', options: ['Use newest tool', 'Never check output', 'Use responsibly, protect data, verify', 'Only managers can use'], answer: 2 },
  { q: 'How do LLMs generate text?', options: ['Search internet', 'Predict next likely word', 'Human editors', 'Pre-written scripts'], answer: 1 },
  { q: 'What is an AI "hallucination"?', options: ['AI is tired', 'Generates false information confidently', 'Creates images', 'Refuses to answer'], answer: 1 },
  { q: 'How does bias enter AI systems?', options: ['AI develops naturally', 'Bias comes from biased training data', 'Only if programmers add', 'Only in facial recognition'], answer: 1 },
  { q: 'Which is example of Predictive Analytics?', options: ['Chatting with bot', 'AI predicting employee attrition', 'Using autocomplete', 'Organizing files'], answer: 1 },
  { q: 'What is C.O.R.E. prompting framework?', options: ['Context, Objective, Requirements, Examples', 'Create, Organize, Read, Execute', 'Check, Observe, Review, Evaluate', 'Command, Output, Return, Exit'], answer: 0 },
  { q: 'What is impact of AI on jobs?', options: ['Eliminate all jobs', 'Create more jobs than displaces', 'No impact', 'Only technical jobs'], answer: 1 },
  { q: 'What are "AI Agents" expected to do?', options: ['Only answer questions', 'Perform multi-step tasks independently', 'Replace all software', 'Manage supplies'], answer: 1 },
  { q: 'What should you do before sharing data?', options: ['Nothing', 'Ensure not sensitive', 'Ask colleague', 'Translate'], answer: 1 },
  { q: 'What ML uses labeled data?', options: ['Unsupervised', 'Reinforcement', 'Supervised', 'Random'], answer: 2 },
  { q: 'Which is example of Narrow AI?', options: ['Conscious robot', 'ChatGPT', 'General intelligence', 'Superintelligence'], answer: 1 },
  { q: 'What determines AI as positive force?', options: ['Speed of computers', 'Government regulation', 'How humans use it', 'AI itself'], answer: 2 },
  { q: 'What is RPA?', options: ['Physical robots', 'AI handles repetitive digital tasks', 'Coffee machines', 'Robot vacuums'], answer: 1 },
  { q: 'What skill is most important?', options: ['Learning to code', 'Learning to work with AI', 'Becoming manager', 'Ignoring AI'], answer: 1 },
  { q: 'What does "transparency" mean?', options: ['Transparent images', 'Open about AI use', 'Hardware see-through', 'Keep secret'], answer: 1 },
  { q: 'Which prompt gives best result?', options: ['"Write email"', '"Draft professional follow-up email..."', '"Help me"', '"Do something"'], answer: 1 },
  { q: 'What is key challenge for regulation?', options: ['Too simple', 'Balance oversight without stifling', 'No one wants', 'Already perfect'], answer: 1 },
  { q: 'What is "kindergarten rule"?', options: ['Only adults', 'Share what comfortable on billboard', 'Don\'t share anything', 'Simple tasks'], answer: 1 },
  { q: 'Which tool for citations?', options: ['ChatGPT', 'Claude', 'Perplexity AI', 'Copilot'], answer: 2 },
  { q: 'What ALWAYS before sending AI email?', options: ['Send immediately', 'Review, personalize, fact-check', 'Ask AI to check', 'Only to close colleagues'], answer: 1 },
  { q: 'What "C" in C.H.E.C.K. stand for?', options: ['Computer', 'Claim Check', 'Create', 'Copy'], answer: 1 },
  { q: 'What mindset for critical tasks?', options: ['Trust completely', 'Brilliant but unreliable assistant', 'Never use', 'Only entertainment'], answer: 1 }
];