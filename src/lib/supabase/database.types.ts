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
      budget: {
        Row: {
          bud_amount_ht_eur: number
          bud_id: string
          bud_kind: string
          cc_id: string | null
          clt_id: string
          created_at: string
          exer_id: string
          oper_id: string | null
          revenue_type_id: number | null
          updated_at: string
        }
        Insert: {
          bud_amount_ht_eur?: number
          bud_id?: string
          bud_kind: string
          cc_id?: string | null
          clt_id: string
          created_at?: string
          exer_id: string
          oper_id?: string | null
          revenue_type_id?: number | null
          updated_at?: string
        }
        Update: {
          bud_amount_ht_eur?: number
          bud_id?: string
          bud_kind?: string
          cc_id?: string | null
          clt_id?: string
          created_at?: string
          exer_id?: string
          oper_id?: string | null
          revenue_type_id?: number | null
          updated_at?: string
        }
        Relationships: []
      }
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
      invoice: {
        Row: {
          cc_id: string
          clt_id: string
          exer_id: string
          inv_amount_ht: number
          inv_amount_tax: number
          inv_amount_ttc: number
          inv_bank_value_date: string | null
          inv_comments: string | null
          inv_designation: string
          inv_due_date: string | null
          inv_id: string
          inv_invoice_date: string
          inv_lmod: string
          inv_payment_date: string | null
          inv_reference: string | null
          inv_type: number
          opb_operation_id: string | null
          oper_id: string
          soc_id: string
        }
        Insert: {
          cc_id: string
          clt_id: string
          exer_id: string
          inv_amount_ht?: number
          inv_amount_tax?: number
          inv_amount_ttc?: number
          inv_bank_value_date?: string | null
          inv_comments?: string | null
          inv_designation?: string
          inv_due_date?: string | null
          inv_id?: string
          inv_invoice_date: string
          inv_lmod?: string
          inv_payment_date?: string | null
          inv_reference?: string | null
          inv_type: number
          opb_operation_id?: string | null
          oper_id: string
          soc_id: string
        }
        Update: {
          cc_id?: string
          clt_id?: string
          exer_id?: string
          inv_amount_ht?: number
          inv_amount_tax?: number
          inv_amount_ttc?: number
          inv_bank_value_date?: string | null
          inv_comments?: string | null
          inv_designation?: string
          inv_due_date?: string | null
          inv_id?: string
          inv_invoice_date?: string
          inv_lmod?: string
          inv_payment_date?: string | null
          inv_reference?: string | null
          inv_type?: number
          opb_operation_id?: string | null
          oper_id?: string
          soc_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_cc_id_fkey"
            columns: ["cc_id"]
            isOneToOne: false
            referencedRelation: "centre_cout"
            referencedColumns: ["cc_id"]
          },
          {
            foreignKeyName: "invoice_cc_id_fkey"
            columns: ["cc_id"]
            isOneToOne: false
            referencedRelation: "vw_centre_cout_view"
            referencedColumns: ["cc_id"]
          },
          {
            foreignKeyName: "invoice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "invoice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "vw_client_view"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "invoice_exer_id_fkey"
            columns: ["exer_id"]
            isOneToOne: false
            referencedRelation: "exercice"
            referencedColumns: ["exer_id"]
          },
          {
            foreignKeyName: "invoice_exer_id_fkey"
            columns: ["exer_id"]
            isOneToOne: false
            referencedRelation: "vw_exercice_view"
            referencedColumns: ["exer_id"]
          },
          {
            foreignKeyName: "invoice_oper_id_fkey"
            columns: ["oper_id"]
            isOneToOne: false
            referencedRelation: "operateur"
            referencedColumns: ["oper_id"]
          },
          {
            foreignKeyName: "invoice_oper_id_fkey"
            columns: ["oper_id"]
            isOneToOne: false
            referencedRelation: "vw_operateur_view"
            referencedColumns: ["oper_id"]
          },
          {
            foreignKeyName: "invoice_soc_id_fkey"
            columns: ["soc_id"]
            isOneToOne: false
            referencedRelation: "societe"
            referencedColumns: ["soc_id"]
          },
          {
            foreignKeyName: "invoice_soc_id_fkey"
            columns: ["soc_id"]
            isOneToOne: false
            referencedRelation: "vw_societe_view"
            referencedColumns: ["soc_id"]
          },
        ]
      }
      invoice_purchase: {
        Row: {
          inv_id: string
          invp_paid_by_clt_amount: number
          invp_paid_by_third_party_amount: number
        }
        Insert: {
          inv_id: string
          invp_paid_by_clt_amount?: number
          invp_paid_by_third_party_amount?: number
        }
        Update: {
          inv_id?: string
          invp_paid_by_clt_amount?: number
          invp_paid_by_third_party_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_purchase_inv_id_fkey"
            columns: ["inv_id"]
            isOneToOne: true
            referencedRelation: "invoice"
            referencedColumns: ["inv_id"]
          },
          {
            foreignKeyName: "invoice_purchase_inv_id_fkey"
            columns: ["inv_id"]
            isOneToOne: true
            referencedRelation: "vw_invoice_purchase_view"
            referencedColumns: ["inv_id"]
          },
          {
            foreignKeyName: "invoice_purchase_inv_id_fkey"
            columns: ["inv_id"]
            isOneToOne: true
            referencedRelation: "vw_invoice_sales_view"
            referencedColumns: ["inv_id"]
          },
        ]
      }
      invoice_sales: {
        Row: {
          inv_id: string
          invs_deal_name: string | null
          invs_deal_number: string | null
          invs_payment_delay_days: number | null
          invs_revenue_type: number | null
        }
        Insert: {
          inv_id: string
          invs_deal_name?: string | null
          invs_deal_number?: string | null
          invs_payment_delay_days?: number | null
          invs_revenue_type?: number | null
        }
        Update: {
          inv_id?: string
          invs_deal_name?: string | null
          invs_deal_number?: string | null
          invs_payment_delay_days?: number | null
          invs_revenue_type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_sales_inv_id_fkey"
            columns: ["inv_id"]
            isOneToOne: true
            referencedRelation: "invoice"
            referencedColumns: ["inv_id"]
          },
          {
            foreignKeyName: "invoice_sales_inv_id_fkey"
            columns: ["inv_id"]
            isOneToOne: true
            referencedRelation: "vw_invoice_purchase_view"
            referencedColumns: ["inv_id"]
          },
          {
            foreignKeyName: "invoice_sales_inv_id_fkey"
            columns: ["inv_id"]
            isOneToOne: true
            referencedRelation: "vw_invoice_sales_view"
            referencedColumns: ["inv_id"]
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
      tro_compte: {
        Row: {
          tro_clt_id: string
          tro_cpt_actif: boolean
          tro_cpt_id: string
          tro_cpt_inclus_global: boolean
          tro_cpt_nom: string
          tro_cpt_ordre: number
          tro_lmod: string
          tro_soc_id: string | null
        }
        Insert: {
          tro_clt_id: string
          tro_cpt_actif?: boolean
          tro_cpt_id?: string
          tro_cpt_inclus_global?: boolean
          tro_cpt_nom: string
          tro_cpt_ordre?: number
          tro_lmod?: string
          tro_soc_id?: string | null
        }
        Update: {
          tro_clt_id?: string
          tro_cpt_actif?: boolean
          tro_cpt_id?: string
          tro_cpt_inclus_global?: boolean
          tro_cpt_nom?: string
          tro_cpt_ordre?: number
          tro_lmod?: string
          tro_soc_id?: string | null
        }
        Relationships: []
      }
      tro_mensuel: {
        Row: {
          tro_clt_id: string
          tro_commentaire: string | null
          tro_cpt_id: string
          tro_credits: number
          tro_debits: number
          tro_exer_id: string
          tro_init: boolean
          tro_lmod: string
          tro_mens_id: string
          tro_mois: string
          tro_solde_init: number
        }
        Insert: {
          tro_clt_id: string
          tro_commentaire?: string | null
          tro_cpt_id: string
          tro_credits?: number
          tro_debits?: number
          tro_exer_id: string
          tro_init?: boolean
          tro_lmod?: string
          tro_mens_id?: string
          tro_mois: string
          tro_solde_init?: number
        }
        Update: {
          tro_clt_id?: string
          tro_commentaire?: string | null
          tro_cpt_id?: string
          tro_credits?: number
          tro_debits?: number
          tro_exer_id?: string
          tro_init?: boolean
          tro_lmod?: string
          tro_mens_id?: string
          tro_mois?: string
          tro_solde_init?: number
        }
        Relationships: [
          {
            foreignKeyName: "tro_mensuel_tro_cpt_id_fkey"
            columns: ["tro_cpt_id"]
            isOneToOne: false
            referencedRelation: "tro_compte"
            referencedColumns: ["tro_cpt_id"]
          },
          {
            foreignKeyName: "tro_mensuel_tro_cpt_id_fkey"
            columns: ["tro_cpt_id"]
            isOneToOne: false
            referencedRelation: "vw_tro_compte_view"
            referencedColumns: ["tro_cpt_id"]
          },
        ]
      }
    }
    Views: {
      vw_budget_purchase_lines: {
        Row: {
          budget_ht_eur: number | null
          cc_code: string | null
          cc_id: string | null
          cc_libelle: string | null
          clt_id: string | null
          exer_id: string | null
          famille_id: number | null
          pct_realise: number | null
          realized_ht_eur: number | null
        }
        Relationships: []
      }
      vw_budget_sales_lines: {
        Row: {
          budget_ht_eur: number | null
          clt_id: string | null
          exer_id: string | null
          pct_realise: number | null
          realized_ht_eur: number | null
          revenue_type_id: number | null
        }
        Relationships: []
      }
      vw_budget_view: {
        Row: {
          bud_amount_ht_eur: number | null
          bud_id: string | null
          bud_kind: string | null
          cc_code: string | null
          cc_id: string | null
          cc_libelle: string | null
          clt_id: string | null
          clt_nom: string | null
          created_at: string | null
          exer_code: string | null
          exer_id: string | null
          famille_id: number | null
          oper_id: string | null
          oper_nom: string | null
          oper_prenom: string | null
          revenue_type_id: number | null
          updated_at: string | null
        }
        Relationships: []
      }
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
      vw_invoice_purchase_view: {
        Row: {
          cc_code: string | null
          cc_id: string | null
          cc_libelle: string | null
          clt_id: string | null
          clt_nom: string | null
          exer_code: string | null
          exer_id: string | null
          inv_amount_ht: number | null
          inv_amount_tax: number | null
          inv_amount_ttc: number | null
          inv_bank_value_date: string | null
          inv_comments: string | null
          inv_designation: string | null
          inv_due_date: string | null
          inv_id: string | null
          inv_invoice_date: string | null
          inv_lmod: string | null
          inv_payment_date: string | null
          inv_reference: string | null
          inv_type: number | null
          invp_paid_by_clt_amount: number | null
          invp_paid_by_third_party_amount: number | null
          opb_operation_id: string | null
          oper_id: string | null
          oper_nom: string | null
          oper_prenom: string | null
          soc_id: string | null
          soc_nom: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_cc_id_fkey"
            columns: ["cc_id"]
            isOneToOne: false
            referencedRelation: "centre_cout"
            referencedColumns: ["cc_id"]
          },
          {
            foreignKeyName: "invoice_cc_id_fkey"
            columns: ["cc_id"]
            isOneToOne: false
            referencedRelation: "vw_centre_cout_view"
            referencedColumns: ["cc_id"]
          },
          {
            foreignKeyName: "invoice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "invoice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "vw_client_view"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "invoice_exer_id_fkey"
            columns: ["exer_id"]
            isOneToOne: false
            referencedRelation: "exercice"
            referencedColumns: ["exer_id"]
          },
          {
            foreignKeyName: "invoice_exer_id_fkey"
            columns: ["exer_id"]
            isOneToOne: false
            referencedRelation: "vw_exercice_view"
            referencedColumns: ["exer_id"]
          },
          {
            foreignKeyName: "invoice_oper_id_fkey"
            columns: ["oper_id"]
            isOneToOne: false
            referencedRelation: "operateur"
            referencedColumns: ["oper_id"]
          },
          {
            foreignKeyName: "invoice_oper_id_fkey"
            columns: ["oper_id"]
            isOneToOne: false
            referencedRelation: "vw_operateur_view"
            referencedColumns: ["oper_id"]
          },
          {
            foreignKeyName: "invoice_soc_id_fkey"
            columns: ["soc_id"]
            isOneToOne: false
            referencedRelation: "societe"
            referencedColumns: ["soc_id"]
          },
          {
            foreignKeyName: "invoice_soc_id_fkey"
            columns: ["soc_id"]
            isOneToOne: false
            referencedRelation: "vw_societe_view"
            referencedColumns: ["soc_id"]
          },
        ]
      }
      vw_invoice_sales_view: {
        Row: {
          cc_code: string | null
          cc_id: string | null
          cc_libelle: string | null
          clt_id: string | null
          clt_nom: string | null
          exer_code: string | null
          exer_id: string | null
          inv_amount_ht: number | null
          inv_amount_tax: number | null
          inv_amount_ttc: number | null
          inv_bank_value_date: string | null
          inv_comments: string | null
          inv_designation: string | null
          inv_due_date: string | null
          inv_id: string | null
          inv_invoice_date: string | null
          inv_lmod: string | null
          inv_payment_date: string | null
          inv_reference: string | null
          inv_type: number | null
          invs_deal_name: string | null
          invs_deal_number: string | null
          invs_payment_delay_days: number | null
          invs_revenue_type: number | null
          opb_operation_id: string | null
          oper_id: string | null
          oper_nom: string | null
          oper_prenom: string | null
          soc_id: string | null
          soc_nom: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_cc_id_fkey"
            columns: ["cc_id"]
            isOneToOne: false
            referencedRelation: "centre_cout"
            referencedColumns: ["cc_id"]
          },
          {
            foreignKeyName: "invoice_cc_id_fkey"
            columns: ["cc_id"]
            isOneToOne: false
            referencedRelation: "vw_centre_cout_view"
            referencedColumns: ["cc_id"]
          },
          {
            foreignKeyName: "invoice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "invoice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "vw_client_view"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "invoice_exer_id_fkey"
            columns: ["exer_id"]
            isOneToOne: false
            referencedRelation: "exercice"
            referencedColumns: ["exer_id"]
          },
          {
            foreignKeyName: "invoice_exer_id_fkey"
            columns: ["exer_id"]
            isOneToOne: false
            referencedRelation: "vw_exercice_view"
            referencedColumns: ["exer_id"]
          },
          {
            foreignKeyName: "invoice_oper_id_fkey"
            columns: ["oper_id"]
            isOneToOne: false
            referencedRelation: "operateur"
            referencedColumns: ["oper_id"]
          },
          {
            foreignKeyName: "invoice_oper_id_fkey"
            columns: ["oper_id"]
            isOneToOne: false
            referencedRelation: "vw_operateur_view"
            referencedColumns: ["oper_id"]
          },
          {
            foreignKeyName: "invoice_soc_id_fkey"
            columns: ["soc_id"]
            isOneToOne: false
            referencedRelation: "societe"
            referencedColumns: ["soc_id"]
          },
          {
            foreignKeyName: "invoice_soc_id_fkey"
            columns: ["soc_id"]
            isOneToOne: false
            referencedRelation: "vw_societe_view"
            referencedColumns: ["soc_id"]
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
      vw_purchase_realized_ht: {
        Row: {
          cc_id: string | null
          clt_id: string | null
          exer_id: string | null
          realized_ht_eur: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_cc_id_fkey"
            columns: ["cc_id"]
            isOneToOne: false
            referencedRelation: "centre_cout"
            referencedColumns: ["cc_id"]
          },
          {
            foreignKeyName: "invoice_cc_id_fkey"
            columns: ["cc_id"]
            isOneToOne: false
            referencedRelation: "vw_centre_cout_view"
            referencedColumns: ["cc_id"]
          },
          {
            foreignKeyName: "invoice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "invoice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "vw_client_view"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "invoice_exer_id_fkey"
            columns: ["exer_id"]
            isOneToOne: false
            referencedRelation: "exercice"
            referencedColumns: ["exer_id"]
          },
          {
            foreignKeyName: "invoice_exer_id_fkey"
            columns: ["exer_id"]
            isOneToOne: false
            referencedRelation: "vw_exercice_view"
            referencedColumns: ["exer_id"]
          },
        ]
      }
      vw_sales_realized_ht: {
        Row: {
          clt_id: string | null
          exer_id: string | null
          realized_ht_eur: number | null
          revenue_type_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "invoice_clt_id_fkey"
            columns: ["clt_id"]
            isOneToOne: false
            referencedRelation: "vw_client_view"
            referencedColumns: ["clt_id"]
          },
          {
            foreignKeyName: "invoice_exer_id_fkey"
            columns: ["exer_id"]
            isOneToOne: false
            referencedRelation: "exercice"
            referencedColumns: ["exer_id"]
          },
          {
            foreignKeyName: "invoice_exer_id_fkey"
            columns: ["exer_id"]
            isOneToOne: false
            referencedRelation: "vw_exercice_view"
            referencedColumns: ["exer_id"]
          },
        ]
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
      vw_tro_compte_view: {
        Row: {
          tro_clt_id: string | null
          tro_cpt_actif: boolean | null
          tro_cpt_id: string | null
          tro_cpt_inclus_global: boolean | null
          tro_cpt_nom: string | null
          tro_cpt_ordre: number | null
          tro_lmod: string | null
          tro_soc_id: string | null
        }
        Insert: {
          tro_clt_id?: string | null
          tro_cpt_actif?: boolean | null
          tro_cpt_id?: string | null
          tro_cpt_inclus_global?: boolean | null
          tro_cpt_nom?: string | null
          tro_cpt_ordre?: number | null
          tro_lmod?: string | null
          tro_soc_id?: string | null
        }
        Update: {
          tro_clt_id?: string | null
          tro_cpt_actif?: boolean | null
          tro_cpt_id?: string | null
          tro_cpt_inclus_global?: boolean | null
          tro_cpt_nom?: string | null
          tro_cpt_ordre?: number | null
          tro_lmod?: string | null
          tro_soc_id?: string | null
        }
        Relationships: []
      }
      vw_tro_mensuel_view: {
        Row: {
          tro_clt_id: string | null
          tro_commentaire: string | null
          tro_cpt_id: string | null
          tro_credits: number | null
          tro_debits: number | null
          tro_exer_id: string | null
          tro_init: boolean | null
          tro_lmod: string | null
          tro_mens_id: string | null
          tro_mois: string | null
          tro_solde_init: number | null
        }
        Insert: {
          tro_clt_id?: string | null
          tro_commentaire?: string | null
          tro_cpt_id?: string | null
          tro_credits?: number | null
          tro_debits?: number | null
          tro_exer_id?: string | null
          tro_init?: boolean | null
          tro_lmod?: string | null
          tro_mens_id?: string | null
          tro_mois?: string | null
          tro_solde_init?: number | null
        }
        Update: {
          tro_clt_id?: string | null
          tro_commentaire?: string | null
          tro_cpt_id?: string | null
          tro_credits?: number | null
          tro_debits?: number | null
          tro_exer_id?: string | null
          tro_init?: boolean | null
          tro_lmod?: string | null
          tro_mens_id?: string | null
          tro_mois?: string | null
          tro_solde_init?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tro_mensuel_tro_cpt_id_fkey"
            columns: ["tro_cpt_id"]
            isOneToOne: false
            referencedRelation: "tro_compte"
            referencedColumns: ["tro_cpt_id"]
          },
          {
            foreignKeyName: "tro_mensuel_tro_cpt_id_fkey"
            columns: ["tro_cpt_id"]
            isOneToOne: false
            referencedRelation: "vw_tro_compte_view"
            referencedColumns: ["tro_cpt_id"]
          },
        ]
      }
      vw_tro_soldes_mensuels_view: {
        Row: {
          tro_clt_id: string | null
          tro_cpt_id: string | null
          tro_credits: number | null
          tro_debits: number | null
          tro_exer_id: string | null
          tro_mois: string | null
          tro_solde: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tro_mensuel_tro_cpt_id_fkey"
            columns: ["tro_cpt_id"]
            isOneToOne: false
            referencedRelation: "tro_compte"
            referencedColumns: ["tro_cpt_id"]
          },
          {
            foreignKeyName: "tro_mensuel_tro_cpt_id_fkey"
            columns: ["tro_cpt_id"]
            isOneToOne: false
            referencedRelation: "vw_tro_compte_view"
            referencedColumns: ["tro_cpt_id"]
          },
        ]
      }
    }
    Functions: {
      debug_whoami: {
        Args: never
        Returns: {
          r: string
          su: string
          u: string
        }[]
      }
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
