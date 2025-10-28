import { InputHTMLAttributes, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ icon: Icon, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
          <input
            ref={ref}
            className={`w-full pl-11 pr-4 py-3.5 border rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 ${
              error ? 'border-red-300 focus:ring-red-500/50' : 'border-slate-200'
            } ${className || ''}`}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-600 pl-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
