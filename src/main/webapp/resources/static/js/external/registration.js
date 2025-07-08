/**
 * Application AngularJS pour le formulaire d'inscription externe
 * Gestion de l'inscription des utilisateurs externes (ministères et institutions publiques)
 * 
 * @author BrainIT
 * @version 1.0
 */

// Application AngularJS pour le formulaire d'inscription externe
var primature = angular.module('primature', []);

console.log('=== AngularJS module "primature" created ===');

primature.controller('RegistrationController', function($scope) {
    console.log('=== RegistrationController loaded ===');
    console.log('AngularJS version:', angular.version.full);

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
    
    // Validation des champs
    $scope.errors = {};
    $scope.touched = {};
    
    // Fonction d'initialisation
    $scope.init = function() {
        console.log('=== Initializing registration form ===');
        console.log('Current step:', $scope.currentStep);
        console.log('Form data:', $scope.formData);
        $scope.currentStep = 1;
        console.log('Step set to:', $scope.currentStep);
    };
    
    // Marquer un champ comme touché
    $scope.markFieldTouched = function(fieldName) {
        $scope.touched[fieldName] = true;
        $scope.validateField(fieldName, $scope.formData[fieldName]);
    };
    
    // Valider un champ
    $scope.validateField = function(fieldName, value) {
        $scope.errors[fieldName] = '';
        
        if (!value || value.trim() === '') {
            if (fieldName === 'prenom' || fieldName === 'nom' || fieldName === 'fonction' || 
                fieldName === 'email' || fieldName === 'institution') {
                $scope.errors[fieldName] = 'Ce champ est obligatoire';
            }
        } else if (fieldName === 'email' && !isValidEmail(value)) {
            $scope.errors[fieldName] = 'Veuillez saisir une adresse email valide';
        }
    };
    
    // Valider l'email
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Vérifier si un champ a une erreur
    $scope.hasError = function(fieldName) {
        return $scope.touched[fieldName] && $scope.errors[fieldName];
    };
    
    // Obtenir le message d'erreur
    $scope.getErrorMessage = function(fieldName) {
        return $scope.errors[fieldName] || '';
    };
    
    // Valider l'étape actuelle
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
    
    // Passer à l'étape suivante
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
    
    // Retourner à l'étape précédente
    $scope.previousStep = function() {
        if ($scope.currentStep > 1) {
            $scope.currentStep--;
        }
    };
    
    // Soumettre le formulaire
    $scope.submitForm = function() {
        console.log('Submitting form...');
        console.log('Form data:', $scope.formData);
        
        if ($scope.validateCurrentStep()) {
            $scope.isLoading = true;
            
            // Préparer les données pour l'envoi
            var submitData = {
                nom: $scope.formData.nom,
                prenom: $scope.formData.prenom,
                fonction: $scope.formData.fonction,
                email: $scope.formData.email,
                telephone: $scope.formData.telephone,
                institution: $scope.formData.institution,
                typeInstitution: $scope.formData.typeInstitution || 'AUTRE',
                adresse: $scope.formData.adresse,
                ville: $scope.formData.ville,
                motifDemande: $scope.formData.motifDemande || 'Demande d\'accès au système GED'
            };
            
            // Envoyer les données au serveur
            $.ajax({
                url: '/primature/external/inscription/submit',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(submitData),
                success: function(response) {
                    console.log('Success response:', response);
                    $scope.isLoading = false;
                    if (response.success) {
                        $scope.submitted = true;
                        $scope.successMessage = response.message;
                        // Reset du formulaire après 3 secondes
                        setTimeout(function() {
                            $scope.submitted = false;
                            $scope.currentStep = 1;
                            $scope.formData = {
                                prenom: '', nom: '', fonction: '', email: '',
                                telephone: '', institution: '', ville: '', adresse: ''
                            };
                            $scope.errors = {};
                            $scope.touched = {};
                            $scope.$apply();
                        }, 3000);
                    } else {
                        $scope.errorMessage = response.message;
                    }
                    $scope.$apply();
                },
                error: function(xhr, status, error) {
                    console.error('Error submitting form:', error);
                    $scope.isLoading = false;
                    try {
                        var errorResponse = JSON.parse(xhr.responseText);
                        $scope.errorMessage = errorResponse.message || 'Une erreur est survenue lors de la soumission.';
                    } catch (e) {
                        $scope.errorMessage = 'Une erreur est survenue lors de la soumission.';
                    }
                    $scope.$apply();
                }
            });
        }
    };
    
    // Initialisation automatique
    $scope.init();
}); 