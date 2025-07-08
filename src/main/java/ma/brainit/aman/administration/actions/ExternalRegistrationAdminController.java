package ma.brainit.aman.administration.actions;

import ma.brainit.aman.administration.model.ExternalUserRegistration;
import ma.brainit.aman.administration.service.ExternalUserRegistrationService;
import ma.brainit.aman.administration.dto.ExternalUserRegistrationDTO;
import ma.brainit.base.utils.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/administration/external-registrations")
public class ExternalRegistrationAdminController {

    private static final Logger logger = LoggerFactory.getLogger(ExternalRegistrationAdminController.class);

    @Autowired
    private ExternalUserRegistrationService externalUserRegistrationService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ModelAndView list(Model model) {
        return new ModelAndView("administration/externalRegistration/list");
    }

    @RequestMapping(value = "/rest/getAll", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<ExternalUserRegistrationDTO>> getAll() {
        try {
            List<ExternalUserRegistrationDTO> allRegistrations = externalUserRegistrationService.findAll();
            return new ResponseEntity<>(allRegistrations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/rest/statistics", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getStatistics() {
        try {
            Map<String, Object> statistics = new HashMap<>();
            List<ExternalUserRegistrationDTO> allRegistrations = externalUserRegistrationService.findAll();
            
            statistics.put("total", (long) allRegistrations.size());
            statistics.put("pending", externalUserRegistrationService.countPendingRegistrations());
            statistics.put("approved", (long) externalUserRegistrationService.findByStatut(ExternalUserRegistration.RegistrationStatus.ACCEPTEE).size());
            statistics.put("rejected", (long) externalUserRegistrationService.findByStatut(ExternalUserRegistration.RegistrationStatus.REJETEE).size());

            return new ResponseEntity<>(statistics, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/rest/list", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getList(
            @RequestParam(defaultValue = "0") int start,
            @RequestParam(defaultValue = "25") int length,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "id") String orderColumn,
            @RequestParam(defaultValue = "desc") String orderDir) {

        try {
            List<ExternalUserRegistrationDTO> allRegistrations = externalUserRegistrationService.findAll();
            
            Map<String, Object> response = new HashMap<>();
            response.put("data", allRegistrations);
            response.put("recordsTotal", allRegistrations.size());
            response.put("recordsFiltered", allRegistrations.size());
            response.put("draw", 1);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/rest/get/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<ExternalUserRegistrationDTO> getById(@PathVariable Long id) {
        try {
            ExternalUserRegistrationDTO registration = externalUserRegistrationService.load(id);
            if (registration != null) {
                return new ResponseEntity<>(registration, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/rest/approve/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> approveRegistration(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, Object> request) {
        
        logger.info("=== APPROVE REGISTRATION START ===");
        logger.info("ID reçu: {}", id);
        logger.info("Request body: {}", request);
        
        try {
            logger.info("Appel du service acceptRegistration avec ID: {} et admin: admin", id);
            externalUserRegistrationService.acceptRegistration(id, "admin"); // TODO: récupérer le login admin
            logger.info("Service acceptRegistration appelé avec succès");

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Demande approuvée avec succès");
            
            logger.info("Réponse de succès créée: {}", response);
            logger.info("=== APPROVE REGISTRATION SUCCESS ===");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("=== APPROVE REGISTRATION ERROR ===");
            logger.error("Exception lors de l'approbation: ", e);
            logger.error("Message d'erreur: {}", e.getMessage());
            logger.error("Type d'exception: {}", e.getClass().getSimpleName());
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de l'approbation de la demande: " + e.getMessage());
            logger.info("=== APPROVE REGISTRATION END ===");
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/rest/reject/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> rejectRegistration(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        
        logger.info("=== REJECT REGISTRATION START ===");
        logger.info("ID reçu: {}", id);
        logger.info("Request body: {}", request);
        
        try {
            String reason = (String) request.get("reason");
            logger.info("Raison de rejet: {}", reason);
            
            logger.info("Appel du service rejectRegistration avec ID: {}, raison: {} et admin: admin", id, reason);
            externalUserRegistrationService.rejectRegistration(id, reason, "admin"); // TODO: récupérer le login admin
            logger.info("Service rejectRegistration appelé avec succès");

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Demande rejetée avec succès");
            
            logger.info("Réponse de succès créée: {}", response);
            logger.info("=== REJECT REGISTRATION SUCCESS ===");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("=== REJECT REGISTRATION ERROR ===");
            logger.error("Exception lors du rejet: ", e);
            logger.error("Message d'erreur: {}", e.getMessage());
            logger.error("Type d'exception: {}", e.getClass().getSimpleName());
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors du rejet de la demande: " + e.getMessage());
            logger.info("=== REJECT REGISTRATION END ===");
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
} 