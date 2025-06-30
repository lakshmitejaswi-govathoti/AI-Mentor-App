// Reddit API integration for sharing and community features
export interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: number;
  url: string;
  selftext: string;
  subreddit: string;
}

export interface RedditComment {
  id: string;
  author: string;
  body: string;
  score: number;
  created_utc: number;
}

export class RedditService {
  private readonly CLIENT_ID = 'your_reddit_client_id';
  private readonly REDIRECT_URI = window.location.origin + '/reddit-callback';
  
  // Generate Reddit OAuth URL
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      response_type: 'code',
      state: Math.random().toString(36).substring(7),
      redirect_uri: this.REDIRECT_URI,
      duration: 'temporary',
      scope: 'submit read'
    });
    
    return `https://www.reddit.com/api/v1/authorize?${params.toString()}`;
  }

  // Mock Reddit API calls (in production, these would use actual Reddit API)
  async getCareerPosts(subreddit: string = 'careerguidance'): Promise<RedditPost[]> {
    // Simulate API call with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Just completed my data science bootcamp! AMA',
            author: 'DataScienceNewbie',
            score: 156,
            num_comments: 23,
            created_utc: Date.now() / 1000 - 3600,
            url: 'https://reddit.com/r/careerguidance/comments/1',
            selftext: 'After 6 months of intensive learning, I finally completed my data science bootcamp. Happy to answer any questions!',
            subreddit: 'careerguidance'
          },
          {
            id: '2',
            title: 'Career transition from marketing to tech - my journey',
            author: 'TechTransitioner',
            score: 89,
            num_comments: 15,
            created_utc: Date.now() / 1000 - 7200,
            url: 'https://reddit.com/r/careerguidance/comments/2',
            selftext: 'Sharing my experience transitioning from marketing to software development...',
            subreddit: 'careerguidance'
          },
          {
            id: '3',
            title: 'Remote work tips that actually work',
            author: 'RemoteWorker2024',
            score: 234,
            num_comments: 45,
            created_utc: Date.now() / 1000 - 10800,
            url: 'https://reddit.com/r/careerguidance/comments/3',
            selftext: 'After 3 years of remote work, here are the strategies that made the biggest difference...',
            subreddit: 'careerguidance'
          },
          {
            id: '4',
            title: 'Salary negotiation success story - 40% increase!',
            author: 'NegotiationWin',
            score: 312,
            num_comments: 67,
            created_utc: Date.now() / 1000 - 14400,
            url: 'https://reddit.com/r/careerguidance/comments/4',
            selftext: 'Just successfully negotiated a 40% salary increase. Here\'s exactly what I did...',
            subreddit: 'careerguidance'
          },
          {
            id: '5',
            title: 'AI is changing careers - how to stay relevant',
            author: 'FutureThinker',
            score: 178,
            num_comments: 34,
            created_utc: Date.now() / 1000 - 18000,
            url: 'https://reddit.com/r/careerguidance/comments/5',
            selftext: 'With AI advancing rapidly, here are the skills that will remain valuable...',
            subreddit: 'careerguidance'
          }
        ]);
      }, 500);
    });
  }

  async getPostComments(postId: string): Promise<RedditComment[]> {
    // Simulate API call with mock comments
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'c1',
            author: 'HelpfulRedditor',
            body: 'Great post! I went through a similar journey. The key is consistency and building a portfolio.',
            score: 12,
            created_utc: Date.now() / 1000 - 1800
          },
          {
            id: 'c2',
            author: 'CareerCoach',
            body: 'This is excellent advice. I always tell my clients to focus on transferable skills.',
            score: 8,
            created_utc: Date.now() / 1000 - 3600
          },
          {
            id: 'c3',
            author: 'StudentLearner',
            body: 'Thanks for sharing! What resources did you find most helpful?',
            score: 5,
            created_utc: Date.now() / 1000 - 5400
          }
        ]);
      }, 300);
    });
  }

  // Share quiz results to Reddit
  async shareQuizResults(results: {
    careerPath: string;
    score: number;
    description: string;
  }): Promise<{ success: boolean; url?: string }> {
    // In a real implementation, this would post to Reddit
    // For now, we'll simulate the sharing
    const shareText = `🚀 Just discovered my ideal career path with CareerPath AI!

**Result:** ${results.careerPath}
**Score:** ${results.score}/5

${results.description}

The AI analysis was spot-on! Anyone else tried career assessment tools? What did you discover about yourself?

#CareerGuidance #CareerChange #AI #ProfessionalDevelopment`;

    // Simulate posting delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          url: 'https://reddit.com/r/careerguidance/comments/mock_post_id'
        });
      }, 1000);
    });
  }

  // Create a discussion post about career topics
  async createDiscussion(topic: {
    title: string;
    content: string;
    subreddit: string;
  }): Promise<{ success: boolean; url?: string }> {
    // Simulate creating a discussion post
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          url: `https://reddit.com/r/${topic.subreddit}/comments/mock_discussion_id`
        });
      }, 800);
    });
  }

  // Get trending career topics
  async getTrendingTopics(): Promise<string[]> {
    return [
      'Remote Work Best Practices',
      'AI Impact on Careers',
      'Salary Negotiation Tips',
      'Career Transition Stories',
      'Tech Industry Insights',
      'Professional Development',
      'Work-Life Balance',
      'Networking Strategies'
    ];
  }
}

export const redditService = new RedditService();