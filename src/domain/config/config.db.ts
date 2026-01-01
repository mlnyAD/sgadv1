// Décrire ce qui sort de la base (tables + vues)
// lecture DB / vue
// domain/config/config.db.ts

export interface ConfigDbRow {
  config_id: number;
  config_nom: string;
  config_type: number;
}
