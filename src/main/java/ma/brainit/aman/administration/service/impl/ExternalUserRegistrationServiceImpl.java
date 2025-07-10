package ma.brainit.aman.administration.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import ma.brainit.aman.administration.actions.SearchParam;
import ma.brainit.base.BaseTable;
import ma.brainit.base.utils.Util;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.base.BasePaginatorDao;
import ma.brainit.base.utils.Util;
import ma.brainit.aman.administration.dao.ExternalUserRegistrationDao;
import ma.brainit.aman.administration.dao.SecProfileDao;
import ma.brainit.aman.administration.dao.SecUtilisateurDao;
import ma.brainit.aman.administration.dto.ExternalUserRegistrationDTO;
import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.dto.converters.ExternalUserRegistrationDTOConverter;
import ma.brainit.aman.administration.model.ExternalUserRegistration;
import ma.brainit.aman.administration.model.ExternalUserRegistration.RegistrationStatus;
import ma.brainit.aman.administration.model.SecProfile;
import ma.brainit.aman.administration.model.SecUtilisateur;
import ma.brainit.aman.administration.service.ExternalUserRegistrationService;
import ma.brainit.aman.administration.service.SecUtilisateurService;
import ma.brainit.aman.commun.service.EmailService;

@Service
@Transactional(readOnly = true)
public class ExternalUserRegistrationServiceImpl implements ExternalUserRegistrationService {

    static Logger logger = LoggerFactory.getLogger(ExternalUserRegistrationServiceImpl.class);

    @Autowired
    private ExternalUserRegistrationDao externalUserRegistrationDao;

    @Autowired
    private BasePaginatorDao<ExternalUserRegistration, Long> paginatorDao;

    @Autowired
    private ExternalUserRegistrationDTOConverter externalUserRegistrationDTOConverter;

    @Autowired
    private SecUtilisateurService secUtilisateurService;

    @Autowired
    private SecProfileDao secProfileDao;

    @Autowired
    private SecUtilisateurDao secUtilisateurDao;

    @Autowired
    private EmailService emailService;

    @Override
    @Transactional
    public ExternalUserRegistrationDTO save(ExternalUserRegistrationDTO dto) {
        ExternalUserRegistration entity = externalUserRegistrationDTOConverter.convertFromDTO(dto);
        externalUserRegistrationDao.save(entity);
        dto = externalUserRegistrationDTOConverter.convertFromDataBean(entity);
        return dto;
    }

    @Override
    public ExternalUserRegistrationDTO load(Long id) {
        ExternalUserRegistration entity = externalUserRegistrationDao.findOne(id);
        if (entity == null)
            return null;
        return externalUserRegistrationDTOConverter.convertFromDataBean(entity);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        externalUserRegistrationDao.delete(id);
    }

    @Override
    public List<ExternalUserRegistrationDTO> findAll() {
        return externalUserRegistrationDTOConverter.convertFromDataBeanList(externalUserRegistrationDao.findAll());
    }

    @Override
    public List<ExternalUserRegistrationDTO> findByStatut(RegistrationStatus statut) {
        return externalUserRegistrationDTOConverter.convertFromDataBeanList(externalUserRegistrationDao.findByStatut(statut));
    }

    @Override
    public List<ExternalUserRegistrationDTO> findPendingRegistrations() {
        return externalUserRegistrationDTOConverter.convertFromDataBeanList(externalUserRegistrationDao.findPendingRegistrations());
    }

    @Override
    public Long countPendingRegistrations() {
        return externalUserRegistrationDao.countPendingRegistrations();
    }

