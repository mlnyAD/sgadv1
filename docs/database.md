# Documentation de la base de données

## 1. Principes généraux

- SGBD : PostgreSQL
- Schéma : `public`
- Convention de nommage :
  - Tables : `snake_case` en français (`project`, `lottrav`, `todo`, …)
  - Vues : préfixe `vw_…` (`vw_project`, `vw_task`, …)
  - Colonnes identifiants : suffixe `_id` (ex : `project_id`, `lottrav_id`)
- Types :
  - Identifiants numériques : `integer` (PK / FK), quelques `bigint` sur les tables “lookup”
  - Identifiants fonctionnels : parfois `uuid` (ex : `profiles.id`, `filesystemitem.id`)
- États et types métier :
  - Une partie est portée par des tables de référence (`etatdossier`, `config`, `risk…`).
  - Une autre partie est portée par des **constantes TypeScript** côté application (`*.constantes.ts`).

---

## 2. Modèle cœur : projets, lots, tâches, temps

### 2.1 Table `project`

**Rôle**  
Représente un projet/dossier de travaux (entité centrale du modèle).

**Colonnes principales**
- `project_id` (integer, PK) : identifiant technique du projet.
- `project_ident` (varchar) : identifiant fonctionnel (référence projet).
- `project_nom` (text) : nom du projet.
- `project_creation` (date) : date de création.
- `project_status_id` (integer) : statut du projet (valeur utilisée avec table `etatdossier` +/ou constantes).
- `project_budget_id` (integer) : type de budget (référence `config`).
- `project_moa_id` (integer) : maître d’ouvrage (référence `config`).
- `project_ouvrage_id` (integer) : type d’ouvrage (référence `config`).
- `project_motif_id` (integer) : motif de l’opération (référence `config`).
- `project_start`, `project_end` (date) : bornes temporelles.
- `project_reception_init` / `actu`, `project_livraison_init` / `actu` : jalons.
- `projet_devis_ht`, `project_commande_ht` (integer) : montants.
- `project_uuid` (uuid) : identifiant technique complémentaire.
- `lmod` (timestamptz) : dernière modification.

**Relations**
- Référencé par :
  - `lottrav.project_id`
  - `document.project_id`
  - `timesheet.ts_project_id`
  - `task.project_id`
  - `reunion.project_id`
  - `persbyproject.project_id`
  - `risk.project_id`
  - `filesystemitem.project_id` (optionnel selon usage)
- Relié à des tables de référence :
  - `etatdossier.id` → `project_status_id`
  - `config` (plusieurs types : budget, moa, motif, ouvrage)

---

### 2.2 Table `lottrav`

**Rôle**  
Lot de travaux rattaché à un projet.

**Colonnes**
- `lottrav_id` (integer, PK)
- `lottrav_nom` (text) : nom du lot
- `project_id` (integer, FK → `project.project_id`)
- `lottrav_resp_id` (integer, FK → `profiles.app_id`) : responsable (profil applicatif)
- `lottrav_start`, `lottrav_end` (date)
- `lmod` (timestamptz)

**Relations**
- Référencé par :
  - `task.lottrav_id`
  - `timesheet.ts_lt_id`
  - `reunion.lottrav_id`
  - `eltfinancier.ef_ltid`
  - `vw_dossier_lottrav_task`, `vw_lotbudget`, `vw_lottrav`

---

### 2.3 Table `task`

**Rôle**  
Tâches planifiées dans un lot de travaux.

**Colonnes**
- `task_id` (integer, PK)
- `task_nom` (text) : libellé
- `task_start`, `task_end` (date)
- `task_duree` (smallint) : durée planifiée
- `task_avancement` (smallint) : avancement (% ou code)
- `task_etat_id` (integer) : **code d’état**, utilisé via `task.constantes.ts` (PAS de FK).
- `lottrav_id` (integer, FK → `lottrav.lottrav_id`)
- `project_id` (integer, FK → `project.project_id`)
- `task_responsable_id` (integer, FK → `profiles.app_id`)
- `lmod` (date)

**Relations**
- Référencé par :
  - `timesheet.ts_task_id`
  - `equipe.task_id`
  - `vw_task`, `vw_dossier_lottrav_task`, `vw_timesheet`

---

### 2.4 Table `timesheet`

**Rôle**  
Feuilles de temps / saisie des heures par semaine et par tâche.

