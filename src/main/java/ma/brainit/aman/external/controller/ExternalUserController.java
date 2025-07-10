package ma.brainit.aman.external.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ma.brainit.aman.administration.dto.SecUtilisateurDTO;
import ma.brainit.aman.administration.service.SecUtilisateurService;
import ma.brainit.base.utils.Util;

@Controller
@RequestMapping("/external")
public class ExternalUserController {

    @Autowired
    private SecUtilisateurService secUtilisateurService;

    /**
     * Dashboard principal pour les utilisateurs externes
     */
    @RequestMapping(value = "/dashboard", method = RequestMethod.GET)
    public ModelAndView dashboard(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView modelAndView = new ModelAndView();
        
        if (!(auth instanceof AnonymousAuthenticationToken)) {
            SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
            
            // Vérifier si c'est un utilisateur externe
            if (user != null && "EXTERNE".equals(user.getModule())) {
                modelAndView.addObject("user", user);
                modelAndView.addObject("name", user.getNom() + " " + user.getPrenom());
                modelAndView.addObject("email", user.getEmail());
                modelAndView.addObject("fonction", user.getFonction());
                modelAndView.setViewName("external/dashboard");
            } else {
                // Rediriger vers l'espace admin si ce n'est pas un utilisateur externe
                modelAndView.setViewName("redirect:/");
            }
        } else {
            response.addHeader("REQUIRES_AUTH", "1");
            modelAndView.setViewName("home/login");
        }
        
        return modelAndView;
    }

    /**
     * Page de profil utilisateur externe
     */
    @RequestMapping(value = "/profile", method = RequestMethod.GET)
    public ModelAndView profile(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView modelAndView = new ModelAndView();
        
        if (!(auth instanceof AnonymousAuthenticationToken)) {
            SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
            
            if (user != null && "EXTERNE".equals(user.getModule())) {
                modelAndView.addObject("user", user);
                modelAndView.addObject("name", user.getNom() + " " + user.getPrenom());
                modelAndView.setViewName("external/profile");
            } else {
                modelAndView.setViewName("redirect:/");
            }
        } else {
            response.addHeader("REQUIRES_AUTH", "1");
            modelAndView.setViewName("home/login");
        }
        
        return modelAndView;
    }

    /**
     * Page de changement de mot de passe
     */
    @RequestMapping(value = "/change-password", method = RequestMethod.GET)
    public ModelAndView changePassword(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView modelAndView = new ModelAndView();
        
        if (!(auth instanceof AnonymousAuthenticationToken)) {
            SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
            
            if (user != null && "EXTERNE".equals(user.getModule())) {
                modelAndView.addObject("user", user);
                modelAndView.addObject("name", user.getNom() + " " + user.getPrenom());
                modelAndView.setViewName("external/change-password");
            } else {
                modelAndView.setViewName("redirect:/");
            }
        } else {
            response.addHeader("REQUIRES_AUTH", "1");
            modelAndView.setViewName("home/login");
        }
        
        return modelAndView;
    }

    /**
     * Page d'aide et support
     */
    @RequestMapping(value = "/help", method = RequestMethod.GET)
    public ModelAndView help(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView modelAndView = new ModelAndView();
        
        if (!(auth instanceof AnonymousAuthenticationToken)) {
            SecUtilisateurDTO user = secUtilisateurService.getCurrentUser();
            
            if (user != null && "EXTERNE".equals(user.getModule())) {
                modelAndView.addObject("user", user);
                modelAndView.addObject("name", user.getNom() + " " + user.getPrenom());
                modelAndView.setViewName("external/help");
            } else {
                modelAndView.setViewName("redirect:/");
            }
        } else {
            response.addHeader("REQUIRES_AUTH", "1");
            modelAndView.setViewName("home/login");
        }
        
        return modelAndView;
    }

