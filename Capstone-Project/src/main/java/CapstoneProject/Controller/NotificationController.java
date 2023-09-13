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

import CapstoneProject.Entities.Notification;
import CapstoneProject.PayLoad.NotificationPayload;
import CapstoneProject.Service.NotificationService;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

	@Autowired
	private NotificationService notificationService;

	@PostMapping
	public ResponseEntity<Notification> createNotification(@RequestBody NotificationPayload notificationPayload) {
		Notification newNotification = notificationService.createNotificationFromPayload(notificationPayload);
		return new ResponseEntity<>(newNotification, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Notification>> getAllNotifications() {
		List<Notification> notifications = notificationService.getAllNotifications();
		return ResponseEntity.ok(notifications);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Notification> getNotificationById(@PathVariable UUID id) {
		Optional<Notification> notificationOptional = notificationService.getNotificationById(id);
		return notificationOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}")
	public ResponseEntity<Notification> updateNotification(@PathVariable UUID id,
			@RequestBody NotificationPayload notificationPayload) {
		Optional<Notification> updatedNotification = notificationService.updateNotification(id, notificationPayload);
		return updatedNotification.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteNotification(@PathVariable UUID id) {
		if (notificationService.deleteNotification(id)) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/global")
	public ResponseEntity<Notification> createNotificationGlobal(@RequestBody NotificationPayload notificationPayload) {
		Notification newNotification = notificationService.createNotification(notificationPayload);
		return new ResponseEntity<>(newNotification, HttpStatus.CREATED);
	}
}