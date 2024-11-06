import React from 'react';

interface BasicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

const BasicButton: React.FC<BasicButtonProps> = ({
  icon,
  children,
  className,
  as: Component = 'button',
  ...props
}) => {
  return (
    <Component
      className={`flex items-center px-4 py-2 rounded-full text-deep-sapphire-400 font-semibold hover:bg-dark-slate-600 hover:text-white ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </Component>
  );
};

export default BasicButton;
