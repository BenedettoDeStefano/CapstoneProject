package CapstoneProject.Entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
public class Event {

	@Id
	@GeneratedValue
	private Long id;

	private String title;
	private String description;
	private LocalDateTime date;
	private String location;
	private String category;

	@ManyToMany(mappedBy = "eventsAttended")
	private List<User> participants = new ArrayList<>();

	@OneToMany(mappedBy = "event")
	private List<Review> reviews = new ArrayList<>();

}
