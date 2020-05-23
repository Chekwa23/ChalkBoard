package g13.ChalkboardServer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Assignments
{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int Asid;
	private String Code;
	private String Description;
	public int getAsid()
	{
		return Asid;
	}
	public void setAsid(int asid)
	{
		Asid = asid;
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
	  return "{\n\"Asid\":" + Asid + ",\n"
			  + "\"Code\":\"" + Code + "\",\n"
			  + "\"Description\":\"" + Description + "\"\n}";
  }
}
