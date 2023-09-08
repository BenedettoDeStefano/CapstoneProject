package CapstoneProject.PayLoad;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NuovoUserPayLoad {

	private String username;
	private String email;
	private String password;
	private String profilePicture;

}