**Colonnes**
- `ts_id` (integer, PK)
- `ts_lt_id` (integer, FK → `lottrav.lottrav_id`)
- `ts_project_id` (integer, FK → `project.project_id`)
- `ts_user_id` (integer, FK → `profiles.app_id`)
- `ts_task_id` (integer, FK → `task.task_id`)
- `ts_date` (date) : date de référence de la semaine
- `ts_d1_nbh` … `ts_d7_nbh` (smallint) : heures par jour (lundi → dimanche)
- `lmod` (timestamp)

**Relations**
- Vue `vw_timesheet` enrichit avec :
  - `profiles.userEmail`
  - `lottrav.lottrav_nom`
  - `project.project_ident`
  - `task.task_nom`

---

## 3. Documents, bibliothèques et GED

### 3.1 Table `document`

**Rôle**  
Document rattaché à un projet (GED légère).

**Colonnes**
- `doc_id` (integer, PK)
- `doc_type_id` (integer, FK → `config.config_id` ou table config dédiée au type doc)
- `doc_nom` (text)
- `doc_redacteur` (integer, FK → `profiles.app_id`)
- `doc_date_creation` (date)
- `doc_etat_id` (integer) : code d’état, utilisé via `doc_constantes.ts` (PAS de FK).
- `doc_stockage` (text) : chemin / clé stockage
- `project_id` (integer, FK → `project.project_id`)
- `lmod` (timestamptz)

**Vue principale**
- `vw_document` : joint `document` + `etatdocument` + `config` + `project` + `profiles`.

---

### 3.2 Table `filesystemitem`

**Rôle**  
Représentation arborescente des fichiers / dossiers (FS logique).

**Colonnes**
- `id` (uuid, PK)
- `parent_id` (uuid, FK → `filesystemitem.id`) : hiérarchie (dossier parent)
- `name` (varchar)
- `type` (varchar) : `'file'` / `'folder'` (validé par `CHECK`)
- `file_path` (text)
- `file_size` (bigint)
- `mime_type` (varchar)
- `created_at`, `updated_at` (timestamptz)
- `created_by` (uuid, FK → profil/supabase)
- `project_id` (integer, **optionnel**, FK → `project.project_id` si utilisé)
- `project_name` (varchar)

**Remarque**  
La colonne `project_id` a été nettoyée et typée `integer`. Elle est désormais alignée sur `project.project_id`.

---

### 3.3 Table `bibltech` / `critged`

**Rôle**  
Bibliothèque technique de documents / contenus classés selon des critères GED.

**`bibltech`**
- `bibl_id` (integer, PK)
- `bibl_nom` (text)
- `bibl_type_doc` (smallint, FK → `config.config_id`)
- `bibl_crit1`, `bibl_crit2`, `bibl_crit3` (smallint, FK → `critged.crit_ged_id`)
- `bibl_date_creation` (date)
- `bibl_path` (text)
- `lmod` (timestamptz)

**`critged`**
- `crit_ged_id` (integer, PK)
- `crit_ged_nom` (text)
- `crit_ged_type` (smallint)
- `lmod` (timestamptz)

---

## 4. Suivi financier

### 4.1 Table `lotbudget` / vue `vw_lotbudget`

**Rôle**  
Budget par lot de travaux, avec consolidation achats/ventes.

**`lotbudget`**
- `lb_id` (integer, PK)
- `lb_nom` (text)
- `lb_project_id` (integer, FK → `project.project_id`)
- `lb_budget_ht` (real)
- `lb_somme_achats_ht`, `lb_somme_achats_ttc` (real)
- `lb_somme_ventes_ht`, `lb_somme_ventes_ttc` (real)
- `lb_observations` (text)
- `lmod` (timestamptz)

**`vw_lotbudget`**
- Reprend `lotbudget.*` + agrégations sur `eltfinancier` et `project`.

---

### 4.2 Table `eltfinancier`

**Rôle**  
Éléments financiers (achats/ventes) rattachés à un lot.

**Colonnes**
- `ef_id` (integer, PK)
- `ef_ltid` (integer, FK → `lottrav.lottrav_id`)
- `ef_date` (date)
- `ef_achat` (boolean) : achat = true / vente = false
- `ef_libelle` (text)
- `ef_valeurht`, `ef_valeurttc` (smallint)
- `ef_regle_le` (date)
- `ef_reference` (text)
- `lmod` (timestamptz)

---

## 5. Suivi des réunions

### 5.1 Table `reunion` & vue `vw_reunion`

**Rôle**  
Planification et suivi des réunions par projet / lot.