    @Override
    @Transactional
    public ExternalUserRegistrationDTO acceptRegistration(Long id, String adminLogin) {
        ExternalUserRegistration registration = externalUserRegistrationDao.findOne(id);
        if (registration == null) {
            throw new RuntimeException("Demande d'inscription non trouvée");
        }

        if (registration.getStatut() != RegistrationStatus.EN_ATTENTE) {
            throw new RuntimeException("Cette demande a déjà été traitée");
        }

        // Générer login et mot de passe temporaire
        String login = generateLogin(registration);
        String passwordTemporaire = RandomStringUtils.randomAlphanumeric(10);

        // Créer l'utilisateur
        SecUtilisateurDTO utilisateurDTO = new SecUtilisateurDTO();
        utilisateurDTO.setNom(registration.getNom());
        utilisateurDTO.setPrenom(registration.getPrenom());
        utilisateurDTO.setFonction(registration.getFonction());
        utilisateurDTO.setEmail(registration.getEmail());
        utilisateurDTO.setLogin(login);
        utilisateurDTO.setPassword(passwordTemporaire);
        utilisateurDTO.setActif(true);
        utilisateurDTO.setModule("EXTERNE");

        // Assigner le profil utilisateur externe (ID 5 par défaut, à ajuster selon votre configuration)
        SecProfile profileExterne = secProfileDao.findOne(5L); // Profil pour utilisateurs externes
        if (profileExterne == null) {
            // Si le profil 5 n'existe pas, on cherche un profil par défaut
            List<SecProfile> allProfiles = secProfileDao.findAll();
            if (!allProfiles.isEmpty()) {
                profileExterne = allProfiles.get(0); // Prendre le premier profil disponible
                logger.warn("Profil ID 5 non trouvé, utilisation du profil ID {} pour l'utilisateur externe", profileExterne.getId());
            } else {
                logger.error("Aucun profil trouvé dans la base de données");
                throw new RuntimeException("Aucun profil disponible pour assigner à l'utilisateur externe");
            }
        }

        // Créer l'utilisateur d'abord
        SecUtilisateurDTO savedUser = secUtilisateurService.save(utilisateurDTO);
        
        // Ensuite, assigner le profil manuellement car le convertisseur ne gère pas les profils
        SecUtilisateur userEntity = secUtilisateurDao.findOne(savedUser.getId());
        if (userEntity != null) {
            // 1. Assigner la relation ManyToOne (secProfile)
            userEntity.setSecProfile(profileExterne);
            
            // 2. Assigner la relation ManyToMany (secProfiles) - table SEC_UTILISATEUR_PROFIL
            List<SecProfile> profiles = new ArrayList<>();
            profiles.add(profileExterne);
            userEntity.setSecProfiles(profiles);
            
            // Sauvegarder les modifications
            secUtilisateurDao.save(userEntity);
            logger.info("Profil ID {} assigné à l'utilisateur externe {} (relations secProfile et secProfiles)", 
                       profileExterne.getId(), savedUser.getLogin());
        } else {
            logger.error("Impossible de récupérer l'utilisateur créé avec l'ID {}", savedUser.getId());
            throw new RuntimeException("Erreur lors de l'assignation du profil à l'utilisateur externe");
        }

        // Mettre à jour la demande
        registration.setStatut(RegistrationStatus.ACCEPTEE);
        registration.setDateTraitement(new Date());
        registration.setTraitePar(adminLogin);
        registration.setLoginGenerated(login);
        registration.setPasswordTemporaire(passwordTemporaire);
        registration.setUtilisateurId(savedUser.getId());

        externalUserRegistrationDao.save(registration);

        ExternalUserRegistrationDTO dto = externalUserRegistrationDTOConverter.convertFromDataBean(registration);

        // Envoyer l'email d'acceptation de manière asynchrone pour éviter le rollback
        final ExternalUserRegistrationDTO finalDto = dto;
        new Thread(() -> {
            try {
                sendAcceptanceEmail(finalDto);
            } catch (Exception e) {
                logger.error("Erreur lors de l'envoi de l'email d'acceptation (non bloquant) : " + e.getMessage(), e);
            }
        }).start();

        return dto;
    }

    @Override
    @Transactional
    public ExternalUserRegistrationDTO rejectRegistration(Long id, String motifRejet, String adminLogin) {
        ExternalUserRegistration registration = externalUserRegistrationDao.findOne(id);
        if (registration == null) {
            throw new RuntimeException("Demande d'inscription non trouvée");
        }

        if (registration.getStatut() != RegistrationStatus.EN_ATTENTE) {
            throw new RuntimeException("Cette demande a déjà été traitée");
        }

        registration.setStatut(RegistrationStatus.REJETEE);
        registration.setDateTraitement(new Date());
        registration.setTraitePar(adminLogin);
        registration.setMotifRejet(motifRejet);

        externalUserRegistrationDao.save(registration);

        ExternalUserRegistrationDTO dto = externalUserRegistrationDTOConverter.convertFromDataBean(registration);

        // Envoyer l'email de rejet de manière asynchrone pour éviter le rollback
        final ExternalUserRegistrationDTO finalDto = dto;
        new Thread(() -> {
            try {
                sendRejectionEmail(finalDto);
            } catch (Exception e) {
                logger.error("Erreur lors de l'envoi de l'email de rejet (non bloquant) : " + e.getMessage(), e);
            }
        }).start();

        return dto;
    }



    @Override
    public String getPaginator(Integer page, Integer limit, String sort, String direction, String search) {
        List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
        this.paginatorDao.setEntityClass(ExternalUserRegistration.class);
        List<ExternalUserRegistration> list = paginatorDao.getPaginator(page, limit, sort, direction, searchParams, null);
        Long totalCount = paginatorDao.count(searchParams, null);
        List<ExternalUserRegistrationDTO> dtos = externalUserRegistrationDTOConverter.convertFromDataBeanList(list);
        return Util.toJson(new BaseTable<ExternalUserRegistrationDTO>(dtos, totalCount));
    }

