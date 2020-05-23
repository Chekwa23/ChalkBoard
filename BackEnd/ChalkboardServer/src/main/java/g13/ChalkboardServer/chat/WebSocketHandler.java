package g13.ChalkboardServer.chat;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import g13.ChalkboardServer.UsersRepository;
import g13.ChalkboardServer.Classes;
import g13.ChalkboardServer.ClassesRepository;
import g13.ChalkboardServer.Users;

/**
 * 
 * @author jakegude
 *
 */
@ServerEndpoint("/chat/{classCode}/{username}")
@Component
public class WebSocketHandler {
	
	// Store all socket session and their corresponding username.
    private static Map<Session, String> sessionUserMap = new HashMap<>();
    private static Map<String, Session> userSessionMap = new HashMap<>();
    private static Map<String, String> classUserMap = new HashMap<>();
    private static Map<String, String> userClassMap = new HashMap<>();
    private static Map<Session, String> sessionClassMap = new HashMap<>();
    private static Map<String, Session> classSessionMap = new HashMap<>();
    private static Map<String, ArrayList<Session>> classSessionList = new HashMap<>();

    @Autowired
    private static UsersRepository ur;
    @Autowired
    private static ClassesRepository cr;
    
    private final Logger logger = LoggerFactory.getLogger(WebSocketHandler.class);
    
    @OnOpen
    public void onOpen( Session session, @PathParam("username") String username,
    										@PathParam("classCode") String classCode) throws IOException {
        logger.info(username + " has joined the chat");
        String user = username;
        String classID = classCode;
        
        sessionUserMap.put(session, user);
        userSessionMap.put(user, session);
        classUserMap.put(classID, user);
        userClassMap.put(user, classID);
        sessionClassMap.put(session, classID);
        classSessionMap.put(classID, session);
        
        if (classSessionList.containsKey(classID)) {
            classSessionList.get(classID).add(session);
        } else {
        	classSessionList.put(classID, new ArrayList<>());
            classSessionList.get(classID).add(session);
        }
        
        String message=  user + " has Joined the Chat";
        broadcastToClass(classID, message);
    }
 
    @OnMessage
    public void onMessage(Session session, String message) throws IOException {
        // Handle new messages
    	String u = sessionUserMap.get(session);
        String c = sessionClassMap.get(session);

    	logger.info("Recieved: \""+ message + "\" From: " + u);
	    broadcastToClass(c, u + ": " + message);
    }
 
    @OnClose
    public void onClose(Session session) throws IOException {
        String c = sessionClassMap.get(session);
        String u = sessionUserMap.get(session);

    	logger.info(u + " has left the chat");

    	sessionUserMap.remove(session);
    	userSessionMap.remove(u);
    	classSessionMap.remove(c);
    	sessionClassMap.remove(session);
    	userClassMap.remove(u);
    	classUserMap.remove(c);
    	classSessionList.get(c).remove(session);
    	
    	String message= u + " disconnected";
        broadcastToClass(c, message);
    }
 
    @OnError
    public void onError(Session session, Throwable throwable) {
        // Do error handling here
    	logger.info("An error has been found");
    	logger.info(throwable.toString());
    	logger.info(sessionClassMap.get(session));
    }
    
	private void sendMessageToParticularUser(String username, String message) {	
    	try {
    		String u = sessionUserMap.get(username);
    		userSessionMap.get(u).getBasicRemote().sendText(message);
        } catch (IOException e) {
        	logger.info("Exception: " + e.getMessage().toString());
            e.printStackTrace();
        }
    }
	
    private static void broadcastToClass(String classID, String message) {
    	ArrayList<Session> s = classSessionList.get(classID);
	    for (int i = 0; i < s.size(); i++) {
		    try {
		    	s.get(i).getBasicRemote().sendText(message);
			} catch (IOException e) {
				e.printStackTrace();
		    }
	    }
    }
    
    private static void broadcast(String message) throws IOException {	  
    	sessionUserMap.forEach((session, username) -> {
    		synchronized (session) {
	            try {
	                session.getBasicRemote().sendText(message);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        }
	    });
	}
}

