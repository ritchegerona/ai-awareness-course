// ===== COURSE DATA =====
const MODULES = [
  {
    id: 1,
    title: 'What is AI?',
    subtitle: 'Beyond the Hype — Understanding Artificial Intelligence',
    duration: '25 min',
    icon: '🤖',
    content: `
      <div class="content-section">
        <h3>What Comes to Mind When You Hear "AI"?</h3>
        <p>For most people, "AI" brings up images of sentient robots, self-driving cars, or ChatGPT. But artificial intelligence is much broader — and already deeply embedded in tools you use every single day at work.</p>
        
        <div class="stat-showcase">
          <div class="stat-card"><div class="number">77%</div><div class="label">of devices use AI daily</div></div>
          <div class="stat-card"><div class="number">35%</div><div class="label">of companies adopted AI in 2024</div></div>
          <div class="stat-card"><div class="number">$500B+</div><div class="label">AI market by 2028</div></div>
        </div>

        <h4>A Simple Definition</h4>
        <p>Artificial Intelligence is the ability of machines to perform tasks that normally require human intelligence — like recognizing patterns, understanding language, making decisions, and learning from experience.</p>
        
        <div class="callout info">
          <strong>🔑 Key Idea</strong>
          <p>AI is not about creating conscious machines. It's about building systems that can <em>simulate</em> intelligent behavior for specific tasks.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>AI You Already Use at Work</h3>
        <p>Before we talk about futuristic AI, let's look at AI tools already in your workplace:</p>
        <div class="two-col">
          <div class="concept-card">
            <h4>📧 Email Smart Filters</h4>
            <p>Gmail's spam filter, Outlook's Focused Inbox — these use AI to learn what's important to you.</p>
          </div>
          <div class="concept-card">
            <h4>🔍 Search Engines</h4>
            <p>Google, Bing, and even your company's intranet search use AI to rank results.</p>
          </div>
          <div class="concept-card">
            <h4>📅 Calendar Suggestions</h4>
            <p>When your calendar suggests meeting times or smart replies — that's AI.</p>
          </div>
          <div class="concept-card">
            <h4>📊 Spreadsheet Features</h4>
            <p>Excel's "Analyze Data" and Google Sheets' smart fill use AI to detect patterns.</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>A (Very) Brief History of AI</h3>
        <ul>
          <li><strong>1950s-1960s:</strong> The birth of AI — Alan Turing asks "Can machines think?" Early programs play chess and solve algebra.</li>
          <li><strong>1970s-1980s:</strong> "AI Winters" — progress stalls as computers lack power. Funding dries up.</li>
          <li><strong>1990s-2000s:</strong> AI beats world chess champion (1997). Internet provides massive data. Machine learning takes off.</li>
          <li><strong>2010s:</strong> Deep learning revolution — image recognition, voice assistants (Siri, Alexa), self-driving car research.</li>
          <li><strong>2020s:</strong> Generative AI explodes — ChatGPT (2022), image generation, AI coding assistants, and enterprise adoption.</li>
        </ul>
        <div class="callout success">
          <strong>📌 Why This Matters</strong>
          <p>AI isn't new — but recent advances mean it's now accessible, affordable, and useful for everyone, not just tech companies.</p>
        </div>
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
          <div class="callout warning">
            <strong>❌ Myth</strong>
            <p>"AI is only for tech companies and programmers."</p>
          </div>
          <div class="callout success">
            <strong>✅ Reality</strong>
            <p>AI tools are designed for non-technical users. Canva, Google Docs, Excel — all have AI features anyone can use.</p>
          </div>
          <div class="callout warning">
            <strong>❌ Myth</strong>
            <p>"AI always gives correct answers."</p>
          </div>
          <div class="callout success">
            <strong>✅ Reality</strong>
            <p>AI can be confidently wrong (hallucinations), biased, or outdated. Human oversight is essential.</p>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What type of AI do all current systems fall under?', options: ['General AI', 'Narrow AI', 'Super AI', 'Conscious AI'], answer: 1 },
      { q: 'Which of these is an example of AI you might use at work?', options: ['A stapler', 'Email spam filters', 'A whiteboard', 'A filing cabinet'], answer: 1 },
      { q: 'Why was there an "AI Winter" in the 1970s-80s?', options: ['People lost interest', 'Computers lacked power and progress stalled', 'Governments banned AI research', 'AI became too expensive'], answer: 1 },
      { q: 'Can today\'s AI systems think and understand like humans?', options: ['Yes, ChatGPT can think', 'No, they are pattern-matching tools without consciousness', 'Only some advanced systems can', 'Scientists disagree on this'], answer: 1 },
      { q: 'What does "hallucination" mean in AI?', options: ['The AI is dreaming', 'The AI gives confidently wrong information', 'The AI sees things it was trained on', 'The AI refuses to answer'], answer: 1 }
    ]
  },

  {
    id: 2,
    title: 'AI Beyond Chatbots',
    subtitle: 'Computer Vision, Speech, Recommendations & More',
    duration: '30 min',
    icon: '👁',
    content: `
      <div class="content-section">
        <h3>AI Is Much More Than a Chatbot</h3>
        <p>ChatGPT made AI famous, but the technology behind it — machine learning — powers dozens of capabilities that don't involve typing messages. Let's explore the different "senses" of AI.</p>
      </div>

      <div class="content-section">
        <h3>👁 Computer Vision — AI That "Sees"</h3>
        <p>Computer vision enables machines to interpret and understand visual information from the world.</p>
        <div class="two-col">
          <div class="concept-card">
            <h4>📄 Document Scanning</h4>
            <p>Apps like Adobe Scan and Google Lens turn photos of documents into searchable PDFs. Your phone's OCR reads text from images.</p>
          </div>
          <div class="concept-card">
            <h4>🖼 Image Recognition</h4>
            <p>Google Photos recognizes faces, objects, and places. You can search "beach" and find all your beach photos without manual tagging.</p>
          </div>
          <div class="concept-card">
            <h4>✅ Quality Inspection</h4>
            <p>Manufacturing uses AI to spot defects in products faster than human eyes.</p>
          </div>
          <div class="concept-card">
            <h4>🏢 Workplace Security</h4>
            <p>Smart security cameras can detect unauthorized access, loitering, or package deliveries.</p>
          </div>
        </div>
        <div class="example-box">
          <strong>💼 Workplace Example</strong>
          <p>HR teams use AI to scan resumes and extract key information (skills, experience, education) from uploaded PDFs automatically.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>🗣 Speech & Audio AI — AI That "Hears"</h3>
        <p>Speech recognition and audio processing are among the most mature AI applications.</p>
        <ul>
          <li><strong>Transcription:</strong> Otter.ai, MS Teams, and Zoom automatically transcribe meetings in real-time.</li>
          <li><strong>Voice Assistants:</strong> Siri, Alexa, Google Assistant — they understand speech, process intent, and respond.</li>
          <li><strong>Call Center Analysis:</strong> AI analyzes customer calls to detect sentiment, urgency, and compliance issues.</li>
          <li><strong>Language Translation:</strong> Real-time translation in Teams meetings, Google Translate, and Skype.</li>
        </ul>
        <div class="callout info">
          <strong>💡 Did You Know?</strong>
          <p>Zoom's automated meeting notes and action items use AI to listen to your conversation, identify speakers, and summarize key points.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>📊 Predictive Analytics — AI That "Forecasts"</h3>
        <p>This is one of the most valuable AI capabilities in business. Predictive analytics uses historical data to forecast future outcomes.</p>
        <table class="compare-table">
          <tr><th>Department</th><th>What AI Predicts</th></tr>
          <tr><td>HR</td><td>Which employees might leave (attrition risk), best candidates for a role</td></tr>
          <tr><td>Sales</td><td>Which leads are most likely to convert, optimal pricing</td></tr>
          <tr><td>Finance</td><td>Cash flow trends, fraud detection, budget forecasting</td></tr>
          <tr><td>Operations</td><td>Inventory needs, maintenance schedules, delivery delays</td></tr>
          <tr><td>Marketing</td><td>Customer lifetime value, campaign effectiveness, churn prediction</td></tr>
        </table>
        <div class="example-box">
          <strong>💼 Workplace Example</strong>
          <p>An HR team uses predictive analytics to identify employees at risk of leaving — based on patterns like engagement scores, tenure, and recent interactions — allowing managers to intervene early.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>🎯 Recommendation Systems — AI That "Knows You"</h3>
        <p>Recommendation engines are everywhere, quietly shaping your choices:</p>
        <ul>
          <li><strong>Netflix/YouTube:</strong> "Recommended for you" based on your viewing history</li>
          <li><strong>Amazon:</strong> "Customers who bought this also bought..."</li>
          <li><strong>LinkedIn:</strong> Suggested connections, jobs, and content</li>
          <li><strong>Spotify:</strong> Discover Weekly playlists personalized to your taste</li>
        </ul>
        <p>In the workplace, recommendation systems suggest training courses, internal job postings, relevant documents, or expert colleagues to connect with.</p>
      </div>

      <div class="content-section">
        <h3>🔧 Robotic Process Automation (RPA) — AI That "Does"</h3>
        <p>RPA combines AI with automation to handle repetitive tasks. These "software robots" can:</p>
        <ul>
          <li>Extract data from emails and enter it into spreadsheets</li>
          <li>Process invoices and route them for approval</li>
          <li>Generate and send automated reports</li>
          <li>Fill out forms across different systems</li>
        </ul>
        <div class="callout success">
          <strong>📌 Takeaway</strong>
          <p>AI is not one technology — it's a toolbox. Chatbots are just one tool. Depending on the problem, you might use vision, speech, prediction, recommendations, or automation.</p>
        </div>
      </div>
    `,
    questions: [
      { q: 'Which AI capability would you use to automatically transcribe meeting recordings?', options: ['Computer Vision', 'Speech Recognition', 'Predictive Analytics', 'Recommendation System'], answer: 1 },
      { q: 'HR teams can use predictive analytics to:', options: ['Generate meeting transcripts', 'Recognize faces in photos', 'Identify employees at risk of leaving', 'Write emails automatically'], answer: 2 },
      { q: 'What does Robotic Process Automation (RPA) primarily do?', options: ['Chat with customers', 'Handle repetitive digital tasks automatically', 'Recognize images', 'Predict future trends'], answer: 1 },
      { q: 'How does Netflix\'s recommendation system work?', options: ['It randomly picks shows', 'Editors manually choose recommendations', 'It analyzes your viewing history to predict what you\'ll like', 'It asks you to rate every show'], answer: 2 },
      { q: 'Computer Vision in the workplace could be used for:', options: ['Writing emails', 'Scanning and extracting info from documents', 'Predicting sales', 'Recommending training courses'], answer: 1 }
    ]
  },

  {
    id: 3,
    title: 'How AI Works',
    subtitle: 'A Non-Technical Guide to Machine Learning',
    duration: '25 min',
    icon: '⚙️',
    content: `
      <div class="content-section">
        <h3>You Don't Need to Be a Programmer to Understand AI</h3>
        <p>You don't need to know how a car engine works to drive one. Similarly, you don't need to write code to understand how AI works. Here's a simple, non-technical explanation.</p>
      </div>

      <div class="content-section">
        <h3>The Core Idea: Learning from Examples</h3>
        <p>Traditional programming is like giving someone a recipe book. You give the computer exact instructions for every step.</p>
        <p><strong>Machine learning is different.</strong> Instead of giving instructions, you show the computer thousands of examples and let it figure out the patterns itself.</p>
        
        <div class="callout info">
          <strong>🔑 The Key Analogy</strong>
          <p>Think of machine learning like teaching a child. You don't explain what a cat is using biology. You point at cats and say "that's a cat" many times until the child recognizes cats on their own.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>The 3-Step AI Process</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>1️⃣ Training</h4>
            <p>Feed the AI thousands of examples (data). The AI finds patterns and creates rules from these examples.</p>
            <p style="font-size:12px;color:var(--gray-500);margin-top:8px;">🤖 "Show me 10,000 photos of invoices — some paid, some unpaid"</p>
          </div>
          <div class="concept-card">
            <h4>2️⃣ Testing</h4>
            <p>Give the AI NEW examples it hasn't seen. Check if it correctly applies the patterns to new data.</p>
            <p style="font-size:12px;color:var(--gray-500);margin-top:8px;">🤖 "Here's an invoice you've never seen. Is it paid or unpaid?"</p>
          </div>
          <div class="concept-card">
            <h4>3️⃣ Inference</h4>
            <p>Deploy the trained AI to work on real data. It now makes predictions or decisions on its own.</p>
            <p style="font-size:12px;color:var(--gray-500);margin-top:8px;">🤖 "Process this new invoice and route it for payment"</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>The Secret Ingredient: Data</h3>
        <p>AI is powered by data. The quality, quantity, and variety of data determine how well an AI system performs.</p>
        <div class="stat-showcase">
          <div class="stat-card"><div class="number">90%</div><div class="label">of AI success is data quality</div></div>
          <div class="stat-card"><div class="number">80%</div><div class="label">of AI project time is data prep</div></div>
        </div>
        <ul>
          <li><strong>More data</strong> = better pattern recognition</li>
          <li><strong>Clean data</strong> = more accurate results</li>
          <li><strong>Diverse data</strong> = less bias in decisions</li>
          <li><strong>Relevant data</strong> = useful predictions</li>
        </ul>
        <div class="example-box">
          <strong>💼 Workplace Example</strong>
          <p>If you want AI to help sort customer complaints by urgency, you need thousands of examples of past complaints that are already labeled (e.g., "urgent," "normal," "low priority"). The AI learns by finding patterns in these labels.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>Types of Machine Learning</h3>
        <table class="compare-table">
          <tr><th>Type</th><th>How It Works</th><th>Example</th></tr>
          <tr><td><strong>Supervised Learning</strong></td><td>Learn from labeled examples (like flashcards with answers)</td><td>Spam detection — "this email IS spam, this is NOT"</td></tr>
          <tr><td><strong>Unsupervised Learning</strong></td><td>Find patterns in unlabeled data (like sorting mixed LEGO by color)</td><td>Customer segmentation — grouping similar customers</td></tr>
          <tr><td><strong>Reinforcement Learning</strong></td><td>Learn by trial and error with rewards/punishments</td><td>AI playing chess — it learns by winning or losing</td></tr>
        </table>
      </div>

      <div class="content-section">
        <h3>Garbage In, Garbage Out (GIGO)</h3>
        <p>This is the most important concept to understand about AI:</p>
        <div class="callout warning">
          <strong>⚠️ Critical Point</strong>
          <p>AI is only as good as the data it's trained on. If the data has errors, biases, or gaps — the AI will make errors, be biased, or miss important cases. Human oversight is always necessary.</p>
        </div>
        <p>Think of it this way: if you teach a child that all birds can fly, and then show them a penguin — they'll be confused. The same thing happens with AI trained on incomplete data.</p>
      </div>
    `,
    questions: [
      { q: 'What is the main difference between traditional programming and machine learning?', options: ['ML is faster to write', 'ML learns patterns from examples instead of following explicit instructions', 'Traditional programming is newer', 'ML doesn\'t use computers'], answer: 1 },
      { q: 'What determines the quality of an AI system the most?', options: ['The programming language used', 'The speed of the computer', 'The quality and quantity of training data', 'The color of the UI'], answer: 2 },
      { q: 'Which type of machine learning uses labeled examples (like "this IS spam" / "this is NOT spam")?', options: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Random Learning'], answer: 2 },
      { q: 'What does "Garbage In, Garbage Out" mean in AI?', options: ['AI refuses to process messy data', 'Poor quality data produces poor quality AI results', 'AI generates garbage content', 'AI cleans up messy data automatically'], answer: 1 },
      { q: 'What happens during the "inference" stage?', options: ['The AI is being trained', 'The AI is tested against new data', 'The trained AI is deployed to work on real data', 'The AI is turned off'], answer: 2 }
    ]
  },

  {
    id: 4,
    title: 'AI in the Workplace',
    subtitle: 'Practical Applications for Your Daily Work',
    duration: '30 min',
    icon: '🏢',
    content: `
      <div class="content-section">
        <h3>AI Is Already Transforming How We Work</h3>
        <p>From HR to finance to operations — every department can benefit from AI. Let's explore practical applications organized by function.</p>
      </div>

      <div class="content-section">
        <h3>📋 HR & Recruitment</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>📄 Resume Screening</h4>
            <p>AI can scan hundreds of resumes and rank candidates by relevance to the job description — saving hours of manual review.</p>
          </div>
          <div class="concept-card">
            <h4>💬 Candidate Chatbots</h4>
            <p>AI chatbots can answer candidate questions, schedule interviews, and send follow-ups 24/7.</p>
          </div>
          <div class="concept-card">
            <h4>📊 Employee Engagement</h4>
            <p>AI analyzes survey responses and communication patterns to gauge team morale and flag concerns.</p>
          </div>
          <div class="concept-card">
            <h4>🎓 Learning & Development</h4>
            <p>AI recommends personalized training courses based on role, skills gaps, and career goals.</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>📝 Administration & Office Work</h3>
        <ul>
          <li><strong>Smart Scheduling:</strong> AI tools like x.ai or Clockwise manage your calendar, find optimal meeting times, and buffer focus time.</li>
          <li><strong>Email Management:</strong> AI summarizes long email threads, drafts replies, and prioritizes your inbox.</li>
          <li><strong>Document Automation:</strong> Generate meeting minutes, draft reports, create presentations from raw notes.</li>
          <li><strong>Data Entry:</strong> AI extracts information from scanned documents, PDFs, and images — no manual typing.</li>
        </ul>
        <div class="example-box">
          <strong>💼 Real Example</strong>
          <p>A department admin uses Microsoft Copilot to draft a weekly report from Teams chat messages, email updates, and calendar events — reducing a 2-hour task to 15 minutes.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>💻 IT & Support</h3>
        <ul>
          <li><strong>Helpdesk Automation:</strong> AI handles common IT requests (password reset, software access) without human intervention.</li>
          <li><strong>Anomaly Detection:</strong> AI monitors network traffic and flags unusual activity that might indicate a security breach.</li>
          <li><strong>Knowledge Base:</strong> AI-powered search helps employees find documentation and solutions instantly.</li>
        </ul>
      </div>

      <div class="content-section">
        <h3>📊 Data & Reporting</h3>
        <ul>
          <li><strong>Natural Language Queries:</strong> Ask "Show me sales by region for Q3" and AI generates the chart automatically.</li>
          <li><strong>Automated Dashboards:</strong> AI updates reports in real-time, highlighting trends and anomalies.</li>
          <li><strong>Forecasting:</strong> Predict next month's workload, budget needs, or resource requirements based on historical data.</li>
        </ul>
      </div>

      <div class="content-section">
        <h3>🛠 Common AI Tools for the Workplace</h3>
        <table class="compare-table">
          <tr><th>Tool</th><th>What It Does</th><th>Best For</th></tr>
          <tr><td><strong>Microsoft Copilot</strong></td><td>AI assistant integrated into Office 365</td><td>Writing documents, analyzing Excel data, summarizing meetings</td></tr>
          <tr><td><strong>ChatGPT / Claude</strong></td><td>General-purpose AI assistant</td><td>Research, drafting, brainstorming, problem-solving</td></tr>
          <tr><td><strong>Grammarly</strong></td><td>AI writing assistant</td><td>Professional emails, reports, error-free communication</td></tr>
          <tr><td><strong>Notion AI</strong></td><td>AI-powered knowledge management</td><td>Meeting notes, project docs, wikis</td></tr>
          <tr><td><strong>Canva AI</strong></td><td>AI design tools</td><td>Presentations, social media graphics, documents</td></tr>
          <tr><td><strong>Otter.ai</strong></td><td>AI meeting transcription</td><td>Meeting notes, action item tracking</td></tr>
        </table>
      </div>

      <div class="content-section">
        <h3>⚡ How to Start Using AI at Work Today</h3>
        <ol>
          <li><strong>Identify repetitive tasks</strong> — what do you do daily that's routine and predictable?</li>
          <li><strong>Start small</strong> — try one AI tool for one task (e.g., use Grammarly for email polish)</li>
          <li><strong>Ask your IT team</strong> — what AI tools does your company already have access to?</li>
          <li><strong>Experiment safely</strong> — never paste sensitive data into public AI tools without approval</li>
          <li><strong>Share what works</strong> — build AI literacy across your team by sharing wins</li>
        </ol>
        <div class="callout success">
          <strong>🚀 The Goal</strong>
          <p>AI should make your work <em>easier</em>, not more complicated. If a task takes more effort with AI than without it — don't use AI for that task.</p>
        </div>
      </div>
    `,
    questions: [
      { q: 'Which AI tool is best for improving written communication in emails?', options: ['Canva AI', 'Grammarly', 'Otter.ai', 'Excel'], answer: 1 },
      { q: 'How can AI help in HR recruitment?', options: ['Generating payroll', 'Scheduling team parties', 'Screening and ranking resumes automatically', 'Designing office layout'], answer: 2 },
      { q: 'What should you do before using a public AI tool at work?', options: ['Nothing, just use it', 'Check with IT about data privacy policies', 'Buy a license first', 'Ask a colleague for permission'], answer: 1 },
      { q: 'Microsoft Copilot is best for:', options: ['Graphic design', 'Video editing', 'Writing documents and analyzing Excel data', 'Social media management'], answer: 2 },
      { q: 'What is the first step in adopting AI at work?', options: ['Buy the most expensive tool', 'Identify repetitive, routine tasks', 'Train everyone for a week', 'Replace all manual work with AI'], answer: 1 }
    ]
  },

  {
    id: 5,
    title: 'Generative AI & LLMs',
    subtitle: 'How ChatGPT and Similar AI Actually Work',
    duration: '30 min',
    icon: '🧠',
    content: `
      <div class="content-section">
        <h3>What Is Generative AI?</h3>
        <p>Generative AI is a category of artificial intelligence that creates new content — text, images, music, code, videos — rather than just analyzing or classifying existing data.</p>
        <p>Unlike traditional AI that answers "Is this a cat or a dog?" (classification), generative AI answers "Create a picture of a cat wearing a hat."</p>
        
        <div class="stat-showcase">
          <div class="stat-card"><div class="number">100M+</div><div class="label">ChatGPT users in 2 months</div></div>
          <div class="stat-card"><div class="number">60%</div><div class="label">of workers use GenAI weekly</div></div>
          <div class="stat-card"><div class="number">40%</div><div class="label">productivity boost reported</div></div>
        </div>
      </div>

      <div class="content-section">
        <h3>What is an LLM (Large Language Model)?</h3>
        <p>LLMs are the technology behind ChatGPT, Claude, Gemini, and other text-based AI assistants. Here's how to think about them:</p>
        
        <div class="callout info">
          <strong>🔑 Simple Analogy</strong>
          <p>An LLM is like an incredibly well-read assistant who has read millions of books, articles, websites, and documents. When you ask a question, this assistant draws from everything they've read to predict what a helpful answer would look like.</p>
        </div>

        <h4>How LLMs Are Built</h4>
        <ol>
          <li><strong>Massive Training:</strong> The model is trained on enormous amounts of text from the internet — books, articles, websites, code repositories.</li>
          <li><strong>Pattern Learning:</strong> The model learns statistical patterns: which words tend to follow other words, how sentences are structured, how arguments are made.</li>
          <li><strong>Fine-Tuning:</strong> The model is further trained on high-quality examples to make it helpful, harmless, and honest.</li>
        </ol>
        <p>But here's the critical point: <strong>LLMs don't "know" anything.</strong> They predict the next most likely word based on patterns in their training data.</p>
      </div>

      <div class="content-section">
        <h3>What LLMs Are Good At</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>✍️ Writing & Editing</h4>
            <p>Drafts, summaries, rewrites, translations, and creative writing.</p>
          </div>
          <div class="concept-card">
            <h4>💡 Brainstorming</h4>
            <p>Generating ideas, outlines, frameworks, and alternative approaches.</p>
          </div>
          <div class="concept-card">
            <h4>📚 Research Assistance</h4>
            <p>Summarizing documents, extracting key points, explaining concepts.</p>
          </div>
          <div class="concept-card">
            <h4>📊 Data Analysis</h4>
            <p>Interpreting spreadsheets, finding patterns, generating reports.</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>⚠️ What LLMs Are NOT Good At</h3>
        <div class="two-col">
          <div class="callout warning">
            <strong>❌ Facts & Accuracy</strong>
            <p>LLMs can be confidently wrong (hallucinations). They can invent facts, sources, and quotes that sound real but aren't.</p>
          </div>
          <div class="callout warning">
            <strong>❌ Math & Logic</strong>
            <p>Simple arithmetic or logical reasoning can trip up LLMs. They're language models, not calculators.</p>
          </div>
          <div class="callout warning">
            <strong>❌ Real-Time Knowledge</strong>
            <p>Unless connected to the internet, LLMs only know information up to their training cutoff date.</p>
          </div>
          <div class="callout warning">
            <strong>❌ Confidentiality</strong>
            <p>Public AI tools process your data through external servers. Never share sensitive information without authorization.</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>Other Types of Generative AI</h3>
        <table class="compare-table">
          <tr><th>Type</th><th>Examples</th><th>What It Creates</th></tr>
          <tr><td><strong>Image Generation</strong></td><td>DALL-E, Midjourney, Stable Diffusion</td><td>Images from text descriptions</td></tr>
          <tr><td><strong>Code Generation</strong></td><td>GitHub Copilot, Cursor</td><td>Computer code from natural language</td></tr>
          <tr><td><strong>Music Generation</strong></td><td>MusicLM, Jukebox</td><td>Music from text descriptions</td></tr>
          <tr><td><strong>Video Generation</strong></td><td>Sora, Runway, Pika</td><td>Video clips from text prompts</td></tr>
          <tr><td><strong>Audio Generation</strong></td><td>ElevenLabs</td><td>Realistic voice recordings, narration</td></tr>
          <tr><td><strong>Presentation Generation</strong></td><td>Gamma, Tome</td><td>Full slide decks from a topic</td></tr>
        </table>
      </div>

      <div class="content-section">
        <h3>Hallucinations: The Biggest Risk</h3>
        <div class="callout warning">
          <strong>⚠️ Critical Concept</strong>
          <p>A hallucination is when an AI generates information that is false but presented confidently and convincingly. The AI isn't "lying" — it's doing what it was trained to do (predict likely words) and happened to produce an incorrect sequence.</p>
        </div>
        <p><strong>Real example:</strong> An AI asked to write a biography of a real person might invent job titles, awards, and events that never happened — but present them in a way that sounds entirely believable.</p>
        <p><strong>How to protect yourself:</strong> Always verify important AI-generated information against reliable sources. Treat AI output as a <em>draft</em> or <em>suggestion</em>, not as fact.</p>
      </div>
    `,
    questions: [
      { q: 'What does LLM stand for?', options: ['Large Learning Model', 'Large Language Model', 'Long Logic Machine', 'Linear Language Module'], answer: 1 },
      { q: 'How does an LLM actually generate text?', options: ['It thinks and formulates ideas', 'It searches the internet for answers', 'It predicts the next most likely word based on patterns', 'It asks another AI for help'], answer: 2 },
      { q: 'What is a "hallucination" in generative AI?', options: ['The AI is dreaming about cats', 'The AI generates confidently false information', 'The AI refuses to answer', 'The AI creates images from text'], answer: 1 },
      { q: 'Which of these is an image generation AI?', options: ['GitHub Copilot', 'DALL-E', 'Otter.ai', 'Grammarly'], answer: 1 },
      { q: 'Why should you be careful about sharing information with public AI tools?', options: ['They are slow', 'They cost too much', 'Data is processed on external servers — sensitive info could be exposed', 'They don\'t understand your language'], answer: 2 }
    ]
  },

  {
    id: 6,
    title: 'Prompting & Practical Use',
    subtitle: 'How to Talk to AI and Get Great Results',
    duration: '25 min',
    icon: '💬',
    content: `
      <div class="content-section">
        <h3>Prompting Is a Skill — And You Can Learn It</h3>
        <p>A "prompt" is simply the instruction you give to an AI. The quality of what you get back depends heavily on how you ask. Good prompting is like being a good manager: clear, specific, and with the right context.</p>
      </div>

      <div class="content-section">
        <h3>The Golden Rule of Prompting</h3>
        <div class="callout success">
          <strong>🌟 Garbage In, Garbage Out (GIGO) — Applied to Prompts</strong>
          <p>A vague prompt gets a vague answer. A specific, well-structured prompt gets a useful, accurate answer. The effort you put into crafting your prompt directly determines the quality of the response.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>The C.O.R.E. Prompting Framework</h3>
        <p>Use this simple framework to structure any prompt:</p>
        <div class="two-col">
          <div class="concept-card">
            <h4>C — Context</h4>
            <p>Give background. Who are you? What are you working on? What does success look like?</p>
          </div>
          <div class="concept-card">
            <h4>O — Objective</h4>
            <p>State clearly what you want. "Draft an email," "Summarize this document," "Create a table."</p>
          </div>
          <div class="concept-card">
            <h4>R — Requirements</h4>
            <p>Specify format, tone, length, audience. "Professional tone," "3 bullet points," "For senior management."</p>
          </div>
          <div class="concept-card">
            <h4>E — Examples</h4>
            <p>Show the AI what you want. "Like this template..." or "Here's a good example."</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>❌ Bad vs. ✅ Good Prompts</h3>
        <table class="compare-table">
          <tr><th>Situation</th><th>❌ Bad Prompt</th><th>✅ Good Prompt</th></tr>
          <tr><td>Write an email</td><td>"Write an email about the meeting"</td><td>"Write a follow-up email to a client after our project kickoff meeting. Thank them for attending, list the 3 action items we agreed on, and propose a follow-up call next week. Professional but friendly tone."</td></tr>
          <tr><td>Summarize a document</td><td>"Summarize this"</td><td>"Summarize this 10-page report in 5 bullet points for my manager. Focus on budget changes, timeline risks, and resource needs. Use plain language."</td></tr>
          <tr><td>Brainstorm ideas</td><td>"Give me ideas for team building"</td><td>"Suggest 5 team-building activities for a remote team of 15 people that can be done over Zoom in under 30 minutes. Budget is minimal. Include what each activity teaches."</td></tr>
        </table>
      </div>

      <div class="content-section">
        <h3>Advanced Prompting Techniques</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>🔄 Iterative Refinement</h4>
            <p>Don't expect perfection on the first try. Ask follow-ups: "Make it shorter," "More formal," "Focus on the budget section."</p>
          </div>
          <div class="concept-card">
            <h4>🎭 Role Assignment</h4>
            <p>Tell the AI who to be: "Act as a senior HR manager reviewing this policy. What gaps do you see?"</p>
          </div>
          <div class="concept-card">
            <h4>📋 Structured Output</h4>
            <p>Ask for specific formats: "Give me the answer as a table," "Output as bullet points," "Format it as a memo."</p>
          </div>
          <div class="concept-card">
            <h4>🔗 Chain of Thought</h4>
            <p>For complex questions: "Think step by step," "First, analyze the problem, then propose solutions."</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>Real Workplace Prompt Templates</h3>
        <div class="example-box">
          <strong>📧 Email Polishing</strong>
          <p>"Here's a draft email I wrote. Please improve it to be more professional and concise, while keeping a helpful tone. Change nothing factual."<br><em>[paste draft]</em></p>
        </div>
        <div class="example-box">
          <strong>📊 Data Analysis</strong>
          <p>"Here's a spreadsheet of our Q4 expenses. [paste data as text] Please identify: 1) Top 3 categories by spending, 2) Month-over-month changes, 3) Any anomalies. Output as a table."</p>
        </div>
        <div class="example-box">
          <strong>📝 Meeting Minutes</strong>
          <p>"Here are the raw notes from our meeting: [paste notes]. Please format these into professional meeting minutes with: Attendees, Discussion Points, Decisions Made, and Action Items (with owner names)."</p>
        </div>
        <div class="example-box">
          <strong>🎯 Decision Support</strong>
          <p>"I need to choose between Option A and Option B for [project]. Here's what I know about each: [details]. Please create a pros/cons table and recommend which to choose with reasoning."</p>
        </div>
      </div>

      <div class="content-section">
        <h3>⚠️ Prompting Do's and Don'ts</h3>
        <div class="two-col">
          <div class="callout success">
            <strong>✅ Do</strong>
            <ul>
              <li>Be specific and detailed</li>
              <li>Provide context and examples</li>
              <li>Specify format and tone</li>
              <li>Iterate and ask follow-ups</li>
              <li>Use role assignment</li>
              <li>Verify important facts</li>
            </ul>
          </div>
          <div class="callout warning">
            <strong>❌ Don't</strong>
            <ul>
              <li>Expect mind-reading</li>
              <li>Share confidential data</li>
              <li>Trust everything it says</li>
              <li>Use one-word prompts</li>
              <li>Give up after one attempt</li>
              <li>Use AI for sensitive HR decisions without review</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What does the "C" in the C.O.R.E. prompting framework stand for?', options: ['Command', 'Context', 'Code', 'Copy'], answer: 1 },
      { q: 'What is the best approach if an AI gives you an imperfect answer?', options: ['Give up and do it manually', 'Use a different AI tool', 'Refine your prompt and iterate', 'Complain to IT'], answer: 2 },
      { q: 'Which prompt would likely get the BEST result?', options: ['"Write something"', '"Draft a polite reminder email to a vendor about an overdue invoice, referencing invoice #1234 for $5,000"', '"Email vendor"', '"Help"'], answer: 1 },
      { q: 'What does "role assignment" mean in prompting?', options: ['Giving the AI a job title in the company', 'Asking the AI to adopt a specific persona when responding', 'Assigning the AI a task from your to-do list', 'Changing the AI\'s name'], answer: 1 },
      { q: 'What should you do BEFORE pasting information into a public AI tool?', options: ['Nothing, it\'s fine', 'Check that the information is not confidential or sensitive', 'Ask a colleague', 'Translate it first'], answer: 1 }
    ]
  },

  {
    id: 7,
    title: 'AI Ethics & Responsibility',
    subtitle: 'Bias, Privacy, and Using AI Responsibly',
    duration: '20 min',
    icon: '🛡️',
    content: `
      <div class="content-section">
        <h3>With Great Power Comes Great Responsibility</h3>
        <p>AI is a powerful tool — but like any tool, it can be misused. Understanding the ethical implications helps you use AI responsibly and protect yourself and your organization.</p>
      </div>

      <div class="content-section">
        <h3>1. Bias in AI</h3>
        <p>AI systems learn from data. If that data contains human biases, the AI will learn and amplify them.</p>
        <div class="example-box">
          <strong>📌 Real Example: Hiring Bias</strong>
          <p>A major tech company built an AI recruiting tool. The system was trained on resumes from the past 10 years — mostly from men (since the tech industry was male-dominated). The AI "learned" to prefer male candidates and penalized resumes that included "women's" (like "women's chess club captain"). The company had to scrap the system.</p>
        </div>
        <p><strong>How bias enters AI:</strong></p>
        <ul>
          <li><strong>Historical bias:</strong> Past human decisions reflected in training data</li>
          <li><strong>Representation bias:</strong> Some groups are underrepresented in data</li>
          <li><strong>Measurement bias:</strong> The wrong things are being measured or labeled</li>
          <li><strong>Deployment bias:</strong> The AI is used in a context different from its training</li>
        </ul>
        <div class="callout warning">
          <strong>⚠️ What You Can Do</strong>
          <p>Be aware that AI can reflect biases. Always review AI decisions — especially in hiring, promotions, performance reviews, and other people-related decisions.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>2. Privacy & Data Protection</h3>
        <p>When you use AI tools, you're often sending data to external servers. This creates significant privacy risks.</p>
        <table class="compare-table">
          <tr><th>⚠️ Risk</th><th>Example</th><th>How to Avoid</th></tr>
          <tr><td>Data leakage</td><td>Pasting customer PII into ChatGPT</td><td>Use anonymized data, check company policy</td></tr>
          <tr><td>Training on your data</td><td>Public AI tools may use your conversations for training</td><td>Use enterprise versions with data protection</td></tr>
          <tr><td>Compliance violations</td><td>GDPR, HIPAA, or company policy violations</td><td>When in doubt, don't share — consult IT</td></tr>
          <tr><td>Prompt injection</td><td>Malicious prompts that trick AI into revealing system prompts or data</td><td>Use enterprise-grade AI with security controls</td></tr>
        </table>
        <div class="callout info">
          <strong>💡 The "Kindergarten Rule"</strong>
          <p>Only share with AI what you'd be comfortable seeing on a billboard. If you wouldn't post it publicly, don't paste it into a public AI tool.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>3. Job Impact & Augmentation</h3>
        <p>Will AI replace jobs? This is the most common concern — and the answer is nuanced.</p>
        <div class="stat-showcase">
          <div class="stat-card"><div class="number">85M</div><div class="label">jobs displaced by AI by 2025</div></div>
          <div class="stat-card"><div class="number">97M</div><div class="label">NEW jobs created by AI by 2025</div></div>
        </div>
        <p><strong>Source: World Economic Forum</strong></p>
        <p>The reality: AI will transform jobs, not eliminate them entirely. The key is understanding that:</p>
        <ul>
          <li><strong>AI augments</strong> — it makes you faster and better at your job</li>
          <li><strong>Tasks will change</strong> — repetitive tasks get automated, higher-value tasks remain human</li>
          <li><strong>New roles emerge</strong> — prompt engineers, AI trainers, ethics officers, AI project managers</li>
          <li><strong>Adaptability is key</strong> — learning to work with AI is the most important career skill today</li>
        </ul>
        <div class="callout success">
          <strong>🌟 The Right Mindset</strong>
          <p>AI won't replace you. A person who knows how to use AI will. The goal of this course is to make sure you're that person.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>4. Transparency & Accountability</h3>
        <ul>
          <li><strong>Know when you're using AI:</strong> Be transparent about AI-generated content when appropriate</li>
          <li><strong>Human oversight:</strong> Always review AI output before using it in business decisions</li>
          <li><strong>Accountability:</strong> You are responsible for what you produce — even if AI helped create it</li>
          <li><strong>Company policy:</strong> Learn and follow your organization's AI usage guidelines</li>
        </ul>
      </div>

      <div class="content-section">
        <h3>5. Environmental Impact</h3>
        <p>Training large AI models consumes significant energy. One ChatGPT query uses about 10x the energy of a Google search. As AI usage grows, so does its environmental footprint.</p>
        <p><strong>What this means:</strong> Use AI purposefully, not for every trivial task. Be mindful of the resources behind the tools you use.</p>
      </div>

      <div class="content-section">
        <h3>Your Responsible AI Checklist</h3>
        <div class="callout success">
          <strong>✅ Before Using AI at Work, Ask:</strong>
          <ul>
            <li>Does my organization allow this use case?</li>
            <li>Am I protecting sensitive or personal data?</li>
            <li>Have I verified the AI's output for accuracy?</li>
            <li>Could this AI output be biased or unfair?</li>
            <li>Am I comfortable being accountable for this result?</li>
          </ul>
        </div>
      </div>
    `,
    questions: [
      { q: 'How does bias enter AI systems?', options: ['AI systems develop bias on their own', 'Bias enters from biased training data reflecting human prejudices', 'Only deliberately programmed bias can enter AI', 'Bias only comes from the AI\'s code'], answer: 1 },
      { q: 'What is the "kindergarten rule" for AI privacy?', options: ['Only adults should use AI', 'Only share what you\'d be comfortable seeing on a billboard', 'AI is only for simple questions', 'Don\'t share anything with AI'], answer: 1 },
      { q: 'According to the World Economic Forum, how will AI affect jobs?', options: ['AI will eliminate all jobs by 2030', 'AI will create more jobs than it displaces', 'AI has no effect on jobs', 'Only tech jobs will be affected'], answer: 1 },
      { q: 'Who is responsible for AI-generated content used in business decisions?', options: ['The AI company', 'No one — AI is autonomous', 'The person who used the AI', 'The IT department'], answer: 2 },
      { q: 'What should you check before using an AI tool for a work task?', options: ['Nothing, use whatever works', 'Whether your organization allows it and protects data', 'Only the price', 'Whether your colleagues use it'], answer: 1 }
    ]
  },

  {
    id: 8,
    title: 'The Future of AI',
    subtitle: 'Where We\'re Headed and How to Stay Ahead',
    duration: '15 min',
    icon: '🚀',
    content: `
      <div class="content-section">
        <h3>What's Coming Next?</h3>
        <p>AI is evolving rapidly. While we can't predict exactly what will happen, we can identify the major trends that will shape how we work and live over the next 3-5 years.</p>
      </div>

      <div class="content-section">
        <h3>🔮 Key Trends to Watch</h3>
        <div class="two-col">
          <div class="concept-card">
            <h4>🤖 AI Agents</h4>
            <p>Instead of just answering questions, AI "agents" will perform multi-step tasks independently — booking travel, managing projects, conducting research — requiring only high-level direction from humans.</p>
          </div>
          <div class="concept-card">
            <h4>📱 AI in Every App</h4>
            <p>AI is becoming a standard feature in every software product. Soon, using software without AI will feel like using a smartphone without internet.</p>
          </div>
          <div class="concept-card">
            <h4>🎤 Voice-First Interaction</h4>
            <p>Talking to computers will become normal. Instead of typing, you'll speak to AI assistants that understand context, tone, and intent.</p>
          </div>
          <div class="concept-card">
            <h4>🏢 Enterprise AI</h4>
            <p>Companies are building custom AI systems trained on their own data. Every department will have AI tools tailored to their specific workflows.</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>AI by 2030: Predictions for the Workplace</h3>
        <table class="compare-table">
          <tr><th>Today (2026)</th><th>Soon (2028-2030)</th></tr>
          <tr><td>AI is a separate tool you open</td><td>AI is embedded in every application you use</td></tr>
          <tr><td>You prompt AI for each task</td><td>AI anticipates your needs and proactively offers help</td></tr>
          <tr><td>Some meetings are transcribed</td><td>AI attends meetings and provides real-time insights, summaries, and action items</td></tr>
          <tr><td>You write emails manually or with help</td><td>AI drafts all routine communications; you review and approve</td></tr>
          <tr><td>Data analysis requires tools like Excel</td><td>You ask questions in plain language and AI generates analysis instantly</td></tr>
          <tr><td>AI literacy is a differentiator</td><td>AI literacy is a basic requirement for most jobs</td></tr>
        </table>
      </div>

      <div class="content-section">
        <h3>Challenges Ahead</h3>
        <ul>
          <li><strong>Regulation:</strong> Governments are still figuring out how to regulate AI responsibly without stifling innovation</li>
          <li><strong>Deepfakes & Misinformation:</strong> AI-generated fake content will become harder to detect</li>
          <li><strong>Digital Divide:</strong> Organizations that adopt AI will pull ahead; those that don't may fall behind</li>
          <li><strong>Job Transition:</strong> Many roles will change significantly, requiring continuous learning and adaptation</li>
        </ul>
      </div>

      <div class="content-section">
        <h3>How to Stay Ahead: Your AI Development Plan</h3>
        <ol>
          <li><strong>Practice weekly:</strong> Use AI tools for at least one work task every week</li>
          <li><strong>Share knowledge:</strong> What you learn, share with your team — build collective AI literacy</li>
          <li><strong>Experiment safely:</strong> Try different AI tools, different prompting styles, different use cases</li>
          <li><strong>Stay informed:</strong> Follow AI news (but beware of hype). Resources like The Verge AI, Axios AI+, and company AI newsletters</li>
          <li><strong>Think critically:</strong> Always question AI output. The human in the loop is irreplaceable</li>
        </ol>
      </div>

      <div class="content-section">
        <h3>Final Thoughts</h3>
        <div class="callout success">
          <strong>🎯 The Bigger Picture</strong>
          <p>AI is not a magic solution or a threat. It is a tool — the most powerful tool for information work since the internet. Like any tool, its impact depends on how we choose to use it. Your awareness, curiosity, and critical thinking are what will make AI a positive force in your work and career.</p>
        </div>
        <p style="text-align:center;font-size:18px;margin-top:24px;color:var(--primary);font-weight:600;">
          The future of AI is not written by machines. It's written by people like you who choose to understand it.
        </p>
      </div>
    `,
    questions: [
      { q: 'What is an "AI agent"?', options: ['An AI that only answers questions', 'AI that performs multi-step tasks independently with high-level direction', 'A chatbot with a different interface', 'An AI that manages other AIs'], answer: 1 },
      { q: 'How will AI in the workplace change by 2030 according to the predictions?', options: ['AI will replace all human workers', 'AI will be embedded in every app and anticipate your needs', 'AI will be banned in most workplaces', 'AI will only be used by IT departments'], answer: 1 },
      { q: 'What is a major challenge facing AI adoption?', options: ['AI is too expensive for anyone', 'Regulation, deepfakes, and the digital divide', 'No one wants to use AI', 'AI doesn\'t work for business'], answer: 1 },
      { q: 'What is the best way to stay ahead in the age of AI?', options: ['Ignore AI and hope it goes away', 'Practice weekly, share knowledge, and stay informed', 'Only use AI for personal tasks', 'Wait for your company to mandate AI training'], answer: 1 },
      { q: 'According to the course, what determines whether AI is a positive force?', options: ['The AI technology itself', 'Government regulation', 'How we choose to use it as humans', 'How fast computers become'], answer: 2 }
    ]
  },

  // ===== MODULE 9: Data Privacy & AI =====
  {
    id: 9,
    title: 'Data Privacy & AI',
    subtitle: 'What You Can and Cannot Share with AI Tools',
    duration: '20 min',
    icon: '🔒',
    content: `
      <div class="content-section">
        <h3>Privacy Is the #1 Risk in AI Adoption</h3>
        <p>Most AI tools — especially free ones — process your data on external servers. Every prompt you type, every file you upload, and every document you paste could be stored, reviewed, or used to train future models.</p>
        <p>Understanding data privacy isn't just good practice — it's your responsibility to your organization, your colleagues, and yourself.</p>

        <div class="callout warning">
          <strong>⚠️ Critical Rule</strong>
          <p>Assume everything you type into a public AI tool is visible to someone else. Never share personal identifiable information (PII), company financials, trade secrets, client data, or passwords.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>The "Kindergarten Rule" for AI Privacy</h3>
        <div class="callout success">
          <strong>🧒 Simple Guideline</strong>
          <p>Only share what you'd be comfortable seeing on a billboard outside your office. If you wouldn't want your manager, HR director, or a client to read it — don't paste it into a public AI tool.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>Categories of Data: What's Safe vs. Not Safe</h3>
        <table class="compare-table">
          <tr><th>Safe to Share ✅</th><th>Ask First ⚠️</th><th>Never Share ❌</th></tr>
          <tr><td>Public information (company name, job titles)</td><td>Internal processes and procedures</td><td>Personal Identifiable Information (SSN, DOB, addresses)</td></tr>
          <tr><td>Generic questions about industry best practices</td><td>Anonymized data (remove names/IDs first)</td><td>Client lists with contact details</td></tr>
          <tr><td>Publicly available documents</td><td>Summaries of internal meetings (no names)</td><td>Financial statements, payroll, contracts</td></tr>
          <tr><td>Your own writing drafts (non-sensitive)</td><td>Company policies (check confidentiality)</td><td>Trade secrets, proprietary code, IP</td></tr>
          <tr><td>General knowledge questions</td><td>Job descriptions (remove candidate info)</td><td>Passwords, access tokens, security keys</td></tr>
        </table>
      </div>

      <div class="content-section">
        <h3>Understanding Your Company's AI Policy</h3>
        <ol>
          <li><strong>Check if your company has an AI usage policy</strong> — many organizations now have guidelines on which tools are approved</li>
          <li><strong>Enterprise vs. Public versions</strong> — tools like Microsoft Copilot and ChatGPT Enterprise keep your data within your organization; free versions do not</li>
          <li><strong>Data retention</strong> — understand how long your data is stored and whether it's used for training</li>
          <li><strong>Opt-out options</strong> — some tools let you opt out of data being used for training; take advantage of this</li>
        </ol>
        <div class="example-box">
          <strong>💼 Workplace Example</strong>
          <p>An HR assistant pastes a candidate's full resume with contact details into ChatGPT to "draft a rejection email." That candidate's data is now stored on OpenAI's servers — a potential GDPR violation if the candidate is in the EU.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>GDPR & Data Protection Basics</h3>
        <ul>
          <li><strong>GDPR (EU):</strong> Requires explicit consent for data processing, right to deletion, and data portability. Violations can cost up to 4% of global revenue.</li>
          <li><strong>CCPA (California):</strong> Gives residents rights to know what data is collected and to request deletion.</li>
          <li><strong>Data Protection Act (UK):</strong> Similar to GDPR — applies to organizations operating in the UK.</li>
          <li><strong>Best Practice:</strong> Treat all AI tools as potential data processors. If in doubt, ask your IT or legal department.</li>
        </ul>
        <div class="callout info">
          <strong>🔑 Key Takeaway</strong>
          <p>Good AI privacy is simple: <em>anonymize, verify policies, think before you paste, and when in doubt — leave it out.</em></p>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is the "kindergarten rule" for AI privacy?', options: ['Only adults should use AI', 'Only share what you\'d be comfortable seeing on a billboard', 'AI is only for simple questions', 'Don\'t share anything with AI at all'], answer: 1 },
      { q: 'Which type of data is safe to share with a public AI tool?', options: ['Client contact lists', 'Company financial statements', 'General industry knowledge questions', 'Employee payroll data'], answer: 2 },
      { q: 'What should you do if you\'re unsure about sharing data with an AI tool?', options: ['Share it anyway — it\'s probably fine', 'Ask your IT or legal department', 'Post it on social media for opinions', 'Only ask in a private browser window'], answer: 1 },
      { q: 'Why are enterprise versions of AI tools different from free versions?', options: ['They have better AI models', 'Enterprise versions keep your data within your organization', 'They are cheaper', 'Enterprise versions don\'t use AI'], answer: 1 },
      { q: 'What could happen if an EU company shares customer data with a public AI without consent?', options: ['Nothing — it\'s a minor issue', 'A potential GDPR violation with fines up to 4% of global revenue', 'The AI will refuse to work', 'Only a warning from regulators'], answer: 1 }
    ]
  },

  // ===== MODULE 10: AI Tools Hands-On Guide =====
  {
    id: 10,
    title: 'AI Tools Hands-On Guide',
    subtitle: 'Free & Paid Tools You Can Use Today',
    duration: '25 min',
    icon: '🛠',
    content: `
      <div class="content-section">
        <h3>Your AI Toolkit: What's Available Right Now</h3>
        <p>There are dozens of AI tools available — some free, some paid, each with different strengths. The key is knowing which tool to use for which task. Let's explore the most useful ones for workplace productivity.</p>
      </div>

      <div class="content-section">
        <h3>🗣 ChatGPT (OpenAI)</h3>
        <p><strong>Best for:</strong> General writing, brainstorming, research, analysis</p>
        <div class="two-col">
          <div class="callout success">
            <strong>✅ Strengths</strong>
            <ul>
              <li>Excellent at creative writing and brainstorming</li>
              <li>Handles long documents (128K token context)</li>
              <li>Can browse the web (paid version)</li>
              <li>Generates images (DALL-E integration)</li>
            </ul>
          </div>
          <div class="callout warning">
            <strong>⚠️ Limitations</strong>
            <ul>
              <li>Free version has limited features</li>
              <li>Training data cutoff varies</li>
              <li>Public tool — data privacy concerns</li>
              <li>Can hallucinate confidently</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>🤖 Claude (Anthropic)</h3>
        <p><strong>Best for:</strong> Analysis, document processing, thoughtful responses</p>
        <div class="two-col">
          <div class="callout success">
            <strong>✅ Strengths</strong>
            <ul>
              <li>Excellent at analyzing long documents</li>
              <li>More thoughtful, less prone to errors</li>
              <li>Strong safety and ethics training</li>
              <li>Good at structured output and coding</li>
            </ul>
          </div>
          <div class="callout warning">
            <strong>⚠️ Limitations</strong>
            <ul>
              <li>No image generation</li>
              <li>Smaller usage limits</li>
              <li>No internet browsing (unless API)</li>
              <li>Public tool — same privacy concerns</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>🔍 Perplexity AI</h3>
        <p><strong>Best for:</strong> Research, fact-checking, finding sources</p>
        <div class="two-col">
          <div class="callout success">
            <strong>✅ Strengths</strong>
            <ul>
              <li>Includes citations and sources by default</li>
              <li>Always searches the internet for current info</li>
              <li>Excellent for research tasks</li>
              <li>Free tier is very capable</li>
            </ul>
          </div>
          <div class="callout warning">
            <strong>⚠️ Limitations</strong>
            <ul>
              <li>Less creative than ChatGPT</li>
              <li>Cannot handle very long documents</li>
              <li>Limited formatting options</li>
              <li>Designed for search, not conversation</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>📊 Tool Comparison at a Glance</h3>
        <table class="compare-table">
          <tr><th>Tool</th><th>Free Version</th><th>Best Task</th><th>Data Privacy</th></tr>
          <tr><td>ChatGPT</td><td>Yes (limited)</td><td>Writing, brainstorming</td><td>Public (Enterprise available)</td></tr>
          <tr><td>Claude</td><td>Yes (limited)</td><td>Analysis, documents</td><td>Public (Enterprise available)</td></tr>
          <tr><td>Perplexity</td><td>Yes (generous)</td><td>Research with sources</td><td>Public (Pro version has more privacy)</td></tr>
          <tr><td>Gemini</td><td>Yes (generous)</td><td>Google Workspace integration</td><td>Public (Google Workspace keeps data private)</td></tr>
          <tr><td>Copilot</td><td>With M365 license</td><td>Office integration</td><td>Enterprise (data stays in tenant)</td></tr>
          <tr><td>Notion AI</td><td>Paid add-on</td><td>Knowledge management</td><td>Enterprise-grade</td></tr>
        </table>
      </div>

      <div class="content-section">
        <h3>How to Choose the Right Tool</h3>
        <div class="callout info">
          <strong>🔑 Simple Decision Framework</strong>
          <p>1. <strong>Need sources/citations?</strong> → Perplexity</p>
          <p>2. <strong>Writing or brainstorming?</strong> → ChatGPT</p>
          <p>3. <strong>Analyzing long documents?</strong> → Claude</p>
          <p>4. <strong>Working in Office 365?</strong> → Microsoft Copilot</p>
          <p>5. <strong>Need current web info?</strong> → Perplexity or ChatGPT (with browsing)</p>
          <p>6. <strong>Sensitive data involved?</strong> → Enterprise tool or don't use AI</p>
        </div>
      </div>
    `,
    questions: [
      { q: 'Which AI tool is best for research that requires citations and sources?', options: ['ChatGPT', 'Claude', 'Perplexity AI', 'Notion AI'], answer: 2 },
      { q: 'What is Microsoft Copilot best for?', options: ['Image generation', 'Integration with Office 365 and enterprise data', 'Social media management', 'Video editing'], answer: 1 },
      { q: 'Which of these is a key difference between free and enterprise AI tools?', options: ['Enterprise tools have worse AI', 'Free tools are faster', 'Enterprise tools keep your data within your organization', 'Free tools don\'t use AI'], answer: 2 },
      { q: 'Which tool would you choose for analyzing a long contract or legal document?', options: ['ChatGPT for creative writing', 'Claude for document analysis', 'Perplexity for research', 'Gemini for image generation'], answer: 1 },
      { q: 'What should you use when working with sensitive company data?', options: ['The free version of any AI tool', 'An enterprise AI tool or no AI at all', 'A different computer', 'A private browser window'], answer: 1 }
    ]
  },

  // ===== MODULE 11: AI & Communication at Work =====
  {
    id: 11,
    title: 'AI & Communication at Work',
    subtitle: 'Emails, Reports, Presentations & Internal Comms',
    duration: '20 min',
    icon: '📝',
    content: `
      <div class="content-section">
        <h3>AI Is Transforming Workplace Communication</h3>
        <p>Communication is one of the most time-consuming parts of any office job. Drafting emails, preparing reports, creating presentations, writing meeting notes — these tasks can consume hours every day. AI can dramatically reduce that time while improving quality.</p>
        <p>But there's a skill to using AI for communication without losing your voice or making mistakes.</p>

        <div class="stat-showcase">
          <div class="stat-card"><div class="number">40%</div><div class="label">less time drafting emails with AI</div></div>
          <div class="stat-card"><div class="number">3×</div><div class="label">faster report generation</div></div>
          <div class="stat-card"><div class="number">85%</div><div class="label">of users say AI improves clarity</div></div>
        </div>
      </div>

      <div class="content-section">
        <h3>📧 Email Excellence with AI</h3>
        <p>AI can help at every stage of email communication:</p>
        <div class="two-col">
          <div class="concept-card">
            <h4>✍️ Drafting</h4>
            <p>Give AI the key points and let it write the first draft. Then edit to add your personal voice.</p>
          </div>
          <div class="concept-card">
            <h4>📋 Summarizing</h4>
            <p>Paste a long email thread and ask AI to summarize key decisions, action items, and open questions.</p>
          </div>
          <div class="concept-card">
            <h4>🎭 Tone Adjustment</h4>
            <p>Ask AI to rewrite an email in a different tone: more formal, more friendly, more urgent, or more diplomatic.</p>
          </div>
          <div class="concept-card">
            <h4>🌐 Translation</h4>
            <p>Draft emails in one language and have AI translate while preserving tone and professionalism.</p>
          </div>
        </div>
        <div class="example-box">
          <strong>💼 Real Prompt</strong>
          <p>"I need to email a vendor about a delayed shipment. We were promised delivery by Friday, now they say next Tuesday. I want a firm but professional tone. Here are the order details: [details]. Draft the email."</p>
        </div>
      </div>

      <div class="content-section">
        <h3>📊 Reports & Documentation</h3>
        <ul>
          <li><strong>Weekly Reports:</strong> Give AI your raw notes from the week and ask it to format them into a structured report with sections for achievements, challenges, and next steps</li>
          <li><strong>Meeting Minutes:</strong> Paste raw meeting transcript or notes and ask AI to extract: attendees, discussion points, decisions, and action items with owners</li>
          <li><strong>Policy Documents:</strong> Ask AI to rewrite complex policies into simpler language for broader audiences</li>
          <li><strong>Data Narratives:</strong> Give AI a spreadsheet summary and ask it to write the narrative explanation around the numbers</li>
        </ul>
      </div>

      <div class="content-section">
        <h3>📽 Presentations Made Easy</h3>
        <p>AI can help create presentations faster:</p>
        <ol>
          <li><strong>Outline first:</strong> Ask AI to create a presentation outline based on your topic — structure slides logically</li>
          <li><strong>Slide content:</strong> For each slide, ask AI to draft bullet points, speaker notes, and talking points</li>
          <li><strong>Visual descriptions:</strong> If using an AI presentation tool (Gamma, Tome), describe the slide you want and AI generates it</li>
          <li><strong>Executive summaries:</strong> Create a 1-page summary of a long presentation for busy stakeholders</li>
        </ol>
      </div>

      <div class="content-section">
        <h3>🔄 Internal Communications & Newsletters</h3>
        <p>AI is excellent for internal communications:</p>
        <ul>
          <li><strong>Company Announcements:</strong> Draft organizational changes, policy updates, or event announcements</li>
          <li><strong>Team Newsletters:</strong> Compile team wins, updates, and announcements into a weekly newsletter</li>
          <li><strong>Meeting Agendas:</strong> Generate structured agendas from meeting objectives</li>
          <li><strong>Follow-ups:</strong> After meetings, use AI to draft follow-up summaries and action items to distribute</li>
        </ul>
        <div class="callout success">
          <strong>📌 Golden Rule</strong>
          <p>Always review and personalize AI-generated communications. Your colleagues can tell when something is purely AI-generated — add your unique perspective, voice, and context.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>⚠️ Communication Pitfalls to Avoid</h3>
        <div class="two-col">
          <div class="callout warning">
            <strong>❌ Don't</strong>
            <ul>
              <li>Send AI drafts without reading them</li>
              <li>Use AI for sensitive or confidential messages</li>
              <li>Let AI write messages that require empathy</li>
              <li>Use AI-generated performance reviews without heavy editing</li>
            </ul>
          </div>
          <div class="callout success">
            <strong>✅ Do</strong>
            <ul>
              <li>Use AI as a first draft — not the final version</li>
              <li>Personalize every message before sending</li>
              <li>Fact-check all data and numbers</li>
              <li>Maintain your authentic communication style</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    questions: [
      { q: 'What is the best use of AI for email communication?', options: ['Letting AI send emails automatically without review', 'Using AI to draft, then personalizing before sending', 'Never using AI for emails', 'Only using AI for personal emails'], answer: 1 },
      { q: 'How can AI help with meeting minutes?', options: ['AI attends meetings for you', 'AI extracts decisions and action items from raw notes', 'AI cancels unnecessary meetings', 'AI records video of meetings'], answer: 1 },
      { q: 'What should you ALWAYS do before sending an AI-drafted message?', options: ['Nothing, AI is correct', 'Add a disclaimer that AI wrote it', 'Review, personalize, and fact-check', 'Send it to your manager for approval'], answer: 2 },
      { q: 'Which task is NOT appropriate for AI in communication?', options: ['Drafting a weekly report from raw notes', 'Writing a performance review without human input', 'Creating a presentation outline', 'Translating an email to another language'], answer: 1 },
      { q: 'What percentage less time can AI save on drafting emails?', options: ['About 10%', 'About 40%', 'About 80%', 'About 100%'], answer: 1 }
    ]
  },

  // ===== MODULE 12: Critical Thinking with AI =====
  {
    id: 12,
    title: 'Critical Thinking with AI',
    subtitle: 'When to Trust, When to Verify, When to Ignore',
    duration: '20 min',
    icon: '🧐',
    content: `
      <div class="content-section">
        <h3>The Most Important AI Skill Isn't Technical</h3>
        <p>As AI becomes more capable and more convincing, the most valuable skill you can develop is <strong>critical thinking</strong>. Knowing when to trust AI output, when to verify it, and when to ignore it entirely will set you apart and protect your organization.</p>

        <div class="callout info">
          <strong>🔑 Mindset Shift</strong>
          <p>Think of AI not as an <em>expert</em> giving you answers, but as a <em>brilliant but unreliable assistant</em> — someone with vast knowledge who sometimes makes things up, has blind spots, and needs supervision.</p>
        </div>
      </div>

      <div class="content-section">
        <h3>The AI Trust Spectrum</h3>
        <p>Different tasks require different levels of trust in AI:</p>
        <table class="compare-table">
          <tr><th>Trust Level</th><th>Task Type</th><th>Examples</th></tr>
          <tr><td><strong>High Trust</strong></td><td>Creative, low-stakes, easy to verify</td><td>Brainstorming ideas, rewriting sentences, generating email subject lines</td></tr>
          <tr><td><strong>Medium Trust</strong></td><td>Structured, fact-based but verifiable</td><td>Summarizing documents (check against source), drafting reports (review numbers)</td></tr>
          <tr><td><strong>Low Trust</strong></td><td>Critical, high-stakes, fact-dependent</td><td>Medical/legal advice, financial calculations, HR decisions, performance reviews</td></tr>
          <tr><td><strong>Zero Trust</strong></td><td>Anything with irreversible consequences</td><td>Contract language, compliance decisions, safety-critical information</td></tr>
        </table>
      </div>

      <div class="content-section">
        <h3>🔍 The C.H.E.C.K. Framework</h3>
        <p>A simple system for evaluating AI output:</p>
        <div class="two-col">
          <div class="concept-card">
            <h4>C — Claim Check</h4>
            <p>Does the AI make specific claims that can be verified? Look for numbers, dates, names, and references.</p>
          </div>
          <div class="concept-card">
            <h4>H — Hallucination Hunt</h4>
            <p>Watch for "too perfect" answers, overly specific details without sources, or things that seem suspicious.</p>
          </div>
          <div class="concept-card">
            <h4>E — Expertise Match</h4>
            <p>Is this within the AI's capabilities? Asking an LLM to do math or provide legal advice is risky.</p>
          </div>
          <div class="concept-card">
            <h4>C — Consistency Test</h4>
            <p>Ask the same question in different ways. If you get contradictory answers, something is wrong.</p>
          </div>
          <div class="concept-card">
            <h4>K — Knowledge Cutoff</h4>
            <p>Is the AI's training data up-to-date? For current events, you need a tool with internet access.</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3>⚠️ Red Flags: When to Be Suspicious</h3>
        <ul>
          <li><strong>Confident but vague:</strong> "Research shows that..." without citing specific studies</li>
          <li><strong>Made-up sources:</strong> AI sometimes invents book titles, authors, and academic papers that sound real</li>
          <li><strong>Overly enthusiastic:</strong> AI tends to agree with you and be positive — it lacks healthy skepticism</li>
          <li><strong>Outdated information:</strong> Even recent models may not have the latest news or policy changes</li>
          <li><strong>Missing nuance:</strong> AI simplifies complex topics and may miss important context or exceptions</li>
        </ul>
      </div>

      <div class="content-section">
        <h3>Building a Verification Habit</h3>
        <ol>
          <li><strong>Always fact-check numbers:</strong> Cross-reference with original sources, spreadsheets, or official documents</li>
          <li><strong>Use AI as a starting point:</strong> Treat AI output as a first draft, not a final product</li>
          <li><strong>Ask AI for sources:</strong> If you can't verify, ask the AI to show its work or provide references</li>
          <li><strong>Use multiple tools:</strong> Check the same question with different AI tools and compare answers</li>
          <li><strong>Trust your gut:</strong> If something feels off, it probably is. Your professional judgment is irreplaceable</li>
        </ol>
        <div class="callout success">
          <strong>🌟 The Ultimate Rule</strong>
          <p><em>AI is a tool for generating possibilities — but YOU are the expert who validates them.</em></p>
        </div>
      </div>
    `,
    questions: [
      { q: 'How should you think of AI when using it for critical tasks?', options: ['As an expert whose answers are always correct', 'As a brilliant but unreliable assistant that needs supervision', 'As a search engine that finds facts', 'As a replacement for human judgment'], answer: 1 },
      { q: 'What does the "C" in the C.H.E.C.K. framework stand for?', options: ['Computer', 'Claim Check', 'Create', 'Copy'], answer: 1 },
      { q: 'Which type of task should you give ZERO trust to AI?', options: ['Brainstorming ideas', 'Summarizing documents', 'Contract language with compliance implications', 'Rewriting sentences'], answer: 2 },
      { q: 'What is a common AI red flag to watch for?', options: ['AI refusing to answer', 'AI being confidently wrong about specific facts', 'AI being too slow', 'AI asking too many questions'], answer: 1 },
      { q: 'What is the best approach when using AI for decision support?', options: ['Follow all AI recommendations without question', 'Use AI output as a starting point and verify critical information', 'Never use AI for any decision', 'Only use AI after asking three colleagues'], answer: 1 }
    ]
  }
];

