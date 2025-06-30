
import React from 'react';

const features = [
  {
    icon: '🧠',
    title: 'Interactive Learning',
    description: 'Engage with interactive lessons, quizzes, and multimedia content designed to make learning fun.',
  },
  {
    icon: '🧑‍🏫',
    title: 'Expert Teachers',
    description: 'Learn from qualified language instructors who provide personalized feedback and guidance.',
  },
  {
    icon: '🎮',
    title: 'Gamified Experience',
    description: 'Stay motivated with streaks, points, and rewards as you progress through your language journey.',
  },
  {
    icon: '💬',
    title: '1-on-1 Conversations',
    description: 'Practice your speaking skills with native speakers through our integrated chat platform.',
  },
  {
    icon: '📱',
    title: 'Learn Anywhere',
    description: 'Access your courses on any device, anytime, and continue learning on the go.',
  },
  {
    icon: '🌐',
    title: 'Multiple Languages',
    description: 'Choose from a wide variety of languages to learn at your own pace.',
  },
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-4">Why Choose FluentQuest?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our comprehensive platform offers everything you need to master a new language efficiently and enjoyably.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 dark:bg-brand-950 rounded-full flex items-center justify-center text-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
