import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: { fromEnvVar: 'DATABASE_URL' },
  },
});
