import { motion } from 'framer-motion';
import { Card } from '../ui/card';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-8 bg-white shadow-lg rounded-2xl border border-slate-200">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && (
              <p className="text-gray-500">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </Card>
    </motion.div>
  );
}
