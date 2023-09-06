package CapstoneProject.Entities;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Review {

	@Id
	@GeneratedValue
	private UUID id;

	private int rating;
	private String comment;

//	@ManyToOne
//	@JoinColumn(name = "event_id")
//	private Event event;
	

	private UUID eventID;

//	@ManyToOne
//	@JoinColumn(name = "reviewer_id")
//	private User reviewer;
	
	private UUID userID;


}
