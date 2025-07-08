package ma.brainit.aman.client.actions;

import ma.brainit.aman.client.dto.PerformerDTO;
import ma.brainit.aman.client.service.PerformerService;
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
@RequestMapping(value = "/courrier/performer")
public class PerformerController {

	private static final Logger log = LoggerFactory.getLogger(PerformerController.class);
	@Autowired
	private PerformerService PerformerService;
	
	@RequestMapping(value="/rest/load/{id}", method=RequestMethod.GET )
	public @ResponseBody String load(@PathVariable("id") Long id){
		PerformerDTO dto =  PerformerService.load(id);
		return Util.toJson(dto);
	}
	
	@Transactional
	@CrossOrigin(origins = "*")
	@RequestMapping(value="/rest/save", method=RequestMethod.POST )
	public @ResponseBody String save(@ModelAttribute PerformerDTO dto){
		PerformerDTO returnedDTO = PerformerService.save(dto);
		return Util.toJson(returnedDTO);
	}
	
	@RequestMapping(value="/rest/delete/{id}", method=RequestMethod.POST )
	public @ResponseBody String remove(@PathVariable("id") Long id){
		PerformerService.delete(id);
		return Util.OK;
	}
	
	@Transactional
	@CrossOrigin(origins = "*")
	@RequestMapping(value="/rest/getAll", method=RequestMethod.GET)
	public @ResponseBody String getAll(){
		return Util.toJson(PerformerService.getAll());
	}
	
	@Transactional
	@CrossOrigin(origins = "*")
	@RequestMapping(value="/rest/getAllGroups", method=RequestMethod.GET)
	public @ResponseBody String getAllGroups(){
		return Util.toJson(PerformerService.getAllGroups());
	}
	
}