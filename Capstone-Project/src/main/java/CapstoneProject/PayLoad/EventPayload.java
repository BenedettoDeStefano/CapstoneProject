package CapstoneProject.PayLoad;

import java.time.LocalDateTime;

import CapstoneProject.Enum.Category;
import CapstoneProject.Enum.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventPayload {

	private String title;
	private String description;
	private LocalDateTime date;
	private String imageURL;
	private Location location;
	private Category category;
	private int totalSeats;
}
