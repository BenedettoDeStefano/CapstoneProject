package CapstoneProject.Exception;

public class NotFoundException extends RuntimeException {

	public NotFoundException(String message) {
		super(message);
	}

	public NotFoundException(Long id) {
		super("ID non trovato");
	}

}
