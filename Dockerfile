# Stage 1: Build the React frontend
FROM node:18 as frontend
WORKDIR /app
COPY src/frontend /app
RUN npm install
RUN npm run build
RUN ls -la /app


# Stage 2: Build the Spring Boot application
FROM maven:3.8.4-openjdk-17 as backend
WORKDIR /app
COPY . /app
COPY --from=frontend /app/dist /app/src/main/resources/static
RUN mvn clean package

# Stage 3: Create the final image
FROM openjdk:17
# MAINTAINER github.com/samiecode
WORKDIR /app
COPY --from=backend /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]