package ma.brainit.aman.client.actions;

import ma.brainit.aman.administration.dto.SecProfileDTO;
import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.service.SecProfileService;
import ma.brainit.aman.administration.service.SecUtilisateurService;
import ma.brainit.aman.client.dto.MissionExterneDTO;
import ma.brainit.aman.client.dto.DocumentDTO;
import ma.brainit.aman.client.service.MissionExterneService;
import ma.brainit.aman.client.service.WSubWorkTaskService;
import ma.brainit.base.utils.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Response;
import javax.xml.parsers.ParserConfigurationException;

@Controller
@RequestMapping(value = "/missionexterne")
public class MissionExterneController {

	private static final Logger log = LoggerFactory.getLogger(MissionExterneController.class);
	
	@Autowired
	private MissionExterneService MissionExterneService;
	
	@Autowired
	private WSubWorkTaskService wSubWorkTaskService;
	
	@Autowired
	private SecUtilisateurService secUtilisateurService;
	
	@Autowired
	private SecProfileService secProfileService;
	
	@RequestMapping(value = { "", "/" }, method = RequestMethod.GET)
	public ModelAndView login(Model model, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView("client/missionExterneList");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!(auth instanceof AnonymousAuthenticationToken)) {	
			SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
			SecProfileDTO profile = secProfileService.load(user.getSecProfileId());
			modelAndView.addObject("name", user.getNom());
			modelAndView.addObject("profileId", profile.getPerformerId());
			modelAndView.addObject("profileName", profile.getPerformerName());
			
		} else {
			response.addHeader("REQUIRES_AUTH", "1");
			modelAndView.setViewName("home/login");
		}
		
