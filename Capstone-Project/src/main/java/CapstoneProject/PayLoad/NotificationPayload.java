package CapstoneProject.PayLoad;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationPayload {

	private String content;
	private LocalDateTime date;
	private UUID eventId;
	private UUID userId;

}
