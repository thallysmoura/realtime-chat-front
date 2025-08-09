
export const H1 = ({ children, className }) => (
    <h1 className={`text-5xl font-bold leading-tight ${className}`}>
      {children}
    </h1>
  );
  
  export const H2 = ({ children, className }) => (
    <h2 className={`text-4xl font-semibold leading-tight ${className}`}>
      {children}
    </h2>
  );
  
  export const H3 = ({ children, className }) => (
    <h3 className={`text-3xl font-medium leading-tight ${className}`}>
      {children}
    </h3>
  );
  
  export const Paragraph = ({ children, className }) => (
    <p className={`text-base leading-relaxed ${className}`}>
      {children}
    </p>
  );
  
  export const Subtext = ({ children, className }) => (
    <p className={`text-sm ${className}`}>
      {children}
    </p>
  );
  
  export const Label = ({ children, className }) => (
    <label className={`block text-xs font-medium ${className}`}>
      {children}
    </label>
  );
  
  export const Caption = ({ children, className }) => (
    <p className={`text-xs ${className}`}>
      {children}
    </p>
  );
  