    @Override
    public boolean isEmailAlreadyRegistered(String email) {
        ExternalUserRegistration existing = externalUserRegistrationDao.findByEmail(email);
        return existing != null;
    }

    @Override
    public void sendAcceptanceEmail(ExternalUserRegistrationDTO registration) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            String subject = "Votre demande d'inscription a été acceptée - GED Primature";
            String letter = "<br/>Bonjour " + registration.getPrenom() + " " + registration.getNom() + ",<br/><br/>" +
                    "Nous avons le plaisir de vous informer que votre demande d'inscription au système GED de la Primature a été acceptée le " + formatter.format(registration.getDateTraitement()) + ".<br/><br/>" +
                    "<strong>Vos identifiants de connexion :</strong><br/>" +
                    "Login : <strong>" + registration.getLoginGenerated() + "</strong><br/>" +
                    "Mot de passe temporaire : <strong>" + registration.getPasswordTemporaire() + "</strong><br/><br/>" +
                    "<strong>Important :</strong> Vous devrez changer votre mot de passe lors de votre première connexion.<br/><br/>" +
                    "<strong>Pour vous connecter :</strong> <a href='http://localhost:8686/primature/'>http://localhost:8686/primature/</a><br/><br/>" +
                    "Si vous avez des questions, n'hésitez pas à nous contacter.<br/><br/>" +
                    "Cordialement,<br/>L'équipe GED Primature";

            String mailLetter = "<div style=\"font-family: 'Open sans'; background-color: #DDE7F4; padding-top: 40px; padding-bottom: 40px; padding-left: 100px; padding-right: 100px;\">" +
                    "<div style=\"background-color: #FFFFFF; padding-left: 40px; padding-right: 40px; \">" +
                    "<div style=\"padding-bottom: 30px; border-bottom: 1px solid #DDDDDD; \">" +
                    "<img src=\"https://res.cloudinary.com/ddew5qnts/image/upload/v1752174680/primature_header_ugcwjw.png\" style=\"width: 270px; margin-top: 40px;\" />" +
                    "</div>" + letter + "</div>" +
                    "<div style=\"margin-top: 5px; text-align: center;\">2025 &copy; GED PRIMATURE. Tous droits réservés.</div></div>";

            emailService.sendMail(registration.getEmail(), subject, mailLetter);
        } catch (Exception e) {
            logger.error("Erreur lors de l'envoi de l'email d'acceptation : " + e.getMessage(), e);
        }
    }



    @Override
    public void sendRejectionEmail(ExternalUserRegistrationDTO registration) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            String subject = "Réponse à votre demande d'inscription - GED Primature";
            String letter = "<br/>Bonjour " + registration.getPrenom() + " " + registration.getNom() + ",<br/><br/>" +
                    "Nous avons le regret de vous informer que votre demande d'inscription au système GED de la Primature a été rejetée le " + formatter.format(registration.getDateTraitement()) + ".<br/><br/>" +
                    "<strong>Motif du rejet :</strong><br/>" + registration.getMotifRejet() + "<br/><br/>" +
                    "Si vous pensez qu'il s'agit d'une erreur ou si vous souhaitez plus d'informations, n'hésitez pas à nous contacter.<br/><br/>" +
                    "Cordialement,<br/>L'équipe GED Primature";

            String mailLetter = "<div style=\"font-family: 'Open sans'; background-color: #DDE7F4; padding-top: 40px; padding-bottom: 40px; padding-left: 100px; padding-right: 100px;\">" +
                    "<div style=\"background-color: #FFFFFF; padding-left: 40px; padding-right: 40px; \">" +
                    "<div style=\"padding-bottom: 30px; border-bottom: 1px solid #DDDDDD; \">" +
                    "<img src=\"https://res.cloudinary.com/ddew5qnts/image/upload/v1752174680/primature_header_ugcwjw.png\" style=\"width: 270px; margin-top: 40px;\" />" +
                    "</div>" + letter + "</div>" +
                    "<div style=\"margin-top: 5px; text-align: center;\">2025 &copy; GED PRIMATURE. Tous droits réservés.</div></div>";

            emailService.sendMail(registration.getEmail(), subject, mailLetter);
        } catch (Exception e) {
            logger.error("Erreur lors de l'envoi de l'email de rejet : " + e.getMessage(), e);
        }
    }

    private String generateLogin(ExternalUserRegistration registration) {
        String baseLogin = registration.getPrenom().toLowerCase() + "." + registration.getNom().toLowerCase();
        baseLogin = baseLogin.replaceAll("[^a-zA-Z0-9.]", "");
        
        String login = baseLogin;
        int counter = 1;
        
        // Vérifier si le login existe déjà
        while (secUtilisateurService.findByLogin(login) != null) {
            login = baseLogin + counter;
            counter++;
        }
        
        return login;
    }
} 