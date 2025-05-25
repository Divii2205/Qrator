import React, { useState, useMemo, useCallback } from "react";
import { Search, AlertCircle } from "lucide-react";
import Background from "../components/Background";

const MOCK_KEYWORDS = {
  professional: [
    "industry insights",
    "expert analysis",
    "best practices",
    "comprehensive guide",
    "strategic overview"
  ],
  casual: [
    "quick tips",
    "easy guide",
    "fun facts",
    "simple tricks",
    "everyday hacks"
  ],
  educational: [
    "step-by-step tutorial",
    "detailed explanation",
    "learning guide",
    "practical examples",
    "in-depth analysis"
  ]
};

const mockAnalyzeSEO = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    score: 85,
    keywords: MOCK_KEYWORDS[data.tone] || MOCK_KEYWORDS.professional,
    suggestions: [
      "Add more relevant keywords to your video description",
      "Optimize title for search visibility",
      "Include trending keywords in your niche",
      "Add timestamps in description",
      "Use relevant tags for better reach"
    ],
    tone: data.tone,
    readabilityScore: 92
  };
};

const ToneButton = React.memo(({ type, selected, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(type)}
    className={`py-2 px-4 rounded-lg capitalize ${
      selected
        ? "bg-blue-500 text-white"
        : "bg-slate-600 text-gray-300 hover:bg-slate-500"
    }`}
  >
    {type}
  </button>
));

const ScoreIndicator = React.memo(({ score, label, color }) => (
  <div className="w-full mb-4">
    <div className="flex justify-between items-center mb-2">
      <p className="text-gray-300 text-sm">{label}</p>
      <span className="text-white font-bold">{score}%</span>
    </div>
    <div className="h-4 bg-slate-600/50 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500 ease-out`}
        style={{ width: `${score}%` }}
      >
        <div className="w-full h-full opacity-20 bg-white background-shine"></div>
      </div>
    </div>
  </div>
));

const SuggestionCard = React.memo(({ suggestion }) => (
  <div className="p-4 bg-slate-600/30 rounded-lg border border-slate-500/50 hover:border-blue-500/50 transition-all duration-300 group">
    <div className="flex items-start gap-3">
      <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
      <p className="text-white group-hover:text-blue-300 transition-colors duration-300">
        {suggestion}
      </p>
    </div>
  </div>
));

function SEO() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tone: "professional",
    focusWords: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const handleToneChange = useCallback((tone) => {
    setFormData((prev) => ({ ...prev, tone }));
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "title") {
      setCharCount(value.length);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        const response = await mockAnalyzeSEO(formData);
        setAnalysisResult(response);
      } catch (err) {
        setError("Failed to analyze SEO. Please try again.");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  const toneButtons = useMemo(
    () =>
      ["professional", "casual", "educational"].map((type) => (
        <ToneButton
          key={type}
          type={type}
          selected={formData.tone === type}
          onClick={handleToneChange}
        />
      )),
    [formData.tone, handleToneChange]
  );

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Background>
      <div className="min-h-[calc(100vh-80px)] mt-20 flex flex-col lg:flex-row w-full">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-white text-4xl font-bold mb-4">
                SEO Optimizer
              </h1>
              <p className="text-gray-300 text-lg">
                Optimize your content for better visibility and engagement
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-lg mb-2">
                    Content Tone
                  </label>
                  <div className="grid grid-cols-3 gap-3">{toneButtons}</div>
                </div>

                <div className="relative">
                  <label htmlFor="title" className="block text-white text-lg mb-2">
                    Idea Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your content title"
                    required
                  />
                  <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                    {charCount}/100
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-white text-lg mb-2">
                    Video Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
                    placeholder="Enter your video description..."
                  />
                </div>

                <div>
                  <label htmlFor="focusWords" className="block text-white text-lg mb-2">
                    Focus Words
                  </label>
                  <textarea
                    id="focusWords"
                    name="focusWords"
                    value={formData.focusWords}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter focus words separated by commas..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      Analyzing SEO...
                    </div>
                  ) : (
                    "Analyze SEO"
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                  <p className="text-red-300">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Analysis Results */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-slate-600/50">
          <div className="max-w-2xl mx-auto">
            <div className="sticky top-24">
              <h2 className="text-white text-2xl font-semibold mb-6">
                SEO Analysis Results
              </h2>

              {!analysisResult && !isLoading && (
                <div className="bg-slate-700/30 rounded-xl p-8 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">
                    Fill out the form to analyze your content's SEO
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="bg-slate-700/30 rounded-xl p-8 text-center">
                  <p className="text-white text-lg">Loading...</p>
                </div>
              )}

              {analysisResult && (
                <div className="bg-slate-700/30 rounded-xl p-6 space-y-6">
                  <ScoreIndicator
                    label="SEO Score"
                    score={analysisResult.score}
                    color={getScoreColor(analysisResult.score)}
                  />
                  <ScoreIndicator
                    label="Readability Score"
                    score={analysisResult.readabilityScore}
                    color={getScoreColor(analysisResult.readabilityScore)}
                  />

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">
                      Recommended Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="bg-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-sm"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">
                      Suggestions
                    </h3>
                    <div className="space-y-3">
                      {analysisResult.suggestions.map((s, i) => (
                        <SuggestionCard key={i} suggestion={s} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default SEO;
