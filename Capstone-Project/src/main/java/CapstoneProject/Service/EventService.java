package CapstoneProject.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import CapstoneProject.Entities.Event;
import CapstoneProject.PayLoad.EventPayload;
import CapstoneProject.Repository.EventRepository;

@Service
public class EventService {

	@Autowired
    private EventRepository eventRepository;

	// Crea un evento
	public Event createEventFromPayload(EventPayload eventPayload) {
		Event newEvent = new Event();
		newEvent.setTitle(eventPayload.getTitle());
		newEvent.setDescription(eventPayload.getDescription());
		newEvent.setDate(eventPayload.getDate());
		newEvent.setImageURL(eventPayload.getImageURL());
		newEvent.setLocation(eventPayload.getLocation());
		newEvent.setCategory(eventPayload.getCategory());
		newEvent.setTotalSeats(eventPayload.getTotalSeats());
		newEvent.setSeatsAvailable(eventPayload.getTotalSeats());
		return eventRepository.save(newEvent);
    }

	// Ottieni tutti gli eventi
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

	// Ottieni un evento per ID
	public Optional<Event> getEventById(UUID id) {
		return eventRepository.findById(id);
    }

	// Aggiorna un evento utilizzando un DTO (EventPayload)
	public Optional<Event> updateEvent(UUID id, EventPayload eventPayload) {
		Optional<Event> eventOptional = eventRepository.findById(id);
		if (eventOptional.isPresent()) {
			Event eventToUpdate = eventOptional.get();
			eventToUpdate.setTitle(eventPayload.getTitle());
			eventToUpdate.setDescription(eventPayload.getDescription());
			eventToUpdate.setDate(eventPayload.getDate());
			eventToUpdate.setImageURL(eventPayload.getImageURL());
			eventToUpdate.setLocation(eventPayload.getLocation()); // Anche qui accetta un enum
			eventToUpdate.setCategory(eventPayload.getCategory());
			eventToUpdate.setTotalSeats(eventPayload.getTotalSeats());
			eventToUpdate.setSeatsAvailable(eventPayload.getTotalSeats());
			eventRepository.save(eventToUpdate);
			return Optional.of(eventToUpdate);
        }
		return Optional.empty();
    }

	// Elimina un evento
	public boolean deleteEvent(UUID id) {
		if (eventRepository.existsById(id)) {
			eventRepository.deleteById(id);
			return true;
		}
		return false;
    }

	public Event updateEventFromEntity(Event event) {
		return eventRepository.save(event);
	}
}
