import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type AlertType = {
  icon?: JSX.Element;
  iconType?: 'info' | 'error';
  color?: 'red' | 'blue';
  message: string;
  action?: {
    text: string;
    onClick?: () => void;
  };
  className?: string;
};

const colorOptions = {
  red: {
    text: 'text-red-600',
    hover: 'hover:text-red-600',
    icon: 'text-red-400',
    bg: 'bg-red-100',
  },
  blue: {
    text: 'text-blue-600',
    hover: 'hover:text-red-700',
    icon: 'text-blue-400',
    bg: 'bg-blue-100',
  },
};

const Alert = ({ icon, iconType, color, message, action, className }: AlertType) => {
  const colors = colorOptions[color ?? 'blue'];
  return (
    <div className={`rounded-md ${colors.bg} p-4 ${className}`}>
      <div className="flex items-center">
        <div className="shrink-0">
          {icon}
          {iconType === 'info' && (
            <InformationCircleIcon
              className={`h-5 w-5 ${colors.icon}`}
              aria-hidden="true"
            />
          )}
          {iconType === 'error' && (
            <ExclamationTriangleIcon
              className={`h-5 w-5 ${colors.icon}`}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3 flex-1 sm:flex sm:justify-between">
          <p className={`text-sm ${colors.text}`}>{message}</p>

          {action && (
            <p className="mt-1 text-sm sm:mt-0 md:ml-6">
              <button
                type="button"
                onClick={action.onClick}
                className={`whitespace-nowrap font-medium hover:underline ${colors.text} ${colors.hover}`}>
                {action.text}
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
