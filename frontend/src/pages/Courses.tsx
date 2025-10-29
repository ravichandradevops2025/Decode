// Courses catalog page
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { Course } from '@/types';
import { BookOpen, Clock, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load courses');
      console.error(error);
    } else {
      setCourses(data || []);
    }
    setLoading(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading courses...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Catalog</h1>
        <p className="text-gray-600">
          Explore our courses and start your learning journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            {course.thumbnail_url && (
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg -mt-6 -mx-6 mb-4"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
                    course.difficulty
                  )}`}
                >
                  {course.difficulty}
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <Award size={16} className="mr-1" />
                  {course.points_reward} pts
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {course.description}
              </p>
            </div>
            <Link to={`/courses/${course.id}`}>
              <Button className="w-full">
                <BookOpen size={16} className="mr-2" />
                View Course
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No courses available yet.</p>
        </div>
      )}
    </div>
  );
};