package g13.ChalkboardServer;

import java.util.ArrayList;
import java.util.Iterator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/Chalkboard")
public class RestController
{
	@Autowired
	private UsersRepository ur;
	@Autowired
	private ClassesRepository cr;
	@Autowired
	private EnrolledRepository er;
	@Autowired
	private AnnouncementsRepository anr;
	@Autowired
	private AssignmentsRepository asr;
	@Autowired
	private NotesRepository nr;
	
	/**
	 * login as instructor or student
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/Login")
  public @ResponseBody String LoginUser (@RequestParam String Username
			,@RequestParam String Password)
  {
	//make sure the username is correct and the password matches the user
	//User u = validateLogin(Username, Password);
	Users u = validateLogin(Username, Password);
	//if user or pw is invalid return with that info
	if (u == null)
	{
	return "Invalid Username or Password\n";
	}
	
	//return this user's info
	return u.toString();
  }
	@CrossOrigin
	@GetMapping(path="/TEST/Login")
  public @ResponseBody String TESTLoginUser ()
  {
	//make sure the username is correct and the password matches the user
	//User u = validateLogin(Username, Password);
	Users u = validateLogin("jgos", "123");
	//if user or pw is invalid return with that info
	if (u == null)
	{
	return "Invalid Username or Password\n";
	}
	
	//return this user's info
	return u.toString();
  }
	
	/**
	 * view all classes
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/ViewClasses")
	  public @ResponseBody String viewClasses (@RequestParam String Username
				,@RequestParam String Password)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Username or Password\n";
		}
		
		//return this user's info
		return cr.findAll().toString();
	 }
	
	@CrossOrigin
	@GetMapping(path="/TEST/ViewClasses")
	  public @ResponseBody String TESTviewClasses ()
	  {
		//return this user's info
		return cr.findAll().toString();
	 }
	
	/**
	 * view all classes this user is enrolled in
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/ViewEnrolled")
	  public @ResponseBody String viewEnrolled (@RequestParam String Username
				,@RequestParam String Password)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Username or Password\n";
		}
		
		//get all enrolled records
		Iterator<Enrolled> allEnrolled = er.findAll().iterator();
		//get all enrolled by current user
		ArrayList<Classes> userClasses = new ArrayList<>();
		//add all classes this user is enrolled in
		while (allEnrolled.hasNext())
		{
			//get current class
			Enrolled cur = allEnrolled.next();
			//check if this user is enrolled
			if (cur.getUsername().equals(u.getUsername()))
			{
				//add class to the list
				userClasses.add(cr.findById(cur.getCode()).orElse(null));
			}
		}
		//return this user's info
		return userClasses.toString();
	 }
	
	/**
	 * view all enrolled records for a given student
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/ViewEnrolledRecords")
	  public @ResponseBody String viewEnrolledRecords (@RequestParam String Username
				,@RequestParam String Password)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Username or Password\n";
		}
		
		//get all enrolled records
		Iterator<Enrolled> allEnrolled = er.findAll().iterator();
		//get all enrolled by current user
		ArrayList<Enrolled> userEnrolled = new ArrayList<>();
		//add all classes this user is enrolled in
		while (allEnrolled.hasNext())
		{
			//get current class
			Enrolled cur = allEnrolled.next();
			//check if this user is enrolled
			if (cur.getUsername().equals(u.getUsername()))
			{
				//add class to the list
				userEnrolled.add(cur);
			}
		}
		//return this user's info
		return userEnrolled.toString();
	 }
	
	/**
	 * add a student to a class
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/AddEnrolled")
	  public @ResponseBody String addEnrolled (@RequestParam String Username
				,@RequestParam String Password, @RequestParam String userToAdd, @RequestParam String Code)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		Users stu = ur.findById(userToAdd).orElse(null);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Enroller Username or Password\n";
		}
		if (stu == null)
		{
			return "Invalid Enrollee Username\n";
		}
		if (c == null)
		{
			return "Invalid class id\n";
		}
		//if user is a student but the username to add isn't their own
		if (u.getRole().equals("student") && !u.getUsername().equals(userToAdd))
		{
			return "Student can only add themselves to a class";
		}
		
		Enrolled e = new Enrolled();
		e.setCode(Code);
		e.setUsername(stu.getUsername());
		e.setGradepoint(100);
		er.save(e);
		//return this user's info
		return "User successfully added to class";
	 }
	
	/**
	 * get an enrolled record for a given student and class
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/GetEnrolled")
	  public @ResponseBody String getEnrolled (@RequestParam String Username
				,@RequestParam String Password, @RequestParam String Code)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Enroller Username or Password\n";
		}
		if (c == null)
		{
			return "Invalid class id\n";
		}
		Enrolled e = findEnrolledByUsernameCode(Username, Code);
		//return this user's info
		return e.toString();
	 }
	
	
	/**
	 * add a student to a class
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/DeleteEnrolled")
	  public @ResponseBody String deleteEnrolled (@RequestParam String Username
				,@RequestParam String Password, @RequestParam String studentUsername, @RequestParam String Code)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		Users stu = ur.findById(studentUsername).orElse(null);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Username or Password\n";
		}
		if (stu == null)
		{
			return "Invalid user to add Username\n";
		}
		if (c == null)
		{
			return "Invalid class id\n";
		}
		//if user is a student but the username to add isn't their own
		if (u.getRole().equals("student") && !u.getUsername().equals(studentUsername))
		{
			return "Student can only delete themselves from a class";
		}
		
		Enrolled e = findEnrolledByUsernameCode(studentUsername,Code);
		if (e == null)
		{
			return "invalid class or user id";
		}
		er.delete(e);
		//return this user's info
		return "User successfully deleted from class";
	 }

	/**
	 * add a new class to the database
	 * @param Cid
	 * @param Name
	 * @param Description
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/AddClass")
	  public @ResponseBody String addClass (@RequestParam String Username, @RequestParam String Password,
			  								@RequestParam String Code, @RequestParam String Name, @RequestParam String Description,
			  								@RequestParam int Total)
	  {
		Users u = validateLogin(Username, Password);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Username or Password\n";
		}
		if (!u.getRole().equals("instructor"))
		{
			return "Only instructors can add classes to the master list";
		}
		//check if class exists
		Classes c = cr.findById(Code).orElse(null);
		if (c != null)
		{
			return "Class already exists\n";
		}
		//create new class and add
		Classes n = new Classes();
		n.setCode(Code);
		n.setName(Name);
		n.setDescription(Description);
		n.setTotal(Total);
		cr.save(n);
		return "Class successfully added\n";
	  }
	
	/**
	 * delete class to the database
	 * @param Cid
	 * @param Name
	 * @param Description
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/DeleteClass")
	  public @ResponseBody String deleteClass (@RequestParam String Username, @RequestParam String Password,
			  								@RequestParam String Code)
	  {
		Users u = validateLogin(Username, Password);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Username or Password\n";
		}
		if (!u.getRole().equals("instructor"))
		{
			return "Only instructors can remove classes from the master list";
		}
		//check if class exists
		Classes c = cr.findById(Code).orElse(null);
		if (c == null)
		{
			return "Invalid class ID\n";
		}
		//delete class
		cr.delete(c);
		return "Class successfully deleted\n";
	  }
	
	/**
	 * add an announcement
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/AddAnnouncement")
	  public @ResponseBody String addAnnouncement (@RequestParam String Username
				,@RequestParam String Password,  @RequestParam String Code, @RequestParam String Description)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Enroller Username or Password\n";
		}
		if (c == null)
		{
			return "Invalid class id\n";
		}
		Announcements a = new Announcements();
		a.setCode(Code);
		a.setDescription(Description);
		anr.save(a);
		//return this user's info
		return "Successfully added announcement";
	 }
	
	/**
	 * add an assignment
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/AddAssignment")
	  public @ResponseBody String addAssignment (@RequestParam String Username
				,@RequestParam String Password,  @RequestParam String Code, @RequestParam String Description)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Enroller Username or Password\n";
		}
		if (c == null)
		{
			return "Invalid class id\n";
		}
		Assignments a = new Assignments();
		a.setCode(Code);
		a.setDescription(Description);
		asr.save(a);
		//return this user's info
		return "Successfully added assignment";
	 }
	
	/**
	 * add an note record
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/AddNote")
	  public @ResponseBody String addNote (@RequestParam String Username
				,@RequestParam String Password,  @RequestParam String Code, @RequestParam String Name, @RequestParam String Link)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Enroller Username or Password\n";
		}
		if (c == null)
		{
			return "Invalid class id\n";
		}
		Notes n = new Notes();
		n.setCode(Code);
		n.setName(Name);
		n.setLink(Link);
		nr.save(n);
		//return this user's info
		return "Successfully added note";
	 }
	
	/**
	 * get all announcements for a given class
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/ViewAnnouncements")
	  public @ResponseBody String viewAnnouncements (@RequestParam String Username
				,@RequestParam String Password,  @RequestParam String Code)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Enroller Username or Password\n";
		}
		if (c == null)
		{
			return "Invalid class id\n";
		}
		//get all enrolled records
		Iterator<Announcements> allAnnouncements = anr.findAll().iterator();
		//get all enrolled by current user
		ArrayList<Announcements> announcementsByClass = new ArrayList<>();
		//add all classes this user is enrolled in
		while (allAnnouncements.hasNext())
		{
			//get current class
			Announcements cur = allAnnouncements.next();
			//check if this user is enrolled
			if (cur.getCode().equals(Code))
			{
				//add class to the list
				announcementsByClass.add(cur);
			}
		}
		return announcementsByClass.toString();
	 }
	
	/**
	 * get all assignments for a given class
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/ViewAssignments")
	  public @ResponseBody String viewAssignments (@RequestParam String Username
				,@RequestParam String Password,  @RequestParam String Code)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Enroller Username or Password\n";
		}
		if (c == null)
		{
			return "Invalid class id\n";
		}
		//get all enrolled records
		Iterator<Assignments> allAssignments = asr.findAll().iterator();
		//get all enrolled by current user
		ArrayList<Assignments> assignmentsByClass = new ArrayList<>();
		//add all classes this user is enrolled in
		while (allAssignments.hasNext())
		{
			//get current class
			Assignments cur = allAssignments.next();
			//check if this user is enrolled
			if (cur.getCode().equals(Code))
			{
				//add class to the list
				assignmentsByClass.add(cur);
			}
		}
		return assignmentsByClass.toString();
	 }
	
	/**
	 * get all notes for a given class
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/ViewNotes")
	  public @ResponseBody String viewNotes (@RequestParam String Username
				,@RequestParam String Password,  @RequestParam String Code)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Enroller Username or Password\n";
		}
		if (c == null)
		{
			return "Invalid class id\n";
		}
		//get all enrolled records
		Iterator<Notes> allNotes = nr.findAll().iterator();
		//get all enrolled by current user
		ArrayList<Notes> notesByClass = new ArrayList<>();
		//add all classes this user is enrolled in
		while (allNotes.hasNext())
		{
			//get current class
			Notes cur = allNotes.next();
			//check if this user is enrolled
			if (cur.getCode().equals(Code))
			{
				//add class to the list
				notesByClass.add(cur);
			}
		}
		return notesByClass.toString();
	 }
	
	/**
	 * get all asnnouncements for every class that a user is enrolled in
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/ViewAllUserAnnouncements")
	  public @ResponseBody String viewAllUserAnnouncements (@RequestParam String Username
				,@RequestParam String Password)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Enroller Username or Password\n";
		}
		//get all enrolled records
		Iterator<Enrolled> allEnrolled = er.findAll().iterator();
		//get all enrolled by current user
		ArrayList<Enrolled> userEnrolled = new ArrayList<>();
		//add all classes this user is enrolled in
		while (allEnrolled.hasNext())
		{
			//get current class
			Enrolled cur = allEnrolled.next();
			//check if this user is enrolled
			if (cur.getUsername().equals(u.getUsername()))
			{
				//add class to the list
				userEnrolled.add(cur);
			}
		}
		//get all class codes for user's enrolled classes
		ArrayList<String> classCodes = new ArrayList<>();
		for (int i = 0; i < userEnrolled.size(); i++)
		{
			//add the class codes to the list
			classCodes.add(userEnrolled.get(i).getCode());
		}
		//get all assignments
		Iterator<Announcements> allAnnouncements = anr.findAll().iterator();
		//make a list of assignments to send
		ArrayList<Announcements> userAnnouncements = new ArrayList<>();
		while (allAnnouncements.hasNext())
		{
			//get the next assignment
			Announcements cur = allAnnouncements.next();
			//if the current class code is in the list of enrolled class codes
			if (classCodes.contains(cur.getCode()))
			{
				//add the current assignments to the list
				userAnnouncements.add(cur);
			}
		}
		return userAnnouncements.toString();
	 }
	
	/**
	 * get all assignments for every class that a user is enrolled in
	 * @param Username
	 * @param Password
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/ViewAllUserAssignments")
	  public @ResponseBody String viewAllUserAssignments (@RequestParam String Username
				,@RequestParam String Password)
	  {
		//make sure the username is correct and the password matches the user
		//User u = validateLogin(Username, Password);
		Users u = validateLogin(Username, Password);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Enroller Username or Password\n";
		}
		//get all enrolled records
		Iterator<Enrolled> allEnrolled = er.findAll().iterator();
		//get all enrolled by current user
		ArrayList<Enrolled> userEnrolled = new ArrayList<>();
		//add all classes this user is enrolled in
		while (allEnrolled.hasNext())
		{
			//get current class
			Enrolled cur = allEnrolled.next();
			//check if this user is enrolled
			if (cur.getUsername().equals(u.getUsername()))
			{
				//add class to the list
				userEnrolled.add(cur);
			}
		}
		//get all class codes for user's enrolled classes
		ArrayList<String> classCodes = new ArrayList<>();
		for (int i = 0; i < userEnrolled.size(); i++)
		{
			//add the class codes to the list
			classCodes.add(userEnrolled.get(i).getCode());
		}
		//get all assignments
		Iterator<Assignments> allAssignments = asr.findAll().iterator();
		//make a list of assignments to send
		ArrayList<Assignments> userAssignments = new ArrayList<>();
		while (allAssignments.hasNext())
		{
			//get the next assignment
			Assignments cur = allAssignments.next();
			//if the current class code is in the list of enrolled class codes
			if (classCodes.contains(cur.getCode()))
			{
				//add the current assignments to the list
				userAssignments.add(cur);
			}
		}
		return userAssignments.toString();
	 }
	
	
	/**
	 * change students gradepoint for a class
	 * @param Cid
	 * @param Name
	 * @param Description
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/ChangeGradePoint")
	  public @ResponseBody String changeGradePoint (@RequestParam String Username, @RequestParam String Password,
			  								@RequestParam String studentUsername, @RequestParam String Code, @RequestParam int pointsToAdd)
	  {
		Users u = validateLogin(Username, Password);
		Users stu = ur.findById(studentUsername).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Username or Password\n";
		}
		if (stu == null)
		{
			return "Invalid student username\n";
		}
		if (!u.getRole().equals("instructor"))
		{
			return "Only instructors can change students gradepoints for a class";
		}
		Enrolled e = findEnrolledByUsernameCode(stu.getUsername(), Code);
		if (e == null)
		{
			return "Invalid Student Username or CID\n";
		}
		//add points (can be negative to deduct points
		e.setGradepoint(e.getGradepoint() + pointsToAdd);
		er.save(e);
		return "Gradepoint successfully changed\n";
	  }
	
	/**
	 * change total points for a class
	 * @param Cid
	 * @param Name
	 * @param Description
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/ChangeClassTotal")
	  public @ResponseBody String changeClassTotal (@RequestParam String Username, @RequestParam String Password,
			  								@RequestParam String Code, @RequestParam int PointsToAdd)
	  {
		Users u = validateLogin(Username, Password);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Username or Password\n";
		}
		if (c == null)
		{
			return "Invalid class\n";
		}
		if (!u.getRole().equals("instructor"))
		{
			return "Only instructors can change total points for a class";
		}
		//add points (can be negative to deduct points
		c.setTotal(c.getTotal() + PointsToAdd);
		cr.save(c);
		return "Class total points successfully changed\n";
	  }
	
	/**
	 * get all students enrolled in a particular class
	 * @param Cid
	 * @param Name
	 * @param Description
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/GetStudentsByClass")
	  public @ResponseBody String getStudentsByClass (@RequestParam String Username, @RequestParam String Password,
			  								@RequestParam String Code)
	  {
		Users u = validateLogin(Username, Password);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Username or Password\n";
		}
		if (c == null)
		{
			return "Invalid class\n";
		}
		if (!u.getRole().equals("instructor"))
		{
			return "Only instructors can view the students enrolled in a class";
		}
		//get all enrolled records
		Iterator<Enrolled> allEnrolled = er.findAll().iterator();
		//get all enrolled by current user
		ArrayList<Users> studentsInClass = new ArrayList<>();
		//add all classes this user is enrolled in
		while (allEnrolled.hasNext())
		{
			//get current class
			Enrolled cur = allEnrolled.next();
			//check if this user is enrolled
			if (cur.getCode().equals(Code))
			{
				Users toAdd = ur.findById(cur.getUsername()).orElse(null);
				if (toAdd.getRole().equals("student"))
				{
					//add class to the list
					studentsInClass.add(toAdd);
				}
			}
		}
		return studentsInClass.toString();
	  }
	
	/**
	 * get all enrolled records for a particular class
	 * @param Cid
	 * @param Name
	 * @param Description
	 * @return
	 */
	@CrossOrigin
	@PostMapping(path="/GetEnrolledByClass")
	  public @ResponseBody String getSEnrolledByClass (@RequestParam String Username, @RequestParam String Password,
			  								@RequestParam String Code)
	  {
		Users u = validateLogin(Username, Password);
		Classes c = cr.findById(Code).orElse(null);
		//if user or pw is invalid return with that info
		if (u == null)
		{
			return "Invalid Username or Password\n";
		}
		if (c == null)
		{
			return "Invalid class\n";
		}
		if (!u.getRole().equals("instructor"))
		{
			return "Only instructors can view the enrolled records for a class";
		}
		//get all enrolled records
		Iterator<Enrolled> allEnrolled = er.findAll().iterator();
		//get all enrolled by current user
		ArrayList<Enrolled> enrolledInClass = new ArrayList<>();
		//add all classes this user is enrolled in
		while (allEnrolled.hasNext())
		{
			//get current class
			Enrolled cur = allEnrolled.next();
			//check if this user is enrolled
			if (cur.getCode().equals(Code))
			{
				Users curUsr = ur.findById(cur.getUsername()).orElseGet(null);
				if (curUsr.getRole().equals("student"))
				{
					enrolledInClass.add(cur);
				}
			}
		}
		return enrolledInClass.toString();
	  }
	//////////////////////////
	//PRIVATE HELPER METHODS//
	//////////////////////////
	/**
	 * validate the user's login information
	 * @param u
	 * @param p
	 * @return
	 */
  private Users validateLogin(String u, String p)
  {
	  Users usr = ur.findById(u).orElse(null);
	  //user not found or password INCORRECT
	  if (usr == null || !p.equals(usr.getPassword())) return null;
	  //user found and password correct
	  return usr;
  }
  
  /**
   * get an enrolled record from a uid
   * @param u
   * @return
   */
  private Enrolled findEnrolledByUsernameCode(String username, String code)
  {
	  System.out.println("Trying to find: "+username + code);
	//get all enrolled records
	Iterator<Enrolled> allEnrolled = er.findAll().iterator();
	while (allEnrolled.hasNext())
	{
		Enrolled cur = allEnrolled.next();
		System.out.println(cur.getUsername() + cur.getCode());
		if (cur.getUsername().equals(username) && cur.getCode().equals(code))
		{
			System.out.println(username + code + "found");
			return cur;
		}
	}
	return null;
  }
  
}
