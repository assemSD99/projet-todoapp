FROM openjdk:17-jdk-slim AS build
WORKDIR /app
COPY ./mvnw ./mvnw
COPY ./.mvn ./.mvn
COPY ./pom.xml ./pom.xml
RUN ./mvnw dependency:go-offline

COPY ./src ./src
RUN ./mvnw package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
