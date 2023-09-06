package CapstoneProject.PayLoad;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewPayload {
	private int rating;
	private String comment;
	private UUID eventId;
	private UUID reviewerId;
}
