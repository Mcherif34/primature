package ma.brainit.aman.administration.actions;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.service.SecUtilisateurService;

@Controller
@RequestMapping(value = "/changepassword")
public class ChangePasswordController {

	@Autowired
	private SecUtilisateurService secUtilisateurService;


	@RequestMapping(value = { "", "/{token}" }, method = RequestMethod.GET)
	public ModelAndView changePassword(@PathVariable Optional<String> token) {
		ModelAndView modelAndView = null;
		if (token.isPresent()) {
			modelAndView = changePassword(token.get(), null);
		} else{
			modelAndView = new ModelAndView("home/changePassword");
		}
		return modelAndView;
	}
	
	@RequestMapping(value = { "", "/{token}" }, method = RequestMethod.POST)
	public ModelAndView changePassword(@PathVariable(value="token") Optional<String> token,SecUtilisateurDTO dto) {
		System.out.println(dto);
		System.out.println(dto.getLogin());
		System.out.println(dto.getPassword());
		System.out.println(dto.getNvPassword());
		System.out.println(dto.getNvPasswordConfirmation());
		ModelAndView modelAndView = null;
		if (token.isPresent()) {
			Boolean changed = secUtilisateurService.changePassword(token.get(),dto);
			if(changed){
				modelAndView = new ModelAndView("redirect:/logout");
			}else{
				modelAndView = changePassword(token.get(), true);
			}
		}
		return modelAndView;
	}
	
	@RequestMapping(value = "/success", method = RequestMethod.GET)
	public ModelAndView successChangePassword() {
		return new ModelAndView("home/successChangePassword");
	}
	
	public ModelAndView changePassword(String token, Boolean error) {
		ModelAndView modelAndView = new ModelAndView();
		SecUtilisateurDTO dto = secUtilisateurService.findByToken(token);
		if(dto != null){
			modelAndView.addObject("login", dto.getLogin());
			modelAndView.addObject("token", dto.getToken());
			modelAndView.addObject("error", error);
			modelAndView.setViewName("home/changePassword");
		} else {
			modelAndView.setViewName("redirect:/404");
		}
		return modelAndView;
	}
	
	
}
