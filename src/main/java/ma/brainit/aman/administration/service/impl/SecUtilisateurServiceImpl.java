package ma.brainit.aman.administration.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ma.brainit.base.BasePaginatorDao;
import ma.brainit.base.BaseTable;
import ma.brainit.base.utils.Util;
import ma.brainit.aman.administration.actions.SearchParam;
import ma.brainit.aman.administration.dao.SecAuthoriteDao;
import ma.brainit.aman.administration.dao.SecUtilisateurAuthoriteDao;
import ma.brainit.aman.administration.dao.SecUtilisateurDao;
import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.dto.converters.SecUtilisateurDTOConverter;
import ma.brainit.aman.administration.model.SecAuthorite;
import ma.brainit.aman.administration.model.SecProfile;
import ma.brainit.aman.administration.model.SecUtilisateur;
import ma.brainit.aman.administration.service.SecUtilisateurService;
import ma.brainit.aman.commun.service.EmailService;

@Service
@Transactional(readOnly = true)
public class SecUtilisateurServiceImpl implements SecUtilisateurService {

	static Logger logger = LoggerFactory.getLogger(SecUtilisateurServiceImpl.class);

	@Autowired
	private SecUtilisateurDao secUtilisateurDao;

	@Autowired
	private BasePaginatorDao<SecUtilisateur, Long> paginatorDao;

	@Autowired
	private SecUtilisateurDTOConverter secUtilisateurDTOConverter;
	
	@Autowired
	private SecUtilisateurAuthoriteDao secUtilisateurAuthoriteDao;
	
	@Autowired
	private SecAuthoriteDao secAuthoriteDao;
	
	@Autowired
	private EmailService emailService;

	@Override
	@Transactional
	public SecUtilisateurDTO save(SecUtilisateurDTO dto) {
		SecUtilisateur entity = secUtilisateurDTOConverter.convertFromDTO(dto);
		SecUtilisateur secUtilisateur =  null;
		if (dto.getId() != null && (StringUtils.isBlank(dto.getPassword()) || dto.getLastConnection() == null)) {
			secUtilisateur = secUtilisateurDao.findOne(dto.getId());
			if (dto.getLastConnection() == null) {
				entity.setLastConnection(secUtilisateur.getLastConnection());
			} 
		} 
		if (StringUtils.isBlank(dto.getPassword())) {
			entity.setPassword(secUtilisateur.getPassword());
		} else {
			entity.setPassword(Util.encryptPassword(dto.getLogin(), dto.getPassword()));
			//entity.setToken(RandomStringUtils.randomAlphanumeric(8));
		}
		secUtilisateurDao.save(entity);
		secUtilisateurAuthoriteDao.save(entity.getSecUtilisateurAuthorites());
		
		dto = secUtilisateurDTOConverter.convertFromDataBean(entity);
		return dto;
	}
	
	@Override
	@Transactional
	public SecUtilisateurDTO reset(SecUtilisateurDTO dto) {
		SecUtilisateur entity = secUtilisateurDTOConverter.convertFromDTO(dto);
		String password = RandomStringUtils.randomAlphanumeric(10);
		entity.setPassword(Util.encryptPassword(dto.getLogin(), password));
		entity.setToken(RandomStringUtils.randomAlphanumeric(8));
		
		secUtilisateurDao.save(entity);
		
		dto = secUtilisateurDTOConverter.convertFromDataBean(entity);
		
		//sendMail(dto, password);
		
		return dto;
	}
	
