import React, { useEffect, useState, useMemo } from "react";
import { 
  Calendar, 
  Lightbulb, 
  FileText, 
  Image, 
  Search, 
  Vault, 
  TrendingUp, 
  Clock, 
  Zap,
  Play,
  Star
} from "lucide-react";
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduledEvents] = useState([
    { date: '2024-03-08', title: 'Tech Review Video', type: 'video' },
    { date: '2024-03-13', title: 'AI Tutorial Script', type: 'script' },
    { date: '2024-03-22', title: 'Gaming Channel Update', type: 'video' },
  ]);

  const [savedIdeas] = useState([
    { title: 'AI Development Tutorial Series', date: '2 days ago', likes: 156, category: 'tech' },
    { title: 'Sustainable Living Tips', date: '3 days ago', likes: 142, category: 'lifestyle' },
    { title: 'Modern Web Development Guide', date: '4 days ago', likes: 128, category: 'tech' },
    { title: 'Content Creation Masterclass', date: '5 days ago', likes: 98, category: 'education' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const services = useMemo(() => [
    {
      title: "Idea Generator",
      description: "Generate relevant video ideas and kickstart your content planning.",
      icon: Lightbulb,
      link: "/idea",
      stats: {
        generated: 124,
        saved: 45,
        trending: 12
      }
    },
    {
      title: "Script Generator", 
      description: "Create compelling scripts that engage your audience effectively.",
      icon: FileText,
      link: "/script",
      stats: {
        generated: 89,
        saved: 34,
        trending: 8
      }
    },
    {
      title: "Thumbnail Generator",
      description: "Design eye-catching thumbnails that boost your click-through rates.",
      icon: Image,
      link: "/thumbnail",
      stats: {
        generated: 156,
        saved: 67,
        trending: 15
      }
    },
    {
      title: "SEO Corner",
      description: "Optimize your content for maximum discoverability and reach.",
      icon: Search,
      link: "/seo",
      stats: {
        generated: 234,
        saved: 89,
        trending: 23
      }
    },
  ], []);

  const vaultItems = useMemo(() => [
    {
      title: "Saved Ideas",
      description: "Your creative concepts ready to be transformed into content.",
      icon: Lightbulb,
      count: 12,
      recentItems: [
        { title: "Tech Review Series", date: "2 days ago" },
        { title: "Sustainable Living Tips", date: "4 days ago" },
        { title: "AI in Daily Life", date: "1 week ago" }
      ]
    },
    {
      title: "Saved Scripts",
      description: "Polished scripts waiting for your next video production.",
      icon: FileText,
      count: 8,
      recentItems: [
        { title: "AI Tools Overview", date: "1 day ago" },
        { title: "Productivity Hacks", date: "3 days ago" },
        { title: "Tech News Roundup", date: "5 days ago" }
      ]
    },
    {
      title: "Saved Thumbnails",
      description: "Eye-catching designs ready to attract viewers.",
      icon: Image,
      count: 15,
      recentItems: [
        { title: "Future of AI", date: "1 day ago" },
        { title: "Top 10 Gadgets", date: "2 days ago" },
        { title: "Coding Tutorial", date: "4 days ago" }
      ]
    },
  ], []);

  const recentActivities = useMemo(() => [
    { action: "Finalize idea", date: "08-05-2025", description: "Completed brainstorming session for tech review series", type: "idea" },
    { action: "Script generated", date: "07-05-2025", description: "Created script for 'Top 10 Tech Trends' video content", type: "script" },
    { action: "Thumbnail created", date: "06-05-2025", description: "Generated thumbnail for YouTube cooking tutorial series", type: "thumbnail" },
  ], []);

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

  const renderCalendar = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const today = currentDate.getDate();
    const eventDays = [8, 9, 10, 13, 18, 22, 23];
    
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today;
      const hasEvent = eventDays.includes(day);
      
      days.push(
        <div
          key={day}
          className={`aspect-square flex items-center justify-center text-xs rounded-lg cursor-pointer transition-all duration-200 font-medium ${
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
      <div className="min-h-[calc(100vh-80px)] mt-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold text-white mb-3">
                Welcome back, <span className="text-blue-400">Creator</span>! 👋
              </h1>
              <p className="text-lg text-gray-400">
                {formatDate(currentDate)} • {formatTime(currentDate)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/60 transition-colors duration-300 h-[420px] flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        {getCurrentMonth()}
                      </h2>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full">
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                            <div key={day} className="text-center text-xs font-semibold text-gray-400">
                              {day}
                            </div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1">
                          {renderCalendar()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-7">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/60 transition-colors duration-300 h-[420px] flex flex-col">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                      <Clock className="h-4 w-4 text-blue-400" />
                      Scheduled Content
                    </h2>
                    
                    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                      {scheduledEvents.length > 0 ? (
                        scheduledEvents.map((event, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-3 bg-slate-900/50 rounded-lg p-3 hover:bg-slate-900/70 transition-all duration-300"
                          >
                            {event.type === 'video' && <Play className="h-4 w-4 text-green-400" />}
                            {event.type === 'script' && <FileText className="h-4 w-4 text-blue-400" />}
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-white">{event.title}</h4>
                              <p className="text-xs text-gray-400">{event.date}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-400 text-sm">No scheduled content for this month</p>
                          <button className="mt-2 text-blue-400 text-sm hover:text-blue-300 transition-colors duration-300">
                            + Add New Schedule
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="h-[420px] space-y-3">
                {vaultItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2 hover:bg-slate-800/60 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800/50 group-hover:bg-blue-600/20 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                        <item.icon className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors duration-300">{item.title}</h4>
                          <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full font-medium ml-2">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {item.recentItems.slice(0, 2).map((recentItem, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs bg-slate-800/30 p-2 rounded-lg">
                          <span className="text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">{recentItem.title}</span>
                          <span className="text-gray-500 ml-2 flex-shrink-0">{recentItem.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-12">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/60 transition-colors duration-300">
                <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Recent Activities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentActivities.map((activity, index) => (
                    <div 
                      key={index} 
                      className="group bg-slate-900/50 border border-slate-800/50 p-4 rounded-lg hover:bg-slate-900/80 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-white flex items-center gap-2 group-hover:text-blue-400 transition-colors duration-300">
                          {activity.type === 'idea' && <Lightbulb className="h-4 w-4 text-yellow-400" />}
                          {activity.type === 'script' && <FileText className="h-4 w-4 text-green-400" />}
                          {activity.type === 'thumbnail' && <Image className="h-4 w-4 text-purple-400" />}
                          {activity.action}
                        </h4>
                        <span className="text-xs text-gray-500 bg-slate-800/50 px-2 py-1 rounded-full">{activity.date}</span>
                      </div>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-blue-400" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((service, index) => (
                <div 
                  key={index}
                  onClick={() => navigate(service.link)}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/80 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/50 group-hover:bg-blue-600/20 flex items-center justify-center transition-all duration-300">
                      <service.icon className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">{service.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">{service.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-center py-2 px-2 rounded-lg bg-slate-900/50 border border-slate-800/50 group-hover:border-blue-500/30">
                          <div className="text-lg font-bold text-blue-400">{service.stats.generated}</div>
                          <div className="text-xs text-gray-500">Generated</div>
                        </div>
                        <div className="text-center py-2 px-2 rounded-lg bg-slate-900/50 border border-slate-800/50 group-hover:border-green-500/30">
                          <div className="text-lg font-bold text-green-400">{service.stats.saved}</div>
                          <div className="text-xs text-gray-500">Saved</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Home;