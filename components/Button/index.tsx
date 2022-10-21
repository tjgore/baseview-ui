import { defaultButtonClasses, buttonColors } from '@/utils/constants/buttons';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'danger';
  text?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const Button = ({ type = 'button', color = 'primary', text, children, onClick, disabled = false, className }: ButtonProps) => {
  const handleClick = () => {
    if (!onClick) {
      return;
    }
    onClick();
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${defaultButtonClasses} ${buttonColors[color]} ${className ?? ''}`}>
      {text ?? children ?? null}
    </button>
  );
};

export default Button;