**`reunion`**
- `reunion_id` (integer, PK)
- `reunion_objet` (varchar)
- `reunion_date_heure` (date)
- `reunion_adresse` (varchar)
- `project_id` (integer, FK → `project.project_id`)
- `lottrav_id` (integer, FK → `lottrav.lottrav_id`)
- `reunion_type_id` (integer, FK → `config.config_id`)  
- `reunion_etat_id` (integer) : code d’état issu de `reunion_constantes.ts` (pas de FK)
- `reunion_cr` (text)
- `reunion_duree` (integer)
- `reunion_commentaires` (varchar)
- `reunion_pilote_id` (integer, FK → `profiles.app_id`)
- `lmod` (timestamptz)

**`vw_reunion`**  
Enrichit avec :
- `profiles.userEmail` (pilote)
- `project.project_ident`
- `lottrav.lottrav_nom`
- `config.config_nom` (type de réunion)
- éventuellement un libellé d’état si reconstruit applicativement.

---

## 6. Utilisateurs, profils, personnes, sociétés

### 6.1 Table `profiles`

**Rôle**  
Profil utilisateur côté Auth / application (source Supabase adaptée).

**Colonnes**
- `id` (uuid, PK, FK → auth)
- `userEmail` (text, UNIQUE)
- `full_name`, `userfirstname` (text)
- `avatar_url`, `website` (text)
- `last_seen` (timestamptz)
- `username` (text)
- `app_id` (integer, UNIQUE) : identifiant applicatif utilisé par les FKs (lot, task, timesheet, réunion…)
- `fonction_id` (integer) : code fonctionnel, issu de `profiles.constantes.ts` (pas de FK).
- `metier_id` (integer, FK → `config.config_id`)
- `societe_id` (integer, FK → `societe.societe_id`)
- `pers_avec_cpte` (boolean)
- `updated_at` (timestamptz)

**Relations importantes**
- FKs depuis :
  - `lottrav.lottrav_resp_id`
  - `task.task_responsable_id`
  - `timesheet.ts_user_id`
  - `reunion.reunion_pilote_id`
  - `document.doc_redacteur`
  - `message.user_id`, `notification.user_id`
  - `personne.profile_id`

---

### 6.2 Table `personne`

**Rôle**  
Représentation métier de la personne (contact), liée éventuellement à un `profile`.

**Colonnes**
- `pers_id` (integer, PK)
- `nom`, `prenom` (text)
- `email` (text, UNIQUE)
- `fonction_id` (integer) : code fonctionnel (constantes TypeScript, pas de FK).
- `metier_id` (integer, FK → `config.config_id`)
- `pers_avec_compte` (boolean)
- `profile_id` (uuid, FK → `profiles.id`)
- `user_id` (uuid) : lien éventuel vers Auth
- `old_id` (uuid) : trace ancienne
- `updated_at` (timestamptz)

---

### 6.3 Table `societe`

**Rôle**  
Sociétés (clients, fournisseurs, tiers).

**Colonnes**
- `societe_id` (integer, PK)
- `societe_nom` (varchar)
- `societe_adresse1`, `2`, `3` (varchar)
- `societe_ville` (varchar)
- `societe_code_postal` (varchar)
- `lmod` (timestamptz)

---

### 6.4 Table `persbyproject`

**Rôle**  
Association personnes ↔ projets.

**Colonnes**
- `pp_id` (bigint, PK)
- `pers_id` (integer, FK → `personne.pers_id`)
- `project_id` (integer, FK → `project.project_id`)
- `lmod` (timestamptz)

---

## 7. Todo, notifications, messagerie

### 7.1 Table `todo` & vue `vw_todo_view`

**Rôle**  
Tâches personnelles de type ToDo.

**`todo`**
- `todo_id` (smallint, PK)
- `todo_creation`, `todo_cloture` (date)
- `todo_titre`, `todo_text` (text)
- `todo_important`, `todo_urgent` (boolean)
- `todo_etat_id` (integer) : code d’état, issu de `todo_constantes.ts` (pas de FK)
- `todo_useremail` (text) : email logique
- `todo_etat_nom` (text) : libellé d’état (stocké)
- `lmod` (timestamptz)

**`vw_todo_view_`**
- Ajoute `profiles.userEmail` en `todo_user_email`.

---

### 7.2 Table `notification`

**Rôle**  
Notifications utilisateur.

**Colonnes**
- `id` (uuid, PK)
- `user_id` (uuid, FK → `profiles.id`)
- `type` (text)
- `message` (text)
- `read` (boolean)
- `created_at` (timestamptz)

