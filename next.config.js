/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ignora advertencias de ESLint en tiempo de build para evitar cancelaciones
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Asegura la compatibilidad con paquetes del lado del servidor como Prisma
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
};

module.exports = nextConfig;