
// src/utils/types.ts

import { UUID } from "crypto";
import type { User } from "@supabase/supabase-js";

export type ActiviteType = {
	activId: number;
	lmod: Date;
	activType: string;
	activSType: string;
	activMessage: string;
	activUser: string;
};

export type AuthenticatedUser = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  supabaseUser: User;
};


/*
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
*/
export type EquipeType = {
  id: number;
  task_id: number;
  nom_equipe: string;
  description?: string;
  created_at: Date;
};

export type EquipeUserType = {
  id: number;
  equipe_id: number;
  user_id: number // Changed from string (UUID) to number (app_id)
  role?: string;
  created_at: Date;
};

export interface FileSysItem {
  id: string
  parent_id: string | null
  name: string // Changé de "nom" à "name" pour correspondre à la DB
  type: "folder" | "file"
  file_path?: string | null // Ajout du chemin du fichier dans Storage
  file_size?: number | null // Ajout de la taille du fichier
  mime_type?: string | null // Ajout du type MIME
  created_at?: string
  updated_at?: string
  created_by?: string | null // Ajout de l'utilisateur créateur
}

export interface TreeNodeData extends FileSysItem {
  children?: TreeNodeData[]
  isExpanded?: boolean
  isCreating?: boolean
}
// Types pour les données d'entrée (format plat)
export interface FlatDataItem {
	dossierid: number;
	dossierident: string;
	dossiernom: string;
	lottravid: number;
	lottravnom: string;
	lottravstart: Date;
	lottravend: Date;
	lottravrespid: number;
	projectid: number;
	taskid: number;
	tasknom: string;
	taskstart: string;
	taskend: string;
	taskavancement: number;
	tasketatid: number;
	taskresponsableid: number;
	tasklottravid: number;
	persnom: string;
	persprenom: string;
	etattask: string;
	dossierstart: Date;
	dossierend: Date;
} //Vue

export interface GanttTask {
	id: number;
	title: string;
	startDate: Date;
	endDate: Date;
  }

export interface GanttLot {
	id: number;
	title: string;
	startDate: Date;
	endDate: Date;
	ganttTasks: GanttTask[];
}

export class ImageBucket {
	ib_id: number = 0;
	ib_nom: string = "";
	ib_path: string = "";
	ib_date: Date = new Date();
	ib_size: number = 0;
	ib_URL: string = "";
};



export type Message = {
	id: string;
	content: string;
	user_id: string;
	user_email: string;
	user_name: string;
	user_firstname: string;
	created_at: string;
	profiles: {
		username: string;
		avatar_url: string | null;
	};
};

export type PersByProjectType = {
	ppId: number;
	persId: number;
	projectId: number;
	projectIdent: string;
}; //Vue

/*export type ProfileType = {
	id: UUID;
	updated_at: Date;
	userEmail: string;
	app_id: number;
	full_name: string;
	avatar_url: string | null;	
	website: string;
	last_seen: Date;
	username: string;
	userfirstname: string;	
	fonction_id: number;
	metier_id: number;
	societe_id: number;
	pers_avec_cpte: boolean;
}; //Table
*/

export type RiskType = {
	risk_id: number;
	project_id: number;
	project_ident: string;
	risk_title: string;
	risk_text: string;
	risk_pilote: string;
	risk_start: Date;
	risk_end: Date;
	risk_origine: number;
	risk_type: number;
	risk_class: number;
	risk_impact: number;
	risk_gravity: number;
	risk_probability: number;
	risk_criticity: number;
	risk_cost: number;
	risk_state: number;
	risk_lastreview: Date;
	risk_tendency: number;
	risk_actions: string;
	created_at: Date;
	riskOriginNom: string;
    riskTypeNom: string;
    riskClassNom: string;
    riskImpactNom: string;
    riskGravityNom: string;
    riskProbabilityNom: string;
    riskStateNom: string;
}; //Vue
/*
export type Session = {
	asSessionId: number;
	asUserMail: string;
	asProjectId: number;
	asProjectIdent: string;
	asProjectName: string;
	asLottravId: number;
	asLottravNom: string;
	persnom: string;
	persprenom: string;
}; //Vue
*/



