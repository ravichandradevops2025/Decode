// Home page
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Trophy, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';

export const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Decode
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Learn, collaborate, and grow your skills through courses, projects, and real-world simulations.
          Earn points, unlock badges, and build your skill passport.
        </p>
        {!user && (
          <div className="flex justify-center space-x-4">
            <Link to="/signup">
              <Button size="lg">
                Get Started <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <Card>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={32} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Courses</h3>
            <p className="text-gray-600">
              Learn from curated courses with hands-on projects and quizzes. Earn points and badges as you progress.
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Decode Rooms</h3>
            <p className="text-gray-600">
              Join project collaboration rooms, work with peers, share standups, and build real-world applications together.
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy size={32} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Rewards & Recognition</h3>
            <p className="text-gray-600">
              Compete on leaderboards, refer candidates for jobs, redeem points for goodies, and showcase your skill passport.
            </p>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      {user && (
        <section className="bg-primary-50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to start learning?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our course catalog and start your learning journey today.
          </p>
          <Link to="/courses">
            <Button size="lg">
              Explore Courses <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </section>
      )}

      {/* Examples: small button and input with icon */}
      <section className="py-8">
        <h3 className="text-lg font-semibold mb-4">Component examples</h3>
        <div className="flex items-center space-x-4">
          <Button size="sm" leftIcon={<ArrowRight size={14} />}>
            Small Action
          </Button>

          <Input placeholder="Search courses" icon={<Search size={16} />} />
        </div>
      </section>
    </div>
  );
};