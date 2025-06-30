import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, ArrowDown, ExternalLink, Clock, User, Share2 } from 'lucide-react';
import { redditService, RedditPost, RedditComment } from '../utils/reddit';

interface RedditFeedProps {
  subreddit?: string;
  maxPosts?: number;
}

const RedditFeed: React.FC<RedditFeedProps> = ({ subreddit = 'careerguidance', maxPosts = 5 }) => {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<RedditPost | null>(null);
  const [comments, setComments] = useState<RedditComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [subreddit]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await redditService.getCareerPosts(subreddit);
      setPosts(fetchedPosts.slice(0, maxPosts));
    } catch (error) {
      console.error('Failed to load Reddit posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (post: RedditPost) => {
    try {
      setCommentsLoading(true);
      setSelectedPost(post);
      const fetchedComments = await redditService.getPostComments(post.id);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const handleShare = async (post: RedditPost) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.selftext.substring(0, 100) + '...',
          url: post.url,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(post.url);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 border-b border-orange-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">r/</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">r/{subreddit}</h3>
            <p className="text-sm text-gray-600">Career discussions from Reddit</p>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="divide-y divide-gray-100">
        {posts.map((post) => (
          <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors">
            {/* Post Header */}
            <div className="flex items-center space-x-2 mb-2 text-sm text-gray-500">
              <User className="w-4 h-4" />
              <span className="font-medium">u/{post.author}</span>
              <span>•</span>
              <Clock className="w-4 h-4" />
              <span>{formatTimeAgo(post.created_utc)}</span>
            </div>

            {/* Post Title */}
            <h4 className="font-semibold text-gray-900 mb-2 hover:text-orange-600 cursor-pointer transition-colors">
              {post.title}
            </h4>

            {/* Post Content */}
            {post.selftext && (
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                {post.selftext.length > 150 
                  ? post.selftext.substring(0, 150) + '...' 
                  : post.selftext
                }
              </p>
            )}

            {/* Post Actions */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-gray-500">
                <ArrowUp className="w-4 h-4" />
                <span className="font-medium">{post.score}</span>
                <ArrowDown className="w-4 h-4" />
              </div>
              
              <button
                onClick={() => loadComments(post)}
                className="flex items-center space-x-1 text-gray-500 hover:text-orange-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{post.num_comments} comments</span>
              </button>

              <button
                onClick={() => handleShare(post)}
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>

              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Reddit</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Comments Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 border-b border-orange-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 truncate">
                  {selectedPost.title}
                </h3>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {/* Original Post */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span className="font-medium">u/{selectedPost.author}</span>
                </div>
                <p className="text-gray-700">{selectedPost.selftext}</p>
              </div>

              {/* Comments */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Comments</h4>
                {commentsLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-12 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="border-l-2 border-orange-200 pl-4">
                      <div className="flex items-center space-x-2 mb-1 text-sm text-gray-500">
                        <User className="w-3 h-3" />
                        <span className="font-medium">u/{comment.author}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(comment.created_utc)}</span>
                        <span>•</span>
                        <span>{comment.score} points</span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.body}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedditFeed;