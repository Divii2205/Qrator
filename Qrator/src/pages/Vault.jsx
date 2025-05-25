import React, { useState } from "react";
import { Search, Filter, Lightbulb, FileText, Image, MoreVertical, Download, Trash2, User, Sun, Moon, Edit, Eye, Star, Calendar, Archive } from "lucide-react";
import Background from "../components/Background";

const Vault = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ideas");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    starred: false
  });

  const [savedContent, setSavedContent] = useState({
    ideas: [
      { id: 1, title: "10 JavaScript Tips for Beginners", date: "2025-05-20", category: "Programming", status: "draft", views: 245, starred: false },
      { id: 2, title: "React Hooks Complete Guide", date: "2025-05-19", category: "React", status: "published", views: 1203, starred: true },
      { id: 3, title: "CSS Grid vs Flexbox Comparison", date: "2025-05-18", category: "CSS", status: "draft", views: 89, starred: false },
      { id: 4, title: "Node.js Performance Optimization", date: "2025-05-17", category: "Backend", status: "published", views: 567, starred: false },
      { id: 5, title: "Modern Web Development Trends", date: "2025-05-16", category: "Web Dev", status: "draft", views: 34, starred: true },
    ],
    scripts: [
      { id: 1, title: "React Tutorial Introduction", duration: "5 min", date: "2025-05-20", status: "ready", wordCount: 780, starred: false },
      { id: 2, title: "JavaScript Array Methods", duration: "8 min", date: "2025-05-19", status: "draft", wordCount: 1240, starred: true },
      { id: 3, title: "CSS Animation Basics", duration: "6 min", date: "2025-05-18", status: "ready", wordCount: 950, starred: false },
      { id: 4, title: "API Integration Tutorial", duration: "12 min", date: "2025-05-17", status: "draft", wordCount: 1890, starred: false },
    ],
    thumbnails: [
      { id: 1, title: "React Hooks Tutorial", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=169&fit=crop", date: "2025-05-20", downloads: 45, starred: true },
      { id: 2, title: "JavaScript Tips", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=169&fit=crop", date: "2025-05-19", downloads: 128, starred: false },
      { id: 3, title: "CSS Grid Guide", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=169&fit=crop", date: "2025-05-18", downloads: 67, starred: false },
      { id: 4, title: "Node.js Tutorial", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=169&fit=crop", date: "2025-05-17", downloads: 89, starred: true },
    ],
  });

  const handleDelete = (type, id) => {
    setItemToDelete({ type, id });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setSavedContent(prev => ({
        ...prev,
        [itemToDelete.type]: prev[itemToDelete.type].filter(item => item.id !== itemToDelete.id)
      }));
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  const handleShare = async (title) => {
    try {
      await navigator.clipboard.writeText(`Check out "${title}" on Qrator!`);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDuplicate = (type, item) => {
    const newItem = {
      ...item,
      id: Math.max(...savedContent[type].map(i => i.id)) + 1,
      title: `${item.title} (Copy)`,
    };
    setSavedContent(prev => ({
      ...prev,
      [type]: [...prev[type], newItem]
    }));
  };

  const handleDownload = (type, item) => {
    // Create a dummy content based on the item type
    let content = '';
    if (type === 'ideas') {
      content = `Title: ${item.title}\nCategory: ${item.category}\nStatus: ${item.status}\nViews: ${item.views}\nDate: ${item.date}`;
    } else if (type === 'scripts') {
      content = `Title: ${item.title}\nDuration: ${item.duration}\nWord Count: ${item.wordCount}\nStatus: ${item.status}\nDate: ${item.date}`;
    } else {
      // For thumbnails, we'll download the image
      window.open(item.image, '_blank');
      return;
    }

    // Create and trigger download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.toLowerCase().replace(/ /g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleEdit = (type, item) => {
    // Navigate to the appropriate edit page based on type
    window.location.href = `/${type.slice(0, -1)}?edit=${item.id}`;
  };

  const handleView = (type, item) => {
    // Navigate to the appropriate view page based on type
    window.location.href = `/${type.slice(0, -1)}?view=${item.id}`;
  };

  const toggleStar = (type, id) => {
    setSavedContent(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, starred: !item.starred } : item
      )
    }));
  };

  const filteredContent = (type) => {
    let filtered = savedContent[type];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    // Apply category filter (for ideas)
    if (type === 'ideas' && filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    // Apply starred filter
    if (filters.starred) {
      filtered = filtered.filter(item => item.starred);
    }

    return filtered;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
      case 'ready':
        return 'bg-teal-500/20 text-teal-400';
      case 'draft':
        return 'bg-orange-500/20 text-orange-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getContentColors = (type) => {
    // Standardize all colors to blue theme
    return {
      icon: 'bg-blue-500/20 text-blue-400',
      button: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
    };
  };

  const buttonStyle = "p-2 text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-lg transition-colors";

  const TabButton = ({ value, icon: Icon, label, count }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
        activeTab === value
          ? 'bg-blue-500/20 text-blue-400'
          : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label} ({count})
    </button>
  );

  // Get unique categories from ideas
  const categories = ['all', ...new Set(savedContent.ideas.map(idea => idea.category))];
  const statuses = ['all', 'published', 'ready', 'draft'];

  return (
    <Background>
      <div className="w-full max-w-7xl mx-auto px-6 pt-28 pb-8"> {/* Added pt-28 for navbar spacing */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">
              <Archive className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Content Vault</h1>
              <p className="text-slate-400 text-lg">Your saved content library</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8 relative z-50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search your content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="relative z-50">
              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-6 py-3 border border-slate-600/30 text-slate-300 hover:text-white hover:bg-slate-700/30 rounded-xl transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filter
              </button>
              {showFilter && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Status</label>
                      <select 
                        value={filters.status}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg px-3 py-2 text-white"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                    {activeTab === 'ideas' && (
                      <div>
                        <label className="text-sm text-slate-400 block mb-2">Category</label>
                        <select 
                          value={filters.category}
                          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg px-3 py-2 text-white"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="starred"
                        checked={filters.starred}
                        onChange={(e) => setFilters(prev => ({ ...prev, starred: e.target.checked }))}
                        className="rounded border-slate-600"
                      />
                      <label htmlFor="starred" className="text-sm text-slate-400 ml-2">Show starred only</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8 relative z-0">
          <div className="flex flex-wrap gap-4 bg-slate-800/30 p-2 rounded-2xl">
            <TabButton
              value="ideas"
              icon={Lightbulb}
              label="Ideas"
              count={savedContent.ideas.length}
            />
            <TabButton
              value="scripts"
              icon={FileText}
              label="Scripts"
              count={savedContent.scripts.length}
            />
            <TabButton
              value="thumbnails"
              icon={Image}
              label="Thumbnails"
              count={savedContent.thumbnails.length}
            />
          </div>

          {activeTab === "ideas" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent("ideas").map((idea) => (
                <div key={idea.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${getContentColors('ideas').icon} flex items-center justify-center`}>
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(idea.status)}`}>
                        {idea.status}
                      </span>
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const menu = e.currentTarget.nextElementSibling;
                            menu.classList.toggle('hidden');
                          }} 
                          className={buttonStyle}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        <div className="hidden absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50">
                          <button
                            onClick={() => handleShare(idea.title)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 first:rounded-t-xl"
                          >
                            Share
                          </button>
                          <button
                            onClick={() => handleDuplicate("ideas", idea)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50"
                          >
                            Duplicate
                          </button>
                          <button
                            onClick={() => handleDelete("ideas", idea.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 last:rounded-b-xl"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold mb-3 text-lg leading-tight">{idea.title}</h3>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span className="bg-slate-700/50 px-2 py-1 rounded-lg">{idea.category}</span>
                    <span>{idea.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                      <Eye className="h-4 w-4" />
                      {idea.views} views
                    </div>
                    <button 
                      onClick={() => toggleStar("ideas", idea.id)}
                      className={buttonStyle}
                    >
                      <Star className={`h-4 w-4 ${idea.starred ? "text-yellow-400" : "text-slate-400"}`} />
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit("ideas", idea)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors ${getContentColors('ideas').button}`}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDownload("ideas", idea)} 
                      className={buttonStyle}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "scripts" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent("scripts").map((script) => (
                <div key={script.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${getContentColors('scripts').icon} flex items-center justify-center`}>
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(script.status)}`}>
                        {script.status}
                      </span>
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const menu = e.currentTarget.nextElementSibling;
                            menu.classList.toggle('hidden');
                          }} 
                          className={buttonStyle}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        <div className="hidden absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50">
                          <button
                            onClick={() => handleShare(script.title)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 first:rounded-t-xl"
                          >
                            Share
                          </button>
                          <button
                            onClick={() => handleDuplicate("scripts", script)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50"
                          >
                            Duplicate
                          </button>
                          <button
                            onClick={() => handleDelete("scripts", script.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 last:rounded-b-xl"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold mb-3 text-lg leading-tight">{script.title}</h3>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span className="bg-slate-700/50 px-2 py-1 rounded-lg">{script.duration}</span>
                    <span>{script.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-slate-400 text-sm">
                      {script.wordCount.toLocaleString()} words
                    </div>
                    <button 
                      onClick={() => toggleStar("scripts", script.id)}
                      className={buttonStyle}
                    >
                      <Star className={`h-4 w-4 ${script.starred ? "text-yellow-400" : "text-slate-400"}`} />
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit("scripts", script)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors ${getContentColors('scripts').button}`}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDownload("scripts", script)}
                      className={buttonStyle}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "thumbnails" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContent("thumbnails").map((thumbnail) => (
                <div key={thumbnail.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden group">
                  <div className="aspect-video bg-slate-800/30 overflow-hidden relative">
                    <img
                      src={thumbnail.image}
                      alt={thumbnail.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3">
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const menu = e.currentTarget.nextElementSibling;
                            menu.classList.toggle('hidden');
                          }} 
                          className="p-2 bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 rounded-lg transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        <div className="hidden absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50">
                          <button
                            onClick={() => handleShare(thumbnail.title)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 first:rounded-t-xl"
                          >
                            Share
                          </button>
                          <button
                            onClick={() => handleDuplicate("thumbnails", thumbnail)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50"
                          >
                            Duplicate
                          </button>
                          <button
                            onClick={() => handleDelete("thumbnails", thumbnail.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 last:rounded-b-xl"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-white font-bold mb-2 leading-tight">{thumbnail.title}</h3>
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                      <span>{thumbnail.date}</span>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {thumbnail.downloads}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleView("thumbnails", thumbnail)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors ${getContentColors('thumbnails').button}`}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                      <button 
                        onClick={() => handleDownload("thumbnails", thumbnail)}
                        className={buttonStyle}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => toggleStar("thumbnails", thumbnail.id)}
                        className={buttonStyle}
                      >
                        <Star className={`h-4 w-4 ${thumbnail.starred ? "text-yellow-400" : "text-slate-400"}`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-2">Confirm Delete</h3>
            <p className="text-slate-400 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 px-4 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setItemToDelete(null);
                }}
                className="flex-1 py-2 px-4 bg-slate-700/50 text-slate-300 hover:bg-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Background>
  );
};

export default Vault;