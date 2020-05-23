package g13.ChalkboardServer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
/**
 * A service that acts as a go-between for the Controller and repository
 * for User records
 * @author jakegude
 *
 */
public class UsersService
{
	@Autowired
	/**
	 * the repository to be used
	 */
	private UsersRepository ur;
	
	/**
	 * find a user from the repository with a given id
	 * @param un username of the user to find
	 * @return User username
	 */
	public Users findById(String un)
	{
		return ur.findById(un).orElse(null);
	}
	/**
	 * save a user to database
	 * @param u User to be added
	 * @return the saved entity
	 */
	public Users save(Users u)
	{
		return ur.save(u);
	}
	/**
	 * delete a user with a given username
	 * @param un username of the user to delete
	 */
	public void deleteById(String un)
	{
		ur.deleteById(un);
	}
	/**
	 * find all the Users in the table
	 * @return a list of all the users in the table
	 */
	public Iterable<Users> findAll()
	{
		return ur.findAll();
	}
}
