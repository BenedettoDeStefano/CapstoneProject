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

import CapstoneProject.Entities.Review;
import CapstoneProject.PayLoad.ReviewPayload;
import CapstoneProject.Service.ReviewService;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;

	@PostMapping
	public ResponseEntity<Review> createReview(@RequestBody ReviewPayload reviewPayload) {
		Review newReview = reviewService.createReviewFromPayload(reviewPayload);
		return new ResponseEntity<>(newReview, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Review>> getAllReviews() {
		List<Review> reviews = reviewService.getAllReviews();
		return ResponseEntity.ok(reviews);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Review> getReviewById(@PathVariable UUID id) {
		Optional<Review> reviewOptional = reviewService.getReviewById(id);
		return reviewOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}")
	public ResponseEntity<Review> updateReview(@PathVariable UUID id, @RequestBody ReviewPayload reviewPayload) {
		Optional<Review> updatedReview = reviewService.updateReview(id, reviewPayload);
		return updatedReview.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteReview(@PathVariable UUID id) {
		if (reviewService.deleteReview(id)) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
