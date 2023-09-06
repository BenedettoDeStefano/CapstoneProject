package CapstoneProject.Entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import CapstoneProject.Enum.Category;
import CapstoneProject.Enum.Location;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
	private UUID id;

	private String title;
	private String description;
	private LocalDateTime date;
	private String imageURL;

	@Enumerated(EnumType.STRING)
	private Location location;

	@Enumerated(EnumType.STRING)
	private Category category;

	@ManyToMany(mappedBy = "eventsAttended")
	private List<User> participants = new ArrayList<>();

	@OneToMany
	private List<Review> reviews = new ArrayList<>();

}
