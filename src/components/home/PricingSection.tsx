
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Basic access to language learning resources',
    features: [
      'Access to free courses',
      'Basic progress tracking',
      'Community forum access',
      'Limited quizzes',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 10,
    description: 'Enhanced learning with more interactive features',
    features: [
      'Everything in Free plan',
      'Full access to all courses',
      'Detailed progress analytics',
      'Unlimited quizzes and exercises',
      '5 private 1-on-1 chats per month',
    ],
    cta: 'Start Pro',
    popular: true,
  },
  {
    name: 'Premium',
    price: 15,
    description: 'Complete language learning experience',
    features: [
      'Everything in Pro plan',
      'Priority support',
      'Unlimited 1-on-1 chats',
      'Certification on completion',
      'Custom learning path',
    ],
    cta: 'Start Premium',
    popular: false,
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your learning needs. No hidden fees, cancel anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-background rounded-lg shadow-md border overflow-hidden transition-all transform hover:-translate-y-1 hover:shadow-lg ${
                plan.popular ? 'border-brand-700 ring-2 ring-brand-500 ring-opacity-50' : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="bg-background text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-800">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-brand-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/register">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-background hover:bg-brand-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10 text-gray-600">
          All plans include a 7-day free trial. No credit card required.
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
