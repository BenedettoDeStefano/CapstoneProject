package CapstoneProject.Controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CapstoneProject.Entities.User;
import CapstoneProject.Exception.NotFoundException;
import CapstoneProject.PayLoad.NuovoUserPayLoad;
import CapstoneProject.Service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userService.getUsers();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable UUID id) throws NotFoundException {
		User user = userService.findById(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateUserById(@PathVariable UUID id, @RequestBody NuovoUserPayLoad userPayload)
			throws NotFoundException {
		User updatedUser = userService.findByIdAndUpdate(id, userPayload);
		return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUserById(@PathVariable UUID id) throws NotFoundException {
		userService.findByIdAndDelete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/by-email/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email) throws NotFoundException {
		User user = userService.findByEmail(email);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
}