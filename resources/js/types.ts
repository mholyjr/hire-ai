type DateTime = string;

export type Nullable<T> = T | null;

export interface Team {
  id: number;
  name: string;
  personal_team: boolean;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface User {
  id: number;
  name: string;
  email: string;
  current_team_id: Nullable<number>;
  profile_photo_path: Nullable<string>;
  profile_photo_url: string;
  two_factor_enabled: boolean;
  email_verified_at: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface Auth {
  user: Nullable<
    User & {
      all_teams?: Team[];
      current_team?: Team;
    }
  >;
}

export type InertiaSharedProps<T = {}> = T & {
  jetstream: {
    canCreateTeams: boolean;
    canManageTwoFactorAuthentication: boolean;
    canUpdatePassword: boolean;
    canUpdateProfileInformation: boolean;
    flash: any;
    hasAccountDeletionFeatures: boolean;
    hasApiFeatures: boolean;
    hasTeamFeatures: boolean;
    hasTermsAndPrivacyPolicyFeature: boolean;
    managesProfilePhotos: boolean;
    hasEmailVerification: boolean;
  };
  auth: Auth;
  errorBags: any;
  errors: any;
};

export interface Session {
  id: number;
  ip_address: string;
  is_current_device: boolean;
  agent: {
    is_desktop: boolean;
    platform: string;
    browser: string;
  };
  last_active: DateTime;
}

export interface ApiToken {
  id: number;
  name: string;
  abilities: string[];
  last_used_ago: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface JetstreamTeamPermissions {
  canAddTeamMembers: boolean;
  canDeleteTeam: boolean;
  canRemoveTeamMembers: boolean;
  canUpdateTeam: boolean;
}

export interface Role {
  key: string;
  name: string;
  permissions: string[];
  description: string;
}

export interface TeamInvitation {
  id: number;
  team_id: number;
  email: string;
  role: Nullable<string>;
  created_at: DateTime;
  updated_at: DateTime;
}

export type TODO = any;

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string | null;
  slug: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  positions?: Position[];
  state: 0 | 1;
}

export interface Position {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
  candidates?: Candidate[];
  persona?: Persona;
  state: 0 | 1;
  num_of_candidates: number;
  avg_rating: number;
}

export interface AiRating {
  id: number;
  candidate_id: number;
  rating: number;
  summary: string;
  pros: string[];
  cons: string[];
  created_at: string;
  updated_at: string;
}

export interface Candidate {
  id: number;
  position_id: number;
  name: string;
  email: string;
  phone: string | null;
  cv_path: string;
  cv_data: Resume;
  ai_rating: AiRating | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Persona {
  id: number;
  position_id: number;
  position: string;
  work_experience: string;
  education: string;
  seniority: string;
  nationality: string | null;
  languages_spoken: string[];
  additional_info: string | null;
  created_at: string;
  updated_at: string;
}

export interface Education {
  Degree: string;
  Field: string;
  Institution: string;
  Year: string;
}

export interface WorkExperience {
  Role: string;
  Company: string;
  Years: string;
  Responsibilities: string[];
}

export interface Resume {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  education: Education[];
  experience: WorkExperience[];
}