package CapstoneProject.Entities;

import java.util.ArrayList;
import java.util.List;

import javax.management.Notification;

import com.fasterxml.jackson.annotation.JsonIgnore;

import Enum.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Id
	@GeneratedValue
	private Long id;

	private String username;
	private String email;

	@JsonIgnore
	private String password;

	@Enumerated(EnumType.STRING)
	private Role role;

	private String profilePicture;

	@OneToMany(mappedBy = "reviewer")
	private List<Review> reviewsMade = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Notification> notifications = new ArrayList<>();

	@ManyToMany
	@JoinTable(name = "user_event", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "event_id"))
	private List<Event> eventsAttended = new ArrayList<>();
}
