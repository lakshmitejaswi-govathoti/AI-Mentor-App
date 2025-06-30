import React, { useState } from 'react';
import { Check, Zap, Crown, Star } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { isPremium, subscribe } = useSubscription();

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: 0,
      annualPrice: 0,
      icon: <Star className="w-6 h-6" />,
      features: [
        'Basic career assessment',
        'Limited AI mentor sessions (5/month)',
        'Basic roadmap generation',
        'Community access',
        'Career quiz games'
      ],
      limitations: [
        'No voice/video mentor',
        'No blockchain certifications',
        'Limited analytics'
      ],
      cta: 'Current Plan',
      popular: false
    },
    {
      name: 'Professional',
      description: 'For serious career advancement',
      price: 29,
      annualPrice: 290,
      icon: <Zap className="w-6 h-6" />,
      features: [
        'Unlimited AI mentor sessions',
        'Voice-powered mentor (ElevenLabs)',
        'Video mentor interactions (Tavus)',
        'Advanced career roadmaps',
        'Blockchain certifications',
        'LinkedIn profile optimization',
        'Priority support',
        'Advanced analytics',
        'Custom skill assessments'
      ],
      cta: 'Upgrade Now',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For teams and organizations',
      price: 99,
      annualPrice: 990,
      icon: <Crown className="w-6 h-6" />,
      features: [
        'Everything in Professional',
        'Team management dashboard',
        'Bulk certification programs',
        'Custom branding',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced reporting',
        'SSO integration'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const handleSubscribe = async (planName: string) => {
    if (planName === 'Free') return;
    
    try {
      await subscribe(planName.toLowerCase());
      alert(`Successfully subscribed to ${planName} plan! 🎉\n\nIn a real implementation, this would integrate with RevenueCat for payment processing and subscription management.`);
    } catch (error) {
      alert('Subscription failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Choose Your Career Journey
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto mb-8">
            Unlock your full potential with AI-powered career guidance, blockchain certifications, and personalized mentorship.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-primary-600' : 'text-secondary-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-secondary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-primary-600' : 'text-secondary-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all hover:shadow-lg ${
                plan.popular 
                  ? 'border-primary-500 scale-105' 
                  : 'border-blue-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    plan.popular ? 'bg-primary-600 text-white' : 'bg-secondary-100 text-secondary-600'
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">{plan.name}</h3>
                  <p className="text-secondary-600 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-secondary-900">
                      ${isAnnual ? plan.annualPrice : plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-secondary-500 ml-1">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {isAnnual && plan.price > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      Save ${(plan.price * 12) - plan.annualPrice}/year
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-secondary-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={plan.name === 'Free' || (isPremium && plan.name === 'Professional')}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : plan.name === 'Free' || (isPremium && plan.name === 'Professional')
                      ? 'bg-secondary-100 text-secondary-500 cursor-not-allowed'
                      : 'bg-secondary-900 hover:bg-secondary-800 text-white'
                  }`}
                >
                  {isPremium && plan.name === 'Professional' ? 'Current Plan' : plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="px-6 py-4 bg-secondary-50 border-b border-secondary-200">
            <h3 className="text-lg font-semibold text-secondary-900">Feature Comparison</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-secondary-200">
                    <th className="text-left py-3 pr-4 text-secondary-900 font-medium">Feature</th>
                    <th className="text-center py-3 px-4 text-secondary-900 font-medium">Free</th>
                    <th className="text-center py-3 px-4 text-secondary-900 font-medium">Professional</th>
                    <th className="text-center py-3 px-4 text-secondary-900 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  <tr>
                    <td className="py-3 pr-4 text-secondary-700">AI Mentor Sessions</td>
                    <td className="text-center py-3 px-4 text-secondary-600">5/month</td>
                    <td className="text-center py-3 px-4 text-green-600">Unlimited</td>
                    <td className="text-center py-3 px-4 text-green-600">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-secondary-700">Voice Mentor (ElevenLabs)</td>
                    <td className="text-center py-3 px-4 text-secondary-400">✗</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-secondary-700">Video Mentor (Tavus)</td>
                    <td className="text-center py-3 px-4 text-secondary-400">✗</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-secondary-700">Blockchain Certifications</td>
                    <td className="text-center py-3 px-4 text-secondary-400">✗</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-secondary-700">Advanced Analytics</td>
                    <td className="text-center py-3 px-4 text-secondary-400">✗</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-secondary-700">API Access</td>
                    <td className="text-center py-3 px-4 text-secondary-400">✗</td>
                    <td className="text-center py-3 px-4 text-secondary-400">✗</td>
                    <td className="text-center py-3 px-4 text-green-600">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-secondary-900 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-left">
              <h4 className="font-semibold text-secondary-900 mb-2">
                How does blockchain certification work?
              </h4>
              <p className="text-secondary-600 text-sm">
                Your certifications are permanently recorded on the Algorand blockchain, making them tamper-proof and instantly verifiable by employers worldwide.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-left">
              <h4 className="font-semibold text-secondary-900 mb-2">
                Can I cancel my subscription anytime?
              </h4>
              <p className="text-secondary-600 text-sm">
                Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;