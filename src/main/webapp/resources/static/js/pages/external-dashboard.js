/**
 * Contrôleur du tableau de bord externe
 * Gère l'affichage des statistiques et données pour les utilisateurs externes
 */
app.controller('externalDashboardController', function($scope, $http, $timeout) {
    
    // Variables d'état
    $scope.loading = true;
    $scope.error = false;
    $scope.errorMessage = '';
    
    // Données utilisateur
    $scope.userInstitution = '';
    $scope.demandesEnAttente = 0;
    
    // Statistiques principales
    $scope.stats = {
        enAttente: 0,
        validees: 0,
        evolutionValidees: 0,
        rejetees: 0,
        enTraitement: 0,
        dureeMoyenne: 0
    };
    
    // Alertes urgentes
    $scope.alertesUrgentes = [];
    
    // Activités récentes
    $scope.activitesRecentes = [];
    
    // Événements du calendrier
    $scope.evenementsCalendrier = [];
    
    // Documents récents
    $scope.documentsRecents = [];
    $scope.rechercheDocument = '';
    
    // Contacts fréquents
    $scope.contactsFrequents = [];
    
    // Indicateurs de performance
    $scope.indicateurs = {
        delaiMoyen: 0,
        tauxCompletude: 0
    };
    
    // Variables héritées du dashboard admin
    $scope.taskByProfile = 0;
    $scope.currentDemandesCountByProfile = 0;
    
    /**
     * Initialisation du contrôleur
     */
    $scope.init = function() {
        console.log('Initialisation du dashboard externe...');
        $scope.loadDashboardData();
        $scope.loadUserData();
    };
    
    /**
     * Chargement des données utilisateur
     */
    $scope.loadUserData = function() {
        // Simulation des données utilisateur (à remplacer par des appels API réels)
        $timeout(function() {
            $scope.userInstitution = 'Ministère des Finances';
            $scope.demandesEnAttente = 5;
        }, 500);
    };
    
    /**
     * Chargement des données du dashboard
     */
    $scope.loadDashboardData = function() {
        $scope.loading = true;
        $scope.error = false;
        
        // Simulation des données (à remplacer par des appels API réels)
        $timeout(function() {
            // Statistiques
            $scope.stats = {
                enAttente: 12,
                validees: 45,
                evolutionValidees: 15,
                rejetees: 3,
                enTraitement: 8,
                dureeMoyenne: 5.2
            };
            
            // Alertes urgentes
            $scope.alertesUrgentes = [
                { message: 'Demande d\'audience urgente à traiter avant le 20/01/2025' },
                { message: 'Document en attente de validation depuis 3 jours' }
            ];
            
            // Activités récentes
            $scope.activitesRecentes = [
                {
                    id: 1,
                    date: new Date('2025-01-10'),
                    type: 'Audience',
                    icon: 'mdi-calendar-clock',
                    institution: 'Ministère Santé',
                    statut: 'Validée',
                    statusClass: 'bg-success',
                    annulable: false
                },
                {
                    id: 2,
                    date: new Date('2025-01-09'),
                    type: 'Document',
                    icon: 'mdi-file-document',
                    institution: 'DG Impôts',
                    statut: 'En traitement',
                    statusClass: 'bg-info',
                    annulable: true
                },
                {
                    id: 3,
                    date: new Date('2025-01-08'),
                    type: 'Requête',
                    icon: 'mdi-help-circle',
                    institution: 'Direction Budget',
                    statut: 'En attente',
                    statusClass: 'bg-warning',
                    annulable: true
                },
                {
                    id: 4,
                    date: new Date('2025-01-07'),
                    type: 'Audience',
                    icon: 'mdi-calendar-clock',
                    institution: 'Secrétariat Général',
                    statut: 'Rejetée',
                    statusClass: 'bg-danger',
                    annulable: false
                }
            ];
            
            // Événements du calendrier
            $scope.evenementsCalendrier = [
                {
                    objet: 'Audience avec le Ministre des Finances',
                    date: new Date('2025-01-15'),
                    heure: '14:00',
                    type: 'Audience',
                    typeClass: 'bg-primary'
                },
                {
                    objet: 'Réunion budgétaire 2025',
                    date: new Date('2025-01-18'),
                    heure: '10:00',
                    type: 'Réunion',
                    typeClass: 'bg-success'
                },
                {
                    objet: 'Présentation du rapport trimestriel',
                    date: new Date('2025-01-22'),
                    heure: '16:30',
                    type: 'Présentation',
                    typeClass: 'bg-info'
                }
            ];
            
            // Documents récents
            $scope.documentsRecents = [
                {
                    titre: 'Note de service - Budget 2025',
                    type: 'Note',
                    date: new Date('2025-01-10'),
                    statut: 'Validé',
                    statutClass: 'bg-success',
                    typeClass: 'bg-primary',
                    icon: 'mdi-file-document'
                },
                {
                    titre: 'Demande d\'audience - Ministre',
                    type: 'Demande',
                    date: new Date('2025-01-09'),
                    statut: 'En revue',
                    statutClass: 'bg-warning',
                    typeClass: 'bg-info',
                    icon: 'mdi-calendar-clock'
                },
                {
                    titre: 'PV Réunion Comité Budget',
                    type: 'PV',
                    date: new Date('2025-01-08'),
                    statut: 'Validé',
                    statutClass: 'bg-success',
                    typeClass: 'bg-success',
                    icon: 'mdi-file-check'
                },
                {
                    titre: 'Rapport financier Q4 2024',
                    type: 'Rapport',
                    date: new Date('2025-01-07'),
                    statut: 'En revue',
                    statutClass: 'bg-warning',
                    typeClass: 'bg-warning',
                    icon: 'mdi-chart-line'
                },
                {
                    titre: 'Demande de subvention',
                    type: 'Demande',
                    date: new Date('2025-01-06'),
                    statut: 'Validé',
                    statutClass: 'bg-success',
                    typeClass: 'bg-info',
                    icon: 'mdi-help-circle'
                }
            ];
            
            // Contacts fréquents
            $scope.contactsFrequents = [
                {
                    nom: 'M. Diallo',
                    service: 'Direction Budget',
                    telephone: '+235 123 456 789'
                },
                {
                    nom: 'Mme Koné',
                    service: 'Secrétariat Général',
                    telephone: '+235 987 654 321'
                },
                {
                    nom: 'M. Traoré',
                    service: 'Service RH',
                    telephone: '+235 555 123 456'
                },
                {
                    nom: 'Mme Ouattara',
                    service: 'Direction Financière',
                    telephone: '+235 777 888 999'
                }
            ];
            
            // Indicateurs de performance
            $scope.indicateurs = {
                delaiMoyen: 5.2,
                tauxCompletude: 87
            };
            
            // Variables héritées
            $scope.taskByProfile = 3;
            $scope.currentDemandesCountByProfile = 5;
            
            $scope.loading = false;
        }, 1000);
    };
    
    /**
     * Actions pour nouvelle demande
     */
    $scope.nouvelleDemande = function(type) {
        switch(type) {
            case 'audience':
                window.location.href = '/external/nouvelle-audience/';
                break;
            case 'document':
                window.location.href = '/external/nouveau-document/';
                break;
            case 'requete':
                window.location.href = '/external/nouvelle-requete/';
                break;
            case 'autre':
                window.location.href = '/external/nouvelle-demande/';
                break;
        }
    };
    
    /**
     * Actions rapides
     */
    $scope.actionRapide = function(action) {
        switch(action) {
            case 'audience':
                $scope.nouvelleDemande('audience');
                break;
            case 'document':
                $scope.nouvelleDemande('document');
                break;
            case 'support':
                $('#contactModal').modal('show');
                break;
            case 'guide':
                window.location.href = '/external/guide/';
                break;
        }
    };
    
    /**
     * Actions sur les activités récentes
     */
    $scope.telechargerDocument = function(id) {
        console.log('Téléchargement du document:', id);
        // Logique de téléchargement
        alert('Téléchargement en cours...');
    };
    
    $scope.suivreDemande = function(id) {
        console.log('Suivi de la demande:', id);
        window.location.href = '/external/demandes/' + id + '/suivi';
    };
    
    $scope.annulerDemande = function(id) {
        if (confirm('Êtes-vous sûr de vouloir annuler cette demande ?')) {
            console.log('Annulation de la demande:', id);
            // Logique d'annulation
            alert('Demande annulée avec succès');
        }
    };
    
    /**
     * Navigation
     */
    $scope.voirToutesDemandes = function() {
        window.location.href = '/external/demandes/';
    };
    
    $scope.voirAgenda = function() {
        window.location.href = '/external/agenda/';
    };
    
    /**
     * Affichage des notifications
     */
    $scope.displayNotifications = function() {
        $('#notificationModal').modal('show');
    };
    
    /**
     * Navigation vers les demandes
     */
    $scope.displayDemandes = function() {
        window.location.href = '/external/demandes/';
    };
    
    /**
     * Navigation vers les audiences
     */
    $scope.displayAudiences = function() {
        window.location.href = '/external/audiences/';
    };
    
    /**
     * Navigation vers les documents
     */
    $scope.displayDocuments = function() {
        window.location.href = '/external/documents/';
    };
    
    /**
     * Navigation vers les messages
     */
    $scope.displayMessages = function() {
        window.location.href = '/external/messages/';
    };
    
    /**
     * Navigation vers les requêtes
     */
    $scope.displayRequetes = function() {
        window.location.href = '/external/requetes/';
    };
    
    /**
     * Navigation vers les tâches
     */
    $scope.displayTaches = function() {
        window.location.href = '/external/taches/';
    };
    
    /**
     * Navigation vers l'historique
     */
    $scope.displayHistorique = function() {
        window.location.href = '/external/historique/';
    };
    
    /**
     * Affichage des demandes en cours
     */
    $scope.displayEnCours = function() {
        window.location.href = '/external/demandes/?status=en_cours';
    };
    
    /**
     * Affichage des demandes en attente
     */
    $scope.displayEnAttente = function() {
        window.location.href = '/external/demandes/?status=en_attente';
    };
    
    /**
     * Affichage des demandes approuvées
     */
    $scope.displayApprouvees = function() {
        window.location.href = '/external/demandes/?status=approuvees';
    };
    
    /**
     * Affichage des demandes rejetées
     */
    $scope.displayRejetees = function() {
        window.location.href = '/external/demandes/?status=rejetees';
    };
});

