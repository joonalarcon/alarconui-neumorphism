import React from 'react';
import styles from './NeuButton.module.css';

export interface NeuButtonProps {
  /** Sombra o relieve del botón */
  shadow?: 'convex' | 'concave' | 'flat' | 'pressed';
  /** Variante visual del botón */
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'default';
  /** Tamaño del botón */
  size?: 'sm' | 'md' | 'lg';
  /** Si ocupa todo el ancho disponible */
  fullWidth?: boolean;
  /** Muestra un spinner de carga */
  loading?: boolean;
  /** Deshabilita el botón */
  disabled?: boolean;
  /** Icono a la izquierda del texto */
  icon?: React.ReactNode;
  /** Icono a la derecha del texto */
  iconRight?: React.ReactNode;
  /** Función al hacer clic */
  onClick?: () => void;
  /** Contenido del botón */
  children: React.ReactNode;
  /** Clase CSS adicional */
  className?: string;
}

export const NeuButton: React.FC<NeuButtonProps> = ({
  shadow = 'convex',
  variant = 'default',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconRight,
  onClick,
  children,
  className = '',
}) => {
  const shadowClass = `shadow${shadow.charAt(0).toUpperCase() + shadow.slice(1)}`;
  
  const buttonClasses = [
    styles.neuButton,
    styles[variant],
    styles[size],
    styles[shadowClass],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && icon && <span className={styles.iconLeft}>{icon}</span>}
      <span className={styles.children}>{children}</span>
      {!loading && iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
};

NeuButton.displayName = 'NeuButton';