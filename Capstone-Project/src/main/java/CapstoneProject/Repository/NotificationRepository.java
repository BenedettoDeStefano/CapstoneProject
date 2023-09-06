package CapstoneProject.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import CapstoneProject.Entities.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {

}