/**
 * Contrôleur pour le tableau des demandes récentes (hérité du dashboard admin)
 */
app.controller('demandesCurrentTableController', function($scope, $http) {
    
    // Configuration DataTable
    $scope.tableConfig = {
        processing: true,
        serverSide: true,
        ajax: {
            url: '/api/external/demandes/recentes',
            type: 'GET',
            data: function(d) {
                return {
                    start: d.start,
                    length: d.length,
                    search: d.search.value,
                    order: d.order[0] ? d.order[0].column : null,
                    dir: d.order[0] ? d.order[0].dir : 'asc'
                };
            }
        },
        columns: [
            { data: null, orderable: false, searchable: false },
            { data: 'reference' },
            { data: 'dateSoumission' },
            { data: 'typeDemande' },
            { data: 'objet' },
            { 
                data: 'statut',
                render: function(data, type, row) {
                    var badgeClass = '';
                    var text = '';
                    
                    switch(data) {
                        case 'EN_COURS':
                            badgeClass = 'bg-info';
                            text = 'En cours';
                            break;
                        case 'EN_ATTENTE':
                            badgeClass = 'bg-warning';
                            text = 'En attente';
                            break;
                        case 'APPROUVEE':
                            badgeClass = 'bg-success';
                            text = 'Approuvée';
                            break;
                        case 'REJETEE':
                            badgeClass = 'bg-danger';
                            text = 'Rejetée';
                            break;
                        default:
                            badgeClass = 'bg-secondary';
                            text = data;
                    }
                    
                    return '<span class="badge ' + badgeClass + '">' + text + '</span>';
                }
            },
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function(data, type, row) {
                    return '<button class="btn btn-sm btn-outline-primary" onclick="viewDemande(' + row.id + ')"><i class="mdi mdi-eye"></i></button> ' +
                           '<button class="btn btn-sm btn-outline-secondary" onclick="editDemande(' + row.id + ')"><i class="mdi mdi-pencil"></i></button>';
                }
            }
        ],
        order: [[2, 'desc']],
        pageLength: 10,
        language: {
            url: '/resources/js/datatables-fr.json'
        }
    };
    
    /**
     * Initialisation du contrôleur
     */
    $scope.init = function() {
        console.log('Initialisation du tableau des demandes...');
        $scope.initDataTable();
    };
    
    /**
     * Initialisation du DataTable
     */
    $scope.initDataTable = function() {
        $timeout(function() {
            $('#demandesCurrentTable').DataTable($scope.tableConfig);
        }, 500);
    };
});

/**
 * Fonctions globales pour les actions sur les demandes
 */
function viewDemande(id) {
    window.location.href = '/external/demandes/' + id + '/view';
}

function editDemande(id) {
    window.location.href = '/external/demandes/' + id + '/edit';
} 