import React, { useState } from 'react';
import { AlertCircle, Sparkles, Target, TrendingUp, CheckCircle, Lightbulb, Brain, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function CapabilityAgent() {
  const [stage, setStage] = useState('input');
  const [formData, setFormData] = useState({
    role: '',
    industry: '',
    companySize: '',
    challenge: '',
    capabilities: ''
  });
  const [agentThinking, setAgentThinking] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);
  const [learningPlan, setLearningPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const addThought = (thought) => {
    setAgentThinking(prev => [...prev, thought]);
  };

  const runAgent = async () => {
    setStage('processing');
    setAgentThinking([]);
    setError(null);

    try {
      // Show thinking process
      addThought("🤔 Analyzing role context and business environment...");
      await sleep(800);

      addThought("🔍 Identifying core capability areas for this role...");
      await sleep(600);

      addThought("⚖️ Assessing likely capability gaps based on industry patterns...");
      await sleep(800);

      addThought("⚠️ Evaluating business risks if gaps remain unaddressed...");
      await sleep(600);

      addThought("🧠 Calling AI agent to generate diagnosis...");
      await sleep(400);

      // Call backend API
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();

      addThought("✅ Diagnosis complete! Now creating learning plan...");
      await sleep(800);

      addThought("📚 Designing learning interventions based on gaps...");
      await sleep(600);

      addThought("📅 Creating 30-60-90 day development roadmap...");
      await sleep(600);

      addThought("🎯 Defining measurable success indicators...");
      await sleep(600);

      addThought("✅ Learning plan generated successfully!");
      await sleep(400);

      setDiagnosis(data.diagnosis);
      setLearningPlan(data.learningPlan);
      setStage('complete');

    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred during analysis');
      setStage('error');
    }
  };

  const resetAgent = () => {
    setStage('input');
    setFormData({
      role: '',
      industry: '',
      companySize: '',
      challenge: '',
      capabilities: ''
    });
    setAgentThinking([]);
    setDiagnosis(null);
    setLearningPlan(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="text-indigo-600" size={36} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                AI Capability Diagnosis Agent
              </h1>
              <p className="text-sm text-gray-500 mt-1">Powered by Claude AI • Full-stack implementation</p>
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            An intelligent agent that diagnoses capability gaps and generates personalized 90-day learning roadmaps
          </p>
        </div>

        {/* Input Stage */}
        {stage === 'input' && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">Role Context Input</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                placeholder="e.g., Frontline Manager, HR Business Partner, Team Lead"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                placeholder="e.g., Healthcare, Technology, Manufacturing, Retail"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <input
                type="text"
                value={formData.companySize}
                onChange={(e) => handleInputChange('companySize', e.target.value)}
                placeholder="e.g., 500 employees, Small startup, Enterprise"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Business Challenge
              </label>
              <textarea
                value={formData.challenge}
                onChange={(e) => handleInputChange('challenge', e.target.value)}
                placeholder="e.g., Scaling rapidly, digital transformation, high turnover, market disruption"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Capabilities (What "Good" Looks Like)
              </label>
              <textarea
                value={formData.capabilities}
                onChange={(e) => handleInputChange('capabilities', e.target.value)}
                placeholder="e.g., Translates strategy into goals, gives effective feedback, manages change confidently"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            <button
              onClick={runAgent}
              disabled={!formData.role || !formData.industry}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              Run AI Agent Analysis
            </button>
          </div>
        )}

        {/* Processing Stage */}
        {stage === 'processing' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Loader2 className="animate-spin text-indigo-600" />
              Agent Reasoning in Progress...
            </h2>
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              {agentThinking.map((thought, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2 text-gray-700 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <span className="text-base">{thought}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Stage */}
        {stage === 'error' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-red-500" size={32} />
              <h2 className="text-xl font-semibold text-gray-800">Analysis Error</h2>
            </div>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              onClick={resetAgent}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results - same as before */}
        {stage === 'complete' && diagnosis && (
          <>
            {/* Diagnosis Results */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Target className="text-indigo-600" />
                Capability Diagnosis Report
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    Core Capability Areas
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {diagnosis.coreAreas.map((area, idx) => (
                      <div key={idx} className="bg-green-50 px-4 py-2 rounded-lg text-gray-700 text-sm">
                        • {area}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Current State Assessment</h3>
                  <p className="text-gray-700 bg-blue-50 p-4 rounded-lg text-sm leading-relaxed">
                    {diagnosis.currentState}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">Key Capability Gaps</h3>
                  <div className="space-y-3">
                    {diagnosis.gaps.map((gap, idx) => (
                      <div key={idx} className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                        <p className="font-semibold text-amber-900 mb-1">{gap.area}</p>
                        <p className="text-gray-700 text-sm mb-2">{gap.gap}</p>
                        <p className="text-xs text-gray-600 italic">Evidence: {gap.evidence}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="text-red-500" size={20} />
                    Business Risks if Unaddressed
                  </h3>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {diagnosis.risks.map((risk, idx) => (
                        <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                          <span className="text-red-500 mt-1">▸</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                    <div className="text-sm">
                      <p className="font-semibold text-blue-900 mb-1">
                        Confidence Level: {diagnosis.confidence}
                      </p>
                      <p className="text-gray-700">
                        <strong>Validation Notes:</strong> {diagnosis.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Plan */}
            {learningPlan && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <TrendingUp className="text-green-600" />
                  90-Day Learning Roadmap
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">Learning Objectives</h3>
                    <div className="space-y-2">
                      {learningPlan.objectives.map((obj, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                          <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                          <span className="text-gray-700 text-sm">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                        Days 1-30
                      </h4>
                      <ul className="space-y-2">
                        {learningPlan.days30.map((item, idx) => (
                          <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-xl border border-indigo-200">
                      <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                        <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                        Days 31-60
                      </h4>
                      <ul className="space-y-2">
                        {learningPlan.days60.map((item, idx) => (
                          <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                            <span className="text-indigo-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
                      <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                        <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                        Days 61-90
                      </h4>
                      <ul className="space-y-2">
                        {learningPlan.days90.map((item, idx) => (
                          <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">70-20-10 Learning Mix</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">On-the-Job:</span>
                        <span className="text-gray-700">{learningPlan.methods.onTheJob}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">Social/Peer:</span>
                        <span className="text-gray-700">{learningPlan.methods.social}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="font-medium">Formal:</span>
                        <span className="text-gray-700">{learningPlan.methods.formal}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                      <Target className="text-green-600" size={20} />
                      Success Indicators
                    </h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        {learningPlan.successIndicators.map((indicator, idx) => (
                          <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                            <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                            <span>{indicator}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">Critical Manager Support Required</h3>
                    <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                      <ul className="space-y-2">
                        {learningPlan.managerSupport.map((support, idx) => (
                          <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                            <span className="text-indigo-600 font-bold">→</span>
                            <span>{support}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                      <AlertCircle size={18} />
                      Risks & Limitations
                    </h4>
                    <ul className="space-y-2">
                      {learningPlan.risks.map((risk, idx) => (
                        <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                          <span className="text-amber-600">⚠</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={resetAgent}
                  className="w-full mt-6 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Analyze Another Role
                </button>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="bg-white rounded-xl shadow-lg p-4 mt-6 text-center">
          <p className="text-sm text-gray-600">
            <strong className="text-indigo-600">Full-Stack AI Agent:</strong> React frontend • Node.js backend • SQLite database • Claude AI integration
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
