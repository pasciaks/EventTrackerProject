package com.skilldistillery.eventtracker;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	// allow CORS for the front-end, so I can develop with VS Code locally

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("http://127.0.0.1:5500") // Add your allowed origin(s) here
				.allowedMethods("GET", "POST", "PUT", "DELETE") // Add allowed HTTP methods
				.allowedHeaders("Content-Type", "Authorization") // Add allowed headers
				.allowCredentials(true); // Allow credentials (if needed)
	}
}