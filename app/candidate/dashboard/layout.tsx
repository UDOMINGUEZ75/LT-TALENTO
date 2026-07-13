import { ReactNode } from "react";
import ClientPingWrapper from "../../ClientPingWrapper";

export default function CandidateLayout({ children }: { children: ReactNode }) {
  return <ClientPingWrapper>{children}</ClientPingWrapper>;
}