package CapstoneProject.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import CapstoneProject.Entities.Event;
import CapstoneProject.Enum.Category;
import CapstoneProject.Enum.Location;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {
	
	List<Event> findByLocation(Location location);

	List<Event> findByCategory(Category category);
	
	List<Event> findByTitleContainingIgnoreCase(String title);

	List<Event> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
	
	List<Event> findByCategoryOrderByDateDesc(Category category);
	
	Page<Event> findByTitleContainingIgnoreCase(String title, Pageable pageable);
	
	Page<Event> findByLocationAndCategoryOrderByDateDesc(Location location, Category category, Pageable pageable);

}
