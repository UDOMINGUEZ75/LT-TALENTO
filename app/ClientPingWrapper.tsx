"use client";

import { ReactNode, useEffect } from "react";

interface ClientPingWrapperProps {
  children: ReactNode;
}

export default function ClientPingWrapper({ children }: ClientPingWrapperProps) {
  useEffect(() => {
    // Ping inicial
    fetch("/api/ping").catch(() => {});

    // Ping cada 60 segundos
    const interval = setInterval(() => {
      fetch("/api/ping").catch(() => {});
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}