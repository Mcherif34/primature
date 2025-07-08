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
import ma.brainit.aman.administration.dto.SecAuthoriteDTO;
import ma.brainit.aman.administration.service.SecAuthoriteService;


@Controller
@RequestMapping(value = "/administration/authority")
public class SecAuthoriteController {

	@Autowired
	private SecAuthoriteService secAuthoriteService;
	
	@RequestMapping(value = "/rest/list", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getData(@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit, @RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction, @RequestParam("search") Optional<String> search) {
		String result = secAuthoriteService.getPaginator(page.orElse(0), limit.orElse(null), sort.orElse(null),
				direction.orElse(null), search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/rest/listByScreen/{screenId}", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getDataByModule(@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit, @RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction, @RequestParam("search") Optional<String> search, @PathVariable("screenId") Long screenId) {
		String result = secAuthoriteService.getPaginatorByScreen(page.orElse(0), limit.orElse(null), sort.orElse(null),
				direction.orElse(null), search.orElse(null), screenId);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/rest/load/{id}", method = RequestMethod.GET)
	public @ResponseBody String load(@PathVariable("id") Long id) {
		SecAuthoriteDTO returnedDTO = secAuthoriteService.load(id);
		return Util.toJson(returnedDTO);
	}

	@RequestMapping(value = "/rest/save", method = RequestMethod.POST)
	public @ResponseBody String save(@RequestBody SecAuthoriteDTO dto) {
		SecAuthoriteDTO returnedDTO = secAuthoriteService.save(dto);
		return Util.toJson(returnedDTO);
	}

	@RequestMapping(value = "/rest/delete/{id}", method = RequestMethod.POST)
	public @ResponseBody String remove(@PathVariable("id") Long id) {
		secAuthoriteService.delete(id);
		return Util.OK;
	}

	@RequestMapping(value="/rest/getByScreen/{id}", method=RequestMethod.GET)
	public @ResponseBody String getByScreen(@PathVariable("id") Long id){
		return Util.toJson(secAuthoriteService.getByScreen(id));
	}
}