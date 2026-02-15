export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      centre_cout: {
        Row: {
          cc_actif: boolean
          cc_code: string
          cc_commentaires: string | null
          cc_id: string
          cc_libelle: string
          clt_id: string
          famille_id: number
          lmod: string
        }
        Insert: {
          cc_actif?: boolean
          cc_code: string
          cc_commentaires?: string | null
          cc_id?: string
          cc_libelle: string
          clt_id: string
          famille_id: number
          lmod?: string
        }
        Update: {
          cc_actif?: boolean
          cc_code?: string
          cc_commentaires?: string | null
          cc_id?: string
          cc_libelle?: string
          clt_id?: string
          famille_id?: number
          lmod?: string
        }
        Relationships: []
      }
      client: {
        Row: {
          clt_actif: boolean
          clt_adresse: string | null
          clt_code: string
          clt_code_postal: string | null
          clt_email: string | null
          clt_id: string
          clt_nom: string
          clt_pays: string | null
          clt_telephone: string | null
          clt_ville: string | null
          lmod: string
        }
        Insert: {
          clt_actif?: boolean
          clt_adresse?: string | null
          clt_code: string
          clt_code_postal?: string | null
          clt_email?: string | null
          clt_id?: string
          clt_nom: string
          clt_pays?: string | null
          clt_telephone?: string | null
          clt_ville?: string | null
          lmod?: string
        }
        Update: {
          clt_actif?: boolean
          clt_adresse?: string | null
          clt_code?: string
          clt_code_postal?: string | null
          clt_email?: string | null
          clt_id?: string
          clt_nom?: string
          clt_pays?: string | null
          clt_telephone?: string | null
          clt_ville?: string | null
          lmod?: string
        }
        Relationships: []
      }
      exercice: {
        Row: {
          clt_id: string
          exer_actif: boolean | null
          exer_code: string | null
          exer_commentaires: string | null
          exer_debut: string | null
          exer_fin: string | null
          exer_id: string
          lmod: string
        }
        Insert: {
          clt_id?: string
          exer_actif?: boolean | null
          exer_code?: string | null
          exer_commentaires?: string | null
          exer_debut?: string | null
          exer_fin?: string | null
          exer_id?: string
          lmod?: string
        }
        Update: {
          clt_id?: string
          exer_actif?: boolean | null
          exer_code?: string | null
          exer_commentaires?: string | null
          exer_debut?: string | null
          exer_fin?: string | null
          exer_id?: string
          lmod?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "exercice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "vw_client_view"
            referencedColumns: ["clt_id"]
          },
        ]
      }
      operateur: {
        Row: {
          lmod: string
          must_change_pwd: boolean
          oper_actif: boolean
          oper_admin_sys: boolean
          oper_email: string
          oper_id: string
          oper_nom: string
          oper_prenom: string
        }
        Insert: {
          lmod?: string
          must_change_pwd?: boolean
          oper_actif?: boolean
          oper_admin_sys?: boolean
          oper_email: string
          oper_id: string
          oper_nom: string
          oper_prenom: string
        }
        Update: {
          lmod?: string
          must_change_pwd?: boolean
          oper_actif?: boolean
          oper_admin_sys?: boolean
          oper_email?: string
          oper_id?: string
          oper_nom?: string
          oper_prenom?: string
        }
        Relationships: []
      }
      operateur_client: {
        Row: {
          clt_id: string
          lmod: string
          opcl_id: string
          oper_id: string
        }
        Insert: {
          clt_id: string
          lmod?: string
          opcl_id?: string
          oper_id: string
        }
        Update: {
          clt_id?: string
          lmod?: string
          opcl_id?: string
          oper_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "operateur_client_oper_id_fkey"
            columns: ["oper_id"]
            isOneToOne: false
            referencedRelation: "operateur"
            referencedColumns: ["oper_id"]
          },
          {
            foreignKeyName: "operateur_client_oper_id_fkey"
            columns: ["oper_id"]
            isOneToOne: false
            referencedRelation: "vw_operateur_view"
            referencedColumns: ["oper_id"]
          },
        ]
      }
      societe: {
        Row: {
          clt_id: string
          lmod: string | null
          soc_adresse: string | null
          soc_client: boolean | null
          soc_code: string
          soc_code_postal: string | null
          soc_fournisseur: boolean | null
          soc_id: string
          soc_nom: string
          soc_pays: string | null
          soc_siren: string | null
          soc_telephone: string | null
          soc_ville: string | null
        }
        Insert: {
          clt_id: string
          lmod?: string | null
          soc_adresse?: string | null
          soc_client?: boolean | null
          soc_code: string
          soc_code_postal?: string | null
          soc_fournisseur?: boolean | null
          soc_id?: string
          soc_nom: string
          soc_pays?: string | null
          soc_siren?: string | null
          soc_telephone?: string | null
          soc_ville?: string | null
        }
        Update: {
          clt_id?: string
          lmod?: string | null
          soc_adresse?: string | null
          soc_client?: boolean | null
          soc_code?: string
          soc_code_postal?: string | null
          soc_fournisseur?: boolean | null
          soc_id?: string
          soc_nom?: string
          soc_pays?: string | null
          soc_siren?: string | null
          soc_telephone?: string | null
          soc_ville?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      vw_centre_cout_view: {
        Row: {
          cc_actif: boolean | null
          cc_code: string | null
          cc_commentaires: string | null
          cc_id: string | null
          cc_libelle: string | null
          clt_id: string | null
          clt_nom: string | null
          famille_id: number | null
          lmod: string | null
        }
        Relationships: []
      }
      vw_client_view: {
        Row: {
          clt_actif: boolean | null
          clt_adresse: string | null
          clt_code: string | null
          clt_code_postal: string | null
          clt_email: string | null
          clt_id: string | null
          clt_nom: string | null
          clt_pays: string | null
          clt_telephone: string | null
          clt_ville: string | null
          lmod: string | null
        }
        Insert: {
          clt_actif?: boolean | null
          clt_adresse?: string | null
          clt_code?: string | null
          clt_code_postal?: string | null
          clt_email?: string | null
          clt_id?: string | null
          clt_nom?: string | null
          clt_pays?: string | null
          clt_telephone?: string | null
          clt_ville?: string | null
          lmod?: string | null
        }
        Update: {
          clt_actif?: boolean | null
          clt_adresse?: string | null
          clt_code?: string | null
          clt_code_postal?: string | null
          clt_email?: string | null
          clt_id?: string | null
          clt_nom?: string | null
          clt_pays?: string | null
          clt_telephone?: string | null
          clt_ville?: string | null
          lmod?: string | null
        }
        Relationships: []
      }
      vw_exercice_view: {
        Row: {
          clt_id: string | null
          clt_nom: string | null
          exer_actif: boolean | null
          exer_code: string | null
          exer_commentaires: string | null
          exer_debut: string | null
          exer_fin: string | null
          exer_id: string | null
          lmod: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "exercice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "vw_client_view"
            referencedColumns: ["clt_id"]
          },
        ]
      }
      vw_operateur_client_view: {
        Row: {
          clt_actif: boolean | null
          clt_id: string | null
          clt_nom: string | null
          lmod: string | null
          opcl_id: string | null
          oper_actif: boolean | null
          oper_email: string | null
          oper_id: string | null
          oper_nom: string | null
        }
        Relationships: [
          {
            foreignKeyName: "operateur_client_oper_id_fkey"
            columns: ["oper_id"]
            isOneToOne: false
            referencedRelation: "operateur"
            referencedColumns: ["oper_id"]
          },
          {
            foreignKeyName: "operateur_client_oper_id_fkey"
            columns: ["oper_id"]
            isOneToOne: false
            referencedRelation: "vw_operateur_view"
            referencedColumns: ["oper_id"]
          },
        ]
      }
      vw_operateur_view: {
        Row: {
          lmod: string | null
          must_change_pwd: boolean | null
          oper_actif: boolean | null
          oper_admin_sys: boolean | null
          oper_email: string | null
          oper_id: string | null
          oper_nom: string | null
          oper_prenom: string | null
        }
        Insert: {
          lmod?: string | null
          must_change_pwd?: boolean | null
          oper_actif?: boolean | null
          oper_admin_sys?: boolean | null
          oper_email?: string | null
          oper_id?: string | null
          oper_nom?: string | null
          oper_prenom?: string | null
        }
        Update: {
          lmod?: string | null
          must_change_pwd?: boolean | null
          oper_actif?: boolean | null
          oper_admin_sys?: boolean | null
          oper_email?: string | null
          oper_id?: string | null
          oper_nom?: string | null
          oper_prenom?: string | null
        }
        Relationships: []
      }
      vw_societe_view: {
        Row: {
          clt_id: string | null
          clt_nom: string | null
          lmod: string | null
          soc_adresse: string | null
          soc_client: boolean | null
          soc_code: string | null
          soc_code_postal: string | null
          soc_fournisseur: boolean | null
          soc_id: string | null
          soc_nom: string | null
          soc_pays: string | null
          soc_siren: string | null
          soc_telephone: string | null
          soc_ville: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_adminsys: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
