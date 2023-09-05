package CapstoneProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import CapstoneProject.Entities.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
