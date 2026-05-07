import type { ButtonHTMLAttributes } from "react";
import { classNames } from "../../utils/classNames";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border-civic-primary bg-civic-primary text-white hover:bg-teal-800",
  secondary:
    "border-civic-line bg-white text-civic-ink hover:border-civic-primary hover:bg-slate-50",
};

export function buttonClasses(variant: ButtonVariant = "primary") {
  return classNames(
    "inline-flex min-h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-civic-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
  );
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(buttonClasses(variant), className)}
      type={props.type ?? "button"}
      {...props}
    />
  );
}
