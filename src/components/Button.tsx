import React from "react";

// Added React.ButtonHTMLAttributes to support standard button properties like 'type' and 'disabled'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  icon,
  ...props
}) => {
  const baseStyle =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-accent-indigo to-accent-purple text-white hover:shadow-[0_0_20px_rgba(93,95,239,0.5)] hover:scale-[1.02]",
    secondary: "bg-white text-navy-900 hover:bg-gray-100 hover:scale-[1.02]",
    outline:
      "border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-accent-mint/50",
    ghost: "text-gray-300 hover:text-white",
  };

  // Spread the remaining props (like type, disabled, onClick) to the underlying button element
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 bg-white/20 translate-y-full skew-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      )}
      <span className="relative flex items-center gap-2 z-10">
        {children}
        {icon}
      </span>
    </button>
  );
};

export default Button;
