package CapstoneProject.Controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CapstoneProject.Entities.Reservation;
import CapstoneProject.PayLoad.ReservationPayload;
import CapstoneProject.Service.ReservationService;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

	@Autowired
	private ReservationService reservationService;

	@PostMapping("/reserve")
	public ResponseEntity<Reservation> reserveTicket(@RequestBody ReservationPayload payload) {
		Reservation reservation = reservationService.reserveTicket(payload);
		return new ResponseEntity<>(reservation, HttpStatus.CREATED);
	}

	@PostMapping("/confirm")
	public ResponseEntity<String> confirmReservation(@RequestParam UUID reservationId) {
		boolean success = reservationService.confirmReservation(reservationId);
		if (success) {
			return new ResponseEntity<>("Prenotazione confermata", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Errore nella conferma", HttpStatus.BAD_REQUEST);
		}
	}

}