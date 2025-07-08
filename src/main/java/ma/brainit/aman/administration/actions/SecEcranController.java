package ma.brainit.aman.administration.actions;

import java.util.ArrayList;
import java.util.List;
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
import ma.brainit.aman.administration.dto.SecEcranDTO;
import ma.brainit.aman.administration.service.SecEcranService;


@Controller
@RequestMapping(value = "/administration/screen")
public class SecEcranController {

	@Autowired
	private SecEcranService secEcranService;
	
	@RequestMapping(value = "/rest/list", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getData(@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit, @RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction, @RequestParam("search") Optional<String> search) {
		String result = secEcranService.getPaginator(page.orElse(0), limit.orElse(null), sort.orElse(null),
				direction.orElse(null), search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/rest/listByModule/{moduleId}", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getDataByModule(@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit, @RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction, @RequestParam("search") Optional<String> search, @PathVariable("moduleId") Long moduleId) {
		String result = secEcranService.getPaginatorByModule(page.orElse(0), limit.orElse(null), sort.orElse(null),
				direction.orElse(null), search.orElse(null), moduleId);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/rest/load/{id}", method = RequestMethod.GET)
	public @ResponseBody String load(@PathVariable("id") Long id) {
		SecEcranDTO returnedDTO = secEcranService.load(id);
		return Util.toJson(returnedDTO);
	}

	@RequestMapping(value = "/rest/save", method = RequestMethod.POST)
	public @ResponseBody String save(@RequestBody SecEcranDTO dto) {
		SecEcranDTO returnedDTO = secEcranService.save(dto);
		return Util.toJson(returnedDTO);
	}

	@RequestMapping(value = "/rest/delete/{id}", method = RequestMethod.POST)
	public @ResponseBody String remove(@PathVariable("id") Long id) {
		secEcranService.delete(id);
		return Util.OK;
	}

	@RequestMapping(value="/rest/getByModule/{id}", method=RequestMethod.GET)
	public @ResponseBody String getByModule(@PathVariable("id") Long id){
		return Util.toJson(secEcranService.getByModule(id));
	}
}