const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true, // 在打包过程中忽略 ESLint 错误
  },
  typescript: {
    ignoreBuildErrors: true, // 在构建时忽略 TypeScript 错误
  },
};

export default nextConfig;
