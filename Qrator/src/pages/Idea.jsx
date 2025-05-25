import React, { useState, useMemo, useCallback } from "react";
import Background from "../components/Background";

const IDEAS_BY_TYPE = {
  video: [
    "Create a day-in-the-life vlog showcasing sustainable living practices",
    "Film a tutorial series on eco-friendly home improvements",
    "Produce a mini-documentary about local environmental initiatives",
    "Start a weekly Q&A series addressing common sustainability myths",
    "Launch a challenge series for reducing carbon footprint",
  ],
  blog: [
    "Write a comprehensive guide on starting a zero-waste lifestyle",
    "Create a series on sustainable fashion choices and their impact",
    "Develop a weekly sustainable recipe blog series",
    "Share success stories of people who've gone plastic-free",
    "Craft educational posts about renewable energy solutions",
  ],
  social: [
    "Design infographic series about quick eco-friendly tips",
    "Create daily sustainable living challenges for Instagram",
    "Share before/after transformations of sustainable switches",
    "Develop a TikTok series on quick sustainable life hacks",
    "Post weekly sustainable product reviews and alternatives",
  ],
};

const mockGenerateIdeas = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Reduced delay to 500ms
  return {
    ideas: IDEAS_BY_TYPE[data.contentType] || IDEAS_BY_TYPE.video,
    contentType: data.contentType,
    tone: data.tone,
    targetAudience: data.targetAudience,
  };
};

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

const IdeaCard = React.memo(({ index, idea }) => (
  <div className="p-4 bg-slate-600/30 rounded-lg border border-slate-500/50 hover:border-blue-500/50 transition-all duration-300 group">
    <div className="flex items-start gap-4">
      <span className="text-blue-400 text-lg font-semibold">#{index + 1}</span>
      <p className="text-white group-hover:text-blue-300 transition-colors duration-300">
        {idea}
      </p>
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

  const handleContentTypeChange = useCallback((type) => {
    setFormData((prev) => ({ ...prev, contentType: type }));
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "goal") {
      setCharCount(value.length);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // console.log(formData)

      const dataRes = await fetch('http://localhost:4000/generate/idea' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      }) 

      console.log(dataRes)

      setIsLoading(true);
      setError(null);

      try {
        const response = await mockGenerateIdeas(formData);
        setGeneratedContent(response);
      } catch (err) {
        setError("Failed to generate ideas. Please try again.");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  const contentTypeButtons = useMemo(
    () =>
      ["video", "blog", "social"].map((type) => (
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
                    Content Type
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
                    Content Tone
                  </label>
                  <select
                    id="tone"
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select a tone</option>
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="humorous">Humorous</option>
                    <option value="educational">Educational</option>
                    <option value="inspirational">Inspirational</option>
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
                    placeholder="Describe your content goals, target impact, and any specific themes you want to focus on..."
                    required
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
          <div className="max-w-2xl mx-auto">
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

                  <div className="space-y-4">
                    {generatedContent.ideas.map((idea, index) => (
                      <IdeaCard key={index} index={index} idea={idea} />
                    ))}
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

export default Idea;