const EXAM_QUESTIONS = [
  { q: 'What is the main difference between traditional AI and Generative AI?', options: ['Generative AI creates new content; traditional AI analyzes/classifies', 'Traditional AI is faster', 'Generative AI doesn\'t use data', 'There is no difference'], answer: 0 },
  { q: 'Which of the following is NOT a capability of modern AI?', options: ['Computer vision', 'Speech recognition', 'Conscious thought and self-awareness', 'Predictive analytics'], answer: 2 },
  { q: 'What does "Garbage In, Garbage Out" mean in the context of AI?', options: ['AI automatically cleans bad data', 'Poor quality data leads to poor AI results', 'AI refuses to process messy data', 'Garbage data is better than no data'], answer: 1 },
  { q: 'What is the most important rule when using AI at work?', options: ['Always use the newest AI tool', 'Never check AI output — trust it completely', 'Use AI responsibly, protect sensitive data, and verify outputs', 'Only managers can use AI tools'], answer: 2 },
  { q: 'How do Large Language Models (LLMs) generate text?', options: ['They search the internet for each answer', 'They predict the next most likely word based on patterns in training data', 'They have human editors writing responses', 'They use pre-written scripts'], answer: 1 },
  { q: 'What is an AI "hallucination"?', options: ['When the AI is tired', 'When the AI generates confidently false information that sounds believable', 'When the AI creates images', 'When the AI refuses to answer'], answer: 1 },
  { q: 'How does bias enter AI systems?', options: ['AI develops bias naturally over time', 'Bias comes from biased training data reflecting human prejudices', 'Only if programmers intentionally add bias', 'Bias only appears in facial recognition'], answer: 1 },
  { q: 'Which of these is an example of Predictive Analytics in the workplace?', options: ['Chatting with a customer service bot', 'AI predicting which employees might leave based on engagement patterns', 'Using autocomplete in email', 'Organizing files in folders'], answer: 1 },
  { q: 'What is the C.O.R.E. prompting framework?', options: ['Context, Objective, Requirements, Examples', 'Create, Organize, Read, Execute', 'Check, Observe, Review, Evaluate', 'Command, Output, Return, Exit'], answer: 0 },
  { q: 'What is the expected impact of AI on jobs according to the World Economic Forum?', options: ['AI will eliminate all jobs by 2030', 'AI will create more new jobs than it displaces', 'AI has no impact on employment', 'Only technical jobs will be affected'], answer: 1 },
  { q: 'What are "AI Agents" expected to do?', options: ['Only answer simple questions', 'Perform multi-step tasks independently with minimal human direction', 'Replace all software', 'Manage office supplies'], answer: 1 },
  { q: 'What should you do before sharing information with a public AI tool?', options: ['Nothing — all tools are secure', 'Ensure the information is not sensitive or confidential', 'Ask a colleague first', 'Translate it into another language'], answer: 1 },
  { q: 'What type of machine learning uses labeled data (like "this is spam" / "this is not spam")?', options: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Random Learning'], answer: 2 },
  { q: 'Which of these is an example of "Narrow AI"?', options: ['A conscious robot', 'ChatGPT', 'A human-level general intelligence', 'A sci-fi superintelligence'], answer: 1 },
  { q: 'According to the course, what determines whether AI is a positive or negative force?', options: ['The speed of computers', 'Government regulation', 'How humans choose to use it', 'The AI itself'], answer: 2 },
  { q: 'What is Robotic Process Automation (RPA)?', options: ['Physical robots in offices', 'AI that handles repetitive digital tasks automatically', 'Automated coffee machines', 'Robot vacuum cleaners'], answer: 1 },
  { q: 'What skill does the course identify as most important for career success in the AI era?', options: ['Learning to code', 'Learning to work with AI', 'Becoming a manager', 'Ignoring AI developments'], answer: 1 },
  { q: 'What does "transparency" mean in AI ethics?', options: ['Using transparent background images', 'Being open about when and how you use AI', 'Making AI hardware see-through', 'Keeping AI usage secret'], answer: 1 },
  { q: 'Which prompt would likely give the best result?', options: ['"Write email"', '"Draft a professional follow-up email to a vendor about invoice #1234, polite but firm tone, mention the due date was last Friday"', '"Help me"', '"Do something"'], answer: 1 },
  { q: 'What is a key challenge for AI regulation?', options: ['AI is too simple to regulate', 'Balancing responsible oversight without stifling innovation', 'No one wants AI regulation', 'AI already has perfect regulation'], answer: 1 },
  { q: 'What is the "kindergarten rule" for AI privacy?', options: ['Only adults should use AI', 'Only share what you\'d be comfortable seeing on a billboard', 'Don\'t share anything with AI', 'AI is only for simple tasks'], answer: 1 },
  { q: 'Which AI tool is best for research requiring citations and sources?', options: ['ChatGPT', 'Claude', 'Perplexity AI', 'Microsoft Copilot'], answer: 2 },
  { q: 'What should you ALWAYS do before sending an AI-drafted email?', options: ['Send it immediately', 'Review, personalize, and fact-check', 'Ask AI to double-check it', 'Only send it to close colleagues'], answer: 1 },
  { q: 'What does the "C" in the C.H.E.C.K. critical thinking framework stand for?', options: ['Computer', 'Claim Check', 'Create', 'Copy'], answer: 1 },
  { q: 'What is the most important mindset when using AI for critical tasks?', options: ['Trust AI completely', 'Treat AI as a brilliant but unreliable assistant', 'Never use AI for anything important', 'Only use AI for entertainment'], answer: 1 }
];
