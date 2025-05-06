
import React from 'react';

const testimonials = [
  {
    content: "FluentQuest has been a game-changer for my Spanish learning journey. The interactive lessons and gamification keep me motivated to practice every day.",
    author: "Sarah Johnson",
    role: "English to Spanish learner",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson",
  },
  {
    content: "As a teacher on FluentQuest, I love how easy it is to create engaging content for my students and track their progress. The platform is intuitive and feature-rich.",
    author: "David Chen",
    role: "Mandarin Teacher",
    avatar: "https://ui-avatars.com/api/?name=David+Chen",
  },
  {
    content: "The 1-on-1 conversation practice with native speakers has improved my confidence tremendously. I can now hold real conversations in French after just 3 months!",
    author: "Michael Brown",
    role: "English to French learner",
    avatar: "https://ui-avatars.com/api/?name=Michael+Brown",
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from students and teachers who are already transforming their language skills with FluentQuest.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-yellow-500 text-3xl">★</div>
                <div className="text-yellow-500 text-3xl">★</div>
                <div className="text-yellow-500 text-3xl">★</div>
                <div className="text-yellow-500 text-3xl">★</div>
                <div className="text-yellow-500 text-3xl">★</div>
              </div>
              <blockquote className="text-gray-700 mb-6">"{testimonial.content}"</blockquote>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
