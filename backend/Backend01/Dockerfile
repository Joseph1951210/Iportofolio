# 使用 OpenJDK 作为基础镜像
FROM openjdk:17-jdk-slim

# 设置工作目录
WORKDIR /app

# 复制 Maven 构建输出的 jar 文件到容器中
COPY target/Backend01-0.0.1-SNAPSHOT.jar app.jar

# 暴露应用程序的默认端口
EXPOSE 8083

# 运行 jar 文件
ENTRYPOINT ["java", "-jar", "app.jar"]
