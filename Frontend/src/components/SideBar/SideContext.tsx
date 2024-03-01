import { createContext, Dispatch, SetStateAction, useContext, useState, ReactNode } from "react";

interface SelectedContextType {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

interface SelectedProviderProps {
  children: ReactNode;
}

const SelectedContext = createContext<SelectedContextType>({
  selected: "Overview",
  setSelected: () => {}
});

export const SelectedProvider: React.FC<SelectedProviderProps> = ({ children }) => {
  const [selected, setSelected] = useState<string>("");

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => useContext(SelectedContext);