	public void sendMail(SecUtilisateurDTO dto, String password) {
		try {
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
			String subject = "Réinitialisation de votre mot de passe";
			String letter = "<br/>Bonjour "+dto.getLogin()+",<br/><br/>Votre mot de passe a été réinitialisé le "+formatter.format(new Date())+". Veuillez trouver ci-après le nouveau mot de passe : <strong>"+password+"</strong>.<br/>Un changement de mot de passe vous sera demandé à la première connexion.<br/><br/><strong>Pour vous connecter à la solution : <a href='http://sav.medasys.ma/'>http://sav.medasys.ma/</a></strong><br/><br/>";
			String mailLetter = "<div style=\"font-family: 'Open sans'; background-color: #DDE7F4; padding-top: 40px; padding-bottom: 40px; padding-left: 100px; padding-right: 100px;\"><div style=\"background-color: #FFFFFF; padding-left: 40px; padding-right: 40px; \"><div style=\"padding-bottom: 30px; border-bottom: 1px solid #DDDDDD; \"><img src=\"https://res.cloudinary.com/dhsbffdjn/image/upload/v1673343107/medasys/logo_uszpgv.png\" style=\"width: 270px; margin-top: 40px;\" /></div>"+letter+"</div><div style=\"margin-top: 5px; text-align: center;\">2023 &copy; FIXMANAGER. Tous droits réservés.</div></div>";
			
			try {
				emailService.sendMail(dto.getEmail(), subject, mailLetter);
			} catch (Exception e) {
				logger.warn(e.getMessage());
			}
		} catch (Exception e) {
			System.out.println("Erreur generating PDF...");
			e.printStackTrace();
		}
	}
	
	@Override
	@Transactional
	public Boolean changePassword(SecUtilisateurDTO dto) {
		Boolean changed = false;
		SecUtilisateur entity = secUtilisateurDao.findOne(dto.getId());
		if(entity != null){
			String password = Util.encryptPassword(entity.getLogin(), dto.getPassword());
			if (entity.getPassword().equalsIgnoreCase(password)) {
				
				if (!dto.getNvPassword().equals("") && !dto.getNvPasswordConfirmation().equals("")) {
					if (dto.getNvPassword().equals(dto.getNvPasswordConfirmation())) {
						
						entity.setPassword(Util.encryptPassword(entity.getLogin(), dto.getNvPassword()));
						entity.setToken(null);
						changed = true;
					}
					else{
						changed = false;
					}
				}else{
					changed = false;
				}
				
			}
		}
		return changed;
	}

	@Override
	public SecUtilisateurDTO load(Long id) {
		SecUtilisateur entity = secUtilisateurDao.findOne(id);
		return secUtilisateurDTOConverter.convertFromDataBean(entity);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		secUtilisateurDao.delete(id);
	}

	@Override
	public List<SecUtilisateurDTO> findAll() {
		return secUtilisateurDTOConverter.convertFromDataBeanList(secUtilisateurDao.findAll());
	}
	
	@Override
	@Transactional
	public List<SecUtilisateurDTO> getRecoveryAll() {
		List<SecUtilisateur> list = secUtilisateurDao.getRecoveryAll();
		List<SecUtilisateurDTO> dtos = secUtilisateurDTOConverter.convertFromDataBeanList(list);
		
		return dtos;
	}

	@Override
	@Transactional
	public List<SecUtilisateurDTO> getAllUsersWithoutProfile() {
		List<SecUtilisateur> list = secUtilisateurDao.getAllUsersWithoutProfile();
		List<SecUtilisateurDTO> dtos = secUtilisateurDTOConverter.convertFromDataBeanList(list);
		
		return dtos;
	}
	
	@Override
	public SecUtilisateurDTO findByLogin(String login) {
		SecUtilisateur entity = secUtilisateurDao.findByLogin(login);
		if (entity == null) {
			return null;
		}
		return secUtilisateurDTOConverter.convertFromDataBean(entity);
	}
	
	@Override
	public List<SecUtilisateurDTO> findByProfile(Long id) {
		return secUtilisateurDTOConverter.convertFromDataBeanList(secUtilisateurDao.findByProfile(id));
	}

	@Override
	public SecUtilisateurDTO findByToken(String token) {
		SecUtilisateur entity = secUtilisateurDao.findByToken(token);
		SecUtilisateurDTO dto = null;
		if(entity != null){
			dto = secUtilisateurDTOConverter.convertFromDataBean(secUtilisateurDao.findByToken(token));
		}
		return dto;
	}

