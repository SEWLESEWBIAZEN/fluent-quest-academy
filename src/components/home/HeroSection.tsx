
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <div className="dark:bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-300 mb-6 leading-tight">
              Master Languages the <span className=" bg-gradient-to-r from-purple-300 to-brand-900 bg-clip-text text-transparent">Fun</span> Way
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
              Learn from expert teachers, track your progress, and connect with language learners worldwide in one interactive platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/courses">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign Up Free
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-background flex items-center justify-center text-xs font-medium overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=User+${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="ml-3 text-sm text-gray-400">
                <span className="font-semibold text-gray-500 dark:text-gray-400">1,000+</span> students already learning
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-100 dark:bg-brand-950 dark:text-foreground rounded-full flex items-center justify-center text-2xl animate-bounce-small">
                🇫🇷
              </div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-green-100 dark:bg-brand-950 dark:text-foreground rounded-full flex items-center justify-center text-2xl animate-bounce-small" style={{animationDelay: '0.2s'}}>
                🇯🇵
              </div>
              <div className="absolute top-1/2 -right-4 w-14 h-14 bg-blue-100  dark:bg-brand-950 dark:text-foreground rounded-full flex items-center justify-center text-xl animate-bounce-small" style={{animationDelay: '0.4s'}}>
                🇪🇸
              </div>
              <div className="bg-background rounded-xl shadow-xl overflow-hidden border border-gray-100">
                <img 
                  src="../../src/assets/images/hero.png" 
                  alt="Language Learning" 
                  className="w-full h-auto max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
