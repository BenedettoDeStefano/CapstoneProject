package CapstoneProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import CapstoneProject.Entities.User;
import CapstoneProject.Enum.Role;
import CapstoneProject.Repository.UserRepository;

@Configuration
public class AdminUserConfig {

	@Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${admin.username:Admin}")
    private String adminUsername;

    @Value("${admin.password:defaultPassword}")
    private String adminPassword;

	@Value("${admin.email:default@email.com}")
    private String adminEmail;

	@Value("${admin.profilePicture:default_picture_path}")
    private String adminProfilePicture;

    @Bean
    public void initAdminUser() {
		if (!userRepository.existsByEmail(adminEmail)) {
			User admin = new User(adminUsername, adminEmail, passwordEncoder.encode(adminPassword), Role.ADMIN);
            userRepository.save(admin);
        }
    }

}