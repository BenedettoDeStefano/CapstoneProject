package CapstoneProject.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import CapstoneProject.Entities.Event;
import CapstoneProject.Entities.Notification;
import CapstoneProject.Entities.User;
import CapstoneProject.PayLoad.NotificationPayload;
import CapstoneProject.Repository.EventRepository;
import CapstoneProject.Repository.NotificationRepository;
import CapstoneProject.Repository.UserRepository;

@Service
public class NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;

	@Autowired
	private EventRepository eventRepository;

	@Autowired
	private UserRepository userRepository;

	public Notification createNotificationFromPayload(NotificationPayload notificationPayload) {
		Notification notification = new Notification();

		Optional<Event> event = eventRepository.findById(notificationPayload.getEventId());
		Optional<User> user = userRepository.findById(notificationPayload.getUserId());

		if (event.isPresent() && user.isPresent()) {
			notification.setContent(notificationPayload.getContent());
			notification.setDate(notificationPayload.getDate());
			notification.setEventID(notificationPayload.getEventId());
			notification.setUserID(notificationPayload.getUserId());

			return notificationRepository.save(notification);

		} else {
			throw new RuntimeException("Evento o Utente non trovato.");
		}
	}

	public List<Notification> getAllNotifications() {
		return notificationRepository.findAll();
	}

	public Optional<Notification> getNotificationById(UUID id) {
		return notificationRepository.findById(id);
	}

	public Optional<Notification> updateNotification(UUID id, NotificationPayload notificationPayload) {
		Optional<Notification> existingNotification = notificationRepository.findById(id);

		if (existingNotification.isPresent()) {
			Notification notification = existingNotification.get();

			Optional<Event> event = eventRepository.findById(notificationPayload.getEventId());
			Optional<User> user = userRepository.findById(notificationPayload.getUserId());

			if (event.isPresent() && user.isPresent()) {
				notification.setContent(notificationPayload.getContent());
				notification.setDate(notificationPayload.getDate());
				notification.setEventID(notificationPayload.getEventId());
				notification.setUserID(notificationPayload.getUserId());

				return Optional.of(notificationRepository.save(notification));
			} else {
				throw new RuntimeException("Evento o Utente non trovato durante l'aggiornamento.");
			}
		}
		return Optional.empty();
	}

	public boolean deleteNotification(UUID id) {
		if (notificationRepository.existsById(id)) {
			notificationRepository.deleteById(id);
			return true;
		}
		return false;
	}


	public Notification createNotification(NotificationPayload notificationPayload) {
		Notification notification = new Notification();
		notification.setContent(notificationPayload.getContent());
		notification.setDate(notificationPayload.getDate());

		return notificationRepository.save(notification);
	}
}