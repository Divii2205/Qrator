import React, { useState, useMemo, useCallback } from "react";
import Background from "../components/Background";

const ContentTypeButton = React.memo(({ type, selected, onClick }) => (
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

const IdeaCard = React.memo(({ index, idea, saved, onToggleSave }) => (
  <div className="relative p-4 bg-slate-600/30 rounded-lg border border-slate-500/50 hover:border-blue-500/50 transition-all duration-300 group">
    {/* Save Icon Top Right */}
    <button
      type="button"
      className="absolute top-3 right-3 text-blue-400 hover:text-blue-500 transition"
      onClick={() => onToggleSave(index)}
      aria-label={saved ? "Unsave" : "Save"}
    >
      {saved ? (
        // Filled Bookmark
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          className="w-6 h-6"
        >
          <path d="M5 3a2 2 0 0 0-2 2v13l7-4 7 4V5a2 2 0 0 0-2-2H5z" />
        </svg>
      ) : (
        // Outline Bookmark
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 20"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3a2 2 0 0 0-2 2v13l7-4 7 4V5a2 2 0 0 0-2-2H5z"
          />
        </svg>
      )}
    </button>
    <div className="flex items-start gap-4">
      <span className="text-blue-400 text-lg font-semibold">#{index + 1}</span>
      <div className="flex-1 pr-8">
        <p className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">
          {idea.title}
        </p>
        <p className="text-gray-300 text-sm mt-1">{idea.description}</p>
      </div>
    </div>
  </div>
));

function Idea() {
  const [formData, setFormData] = useState({
    goal: "",
    tone: "",
    targetAudience: "",
    contentType: "video",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [showCustomTone, setShowCustomTone] = useState(false);
  const [savedIdeas, setSavedIdeas] = useState([]);

  const handleContentTypeChange = useCallback((type) => {
    setFormData((prev) => ({ ...prev, contentType: type }));
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Show custom tone input if "other" is selected in the select box
      if (name === "tone" && e.target.tagName === "SELECT") {
        if (value === "other") {
          setShowCustomTone(true);
          setFormData((prev) => ({
            ...prev,
            tone: "",
          }));
        } else {
          setShowCustomTone(false);
          setFormData((prev) => ({
            ...prev,
            tone: value,
          }));
        }
        return;
      }

      // For custom tone input box
      if (name === "tone" && showCustomTone && e.target.tagName === "INPUT") {
        setFormData((prev) => ({
          ...prev,
          tone: value,
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "goal") {
        setCharCount(value.length);
      }
    },
    [showCustomTone]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(formData);

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/generate/idea`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        console.log(response);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to generate ideas.");
        }

        const data = await response.json();
        setGeneratedContent({
          ideas: data.ideas,
          contentType: formData.contentType,
          tone: formData.tone,
          targetAudience: formData.targetAudience,
        });
        setSavedIdeas([]); // Reset bookmarks when new ideas are generated
      } catch (err) {
        setError(err.message || "Failed to generate ideas. Please try again.");
        setGeneratedContent(null);
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  const handleToggleSave = useCallback(
    (index) => {
      setSavedIdeas((prev) => {
        const newSavedIdeas = [...prev];
        newSavedIdeas[index] = !newSavedIdeas[index];
        return newSavedIdeas;
      });
    },
    [setSavedIdeas]
  );

  const contentTypeButtons = useMemo(
    () =>
      ["video", "shorts", "post"].map((type) => (
        <ContentTypeButton
          key={type}
          type={type}
          selected={formData.contentType === type}
          onClick={handleContentTypeChange}
        />
      )),
    [formData.contentType, handleContentTypeChange]
  );

  return (
    <Background>
      <div className="min-h-[calc(100vh-80px)] mt-20 flex flex-col lg:flex-row w-full">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-white text-4xl font-bold mb-4">
                Content Idea Generator
              </h1>
              <p className="text-gray-300 text-lg">
                Transform your goals into engaging content ideas
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-lg mb-2">
                    Content Type*
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {contentTypeButtons}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="tone"
                    className="block text-white text-lg mb-2"
                  >
                    Content Tone*
                  </label>
                  <div className={`flex items-center gap-2`}>
                    <select
                      id="tone"
                      name="tone"
                      value={showCustomTone ? "other" : formData.tone}
                      onChange={handleInputChange}
                      className={`px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400
        ${showCustomTone ? "w-1/2 min-w-[140px]" : "w-full"}`}
                      required
                    >
                      <option value="">Select a tone</option>
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="humorous">Humorous</option>
                      <option value="educational">Educational</option>
                      <option value="inspirational">Inspirational</option>
                      <option value="sarcastic">Sarcastic</option>
                      <option value="other">Other...</option>
                    </select>
                    {showCustomTone && (
                      <input
                        type="text"
                        name="tone"
                        value={formData.tone}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2 rounded-lg bg-slate-600 !important text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your custom tone"
                        required
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="targetAudience"
                    className="block text-white text-lg mb-2"
                  >
                    Target Audience*
                  </label>
                  <input
                    type="text"
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 !important"
                    placeholder="e.g., Young professionals, Tech enthusiasts"
                    required
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="goal"
                    className="block text-white text-lg mb-2"
                  >
                    What's your content goal?
                  </label>
                  <textarea
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[150px]"
                    placeholder="Describe your content goals, target impact, any specific themes you want to focus on, or any language you prefer in particular..."
                  />
                  <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                    {charCount}/500
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      Generating Ideas...
                    </div>
                  ) : generatedContent ? (
                    "Generate Again"
                  ) : (
                    "Generate Ideas"
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

        {/* Right Side - Output */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-slate-600/50">
          <div className="max-w-2xl mx-auto h-full">
            <div className="sticky top-24">
              <h2 className="text-white text-2xl font-semibold mb-6">
                Generated Ideas
              </h2>

              {!generatedContent && !isLoading && (
                <div className="bg-slate-700/30 rounded-xl p-8 text-center">
                  <p className="text-gray-400 text-lg">
                    Fill out the form to generate content ideas
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="bg-slate-700/30 rounded-xl p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-400 text-lg">
                    Generating amazing ideas for you...
                  </p>
                </div>
              )}

              {generatedContent && !isLoading && (
                <div className="space-y-6">
                  <div className="flex gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {generatedContent.contentType}
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {generatedContent.tone}
                    </span>
                  </div>
                  <div
                    className="max-h-[79vh] min-h-[400px] overflow-y-auto pr-2"
                    style={{ scrollbarGutter: "stable" }}
                  >
                    <div className="space-y-4">
                      {generatedContent.ideas.map((idea, index) => (
                        <IdeaCard
                          key={index}
                          index={index}
                          idea={idea}
                          saved={savedIdeas[index]}
                          onToggleSave={handleToggleSave}
                        />
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

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://qrator-wnf4.onrender.com";

export default Idea;
