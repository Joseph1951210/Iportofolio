# 使用 Node.js 作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock 文件
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install

# 复制项目的所有文件到工作目录
COPY . .

# 构建 Next.js 应用
RUN yarn build

# 暴露 Next.js 默认运行端口
EXPOSE 3000

# 启动应用
CMD ["npx", "serve", "out", "-l", "3000"]