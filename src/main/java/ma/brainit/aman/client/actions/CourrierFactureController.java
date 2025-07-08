package ma.brainit.aman.client.actions;

import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.service.SecUtilisateurService;
import ma.brainit.aman.client.dto.CourrierFactureDTO;
import ma.brainit.aman.client.dto.DocumentDTO;
import ma.brainit.aman.client.service.CourrierFactureService;
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
@RequestMapping(value = "/courrier/invoice")
public class CourrierFactureController {

	private static final Logger log = LoggerFactory.getLogger(CourrierFactureController.class);
	
	@Autowired
	private CourrierFactureService CourrierFactureService;
	
	@Autowired
	private WSubWorkTaskService wSubWorkTaskService;
	
	@Autowired
	private SecUtilisateurService secUtilisateurService;
	
	@RequestMapping(value = { "", "/" }, method = RequestMethod.GET)
	public ModelAndView login(Model model, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView("client/courrierFactureList");
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
	public @ResponseBody ResponseEntity<String> getCourrierFacturePage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search){
		String result = CourrierFactureService.getPage(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/currentList", method=RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getCurrentCourrierFacturePage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search){
		String result = CourrierFactureService.getCurrentPage(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/search/{refArriveeBoc}/{factureDateStart}/{factureDateEnd}/{numFacture}/{receptionDateStart}/{receptionDateEnd}/{refExpediteur}/{enregistrementDateStart}/{enregistrementDateEnd}/{expediteur}/{montantFacture}/{status}/{attestationRegularite}/{decompteDateStart}/{decompteDateEnd}/{numDecompte}/{devise}/{elementFacturation}/{numBcContrat}/{typeCourrier}/{delaiPaiement}/{formeJuridique}/{validationDateStart}/{validationDateEnd}", method=RequestMethod.GET )
	public @ResponseBody ResponseEntity<String> advancedSearch(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search,
			@PathVariable("refArriveeBoc") String refArriveeBoc,
			@PathVariable("factureDateStart") String factureDateStart,
			@PathVariable("factureDateEnd") String factureDateEnd,
			@PathVariable("numFacture") String numFacture,
			@PathVariable("receptionDateStart") String receptionDateStart,
			@PathVariable("receptionDateEnd") String receptionDateEnd,
			@PathVariable("refExpediteur") String refExpediteur,
			@PathVariable("enregistrementDateStart") String enregistrementDateStart,
			@PathVariable("enregistrementDateEnd") String enregistrementDateEnd,
			@PathVariable("expediteur") String expediteur,
			@PathVariable("montantFacture") String montantFacture,
			@PathVariable("status") String status,
			@PathVariable("attestationRegularite") String attestationRegularite,
			@PathVariable("decompteDateStart") String decompteDateStart,
			@PathVariable("decompteDateEnd") String decompteDateEnd,
			@PathVariable("numDecompte") String numDecompte,
			@PathVariable("devise") String devise,
			@PathVariable("elementFacturation") String elementFacturation,
			@PathVariable("numBcContrat") String numBcContrat,
			@PathVariable("typeCourrier") String typeCourrier,
			@PathVariable("delaiPaiement") String delaiPaiement,
			@PathVariable("formeJuridique") String formeJuridique,
			@PathVariable("validationDateStart") String validationDateStart,
			@PathVariable("validationDateEnd") String validationDateEnd) {
		String result = CourrierFactureService.advancedSearch(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null), refArriveeBoc, factureDateStart, factureDateEnd, numFacture, receptionDateStart, receptionDateEnd, refExpediteur, enregistrementDateStart, enregistrementDateEnd, expediteur, montantFacture, status, attestationRegularite, decompteDateStart, decompteDateEnd, numDecompte, devise, elementFacturation, numBcContrat, typeCourrier, delaiPaiement, formeJuridique, validationDateStart, validationDateEnd);
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
		CourrierFactureDTO dto =  CourrierFactureService.load(id);
		return Util.toJson(dto);
	}
	
	@RequestMapping(value="/rest/loadByReference/{reference}", method=RequestMethod.GET )
	public @ResponseBody String loadByReference(@PathVariable("reference") String reference){
		CourrierFactureDTO dto =  CourrierFactureService.loadByReference(reference);
		return Util.toJson(dto);
	}
	
	@RequestMapping(value="/rest/loadDocumentsByReference/{reference}", method=RequestMethod.GET )
	public @ResponseBody String loadDocumentsByReference(@PathVariable("reference") String reference){
		List<DocumentDTO> list =  CourrierFactureService.loadDocumentsByReference(reference);
		return Util.toJson(list);
	}
	
	@RequestMapping(value="/rest/save", method=RequestMethod.POST )
	public @ResponseBody String save(@RequestBody CourrierFactureDTO dto){
		CourrierFactureDTO returnedDTO = CourrierFactureService.save(dto);
		return Util.toJson(returnedDTO);
	}
	
	@RequestMapping(value="/rest/delete/{id}", method=RequestMethod.POST )
	public @ResponseBody String remove(@PathVariable("id") Long id){
		CourrierFactureService.delete(id);
		return Util.OK;
	}
	
	@RequestMapping(value="/rest/getAll", method=RequestMethod.GET)
	public @ResponseBody String getAll(){
		return Util.toJson(CourrierFactureService.getAll());
	}
	
	@RequestMapping(value="/rest/getCurrentInvoiceCount", method=RequestMethod.GET)
	public @ResponseBody String getCurrentInvoiceCount(){
		return Util.toJson(CourrierFactureService.getCurrentInvoiceCount());
	}
	
	@RequestMapping(value="/rest/getCurrentInvoiceCountByYear/{year}", method=RequestMethod.GET)
	public @ResponseBody String getCurrentInvoiceCountByYear(@PathVariable("year") int year){
		return Util.toJson(CourrierFactureService.getCurrentInvoiceCountByYear(year));
	}
	
	@RequestMapping(value="/rest/getCurrentNotOverdueInvoiceCount", method=RequestMethod.GET)
	public @ResponseBody String getCurrentNotOverdueInvoiceCount(){
		return Util.toJson(CourrierFactureService.getCurrentNotOverdueInvoiceCount());
	}
	
	@RequestMapping(value="/rest/getCurrentOverdueInvoiceCount", method=RequestMethod.GET)
	public @ResponseBody String getCurrentOverdueInvoiceCount(){
		return Util.toJson(CourrierFactureService.getCurrentOverdueInvoiceCount());
	}
	
	@RequestMapping(value="/rest/getCompletedInvoiceCount", method=RequestMethod.GET)
	public @ResponseBody String getCompletedInvoiceCount(){
		return Util.toJson(CourrierFactureService.getCompletedInvoiceCount());
	}
	
	@RequestMapping(value="/rest/getCompletedInvoiceCountByYear/{year}", method=RequestMethod.GET)
	public @ResponseBody String getCompletedInvoiceCountByYear(@PathVariable("year") int year){
		return Util.toJson(CourrierFactureService.getCompletedInvoiceCountByYear(year));
	}
	
	@RequestMapping(value="/rest/downloadAttachment/{dataId}", method=RequestMethod.GET)
	public void exportXMLDeclaration(HttpServletResponse response, @PathVariable("dataId") long dataId) throws ParserConfigurationException {
		CourrierFactureService.downloadAttachment(dataId, response);
	}
	
	@Transactional
	@CrossOrigin(origins = "*")
	@RequestMapping(value="/rest/getAllTask/{wWorkId}", method=RequestMethod.GET)
	public @ResponseBody String getAllTask(@PathVariable("wWorkId") Long wWorkId){
		return Util.toJson(wSubWorkTaskService.getAllByWork(wWorkId));
	}
	
}