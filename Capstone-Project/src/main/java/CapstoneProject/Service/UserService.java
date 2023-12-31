package CapstoneProject.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import CapstoneProject.Entities.User;
import CapstoneProject.Enum.Role;
import CapstoneProject.Exception.BadRequestException;
import CapstoneProject.Exception.NotFoundException;
import CapstoneProject.PayLoad.NuovoUserPayLoad;
import CapstoneProject.Repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;


	// SALVA NUOVO UTENTE + ECCEZIONE SE VIENE USATA LA STESSA EMAIL
	public User save(NuovoUserPayLoad body) {
		userRepository.findByEmail(body.getEmail()).ifPresent(utente -> {
			throw new BadRequestException("L'email " + body.getEmail() + " è gia stata utilizzata");
		});
		User newUser = new User(body.getUsername(), body.getEmail(), body.getPassword());
		newUser.setRole(Role.USER);

		return userRepository.save(newUser);
	}

	// TORNA LA LISTA DEGLI UTENTI
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	// CERCA UTENTE TRAMITE ID
	public User findById(UUID id) throws NotFoundException {
		return userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
	}

	// CERCA E MODIFICA UTENTE TRAMITE ID
	public User findByIdAndUpdate(UUID id, NuovoUserPayLoad body) throws NotFoundException {
		User found = this.findById(id);
		found.setEmail(body.getEmail());
		;
		found.setUsername(body.getUsername());
		found.setEmail(body.getEmail());
		return userRepository.save(found);
	}

	// CERCA E CANCELLA UTENTE TRAMITE ID
	public void findByIdAndDelete(UUID id) throws NotFoundException {
		User found = this.findById(id);
		userRepository.delete(found);
	}

	// CERCA UTENTE TRAMITE MAIL
	public User findByEmail(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new NotFoundException("Utente con email " + email + " non trovato"));
	}

	public User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Object principal = authentication.getPrincipal();
		if (principal instanceof User) {
			User user = (User) principal;
			String currentUserName = user.getUsername();
			Optional<User> userOptional = userRepository.findByUsername(currentUserName);
			if (userOptional.isPresent()) {
				return userOptional.get();
			}
		}

		throw new NotFoundException("Utente non trovato");
	}

}
