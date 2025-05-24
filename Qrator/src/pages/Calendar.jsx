import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  User, 
  Sun, 
  Moon,
  Upload,
  MessageSquare,
  Edit3,
  Clock,
  Eye,
  Target,
  BarChart3
} from 'lucide-react';
import Background from '../components/Background';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'YouTube Upload',
    time: '10:00',
    description: ''
  });

  // Sample data 
  const sampleEvents = {
    '2025-05-08': [
      {id: 1, title: 'YouTube Upload', type: 'youtube', time: '10:00 AM', color: 'bg-red-500'},
      {id: 2, title: 'Instagram Story', type: 'instagram', time: '2:00 PM', color: 'bg-pink-500'}
    ],
    '2025-05-09': [
      {id: 3, title: 'Tweet Thread', type: 'twitter', time: '', color: 'bg-blue-500'}
    ],
    '2025-05-13': [
      {id: 4, title: 'Blog Post', type: 'blog', time: '', color: 'bg-green-500'}
    ],
    '2025-05-18': [
      {id: 5, title: 'YouTube Upload', type: 'youtube', time: '', color: 'bg-red-500'}
    ],
    '2025-05-22': [
      {id: 6, title: 'Instagram Reel', type: 'instagram', time: '', color: 'bg-pink-500'}
    ],
    '2025-05-23': [
      {id: 7, title: 'Podcast Episode', type: 'podcast', time: '', color: 'bg-purple-500'}
    ]
  };

  const upcomingEvents = [
    {title: 'YouTube Upload', date: 'May 8', time: '10:00 AM', type: 'youtube', color: 'bg-red-500'},
    {title: 'Instagram Story', date: 'May 8', time: '2:00 PM', type: 'instagram', color: 'bg-pink-500'},
    {title: 'Tweet Thread', date: 'May 10', time: '5:00 AM', type: 'twitter', color: 'bg-blue-500'},
    {title: 'Blog Post', date: 'May 13', time: '11:00 AM', type: 'blog', color: 'bg-green-500'},
    {title: 'YouTube Upload', date: 'May 18', time: '10:00 AM', type: 'youtube', color: 'bg-red-500'}
  ];

  const monthStats = [
    {platform: 'YouTube', count: '4 videos', color: 'text-red-400'},
    {platform: 'Instagram', count: '12 posts', color: 'text-pink-400'},
    {platform: 'Twitter', count: '8 tweets', color: 'text-blue-400'}
  ];

  const eventTypes = [
    'YouTube Upload',
    'Instagram Story',
    'Instagram Post',
    'Tweet Thread',
    'Blog Post',
    'Podcast Episode',
    'TikTok Video',
    'LinkedIn Post'
  ];

  useEffect(() => {
    setEvents(sampleEvents);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    } 
    return days;
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      'YouTube Upload': 'bg-red-500',
      'Instagram Story': 'bg-pink-500',
      'Instagram Post': 'bg-pink-600',
      'Tweet Thread': 'bg-blue-500',
      'Blog Post': 'bg-green-500',
      'Podcast Episode': 'bg-purple-500',
      'TikTok Video': 'bg-gray-800',
      'LinkedIn Post': 'bg-blue-700'
    };
    return colors[type] || 'bg-gray-500';
  };

  const addEvent = () => {
    if (!selectedDate || !newEvent.title) return;
    
    const dateKey = formatDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      selectedDate
    );
    
    const eventToAdd = {
      id: Date.now(),
      title: newEvent.title,
      type: newEvent.type.toLowerCase().replace(' ', ''),
      time: newEvent.time,
      color: getEventTypeColor(newEvent.type),
      description: newEvent.description
    };
    
    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), eventToAdd]
    }));
    setNewEvent({ title: '', type: 'YouTube Upload', time: '10:00', description: '' });
    setShowAddEventModal(false);
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    if (!day) return;
    setSelectedDate(day);
    setShowAddEventModal(true);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Background>
      <div className="pt-20 pb-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Content Calendar</h1>
            <p className="text-xl text-gray-300">
              Plan and schedule your content across platforms
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-3">
              <div className="bg-[#1e293b] rounded-xl p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-semibold text-white">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-[#0f172a] rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      onClick={() => setShowAddEventModal(true)}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">Add Event</span>
                    </button>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-[#0f172a] rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Day Headers */}
                  {dayNames.map((day) => (
                    <div key={day} className="p-3 text-center">
                      <span className="text-sm font-medium text-gray-400">{day}</span>
                    </div>
                  ))}
                  {/* Calendar Days */}
                  {getDaysInMonth(currentDate).map((day, index) => {
                    if (!day) {
                      return <div key={index} className="p-2"></div>;
                    }
                    
                    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const dayEvents = events[dateKey] || [];
                    const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
                    
                    return (
                      <div
                        key={day}
                        onClick={() => handleDateClick(day)}
                        className={`p-2 min-h-[80px] border border-gray-700 rounded-lg cursor-pointer hover:bg-[#0f172a] transition-colors ${
                          isToday ? 'bg-blue-600/20 border-blue-500/50' : 'bg-[#0f172a]'
                        }`}
                      >
                        <div className="text-sm font-medium text-white mb-1">{day}</div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs px-2 py-1 rounded text-white truncate ${event.color}`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-400 px-2">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <div className="bg-[#1e293b] rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-semibold text-white">Upcoming</h3>
                </div>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-[#0f172a] rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{event.title}</div>
                        <div className="text-xs text-gray-400">{event.date} • {event.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* This Month Stats */}
              <div className="bg-[#1e293b] rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-semibold text-white">This Month</h3>
                </div>
                <div className="space-y-3">
                  {monthStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${stat.color.replace('text-', 'bg-')}`}></div>
                        <span className="text-gray-300 text-sm">{stat.platform}</span>
                      </div>
                      <span className={`text-sm font-medium ${stat.color}`}>{stat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#1e293b] rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-3 p-3 bg-[#0f172a] hover:bg-gray-800 rounded-lg transition-colors text-left">
                    <Plus className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">Schedule Post</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-[#0f172a] hover:bg-gray-800 rounded-lg transition-colors text-left">
                    <Edit3 className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Create Campaign</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] rounded-xl border border-gray-700 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Add Event</h3>
              <button
                onClick={() => setShowAddEventModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description (Optional)</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Add event description..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddEventModal(false)}
                className="flex-1 px-4 py-2 bg-[#0f172a] hover:bg-gray-800 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addEvent}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </Background>
  );
};

export default Calendar;