import React, { useState, useMemo, useCallback } from "react";
import { Image, Upload, Palette, Type, Layout, Star } from "lucide-react";
import Background from "../components/Background";

const THUMBNAIL_STYLES = {
  gaming: [
    "Neon Gaming Setup",
    "Action-Packed Gameplay",
    "Character Showcase",
    "Tournament Highlights",
    "Gaming News Update"
  ],
  tech: [
    "Clean Tech Review",
    "Product Showcase",
    "Tutorial Preview",
    "Tech News Update",
    "Comparison Style"
  ],
  vlog: [
    "Daily Life Moments",
    "Travel Highlights",
    "Story Time",
    "Life Update",
    "Behind the Scenes"
  ]
};

const mockGenerateThumbnail = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    styles: THUMBNAIL_STYLES[data.style] || THUMBNAIL_STYLES.tech,
    style: data.style,
    theme: data.theme,
    targetAudience: data.targetAudience,
    preview: "https://placehold.co/1280x720"
  };
};

const StyleButton = React.memo(({ type, selected, onClick }) => (
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

const ThumbnailPreview = React.memo(({ preview, title }) => (
  <div className="p-4 bg-slate-600/30 rounded-lg border border-slate-500/50 hover:border-blue-500/50 transition-all duration-300 group">
    <div className="aspect-video w-full rounded-lg overflow-hidden mb-3">
      <img 
        src={preview} 
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <p className="text-white group-hover:text-blue-300 transition-colors duration-300 text-center">
      {title}
    </p>
  </div>
));

function Thumbnail() {
  const [formData, setFormData] = useState({
    title: "",
    theme: "",
    targetAudience: "",
    style: "tech",
    image: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const handleStyleChange = useCallback((style) => {
    setFormData((prev) => ({ ...prev, style }));
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

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file
      }));
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        const response = await mockGenerateThumbnail(formData);
        setGeneratedContent(response);
      } catch (err) {
        setError("Failed to generate thumbnail. Please try again.");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  const styleButtons = useMemo(
    () =>
      ["tech", "gaming", "vlog"].map((type) => (
        <StyleButton
          key={type}
          type={type}
          selected={formData.style === type}
          onClick={handleStyleChange}
        />
      )),
    [formData.style, handleStyleChange]
  );

  return (
    <Background>
      <div className="min-h-[calc(100vh-80px)] mt-20 flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-white text-4xl font-bold mb-4">
                Thumbnail Generator
              </h1>
              <p className="text-gray-300 text-lg">
                Create eye-catching thumbnails that boost your engagement
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-lg mb-2">
                    Thumbnail Style
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {styleButtons}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="theme"
                    className="block text-white text-lg mb-2"
                  >
                    Color Theme
                  </label>
                  <select
                    id="theme"
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select a theme</option>
                    <option value="vibrant">Vibrant</option>
                    <option value="minimal">Minimal</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="gradient">Gradient</option>
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
                    placeholder="e.g., Gamers, Tech enthusiasts"
                    required
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="title"
                    className="block text-white text-lg mb-2"
                  >
                    Thumbnail Title
                  </label>
                  <textarea
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
                    placeholder="Enter the title that will appear on your thumbnail..."
                    required
                  />
                  <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                    {charCount}/100
                  </div>
                </div>

                <div>
                  <label className="block text-white text-lg mb-2">
                    Background Image
                  </label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-blue-500/50 transition-colors duration-300">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label 
                      htmlFor="imageUpload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-400">Drop an image or click to upload</p>
                      {formData.image && (
                        <p className="text-blue-400 mt-2">{formData.image.name}</p>
                      )}
                    </label>
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
                      Generating Thumbnail...
                    </div>
                  ) : (
                    "Generate Thumbnail"
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

        <div className="w-full lg:w-1/2 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-slate-600/50">
          <div className="max-w-2xl mx-auto">
            <div className="sticky top-24">
              <h2 className="text-white text-2xl font-semibold mb-6">
                Generated Thumbnail
              </h2>

              {!generatedContent && !isLoading && (
                <div className="bg-slate-700/30 rounded-xl p-8 text-center">
                  <p className="text-gray-400 text-lg">
                    Fill out the form to generate your thumbnail
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="bg-slate-700/30 rounded-xl p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-400 text-lg">
                    Creating your thumbnail...
                  </p>
                </div>
              )}

              {generatedContent && !isLoading && (
                <div className="space-y-6">
                  <div className="flex gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {generatedContent.style}
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {generatedContent.theme}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <ThumbnailPreview 
                      preview={generatedContent.preview}
                      title={formData.title}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                      {generatedContent.styles.map((style, index) => (
                        <div 
                          key={index}
                          className="bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer"
                        >
                          <p className="text-sm text-gray-300 text-center">{style}</p>
                        </div>
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

export default Thumbnail;
