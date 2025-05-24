import { ArrowRight, Lightbulb, FileText, Image, Calendar, Search, Vault, Sparkles, Play, Users, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import Background from "../components/Background";

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate featured highlights
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Lightbulb,
      title: "AI Idea Generator",
      description: "Generate creative content ideas based on trends and your goals with advanced AI algorithms",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: FileText,
      title: "Script Generator",
      description: "Convert ideas into professional scripts for videos and articles with intelligent formatting",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Image,
      title: "Thumbnail Creator",
      description: "Auto-generate eye-catching thumbnails with AI-powered design suggestions",
      color: "from-pink-500 to-red-600"
    },
    {
      icon: Calendar,
      title: "Content Calendar",
      description: "Plan and schedule your content across multiple platforms with smart automation",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: Search,
      title: "SEO Tools",
      description: "Optimize your content for search engines with real-time analysis and suggestions",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: Vault,
      title: "Content Vault",
      description: "Store, organize and manage all your generated content in one secure location",
      color: "from-indigo-500 to-purple-600"
    },
  ];

  const highlights = [
    {
      icon: Users,
      title: "10,000+ Creators",
      description: "Join our growing community"
    },
    {
      icon: Trophy,
      title: "99% Success Rate",
      description: "Proven content performance"
    },
    {
      icon: Zap,
      title: "5x Faster",
      description: "Speed up your workflow"
    }
  ];

  const handleGetStarted = () => {
    // In a real app, this would navigate to dashboard
    console.log("Navigating to dashboard...");
  };

  const handleWatchDemo = () => {
    // In a real app, this would open demo video
    console.log("Opening demo video...");
  };

  return (
    <Background>
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-6 pt-20 pb-16 text-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-[#1e293b] flex items-center justify-center shadow-2xl">
                  <Sparkles className="h-12 w-12 text-blue-400" />
                </div>
                <div className="absolute -inset-2 bg-[#0f172a] rounded-3xl opacity-20 blur-xl"></div>
              </div>
            </div>
            
            {/* Main Headlines */}
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent tracking-tight">
              Start your Journey
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get, Set, Create
            </h2>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              Streamline and automate your content creation workflow with powerful AI tools. 
              From ideation to publication, Qrator helps creators, marketers, and teams 
              produce amazing content effortlessly.
            </p>
            
            {/* Highlight Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full bg-[#1e293b] border border-gray-700 transition-all duration-500 ${
                    activeFeature === index ? 'bg-[#0f172a]' : ''
                  }`}
                >
                  <highlight.icon className="h-5 w-5 text-blue-400" />
                  <div className="text-left">
                    <div className="font-semibold text-white">{highlight.title}</div>
                    <div className="text-sm text-gray-400">{highlight.description}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg font-semibold rounded-2xl shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-[#0f172a] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={handleWatchDemo}
                className="bg-[#0f172a] border-2 border-gray-700 text-white hover:bg-gray-800 px-10 py-7 text-lg font-semibold rounded-2xl transition-all duration-300 group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform text-blue-400" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Everything You Need to Create
          </h3>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Powerful AI-driven tools designed to streamline every step of your content creation process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-[#1e293b] border border-gray-700 hover:bg-[#0f172a] transition-all duration-500 hover:transform hover:scale-105 group cursor-pointer p-8 text-center relative overflow-hidden rounded-xl"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-[#0f172a] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className="w-18 h-18 mx-auto mb-6 rounded-2xl bg-[#0f172a] flex items-center justify-center group-hover:opacity-100 transition-all duration-500 relative">
                <feature.icon className="h-9 w-9 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              {/* Content */}
              <h4 className="text-xl font-semibold mb-4 text-white group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-[#1e293b] rounded-3xl p-12 border border-gray-700 text-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Content Creation?
            </h3>
            <p className="text-gray-300 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of creators who are already using Qrator to streamline their workflow and create amazing content
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-7 text-xl font-semibold rounded-2xl shadow-2xl transition-all duration-300 group"
              >
                <span className="flex items-center">
                  Start Creating Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <div className="text-gray-400 text-sm">
                No credit card required • Free 14-day trial
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
    </Background>
  );
}