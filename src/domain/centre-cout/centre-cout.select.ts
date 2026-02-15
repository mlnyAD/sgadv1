

// src/
export const CENTRE_COUT_VIEW_FIELDS = [
    "cc_id",
    "clt_id",
    "famille_id",
    "cc_code",
    "cc_libelle",
    "cc_commentaires",
    "cc_actif",
    "clt_nom",    
    "lmod",
] as const;

export const SELECT_CENTRE_COUT_VIEW = CENTRE_COUT_VIEW_FIELDS.join(", ");

