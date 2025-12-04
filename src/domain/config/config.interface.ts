export interface DbConfig {
  config_id: number;
  config_nom: string;
  config_type: number;
  lmod: string | null;   // timestamp renvoyé en string ISO
}
