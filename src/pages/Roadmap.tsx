import React, { useState } from 'react';
import { Target, CheckCircle, Clock, Star, TrendingUp, BookOpen, Award } from 'lucide-react';

const Roadmap: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState('data-science');

  const careerPaths = {
    'data-science': {
      title: 'Data Science Career Path',
      description: 'Master the art of extracting insights from data',
      color: 'blue',
      progress: 65,
      stages: [
        {
          title: 'Foundations',
          status: 'completed',
          skills: ['Python Basics', 'Statistics', 'SQL Fundamentals'],
          timeframe: '2-3 months'
        },
        {
          title: 'Data Analysis',
          status: 'current',
          skills: ['Pandas', 'NumPy', 'Data Visualization', 'Exploratory Data Analysis'],
          timeframe: '3-4 months'
        },
        {
          title: 'Machine Learning',
          status: 'upcoming',
          skills: ['Scikit-learn', 'Supervised Learning', 'Unsupervised Learning'],
          timeframe: '4-5 months'
        },
        {
          title: 'Advanced ML & AI',
          status: 'upcoming',
          skills: ['Deep Learning', 'Neural Networks', 'TensorFlow/PyTorch'],
          timeframe: '5-6 months'
        }
      ]
    },
    'web-development': {
      title: 'Full-Stack Web Development',
      description: 'Build modern web applications from frontend to backend',
      color: 'green',
      progress: 40,
      stages: [
        {
          title: 'Frontend Basics',
          status: 'completed',
          skills: ['HTML', 'CSS', 'JavaScript Fundamentals'],
          timeframe: '1-2 months'
        },
        {
          title: 'Modern Frontend',
          status: 'current',
          skills: ['React', 'TypeScript', 'Tailwind CSS'],
          timeframe: '2-3 months'
        },
        {
          title: 'Backend Development',
          status: 'upcoming',
          skills: ['Node.js', 'Express', 'Database Design', 'APIs'],
          timeframe: '3-4 months'
        },
        {
          title: 'DevOps & Deployment',
          status: 'upcoming',
          skills: ['Docker', 'AWS', 'CI/CD', 'Monitoring'],
          timeframe: '4-5 months'
        }
      ]
    }
  };

  const currentPath = careerPaths[selectedPath as keyof typeof careerPaths];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'current': return 'text-blue-600 bg-blue-100';
      case 'upcoming': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'current': return <Clock className="w-5 h-5" />;
      case 'upcoming': return <Target className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">Your Career Roadmap</h1>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Follow your personalized learning path to achieve your career goals. Each roadmap is tailored to your current skills and target role.
          </p>
        </div>

        {/* Path Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(careerPaths).map(([key, path]) => (
              <button
                key={key}
                onClick={() => setSelectedPath(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedPath === key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-secondary-700 hover:bg-primary-50 border border-secondary-200'
                }`}
              >
                {path.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Roadmap */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
              {/* Path Header */}
              <div className="bg-gradient-to-r from-primary-600 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{currentPath.title}</h2>
                <p className="text-primary-100 mb-4">{currentPath.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${currentPath.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold">{currentPath.progress}%</span>
                </div>
              </div>

              {/* Stages */}
              <div className="p-6">
                <div className="space-y-6">
                  {currentPath.stages.map((stage, index) => (
                    <div key={index} className="relative">
                      {/* Connector Line */}
                      {index < currentPath.stages.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-secondary-200"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-full ${getStatusColor(stage.status)}`}>
                          {getStatusIcon(stage.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-secondary-900">{stage.title}</h3>
                            <span className="text-sm text-secondary-500">{stage.timeframe}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {stage.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Progress Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Completed</span>
                  <span className="font-semibold text-green-600">1 stage</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">In Progress</span>
                  <span className="font-semibold text-blue-600">1 stage</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Upcoming</span>
                  <span className="font-semibold text-secondary-600">2 stages</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-secondary-600">Est. Completion</span>
                  <span className="font-semibold text-secondary-900">6 months</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-secondary-900">Complete Pandas Course</p>
                    <p className="text-xs text-secondary-600">Focus on data manipulation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <Award className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-secondary-900">Earn Python Certification</p>
                    <p className="text-xs text-secondary-600">Validate your skills</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-secondary-900">Practice with Datasets</p>
                    <p className="text-xs text-secondary-600">Apply your knowledge</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Gaps */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Skill Gaps to Address</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700">Advanced Statistics</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-secondary-600">High Priority</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700">Data Visualization</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-secondary-600">Medium Priority</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700">Cloud Platforms</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-secondary-600">Low Priority</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;