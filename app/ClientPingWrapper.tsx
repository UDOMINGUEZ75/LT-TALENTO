"use client";

import { useEffect } from "react";

export default function ClientPingWrapper({ children }) {
  useEffect(() => {
    // Ping inicial
    fetch("/api/ping");

    // Ping cada 60 segundos
    const interval = setInterval(() => {
      fetch("/api/ping");
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}