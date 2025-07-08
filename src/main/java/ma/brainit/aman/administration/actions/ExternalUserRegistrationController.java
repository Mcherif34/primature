package ma.brainit.aman.administration.actions;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ma.brainit.base.utils.Util;
import ma.brainit.aman.administration.dto.ExternalUserRegistrationDTO;
import ma.brainit.aman.administration.service.ExternalUserRegistrationService;

@Controller
@RequestMapping("/external-registration")
public class ExternalUserRegistrationController {

    @Autowired
    private ExternalUserRegistrationService externalUserRegistrationService;

    // Page publique pour l'inscription
    @RequestMapping(value = "/inscription", method = RequestMethod.GET)
    public ModelAndView inscriptionPage() {
        return new ModelAndView("external/inscription");
    }

    // Page d'administration pour gérer les demandes
    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public ModelAndView adminPage() {
        return new ModelAndView("administration/externalRegistration/list");
    }

    // Endpoint pour soumettre une demande d'inscription
    @RequestMapping(value = "/rest/submit", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<String> submitRegistration(@RequestBody ExternalUserRegistrationDTO dto) {
        try {
            // Vérifier si l'email n'est pas déjà utilisé
            if (externalUserRegistrationService.isEmailAlreadyRegistered(dto.getEmail())) {
                Map<String, String> response = new HashMap<>();
                response.put("success", "false");
                response.put("message", "Cette adresse email est déjà utilisée pour une demande d'inscription.");
                return ResponseEntity.badRequest().body(Util.toJson(response));
            }

            ExternalUserRegistrationDTO saved = externalUserRegistrationService.save(dto);
            
            Map<String, String> response = new HashMap<>();
            response.put("success", "true");
            response.put("message", "Votre demande d'inscription a été soumise avec succès. Vous recevrez une notification par email une fois qu'elle sera traitée.");
            
            return ResponseEntity.ok(Util.toJson(response));
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("success", "false");
            response.put("message", "Une erreur est survenue lors de la soumission de votre demande.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    // Endpoint pour récupérer une demande
    @RequestMapping(value = "/rest/load/{id}", method = RequestMethod.GET)
    public @ResponseBody String load(@PathVariable("id") Long id) {
        ExternalUserRegistrationDTO dto = externalUserRegistrationService.load(id);
        return Util.toJson(dto);
    }

    // Endpoint pour accepter une demande
    @RequestMapping(value = "/rest/accept/{id}", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<String> acceptRegistration(@PathVariable("id") Long id) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String adminLogin = auth.getName();
            
            ExternalUserRegistrationDTO dto = externalUserRegistrationService.acceptRegistration(id, adminLogin);
            
            Map<String, String> response = new HashMap<>();
            response.put("success", "true");
            response.put("message", "La demande a été acceptée et un email a été envoyé au demandeur.");
            
            return ResponseEntity.ok(Util.toJson(response));
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("success", "false");
            response.put("message", "Erreur lors de l'acceptation : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    // Endpoint pour rejeter une demande
    @RequestMapping(value = "/rest/reject/{id}", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<String> rejectRegistration(@PathVariable("id") Long id, @RequestBody Map<String, String> request) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String adminLogin = auth.getName();
            String motifRejet = request.get("motifRejet");
            
            if (motifRejet == null || motifRejet.trim().isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("success", "false");
                response.put("message", "Le motif de rejet est obligatoire.");
                return ResponseEntity.badRequest().body(Util.toJson(response));
            }
            
            ExternalUserRegistrationDTO dto = externalUserRegistrationService.rejectRegistration(id, motifRejet, adminLogin);
            
            Map<String, String> response = new HashMap<>();
            response.put("success", "true");
            response.put("message", "La demande a été rejetée et un email a été envoyé au demandeur.");
            
            return ResponseEntity.ok(Util.toJson(response));
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("success", "false");
            response.put("message", "Erreur lors du rejet : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    // Endpoint pour récupérer toutes les demandes
    @RequestMapping(value = "/rest/getAll", method = RequestMethod.GET)
    public @ResponseBody String getAll() {
        return Util.toJson(externalUserRegistrationService.findAll());
    }

    // Endpoint pour récupérer les demandes en attente
    @RequestMapping(value = "/rest/getPending", method = RequestMethod.GET)
    public @ResponseBody String getPending() {
        return Util.toJson(externalUserRegistrationService.findPendingRegistrations());
    }

    // Endpoint pour le paginateur
    @RequestMapping(value = "/rest/paginator", method = RequestMethod.GET)
    public @ResponseBody String getPaginator(@RequestParam("page") Integer page,
                                           @RequestParam("limit") Integer limit,
                                           @RequestParam(value = "sort", required = false) String sort,
                                           @RequestParam(value = "direction", required = false) String direction,
                                           @RequestParam(value = "search", required = false) String search) {
        return externalUserRegistrationService.getPaginator(page, limit, sort, direction, search);
    }

    // Endpoint pour vérifier si un email est déjà utilisé
    @RequestMapping(value = "/rest/checkEmail", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> checkEmail(@RequestParam("email") String email) {
        boolean exists = externalUserRegistrationService.isEmailAlreadyRegistered(email);
        Map<String, Object> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(Util.toJson(response));
    }

    // Endpoint pour compter les demandes en attente
    @RequestMapping(value = "/rest/countPending", method = RequestMethod.GET)
    public @ResponseBody String countPending() {
        Long count = externalUserRegistrationService.countPendingRegistrations();
        return Util.toJson(count);
    }
} 