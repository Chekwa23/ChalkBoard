package g13.ChalkboardServer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Notes
{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int Nid;
	private String Code;
	private String Name;
	private String Link;
	public int getNid()
	{
		return Nid;
	}
	public void setNid(int nid)
	{
		Nid = nid;
	}
	public String getCode() {
		return Code;
	}
	public void setCode(String code) {
		Code = code;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getLink() {
		return Link;
	}
	public void setLink(String link) {
		Link = link;
	}
  @Override
  public String toString()
  {
	  return "{\n\"Nid\":" + Nid + ",\n"
			  + "\"Code\":\"" + Code + "\",\n"
			  + "\"Name\":\"" + Name + "\",\n"
			  + "\"Link\":\"" + Link + "\"\n}";
  }
}