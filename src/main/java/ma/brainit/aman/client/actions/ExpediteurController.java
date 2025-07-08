package ma.brainit.aman.client.actions;

import ma.brainit.aman.client.dto.ExpediteurDTO;
import ma.brainit.aman.client.service.ExpediteurService;
import ma.brainit.base.utils.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@Controller
@RequestMapping(value = "/courrier/sender")
public class ExpediteurController {

	private static final Logger log = LoggerFactory.getLogger(ExpediteurController.class);
	@Autowired
	private ExpediteurService ExpediteurService;
	
	@RequestMapping(value = { "", "/" }, method = RequestMethod.GET)
	public ModelAndView login(Model model) {
		ModelAndView modelAndView = new ModelAndView("client/ExpediteurList");
		return modelAndView;
	}
	
	@RequestMapping(value="/rest/list", method=RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getExpediteurPage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search){
		String result = ExpediteurService.getPage(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/load/{id}", method=RequestMethod.GET )
	public @ResponseBody String load(@PathVariable("id") Long id){
		ExpediteurDTO dto =  ExpediteurService.load(id);
		return Util.toJson(dto);
	}
	
	@RequestMapping(value="/rest/getByName/{name}", method=RequestMethod.GET )
	public @ResponseBody String getByName(@PathVariable("name") String name){
		ExpediteurDTO dto =  ExpediteurService.getByName(name);
		return Util.toJson(dto);
	}
	
	@Transactional
	@CrossOrigin(origins = "*")
	@RequestMapping(value="/rest/save", method=RequestMethod.POST )
	public @ResponseBody String save(@ModelAttribute ExpediteurDTO dto){
		ExpediteurDTO returnedDTO = ExpediteurService.save(dto);
		return Util.toJson(returnedDTO);
	}
	
	@RequestMapping(value="/rest/delete/{id}", method=RequestMethod.POST )
	public @ResponseBody String remove(@PathVariable("id") Long id){
		ExpediteurService.delete(id);
		return Util.OK;
	}
	
	@Transactional
	@CrossOrigin(origins = "*")
	@RequestMapping(value="/rest/getAll", method=RequestMethod.GET)
	public @ResponseBody String getAll(){
		return Util.toJson(ExpediteurService.getAll());
	}
	
	@Transactional
	@CrossOrigin(origins = "*")
	@RequestMapping(value="/rest/getAllName", method=RequestMethod.GET)
	public @ResponseBody String getAllName(){
		return Util.toJson(ExpediteurService.getAllName());
	}
	
}