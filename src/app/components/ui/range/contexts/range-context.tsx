import { createContext, PropsWithChildren, useContext, useState } from "react";
import {
  RangeContextProps,
  RangeProviderProps,
  RangeValue,
} from "../types/range-context.types";

const RangeContext = createContext<RangeContextProps | null>(null);

export const useRange = () => {
  const context = useContext(RangeContext);
  if (!context) {
    throw new Error("useRange must be used within a RangeProvider");
  }
  return context;
};

export const RangeProvider = ({
  initialValue,
  onChange,
  thumbSize = 16,
  children,
  values = [],
  onValueCommit,
}: PropsWithChildren<RangeProviderProps>) => {
  const [rangeValue, setRangeValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  const updateRangeValue = (newRangeValue: RangeValue) => {
    setRangeValue({ ...newRangeValue });

    if (onChange) {
      onChange({ ...newRangeValue });
    }
  };

  return (
    <RangeContext.Provider
      value={{
        rangeValue,
        updateRangeValue,
        isDragging,
        updateIsDragging: setIsDragging,
        initialValue,
        thumbSize,
        onValueCommit,
        values,
      }}
    >
      {children}
    </RangeContext.Provider>
  );
};
