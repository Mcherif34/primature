package ma.brainit.aman.administration.actions;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

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

import ma.brainit.base.utils.Util;
import ma.brainit.aman.administration.dto.SecUtilisateurAuthoriteDTO;
import ma.brainit.aman.administration.model.SecUtilisateurAuthoritePK;
import ma.brainit.aman.administration.service.SecUtilisateurAuthoriteService;
//import ma.brainit.aman.commun.model.enms.EnumEntite;

@Controller
@RequestMapping(value = "/administration/secUtilisateurAuthorite")
public class SecUtilisateurAuthoriteController {

	static String path = "administration/secUtilisateurAuthorite/";
	
	@Autowired
	private SecUtilisateurAuthoriteService secUtilisateurAuthoriteServices;
	

	@RequestMapping(value = {"","/"}, method = RequestMethod.GET)
	public ModelAndView login(Model model,HttpServletRequest request) {
		ModelAndView modelAndView = new ModelAndView(path+"secUtilisateurAuthoriteList");
		//modelAndView.addObject("ECRAN",EnumEntite.SEC_USER.getCode());
		
		return modelAndView;
	}


	@RequestMapping(value="/rest/list", method=RequestMethod.GET )
	public @ResponseBody ResponseEntity<String> getPage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search){
		String result = secUtilisateurAuthoriteServices.getPage(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/list/{secUtilisateurId}", method=RequestMethod.GET )
	public @ResponseBody ResponseEntity<String> getPageByUtilisateur(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search,
			@PathVariable("secUtilisateurId") Optional<Long> secUtilisateurId){
		String result = secUtilisateurAuthoriteServices.getPageByUtilisateur(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null),secUtilisateurId.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

	@RequestMapping(value="/rest/load/{secUtilisateurId}/{secAuthoriteId}", method=RequestMethod.GET )
	public @ResponseBody String load(@PathVariable("secUtilisateurId") Long secUtilisateurId, @PathVariable("secAuthoriteId") Long secAuthoriteId){
		SecUtilisateurAuthoritePK pk = new SecUtilisateurAuthoritePK(secUtilisateurId, secAuthoriteId);
		SecUtilisateurAuthoriteDTO dto =  secUtilisateurAuthoriteServices.load(pk);
		return Util.toJson(dto);
	}
	
	@RequestMapping(value="/rest/save", method=RequestMethod.POST )
	public @ResponseBody String save(@RequestBody SecUtilisateurAuthoriteDTO dto){
		SecUtilisateurAuthoriteDTO returnedDTO = secUtilisateurAuthoriteServices.save(dto);
		return Util.toJson(returnedDTO);
	}

	@RequestMapping(value="/rest/delete/{secUtilisateurId}/{secAuthoriteId}", method=RequestMethod.POST )
	public @ResponseBody String remove(@PathVariable("secUtilisateurId") Long secUtilisateurId, @PathVariable("secAuthoriteId") Long secAuthoriteId){
		SecUtilisateurAuthoritePK pk = new SecUtilisateurAuthoritePK(secUtilisateurId, secAuthoriteId);
		secUtilisateurAuthoriteServices.delete(pk);
		return Util.OK;
	}
	
	@RequestMapping(value="/rest/getAll", method=RequestMethod.GET)
	public @ResponseBody String getAll(){
		
		return Util.toJson(secUtilisateurAuthoriteServices.getAll());
	}
	
	@RequestMapping(value="/rest/getAuthoritesId/{secUtilisateurId}", method=RequestMethod.GET)
	public @ResponseBody String getAuthoritesIdByUtilisateur(@PathVariable("secUtilisateurId") Long secUtilisateurId){
		
		return Util.toJson(secUtilisateurAuthoriteServices.getAuthoritesIdByUtilisateur(secUtilisateurId));
	}
	

}