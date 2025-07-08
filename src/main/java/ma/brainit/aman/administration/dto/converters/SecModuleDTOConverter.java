package ma.brainit.aman.administration.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.brainit.base.BaseConverter;
import ma.brainit.aman.administration.dto.SecModuleDTO;
import ma.brainit.aman.administration.model.SecEcran;
import ma.brainit.aman.administration.model.SecModule;

@Service("secModuleDTOConverter")
public class SecModuleDTOConverter extends BaseConverter<SecModule, SecModuleDTO> {

	@Autowired
	private SecEcranDTOConverter secEcranDTOConverter;
	
	@Override
	public List<SecModuleDTO> convertFromDataBeanList(List<SecModule> list) {
		List<SecModuleDTO> dtoList = new ArrayList<SecModuleDTO>();
		for (SecModule entity: list) {
			dtoList.add(convertFromDataBean(entity));
		}
		return dtoList;
	}

	@Override
	public SecModule convertFromDTO(SecModuleDTO dto) {
		SecModule entity = new SecModule();
		if(dto.getIdSecEcrans() != null){
			List<SecEcran> secEcrans = new ArrayList<SecEcran>();
			for(Long id : dto.getIdSecEcrans()){
				secEcrans.add(new SecEcran(id));
			}
			entity.setSecEcrans(secEcrans);
		}
		return  super.convertDTOToEntity(dto, entity);
	}

	public SecModule convertFromDTO(SecModule entity, SecModuleDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public SecModuleDTO convertFromDataBean(SecModule entity) {
		SecModuleDTO dto = super.convertEntityToDTO(entity);
		if(entity.getSecEcrans() != null ){
			dto.setSecEcranDTOs(secEcranDTOConverter.convertFromDataBeanList(entity.getSecEcrans()));
			List<Long> idSecEcrans = new ArrayList<Long>();
			for(SecEcran secEcran : entity.getSecEcrans()){
				idSecEcrans.add(secEcran.getId());
			}
			dto.setIdSecEcrans(idSecEcrans);
		}
		return dto;
	}

}
