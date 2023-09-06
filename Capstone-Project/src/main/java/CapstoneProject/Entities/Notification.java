package CapstoneProject.Entities;

import java.time.LocalDateTime;
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
public class Notification {

	@Id
	@GeneratedValue
	private UUID id;

	private String content;
	private LocalDateTime date;
	private UUID eventID;
	private UUID userID;

//	@ManyToOne
//	@JoinColumn(name = "user_id")
//	private User user;
//
//	@ManyToOne
//	@JoinColumn(name = "event_id")
//	private Event relatedEvent;

}
