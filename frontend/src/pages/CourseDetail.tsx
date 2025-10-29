import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Course, CourseModule, Quiz, QuizQuestion, Enrollment } from '@/types';
import { BookOpen, CheckCircle, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCourseData();
    }
  }, [id, user]);

  const fetchCourseData = async () => {
    if (!id) return;

    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (courseError) {
      toast.error('Failed to load course');
      navigate('/courses');
      return;
    }

    setCourse(courseData);

    const { data: modulesData } = await supabase
      .from('course_modules')
      .select('*')
      .eq('course_id', id)
      .order('order_index');

    setModules(modulesData || []);

    const { data: quizData } = await supabase
      .from('quizzes')
      .select('*')
      .eq('course_id', id)
      .single();

    if (quizData) {
      setQuiz(quizData);

      const { data: questionsData } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', quizData.id)
        .order('order_index');

      setQuestions(questionsData || []);
    }

    if (user) {
      const { data: enrollmentData } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', id)
        .single();

      setEnrollment(enrollmentData);
    }

    setLoading(false);
  };

  const handleEnroll = async () => {
    if (!user || !course) return;

    const { error } = await supabase.from('enrollments').insert({
      user_id: user.id,
      course_id: course.id,
    });

    if (error) {
      toast.error('Failed to enroll');
    } else {
      toast.success('Enrolled successfully!');
      fetchCourseData();
    }
  };

  const handleTakeQuiz = () => {
    setShowQuizModal(true);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleSubmitQuiz = async () => {
    if (!user || !quiz || !course) return;

    let correct = 0;
    questions.forEach((question) => {
      const userAnswer = quizAnswers[question.id];
      if (userAnswer !== undefined && question.options[userAnswer]?.is_correct) {
        correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= quiz.passing_score;

    const { error: attemptError } = await supabase.from('quiz_attempts').insert({
      user_id: user.id,
      quiz_id: quiz.id,
      score,
      passed,
      answers: quizAnswers,
    });

    if (attemptError) {
      toast.error('Failed to submit quiz');
      return;
    }

    if (passed && enrollment) {
      await supabase.from('points_transactions').insert({
        user_id: user.id,
        amount: course.points_reward,
        transaction_type: 'earned',
        reference_type: 'course',
        reference_id: course.id,
        description: `Completed course: ${course.title}`,
      });

      await supabase
        .from('enrollments')
        .update({
          status: 'completed',
          progress: 100,
          completed_at: new Date().toISOString(),
        })
        .eq('id', enrollment.id);

      toast.success(
        `Congratulations! You passed with ${score}% and earned ${course.points_reward} points!`
      );
    } else {
      toast.error(`You scored ${score}%. Passing score is ${quiz.passing_score}%.`);
    }

    setQuizSubmitted(true);
    fetchCourseData();
  };

  if (loading || !course) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading course...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        {course.thumbnail_url && (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="capitalize">{course.difficulty}</span>
              <span>•</span>
              <div className="flex items-center">
                <Award size={16} className="mr-1" />
                {course.points_reward} points
              </div>
            </div>
          </div>
          <div>
            {!enrollment ? (
              <Button onClick={handleEnroll}>Enroll Now</Button>
            ) : enrollment.status === 'completed' ? (
              <div className="flex items-center text-green-600">
                <CheckCircle size={20} className="mr-2" />
                Completed
              </div>
            ) : (
              <div className="text-primary-600 font-medium">Enrolled</div>
            )}
          </div>
        </div>
      </Card>

      {enrollment && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
          <div className="space-y-4">
            {modules.map((module, index) => (
              <Card key={module.id}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 font-medium">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{module.content}</p>
                    {module.video_url && (
                        <a
                        href={module.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 text-sm hover:underline mt-2 inline-block"
                      >
                        Watch Video
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {enrollment && quiz && enrollment.status !== 'completed' && (
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Assessment</h2>
          <p className="text-gray-600 mb-4">
            Complete the quiz to finish the course and earn {course.points_reward} points.
            Passing score: {quiz.passing_score}%
          </p>
          <Button onClick={handleTakeQuiz}>
            <BookOpen size={16} className="mr-2" />
            Take Quiz
          </Button>
        </Card>
      )}

      <Modal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        title={quiz?.title || 'Quiz'}
        size="lg"
      >
        {!quizSubmitted ? (
          <div className="space-y-6">
            {questions.map((question, qIndex) => (
              <div key={question.id} className="border-b pb-4">
                <p className="font-medium text-gray-900 mb-3">
                  {qIndex + 1}. {question.question}
                </p>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <label
                      key={oIndex}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={oIndex}
                        checked={quizAnswers[question.id] === oIndex}
                        onChange={() =>
                          setQuizAnswers({ ...quizAnswers, [question.id]: oIndex })
                        }
                        className="mr-3"
                      />
                      <span>{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <Button
              onClick={handleSubmitQuiz}
              className="w-full"
              disabled={Object.keys(quizAnswers).length !== questions.length}
            >
              Submit Quiz
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Submitted!</h3>
            <p className="text-gray-600">Check your results above.</p>
            <Button onClick={() => setShowQuizModal(false)} className="mt-6">
              Close
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};