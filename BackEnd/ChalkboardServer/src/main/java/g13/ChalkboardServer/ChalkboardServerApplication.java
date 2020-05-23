package g13.ChalkboardServer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

import g13.ChalkboardServer.storage.StorageProperties;
import g13.ChalkboardServer.storage.StorageService;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
@EnableWebSocket
public class ChalkboardServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChalkboardServerApplication.class, args);
	}
	
	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
			storageService.deleteAll();
			storageService.init();
		};
	}
}
