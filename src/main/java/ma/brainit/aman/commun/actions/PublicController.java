package ma.brainit.aman.commun.actions;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PublicController {

    /**
     * Page d'accueil publique avec lien vers l'inscription externe
     */
    @RequestMapping(value = "/inscription-externe", method = RequestMethod.GET)
    public String inscriptionExterne() {
        return "external/inscription";
    }

    /**
     * Redirection depuis l'ancienne route
     */
    @RequestMapping(value = "/public", method = RequestMethod.GET)
    public String redirectToInscription() {
        return "redirect:/inscription-externe";
    }
} 