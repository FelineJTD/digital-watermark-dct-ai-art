import { IconContext } from "@phosphor-icons/react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  className,
  icon,
  ...props
}: ButtonProps) {
  return (
    <IconContext.Provider
      value={{
        color: "currentColor",
        size: 20,
        weight: "bold",
        mirrored: false
      }}
    >
      <button
        className={`py-3 px-6 rounded-full uppercase flex items-center font-medium tracking-wider ${
          variant === "primary"
            ? "bg-primary text-neutral-900 enabled:hover:bg-neutral-700 enabled:hover:text-primary duration-200"
            : "text-primary border border-primary bg-transparent enabled:hover:bg-primary enabled:hover:text-neutral-900 duration-200"
        } ${className}`}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    </IconContext.Provider>
  );
}