---

### 7.3 Table `message`

**Rôle**  
Messages / chat.

**Colonnes**
- `id` (uuid, PK)
- `user_id` (uuid, FK → `profiles.id`)
- `content` (varchar)
- `created_at` (timestamptz)
- `user_email`, `user_name`, `user_firstname` (text)

---

## 8. Risques

### 8.1 Table `risk` & vue `vw_risk`

**Rôle**  
Risques projet + typologies associées.

**`risk`**
- `risk_id` (integer, PK)
- `project_id` (integer, FK → `project.project_id`)
- `risk_title`, `risk_text` (text)
- `risk_pilote` (integer, FK possible vers `profiles.app_id` ou personne)
- `risk_origin`, `risk_type`, `risk_class`, `risk_impact`, `risk_gravity`, `risk_probability`, `risk_state` (integer, FKs vers tables `riskorigin`, `risktype`, `riskclass`, `riskimpact`, `riskgravity`, `riskprobability`, `riskstate`)
- `risk_criticality`, `risk_cost` (integer)
- `risk_start`, `risk_end`, `risk_lastreview` (date)
- `rsik_tendency` (integer)
- `risk_actions` (text)
- `project_ident` (text duplicatif)
- `created_at` (timestamptz)

**Tables de référence**
- `riskorigin`, `risktype`, `riskclass`, `riskimpact`, `riskgravity`, `riskprobability`, `riskstate` : toutes avec `id`, `nom`, `created_at`.

**Vue `vw_risk`**
- Joint `risk` + toutes les tables de référence + projet.

---

## 9. Tables techniques / infra

### 9.1 `activite`
Journal technique (type, sous-type, message, utilisateur, date).

### 9.2 `appSession`
Stockage session applicative (projet courant, lot courant…).

### 9.3 `sessiondata`
Données de session (clé simple).

### 9.4 `equipe` / `equipeuser`
Groupes d’utilisateurs par tâche ou contexte.

### 9.5 `userprofile`
Ancien profil utilisateur (probablement obsolète vis-à-vis de `profiles`).

### 9.6 `operator`, `etatoperateur`, `etatsociete`, `etatconfig`, `etatdocument`, `etatdossier`, `etatlot`, `etattask`
Tables d’états / rôles / classifications diverses, utilisées selon les modules.

---

## 10. Vues principales (résumé)

- `vw_project`  
  Projets enrichis (états, types de budget, motif, MOA, ouvrage).

- `vw_lottrav`  
  Lots de travaux + email du responsable + identifiant projet.

- `vw_task`  
  Tâches + état (libellé) + responsable email + lot + projet.

- `vw_timesheet`  
  Time entries + utilisateur (email) + lot + projet + tâche.

- `vw_document`  
  Documents + état libellé + type + projet + rédacteur.

- `vw_lotbudget`  
  Budget par lot + agrégations financières + projet.

- `vw_reunion`  
  Réunions + pilote email + projet + lot + type + état.

- `vw_risk`  
  Risques + toutes les dimensions de typologie + projet.

- `vw_todo_view_`  
  Todos + email utilisateur + état.

- `vw_dossier_lottrav_task`  
  Vue combinée projet / lot / tâche avec libellés et états.

---

## 11. Remarques importantes côté application

1. Certaines colonnes `_etat_id`, `_type_id`, `_fonction_id` n’ont **plus de FK** par choix architectural :
   - `task.task_etat_id` → `task.constantes.ts`
   - `document.doc_etat_id` → `doc_constantes.ts`
   - `todo.todo_etat_id` → `todo_constantes.ts`
   - `reunion.reunion_etat_id` → `reunion_constantes.ts`
   - `personne.fonction_id` → `personne.constantes.ts`
   - `profiles.fonction_id` → `profiles.constantes.ts`

2. À l’inverse, les colonnes `*_metier_id`, `project_*_id` s’appuient sur la table `config`.

3. Les vues sont conçues comme **interfaces de lecture** pour le front (dashboards, écrans métiers), afin de limiter la complexité des jointures dans le code applicatif.

---

## 12. Pistes d’évolution

- Documenter dans le code (README) la correspondance entre :
  - les colonnes `*_etat_id`, `*_type_id`
  - et les fichiers `*.constantes.ts` côté domaine.
- Rationaliser ou supprimer les tables peu utilisées (en particulier certaines tables `risk*` si obsolètes).
- Éventuellement générer un schéma graphique (Graphviz / Mermaid) à partir de cette structure.

