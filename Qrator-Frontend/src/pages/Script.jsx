import React, { useState, useMemo, useCallback } from "react";
import Background from "../components/Background";

const SCRIPTS_BY_TYPE = {
  youtube: [
    {
      title: "How to Start a Sustainable Lifestyle",
      hook: "Did you know that the average person generates over 4 pounds of waste every day? But what if I told you that you could cut that in half with just a few simple changes?",
      outline: [
        "Introduction and shocking statistics about waste",
        "Three easy sustainable swaps for beginners",
        "Cost savings breakdown",
        "Common mistakes to avoid",
        "Call to action and community challenge",
      ],
    },
  ],
  podcast: [
    {
      title: "The Green Revolution: Episode 1",
      hook: "Welcome to The Green Revolution, where we explore how small changes can make a big impact on our planet. Today, we're diving into the world of sustainable living.",
      outline: [
        "Show introduction and topic overview",
        "Guest expert introduction",
        "Main discussion points about sustainable living",
        "Listener questions segment",
        "Action steps and next episode preview",
      ],
    },
  ],
  video: [
    {
      title: "5 Eco-Friendly Home Hacks",
      hook: "Transform your home into an eco-friendly paradise without breaking the bank! These simple hacks will save you money and help save the planet.",
      outline: [
        "Quick montage of before/after results",
        "Hack #1: DIY natural cleaning solutions",
        "Hack #2: Energy-saving techniques",
        "Hack #3: Water conservation methods",
        "Wrap-up and viewer challenge",
      ],
    },
  ],
};

const mockGenerateScript = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const scriptTemplate = SCRIPTS_BY_TYPE[data.scriptType][0];
  return {
    ...scriptTemplate,
    scriptType: data.scriptType,
    targetAudience: data.targetAudience,
    duration: data.duration,
    style: data.style,
  };
};

const ScriptTypeButton = React.memo(({ type, selected, onClick }) => (
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

const OutlinePoint = React.memo(({ point, index }) => (
  <div className="flex items-start gap-4 p-4 bg-slate-600/30 rounded-lg">
    <span className="text-blue-400 font-semibold">{index + 1}.</span>
    <p className="text-white">{point}</p>
  </div>
));

function Script() {
  const [formData, setFormData] = useState({
    scriptType: "youtube",
    targetAudience: "",
    duration: "",
    style: "",
    topic: "",
    keyPoints: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedScript, setGeneratedScript] = useState(null);

  const handleScriptTypeChange = useCallback((type) => {
    setFormData((prev) => ({ ...prev, scriptType: type }));
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      setGeneratedScript(null);

      try {
        const response = await fetch(`${API_BASE_URL}/script/text`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to generate script.");
        }

        const data = await response.json();
        const scriptText = data.script || "";

// Split by lines and filter out empty lines
const lines = scriptText.split('\n').map(line => line.trim()).filter(Boolean);

// Find the title line (look for a line starting with **Title:**)
const titleLine = lines.find(line => line.toLowerCase().startsWith('**title:**'));
const title = titleLine ? titleLine.replace(/\*\*Title:\*\*/i, '').trim() : formData.topic;

// Find the first "hook" section (for demo, let's use the first non-title, non-empty line)
const hookIndex = lines.findIndex(line => line.toLowerCase().includes('hook'));
const hook = hookIndex !== -1 && lines[hookIndex + 1] ? lines[hookIndex + 1] : "";

// For outline, grab all lines after the hook section (customize as needed)
const outlineStart = hookIndex + 2;
const outline = lines.slice(outlineStart);

setGeneratedScript({
  title,
  hook,
  outline,
  scriptType: formData.scriptType,
  targetAudience: formData.targetAudience,
  duration: formData.duration,
  style: formData.style,
});

      } catch (err) {
        setError(err.message || "Failed to generate script. Please try again.");
        setGeneratedScript(null);
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  const scriptTypeButtons = useMemo(
    () =>
      ["youtube", "podcast", "video"].map((type) => (
        <ScriptTypeButton
          key={type}
          type={type}
          selected={formData.scriptType === type}
          onClick={handleScriptTypeChange}
        />
      )),
    [formData.scriptType, handleScriptTypeChange]
  );

  return (
    <Background>
      <div className="min-h-[calc(100vh-80px)] mt-20 flex flex-col lg:flex-row w-full">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-white text-4xl font-bold mb-4">
                Script Generator
              </h1>
              <p className="text-gray-300 text-lg">
                Transform your ideas into engaging scripts
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-lg mb-2">
                    Script Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {scriptTypeButtons}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="style"
                    className="block text-white text-lg mb-2"
                  >
                    Content Style
                  </label>
                  <select
                    id="style"
                    name="style"
                    value={formData.style}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select a style</option>
                    <option value="educational">Educational</option>
                    <option value="entertaining">Entertaining</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="storytelling">Storytelling</option>
                    <option value="interview">Interview</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-white text-lg mb-2"
                  >
                    Target Duration
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="short">Short (3-5 minutes)</option>
                    <option value="medium">Medium (5-10 minutes)</option>
                    <option value="long">Long (10-15 minutes)</option>
                    <option value="extended">Extended (15+ minutes)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="targetAudience"
                    className="block text-white text-lg mb-2"
                  >
                    Target Audience
                  </label>
                  <input
                    type="text"
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., Beginners, Tech enthusiasts"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="topic"
                    className="block text-white text-lg mb-2"
                  >
                    Main Topic 
                  </label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., Sustainable living tips"
                    required
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="keyPoints"
                    className="block text-white text-lg mb-2"
                  >
                    Key Points to Cover
                  </label>
                  <textarea
                    id="keyPoints"
                    name="keyPoints"
                    value={formData.keyPoints}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[150px]"
                    placeholder="List the main points you want to cover in your content..."
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
                      Generating Script...
                    </div>
                  ) : (
                    "Generate Script"
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
          <div className="max-w-2xl mx-auto">
            <div className="sticky top-24">
              <h2 className="text-white text-2xl font-semibold mb-6">
                Generated Script
              </h2>

              {!generatedScript && !isLoading && (
                <div className="bg-slate-700/30 rounded-xl p-8 text-center">
                  <p className="text-gray-400 text-lg">
                    Fill out the form to generate your script
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="bg-slate-700/30 rounded-xl p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-400 text-lg">
                    Crafting your perfect script...
                  </p>
                </div>
              )}

              {generatedScript && !isLoading && (
                <div className="space-y-6">
                  <div className="flex gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {generatedScript.scriptType}
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {generatedScript.style}
                    </span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                      {generatedScript.duration}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Title
                      </h3>
                      <p className="text-blue-300">{generatedScript.title}</p>
                    </div>

                    <div className="bg-slate-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Hook
                      </h3>
                      <p className="text-blue-300">{generatedScript.hook}</p>
                    </div>

                    <div className="bg-slate-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Script Outline
                      </h3>
                      <div className="space-y-3">
                        {generatedScript.outline.map((point, index) => (
                          <OutlinePoint
                            key={index}
                            point={point}
                            index={index}
                          />
                        ))}
                      </div>
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

export default Script;
