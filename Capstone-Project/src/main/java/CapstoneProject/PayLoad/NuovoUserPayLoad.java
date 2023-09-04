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
//	private Role role;
	private String profilePicture;

}

//	public NuovoUserPayLoad(String email, String password) {
//		this.email = email;
//		this.password = password;
//	}

//	public NuovoUserPayLoad(String username, String email, String password, Role role) {
//		this.username = username;
//		this.email = email;
//		this.password = password;
//		this.role = role;
//	}