export const dynamic = "force-dynamic";

import ClientPingWrapper from "../ClientPingWrapper";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientPingWrapper>
      {children}
    </ClientPingWrapper>
  );
}