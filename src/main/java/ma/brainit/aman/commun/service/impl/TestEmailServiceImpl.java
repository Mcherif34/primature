package ma.brainit.aman.commun.service.impl;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.commun.service.EmailService;

/**
 * Service d'email de test pour le développement
 * Simule l'envoi d'emails en les écrivant dans des fichiers
 */
@Service
@Profile("test-email")
@Transactional
public class TestEmailServiceImpl implements EmailService {
    
    private static final Logger logger = LoggerFactory.getLogger(TestEmailServiceImpl.class);
    
    @Value("${uploadHome:C:/GED}")
    private String uploadHome;
    
    @Override
    public void sendMail(String to, String subject, String text) {
        try {
            // Créer le dossier emails s'il n'existe pas
            String emailsDir = uploadHome + "/emails";
            File dir = new File(emailsDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }
            
            // Générer un nom de fichier unique
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss");
            String timestamp = sdf.format(new Date());
            String filename = "email_" + timestamp + "_" + to.replace("@", "_at_").replace(".", "_") + ".html";
            
            // Créer le fichier email
            File emailFile = new File(emailsDir, filename);
            try (FileWriter writer = new FileWriter(emailFile)) {
                writer.write("<!DOCTYPE html>\n");
                writer.write("<html>\n<head>\n");
                writer.write("<meta charset=\"UTF-8\">\n");
                writer.write("<title>" + subject + "</title>\n");
                writer.write("</head>\n<body>\n");
                writer.write("<h2>Email de Test - GED Primature</h2>\n");
                writer.write("<p><strong>Date d'envoi :</strong> " + new Date() + "</p>\n");
                writer.write("<p><strong>Destinataire :</strong> " + to + "</p>\n");
                writer.write("<p><strong>Sujet :</strong> " + subject + "</p>\n");
                writer.write("<hr>\n");
                writer.write("<div>\n" + text + "\n</div>\n");
                writer.write("</body>\n</html>");
            }
            
            logger.info("=== EMAIL DE TEST CRÉÉ AVEC SUCCÈS ===");
            logger.info("Fichier : {}", emailFile.getAbsolutePath());
            logger.info("Destinataire : {}", to);
            logger.info("Sujet : {}", subject);
            
            // Afficher le contenu dans les logs pour faciliter le débogage
            System.out.println("=== EMAIL DE TEST CRÉÉ ===");
            System.out.println("Fichier : " + emailFile.getAbsolutePath());
            System.out.println("Destinataire : " + to);
            System.out.println("Sujet : " + subject);
            System.out.println("Contenu : " + text.substring(0, Math.min(200, text.length())) + "...");
            System.out.println("================================");
            
        } catch (IOException e) {
            logger.error("Erreur lors de la création de l'email de test : " + e.getMessage(), e);
            throw new RuntimeException("Erreur lors de la création de l'email de test : " + e.getMessage(), e);
        }
    }
} 