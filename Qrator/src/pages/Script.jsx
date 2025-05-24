import React, { useState } from 'react';
import { FileText, Play, Download, Copy, Lightbulb, Settings, User, Moon, Sun } from 'lucide-react';
import Background from '../components/Background';

const Script = () => {
  const [formData, setFormData] = useState({
    title: '',
    scriptType: '',
    duration: '',
    keyPoints: ''
  });
  
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const scriptTypes = [
    'Tutorial/Educational',
    'Product Review',
    'Explainer Video',
    'Marketing/Promotional',
    'Interview',
    'Presentation',
    'Social Media Content',
    'Podcast Script'
  ];

  const durations = [
    '30 seconds',
    '1 minute',
    '2-3 minutes',
    '5 minutes',
    '10 minutes',
    '15+ minutes'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const generateScript = async () => {
    if (!formData.title || !formData.scriptType || !formData.duration) {
      alert('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      const sampleScript = `# ${formData.title}

## Introduction (0:00 - 0:15)
Welcome back to our channel! Today we're diving into ${formData.title}. This is going to be an incredibly valuable session, so make sure to stick around until the end.

## Main Content (0:15 - 0:45)
Let me break this down for you step by step:

${formData.keyPoints.split('\n').filter(point => point.trim()).map((point, index) => 
  `### Point ${index + 1}
${point.replace('- ', '')}
This is crucial because it directly impacts your understanding and success with this topic.`
).join('\n\n')}

\\
*Duration: ${formData.duration} | Type: ${formData.scriptType}*`;

      setGeneratedScript(sampleScript);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedScript);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const downloadScript = () => {
    const blob = new Blob([generatedScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.title.replace(/\s+/g, '-').toLowerCase()}-script.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Background>
      <div className="min-h-[calc(100vh-80px)] mt-20 flex flex-col lg:flex-row w-full">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-white text-4xl font-bold mb-4">Script Generator</h1>
              <p className="text-gray-300 text-lg">Transform your goals into engaging content scripts</p>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Video/Content Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Complete React Tutorial for Beginners"
                    className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Script Type *
                  </label>
                  <select
                    value={formData.scriptType}
                    onChange={(e) => handleInputChange('scriptType', e.target.value)}
                    className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select script type</option>
                    {scriptTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration *
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select duration</option>
                    {durations.map((duration) => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Key Points to Cover
                  </label>
                  <textarea
                    value={formData.keyPoints}
                    onChange={(e) => handleInputChange('keyPoints', e.target.value)}
                    placeholder="List the main points you want to cover (one per line)"
                    rows={6}
                    className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  onClick={generateScript}
                  disabled={isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      Generating Script...
                    </div>
                  ) : (
                    'Generate Script'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Output */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-slate-600/50">
          <div className="max-w-2xl mx-auto">
            <div className="sticky top-24">
              <h2 className="text-white text-2xl font-semibold mb-6">Generated Script</h2>

              {!generatedScript && !isGenerating && (
                <div className="bg-slate-700/30 rounded-xl p-8 text-center">
                  <p className="text-gray-400 text-lg">
                    Fill out the form to generate your script
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="bg-slate-700/30 rounded-xl p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-400 text-lg">Generating your script...</p>
                </div>
              )}

              {generatedScript && !isGenerating && (
                <div className="bg-[#0f172a] rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-end gap-2 mb-4">
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      {copiedToClipboard ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadScript}
                      className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                  <pre className="text-gray-200 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                    {generatedScript}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Script;