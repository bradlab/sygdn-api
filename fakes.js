const DOMAIN_PATRIMOINE_STEP = [
  {
    "name": "Analyse de la situation patrimoniale",
    "description": "Évaluation complète des biens, dettes, revenus et objectifs du client afin de déterminer la stratégie patrimoniale adaptée.",
    "duration": 5,
    "order": 1,
    "domainId": "1a6d6a78-0a56-4a3b-a2ee-bb0a2923ca39",
    "tasks": [
  {
    "name": "Collecte des documents financiers",
    "description": "Demander au client les relevés bancaires, titres de propriété, contrats d'assurance-vie et autres justificatifs de patrimoine.",
    "stepId": "3aac6a7d-945c-4d42-8c7f-299ef864af3c"
  },
  {
    "name": "Évaluation des actifs et passifs",
    "description": "Analyser la valeur des biens immobiliers, placements financiers et dettes pour dresser un bilan patrimonial complet.",
    "stepId": "3aac6a7d-945c-4d42-8c7f-299ef864af3c"
  }
]

  },
  {
    "name": "Élaboration de la stratégie de transmission",
    "description": "Proposition des solutions juridiques et fiscales adaptées (donation, démembrement, testament, SCI, etc.).",
    "duration": 5,
    "order": 2,
    "domainId": "1a6d6a78-0a56-4a3b-a2ee-bb0a2923ca39",
    "tasks": [
  {
    "name": "Analyse des objectifs de transmission du client",
    "description": "Identifier les volontés du client : protection du conjoint, équité entre héritiers, anticipation fiscale, etc.",
    "stepId": "8f33b976-a698-4411-8302-99d19c7c8e96"
  },
  {
    "name": "Simulation des options juridiques et fiscales",
    "description": "Comparer l’impact des différentes solutions (donation, démembrement, SCI, testament) sur les droits de succession et la répartition.",
    "stepId": "8f33b976-a698-4411-8302-99d19c7c8e96"
  },
  {
    "name": "Présentation des recommandations au client",
    "description": "Proposer une ou plusieurs stratégies adaptées, expliquer les conséquences et recueillir l’accord du client.",
    "stepId": "8f33b976-a698-4411-8302-99d19c7c8e96"
  }
]

  },
  {
    "name": "Rédaction et signature des actes",
    "description": "Rédaction des actes notariés nécessaires et accompagnement lors de leur signature pour officialiser les décisions patrimoniales.",
    "duration": 5,
    "order": 3,
    "domainId": "1a6d6a78-0a56-4a3b-a2ee-bb0a2923ca39",
    "tasks": [{
  "name": "Préparation et validation des actes notariés",
  "description": "Rédiger les actes nécessaires à la transmission patrimoniale, vérifier leur conformité légale, puis les faire signer par les parties.",
  "stepId": "9623fe0c-8417-4390-907b-6f6a862160e2"
}]

  }
]

const DOMAIN_IMMOBILIE_STEP = [
  {
    "name": "Réunion des pièces et informations",
    "description": "Collecte des documents indispensables à la transaction : titre de propriété, diagnostics techniques, identité des parties, etc.",
    "duration": 4,
    "order": 1,
    "domainId": "17e78566-0354-48ff-9b25-3fbc80c8c080"
  },
  {
    "name": "Rédaction du compromis de vente",
    "description": "Rédaction et signature de l’avant-contrat qui engage juridiquement les parties sous conditions suspensives.",
    "duration": 3,
    "order": 2,
    "domainId": "17e78566-0354-48ff-9b25-3fbc80c8c080"
  },
  {
    "name": "Instruction du dossier et vérifications",
    "description": "Contrôle des hypothèques, urbanisme, servitudes, situation fiscale, et obtention des documents officiels.",
    "duration": 5,
    "order": 3,
    "domainId": "17e78566-0354-48ff-9b25-3fbc80c8c080"
  },
  {
    "name": "Rédaction et signature de l’acte de vente",
    "description": "Finalisation de la vente par acte authentique, lecture et signature par les parties, puis enregistrement officiel.",
    "duration": 2,
    "order": 4,
    "domainId": "17e78566-0354-48ff-9b25-3fbc80c8c080"
  }
]
