// src/types/tanstack-table.d.ts

import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // Étend les métadonnées des colonnes
  interface ColumnMeta<TData, TValue> {
    /**
     * Libellé lisible par l'utilisateur
     * Affiché dans le menu de visibilité des colonnes
     */
    label?: string;

    /**
     * Tooltip facultatif affiché dans l'UI (ex : header avec hover)
     */
    tooltip?: string;

    /**
     * Indique si les valeurs de la colonne sont numériques
     * Permet d'ajuster le style, l'alignement, etc.
     */
    isNumeric?: boolean;

    /**
     * Largeur préférée (quand un système de resize est présent)
     */
    width?: number;

    /**
     * Largeur minimale recommandée
     */
    minWidth?: number;

    /**
     * Largeur maximale recommandée
     */
    maxWidth?: number;

    /**
     * Classe CSS additionnelle
     */
    className?: string;
  }
}
