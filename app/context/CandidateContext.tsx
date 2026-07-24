"use client";

import { createContext, useContext, useState } from "react";

const CandidateContext = createContext<any>(null);

export function CandidateProvider({ children }: any) {
  const [candidate, setCandidate] = useState<any>({});

  return (
    <CandidateContext.Provider value={{ candidate, setCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
}

export const useCandidate = () => useContext(CandidateContext);