package CapstoneProject.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import CapstoneProject.Entities.Event;
import CapstoneProject.Entities.Reservation;
import CapstoneProject.Entities.User;
import CapstoneProject.Exception.NotFoundException;
import CapstoneProject.PayLoad.ReservationPayload;
import CapstoneProject.Repository.ReservationRepository;

@Service
public class ReservationService {

	@Autowired
	private ReservationRepository reservationRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private EventService eventService;

	public Reservation reserveTicket(ReservationPayload payload) {
		User user = userService.findById(payload.getUserId());
		Event event = eventService.getEventById(payload.getEventId())
				.orElseThrow(() -> new NotFoundException("Evento non trovato con ID: " + payload.getEventId()));

		Reservation reservation = new Reservation();
		reservation.setUser(user);
		reservation.setEvent(event);
		reservation.setReservationDate(
				payload.getReservationDate() != null ? payload.getReservationDate() : LocalDateTime.now());
		reservation.setConfirmed(payload.isConfirmed());
		return reservationRepository.save(reservation);
	}

	public boolean confirmReservation(UUID reservationId) {
		Optional<Reservation> optional = reservationRepository.findById(reservationId);
		if (optional.isPresent()) {
			Reservation reservation = optional.get();
			reservation.setConfirmed(true);
			reservationRepository.save(reservation);
			return true;
		}
		return false;
	}

	public boolean deleteReservation(UUID reservationId) {
		Optional<Reservation> optional = reservationRepository.findById(reservationId);
		if (optional.isPresent()) {
			reservationRepository.deleteById(reservationId);
			return true;
		} else {
			throw new NotFoundException("Reservation not found with ID: " + reservationId);
		}
	}
}
