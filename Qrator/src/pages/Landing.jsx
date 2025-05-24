import {
  ArrowRight,
  Lightbulb,
  FileText,
  Image,
  Calendar,
  Search,
  Vault,
  Play,
  Users,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Lightbulb,
      title: "AI Idea Generator",
      description:
        "Generate creative content ideas based on trends and your goals with advanced AI algorithms",
      color: "from-blue-500 to-purple-600",
      path: "/idea",
    },
    {
      icon: FileText,
      title: "Script Generator",
      description:
        "Convert ideas into professional scripts for videos and articles with intelligent formatting",
      color: "from-purple-500 to-pink-600",
      path: "/script",
    },
    {
      icon: Image,
      title: "Thumbnail Creator",
      description:
        "Auto-generate eye-catching thumbnails with AI-powered design suggestions",
      color: "from-pink-500 to-red-600",
      path: "/thumbnail",
    },
    {
      icon: Calendar,
      title: "Content Calendar",
      description:
        "Plan and schedule your content across multiple platforms with smart automation",
      color: "from-green-500 to-blue-600",
      path: "/calendar",
    },
    {
      icon: Search,
      title: "SEO Tools",
      description:
        "Optimize your content for search engines with real-time analysis and suggestions",
      color: "from-yellow-500 to-orange-600",
      path: "/seo",
    },
    {
      icon: Vault,
      title: "Content Vault",
      description:
        "Store, organize and manage all your generated content in one secure location",
      color: "from-indigo-500 to-purple-600",
      path: "/vault",
    },
  ];

  const highlights = [
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Advanced algorithms for content creation",
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Intuitive interface for all creators",
    },
    {
      icon: Trophy,
      title: "Instant Results",
      description: "Get content ideas in seconds",
    },
  ];

  return (
    <Background showFooter={false} showNavbar={false}>
      <div className="min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-6 pt-16">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <h1 className="text-white font-bold leading-tight">
                <div className="text-7xl lg:text-8xl mb-4">
                  Start your <span className="text-blue-400">Journey</span>
                </div>
                <div className="text-5xl lg:text-6xl text-blue-300">
                  Get, Set, Create
                </div>
              </h1>

              <p className="text-white/80 text-xl lg:text-2xl leading-relaxed">
                Streamline your content creation workflow with powerful AI
                tools. From ideation to publication, create amazing content
                effortlessly.
              </p>

              <div className="flex justify-center gap-6 py-8">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 w-[280px] h-[80px] px-6 rounded-xl bg-slate-700/30 border border-slate-600/50 backdrop-blur-sm hover:bg-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center">
                      <highlight.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="font-semibold text-lg text-white">
                        {highlight.title}
                      </div>
                      <div className="text-sm text-blue-300/80">
                        {highlight.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-6 justify-center pt-8">
                <button
                  onClick={() => navigate("/home")}
                  className="cursor-pointer px-12 py-4 bg-gradient-to-b from-indigo-600 to-blue-500 text-white text-2xl font-semibold rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  SIGN IN
                </button>
                <button
                  onClick={() => navigate("/home")}
                  className="cursor-pointer px-12 py-4 bg-gradient-to-b from-indigo-600 to-blue-500 text-white text-2xl font-semibold rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  SIGN UP
                </button>
              </div>
            </div>
          </div>

          <div className="mt-32 mb-20">
            <h2 className="text-4xl font-bold text-center mb-16">
              Powerful Tools for{" "}
              <span className="text-blue-400">Content Creators</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => navigate(feature.path)}
                  className="group cursor-pointer bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-8 hover:bg-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-slate-800/50 group-hover:bg-blue-500/20 transition-colors duration-300">
                      <feature.icon className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}