    /**
     * API pour mettre à jour le profil
     */
    @RequestMapping(value = "/rest/update-profile", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<String> updateProfile(@RequestBody SecUtilisateurDTO dto) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Mettre à jour seulement les champs autorisés
                currentUser.setNom(dto.getNom());
                currentUser.setPrenom(dto.getPrenom());
                currentUser.setEmail(dto.getEmail());
                currentUser.setFonction(dto.getFonction());
                
                SecUtilisateurDTO updated = secUtilisateurService.save(currentUser);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Profil mis à jour avec succès");
                response.put("user", updated);
                
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur lors de la mise à jour : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour changer le mot de passe
     */
    @RequestMapping(value = "/rest/change-password", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<String> changePassword(@RequestBody Map<String, String> request) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                String currentPassword = request.get("currentPassword");
                String newPassword = request.get("newPassword");
                String confirmPassword = request.get("confirmPassword");
                
                if (newPassword == null || !newPassword.equals(confirmPassword)) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", false);
                    response.put("message", "Les nouveaux mots de passe ne correspondent pas");
                    return ResponseEntity.badRequest().body(Util.toJson(response));
                }
                
                // Vérifier l'ancien mot de passe
                String encryptedCurrentPassword = ma.brainit.base.utils.Util.encryptPassword(currentUser.getLogin(), currentPassword);
                if (!encryptedCurrentPassword.equals(currentUser.getPassword())) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", false);
                    response.put("message", "Le mot de passe actuel est incorrect");
                    return ResponseEntity.badRequest().body(Util.toJson(response));
                }
                
                // Changer le mot de passe
                currentUser.setPassword(ma.brainit.base.utils.Util.encryptPassword(currentUser.getLogin(), newPassword));
                secUtilisateurService.save(currentUser);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Mot de passe modifié avec succès");
                
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur lors du changement de mot de passe : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    // ========== NOUVELLES APIs POUR ANGULARJS ==========

