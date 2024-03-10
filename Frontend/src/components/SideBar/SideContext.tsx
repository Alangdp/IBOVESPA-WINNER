import { LineData } from "@/types/LineData.type";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  ReactNode,
} from "react";

// PROVIDER
interface SelectedProviderProps {
  children: ReactNode;
}
// SELECTED
interface SelectedContextType {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const SelectedContext = createContext<SelectedContextType>({
  selected: "",
  setSelected: () => {},
});

// MOCKDATA
interface MockDataType {
  mockData: LineData[];
  setMockData: Dispatch<SetStateAction<LineData[]>>;
}

const MockDataContext = createContext<MockDataType>({
  mockData: [],
  setMockData: () => {},
});

export const SelectedProvider: React.FC<SelectedProviderProps> = ({
  children,
}) => {
  const [selected, setSelected] = useState<string>("Overview");
  const [mockData, setMockData] = useState<LineData[]>([
    { value: 10, name: "teste" },
    { value: 12, name: "teste" },
    { value: 18, name: "teste" },
    { value: 11, name: "teste" },
    { value: 12, name: "teste" },
    { value: 7, name: "teste" },
    { value: 15, name: "teste" },
  ]);

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      <MockDataContext.Provider value={{ mockData, setMockData }}>
        {children}
      </MockDataContext.Provider>
    </SelectedContext.Provider>
  );
};

export const useSelected = () => useContext(SelectedContext);
export const useMock = () => useContext(MockDataContext);