		return modelAndView;
	}
	
	@RequestMapping(value="/rest/currentListDashboard", method=RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getMissionExterneDashboardPage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search){
		String result = MissionExterneService.getCurrentPageDashboard(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/currentList", method=RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getMissionExternePage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search){
		String result = MissionExterneService.getCurrentPage(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/doneList", method=RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getDoneMissionExternePage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search){
		String result = MissionExterneService.getDonePage(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/closeList", method=RequestMethod.GET)
	public @ResponseBody ResponseEntity<String> getCloseMissionExternePage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search){
		String result = MissionExterneService.getClosePage(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null));
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value="/rest/search/{referenceCourrier}/{receptionDateStart}/{receptionDateEnd}/{referenceExpediteur}/{enregistrementDateStart}/{enregistrementDateEnd}/{expediteur}/{objet}/{status}", method=RequestMethod.GET )
	public @ResponseBody ResponseEntity<String> advancedSearch(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("sort") Optional<String> sort,
			@RequestParam("direction") Optional<String> direction,
			@RequestParam("search") Optional<String> search,
			@PathVariable("referenceCourrier") String referenceCourrier,
			@PathVariable("receptionDateStart") String receptionDateStart,
			@PathVariable("receptionDateEnd") String receptionDateEnd,
			@PathVariable("referenceExpediteur") String referenceExpediteur,
			@PathVariable("enregistrementDateStart") String enregistrementDateStart,
			@PathVariable("enregistrementDateEnd") String enregistrementDateEnd,
			@PathVariable("expediteur") String expediteur,
			@PathVariable("status") String status,
			@PathVariable("objet") String objet) {
		String result = MissionExterneService.advancedSearch(page.orElse(0),limit.orElse(null),sort.orElse(null),direction.orElse(null),search.orElse(null), referenceCourrier, receptionDateStart, receptionDateEnd, referenceExpediteur, enregistrementDateStart, enregistrementDateEnd, expediteur, objet, status);
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
		MissionExterneDTO dto =  MissionExterneService.load(id);
		return Util.toJson(dto);
	}
	
	@RequestMapping(value="/rest/loadByReference/{reference}", method=RequestMethod.GET )
	public @ResponseBody String loadByReference(@PathVariable("reference") String reference){
		MissionExterneDTO dto =  MissionExterneService.loadByReference(reference);
		return Util.toJson(dto);
	}
	
	@RequestMapping(value="/rest/loadDocumentsByReference/{reference}", method=RequestMethod.GET )
	public @ResponseBody String loadDocumentsByReference(@PathVariable("reference") String reference){
		List<DocumentDTO> list =  MissionExterneService.loadDocumentsByReference(reference);
		return Util.toJson(list);
	}
	
	@RequestMapping(value="/rest/save", method=RequestMethod.POST )
	public @ResponseBody String save(@ModelAttribute MissionExterneDTO dto) {
		System.out.println(dto.getExpediteur());
		System.out.println(dto.getDateReception());
		System.out.println(dto.getDateEnregistrement());
		String result = MissionExterneService.save(dto);
		return Util.toJson(result);
	}
	
	@RequestMapping(value="/rest/send", method=RequestMethod.POST )
	public @ResponseBody String send(@ModelAttribute MissionExterneDTO dto){
		MissionExterneDTO missionExterneDTO = MissionExterneService.loadByVolumeId(dto.getwSubWorkId());
		missionExterneDTO.setDocuments(dto.getDocuments());
		missionExterneDTO.setMotif(dto.getMotif());
		String result = MissionExterneService.send(missionExterneDTO);
		return Util.toJson(result);
	}
	
	@RequestMapping(value="/rest/delete", method=RequestMethod.POST )
	public @ResponseBody String remove(@RequestBody Long id){
		String result = MissionExterneService.delete(id);
		return Util.toJson(result);
	}
	
	@RequestMapping(value="/rest/getAll", method=RequestMethod.GET)
	public @ResponseBody String getAll(){
		return Util.toJson(MissionExterneService.getAll());
	}
	
	@RequestMapping(value="/rest/getCurrentCountByEntity/{term}", method=RequestMethod.GET)
	public @ResponseBody String getCurrentCountByEntity(@PathVariable("term") String term){
		return Util.toJson(MissionExterneService.getCurrentCountByEntity(term));
	}
	
	@RequestMapping(value="/rest/getCurrentCount", method=RequestMethod.GET)
	public @ResponseBody String getCurrentCount(){
		return Util.toJson(MissionExterneService.getCurrentCount());
	}
	
	@RequestMapping(value="/rest/getCurrentCountByProfile", method=RequestMethod.GET)
	public @ResponseBody String getCurrentCountByProfile(){
		return Util.toJson(MissionExterneService.getCurrentCountByProfile());
	}
	
	@RequestMapping(value="/rest/getCurrentCountByYear/{year}", method=RequestMethod.GET)
	public @ResponseBody String getCurrentCountByYear(@PathVariable("year") int year){
		return Util.toJson(MissionExterneService.getCurrentCountByYear(year));
	}
	
	@RequestMapping(value="/rest/getCurrentNotOverdueRegularCount", method=RequestMethod.GET)
	public @ResponseBody String getCurrentNotOverdueInvoiceCount(){
		return Util.toJson(MissionExterneService.getCurrentNotOverdueClassiqueCount());
	}
	
	@RequestMapping(value="/rest/getCurrentOverdueRegularCount", method=RequestMethod.GET)
	public @ResponseBody String getCurrentOverdueInvoiceCount(){
		return Util.toJson(MissionExterneService.getCurrentOverdueClassiqueCount());
	}
	
	@RequestMapping(value="/rest/getCompletedRegularCount", method=RequestMethod.GET)
	public @ResponseBody String getCompletedClassiqueCount(){
		return Util.toJson(MissionExterneService.getCompletedClassiqueCount());
	}
	
	@RequestMapping(value="/rest/getCompletedCountByYear/{year}", method=RequestMethod.GET)
	public @ResponseBody String getCompletedCountByYear(@PathVariable("year") int year){
		return Util.toJson(MissionExterneService.getCompletedCountByYear(year));
	}
	
	@RequestMapping(value="/rest/downloadAttachment/{dataId}", method=RequestMethod.GET)
	public void exportXMLDeclaration(HttpServletResponse response, @PathVariable("dataId") long dataId) throws ParserConfigurationException {
		MissionExterneService.downloadAttachment(dataId, response);
	}
	
	@RequestMapping(value="/rest/viewAttachment/{dataId}", method=RequestMethod.GET)
	public @ResponseBody ResponseEntity<byte[]> streamDocument(@PathVariable("dataId") long dataId) {
		return MissionExterneService.streamDocument(dataId);
	}
	
	@Transactional
	@CrossOrigin(origins = "*")
	@RequestMapping(value="/rest/getAllTask/{wWorkId}", method=RequestMethod.GET)
	public @ResponseBody String getAllTask(@PathVariable("wWorkId") Long wWorkId){
		return Util.toJson(wSubWorkTaskService.getAllByWork(wWorkId));
	}
	
}