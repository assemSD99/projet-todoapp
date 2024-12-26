package com.todoapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5174"); // URL du frontend
        config.addAllowedHeader("*"); // Autorise tous les en-têtes
        config.addAllowedMethod("*"); // Autorise toutes les méthodes HTTP (GET, POST, PUT, DELETE, etc.)
        source.registerCorsConfiguration("/**", config); // Applique les règles à toutes les routes
        return new CorsFilter(source);
    }
}
