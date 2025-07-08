/**
 * Application AngularJS pour le formulaire d'inscription externe
 * Gestion de l'inscription des utilisateurs externes (ministères et institutions publiques)
 * 
 * @author BrainIT
 * @version 1.0
 */

// Déclaration de l'application AngularJS
var primature = angular.module('primature', []);

/**
 * Contrôleur principal pour le formulaire d'inscription externe
 */
primature.controller('RegistrationController', function($scope, $http) {

    console.log('RegistrationController loaded');

    // Initialisation des données
    $scope.formData = {
        prenom: '',
        nom: '',
        fonction: '',
        email: '',
        telephone: '',
        institution: '',
        ville: '',
        adresse: ''
    };
    
    // Variables de contrôle
    $scope.currentStep = 1;
    $scope.totalSteps = 3;
    $scope.isLoading = false;
    $scope.submitted = false;
    $scope.successMessage = '';
    $scope.errorMessage = '';
    
    // Validation des champs
    $scope.errors = {};
    $scope.touched = {};
    
    /**
     * Fonction d'initialisation appelée par ng-init
     */
    $scope.init = function() {
        console.log('Initializing registration form');
        $scope.currentStep = 1;
        $scope.resetForm();
    };
    
    /**
     * Valider un champ
     */
    $scope.validateField = function(fieldName, value) {
        $scope.errors[fieldName] = '';
        
        if (!value || value.trim() === '') {
            if (fieldName === 'prenom' || fieldName === 'nom' || fieldName === 'fonction' || 
                fieldName === 'email' || fieldName === 'institution') {
                $scope.errors[fieldName] = 'Ce champ est obligatoire';
            }
        } else if (fieldName === 'email' && !isValidEmail(value)) {
            $scope.errors[fieldName] = 'Veuillez saisir une adresse email valide';
        } else if (fieldName === 'telephone' && value && !isValidPhone(value)) {
            $scope.errors[fieldName] = 'Veuillez saisir un numéro de téléphone valide';
        }
    };
    
    /**
     * Marquer un champ comme touché
     */
    $scope.markFieldTouched = function(fieldName) {
        $scope.touched[fieldName] = true;
        $scope.validateField(fieldName, $scope.formData[fieldName]);
    };
    
    /**
     * Vérifier si un champ a une erreur
     */
    $scope.hasError = function(fieldName) {
        return $scope.touched[fieldName] && $scope.errors[fieldName];
    };
    
    /**
     * Obtenir le message d'erreur
     */
    $scope.getErrorMessage = function(fieldName) {
        return $scope.errors[fieldName] || '';
    };
    
    /**
     * Valider l'email
     */
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Valider le téléphone
     */
    function isValidPhone(phone) {
        var phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone);
    }
    
    /**
     * Valider l'étape actuelle
     */
    $scope.validateCurrentStep = function() {
        var isValid = true;
        
        if ($scope.currentStep === 1) {
            var requiredFields = ['prenom', 'nom', 'fonction', 'email'];
            requiredFields.forEach(function(field) {
                $scope.touched[field] = true;
                $scope.validateField(field, $scope.formData[field]);
                if ($scope.errors[field]) {
                    isValid = false;
                }
            });
        } else if ($scope.currentStep === 2) {
            $scope.touched['institution'] = true;
            $scope.validateField('institution', $scope.formData.institution);
            if ($scope.errors['institution']) {
                isValid = false;
            }
        }
        
        return isValid;
    };
    
    /**
     * Passer à l'étape suivante
     */
    $scope.nextStep = function() {
        console.log('nextStep called, current step:', $scope.currentStep);
        
        if ($scope.validateCurrentStep()) {
            if ($scope.currentStep < $scope.totalSteps) {
                $scope.currentStep++;
                console.log('Moving to step:', $scope.currentStep);
            }
        } else {
            console.log('Validation failed');
        }
    };
    
    /**
     * Retourner à l'étape précédente
     */
    $scope.previousStep = function() {
        if ($scope.currentStep > 1) {
            $scope.currentStep--;
        }
    };
    
    /**
     * Soumettre le formulaire
     */
    $scope.submitForm = function() {
        if ($scope.validateCurrentStep()) {
            $scope.isLoading = true;
            $scope.errorMessage = '';
            
            // Simulation d'envoi (remplacer par l'appel API réel)
            setTimeout(function() {
                $scope.isLoading = false;
                $scope.submitted = true;
                $scope.successMessage = 'Votre demande d\'inscription a été envoyée avec succès ! Vous recevrez un email de confirmation.';
                
                // Reset du formulaire après 3 secondes
                setTimeout(function() {
                    $scope.submitted = false;
                    $scope.currentStep = 1;
                    $scope.formData = {
                        prenom: '',
                        nom: '',
                        fonction: '',
                        email: '',
                        telephone: '',
                        institution: '',
                        ville: '',
                        adresse: ''
                    };
                    $scope.errors = {};
                    $scope.touched = {};
                }, 3000);
                
                $scope.$apply();
            }, 2000);
        }
    };
    
    /**
     * Réinitialiser le formulaire
     */
    $scope.resetForm = function() {
        $scope.currentStep = 1;
        $scope.formData = {
            prenom: '',
            nom: '',
            fonction: '',
            email: '',
            telephone: '',
            institution: '',
            ville: '',
            adresse: ''
        };
        $scope.errors = {};
        $scope.touched = {};
        $scope.submitted = false;
        $scope.successMessage = '';
        $scope.errorMessage = '';
    };
    
    // Initialisation automatique
    $scope.init();
}); 