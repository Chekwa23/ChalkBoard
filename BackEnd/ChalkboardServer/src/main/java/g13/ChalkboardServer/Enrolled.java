package g13.ChalkboardServer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Enrolled
{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int Eid;
	private String Username;
	private String Code;
	private int Gradepoint;
	public int getEid() {
		return Eid;
	}
	public void setEid(int eid) {
		Eid = eid;
	}
	public String getUsername() {
		return Username;
	}
	public void setUsername(String username) {
		Username = username;
	}
	public String getCode() {
		return Code;
	}
	public void setCode(String code) {
		Code = code;
	}
	public int getGradepoint() {
		return Gradepoint;
	}
	public void setGradepoint(int gradepoint) {
		Gradepoint = gradepoint;
	}
	@Override
	  public String toString()
	  {
		  return "{\n\"Eid\":" + Eid +",\n"
				  + "\"Username\":\"" + Username +"\",\n"
				  + "\"Code\":\"" + Code + "\",\n"
				  +"\"Gradepoint\":" + Gradepoint
				  + "\n}";
	  }
}
