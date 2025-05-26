"use client";
import { createContext, useReducer } from "react";
export const MobileNavContext = createContext(false);
export const MobileNavDispatchContext =
  createContext<React.DispatchWithoutAction | null>(null);

function mobileNavReducer(state: boolean) {
  return !state;
}
export const MobileNavProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mobileNavIsActive, setMobileNavIsActive] = useReducer(
    mobileNavReducer,
    false
  );
  return (
    <MobileNavContext.Provider value={mobileNavIsActive}>
      <MobileNavDispatchContext.Provider
        value={setMobileNavIsActive as React.DispatchWithoutAction}
      >
        {children}
      </MobileNavDispatchContext.Provider>
    </MobileNavContext.Provider>
  );
};
