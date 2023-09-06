package CapstoneProject.Controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CapstoneProject.Entities.Event;
import CapstoneProject.Enum.Category;
import CapstoneProject.Enum.Location;
import CapstoneProject.PayLoad.EventPayload;
import CapstoneProject.Service.EventService;

@RestController
@RequestMapping("/events")
public class EventController {
	@Autowired
	private EventService eventService;

	// Crea un nuovo evento
	@PostMapping
	public ResponseEntity<Event> createEvent(@RequestBody EventPayload eventPayload) {
		Event newEvent = eventService.createEventFromPayload(eventPayload);
		return new ResponseEntity<>(newEvent, HttpStatus.CREATED);
	}

	// Ottieni tutti gli eventi
	@GetMapping
	public ResponseEntity<List<Event>> getAllEvents() {
		List<Event> events = eventService.getAllEvents();
		return ResponseEntity.ok(events);
	}

	// Ottieni un evento per ID
	@GetMapping("/{id}")
	public ResponseEntity<Event> getEventById(@PathVariable UUID id) {
		Optional<Event> eventOptional = eventService.getEventById(id);
		if (eventOptional.isPresent()) {
			return ResponseEntity.ok(eventOptional.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Aggiorna un evento per ID
	@PutMapping("/{id}")
	public ResponseEntity<Event> updateEvent(@PathVariable UUID id, @RequestBody EventPayload eventPayload) {
		Optional<Event> updatedEvent = eventService.updateEvent(id, eventPayload);
		if (updatedEvent.isPresent()) {
			return ResponseEntity.ok(updatedEvent.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Elimina un evento per ID
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteEvent(@PathVariable UUID id) {
		if (eventService.deleteEvent(id)) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
//**************************EXTRA********************************

	// LOCATION ESISTENTI
	@GetMapping("/locations")
	public ResponseEntity<Location[]> getAvailableLocations() {
		return new ResponseEntity<>(Location.values(), HttpStatus.OK);
	}
		
	@GetMapping("/categories")
	public ResponseEntity<Category[]> getAvailableCategories() {
		return new ResponseEntity<>(Category.values(), HttpStatus.OK);

	}

}
