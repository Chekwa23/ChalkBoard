package g13.ChalkboardServer;
import org.springframework.data.repository.CrudRepository;
/**
 * A repository for interacting with the User table
 * of the database, auto-implemented by Spring Boot
 * @author jgossling
 *
 */
public interface NotesRepository extends CrudRepository<Notes, Integer>{}
