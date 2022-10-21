import { default as NextLink } from 'next/link';
import { defaultButtonClasses, buttonColors } from '@/utils/constants/buttons';

type ButtonLinkProps = {
  color?: 'primary' | 'secondary' | 'danger';
  text: string;
  href: string;
  className?: string;
};

const ButtonLink = ({ color = 'primary', text, href, className }: ButtonLinkProps) => {
  return (
    <NextLink href={href}>
      <a className={`${defaultButtonClasses} ${buttonColors[color]} ${className ?? ''}`}>{text}</a>
    </NextLink>
  );
};

export default ButtonLink;
