package ma.brainit.config;

import java.io.IOException;
import java.util.Properties;

import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.ui.velocity.VelocityEngineFactoryBean;


@Configuration
public class MailConfig {
	@Value("${mail.host}")
	private String mailHost;
	
	@Value("${mail.port}")
	private String mailPort;
	
	@Value("${mail.username}")
	private String mailUsername;
	
	@Value("${mail.password}")
	private String mailPassword;
	
	@Bean
	public JavaMailSender getJavaMailSender() {
	    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	    mailSender.setHost(mailHost);
	    mailSender.setPort(Integer.parseInt(mailPort));
	    mailSender.setUsername(mailUsername);
	    mailSender.setPassword(mailPassword);
	    Properties prop = mailSender.getJavaMailProperties();
	    prop.put("mail.transport.protocol", "smtp");
	    prop.put("mail.smtp.auth", "true");
	    prop.put("mail.smtp.starttls.enable", "true");
	    prop.put("mail.smtp.ssl.enable", "false");
	    prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");
	    prop.put("mail.debug", "true"); // Activer le debug pour diagnostiquer
	    prop.put("mail.smtp.ssl.protocols", "TLSv1.2");
	    prop.put("mail.smtp.timeout", "10000"); // Timeout 10 secondes
	    prop.put("mail.smtp.connectiontimeout", "10000"); // Timeout connexion 10 secondes
	    prop.put("mail.smtp.writetimeout", "10000"); // Timeout écriture 10 secondes
	    prop.put("mail.smtp.quitwait", "false"); // Ne pas attendre la réponse QUIT
	    
	    return mailSender;
	}

	@Bean
	public VelocityEngine velocityEngine() throws VelocityException, IOException{
		VelocityEngineFactoryBean factory = new VelocityEngineFactoryBean();
		Properties props = new Properties();
		props.put("resource.loader", "class");
		props.put("class.resource.loader.class", 
				  "org.apache.velocity.runtime.resource.loader." + 
				  "ClasspathResourceLoader");
		props.put("input.encoding", "UTF-8");
		props.put("output.encoding", "UTF-8");
		factory.setVelocityProperties(props);
		
		return factory.createVelocityEngine();
	}
}