export type TimeSheetType = {
	tsId: number;
	tsLtId: number;
	tsProjectId: number;
	tsTaskId: number,
	tsUserId: number;
	tsDate: Date;
	tsD1nbh: number;
	tsD2nbh: number;
	tsD3nbh: number;
	tsD4nbh: number;
	tsD5nbh: number;
	tsD6nbh: number;
	tsD7nbh: number;
};//Vue


export type UserProfileType = {
	id: UUID;
	updated_at: Date;
	userEmail: string;
	full_name: string;
	avatar_url: string | null;	
	website: string;
	last_seen: Date;
	username: string;
	userfirstname: string;	
	app_id: number;
	fonction_id: number;
	metier_id: number;
	societe_id: number;
	pers_avec_cpte: boolean;
	nom: string;
	prenom: string;
	email: string;
	pers_avec_compte: boolean;
	perssociete: string;
	persfonction: string;
	persmetier: string;
}; //Vue

/*
const user: {
    id: string;
    app_metadata: UserAppMetadata;
    user_metadata: UserMetadata;
    aud: string;
    confirmation_sent_at?: string;
    recovery_sent_at?: string;
    email_change_sent_at?: string;
    new_email?: string;
    new_phone?: string;
    invited_at?: string;
    action_link?: string;
    email?: string;
    phone?: string;
    created_at: string;
    confirmed_at?: string;
    email_confirmed_at?: string;
    phone_confirmed_at?: string;
    last_sign_in_at?: string;
    role?: string;
    updated_at?: string;
    identities?: UserIdentity[];
    is_anonymous?: boolean;
    is_sso_user?: boolean;
    factors?: Factor[];
    deleted_at?: string;
} | null
*/

/* structure table supabase.storage.objects :
bucket_id:"projects"
created_at:"2024-10-22T06:17:40.188521+00:00"
id:"a2f9db45-4a2a-47d7-adb6-e5e0e12d0fbb"
last_accessed_at:"2024-10-22T06:17:40.188521+00:00"
metadata: 
	{eTag: '"1ca0775d52709a18b3c880c5becb2594"',
		size: 186620, mimetype: 'image/png',
		cacheControl: 'max-age=3600',
		lastModified: '2024-10-22T06:17:41.000Z',
		mimetype: "image/png",
		httpStatusCode:200
		size: 186620}
name:"images/monImage3"
owner:"3dfa7229-4366-4e6d-9645-5d44ea373e1e"
owner_id:"3dfa7229-4366-4e6d-9645-5d44ea373e1e"
path_tokens: Array(3)
	0:"71a0ea19-9690-4562-997a-e5623ba398d9"
	1:"Photo chantier"
	2:"GS2E.png"
	length:3
updated_at:"2024-10-22T06:17:40.188521+00:00"
user_metadata:{}
version:"54b0c2a4-9b8c-4975-9d9a-5b614c519f5b"
*/
/*

// types/dashboard.ts
export interface ProjectStatus {
  status: string;
  count: number;
}

export interface DashboardTask {
  id: number;
  title: string;
  responsable: string;
  start: Date;
  end: Date;
  avancement: number;
  projectIdent: string;
}

export interface DashboardMeeting {
  id: number;
  title: string;
  responsable: string;
  day: Date;
  start: Date;
  place: string;
  projectIdent: string;
}

export interface TeamData {
  category: string;
  count: number;
}

export interface DashboardData {
  projectsStatus: ProjectStatus[];
  tasksToday: DashboardTask[];
  meetingsToday: DashboardMeeting[];
  teamDistribution: TeamData[];
  hoursPlanned?: number;
  hoursSpent?: number;
}
*/