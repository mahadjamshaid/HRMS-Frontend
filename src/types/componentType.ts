import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
//input type global component
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  className?: string;
  containerClassName?: string;
};

//modal type global component

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
  className?: string;
};

//card type global component
export type CardProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  compact?: boolean;
  headerAction?: ReactNode;
  className?: string;
};

// button type global component
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
};

// badge type global component
export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "primary";

export type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};