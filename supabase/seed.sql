-- Enable extension for UUID generation (optional, but useful)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert sample badges
INSERT INTO public.badges (id, name, description, icon_url, criteria) VALUES
  ('b1111111-1111-4111-8111-111111111111', 'First Step', 'Complete your first course', '🎓', 'Complete any course'),
  ('b2222222-2222-4222-8222-222222222222', 'Quiz Master', 'Score 100% on a quiz', '🏆', 'Perfect quiz score'),
  ('b3333333-3333-4333-8333-333333333333', 'Referral Champion', 'Successfully refer 3 candidates', '🤝', 'Make 3 successful referrals'),
  ('b4444444-4444-4444-8444-444444444444', 'Collaborator', 'Join and complete 5 Decode Rooms', '👥', 'Complete 5 rooms'),
  ('b5555555-5555-4555-8555-555555555555', 'Point Collector', 'Earn 1000 points', '⭐', 'Accumulate 1000 points');

-- Insert sample courses
INSERT INTO public.courses (id, title, description, thumbnail_url, difficulty, points_reward, is_published) VALUES
  ('c1111111-1111-4111-8111-111111111111', 'React Fundamentals', 'Learn the basics of React including components, props, state, and hooks', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', 'beginner', 100, true),
  ('c2222222-2222-4222-8222-222222222222', 'TypeScript Mastery', 'Master TypeScript from basics to advanced patterns', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400', 'intermediate', 150, true),
  ('c3333333-3333-4333-8333-333333333333', 'Full-Stack Development', 'Build complete applications with React, Node.js, and PostgreSQL', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', 'advanced', 200, true),
  ('c4444444-4444-4444-8444-444444444444', 'System Design Basics', 'Learn to design scalable systems', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', 'intermediate', 150, true);

-- Insert course modules for React Fundamentals
INSERT INTO public.course_modules (course_id, title, content, order_index) VALUES
  ('c1111111-1111-4111-8111-111111111111', 'Introduction to React', 'React is a JavaScript library for building user interfaces...', 1),
  ('c1111111-1111-4111-8111-111111111111', 'Components and Props', 'Learn how to create and compose components...', 2),
  ('c1111111-1111-4111-8111-111111111111', 'State and Lifecycle', 'Managing component state with useState hook...', 3),
  ('c1111111-1111-4111-8111-111111111111', 'Handling Events', 'Learn how to handle user interactions...', 4);

-- Insert a quiz for React Fundamentals
INSERT INTO public.quizzes (id, course_id, title, passing_score) VALUES
  ('11111111-1111-4111-8111-111111111111', 'c1111111-1111-4111-8111-111111111111', 'React Fundamentals Quiz', 70);

-- Insert quiz questions
INSERT INTO public.quiz_questions (quiz_id, question, options, order_index) VALUES
  ('11111111-1111-4111-8111-111111111111', 
   'What is JSX?',
   '[
     {"text": "A JavaScript extension that allows HTML-like syntax", "is_correct": true},
     {"text": "A CSS framework", "is_correct": false},
     {"text": "A database query language", "is_correct": false},
     {"text": "A testing library", "is_correct": false}
   ]'::jsonb,
   1),
  ('11111111-1111-4111-8111-111111111111',
   'Which hook is used for managing state?',
   '[
     {"text": "useEffect", "is_correct": false},
     {"text": "useState", "is_correct": true},
     {"text": "useContext", "is_correct": false},
     {"text": "useReducer", "is_correct": false}
   ]'::jsonb,
   2),
  ('11111111-1111-4111-8111-111111111111',
   'What does props stand for?',
   '[
     {"text": "Properties", "is_correct": true},
     {"text": "Proposals", "is_correct": false},
     {"text": "Protocols", "is_correct": false},
     {"text": "Propagation", "is_correct": false}
   ]'::jsonb,
   3);

-- Insert sample rooms
INSERT INTO public.rooms (id, name, description, project_type, status) VALUES
  ('a1111111-1111-4111-8111-111111111111', 'E-commerce Platform', 'Build a full-stack e-commerce application', 'fullstack', 'open'),
  ('a2222222-2222-4222-8222-222222222222', 'Portfolio Generator', 'Create a dynamic portfolio website builder', 'frontend', 'open'),
  ('a3333333-3333-4333-8333-333333333333', 'REST API Design', 'Design and implement a RESTful API', 'backend', 'in_progress');
