import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@use "@/styles/colors" as *;`, // makes all variables/mixins global
  },
};

export default nextConfig;
