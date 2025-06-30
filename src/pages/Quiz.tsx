import React, { useState } from 'react';
import { CheckCircle, X, Share2, RotateCcw, Trophy, ArrowRight, MessageCircle } from 'lucide-react';
import { redditService } from '../utils/reddit';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What would you rather do on a weekend?",
      options: [
        "Analyze data trends from your favorite apps",
        "Build a website for a local business",
        "Design a marketing campaign for a product",
        "Organize a community event"
      ],
      correct: 0,
      explanation: "Data analysis indicates a strong analytical mindset - perfect for data science careers!"
    },
    {
      id: 2,
      question: "Your ideal work environment is:",
      options: [
        "A quiet space with multiple monitors and data visualizations",
        "A collaborative open office with whiteboards everywhere",
        "A creative studio with design tools and mood boards",
        "A dynamic space where you're always meeting new people"
      ],
      correct: 0,
      explanation: "Preference for analytical environments suggests careers in data science, research, or analytics."
    },
    {
      id: 3,
      question: "When solving problems, you prefer to:",
      options: [
        "Dive deep into the data to find patterns",
        "Brainstorm creative solutions with others",
        "Create visual representations of the problem",
        "Talk through options with stakeholders"
      ],
      correct: 0,
      explanation: "Data-driven problem solving is a key trait for successful data scientists and analysts."
    },
    {
      id: 4,
      question: "Your friends would describe you as:",
      options: [
        "The person who always has interesting statistics",
        "The one who fixes everyone's tech problems",
        "The creative one with great ideas",
        "The organizer who brings people together"
      ],
      correct: 0,
      explanation: "Being known for statistics and data insights suggests a natural fit for data-focused careers."
    },
    {
      id: 5,
      question: "Which superpower would you choose?",
      options: [
        "Ability to see patterns in everything",
        "Power to bring any idea to life instantly",
        "Talent to make anything beautiful",
        "Skill to convince anyone of anything"
      ],
      correct: 0,
      explanation: "Pattern recognition is fundamental to data science, machine learning, and analytical roles."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (selectedAnswer === questions[currentQuestion].correct) {
        setScore(score + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const getCareerRecommendation = () => {
    const percentage = (score / questions.length) * 100;
    
    if (percentage >= 80) {
      return {
        title: "Data Science & Analytics",
        description: "You have a strong analytical mind and love working with data! Consider careers in data science, business intelligence, or research.",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        gradient: "from-blue-500 to-blue-600"
      };
    } else if (percentage >= 60) {
      return {
        title: "Tech & Development",
        description: "You enjoy problem-solving and building things! Explore careers in software development, product management, or systems analysis.",
        color: "text-green-600",
        bgColor: "bg-green-50",
        gradient: "from-green-500 to-green-600"
      };
    } else if (percentage >= 40) {
      return {
        title: "Creative & Design",
        description: "You have a creative flair and visual thinking skills! Consider careers in UX/UI design, marketing, or content creation.",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        gradient: "from-purple-500 to-purple-600"
      };
    } else {
      return {
        title: "People & Communication",
        description: "You're a natural communicator and team player! Explore careers in human resources, sales, or project management.",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        gradient: "from-orange-500 to-orange-600"
      };
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const shareToReddit = async () => {
    const recommendation = getCareerRecommendation();
    setIsSharing(true);
    
    try {
      const result = await redditService.shareQuizResults({
        careerPath: recommendation.title,
        score: score,
        description: recommendation.description
      });
      
      if (result.success) {
        alert('🎉 Results shared to Reddit successfully! Check r/careerguidance to see your post.');
      }
    } catch (error) {
      console.error('Failed to share to Reddit:', error);
      alert('Failed to share to Reddit. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  const shareResults = () => {
    const recommendation = getCareerRecommendation();
    const shareText = `I just discovered my ideal career path with CareerPath AI! 🚀 My result: ${recommendation.title}. Take the quiz and discover yours!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'CareerPath AI Quiz Results',
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('Results copied to clipboard! Share on your social media.');
    }
  };

  if (quizCompleted) {
    const recommendation = getCareerRecommendation();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
            <div className={`bg-gradient-to-r ${recommendation.gradient} p-8 text-center relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <Trophy className="w-16 h-16 text-white mx-auto mb-4 animate-bounce-subtle" />
              <h1 className="text-3xl font-bold text-white mb-2">Quiz Complete! 🎉</h1>
              <p className="text-white/90">You scored {score} out of {questions.length}</p>
            </div>

            <div className="p-8">
              <div className={`${recommendation.bgColor} rounded-2xl p-6 mb-6 border-2 border-current ${recommendation.color}`}>
                <h2 className={`text-2xl font-bold ${recommendation.color} mb-3`}>
                  Your Recommended Career Path:
                </h2>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {recommendation.title}
                </h3>
                <p className="text-secondary-700 leading-relaxed">
                  {recommendation.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={shareResults}
                  className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share Results</span>
                </button>
                
                <button
                  onClick={shareToReddit}
                  disabled={isSharing}
                  className="flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {isSharing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sharing...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      <span>Share to Reddit</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={restartQuiz}
                  className="flex items-center justify-center space-x-2 bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-blue-900 mb-2">Ready to dive deeper?</h4>
                  <Link 
                    to="/roadmap"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-block"
                  >
                    Create Your Roadmap
                  </Link>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-orange-900 mb-2">Join the discussion</h4>
                  <Link 
                    to="/reddit"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-block"
                  >
                    Reddit Community
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 text-center border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">🎯 Pro Tip</h4>
                <p className="text-purple-800 text-sm">
                  Share your results on Reddit to get personalized advice from the career community!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">Career Discovery Quiz</h1>
          <p className="text-secondary-600">
            Answer these fun questions to discover your ideal career path! 
            Share your results on Reddit and challenge your friends.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-secondary-600">Progress</span>
            <span className="text-sm text-secondary-600">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-primary-500 bg-primary-50 text-primary-900'
                      : 'border-secondary-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswer === index
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-secondary-300'
                    }`}>
                      {selectedAnswer === index && (
                        <CheckCircle className="w-full h-full text-white" />
                      )}
                    </div>
                    <span className="text-secondary-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <span>{currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">💡 Did you know?</h3>
          <p className="text-secondary-700">
            The average person changes careers 5-7 times during their working life. 
            This quiz helps identify your natural inclinations and interests! Share your results on Reddit to get community feedback.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;