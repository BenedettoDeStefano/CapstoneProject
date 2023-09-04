package CapstoneProject.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

//	public boolean existsByUsername(String username) {
//		return userRepository.existsByUsername(username);
//	}

	// SALVA NUOVO UTENTE + ECCEZIONE SE VIENE USATA LA STESSA EMAIL
	public User save(NuovoUserPayLoad body) {
		userRepository.findByEmail(body.getEmail()).ifPresent(utente -> {
			throw new BadRequestException("L'email " + body.getEmail() + " è gia stata utilizzata");
		});
		User newUser = new User(body.getUsername(), body.getEmail(), body.getPassword(), body.getProfilePicture());
		newUser.setRole(Role.USER);

		return userRepository.save(newUser);
	}

	// TORNA LA LISTA DEGLI UTENTI
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	// CERCA UTENTE TRAMITE ID
	public User findById(Long id) throws NotFoundException {
		return userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
	}

	// CERCA E MODIFICA UTENTE TRAMITE ID
	public User findByIdAndUpdate(Long id, NuovoUserPayLoad body) throws NotFoundException {
		User found = this.findById(id);
		found.setEmail(body.getEmail());
		;
		found.setUsername(body.getUsername());
		found.setEmail(body.getEmail());
		return userRepository.save(found);
	}

	// CERCA E CANCELLA UTENTE TRAMITE ID
	public void findByIdAndDelete(Long id) throws NotFoundException {
		User found = this.findById(id);
		userRepository.delete(found);
	}

	// CERCA UTENTE TRAMITE MAIL
	public User findByEmail(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new NotFoundException("Utente con email " + email + " non trovato"));
	}

}
