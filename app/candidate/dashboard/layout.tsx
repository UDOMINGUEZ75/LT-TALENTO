export const dynamic = "force-dynamic";

import ClientPingWrapper from "../../ClientPingWrapper";

export default function CandidateLayout({ children }) {
  return <ClientPingWrapper>{children}</ClientPingWrapper>;
}
