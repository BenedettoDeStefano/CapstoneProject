package CapstoneProject.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import CapstoneProject.Entities.Event;
import CapstoneProject.Entities.Review;
import CapstoneProject.Entities.User;
import CapstoneProject.PayLoad.ReviewPayload;
import CapstoneProject.Repository.EventRepository;
import CapstoneProject.Repository.ReviewRepository;
import CapstoneProject.Repository.UserRepository;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;

	@Autowired
	private EventRepository eventRepository;

	@Autowired
	private UserRepository userRepository;


	public Review createReviewFromPayload(ReviewPayload reviewPayload) {
		Review review = new Review();

		Optional<Event> event = eventRepository.findById(reviewPayload.getEventId());
		Optional<User> reviewer = userRepository.findById(reviewPayload.getReviewerId());
		
		
		if (event.isPresent() && reviewer.isPresent()) {
			review.setRating(reviewPayload.getRating());
			review.setComment(reviewPayload.getComment());
			review.setEventID(reviewPayload.getEventId());
			review.setUserID(reviewPayload.getReviewerId());

			return reviewRepository.save(review);

		} else {
			throw new RuntimeException("Event or Reviewer not found.");
		}
	}


	public List<Review> getAllReviews() {
		return reviewRepository.findAll();
	}

	public Optional<Review> getReviewById(UUID id) {
		return reviewRepository.findById(id);
	}

	public Optional<Review> updateReview(UUID id, ReviewPayload reviewPayload) {
		Optional<Review> existingReview = reviewRepository.findById(id);

		if (existingReview.isPresent()) {
			Review review = existingReview.get();

			Optional<Event> event = eventRepository.findById(reviewPayload.getEventId());
			Optional<User> reviewer = userRepository.findById(reviewPayload.getReviewerId());

			if (event.isPresent() && reviewer.isPresent()) {
				review.setRating(reviewPayload.getRating());
				review.setComment(reviewPayload.getComment());
				review.setEventID(reviewPayload.getEventId());
				review.setUserID(reviewPayload.getReviewerId());

				return Optional.of(reviewRepository.save(review));
			} else {

				throw new RuntimeException("Event or Reviewer not found during update.");
			}
		}
		return Optional.empty();
	}

	public boolean deleteReview(UUID id) {
		if (reviewRepository.existsById(id)) {
			reviewRepository.deleteById(id);
			return true;
		}
		return false;
	}

}
