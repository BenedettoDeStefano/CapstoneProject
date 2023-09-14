package CapstoneProject.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import CapstoneProject.Entities.Event;
import CapstoneProject.Entities.Reservation;
import CapstoneProject.Entities.User;

public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
	List<Reservation> findByUser(User user);

	List<Reservation> findByEvent(Event event);
}
