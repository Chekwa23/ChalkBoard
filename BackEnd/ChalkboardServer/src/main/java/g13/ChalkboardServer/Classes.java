package g13.ChalkboardServer;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Classes
{
	@Id
	private String Code;
	private String Name;
	private String Description;
	private int Total;
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
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public int getTotal() {
		return Total;
	}
	public void setTotal(int total) {
		Total = total;
	}
	@Override
	  public String toString()
	  {
		  return "{\n\"Code\":" + "\""+ Code 
				  +"\",\n" + "\"Name\":\"" 
				  + Name + "\",\n" 
				  +"\"Description\":\"" + Description
				  +"\",\n\"TotalPoints\":" + Total
				  + "\n}";
	  }
}
