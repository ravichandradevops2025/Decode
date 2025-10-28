import { Button } from '../ui/button';

interface OAuthButtonProps {
  provider: 'google' | 'linkedin';
  onClick: () => void;
  isLoading?: boolean;
}

const providerConfig = {
  google: {
    icon: '/icons/google.svg',
    text: 'Continue with Google',
    class: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
  },
  linkedin: {
    icon: '/icons/linkedin.svg',
    text: 'Continue with LinkedIn',
    class: 'bg-[#0A66C2] hover:bg-[#004182] text-white'
  }
};

export function OAuthButton({ provider, onClick, isLoading }: OAuthButtonProps) {
  const config = providerConfig[provider];

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-3 py-2.5 rounded-lg ${config.class}`}
    >
      <img
        src={config.icon}
        alt={`${provider} logo`}
        className="w-5 h-5"
      />
      <span>{config.text}</span>
    </Button>
  );
}