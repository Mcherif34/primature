package ma.brainit.aman.external.actions;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ma.brainit.aman.administration.dto.ExternalUserRegistrationDTO;
import ma.brainit.aman.administration.model.ExternalUserRegistration.RegistrationStatus;
import ma.brainit.aman.administration.service.ExternalUserRegistrationService;

@Controller
@RequestMapping("/external")
public class ExternalRegistrationController {

    @Autowired
    private ExternalUserRegistrationService externalUserRegistrationService;

    /**
     * Affiche le formulaire d'inscription externe
     */
    @RequestMapping(value = "/inscription", method = RequestMethod.GET)
    public String showRegistrationForm(Model model) {
        return "external/inscription";
    }

    /**
     * Traite la soumission du formulaire d'inscription
     */
    @RequestMapping(value = "/inscription/submit", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> submitRegistration(@RequestBody Map<String, Object> formData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Vérifier si l'email existe déjà
            String email = (String) formData.get("email");
            if (externalUserRegistrationService.isEmailAlreadyRegistered(email)) {
                response.put("success", false);
                response.put("message", "Cette adresse email est déjà utilisée pour une demande d'inscription.");
                return ResponseEntity.badRequest().body(response);
            }

            // Créer le DTO à partir des données du formulaire
            ExternalUserRegistrationDTO dto = new ExternalUserRegistrationDTO();
            dto.setNom((String) formData.get("nom"));
            dto.setPrenom((String) formData.get("prenom"));
            dto.setFonction((String) formData.get("fonction"));
            dto.setEmail(email);
            dto.setTelephone((String) formData.get("telephone"));
            dto.setInstitution((String) formData.get("institution"));
            dto.setTypeInstitution((String) formData.get("typeInstitution"));
            dto.setAdresse((String) formData.get("adresse"));
            dto.setVille((String) formData.get("ville"));
            dto.setMotifDemande((String) formData.get("motifDemande"));
            dto.setStatut(RegistrationStatus.EN_ATTENTE);
            dto.setDateDemande(new Date());

            // Sauvegarder la demande
            ExternalUserRegistrationDTO savedDto = externalUserRegistrationService.save(dto);

            response.put("success", true);
            response.put("message", "Votre demande d'inscription a été soumise avec succès. Vous recevrez une notification par email une fois votre demande traitée.");
            response.put("registrationId", savedDto.getId());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Une erreur est survenue lors de la soumission de votre demande. Veuillez réessayer.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Vérifie si un email est déjà utilisé
     */
    @RequestMapping(value = "/inscription/check-email", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> checkEmail(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        String email = request.get("email");
        boolean isUsed = externalUserRegistrationService.isEmailAlreadyRegistered(email);
        
        response.put("emailUsed", isUsed);
        response.put("message", isUsed ? "Cette adresse email est déjà utilisée." : "Adresse email disponible.");
        
        return ResponseEntity.ok(response);
    }
} 