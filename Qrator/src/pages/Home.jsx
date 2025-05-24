import React, { useEffect, useState } from "react";
import { Calendar, Lightbulb, FileText, Image, Search, Vault, TrendingUp, Clock, Plus, User, Sun, Moon } from "lucide-react";
import Background from "../components/Background";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      title: "Idea Generator",
      description: "Generate relevant video ideas and kickstart your content planning.",
      icon: Lightbulb,
      link: "/idea"
    },
    {
      title: "Script Generator", 
      description: "Create compelling scripts that engage your audience effectively.",
      icon: FileText,
      link: "/script"
    },
    {
      title: "Thumbnail Generator",
      description: "Design eye-catching thumbnails that boost your click-through rates.",
      icon: Image,
      link: "/thumbnail"
    },
    {
      title: "SEO Corner",
      description: "Optimize your content for maximum discoverability and reach.",
      icon: Search,
      link: "/seo"
    },
  ];

  const vaultItems = [
    {
      title: "Saved Ideas",
      description: "Your creative concepts ready to be transformed into content.",
      icon: Lightbulb,
      count: 12
    },
    {
      title: "Saved Scripts",
      description: "Polished scripts waiting for your next video production.",
      icon: FileText,
      count: 8
    },
    {
      title: "Saved Thumbnails",
      description: "Eye-catching designs ready to attract viewers.",
      icon: Image,
      count: 15
    },
  ];

  const recentActivities = [
    { action: "Finalize idea", date: "08-05-2025", description: "Completed brainstorming session for tech review series" },
    { action: "Script generated", date: "07-05-2025", description: "Created script for 'Top 10 Tech Trends' video content" },
    { action: "Thumbnail created", date: "06-05-2025", description: "Generated thumbnail for YouTube cooking tutorial series" },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit' 
    });
  };

  const getCurrentMonth = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const today = currentDate.getDate();
    const eventDays = [8, 9, 10, 13, 18, 22, 23];
    
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today;
      const hasEvent = eventDays.includes(day);
      
      days.push(
        <div
          key={day}
          className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all duration-200 font-medium ${
            isToday
              ? 'bg-blue-600 text-white'
              : hasEvent
              ? 'bg-[#0f172a] text-blue-400'
              : 'text-gray-400 hover:bg-[#0f172a]'
          }`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <Background>
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Creator! 👋</h1>
                <p className="text-gray-300">
                  {formatDate(currentDate)} • {formatTime(currentDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Calendar Widget */}
              <div className="bg-[#1e293b] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-blue-400" />
                    {getCurrentMonth()}
                  </h2>
                  <button className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                    View Full Calendar
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-400 p-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {renderCalendar()}
                </div>
                
                {/* Recent Activities */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="bg-[#0f172a] p-4 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{activity.action}</h4>
                        <span className="text-sm text-gray-400 bg-[#1e293b] px-2 py-1 rounded-lg">{activity.date}</span>
                      </div>
                      <p className="text-sm text-gray-300">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Grid */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="bg-[#1e293b] rounded-xl p-8 hover:bg-[#0f172a] transition-all duration-300 cursor-pointer"
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-[#0f172a] flex items-center justify-center">
                          <service.icon className="h-10 w-10 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200">
                          Generate Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vault Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#1e293b] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Vault className="h-6 w-6 text-blue-400" />
                    Vault
                  </h2>
                  <button className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {vaultItems.map((item, index) => (
                    <div key={index} className="bg-[#0f172a] p-4 rounded-lg cursor-pointer hover:bg-gray-800 transition-all duration-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#1e293b] flex items-center justify-center">
                          <item.icon className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{item.title}</h4>
                            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg font-medium">
                              {item.count}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#1e293b] rounded-xl p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Plus className="h-6 w-6 text-blue-400" />
                  Quick Actions
                </h2>
                
                <div className="space-y-3">
                  {[
                    { icon: Lightbulb, text: "Generate New Idea" },
                    { icon: FileText, text: "Create Script" },
                    { icon: Image, text: "Design Thumbnail" },
                    { icon: Calendar, text: "Schedule Content" },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white bg-[#0f172a] hover:bg-gray-800 transition-all duration-200"
                    >
                      <div className="p-2 rounded-lg bg-[#1e293b]">
                        <action.icon className="h-4 w-4 text-blue-400" />
                      </div>
                      <span className="font-medium">{action.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Home;