package g13.ChalkboardServer;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity // This tells Hibernate to make a table out of this class
public class Users
{
	private String Lname;
	private String Fname;
	private String Role;
	private String Email;
	@Id
  private String Username;
  private String Password;
  /*
  @OneToOne(fetch = FetchType.LAZY,
          cascade =  CascadeType.ALL,
          mappedBy = "user")
  private Stats stat;
  */

  @Override
  public String toString()
  {
	  return "{\n\"Lname\":\"" + Lname + "\",\n"
			  + "\"Fname\":\"" + Fname + "\",\n"
			  + "\"Role\":\"" + Role + "\",\n"
			  + "\"Email\":\"" + Email + "\",\n"
			  + "\"Username\":\"" + Username + "\",\n"
			  + "\"Password\":\"" + Password + "\"\n"
			  + "}";
  }
	public String getLname() {
		return Lname;
	}
	public void setLname(String lname) {
		Lname = lname;
	}
	public String getFname() {
		return Fname;
	}
	public void setFname(String fname) {
		Fname = fname;
	}
	public String getRole() {
		return Role;
	}
	public void setRole(String role) {
		Role = role;
	}
	public String getEmail() {
		return Email;
	}
	public void setEmail(String email) {
		Email = email;
	}
	public String getUsername() {
		return Username;
	}
	public void setUsername(String username) {
		Username = username;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
}