import React from 'react';
import styles from './NeuButton.module.css';

export interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Sombra o relieve del botón */
  shadow?: 'convex' | 'concave' | 'flat' | 'pressed';
  /** Variante visual del botón */
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'outline' | 'default';
  /** Tamaño del botón */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Nivel de redondeo de los bordes */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'circle' | 'pill';
  /** Si ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Muestra un spinner de carga */
  loading?: boolean;
  /** Icono a la izquierda del texto */
  icon?: React.ReactNode;
  /** Icono a la derecha del texto */
  iconRight?: React.ReactNode;
}

export const NeuButton = React.forwardRef<HTMLButtonElement, NeuButtonProps>(({
  shadow = 'convex',
  variant = 'default',
  size = 'md',
  rounded = 'pill',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconRight,
  children,
  className = '',
  ...props
}, ref) => {
  const shadowClass = `shadow${shadow.charAt(0).toUpperCase() + shadow.slice(1)}`;
  const roundedClass = `rounded${rounded.charAt(0).toUpperCase() + rounded.slice(1)}`;
  
  const buttonClasses = [
    styles.neuButton,
    styles[variant],
    styles[size],
    styles[shadowClass],
    styles[roundedClass],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && icon && <span className={styles.iconLeft}>{icon}</span>}
      <span className={styles.children}>{children}</span>
      {!loading && iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
});

NeuButton.displayName = 'NeuButton';