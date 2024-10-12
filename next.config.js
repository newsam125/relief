/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },  
  // 添加这一行，替换 'your-repo-name' 为您的GitHub仓库名
  basePath: process.env.NODE_ENV === 'production' ? '/relief' : '',
  // 使用环境变量来设置basePath
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // 添加assetPrefix配置
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}

module.exports = nextConfig
