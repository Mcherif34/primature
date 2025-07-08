package ma.brainit.aman.administration.actions;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
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
import ma.brainit.aman.administration.dto.SecModuleDTO;
import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.service.SecModuleService;
import ma.brainit.aman.administration.service.SecUtilisateurService;


@Controller
@RequestMapping(value = "/administration/module")
public class SecModuleController {

	@Autowired
	private SecModuleService secModuleService;
	
	@Autowired
	private SecUtilisateurService secUtilisateurService;

	@RequestMapping(value = { "", "/" }, method = RequestMethod.GET)
	public ModelAndView login(Model model) {
		SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
		String name = StringUtils.isNotBlank(user.getPrenom()) ? user.getPrenom()+" "+user.getNom() : user.getNom();
		String profile = user.getSecProfileIntitule();
		
		ModelAndView modelAndView = new ModelAndView("administration/moduleList");
		
		modelAndView.addObject("name", name);
		modelAndView.addObject("profile", profile);
		
		return modelAndView;
	}

	@RequestMapping(value = "/rest/list", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getData(@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit, @RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction, @RequestParam("search") Optional<String> search) {
		String result = secModuleService.getPaginator(page.orElse(0), limit.orElse(null), sort.orElse(null),
				direction.orElse(null), search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/rest/load/{id}", method = RequestMethod.GET)
	public @ResponseBody String load(@PathVariable("id") Long id) {
		SecModuleDTO returnedDTO = secModuleService.load(id);
		return Util.toJson(returnedDTO);
	}

	@RequestMapping(value = "/rest/save", method = RequestMethod.POST)
	public @ResponseBody String save(@RequestBody SecModuleDTO dto) {
		SecModuleDTO returnedDTO = secModuleService.save(dto);
		return Util.toJson(returnedDTO);
	}

	@RequestMapping(value = "/rest/delete/{id}", method = RequestMethod.POST)
	public @ResponseBody String remove(@PathVariable("id") Long id) {
		secModuleService.delete(id);
		return Util.OK;
	}
	
	@RequestMapping(value="/rest/getAll", method=RequestMethod.GET)
	public @ResponseBody String getAll(){
		return Util.toJson(secModuleService.findAll());
	}

}