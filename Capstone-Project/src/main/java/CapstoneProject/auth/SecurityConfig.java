package CapstoneProject.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	JWTAuthFilter jwtFilter;
	@Autowired
	CorsFilter corsFilter;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.cors(c -> c.disable());
		http.csrf(c -> c.disable());

		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll());
//		http.authorizeHttpRequests(auth -> auth.requestMatchers("/events/**").authenticated());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/user/**").authenticated());

//		http.authorizeHttpRequests((authz) -> authz.requestMatchers(HttpMethod.GET, "/events/**", "/1/**")
//				.hasAnyAuthority("USER", "ADMIN")
//				.requestMatchers(HttpMethod.DELETE, "/events/**", "/1/**", "/2/**").hasAuthority("ADMIN")
//				.anyRequest().authenticated());

		http.authorizeHttpRequests(
				authz -> authz.requestMatchers(HttpMethod.GET, "/events/**").hasAnyAuthority("USER", "ADMIN")
						.requestMatchers("/events/**").hasAuthority("ADMIN").anyRequest().authenticated());

		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(corsFilter, JWTAuthFilter.class);


	return http.build();
	}

	@Bean
	PasswordEncoder encoder() {
		return new BCryptPasswordEncoder(11);
	}
}