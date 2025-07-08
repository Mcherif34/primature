package ma.brainit.aman.administration.actions;

import java.util.Optional;

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
import ma.brainit.aman.administration.dto.SecProfileDTO;
import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.service.SecProfileService;
import ma.brainit.aman.administration.service.SecUtilisateurService;
//import ma.brainit.aman.client.service.ContactService;


@Controller
@RequestMapping(value = "/administration/user")
public class SecUtilisateurController {

	static String path = "administration/user/";

	@Autowired
	private SecUtilisateurService secUtilisateurService;
	
//	@Autowired
//	private ContactService contactService;
	
	@Autowired
	private SecProfileService secProfileService;

	@RequestMapping(value = { "", "/" }, method = RequestMethod.GET)
	public ModelAndView login(Model model) {
		ModelAndView modelAndView = new ModelAndView(path + "userList");
		return modelAndView;
	}

	@RequestMapping(value = "/rest/list", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getPage(@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit, @RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction, @RequestParam("search") Optional<String> search) {
		String result = secUtilisateurService.getPaginator(page.orElse(0), limit.orElse(null), sort.orElse(null),
				direction.orElse(null), search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/rest/listByProfile/{profileId}", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getPageProfile(@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit, @RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction, @RequestParam("search") Optional<String> search, @PathVariable("profileId") Long profileId) {
		String result = secUtilisateurService.getPaginator(page.orElse(0), limit.orElse(null), sort.orElse(null),
				direction.orElse(null), search.orElse(null), profileId);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/getAllWithoutProfile", method=RequestMethod.GET)
	public @ResponseBody String getAllWithoutProfile(){
		return Util.toJson(secUtilisateurService.getAllUsersWithoutProfile());
	}

	@RequestMapping(value = "/rest/load/{id}", method = RequestMethod.GET)
	public @ResponseBody String load(@PathVariable("id") Long id) {
		SecUtilisateurDTO returnedDTO = secUtilisateurService.load(id);
		return Util.toJson(returnedDTO);
	}

	@RequestMapping(value = "/rest/getCurrentUser", method = RequestMethod.GET)
	public @ResponseBody String getCurrentUser() {
		SecUtilisateurDTO returnedDTO = secUtilisateurService.getCurrentUser();
		return Util.toJson(returnedDTO);
	}
	
	@RequestMapping(value = "/rest/save", method = RequestMethod.POST)
	public @ResponseBody String save(@RequestBody SecUtilisateurDTO dto) {
		SecUtilisateurDTO returnedDTO = secUtilisateurService.save(dto);
		SecProfileDTO secProfileDTO = secProfileService.load(dto.getSecProfileId());
		
//		if(returnedDTO != null) {
//			ContactDTO contactDTO = contactService.getByName(returnedDTO.getLogin());
//			if(contactDTO == null)
//				contactDTO = new ContactDTO();
//			contactDTO.setCityId(dto.getCityId());
//			contactDTO.setMail(dto.getEmail());
//			contactDTO.setName(dto.getLogin());
//			contactDTO.setPhone(dto.getPhone());
//			contactDTO.setClientId(secProfileDTO.getClientId());
//			contactDTO.setArchive(false);
//			contactDTO.setUserId(returnedDTO.getId());
//
//			contactService.save(contactDTO);
//		}
		return Util.toJson(returnedDTO);
	}
	
	@RequestMapping(value = "/rest/reset", method = RequestMethod.POST)
	public @ResponseBody String reset(@RequestBody SecUtilisateurDTO dto) {
		SecUtilisateurDTO returnedDTO = secUtilisateurService.reset(dto);
		
		return Util.toJson(returnedDTO);
	}
	
	@RequestMapping(value = "/rest/changePassword", method = RequestMethod.POST)
	public @ResponseBody String changePassword(@RequestBody SecUtilisateurDTO dto) {
		return Util.toJson(secUtilisateurService.changePassword(dto));
	}

	@RequestMapping(value = "/rest/delete/{id}", method = RequestMethod.POST)
	public @ResponseBody String remove(@PathVariable("id") Long id) {
		secUtilisateurService.delete(id);
		return Util.OK;
	}
	
	@RequestMapping(value="/rest/getAll", method=RequestMethod.GET)
	public @ResponseBody String getAll(){
		return Util.toJson(secUtilisateurService.findAll());
	}
	
	@RequestMapping(value="/rest/getRecoveryAll", method=RequestMethod.GET)
	public @ResponseBody String getRecoveryAll(){
		return Util.toJson(secUtilisateurService.getRecoveryAll());
	}
	
}