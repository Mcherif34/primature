package ma.brainit.aman.administration.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.aman.administration.model.ExternalUserRegistration;
import ma.brainit.aman.administration.model.ExternalUserRegistration.RegistrationStatus;

@Transactional(readOnly = true)
public interface ExternalUserRegistrationDao extends JpaRepository<ExternalUserRegistration, Long>, JpaSpecificationExecutor<ExternalUserRegistration> {

    @Query("SELECT e FROM ExternalUserRegistration e WHERE e.email = :email")
    ExternalUserRegistration findByEmail(@Param("email") String email);

    @Query("SELECT e FROM ExternalUserRegistration e WHERE e.statut = :statut ORDER BY e.dateDemande DESC")
    List<ExternalUserRegistration> findByStatut(@Param("statut") RegistrationStatus statut);

    @Query("SELECT e FROM ExternalUserRegistration e WHERE e.statut = 'EN_ATTENTE' ORDER BY e.dateDemande ASC")
    List<ExternalUserRegistration> findPendingRegistrations();

    @Query("SELECT e FROM ExternalUserRegistration e WHERE e.utilisateurId = :utilisateurId")
    ExternalUserRegistration findByUtilisateurId(@Param("utilisateurId") Long utilisateurId);

    @Query("SELECT COUNT(e) FROM ExternalUserRegistration e WHERE e.statut = 'EN_ATTENTE'")
    Long countPendingRegistrations();

    @Query("SELECT e FROM ExternalUserRegistration e WHERE e.institution LIKE %:institution% OR e.nom LIKE %:search% OR e.prenom LIKE %:search% OR e.email LIKE %:search%")
    List<ExternalUserRegistration> searchRegistrations(@Param("search") String search, @Param("institution") String institution);
} 