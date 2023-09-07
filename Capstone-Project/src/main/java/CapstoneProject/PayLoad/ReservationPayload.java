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
public class ReservationPayload {

	private UUID userId;
	private UUID eventId;
	private LocalDateTime reservationDate;
	private boolean isConfirmed;

}