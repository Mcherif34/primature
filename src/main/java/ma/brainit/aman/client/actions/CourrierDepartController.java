package ma.brainit.aman.client.actions;

import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.service.SecUtilisateurService;
import ma.brainit.aman.client.dto.CourrierDepartDTO;
import ma.brainit.aman.client.dto.DocumentDTO;
import ma.brainit.aman.client.service.CourrierDepartService;
import ma.brainit.aman.client.service.WSubWorkTaskService;
import ma.brainit.base.utils.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;

@Controller
@RequestMapping(value = "/courrier/outgoing")
public class CourrierDepartController {

	private static final Logger log = LoggerFactory.getLogger(CourrierDepartController.class);
	
	@Autowired
	private CourrierDepartService CourrierDepartService;
	
	@Autowired
	private WSubWorkTaskService wSubWorkTaskService;
	
	@Autowired
	private SecUtilisateurService secUtilisateurService;
	
	@RequestMapping(value = { "", "/" }, method = RequestMethod.GET)
	public ModelAndView login(Model model, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView("client/courrierDepartList");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!(auth instanceof AnonymousAuthenticationToken)) {
			SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
			modelAndView.addObject("name", user.getNom());
			modelAndView.addObject("profile", user.getSecProfileCode());
		} else {
			response.addHeader("REQUIRES_AUTH", "1");
			modelAndView.setViewName("home/login");
		}
		return modelAndView;
	}
	
	@RequestMapping(value="/rest/list", method=RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getCourrierDepartPage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search){
		String result = CourrierDepartService.getPage(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/currentList", method=RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getCurrentCourrierDepartPage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search){
		String result = CourrierDepartService.getCurrentPage(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/search/{refDepartBoc}/{livraisonDateStart}/{livraisonDateEnd}/{refDestinataire}/{departDateStart}/{departDateEnd}/{destinataire}/{status}/{typeCourrier}/{objet}/{observations}/{urgence}/{ville}/{adresse}/{refRegistrePhysique}/{redacteur}/{signataire}", method=RequestMethod.GET )
	public @ResponseBody ResponseEntity<String> advancedSearch(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search,
			@PathVariable("refDepartBoc") String refDepartBoc,
			@PathVariable("livraisonDateStart") String livraisonDateStart,
			@PathVariable("livraisonDateEnd") String livraisonDateEnd,
			@PathVariable("refDestinataire") String refDestinataire,
			@PathVariable("departDateStart") String departDateStart,
			@PathVariable("departDateEnd") String departDateEnd,
			@PathVariable("destinataire") String destinataire,
			@PathVariable("status") String status,
			@PathVariable("typeCourrier") String typeCourrier,
			@PathVariable("objet") String objet,
			@PathVariable("observations") String observations,
			@PathVariable("urgence") String urgence,
			@PathVariable("ville") String ville,
			@PathVariable("adresse") String adresse,
			@PathVariable("refRegistrePhysique") String refRegistrePhysique,
			@PathVariable("redacteur") String redacteur,
			@PathVariable("signataire") String signataire) {
		String result = CourrierDepartService.advancedSearch(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null), refDepartBoc, livraisonDateStart, livraisonDateEnd, refDestinataire, departDateStart, departDateEnd, destinataire, status, typeCourrier, objet, observations, urgence, ville, adresse, refRegistrePhysique, redacteur, signataire);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/taskList/{workId}", method=RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getTaskPage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search,
			@PathVariable("workId") Long workId){
		String result = wSubWorkTaskService.getPage(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null), workId);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/load/{id}", method=RequestMethod.GET )
	public @ResponseBody String load(@PathVariable("id") Long id){
		CourrierDepartDTO dto =  CourrierDepartService.load(id);
		return Util.toJson(dto);
	}
	
	@RequestMapping(value="/rest/loadByReference/{reference}", method=RequestMethod.GET )
	public @ResponseBody String loadByReference(@PathVariable("reference") String reference){
		CourrierDepartDTO dto =  CourrierDepartService.loadByReference(reference);
		return Util.toJson(dto);
	}
	
	@RequestMapping(value="/rest/loadDocumentsByCourrier/{id}", method=RequestMethod.GET )
	public @ResponseBody String loadDocumentsByCourrier(@PathVariable("id") Long id){
		List<DocumentDTO> list =  CourrierDepartService.loadDocumentsByCourrier(id);
		return Util.toJson(list);
	}
	
	@RequestMapping(value="/rest/loadDocumentsByReference/{reference}", method=RequestMethod.GET )
	public @ResponseBody String loadDocumentsByReference(@PathVariable("reference") String reference){
		List<DocumentDTO> list =  CourrierDepartService.loadDocumentsByReference(reference);
		return Util.toJson(list);
	}
	
	@RequestMapping(value="/rest/save", method=RequestMethod.POST )
	public @ResponseBody String save(@RequestBody CourrierDepartDTO dto){
		CourrierDepartDTO returnedDTO = CourrierDepartService.save(dto);
		return Util.toJson(returnedDTO);
	}
	
	@RequestMapping(value="/rest/delete/{id}", method=RequestMethod.POST )
	public @ResponseBody String remove(@PathVariable("id") Long id){
		CourrierDepartService.delete(id);
		return Util.OK;
	}
	
	@RequestMapping(value="/rest/getAll", method=RequestMethod.GET)
	public @ResponseBody String getAll(){
		return Util.toJson(CourrierDepartService.getAll());
	}
	
	@RequestMapping(value="/rest/getCurrentOutgoingCount", method=RequestMethod.GET)
	public @ResponseBody String getCurrentDepartCount(){
		return Util.toJson(CourrierDepartService.getCurrentDepartCount());
	}
	
	@RequestMapping(value="/rest/getCurrentOutgoingCountByYear/{year}", method=RequestMethod.GET)
	public @ResponseBody String getCurrentDepartCountByYear(@PathVariable("year") int year){
		return Util.toJson(CourrierDepartService.getCurrentDepartCountByYear(year));
	}
	
	@RequestMapping(value="/rest/getCurrentNotOverdueOutgoingCount", method=RequestMethod.GET)
	public @ResponseBody String getCurrentNotOverdueInvoiceCount(){
		return Util.toJson(CourrierDepartService.getCurrentNotOverdueDepartCount());
	}
	
	@RequestMapping(value="/rest/getCurrentOverdueOutgoingCount", method=RequestMethod.GET)
	public @ResponseBody String getCurrentOverdueInvoiceCount(){
		return Util.toJson(CourrierDepartService.getCurrentOverdueDepartCount());
	}
	
	@RequestMapping(value="/rest/getCompletedOutgoingCount", method=RequestMethod.GET)
	public @ResponseBody String getCompletedDepartCount(){
		return Util.toJson(CourrierDepartService.getCompletedDepartCount());
	}
	
	@RequestMapping(value="/rest/getCompletedOutgoingCountByYear/{year}", method=RequestMethod.GET)
	public @ResponseBody String getCompletedDepartCountByYear(@PathVariable("year") int year){
		return Util.toJson(CourrierDepartService.getCompletedDepartCountByYear(year));
	}
	
	@RequestMapping(value="/rest/downloadAttachment/{dataId}", method=RequestMethod.GET)
	public void exportXMLDeclaration(HttpServletResponse response, @PathVariable("dataId") long dataId) throws ParserConfigurationException {
		CourrierDepartService.downloadAttachment(dataId, response);
	}
	
	@Transactional
	@CrossOrigin(origins = "*")
	@RequestMapping(value="/rest/getAllTask/{wWorkId}", method=RequestMethod.GET)
	public @ResponseBody String getAllTask(@PathVariable("wWorkId") Long wWorkId){
		return Util.toJson(wSubWorkTaskService.getAllByWork(wWorkId));
	}
	
}