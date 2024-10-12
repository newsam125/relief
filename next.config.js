/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // 使用环境变量来设置basePath
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // 添加assetPrefix配置
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // 添加以下配置来提高开发环境性能
  webpack: (config, { dev, isServer }) => {
    // 仅在开发环境中应用这些优化
    if (dev && !isServer) {
      // 禁用源映射以加快编译速度
      config.devtool = false;
      
      // 减少打包大小
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      };
    }
    return config;
  },
}

module.exports = nextConfig
