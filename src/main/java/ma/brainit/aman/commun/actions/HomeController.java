package ma.brainit.aman.commun.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ma.brainit.aman.administration.dto.SecProfileDTO;
//import ma.brainit.aman.client.service.ContactService;
import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.service.SecProfileService;
import ma.brainit.aman.administration.service.SecUtilisateurService;
import ma.brainit.aman.client.service.CorrespondanceSgService;
import ma.brainit.aman.client.service.MissionExterneService;
import ma.brainit.aman.client.service.MissionInterneService;
import ma.brainit.aman.client.service.CongeExterneService;
import ma.brainit.aman.client.service.CorrespondanceDircabService;
import ma.brainit.aman.client.service.DecisionService;
import ma.brainit.aman.client.service.MaterielService;
import ma.brainit.aman.client.service.NominationService;
import ma.brainit.aman.client.service.TitularisationService;
import ma.brainit.base.utils.Util;

@Controller
public class HomeController{
	
//	@Autowired
//	private ClientService clientService;
//
//	@Autowired
//	private ContactService contactService;
	
	@Autowired
	private SecUtilisateurService secUtilisateurService;
	
	@Autowired
	private SecProfileService secProfileService;
	
	@Autowired
	private CorrespondanceSgService CorrespondanceSgService;
	
	@Autowired
	private CorrespondanceDircabService CorrespondanceDircabService;
	
	@Autowired
	private CongeExterneService CongeExterneService;
	
	@Autowired
	private MissionExterneService MissionExterneService;
	
	@Autowired
	private MissionInterneService MissionInterneService;
	
	@Autowired
	private DecisionService DecisionService;
	
	@Autowired
	private MaterielService MaterielService;
	
	@Autowired
	private NominationService NominationService;
	
	@Autowired
	private TitularisationService TitularisationService;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView home(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ModelAndView modelAndView = new ModelAndView();
		if (!(auth instanceof AnonymousAuthenticationToken)) {	
			SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
			
			// Vérifier si c'est un utilisateur externe
			if (user != null && "EXTERNE".equals(user.getModule())) {
				// Rediriger vers l'espace utilisateur externe
				modelAndView.setViewName("redirect:/external/dashboard");
			} else {
				// Utilisateur admin - rediriger vers l'espace admin
			SecProfileDTO profile = secProfileService.load(user.getSecProfileId());
			modelAndView.addObject("name", user.getNom());
			modelAndView.addObject("profileId", profile.getPerformerId());
			modelAndView.addObject("profileName", profile.getPerformerName());
			
			modelAndView.setViewName("index");
			}
			
		} else {
			response.addHeader("REQUIRES_AUTH", "1");
			modelAndView.setViewName("home/login");
		}
		return modelAndView;
	}

	@RequestMapping(value = "/login/error", method = RequestMethod.GET)
	public ModelAndView loginError(HttpServletRequest request) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("error", true);
		modelAndView.setViewName("home/login");
		return modelAndView;
	}
	
	@RequestMapping(value="/rest/getCurrentCountByEntity/{term}", method=RequestMethod.GET)
	public @ResponseBody String getCurrentCountByEntity(@PathVariable("term") String term){
		return Util.toJson(CorrespondanceSgService.getCurrentCountByEntity(term) + CorrespondanceDircabService.getCurrentCountByEntity(term) + CongeExterneService.getCurrentCountByEntity(term) + MissionExterneService.getCurrentCountByEntity(term) + MissionInterneService.getCurrentCountByEntity(term) + DecisionService.getCurrentCountByEntity(term) + MaterielService.getCurrentCountByEntity(term) + NominationService.getCurrentCountByEntity(term) + TitularisationService.getCurrentCountByEntity(term));
	}
	
	@RequestMapping(value="/rest/getCurrentCount", method=RequestMethod.GET)
	public @ResponseBody String getCurrentCount(){
		return Util.toJson(CorrespondanceSgService.getCurrentCount() + CorrespondanceDircabService.getCurrentCount() + CongeExterneService.getCurrentCount() + MissionExterneService.getCurrentCount() + MissionInterneService.getCurrentCount() + DecisionService.getCurrentCount() + MaterielService.getCurrentCount() + NominationService.getCurrentCount() + TitularisationService.getCurrentCount());
	}
	
	@RequestMapping(value="/rest/getCompletedCount", method=RequestMethod.GET)
	public @ResponseBody String getCompletedCount(){
		return Util.toJson(CorrespondanceSgService.getCompletedCount() + CorrespondanceDircabService.getCompletedCount() + CongeExterneService.getCompletedCount() + MissionExterneService.getCompletedCount() + MissionInterneService.getCompletedCount() + DecisionService.getCompletedCount() + MaterielService.getCompletedCount() + NominationService.getCompletedCount() + TitularisationService.getCompletedCount());
	}
	
	@RequestMapping(value="/rest/getRejectedCount", method=RequestMethod.GET)
	public @ResponseBody String getRejectedCount(){
		return Util.toJson(CorrespondanceSgService.getRejectedCount() + CorrespondanceDircabService.getRejectedCount() + CongeExterneService.getRejectedCount() + MissionExterneService.getRejectedCount() + MissionInterneService.getRejectedCount() + DecisionService.getRejectedCount() + MaterielService.getRejectedCount() + NominationService.getRejectedCount() + TitularisationService.getRejectedCount());
	}
	
}