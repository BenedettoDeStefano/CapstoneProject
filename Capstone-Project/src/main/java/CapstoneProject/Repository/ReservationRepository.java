package CapstoneProject.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import CapstoneProject.Entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, UUID> {

}
