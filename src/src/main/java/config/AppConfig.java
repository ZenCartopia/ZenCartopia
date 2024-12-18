package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@ComponentScan(basePackages = {"services", "controllers", "com.zencartopia.web.config"})
public class AppConfig {

    @Bean
    public JwtValidator jwtValidator() {
        return new JwtValidator(); // Create and return the JwtValidator bean
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/error", "/public/**", "/api/identity/login", "/api/identity/register").permitAll() // Allow public access to these endpoints
                        .anyRequest().authenticated() // Secure other endpoints
                )
                .addFilterBefore(jwtValidator(), UsernamePasswordAuthenticationFilter.class)
                .formLogin(Customizer.withDefaults()); // Enable default login form

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Create BCryptPasswordEncoder bean
    }
}
