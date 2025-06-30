import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, Award, MessageCircle, Calendar, ArrowRight, Sparkles, Crown, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { isPremium } = useSubscription();

  const stats = [
    { 
      label: 'Roadmap Progress', 
      value: '75%', 
      icon: <TrendingUp className="w-6 h-6" />, 
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    { 
      label: 'Skills Developed', 
      value: '8', 
      icon: <Target className="w-6 h-6" />, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-50'
    },
    { 
      label: 'Certifications', 
      value: '3', 
      icon: <Award className="w-6 h-6" />, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-50'
    },
    { 
      label: 'Mentor Sessions', 
      value: '12', 
      icon: <MessageCircle className="w-6 h-6" />, 
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-50'
    },
  ];

  const recentActivities = [
    { title: 'Completed Python Fundamentals', time: '2 hours ago', type: 'skill', color: 'bg-blue-500' },
    { title: 'Data Science Roadmap Updated', time: '1 day ago', type: 'roadmap', color: 'bg-green-500' },
    { title: 'Mentor Session: Career Transition', time: '3 days ago', type: 'mentor', color: 'bg-orange-500' },
    { title: 'Earned AWS Cloud Practitioner Badge', time: '1 week ago', type: 'certification', color: 'bg-purple-500' },
  ];

  const upcomingTasks = [
    { title: 'Complete Machine Learning Course', due: 'Due in 3 days', priority: 'high' },
    { title: 'Schedule Mentor Session', due: 'Due in 5 days', priority: 'medium' },
    { title: 'Take Career Assessment Quiz', due: 'Due in 1 week', priority: 'low' },
  ];

  const quickActions = [
    {
      title: 'Update Roadmap',
      description: 'Review and adjust your career path',
      icon: <TrendingUp className="w-6 h-6" />,
      link: '/roadmap',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Chat with AI',
      description: 'Get instant career guidance',
      icon: <MessageCircle className="w-6 h-6" />,
      link: '/mentor',
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100'
    },
    {
      title: 'Take Quiz',
      description: 'Discover new opportunities',
      icon: <Calendar className="w-6 h-6" />,
      link: '/quiz',
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100'
    },
    {
      title: 'View Badges',
      description: 'Check your achievements',
      icon: <Award className="w-6 h-6" />,
      link: '/certifications',
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Welcome back, {user?.name || 'Professional'}!
                </h1>
                <div className="animate-bounce-subtle">👋</div>
              </div>
              <p className="text-gray-600 text-lg">
                Here's your career progress overview and what's coming up next.
              </p>
            </div>
            {!isPremium && (
              <Link
                to="/pricing"
                className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Crown className="w-5 h-5" />
                <span>Upgrade to Premium</span>
              </Link>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl p-6 shadow-sm border border-blue-100/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>
                <span className={`text-3xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
              </div>
              <h3 className="text-gray-700 font-medium">{stat.label}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Recent Activities */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-6 border-b border-blue-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <span>Recent Activities</span>
                  </h2>
                  <Link 
                    to="/profile" 
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 group"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group cursor-pointer"
                  >
                    <div className={`w-3 h-3 rounded-full ${activity.color} group-hover:scale-125 transition-transform duration-200`}></div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors duration-200">
                        {activity.title}
                      </p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-6 border-b border-orange-100">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span>Upcoming Tasks</span>
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingTasks.map((task, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gradient-to-r from-blue-50/50 to-transparent rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-all duration-200 group cursor-pointer"
                >
                  <p className="text-gray-900 font-medium mb-1 group-hover:text-blue-600 transition-colors duration-200">
                    {task.title}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">{task.due}</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {task.priority} priority
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Target className="w-5 h-5 text-gray-600" />
              <span>Quick Actions</span>
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="group p-6 bg-gradient-to-br from-white to-gray-50/50 hover:shadow-xl rounded-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.bgGradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`bg-gradient-to-br ${action.gradient} bg-clip-text text-transparent`}>
                      {action.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <span>Get started</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;