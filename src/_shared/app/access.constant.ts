import { RuleEnum } from './enum/rule.enum';

export const RULES = [
  {
    designation: 'Gestion des dossiers',
    description: 'Gérer tout ce qui concerne les dossiers',
    tag: null,
    permissions: [
      {
        designation: 'Créer un dossier',
        value: RuleEnum.CAN_CREATE_DOSSIER,
        description: null,
      },
      {
        designation: 'Supprimer un dossier',
        value: RuleEnum.CAN_DELETE_DOSSIER,
        description: null,
      },
      {
        designation: 'Afficher les dossiers',
        value: RuleEnum.CAN_SHOW_DOSSIER_LIST,
        description: null,
      },
      {
        designation: 'Afficher une categorie',
        value: RuleEnum.CAN_SHOW_DOSSIER,
        description: null,
      },
      {
        designation: 'Modifier un dossier',
        value: RuleEnum.CAN_UPDATE_DOSSIER,
        description: null,
      }
    ],
  },
  {
    designation: 'Gestion des affectations',
    description: 'Gérer tout ce qui concerne les affectations de dossiers',
    tag: null,
    permissions: [
      {
        designation: 'Afficher la liste des affectations',
        value: RuleEnum.CAN_SHOW_AFFECTATION_LIST,
        description: null,
      },
      {
        designation: "Afficher les informations d'une affectation",
        value: RuleEnum.CAN_SHOW_AFFECTATION,
        description: null,
      },
      {
        designation: 'Modifier une affectation",',
        value: RuleEnum.CAN_UPDATE_AFFECTATION,
        description: null,
      },
    ],
  },
  {
    designation: 'Gestion des étapes de domaine',
    description: 'Gérer tout ce qui concerne les étapes de domaine',
    tag: null,
    permissions: [
      {
        designation: 'Afficher la liste de toutes les opérations',
        value: RuleEnum.CAN_SHOW_DOSSIER_STEP_LIST,
        description: null,
      },
    ],
  },
];
