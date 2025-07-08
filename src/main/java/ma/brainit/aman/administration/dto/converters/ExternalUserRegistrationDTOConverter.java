package ma.brainit.aman.administration.dto.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import ma.brainit.aman.administration.dto.ExternalUserRegistrationDTO;
import ma.brainit.aman.administration.model.ExternalUserRegistration;

@Component
public class ExternalUserRegistrationDTOConverter {

    public ExternalUserRegistrationDTO convertFromDataBean(ExternalUserRegistration entity) {
        if (entity == null) {
            return null;
        }

        ExternalUserRegistrationDTO dto = new ExternalUserRegistrationDTO();
        dto.setId(entity.getId());
        dto.setNom(entity.getNom());
        dto.setPrenom(entity.getPrenom());
        dto.setFonction(entity.getFonction());
        dto.setEmail(entity.getEmail());
        dto.setTelephone(entity.getTelephone());
        dto.setInstitution(entity.getInstitution());
        dto.setTypeInstitution(entity.getTypeInstitution());
        dto.setAdresse(entity.getAdresse());
        dto.setVille(entity.getVille());
        dto.setMotifDemande(entity.getMotifDemande());
        dto.setStatut(entity.getStatut());
        dto.setDateDemande(entity.getDateDemande());
        dto.setDateTraitement(entity.getDateTraitement());
        dto.setMotifRejet(entity.getMotifRejet());
        dto.setLoginGenerated(entity.getLoginGenerated());
        dto.setPasswordTemporaire(entity.getPasswordTemporaire());
        dto.setUtilisateurId(entity.getUtilisateurId());
        dto.setTraitePar(entity.getTraitePar());

        return dto;
    }

    public ExternalUserRegistration convertFromDTO(ExternalUserRegistrationDTO dto) {
        if (dto == null) {
            return null;
        }

        ExternalUserRegistration entity = new ExternalUserRegistration();
        entity.setId(dto.getId());
        entity.setNom(dto.getNom());
        entity.setPrenom(dto.getPrenom());
        entity.setFonction(dto.getFonction());
        entity.setEmail(dto.getEmail());
        entity.setTelephone(dto.getTelephone());
        entity.setInstitution(dto.getInstitution());
        entity.setTypeInstitution(dto.getTypeInstitution());
        entity.setAdresse(dto.getAdresse());
        entity.setVille(dto.getVille());
        entity.setMotifDemande(dto.getMotifDemande());
        entity.setStatut(dto.getStatut());
        entity.setDateDemande(dto.getDateDemande());
        entity.setDateTraitement(dto.getDateTraitement());
        entity.setMotifRejet(dto.getMotifRejet());
        entity.setLoginGenerated(dto.getLoginGenerated());
        entity.setPasswordTemporaire(dto.getPasswordTemporaire());
        entity.setUtilisateurId(dto.getUtilisateurId());
        entity.setTraitePar(dto.getTraitePar());

        return entity;
    }

    public List<ExternalUserRegistrationDTO> convertFromDataBeanList(List<ExternalUserRegistration> entities) {
        List<ExternalUserRegistrationDTO> dtos = new ArrayList<>();
        if (entities != null) {
            for (ExternalUserRegistration entity : entities) {
                dtos.add(convertFromDataBean(entity));
            }
        }
        return dtos;
    }

    public List<ExternalUserRegistration> convertFromDTOList(List<ExternalUserRegistrationDTO> dtos) {
        List<ExternalUserRegistration> entities = new ArrayList<>();
        if (dtos != null) {
            for (ExternalUserRegistrationDTO dto : dtos) {
                entities.add(convertFromDTO(dto));
            }
        }
        return entities;
    }
} 