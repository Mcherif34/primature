package ma.brainit.aman.client.service;

import ma.brainit.aman.client.dto.CorrespondanceSgDTO;
import ma.brainit.aman.client.dto.CourrierDTO;

import java.util.List;

public interface CourrierService {
	
	String getPage(Integer page, Integer limit, String sort, String direction, String search);
	
	CourrierDTO save(CourrierDTO dto);

	CourrierDTO load(Long id);
	
	CourrierDTO loadByType(String type);
	
	CourrierDTO loadByTypeByYear(String type, Integer year);
	
	CourrierDTO loadByTypeByMonthByYear(String type, Integer month, Integer year);

	String delete(Long id);
	
//	String send(CorrespondanceDTO dto);
	
	List<CourrierDTO> getAll();

//	String initiateWorkflow(CorrespondanceSgDTO dto);
	
	String getReference(String type);
}
