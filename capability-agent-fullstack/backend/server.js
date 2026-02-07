const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database('./capability_agent.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

// Initialize database schema
function initDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS analyses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT NOT NULL,
      industry TEXT NOT NULL,
      company_size TEXT,
      challenge TEXT,
      capabilities TEXT,
      diagnosis TEXT NOT NULL,
      learning_plan TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Capability Agent API is running' });
});

// Main analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { role, industry, companySize, challenge, capabilities } = req.body;

    // Validate input
    if (!role || !industry) {
      return res.status(400).json({ 
        error: 'Role and industry are required fields' 
      });
    }

    console.log('Starting capability analysis for:', role);

    // STAGE 1: Generate Capability Diagnosis
    const diagnosisPrompt = `You are a senior HR and organizational capability consultant with 15+ years of experience in capability building, leadership development, and workforce transformation.

Your task is to diagnose capability gaps for the following role:

Role: ${role}
Industry: ${industry}
Company Size: ${companySize || 'Not specified'}
Business Challenge: ${challenge || 'Not specified'}
Expected Capabilities: ${capabilities || 'Not specified'}

Provide a structured capability diagnosis in JSON format with these fields:
{
  "coreAreas": ["array of 3-5 core capability areas"],
  "currentState": "paragraph describing inferred current state",
  "gaps": [
    {
      "area": "capability area name",
      "gap": "specific gap description",
      "evidence": "typical evidence or pattern"
    }
  ],
  "risks": ["array of business risks if unaddressed"],
  "confidence": "Low/Medium/High",
  "notes": "validation recommendations"
}

Be practical, business-aligned, and avoid generic advice. Base your assessment on real organizational patterns.`;

    const diagnosisResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: diagnosisPrompt }]
    });

    const diagnosisText = diagnosisResponse.content[0].text;
    let diagnosis;

    try {
      // Extract JSON from response
      const jsonMatch = diagnosisText.match(/\{[\s\S]*\}/);
      diagnosis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (parseError) {
      console.error('Error parsing diagnosis JSON:', parseError);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    console.log('Diagnosis generated, now creating learning plan...');

    // STAGE 2: Generate Learning Plan
    const learningPrompt = `You are an expert in adult learning, leadership development, and organizational capability building.

Based on this capability diagnosis, create a realistic 90-day learning roadmap:

Diagnosis Summary:
${JSON.stringify(diagnosis, null, 2)}

Role Context: ${role} in ${industry}

Create a learning plan in JSON format with these fields:
{
  "objectives": ["3-4 clear, measurable learning objectives"],
  "days30": ["array of 3-4 activities for days 1-30"],
  "days60": ["array of 3-4 activities for days 31-60"],
  "days90": ["array of 3-4 activities for days 61-90"],
  "methods": {
    "onTheJob": "percentage and description",
    "social": "percentage and description",
    "formal": "percentage and description"
  },
  "successIndicators": ["array of measurable success indicators"],
  "managerSupport": ["array of required manager support activities"],
  "risks": ["array of risks and limitations"]
}

Prioritize on-the-job learning (70%), peer/social learning (20%), and formal learning (10%). Be realistic about time constraints.`;

    const learningResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: learningPrompt }]
    });

    const learningText = learningResponse.content[0].text;
    let learningPlan;

    try {
      const jsonMatch = learningText.match(/\{[\s\S]*\}/);
      learningPlan = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (parseError) {
      console.error('Error parsing learning plan JSON:', parseError);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    console.log('Learning plan generated, saving to database...');

    // Save to database
    db.run(
      `INSERT INTO analyses (role, industry, company_size, challenge, capabilities, diagnosis, learning_plan)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        role,
        industry,
        companySize || '',
        challenge || '',
        capabilities || '',
        JSON.stringify(diagnosis),
        JSON.stringify(learningPlan)
      ],
      function(err) {
        if (err) {
          console.error('Database error:', err);
        } else {
          console.log('Analysis saved with ID:', this.lastID);
        }
      }
    );

    // Return results
    res.json({
      success: true,
      diagnosis,
      learningPlan,
      message: 'Analysis completed successfully'
    });

  } catch (error) {
    console.error('Error in analysis:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      details: error.message 
    });
  }
});

// Get analysis history
app.get('/api/analyses', (req, res) => {
  db.all(
    'SELECT id, role, industry, created_at FROM analyses ORDER BY created_at DESC LIMIT 50',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Get specific analysis
app.get('/api/analyses/:id', (req, res) => {
  db.get(
    'SELECT * FROM analyses WHERE id = ?',
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Analysis not found' });
      }
      
      // Parse JSON fields
      row.diagnosis = JSON.parse(row.diagnosis);
      row.learning_plan = JSON.parse(row.learning_plan);
      
      res.json(row);
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Capability Agent API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing database...');
  db.close(() => {
    console.log('Database closed');
    process.exit(0);
  });
});
