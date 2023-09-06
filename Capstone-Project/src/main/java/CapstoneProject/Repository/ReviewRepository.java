package CapstoneProject.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import CapstoneProject.Entities.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {

}
