package ma.brainit.aman.client.actions;

import ma.brainit.aman.client.dto.CourrierDTO;
import ma.brainit.aman.client.service.CourrierService;
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
@RequestMapping(value = "/client/courrier")
public class CourrierController {

	private static final Logger log = LoggerFactory.getLogger(CourrierController.class);
	@Autowired
	private CourrierService courrierService;
	
	@RequestMapping(value = { "", "/" }, method = RequestMethod.GET)
	public ModelAndView login(Model model) {
		ModelAndView modelAndView = new ModelAndView("client/courrierList");
		return modelAndView;
	}
	
	@RequestMapping(value="/rest/list", method=RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getCourrierPage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search){
		String result = courrierService.getPage(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/load/{id}", method=RequestMethod.GET)
	public @ResponseBody String load(@PathVariable("id") Long id){
		CourrierDTO dto =  courrierService.load(id);
		return Util.toJson(dto);
	}
	
	@RequestMapping(value="/rest/save", method=RequestMethod.POST )
	public @ResponseBody String save(@RequestBody CourrierDTO dto){
		CourrierDTO returnedDTO = courrierService.save(dto);
		return Util.toJson(returnedDTO);
	}
	
	@RequestMapping(value="/rest/delete/{id}", method=RequestMethod.POST )
	public @ResponseBody String remove(@PathVariable("id") Long id){
		courrierService.delete(id);
		return Util.OK;
	}
	
	@RequestMapping(value="/rest/getAll", method=RequestMethod.GET)
	public @ResponseBody String getAll(){
		return Util.toJson(courrierService.getAll());
	}
	
//	@Transactional
//	@CrossOrigin(origins = "*")
//	@RequestMapping(value = "/rest/initiateWorkflowFacture", method = RequestMethod.GET)
//	public @ResponseBody String initiateWorkflowFacture()
//	{
//		courrierService.initiateWorkflow();
//		return Util.OK;
//	}
	
//	@Transactional
//	@CrossOrigin(origins = "*")
//	@RequestMapping(value = "/rest/initiateWorkflowFacture", method = RequestMethod.POST)
//	public @ResponseBody String initiateWorkflowFacture(@ModelAttribute CourrierDTO dto)
//	{
//		return Util.toJson(courrierService.initiateWorkflow(dto));
//	}
	
	@Transactional
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/rest/getReference", method = RequestMethod.POST)
	public @ResponseBody String getReference()
	{
		return Util.toJson(courrierService.getReference("COURRIER FACTURE"));
	}
	
}