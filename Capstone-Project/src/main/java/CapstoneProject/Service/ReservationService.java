package CapstoneProject.Service;

import java.time.LocalDateTime;
import java.util.List;
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
		reservation.setConfirmed(false);
		return reservationRepository.save(reservation);
	}

	public boolean confirmReservation(UUID reservationId) {
		Optional<Reservation> optional = reservationRepository.findById(reservationId);
		if (optional.isPresent()) {
			Reservation reservation = optional.get();
			Event event = reservation.getEvent();
			if (event.getSeatsAvailable() <= 0) {
				throw new NotFoundException("Nessun posto disponibile per l'evento con ID: " + event.getId());
			}
			event.setSeatsAvailable(event.getSeatsAvailable() - 1);
			eventService.updateEventFromEntity(event);
			reservation.setConfirmed(true);
			reservationRepository.save(reservation);
			return true;
		}
		return false;
	}

	public boolean deleteReservation(UUID reservationId) {
		Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
		if (!optionalReservation.isPresent()) {
			return false;
		}
		Reservation reservation = optionalReservation.get();
		if (reservation.isConfirmed()) {
			Event event = eventService.getEventById(reservation.getEvent().getId()).orElseThrow(
					() -> new NotFoundException("Evento non trovato con ID: " + reservation.getEvent().getId()));
			event.setSeatsAvailable(event.getSeatsAvailable() + 1);
			eventService.updateEventFromEntity(event);
		}
		reservationRepository.deleteById(reservationId);
		return true;
	}

	public List<Reservation> getReservationsForCurrentUser() {
		User currentUser = userService.getCurrentUser();
		return reservationRepository.findByUser(currentUser);
	}
}
