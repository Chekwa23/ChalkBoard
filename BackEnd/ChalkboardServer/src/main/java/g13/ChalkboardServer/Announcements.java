package g13.ChalkboardServer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Announcements
{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int Anid;
	private String Code;
	private String Description;
	public int getAnid()
	{
		return Anid;
	}
	public void setAnid(int anid)
	{
		Anid = anid;
	}
	public String getCode() {
		return Code;
	}
	public void setCode(String code) {
		Code = code;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	 @Override
	  public String toString()
	  {
		  return "{\n\"Asid\":" + Anid + ",\n"
				  + "\"Code\":\"" + Code + "\",\n"
				  + "\"Description\":\"" + Description + "\"\n}";
	  }
}
