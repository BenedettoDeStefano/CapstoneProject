package CapstoneProject.Exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionsHandler {

	@ExceptionHandler(BadRequestException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorPayload handleBadRequest(BadRequestException e) {
		return new ErrorPayload(e.getMessage(), new Date());
	}

	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorPayload handleNotFound(NotFoundException e) {
		return new ErrorPayload(e.getMessage(), new Date());
	}

	@ExceptionHandler(UnauthorizedException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorPayload handleUnauthorized(UnauthorizedException e) {
		return new ErrorPayload(e.getMessage(), new Date());
	}
	
	@ExceptionHandler(AccessDeniedException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ErrorPayload handleAccessDenied(AccessDeniedException e) {
		return new ErrorPayload("Access Denied", new Date());
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<String> handleInvalidEnumValue(Exception ex) {
		return new ResponseEntity<>("Invalid location value provided.", HttpStatus.BAD_REQUEST);
	}

}
