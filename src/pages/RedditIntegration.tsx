import React, { useState, useEffect } from 'react';
import { MessageCircle, TrendingUp, Share2, Plus, ExternalLink, Crown } from 'lucide-react';
import { redditService } from '../utils/reddit';
import RedditFeed from '../components/RedditFeed';
import { useSubscription } from '../contexts/SubscriptionContext';
import { Link } from 'react-router-dom';

const RedditIntegration: React.FC = () => {
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [discussionModalOpen, setDiscussionModalOpen] = useState(false);
  const [shareContent, setShareContent] = useState({
    title: '',
    content: '',
    subreddit: 'careerguidance'
  });
  const { isPremium } = useSubscription();

  useEffect(() => {
    loadTrendingTopics();
  }, []);

  const loadTrendingTopics = async () => {
    try {
      const topics = await redditService.getTrendingTopics();
      setTrendingTopics(topics);
    } catch (error) {
      console.error('Failed to load trending topics:', error);
    }
  };

  const handleShareQuizResults = async () => {
    if (!isPremium) return;
    
    try {
      const result = await redditService.shareQuizResults({
        careerPath: 'Data Science & Analytics',
        score: 4,
        description: 'Perfect match for analytical thinking and data-driven problem solving!'
      });
      
      if (result.success) {
        alert('🎉 Quiz results shared successfully to Reddit!');
        setShareModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to share quiz results:', error);
    }
  };

  const handleCreateDiscussion = async () => {
    if (!isPremium) return;
    
    try {
      const result = await redditService.createDiscussion(shareContent);
      
      if (result.success) {
        alert('🎉 Discussion created successfully on Reddit!');
        setDiscussionModalOpen(false);
        setShareContent({ title: '', content: '', subreddit: 'careerguidance' });
      }
    } catch (error) {
      console.error('Failed to create discussion:', error);
    }
  };

  const PremiumFeature: React.FC<{ children: React.ReactNode; feature: string }> = ({ children, feature }) => {
    if (isPremium) {
      return <>{children}</>;
    }
    
    return (
      <div className="relative">
        {children}
        <div className="absolute inset-0 bg-gray-100/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <Link
            to="/pricing"
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
          >
            <Crown className="w-4 h-4" />
            <span>Upgrade for {feature}</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-red-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Reddit Career Community
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with the career community on Reddit. Share your achievements, get advice, and discover trending career topics.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="xl:col-span-3 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Share2 className="w-5 h-5 text-orange-600" />
                <span>Share & Engage</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PremiumFeature feature="Quiz Sharing">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    disabled={!isPremium}
                    className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border border-blue-200 transition-all group"
                  >
                    <TrendingUp className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Share Quiz Results</h3>
                    <p className="text-sm text-gray-600">Share your career quiz results with the community</p>
                  </button>
                </PremiumFeature>

                <PremiumFeature feature="Discussions">
                  <button
                    onClick={() => setDiscussionModalOpen(true)}
                    disabled={!isPremium}
                    className="p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl border border-green-200 transition-all group"
                  >
                    <Plus className="w-6 h-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Start Discussion</h3>
                    <p className="text-sm text-gray-600">Create a new career discussion topic</p>
                  </button>
                </PremiumFeature>

                <a
                  href="https://reddit.com/r/careerguidance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl border border-orange-200 transition-all group"
                >
                  <ExternalLink className="w-6 h-6 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-1">Visit Reddit</h3>
                  <p className="text-sm text-gray-600">Browse the full career guidance subreddit</p>
                </a>
              </div>
            </div>

            {/* Reddit Feed */}
            <RedditFeed subreddit="careerguidance" maxPosts={10} />
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 border-b border-orange-100">
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span>Trending Topics</span>
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 hover:bg-orange-50 rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                        {topic}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-semibold text-gray-900">2.1M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Online Now</span>
                  <span className="font-semibold text-green-600">15.2K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-semibold text-blue-600">342</span>
                </div>
              </div>
            </div>

            {/* Reddit Rules */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Community Guidelines</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Be respectful and professional</li>
                <li>• Share genuine career experiences</li>
                <li>• No spam or self-promotion</li>
                <li>• Use descriptive post titles</li>
                <li>• Search before posting duplicates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Share Quiz Results Modal */}
        {shareModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-2xl">
                <h3 className="text-xl font-bold text-white">Share Quiz Results</h3>
                <p className="text-blue-100">Share your career quiz results with Reddit</p>
              </div>
              <div className="p-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900">Your Result: Data Science & Analytics</h4>
                  <p className="text-blue-800 text-sm">Score: 4/5 - Perfect match for analytical thinking!</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleShareQuizResults}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Share to Reddit
                  </button>
                  <button
                    onClick={() => setShareModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Discussion Modal */}
        {discussionModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-t-2xl">
                <h3 className="text-xl font-bold text-white">Start Discussion</h3>
                <p className="text-green-100">Create a new career discussion topic</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={shareContent.title}
                    onChange={(e) => setShareContent({ ...shareContent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="What's your discussion topic?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={shareContent.content}
                    onChange={(e) => setShareContent({ ...shareContent, content: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Share your thoughts, questions, or experiences..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subreddit</label>
                  <select
                    value={shareContent.subreddit}
                    onChange={(e) => setShareContent({ ...shareContent, subreddit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="careerguidance">r/careerguidance</option>
                    <option value="careeradvice">r/careeradvice</option>
                    <option value="jobs">r/jobs</option>
                    <option value="cscareerquestions">r/cscareerquestions</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleCreateDiscussion}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Create Discussion
                  </button>
                  <button
                    onClick={() => setDiscussionModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedditIntegration;