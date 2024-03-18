import { createContext, useContext, useState, ReactNode } from "react";
import { Toaster as Sonner } from "sonner";

type Theme = "light" | "dark" | "system";

interface ToasterProps {
  duration?: number; // Duration of the toast in milliseconds
  classNames?: {
    toast?: string; // Class name for the toast container
    description?: string; // Class name for the description element
    actionButton?: string; // Class name for the action button element
    cancelButton?: string; // Class name for the cancel button element
  };
  onClose?: () => void; // Callback function called when the toast is closed
  onAction?: () => void; // Callback function called when the action button is clicked
  onCancel?: () => void; // Callback function called when the cancel button is clicked
}


interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("system");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const Toaster: React.FC<ToasterProps> = ({ ...props }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, ThemeProvider };