    /**
     * API pour obtenir les informations de l'utilisateur actuel
     */
    @RequestMapping(value = "/api/user/current", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> getCurrentUser() {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", currentUser);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Utilisateur non trouvé ou non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour obtenir le profil utilisateur
     */
    @RequestMapping(value = "/api/user/profile", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> getUserProfile() {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", currentUser);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Utilisateur non trouvé ou non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour mettre à jour le profil utilisateur
     */
    @RequestMapping(value = "/api/user/profile", method = RequestMethod.PUT)
    public @ResponseBody ResponseEntity<String> updateUserProfile(@RequestBody SecUtilisateurDTO userDto) {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Mettre à jour seulement les champs autorisés
                currentUser.setNom(userDto.getNom());
                currentUser.setPrenom(userDto.getPrenom());
                currentUser.setEmail(userDto.getEmail());
                currentUser.setFonction(userDto.getFonction());
                
                SecUtilisateurDTO updated = secUtilisateurService.save(currentUser);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Profil mis à jour avec succès");
                response.put("data", updated);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur lors de la mise à jour : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour changer le mot de passe (nouvelle version)
     */
    @RequestMapping(value = "/api/user/change-password", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<String> changeUserPassword(@RequestBody Map<String, String> passwordData) {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                String currentPassword = passwordData.get("currentPassword");
                String newPassword = passwordData.get("newPassword");
                String confirmPassword = passwordData.get("confirmPassword");
                
                if (newPassword == null || !newPassword.equals(confirmPassword)) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", false);
                    response.put("message", "Les nouveaux mots de passe ne correspondent pas");
                    return ResponseEntity.badRequest().body(Util.toJson(response));
                }
                
                // Vérifier l'ancien mot de passe
                String encryptedCurrentPassword = ma.brainit.base.utils.Util.encryptPassword(currentUser.getLogin(), currentPassword);
                if (!encryptedCurrentPassword.equals(currentUser.getPassword())) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", false);
                    response.put("message", "Le mot de passe actuel est incorrect");
                    return ResponseEntity.badRequest().body(Util.toJson(response));
                }
                
                // Changer le mot de passe
                currentUser.setPassword(ma.brainit.base.utils.Util.encryptPassword(currentUser.getLogin(), newPassword));
                secUtilisateurService.save(currentUser);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Mot de passe modifié avec succès");
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur lors du changement de mot de passe : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour obtenir les statistiques du dashboard
     */
    @RequestMapping(value = "/api/dashboard/stats", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> getDashboardStats() {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Données de démonstration - à remplacer par de vraies données
                Map<String, Object> stats = new HashMap<>();
                stats.put("totalRequests", 15);
                stats.put("pendingRequests", 5);
                stats.put("approvedRequests", 8);
                stats.put("rejectedRequests", 2);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", stats);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour obtenir les demandes récentes
     */
    @RequestMapping(value = "/api/requests/recent", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> getRecentRequests() {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Données de démonstration - à remplacer par de vraies données
                java.util.List<Map<String, Object>> requests = new java.util.ArrayList<>();
                
                Map<String, Object> request1 = new HashMap<>();
                request1.put("id", 1);
                request1.put("type", "Demande d'accès");
                request1.put("dateCreation", "2025-07-08");
                request1.put("statut", "EN_ATTENTE");
                
                Map<String, Object> request2 = new HashMap<>();
                request2.put("id", 2);
                request2.put("type", "Modification de profil");
                request2.put("dateCreation", "2025-07-07");
                request2.put("statut", "APPROUVEE");
                
                requests.add(request1);
                requests.add(request2);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", requests);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour obtenir les notifications
     */
    @RequestMapping(value = "/api/notifications", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> getNotifications() {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Données de démonstration - à remplacer par de vraies données
                java.util.List<Map<String, Object>> notifications = new java.util.ArrayList<>();
                
                Map<String, Object> notif1 = new HashMap<>();
                notif1.put("id", 1);
                notif1.put("titre", "Demande approuvée");
                notif1.put("message", "Votre demande d'accès a été approuvée");
                notif1.put("dateCreation", "2025-07-08 10:30:00");
                
                Map<String, Object> notif2 = new HashMap<>();
                notif2.put("id", 2);
                notif2.put("titre", "Nouvelle fonctionnalité");
                notif2.put("message", "Une nouvelle fonctionnalité est disponible");
                notif2.put("dateCreation", "2025-07-07 15:45:00");
                
                notifications.add(notif1);
                notifications.add(notif2);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", notifications);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour obtenir les activités utilisateur
     */
    @RequestMapping(value = "/api/user/activities", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> getUserActivities() {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Données de démonstration - à remplacer par de vraies données
                java.util.List<Map<String, Object>> activities = new java.util.ArrayList<>();
                
                Map<String, Object> activity1 = new HashMap<>();
                activity1.put("id", 1);
                activity1.put("action", "Connexion");
                activity1.put("description", "Connexion au système");
                activity1.put("date", "2025-07-08 09:00:00");
                activity1.put("ipAddress", "192.168.1.100");
                
                Map<String, Object> activity2 = new HashMap<>();
                activity2.put("id", 2);
                activity2.put("action", "Modification profil");
                activity2.put("description", "Mise à jour des informations personnelles");
                activity2.put("date", "2025-07-07 14:30:00");
                activity2.put("ipAddress", "192.168.1.100");
                
                activities.add(activity1);
                activities.add(activity2);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", activities);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour obtenir les FAQ
     */
    @RequestMapping(value = "/api/help/faqs", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> getFAQs() {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Données de démonstration
                java.util.List<Map<String, Object>> faqs = new java.util.ArrayList<>();
                
                Map<String, Object> faq1 = new HashMap<>();
                faq1.put("id", 1);
                faq1.put("question", "Comment créer une nouvelle demande ?");
                faq1.put("answer", "Pour créer une nouvelle demande, cliquez sur \"Nouvelle demande\" dans votre tableau de bord, remplissez le formulaire et soumettez.");
                
                Map<String, Object> faq2 = new HashMap<>();
                faq2.put("id", 2);
                faq2.put("question", "Comment suivre l'état de mes demandes ?");
                faq2.put("answer", "Vous pouvez suivre l'état de vos demandes dans la section \"Mes dernières demandes\" de votre tableau de bord.");
                
                faqs.add(faq1);
                faqs.add(faq2);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", faqs);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour obtenir les guides
     */
    @RequestMapping(value = "/api/help/guides", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> getGuides() {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Données de démonstration
                java.util.List<Map<String, Object>> guides = new java.util.ArrayList<>();
                
                Map<String, Object> guide1 = new HashMap<>();
                guide1.put("id", 1);
                guide1.put("title", "Premiers pas");
                guide1.put("description", "Guide complet pour commencer à utiliser la plateforme");
                guide1.put("icon", "fa-rocket");
                
                Map<String, Object> guide2 = new HashMap<>();
                guide2.put("id", 2);
                guide2.put("title", "Gestion des demandes");
                guide2.put("description", "Apprenez à créer et gérer vos demandes efficacement");
                guide2.put("icon", "fa-file-text");
                
                guides.add(guide1);
                guides.add(guide2);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", guides);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour obtenir les tutoriels
     */
    @RequestMapping(value = "/api/help/tutorials", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> getTutorials() {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Données de démonstration
                java.util.List<Map<String, Object>> tutorials = new java.util.ArrayList<>();
                
                Map<String, Object> tutorial1 = new HashMap<>();
                tutorial1.put("id", 1);
                tutorial1.put("title", "Tutoriel : Créer une demande");
                tutorial1.put("description", "Vidéo explicative pour créer votre première demande");
                tutorial1.put("videoUrl", "https://www.youtube.com/embed/dQw4w9WgXcQ");
                
                Map<String, Object> tutorial2 = new HashMap<>();
                tutorial2.put("id", 2);
                tutorial2.put("title", "Tutoriel : Gérer son profil");
                tutorial2.put("description", "Apprenez à modifier vos informations personnelles");
                tutorial2.put("videoUrl", "https://www.youtube.com/embed/dQw4w9WgXcQ");
                
                tutorials.add(tutorial1);
                tutorials.add(tutorial2);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", tutorials);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour envoyer un message de contact
     */
    @RequestMapping(value = "/api/help/contact", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<String> submitContact(@RequestBody Map<String, String> contactData) {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                String subject = contactData.get("subject");
                String message = contactData.get("message");
                
                // Ici, vous pouvez implémenter l'envoi d'email ou la sauvegarde en base
                // Pour l'instant, on simule juste le succès
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Votre message a été envoyé avec succès");
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur lors de l'envoi : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    // ========== APIs POUR DOCUMENTS ET TÂCHES ==========

    /**
     * API pour obtenir la liste des documents
     */
    @RequestMapping(value = "/api/documents", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> getDocuments() {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Données mock pour les documents
                java.util.List<Map<String, Object>> documents = new java.util.ArrayList<>();
                
                Map<String, Object> doc1 = new HashMap<>();
                doc1.put("id", 1);
                doc1.put("nom", "Guide utilisateur GED");
                doc1.put("type", "pdf");
                doc1.put("categorie", "administratif");
                doc1.put("dateCreation", "2025-01-15");
                doc1.put("taille", "2.5 MB");
                documents.add(doc1);
                
                Map<String, Object> doc2 = new HashMap<>();
                doc2.put("id", 2);
                doc2.put("nom", "Procédure de sécurité");
                doc2.put("type", "doc");
                doc2.put("categorie", "technique");
                doc2.put("dateCreation", "2025-01-10");
                doc2.put("taille", "1.8 MB");
                documents.add(doc2);
                
                Map<String, Object> doc3 = new HashMap<>();
                doc3.put("id", 3);
                doc3.put("nom", "Rapport financier Q4");
                doc3.put("type", "xls");
                doc3.put("categorie", "financier");
                doc3.put("dateCreation", "2025-01-05");
                doc3.put("taille", "3.2 MB");
                documents.add(doc3);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", documents);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour obtenir la liste des tâches
     */
    @RequestMapping(value = "/api/tasks", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<String> getTasks() {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Données mock pour les tâches
                java.util.List<Map<String, Object>> tasks = new java.util.ArrayList<>();
                
                Map<String, Object> task1 = new HashMap<>();
                task1.put("id", 1);
                task1.put("titre", "Validation du rapport mensuel");
                task1.put("description", "Vérifier et valider le rapport d'activité du mois dernier");
                task1.put("priorite", "normale");
                task1.put("statut", "en_attente");
                task1.put("dateLimite", "2025-01-20");
                tasks.add(task1);
                
                Map<String, Object> task2 = new HashMap<>();
                task2.put("id", 2);
                task2.put("titre", "Mise à jour des informations de contact");
                task2.put("description", "Actualiser les coordonnées dans le système");
                task2.put("priorite", "haute");
                task2.put("statut", "en_cours");
                task2.put("dateLimite", "2025-01-18");
                tasks.add(task2);
                
                Map<String, Object> task3 = new HashMap<>();
                task3.put("id", 3);
                task3.put("titre", "Formation sur les nouvelles fonctionnalités");
                task3.put("description", "Suivre la formation en ligne sur les nouvelles fonctionnalités");
                task3.put("priorite", "basse");
                task3.put("statut", "terminee");
                task3.put("dateLimite", "2025-01-25");
                tasks.add(task3);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("data", tasks);
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour démarrer une tâche
     */
    @RequestMapping(value = "/api/tasks/{taskId}/start", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<String> startTask(@PathVariable Long taskId) {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Ici, vous pouvez ajouter la logique pour démarrer la tâche
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Tâche démarrée avec succès");
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }

    /**
     * API pour terminer une tâche
     */
    @RequestMapping(value = "/api/tasks/{taskId}/complete", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<String> completeTask(@PathVariable Long taskId) {
        try {
            SecUtilisateurDTO currentUser = secUtilisateurService.getCurrentUser();
            
            if (currentUser != null && "EXTERNE".equals(currentUser.getModule())) {
                // Ici, vous pouvez ajouter la logique pour terminer la tâche
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Tâche terminée avec succès");
                return ResponseEntity.ok(Util.toJson(response));
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Accès non autorisé");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Util.toJson(response));
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Util.toJson(response));
        }
    }
} 