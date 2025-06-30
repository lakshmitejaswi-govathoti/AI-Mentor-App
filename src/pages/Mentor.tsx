import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Video, Volume2, Bot, User, Sparkles, MicOff, VideoOff, Crown } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'voice' | 'video';
}

const Mentor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Career Mentor. I'm here to help you navigate your professional journey with personalized guidance. What would you like to discuss today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isPremium } = useSubscription();

  const quickQuestions = [
    "What skills do I need for data science?",
    "How do I transition to a tech career?",
    "What certifications should I pursue?",
    "How to negotiate salary effectively?",
    "Best practices for remote work?",
    "How to build a strong LinkedIn profile?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response with typing indicator
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const generateAIResponse = (question: string) => {
    const responses = {
      'data science': "Excellent question! For data science success, focus on these key areas: 1) **Python Programming** - Master libraries like Pandas, NumPy, and Scikit-learn 2) **Statistics & Mathematics** - Understanding distributions, hypothesis testing, and linear algebra 3) **SQL** - Essential for database querying 4) **Data Visualization** - Tools like Matplotlib, Seaborn, or Tableau 5) **Machine Learning** - Start with supervised learning algorithms. I recommend beginning with Python basics and gradually building your statistical foundation. Would you like a personalized roadmap?",
      'tech career': "Great choice! Tech career transitions are very achievable with the right strategy: 1) **Identify Your Target Role** - Developer, data analyst, product manager, etc. 2) **Skill Development** - Focus on relevant technical skills through courses and projects 3) **Build a Portfolio** - Showcase your work on GitHub or personal website 4) **Network Actively** - Connect with professionals in your target field 5) **Consider Bootcamps** - Intensive programs can accelerate learning 6) **Apply Strategically** - Target entry-level positions and internships. What specific tech role interests you most?",
      'certifications': "Smart thinking! The best certifications depend on your career goals: **Cloud Computing**: AWS Solutions Architect, Azure Fundamentals, Google Cloud Professional **Data Science**: Google Data Analytics, IBM Data Science Professional **Cybersecurity**: CompTIA Security+, CISSP **Project Management**: PMP, Agile/Scrum Master **Development**: Microsoft Azure Developer, Oracle Java. I recommend starting with foundational certifications in your field of interest. What area are you most passionate about?",
      'salary negotiation': "Salary negotiation is crucial for career growth! Here's my proven strategy: 1) **Research Thoroughly** - Use Glassdoor, PayScale, and industry reports for market rates 2) **Document Your Value** - Prepare a list of achievements and quantifiable contributions 3) **Practice Your Pitch** - Rehearse with friends or mentors 4) **Don't Accept Immediately** - Ask for time to consider the offer 5) **Consider Total Package** - Benefits, equity, PTO, and growth opportunities 6) **Be Prepared to Walk Away** - Know your worth and minimum acceptable offer. Remember, negotiation shows confidence and business acumen!",
      'remote work': "Remote work mastery is essential in today's world! Key strategies for success: 1) **Dedicated Workspace** - Create a professional environment at home 2) **Clear Boundaries** - Set specific work hours and communicate them 3) **Over-communicate** - Use Slack, email, and video calls proactively 4) **Master Digital Tools** - Zoom, Asana, Notion, and collaboration platforms 5) **Take Regular Breaks** - Use the Pomodoro technique 6) **Stay Connected** - Schedule virtual coffee chats with colleagues 7) **Invest in Equipment** - Good monitor, chair, and lighting make a huge difference. What specific remote work challenges are you facing?",
      'linkedin': "LinkedIn is your digital career headquarters! Here's how to optimize it: 1) **Professional Headshot** - Invest in a quality photo 2) **Compelling Headline** - Go beyond just your job title 3) **Story-driven Summary** - Share your career journey and aspirations 4) **Detailed Experience** - Include achievements with metrics 5) **Skills & Endorsements** - Add relevant skills and seek endorsements 6) **Regular Content** - Share industry insights and engage with posts 7) **Strategic Networking** - Connect with purpose and personalized messages 8) **Recommendations** - Request and give meaningful recommendations. Would you like specific tips for any of these areas?"
    };

    const lowerQuestion = question.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }

    return "That's a thoughtful question! Career development is a journey that requires both technical skills and soft skills. Technical skills get you in the door, while soft skills like communication, leadership, and problem-solving help you excel and advance. I'd recommend focusing on building a strong foundation in your area of interest while also developing your interpersonal abilities. What specific aspect of your career would you like to explore further?";
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const toggleVoiceRecording = () => {
    if (!isPremium) {
      return;
    }
    setIsRecording(!isRecording);
    if (!isRecording) {
      alert('🎤 Voice feature powered by ElevenLabs - Starting voice conversation...');
    }
  };

  const toggleVideoMode = () => {
    if (!isPremium) {
      return;
    }
    setIsVideoMode(!isVideoMode);
    alert('📹 Video mentor feature powered by Tavus - Launching face-to-face session...');
  };

  const PremiumFeature: React.FC<{ children: React.ReactNode; feature: string }> = ({ children, feature }) => {
    if (isPremium) {
      return <>{children}</>;
    }
    
    return (
      <div className="relative">
        {children}
        <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <Link
            to="/pricing"
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
          >
            <Crown className="w-4 h-4" />
            <span>Upgrade for {feature}</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              AI Career Mentor
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get personalized career guidance from your AI mentor. Ask questions, seek advice, and accelerate your professional growth with intelligent insights.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="xl:col-span-1 order-2 xl:order-1">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 border-b border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900">Quick Questions</h3>
              </div>
              <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-200"
                  >
                    {question}
                  </button>
                ))}
              </div>

              {/* Interaction Modes */}
              <div className="p-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Interaction Modes</h4>
                <div className="space-y-2">
                  <PremiumFeature feature="Voice Chat">
                    <button
                      onClick={toggleVoiceRecording}
                      disabled={!isPremium}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isRecording 
                          ? 'bg-red-100 text-red-700 border border-red-200' 
                          : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                      } ${!isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      <span className="text-sm font-medium">
                        {isRecording ? 'Stop Recording' : 'Voice Chat'}
                      </span>
                    </button>
                  </PremiumFeature>
                  
                  <PremiumFeature feature="Video Mentor">
                    <button
                      onClick={toggleVideoMode}
                      disabled={!isPremium}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isVideoMode 
                          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                          : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                      } ${!isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isVideoMode ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                      <span className="text-sm font-medium">Video Mentor</span>
                    </button>
                  </PremiumFeature>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="xl:col-span-3 order-1 xl:order-2">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 border-b border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Career Mentor</h3>
                    <p className="text-sm text-gray-600">Online • Ready to help</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 lg:h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-blue-50/20">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 animate-slide-up ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                        : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                    }`}>
                      {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                        : 'bg-white text-gray-900 border border-gray-100 rounded-bl-md'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-start space-x-3 animate-slide-up">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white text-gray-900 border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-100 p-4 bg-white">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask your AI mentor anything..."
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                    <button
                      onClick={() => alert('🎵 Voice input powered by ElevenLabs - Coming soon!')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none disabled:shadow-none"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;