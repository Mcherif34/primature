package ma.brainit.aman.client.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.client.dto.MaterielDTO;
import ma.brainit.aman.client.model.Materiel;
import ma.brainit.base.BaseConverter;

@Service("materielDTOConverter")
public class MaterielDTOConverter extends BaseConverter<Materiel,MaterielDTO>{

	@Override
	@Transactional
	public List<MaterielDTO> convertFromDataBeanList(List<Materiel> list) {
		List<MaterielDTO> dtoList = new ArrayList<MaterielDTO>();
		for(Materiel e:list){
			MaterielDTO dto = this.convertFromDataBean(e);
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public Materiel convertFromDTO(MaterielDTO dto) {
		Materiel entity = new Materiel();
		entity = super.convertDTOToEntity(dto, entity);
		return entity;
	}

	public Materiel convertFromDTO(Materiel entity,MaterielDTO dto) {
		return super.convertDTOToEntity(dto, entity);
	}

	@Override
	public MaterielDTO convertFromDataBean(Materiel entity) {
		MaterielDTO dto =  super.convertEntityToDTO(entity);
		return dto;
	}

}