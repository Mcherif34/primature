package ma.brainit.aman.administration.service;

import java.util.List;

import ma.brainit.aman.administration.dto.ExternalUserRegistrationDTO;
import ma.brainit.aman.administration.model.ExternalUserRegistration.RegistrationStatus;

public interface ExternalUserRegistrationService {

    ExternalUserRegistrationDTO save(ExternalUserRegistrationDTO dto);

    ExternalUserRegistrationDTO load(Long id);

    void delete(Long id);

    List<ExternalUserRegistrationDTO> findAll();

    List<ExternalUserRegistrationDTO> findByStatut(RegistrationStatus statut);

    List<ExternalUserRegistrationDTO> findPendingRegistrations();

    Long countPendingRegistrations();

    ExternalUserRegistrationDTO acceptRegistration(Long id, String adminLogin);

    ExternalUserRegistrationDTO rejectRegistration(Long id, String motifRejet, String adminLogin);

    String getPaginator(Integer page, Integer limit, String sort, String direction, String search);

    boolean isEmailAlreadyRegistered(String email);

    void sendAcceptanceEmail(ExternalUserRegistrationDTO registration);

    void sendRejectionEmail(ExternalUserRegistrationDTO registration);
} 