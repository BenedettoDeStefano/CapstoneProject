package CapstoneProject.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import CapstoneProject.Entities.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {

}