	@Override
	public SecUtilisateur findUserByLogin(String login) {
		SecUtilisateur secUtilisateur = secUtilisateurDao.findByLogin(login);
		if(secUtilisateur != null){
			if (secUtilisateur.getSecProfiles() != null && !secUtilisateur.getSecProfiles().isEmpty()) {
				Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
				for (SecProfile secProfile : secUtilisateur.getSecProfiles()) {
					if (secProfile.getSecAuthorites() != null && !secProfile.getSecAuthorites().isEmpty()) {
						for (SecAuthorite secAuthorite : secProfile.getSecAuthorites()) {
							authorities.add(new SimpleGrantedAuthority(secAuthorite.getCode()));
						}
					}
				}
				secUtilisateur.setAuthorities(authorities);
			}
		}
		
		return secUtilisateur;
	}

	@Override
	@Transactional
	public void setLastConnection(SecUtilisateur entity) {
		entity.setLastConnection(new Date());
		secUtilisateurDao.save(entity);
	}

	@Override
	@Transactional
	public Boolean changePassword(String token, SecUtilisateurDTO dto) {
		Boolean changed = false;
		SecUtilisateur entity = secUtilisateurDao.findByToken(token);
		if(entity != null){
			String password = Util.encryptPassword(entity.getLogin(), dto.getPassword());
			if (entity.getPassword().equalsIgnoreCase(password)) {
				if (!dto.getNvPassword().equals("") && !dto.getNvPasswordConfirmation().equals("")) {
					if (dto.getNvPassword().equals(dto.getNvPasswordConfirmation())) {
						
						entity.setPassword(Util.encryptPassword(entity.getLogin(), dto.getNvPassword()));
						entity.setToken(null);
						changed = true;
					}
					else{
						changed = false;
					}
				}else{
					changed = false;
				}
			}
		}
		return changed;
	}

	@Override
	public SecUtilisateurDTO getCurrentUser() {
		SecUtilisateur resultat = null;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Object principal = authentication.getPrincipal();
		
		if (principal instanceof SecUtilisateur) {
			resultat = ((SecUtilisateur) principal);
		} else if (principal instanceof String) {
			// Si le principal est une String (login), on récupère l'utilisateur depuis la base
			String login = (String) principal;
			resultat = secUtilisateurDao.findByLogin(login);
		}
		
		// Vérification que l'utilisateur existe
		if (resultat == null) {
			logger.error("Utilisateur non trouvé pour l'authentification: {}", principal);
			throw new RuntimeException("Utilisateur non trouvé dans la base de données");
		}
		
		SecUtilisateurDTO dto = secUtilisateurDTOConverter.convertFromDataBean(resultat);
		dto.setAuthorities(new HashSet<GrantedAuthority>(authentication.getAuthorities()));
		return dto;
	}

	@Override
	public SecUtilisateurDTO findCurrentUser() {
		return this.getCurrentUser();
	}

	@Override
	public String getPaginator(Integer page, Integer limit, String sort, String direction, String search) {
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams = secUtilisateurDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(SecUtilisateur.class);
		List<SecUtilisateur> list = paginatorDao.getPaginator(page, limit, sort, direction, searchParams, null);
		Long totalCount = paginatorDao.count(searchParams, null);
		List<SecUtilisateurDTO> dtos = secUtilisateurDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<SecUtilisateurDTO>(dtos, totalCount));
	}
	
	@Override
	public String getPaginator(Integer page, Integer limit, String sort, String direction, String search, Long profileId) {
		StringBuilder condition = new StringBuilder("");
		if(profileId != null) {
			condition.append("WHERE e.secProfile.id = ").append(profileId);
		}
		List<SearchParam> searchParams = Util.fromSearchParamsJSON(search);
		searchParams = secUtilisateurDTOConverter.convertSearchParamToEntity(search);
		this.paginatorDao.setEntityClass(SecUtilisateur.class);
		List<SecUtilisateur> list = paginatorDao.getPaginator(page, limit, sort, direction, searchParams, condition.toString());
		Long totalCount = paginatorDao.count(searchParams, condition.toString());
		List<SecUtilisateurDTO> dtos = secUtilisateurDTOConverter.convertFromDataBeanList(list);
		return Util.toJson(new BaseTable<SecUtilisateurDTO>(dtos, totalCount));
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return null;
	}

}