package CapstoneProject.Controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CapstoneProject.Entities.Event;
import CapstoneProject.Enum.Category;
import CapstoneProject.Enum.Location;
import CapstoneProject.PayLoad.EventPayload;
import CapstoneProject.Repository.EventRepository;
import CapstoneProject.Service.EventService;

@RestController
@RequestMapping("/events")
public class EventController {

	@Autowired
	private EventRepository eventRepository;

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

	// **********Filtrati/Ordinati**********
	@GetMapping("/byTitle")
	public List<Event> getEventsByTitle(@RequestParam String title) {
		return eventRepository.findByTitleContainingIgnoreCase(title);
	}

	@GetMapping("/byDateRange")
	public List<Event> getEventsByDateRange(@RequestParam String startDateStr, @RequestParam String endDateStr) {
		LocalDateTime startDate = LocalDateTime.parse(startDateStr);
		LocalDateTime endDate = LocalDateTime.parse(endDateStr);
		return eventRepository.findByDateBetween(startDate, endDate);
	}

	@GetMapping("/byCategoryOrderByDateDesc")
	public List<Event> getEventsByCategoryOrderByDateDesc(@RequestParam Category category) {
		return eventRepository.findByCategoryOrderByDateDesc(category);
	}

	@GetMapping("/paginatedByTitle")
	public Page<Event> getPaginatedEventsByTitle(@RequestParam String title, Pageable pageable) {
		return eventRepository.findByTitleContainingIgnoreCase(title, pageable);
	}

	@GetMapping("/events/byLocationAndCategory")
	public List<Event> getEventsByLocationAndCategory(@RequestParam Location location,
			@RequestParam Category category) {
		return eventRepository.findByLocationAndCategoryOrderByDateDesc(location, category);
	}

	@GetMapping("/paginatedByLocation")
	public ResponseEntity<Page<Event>> getPaginatedEventsByLocation(@RequestParam Location location,
			Pageable pageable) {
		Page<Event> events = eventRepository.findByLocation(location, pageable);
		return ResponseEntity.ok(events);
	}

	// **********Location/Categories Esistenti**********
	@GetMapping("/locations")
	public ResponseEntity<Location[]> getAvailableLocations() {
		return new ResponseEntity<>(Location.values(), HttpStatus.OK);
	}
		
	@GetMapping("/categories")
	public ResponseEntity<Category[]> getAvailableCategories() {
		return new ResponseEntity<>(Category.values(), HttpStatus.OK);

	}

	// **********Condivisione social network**********
	@GetMapping("/share/{eventId}")
	public ResponseEntity<Map<String, String>> getEventShareInfo(@PathVariable UUID eventId) {

		Optional<Event> eventOptional = eventService.getEventById(eventId);

		if (eventOptional.isPresent()) {
			Event event = eventOptional.get();


			String title = event.getTitle();
			String description = event.getDescription();
			String imageUrl = event.getImageURL();
			String url = "URL dell'evento";
//			String riferimento = eventId.toString();


			Map<String, String> shareInfo = new HashMap<>();
			shareInfo.put("title", title);
			shareInfo.put("description", description);
			shareInfo.put("image_url", imageUrl);
			shareInfo.put("url", url);
//			shareInfo.put("riferimento", riferimento);


			HttpHeaders headers = new HttpHeaders();
			headers.add("og:title", title);
			headers.add("og:description", description);
			headers.add("og:image", imageUrl);
			headers.add("og:url", url);
//			headers.add("og:riferimento", riferimento);

			return ResponseEntity.ok().headers(headers).body(shareInfo);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
