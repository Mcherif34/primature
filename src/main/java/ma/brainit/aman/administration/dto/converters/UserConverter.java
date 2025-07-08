package ma.brainit.aman.administration.dto.converters;

import java.util.List;

import org.springframework.stereotype.Service;

import ma.brainit.base.BaseConverter;
import ma.brainit.aman.administration.dto.UserDTO;
import ma.brainit.aman.administration.model.SecUtilisateur;

@Service("userConverter")
public class UserConverter extends BaseConverter<SecUtilisateur,UserDTO>{

	
	@Override
	public List<UserDTO> convertFromDataBeanList(List<SecUtilisateur> list){
		return super.convertFromDataBeanList(list);
	}
	
	@Override
	public SecUtilisateur convertFromDTO(UserDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserDTO convertFromDataBean(SecUtilisateur entity) {
		return super.convertEntityToDTO(entity);
	}

}
