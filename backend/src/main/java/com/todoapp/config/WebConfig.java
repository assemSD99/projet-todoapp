package com.todoapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Autorise tous les endpoints
                        .allowedOrigins("http://localhost:5173") // Autorise votre frontend (modifiez selon votre port)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Autorise les méthodes HTTP
                        .allowedHeaders("*") // Autorise tous les en-têtes
                        .allowCredentials(true); // Permet l'envoi de cookies si nécessaire
            }
        };
    }
}
