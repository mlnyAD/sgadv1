


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;




ALTER SCHEMA "public" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."debug_whoami"() RETURNS TABLE("u" "text", "su" "text", "r" "text")
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
  select current_user::text, session_user::text, current_role::text;
$$;


ALTER FUNCTION "public"."debug_whoami"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_adminsys"() RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
  select exists (
    select 1
    from public.operateur o
    where o.oper_id = auth.uid()
      and o.oper_admin_sys = true
  );
$$;


ALTER FUNCTION "public"."is_adminsys"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_lmod"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.lmod := now();
  return new;
end $$;


ALTER FUNCTION "public"."set_lmod"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trg_set_purchase_timestamps"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
    new.updated_at := now();
    new.pur_lmod := now();
    return new;
end;
$$;


ALTER FUNCTION "public"."trg_set_purchase_timestamps"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trg_set_sales_timestamps"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
    new.updated_at := now();
    new.sal_lmod := now();
    return new;
end;
$$;


ALTER FUNCTION "public"."trg_set_sales_timestamps"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."budget" (
    "bud_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "clt_id" "uuid" NOT NULL,
    "exer_id" "uuid" NOT NULL,
    "bud_kind" "text" NOT NULL,
    "revenue_type_id" integer,
    "cc_id" "uuid",
    "bud_amount_ht_eur" integer DEFAULT 0 NOT NULL,
    "oper_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "budget_bud_amount_ht_eur_check" CHECK (("bud_amount_ht_eur" >= 0)),
    CONSTRAINT "budget_bud_kind_check" CHECK (("bud_kind" = ANY (ARRAY['SALES'::"text", 'PURCHASE'::"text"]))),
    CONSTRAINT "budget_dim_xor" CHECK (((("bud_kind" = 'SALES'::"text") AND ("revenue_type_id" IS NOT NULL) AND ("cc_id" IS NULL)) OR (("bud_kind" = 'PURCHASE'::"text") AND ("cc_id" IS NOT NULL) AND ("revenue_type_id" IS NULL))))
);


ALTER TABLE "public"."budget" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."centre_cout" (
    "cc_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "clt_id" "uuid" NOT NULL,
    "famille_id" integer NOT NULL,
    "cc_code" "text" NOT NULL,
    "cc_libelle" "text" NOT NULL,
    "cc_commentaires" "text",
    "cc_actif" boolean DEFAULT true NOT NULL,
    "lmod" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."centre_cout" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."client" (
    "clt_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "clt_code" "text" NOT NULL,
    "clt_nom" "text" NOT NULL,
    "clt_adresse" "text",
    "clt_code_postal" "text",
    "clt_ville" "text",
    "clt_pays" "text",
    "clt_email" "text",
    "clt_telephone" "text",
    "clt_actif" boolean DEFAULT true NOT NULL,
    "lmod" timestamp with time zone DEFAULT "now"() NOT NULL,
    "clt_logo_path" "text"
);


ALTER TABLE "public"."client" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."exercice" (
    "exer_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "clt_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "exer_code" "text",
    "exer_debut" "date",
    "exer_fin" "date",
    "exer_actif" boolean,
    "exer_commentaires" "text",
    "lmod" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."exercice" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."fisc" (
    "fisc_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "fisc_clt_id" "uuid" NOT NULL,
    "fisc_soc_id" "uuid",
    "fisc_exer_id" "uuid" NOT NULL,
    "fisc_type_id" integer NOT NULL,
    "fisc_montant" numeric DEFAULT 0 NOT NULL,
    "fisc_date" "date" DEFAULT "now"(),
    "fisc_comments" "text",
    "fisc_lmod" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."fisc" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."operateur" (
    "oper_id" "uuid" NOT NULL,
    "oper_nom" "text" NOT NULL,
    "oper_prenom" "text" NOT NULL,
    "oper_email" "text" NOT NULL,
    "oper_admin_sys" boolean DEFAULT false NOT NULL,
    "lmod" timestamp with time zone DEFAULT "now"() NOT NULL,
    "oper_actif" boolean DEFAULT false NOT NULL,
    "must_change_pwd" boolean DEFAULT true NOT NULL
);


ALTER TABLE "public"."operateur" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."operateur_client" (
    "opcl_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "oper_id" "uuid" NOT NULL,
    "clt_id" "uuid" NOT NULL,
    "lmod" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."operateur_client" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."purchase" (
    "pur_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "clt_id" "uuid" NOT NULL,
    "soc_id" "uuid" NOT NULL,
    "exer_id" "uuid" NOT NULL,
    "cc_id" "uuid" NOT NULL,
    "oper_id" "uuid",
    "pur_invoice_date" "date" NOT NULL,
    "pur_due_date" "date",
    "pur_payment_date" "date",
    "pur_bank_value_date" "date",
    "pur_reference" "text",
    "pur_designation" "text" NOT NULL,
    "pur_amount_ht" numeric(14,2) DEFAULT 0 NOT NULL,
    "pur_amount_tax" numeric(14,2) DEFAULT 0 NOT NULL,
    "pur_amount_ttc" numeric(14,2) DEFAULT 0 NOT NULL,
    "opb_operation_id" "text",
    "pur_comments" "text",
    "pur_paid_by_clt_amount" numeric(14,2),
    "pur_paid_by_third_party_amount" numeric(14,2),
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "pur_lmod" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "purchase_amounts_chk" CHECK ((("pur_amount_ht" >= (0)::numeric) AND ("pur_amount_tax" >= (0)::numeric) AND ("pur_amount_ttc" >= (0)::numeric)))
);


ALTER TABLE "public"."purchase" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."remboursement" (
    "rbt_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "rbt_clt_id" "uuid" NOT NULL,
    "rbt_exer_id" "uuid" NOT NULL,
    "rbt_amount" numeric DEFAULT 0 NOT NULL,
    "rbt_date" "date" DEFAULT CURRENT_DATE NOT NULL,
    "lmod" timestamp with time zone DEFAULT "now"() NOT NULL,
    "rbt_commentaires" "text",
    CONSTRAINT "rbt_amount_non_negative" CHECK (("rbt_amount" >= (0)::numeric))
);


ALTER TABLE "public"."remboursement" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."sales" (
    "sal_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "clt_id" "uuid" NOT NULL,
    "soc_id" "uuid" NOT NULL,
    "exer_id" "uuid" NOT NULL,
    "oper_id" "uuid",
    "sal_invoice_date" "date" NOT NULL,
    "sal_due_date" "date",
    "sal_payment_date" "date",
    "sal_bank_value_date" "date",
    "sal_reference" "text",
    "sal_designation" "text" NOT NULL,
    "sal_amount_ht" numeric(14,2) DEFAULT 0 NOT NULL,
    "sal_amount_tax" numeric(14,2) DEFAULT 0 NOT NULL,
    "sal_amount_ttc" numeric(14,2) DEFAULT 0 NOT NULL,
    "opb_operation_id" "text",
    "sal_comments" "text",
    "sal_deal_number" "text",
    "sal_deal_name" "text",
    "sal_revenue_type_id" integer NOT NULL,
    "sal_payment_delay_days" integer,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "sal_lmod" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "sales_amounts_chk" CHECK ((("sal_amount_ht" >= (0)::numeric) AND ("sal_amount_tax" >= (0)::numeric) AND ("sal_amount_ttc" >= (0)::numeric))),
    CONSTRAINT "sales_payment_delay_days_chk" CHECK ((("sal_payment_delay_days" IS NULL) OR ("sal_payment_delay_days" >= 0)))
);


ALTER TABLE "public"."sales" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."societe" (
    "soc_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "clt_id" "uuid" NOT NULL,
    "soc_nom" "text" NOT NULL,
    "soc_code" "text" NOT NULL,
    "soc_adresse" "text",
    "soc_code_postal" "text",
    "soc_ville" "text",
    "soc_pays" "text",
    "soc_telephone" "text",
    "soc_siren" "text",
    "soc_client" boolean,
    "soc_fournisseur" boolean,
    "lmod" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."societe" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tro_compte" (
    "tro_cpt_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tro_clt_id" "uuid" NOT NULL,
    "tro_soc_id" "uuid",
    "tro_cpt_nom" "text" NOT NULL,
    "tro_cpt_ordre" integer DEFAULT 0 NOT NULL,
    "tro_cpt_inclus_global" boolean DEFAULT true NOT NULL,
    "tro_cpt_actif" boolean DEFAULT true NOT NULL,
    "tro_lmod" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."tro_compte" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tro_mensuel" (
    "tro_mens_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tro_clt_id" "uuid" NOT NULL,
    "tro_exer_id" "uuid" NOT NULL,
    "tro_cpt_id" "uuid" NOT NULL,
    "tro_mois" "date" NOT NULL,
    "tro_credits" numeric DEFAULT 0 NOT NULL,
    "tro_debits" numeric DEFAULT 0 NOT NULL,
    "tro_init" boolean DEFAULT false NOT NULL,
    "tro_solde_init" numeric DEFAULT 0 NOT NULL,
    "tro_commentaire" "text",
    "tro_lmod" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "chk_tro_nonneg" CHECK ((("tro_credits" >= (0)::numeric) AND ("tro_debits" >= (0)::numeric)))
);


ALTER TABLE "public"."tro_mensuel" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_budget_view" WITH ("security_invoker"='true') AS
 SELECT "b"."bud_id",
    "b"."clt_id",
    "b"."exer_id",
    "b"."bud_kind",
    "b"."revenue_type_id",
    "b"."cc_id",
    "b"."bud_amount_ht_eur",
    "b"."oper_id",
    "b"."created_at",
    "b"."updated_at",
    "c"."clt_nom",
    "e"."exer_code",
    "cc"."cc_code",
    "cc"."cc_libelle",
    "cc"."famille_id",
    "o"."oper_nom",
    "o"."oper_prenom"
   FROM (((("public"."budget" "b"
     JOIN "public"."client" "c" ON (("c"."clt_id" = "b"."clt_id")))
     JOIN "public"."exercice" "e" ON (("e"."exer_id" = "b"."exer_id")))
     LEFT JOIN "public"."centre_cout" "cc" ON (("cc"."cc_id" = "b"."cc_id")))
     LEFT JOIN "public"."operateur" "o" ON (("o"."oper_id" = "b"."oper_id")));


ALTER VIEW "public"."vw_budget_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_budget_purchase_lines" WITH ("security_invoker"='true') AS
 WITH "budget" AS (
         SELECT "b"."clt_id",
            "b"."exer_id",
            "b"."cc_id",
            "b"."cc_code",
            "b"."cc_libelle",
            "b"."famille_id",
            "sum"("b"."bud_amount_ht_eur") AS "budget_ht_eur"
           FROM "public"."vw_budget_view" "b"
          WHERE ("b"."bud_kind" = 'PURCHASE'::"text")
          GROUP BY "b"."clt_id", "b"."exer_id", "b"."cc_id", "b"."cc_code", "b"."cc_libelle", "b"."famille_id"
        ), "realized" AS (
         SELECT "p"."clt_id",
            "p"."exer_id",
            "p"."cc_id",
            "cc"."famille_id",
            "sum"("p"."pur_amount_ht") AS "realized_ht_eur"
           FROM ("public"."purchase" "p"
             JOIN "public"."centre_cout" "cc" ON (("cc"."cc_id" = "p"."cc_id")))
          GROUP BY "p"."clt_id", "p"."exer_id", "p"."cc_id", "cc"."famille_id"
        )
 SELECT "b"."clt_id",
    "b"."exer_id",
    "b"."cc_id",
    "b"."cc_code",
    "b"."cc_libelle",
    "b"."famille_id",
    "b"."budget_ht_eur",
    "r"."realized_ht_eur",
        CASE
            WHEN (COALESCE("b"."budget_ht_eur", (0)::bigint) = 0) THEN NULL::numeric
            ELSE "round"(((COALESCE("r"."realized_ht_eur", (0)::numeric) / ("b"."budget_ht_eur")::numeric) * (100)::numeric), 2)
        END AS "pct_realise"
   FROM ("budget" "b"
     LEFT JOIN "realized" "r" ON (((NOT ("r"."clt_id" IS DISTINCT FROM "b"."clt_id")) AND (NOT ("r"."exer_id" IS DISTINCT FROM "b"."exer_id")) AND (NOT ("r"."cc_id" IS DISTINCT FROM "b"."cc_id")) AND (NOT ("r"."famille_id" IS DISTINCT FROM "b"."famille_id")))))
UNION ALL
 SELECT "r"."clt_id",
    "r"."exer_id",
    "r"."cc_id",
    "cc"."cc_code",
    "cc"."cc_libelle",
    "r"."famille_id",
    NULL::bigint AS "budget_ht_eur",
    "r"."realized_ht_eur",
    NULL::numeric AS "pct_realise"
   FROM (("realized" "r"
     LEFT JOIN "budget" "b" ON (((NOT ("b"."clt_id" IS DISTINCT FROM "r"."clt_id")) AND (NOT ("b"."exer_id" IS DISTINCT FROM "r"."exer_id")) AND (NOT ("b"."cc_id" IS DISTINCT FROM "r"."cc_id")) AND (NOT ("b"."famille_id" IS DISTINCT FROM "r"."famille_id")))))
     LEFT JOIN "public"."centre_cout" "cc" ON (("cc"."cc_id" = "r"."cc_id")))
  WHERE ("b"."cc_id" IS NULL);


ALTER VIEW "public"."vw_budget_purchase_lines" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_budget_sales_lines" WITH ("security_invoker"='true') AS
 WITH "budget" AS (
         SELECT "b"."clt_id",
            "b"."exer_id",
            "b"."revenue_type_id",
            "sum"("b"."bud_amount_ht_eur") AS "budget_ht_eur"
           FROM "public"."vw_budget_view" "b"
          WHERE ("b"."bud_kind" = 'SALES'::"text")
          GROUP BY "b"."clt_id", "b"."exer_id", "b"."revenue_type_id"
        ), "realized" AS (
         SELECT "s"."clt_id",
            "s"."exer_id",
            "s"."sal_revenue_type_id" AS "revenue_type_id",
            "sum"("s"."sal_amount_ht") AS "realized_ht_eur"
           FROM "public"."sales" "s"
          GROUP BY "s"."clt_id", "s"."exer_id", "s"."sal_revenue_type_id"
        )
 SELECT "b"."clt_id",
    "b"."exer_id",
    "b"."revenue_type_id",
    "b"."budget_ht_eur",
    "r"."realized_ht_eur",
        CASE
            WHEN (COALESCE("b"."budget_ht_eur", (0)::bigint) = 0) THEN NULL::numeric
            ELSE "round"(((COALESCE("r"."realized_ht_eur", (0)::numeric) / ("b"."budget_ht_eur")::numeric) * (100)::numeric), 2)
        END AS "pct_realise"
   FROM ("budget" "b"
     LEFT JOIN "realized" "r" ON (((NOT ("r"."clt_id" IS DISTINCT FROM "b"."clt_id")) AND (NOT ("r"."exer_id" IS DISTINCT FROM "b"."exer_id")) AND (NOT ("r"."revenue_type_id" IS DISTINCT FROM "b"."revenue_type_id")))))
UNION ALL
 SELECT "r"."clt_id",
    "r"."exer_id",
    "r"."revenue_type_id",
    NULL::bigint AS "budget_ht_eur",
    "r"."realized_ht_eur",
    NULL::numeric AS "pct_realise"
   FROM ("realized" "r"
     LEFT JOIN "budget" "b" ON (((NOT ("b"."clt_id" IS DISTINCT FROM "r"."clt_id")) AND (NOT ("b"."exer_id" IS DISTINCT FROM "r"."exer_id")) AND (NOT ("b"."revenue_type_id" IS DISTINCT FROM "r"."revenue_type_id")))))
  WHERE ("b"."clt_id" IS NULL);


ALTER VIEW "public"."vw_budget_sales_lines" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_centre_cout_view" WITH ("security_invoker"='true') AS
 SELECT "cc"."cc_id",
    "cc"."clt_id",
    "c"."clt_nom",
    "cc"."famille_id",
    "cc"."cc_code",
    "cc"."cc_libelle",
    "cc"."cc_commentaires",
    "cc"."cc_actif",
    "cc"."lmod"
   FROM ("public"."centre_cout" "cc"
     JOIN "public"."client" "c" ON (("c"."clt_id" = "cc"."clt_id")));


ALTER VIEW "public"."vw_centre_cout_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_client_view" WITH ("security_invoker"='true') AS
 SELECT "clt_id",
    "clt_code",
    "clt_nom",
    "clt_adresse",
    "clt_code_postal",
    "clt_ville",
    "clt_pays",
    "clt_email",
    "clt_telephone",
    "clt_actif",
    "lmod",
    "clt_logo_path"
   FROM "public"."client";


ALTER VIEW "public"."vw_client_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_exercice_view" WITH ("security_invoker"='true') AS
 SELECT "e"."exer_id",
    "e"."clt_id",
    "e"."exer_code",
    "e"."exer_debut",
    "e"."exer_fin",
    "e"."exer_actif",
    "e"."exer_commentaires",
    "e"."lmod",
    "c"."clt_nom"
   FROM ("public"."exercice" "e"
     JOIN "public"."client" "c" ON (("c"."clt_id" = "e"."clt_id")));


ALTER VIEW "public"."vw_exercice_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_fisc_view" WITH ("security_invoker"='true') AS
 SELECT "f"."fisc_id",
    "f"."fisc_clt_id",
    "c"."clt_nom",
    "f"."fisc_soc_id",
    "s"."soc_nom",
    "f"."fisc_exer_id",
    "e"."exer_code",
    "f"."fisc_type_id",
    "f"."fisc_montant",
    "f"."fisc_date",
    "f"."fisc_comments",
    "f"."fisc_lmod"
   FROM ((("public"."fisc" "f"
     LEFT JOIN "public"."client" "c" ON (("f"."fisc_clt_id" = "c"."clt_id")))
     LEFT JOIN "public"."societe" "s" ON (("f"."fisc_soc_id" = "s"."soc_id")))
     LEFT JOIN "public"."exercice" "e" ON (("f"."fisc_exer_id" = "e"."exer_id")));


ALTER VIEW "public"."vw_fisc_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_operateur_client_view" WITH ("security_invoker"='true') AS
 SELECT "oc"."opcl_id",
    "oc"."oper_id",
    "o"."oper_nom",
    "o"."oper_email",
    "o"."oper_actif",
    "oc"."clt_id",
    "c"."clt_nom",
    "c"."clt_actif",
    "oc"."lmod",
    "c"."clt_logo_path"
   FROM (("public"."operateur_client" "oc"
     JOIN "public"."client" "c" ON (("c"."clt_id" = "oc"."clt_id")))
     JOIN "public"."operateur" "o" ON (("o"."oper_id" = "oc"."oper_id")));


ALTER VIEW "public"."vw_operateur_client_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_operateur_view" WITH ("security_invoker"='true') AS
 SELECT "oper_id",
    "oper_nom",
    "oper_prenom",
    "oper_email",
    "oper_actif",
    "oper_admin_sys",
    "must_change_pwd",
    "lmod"
   FROM "public"."operateur" "u";


ALTER VIEW "public"."vw_operateur_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_purchase_view" WITH ("security_invoker"='true') AS
 SELECT "p"."pur_id",
    "p"."clt_id",
    "c"."clt_nom",
    "p"."soc_id",
    "s"."soc_nom",
    "p"."exer_id",
    "e"."exer_code",
    "p"."cc_id",
    "cc"."cc_code",
    "cc"."cc_libelle",
    "p"."oper_id",
    "o"."oper_nom",
    "o"."oper_prenom",
    "p"."pur_invoice_date",
    "p"."pur_due_date",
    "p"."pur_payment_date",
    "p"."pur_bank_value_date",
    "p"."pur_reference",
    "p"."pur_designation",
    "p"."pur_amount_ht",
    "p"."pur_amount_tax",
    "p"."pur_amount_ttc",
    "p"."opb_operation_id",
    "p"."pur_comments",
    "p"."pur_paid_by_clt_amount",
    "p"."pur_paid_by_third_party_amount",
    "p"."created_at",
    "p"."updated_at",
    "p"."pur_lmod"
   FROM ((((("public"."purchase" "p"
     LEFT JOIN "public"."client" "c" ON (("c"."clt_id" = "p"."clt_id")))
     LEFT JOIN "public"."societe" "s" ON (("s"."soc_id" = "p"."soc_id")))
     LEFT JOIN "public"."exercice" "e" ON (("e"."exer_id" = "p"."exer_id")))
     LEFT JOIN "public"."centre_cout" "cc" ON (("cc"."cc_id" = "p"."cc_id")))
     LEFT JOIN "public"."operateur" "o" ON (("o"."oper_id" = "p"."oper_id")));


ALTER VIEW "public"."vw_purchase_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_remboursement_total_by_exercice" WITH ("security_invoker"='true') AS
 SELECT "rbt_clt_id" AS "clt_id",
    "rbt_exer_id" AS "exer_id",
    COALESCE("sum"("rbt_amount"), (0)::numeric) AS "refunded_amount"
   FROM "public"."remboursement"
  GROUP BY "rbt_clt_id", "rbt_exer_id";


ALTER VIEW "public"."vw_remboursement_total_by_exercice" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_remboursement_view" WITH ("security_invoker"='true') AS
 SELECT "r"."rbt_id",
    "r"."rbt_clt_id" AS "clt_id",
    "c"."clt_code",
    "c"."clt_nom",
    "r"."rbt_exer_id" AS "exer_id",
    "e"."exer_code",
    "e"."exer_debut",
    "e"."exer_fin",
    "r"."rbt_date",
    "r"."rbt_amount",
    "r"."rbt_commentaires",
    "r"."lmod"
   FROM (("public"."remboursement" "r"
     JOIN "public"."vw_client_view" "c" ON (("c"."clt_id" = "r"."rbt_clt_id")))
     JOIN "public"."vw_exercice_view" "e" ON ((("e"."exer_id" = "r"."rbt_exer_id") AND ("e"."clt_id" = "r"."rbt_clt_id"))));


ALTER VIEW "public"."vw_remboursement_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_sales_view" WITH ("security_invoker"='true') AS
 SELECT "sa"."sal_id",
    "sa"."clt_id",
    "c"."clt_nom",
    "sa"."soc_id",
    "s"."soc_nom",
    "sa"."exer_id",
    "e"."exer_code",
    "sa"."oper_id",
    "o"."oper_nom",
    "o"."oper_prenom",
    "sa"."sal_invoice_date",
    "sa"."sal_due_date",
    "sa"."sal_payment_date",
    "sa"."sal_bank_value_date",
    "sa"."sal_reference",
    "sa"."sal_designation",
    "sa"."sal_amount_ht",
    "sa"."sal_amount_tax",
    "sa"."sal_amount_ttc",
    "sa"."opb_operation_id",
    "sa"."sal_comments",
    "sa"."sal_deal_number",
    "sa"."sal_deal_name",
    "sa"."sal_revenue_type_id",
    "sa"."sal_payment_delay_days",
    "sa"."created_at",
    "sa"."updated_at",
    "sa"."sal_lmod"
   FROM (((("public"."sales" "sa"
     LEFT JOIN "public"."client" "c" ON (("c"."clt_id" = "sa"."clt_id")))
     LEFT JOIN "public"."societe" "s" ON (("s"."soc_id" = "sa"."soc_id")))
     LEFT JOIN "public"."exercice" "e" ON (("e"."exer_id" = "sa"."exer_id")))
     LEFT JOIN "public"."operateur" "o" ON (("o"."oper_id" = "sa"."oper_id")));


ALTER VIEW "public"."vw_sales_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_societe_view" WITH ("security_invoker"='true') AS
 SELECT "s"."soc_id",
    "s"."clt_id",
    "s"."soc_nom",
    "s"."soc_code",
    "s"."soc_adresse",
    "s"."soc_code_postal",
    "s"."soc_ville",
    "s"."soc_pays",
    "s"."soc_telephone",
    "s"."soc_siren",
    "s"."soc_client",
    "s"."soc_fournisseur",
    "c"."clt_nom",
    "s"."lmod"
   FROM ("public"."societe" "s"
     JOIN "public"."client" "c" ON (("c"."clt_id" = "s"."clt_id")));


ALTER VIEW "public"."vw_societe_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_tro_compte_view" WITH ("security_invoker"='true') AS
 SELECT "tro_cpt_id",
    "tro_clt_id",
    "tro_soc_id",
    "tro_cpt_nom",
    "tro_cpt_ordre",
    "tro_cpt_inclus_global",
    "tro_cpt_actif",
    "tro_lmod"
   FROM "public"."tro_compte";


ALTER VIEW "public"."vw_tro_compte_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_tro_mensuel_view" WITH ("security_invoker"='true') AS
 SELECT "tro_mens_id",
    "tro_clt_id",
    "tro_exer_id",
    "tro_cpt_id",
    "tro_mois",
    "tro_credits",
    "tro_debits",
    "tro_init",
    "tro_solde_init",
    "tro_commentaire",
    "tro_lmod"
   FROM "public"."tro_mensuel";


ALTER VIEW "public"."vw_tro_mensuel_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_tro_soldes_mensuels_view" WITH ("security_invoker"='true') AS
 WITH "init" AS (
         SELECT "tro_mensuel"."tro_clt_id",
            "tro_mensuel"."tro_exer_id",
            "tro_mensuel"."tro_cpt_id",
            "max"("tro_mensuel"."tro_solde_init") AS "solde_init"
           FROM "public"."tro_mensuel"
          WHERE ("tro_mensuel"."tro_init" = true)
          GROUP BY "tro_mensuel"."tro_clt_id", "tro_mensuel"."tro_exer_id", "tro_mensuel"."tro_cpt_id"
        ), "m" AS (
         SELECT "tro_mensuel"."tro_clt_id",
            "tro_mensuel"."tro_exer_id",
            "tro_mensuel"."tro_cpt_id",
            "tro_mensuel"."tro_mois",
            "tro_mensuel"."tro_credits",
            "tro_mensuel"."tro_debits",
            ("tro_mensuel"."tro_credits" - "tro_mensuel"."tro_debits") AS "delta"
           FROM "public"."tro_mensuel"
          WHERE ("tro_mensuel"."tro_init" = false)
        )
 SELECT "m"."tro_clt_id",
    "m"."tro_exer_id",
    "m"."tro_cpt_id",
    "m"."tro_mois",
    "m"."tro_credits",
    "m"."tro_debits",
    (COALESCE("i"."solde_init", (0)::numeric) + "sum"("m"."delta") OVER (PARTITION BY "m"."tro_clt_id", "m"."tro_exer_id", "m"."tro_cpt_id" ORDER BY "m"."tro_mois" ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)) AS "tro_solde"
   FROM ("m"
     LEFT JOIN "init" "i" ON ((("i"."tro_clt_id" = "m"."tro_clt_id") AND ("i"."tro_exer_id" = "m"."tro_exer_id") AND ("i"."tro_cpt_id" = "m"."tro_cpt_id"))));


ALTER VIEW "public"."vw_tro_soldes_mensuels_view" OWNER TO "postgres";


ALTER TABLE ONLY "public"."budget"
    ADD CONSTRAINT "budget_pkey" PRIMARY KEY ("bud_id");



ALTER TABLE ONLY "public"."centre_cout"
    ADD CONSTRAINT "centre_cout_clt_id_cc_code_key" UNIQUE ("clt_id", "cc_code");



ALTER TABLE ONLY "public"."centre_cout"
    ADD CONSTRAINT "centre_cout_pkey" PRIMARY KEY ("cc_id");



ALTER TABLE ONLY "public"."client"
    ADD CONSTRAINT "client_clt_code_key" UNIQUE ("clt_code");



ALTER TABLE ONLY "public"."client"
    ADD CONSTRAINT "client_pkey" PRIMARY KEY ("clt_id");



ALTER TABLE ONLY "public"."exercice"
    ADD CONSTRAINT "exercice_pkey" PRIMARY KEY ("exer_id");



ALTER TABLE ONLY "public"."fisc"
    ADD CONSTRAINT "fisc_pkey" PRIMARY KEY ("fisc_id");



ALTER TABLE ONLY "public"."operateur_client"
    ADD CONSTRAINT "operateur_client_oper_id_clt_id_key" UNIQUE ("oper_id", "clt_id");



ALTER TABLE ONLY "public"."operateur_client"
    ADD CONSTRAINT "operateur_client_pkey" PRIMARY KEY ("opcl_id");



ALTER TABLE ONLY "public"."operateur"
    ADD CONSTRAINT "operateur_email_unique" UNIQUE ("oper_email");



ALTER TABLE ONLY "public"."operateur"
    ADD CONSTRAINT "operateur_oper_email_key" UNIQUE ("oper_email");



ALTER TABLE ONLY "public"."operateur"
    ADD CONSTRAINT "operateur_pkey" PRIMARY KEY ("oper_id");



ALTER TABLE ONLY "public"."purchase"
    ADD CONSTRAINT "purchase_pkey" PRIMARY KEY ("pur_id");



ALTER TABLE ONLY "public"."remboursement"
    ADD CONSTRAINT "remboursement_pkey" PRIMARY KEY ("rbt_id");



ALTER TABLE ONLY "public"."sales"
    ADD CONSTRAINT "sales_pkey" PRIMARY KEY ("sal_id");



ALTER TABLE ONLY "public"."societe"
    ADD CONSTRAINT "societe_pkey" PRIMARY KEY ("soc_id");



ALTER TABLE ONLY "public"."tro_compte"
    ADD CONSTRAINT "tro_compte_pkey" PRIMARY KEY ("tro_cpt_id");



ALTER TABLE ONLY "public"."tro_mensuel"
    ADD CONSTRAINT "tro_mensuel_pkey" PRIMARY KEY ("tro_mens_id");



ALTER TABLE ONLY "public"."operateur_client"
    ADD CONSTRAINT "uq_operateur_client" UNIQUE ("oper_id", "clt_id");



CREATE INDEX "budget_idx_clt_exer" ON "public"."budget" USING "btree" ("clt_id", "exer_id");



CREATE UNIQUE INDEX "budget_uniq_purchase" ON "public"."budget" USING "btree" ("clt_id", "exer_id", "bud_kind", "cc_id") WHERE ("bud_kind" = 'PURCHASE'::"text");



CREATE UNIQUE INDEX "budget_uniq_sales" ON "public"."budget" USING "btree" ("clt_id", "exer_id", "bud_kind", "revenue_type_id") WHERE ("bud_kind" = 'SALES'::"text");



CREATE INDEX "idx_client_actif" ON "public"."client" USING "btree" ("clt_actif");



CREATE INDEX "idx_client_nom" ON "public"."client" USING "btree" ("clt_nom");



CREATE INDEX "idx_operateur_admin" ON "public"."operateur" USING "btree" ("oper_admin_sys");



CREATE INDEX "idx_operateur_client_clt" ON "public"."operateur_client" USING "btree" ("clt_id");



CREATE INDEX "idx_operateur_client_oper" ON "public"."operateur_client" USING "btree" ("oper_id", "clt_id");



CREATE INDEX "idx_purchase_cc_id" ON "public"."purchase" USING "btree" ("cc_id");



CREATE INDEX "idx_purchase_clt_id" ON "public"."purchase" USING "btree" ("clt_id");



CREATE INDEX "idx_purchase_due_date" ON "public"."purchase" USING "btree" ("pur_due_date");



CREATE INDEX "idx_purchase_exer_id" ON "public"."purchase" USING "btree" ("exer_id");



CREATE INDEX "idx_purchase_invoice_date" ON "public"."purchase" USING "btree" ("pur_invoice_date");



CREATE INDEX "idx_purchase_oper_id" ON "public"."purchase" USING "btree" ("oper_id");



CREATE INDEX "idx_purchase_reference" ON "public"."purchase" USING "btree" ("pur_reference");



CREATE INDEX "idx_purchase_soc_id" ON "public"."purchase" USING "btree" ("soc_id");



CREATE INDEX "idx_rbt_clt_exer_date" ON "public"."remboursement" USING "btree" ("rbt_clt_id", "rbt_exer_id", "rbt_date" DESC);



CREATE INDEX "idx_sales_clt_id" ON "public"."sales" USING "btree" ("clt_id");



CREATE INDEX "idx_sales_due_date" ON "public"."sales" USING "btree" ("sal_due_date");



CREATE INDEX "idx_sales_exer_id" ON "public"."sales" USING "btree" ("exer_id");



CREATE INDEX "idx_sales_invoice_date" ON "public"."sales" USING "btree" ("sal_invoice_date");



CREATE INDEX "idx_sales_oper_id" ON "public"."sales" USING "btree" ("oper_id");



CREATE INDEX "idx_sales_reference" ON "public"."sales" USING "btree" ("sal_reference");



CREATE INDEX "idx_sales_revenue_type_id" ON "public"."sales" USING "btree" ("sal_revenue_type_id");



CREATE INDEX "idx_sales_soc_id" ON "public"."sales" USING "btree" ("soc_id");



CREATE INDEX "idx_tro_compte_clt" ON "public"."tro_compte" USING "btree" ("tro_clt_id");



CREATE INDEX "idx_tro_mensuel_clt_exer" ON "public"."tro_mensuel" USING "btree" ("tro_clt_id", "tro_exer_id");



CREATE INDEX "idx_tro_mensuel_cpt_mois" ON "public"."tro_mensuel" USING "btree" ("tro_cpt_id", "tro_mois");



CREATE UNIQUE INDEX "uq_client_code" ON "public"."client" USING "btree" ("clt_code");



CREATE UNIQUE INDEX "uq_tro_compte_nom_clt" ON "public"."tro_compte" USING "btree" ("tro_clt_id", "tro_cpt_nom");



CREATE UNIQUE INDEX "uq_tro_mensuel_init" ON "public"."tro_mensuel" USING "btree" ("tro_clt_id", "tro_exer_id", "tro_cpt_id") WHERE ("tro_init" = true);



CREATE UNIQUE INDEX "uq_tro_mensuel_mois" ON "public"."tro_mensuel" USING "btree" ("tro_clt_id", "tro_exer_id", "tro_cpt_id", "tro_mois") WHERE ("tro_init" = false);



CREATE OR REPLACE TRIGGER "trg_budget_updated_at" BEFORE UPDATE ON "public"."budget" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_purchase_timestamps" BEFORE UPDATE ON "public"."purchase" FOR EACH ROW EXECUTE FUNCTION "public"."trg_set_purchase_timestamps"();



CREATE OR REPLACE TRIGGER "trg_remboursement_lmod" BEFORE UPDATE ON "public"."remboursement" FOR EACH ROW EXECUTE FUNCTION "public"."set_lmod"();



CREATE OR REPLACE TRIGGER "trg_sales_timestamps" BEFORE UPDATE ON "public"."sales" FOR EACH ROW EXECUTE FUNCTION "public"."trg_set_sales_timestamps"();



ALTER TABLE ONLY "public"."exercice"
    ADD CONSTRAINT "exercice_clt_id_fkey" FOREIGN KEY ("clt_id") REFERENCES "public"."client"("clt_id");



ALTER TABLE ONLY "public"."operateur_client"
    ADD CONSTRAINT "operateur_client_oper_id_fkey" FOREIGN KEY ("oper_id") REFERENCES "public"."operateur"("oper_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."operateur"
    ADD CONSTRAINT "operateur_oper_id_fkey" FOREIGN KEY ("oper_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."purchase"
    ADD CONSTRAINT "purchase_cc_fk" FOREIGN KEY ("cc_id") REFERENCES "public"."centre_cout"("cc_id");



ALTER TABLE ONLY "public"."purchase"
    ADD CONSTRAINT "purchase_clt_fk" FOREIGN KEY ("clt_id") REFERENCES "public"."client"("clt_id");



ALTER TABLE ONLY "public"."purchase"
    ADD CONSTRAINT "purchase_exer_fk" FOREIGN KEY ("exer_id") REFERENCES "public"."exercice"("exer_id");



ALTER TABLE ONLY "public"."purchase"
    ADD CONSTRAINT "purchase_oper_fk" FOREIGN KEY ("oper_id") REFERENCES "public"."operateur"("oper_id");



ALTER TABLE ONLY "public"."purchase"
    ADD CONSTRAINT "purchase_soc_fk" FOREIGN KEY ("soc_id") REFERENCES "public"."societe"("soc_id");



ALTER TABLE ONLY "public"."sales"
    ADD CONSTRAINT "sales_clt_fk" FOREIGN KEY ("clt_id") REFERENCES "public"."client"("clt_id");



ALTER TABLE ONLY "public"."sales"
    ADD CONSTRAINT "sales_exer_fk" FOREIGN KEY ("exer_id") REFERENCES "public"."exercice"("exer_id");



ALTER TABLE ONLY "public"."sales"
    ADD CONSTRAINT "sales_oper_fk" FOREIGN KEY ("oper_id") REFERENCES "public"."operateur"("oper_id");



ALTER TABLE ONLY "public"."sales"
    ADD CONSTRAINT "sales_soc_fk" FOREIGN KEY ("soc_id") REFERENCES "public"."societe"("soc_id");



ALTER TABLE ONLY "public"."tro_mensuel"
    ADD CONSTRAINT "tro_mensuel_tro_cpt_id_fkey" FOREIGN KEY ("tro_cpt_id") REFERENCES "public"."tro_compte"("tro_cpt_id") ON DELETE CASCADE;



ALTER TABLE "public"."budget" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "budget_delete_by_client" ON "public"."budget" FOR DELETE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "budget"."clt_id"))))));



CREATE POLICY "budget_insert_by_client" ON "public"."budget" FOR INSERT TO "authenticated" WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "budget"."clt_id"))))));



CREATE POLICY "budget_select_by_client" ON "public"."budget" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "budget"."clt_id"))))));



CREATE POLICY "budget_update_by_client" ON "public"."budget" FOR UPDATE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "budget"."clt_id")))))) WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "budget"."clt_id"))))));



ALTER TABLE "public"."centre_cout" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "centre_cout_delete_by_client" ON "public"."centre_cout" FOR DELETE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "centre_cout"."clt_id"))))));



CREATE POLICY "centre_cout_insert_by_client" ON "public"."centre_cout" FOR INSERT TO "authenticated" WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "centre_cout"."clt_id"))))));



CREATE POLICY "centre_cout_select_by_client" ON "public"."centre_cout" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "centre_cout"."clt_id"))))));



CREATE POLICY "centre_cout_update_by_client" ON "public"."centre_cout" FOR UPDATE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "centre_cout"."clt_id")))))) WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "centre_cout"."clt_id"))))));



ALTER TABLE "public"."client" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "client_delete_admin" ON "public"."client" FOR DELETE TO "authenticated" USING ("public"."is_adminsys"());



CREATE POLICY "client_insert_admin" ON "public"."client" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_adminsys"());



CREATE POLICY "client_select_linked_or_admin" ON "public"."client" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "client"."clt_id"))))));



CREATE POLICY "client_update_admin" ON "public"."client" FOR UPDATE TO "authenticated" USING ("public"."is_adminsys"()) WITH CHECK ("public"."is_adminsys"());



ALTER TABLE "public"."exercice" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "exercice_delete_by_client" ON "public"."exercice" FOR DELETE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "exercice"."clt_id"))))));



CREATE POLICY "exercice_insert_by_client" ON "public"."exercice" FOR INSERT TO "authenticated" WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "exercice"."clt_id"))))));



CREATE POLICY "exercice_select_by_client" ON "public"."exercice" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "exercice"."clt_id"))))));



CREATE POLICY "exercice_update_by_client" ON "public"."exercice" FOR UPDATE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "exercice"."clt_id")))))) WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "exercice"."clt_id"))))));



ALTER TABLE "public"."fisc" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "fisc_delete_by_client" ON "public"."fisc" FOR DELETE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "fisc"."fisc_clt_id"))))));



CREATE POLICY "fisc_insert_by_client" ON "public"."fisc" FOR INSERT TO "authenticated" WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "fisc"."fisc_clt_id"))))));



CREATE POLICY "fisc_select_by_client" ON "public"."fisc" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "fisc"."fisc_clt_id"))))));



CREATE POLICY "fisc_update_by_client" ON "public"."fisc" FOR UPDATE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "fisc"."fisc_clt_id")))))) WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "fisc"."fisc_clt_id"))))));



ALTER TABLE "public"."operateur" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."operateur_client" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "operateur_client_delete_admin" ON "public"."operateur_client" FOR DELETE TO "authenticated" USING ("public"."is_adminsys"());



CREATE POLICY "operateur_client_insert_admin" ON "public"."operateur_client" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_adminsys"());



CREATE POLICY "operateur_client_select_self_or_admin" ON "public"."operateur_client" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR ("oper_id" = "auth"."uid"())));



CREATE POLICY "operateur_client_update_admin" ON "public"."operateur_client" FOR UPDATE TO "authenticated" USING ("public"."is_adminsys"()) WITH CHECK ("public"."is_adminsys"());



CREATE POLICY "operateur_delete_admin" ON "public"."operateur" FOR DELETE TO "authenticated" USING ("public"."is_adminsys"());



CREATE POLICY "operateur_insert_admin" ON "public"."operateur" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_adminsys"());



CREATE POLICY "operateur_select_self_or_admin" ON "public"."operateur" FOR SELECT TO "authenticated" USING ((("oper_id" = "auth"."uid"()) OR "public"."is_adminsys"()));



CREATE POLICY "operateur_update_admin" ON "public"."operateur" FOR UPDATE TO "authenticated" USING ("public"."is_adminsys"()) WITH CHECK ("public"."is_adminsys"());



ALTER TABLE "public"."purchase" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "purchase_delete_by_client" ON "public"."purchase" FOR DELETE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "purchase"."clt_id"))))));



CREATE POLICY "purchase_insert_by_client" ON "public"."purchase" FOR INSERT TO "authenticated" WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "purchase"."clt_id"))))));



CREATE POLICY "purchase_select_by_client" ON "public"."purchase" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "purchase"."clt_id"))))));



CREATE POLICY "purchase_update_by_client" ON "public"."purchase" FOR UPDATE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "purchase"."clt_id")))))) WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "purchase"."clt_id"))))));



ALTER TABLE "public"."remboursement" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "remboursement_delete_by_client" ON "public"."remboursement" FOR DELETE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "remboursement"."rbt_clt_id"))))));



CREATE POLICY "remboursement_insert_by_client" ON "public"."remboursement" FOR INSERT TO "authenticated" WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "remboursement"."rbt_clt_id"))))));



CREATE POLICY "remboursement_select_by_client" ON "public"."remboursement" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "remboursement"."rbt_clt_id"))))));



CREATE POLICY "remboursement_update_by_client" ON "public"."remboursement" FOR UPDATE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "remboursement"."rbt_clt_id")))))) WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "remboursement"."rbt_clt_id"))))));



ALTER TABLE "public"."sales" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "sales_delete_by_client" ON "public"."sales" FOR DELETE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "sales"."clt_id"))))));



CREATE POLICY "sales_insert_by_client" ON "public"."sales" FOR INSERT TO "authenticated" WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "sales"."clt_id"))))));



CREATE POLICY "sales_select_by_client" ON "public"."sales" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "sales"."clt_id"))))));



CREATE POLICY "sales_update_by_client" ON "public"."sales" FOR UPDATE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "sales"."clt_id")))))) WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "sales"."clt_id"))))));



ALTER TABLE "public"."societe" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "societe_delete_by_client" ON "public"."societe" FOR DELETE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "societe"."clt_id"))))));



CREATE POLICY "societe_insert_by_client" ON "public"."societe" FOR INSERT TO "authenticated" WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "societe"."clt_id"))))));



CREATE POLICY "societe_select_by_client" ON "public"."societe" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "societe"."clt_id"))))));



CREATE POLICY "societe_update_by_client" ON "public"."societe" FOR UPDATE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "societe"."clt_id")))))) WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "societe"."clt_id"))))));



ALTER TABLE "public"."tro_compte" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "tro_compte_delete_by_client" ON "public"."tro_compte" FOR DELETE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "tro_compte"."tro_clt_id"))))));



CREATE POLICY "tro_compte_insert_by_client" ON "public"."tro_compte" FOR INSERT TO "authenticated" WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "tro_compte"."tro_clt_id"))))));



CREATE POLICY "tro_compte_select_by_client" ON "public"."tro_compte" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "tro_compte"."tro_clt_id"))))));



CREATE POLICY "tro_compte_update_by_client" ON "public"."tro_compte" FOR UPDATE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "tro_compte"."tro_clt_id")))))) WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "tro_compte"."tro_clt_id"))))));



ALTER TABLE "public"."tro_mensuel" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "tro_mensuel_delete_by_client" ON "public"."tro_mensuel" FOR DELETE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "tro_mensuel"."tro_clt_id"))))));



CREATE POLICY "tro_mensuel_insert_by_client" ON "public"."tro_mensuel" FOR INSERT TO "authenticated" WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "tro_mensuel"."tro_clt_id"))))));



CREATE POLICY "tro_mensuel_select_by_client" ON "public"."tro_mensuel" FOR SELECT TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "tro_mensuel"."tro_clt_id"))))));



CREATE POLICY "tro_mensuel_update_by_client" ON "public"."tro_mensuel" FOR UPDATE TO "authenticated" USING (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "tro_mensuel"."tro_clt_id")))))) WITH CHECK (("public"."is_adminsys"() OR (EXISTS ( SELECT 1
   FROM "public"."operateur_client" "oc"
  WHERE (("oc"."oper_id" = "auth"."uid"()) AND ("oc"."clt_id" = "tro_mensuel"."tro_clt_id"))))));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT ALL ON SCHEMA "public" TO PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."debug_whoami"() TO "anon";
GRANT ALL ON FUNCTION "public"."debug_whoami"() TO "authenticated";


















GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."budget" TO "authenticated";
GRANT ALL ON TABLE "public"."budget" TO "service_role";



GRANT ALL ON TABLE "public"."centre_cout" TO "service_role";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."centre_cout" TO "authenticated";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."client" TO "authenticated";
GRANT ALL ON TABLE "public"."client" TO "service_role";



GRANT ALL ON TABLE "public"."exercice" TO "service_role";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."exercice" TO "authenticated";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."fisc" TO "service_role";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."fisc" TO "authenticated";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."operateur" TO "authenticated";
GRANT ALL ON TABLE "public"."operateur" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."operateur_client" TO "authenticated";
GRANT ALL ON TABLE "public"."operateur_client" TO "service_role";



GRANT SELECT ON TABLE "public"."purchase" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."purchase" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."remboursement" TO "service_role";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."remboursement" TO "authenticated";



GRANT SELECT ON TABLE "public"."sales" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."sales" TO "service_role";



GRANT ALL ON TABLE "public"."societe" TO "service_role";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."societe" TO "authenticated";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."tro_compte" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."tro_compte" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."tro_mensuel" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."tro_mensuel" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_budget_view" TO "authenticated";
GRANT SELECT ON TABLE "public"."vw_budget_view" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_budget_purchase_lines" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."vw_budget_purchase_lines" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_budget_sales_lines" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."vw_budget_sales_lines" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_centre_cout_view" TO "authenticated";
GRANT SELECT ON TABLE "public"."vw_centre_cout_view" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_client_view" TO "authenticated";
GRANT SELECT ON TABLE "public"."vw_client_view" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_exercice_view" TO "authenticated";
GRANT SELECT ON TABLE "public"."vw_exercice_view" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_fisc_view" TO "service_role";
GRANT SELECT ON TABLE "public"."vw_fisc_view" TO "authenticated";



GRANT SELECT ON TABLE "public"."vw_operateur_client_view" TO "authenticated";
GRANT SELECT ON TABLE "public"."vw_operateur_client_view" TO "service_role";
GRANT SELECT ON TABLE "public"."vw_operateur_client_view" TO "anon";



GRANT SELECT ON TABLE "public"."vw_operateur_view" TO "authenticated";
GRANT SELECT ON TABLE "public"."vw_operateur_view" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_purchase_view" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."vw_purchase_view" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_remboursement_total_by_exercice" TO "service_role";
GRANT SELECT ON TABLE "public"."vw_remboursement_total_by_exercice" TO "authenticated";



GRANT SELECT ON TABLE "public"."vw_remboursement_view" TO "service_role";
GRANT SELECT ON TABLE "public"."vw_remboursement_view" TO "authenticated";



GRANT SELECT ON TABLE "public"."vw_sales_view" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."vw_sales_view" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_societe_view" TO "authenticated";
GRANT SELECT ON TABLE "public"."vw_societe_view" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_tro_compte_view" TO "authenticated";
GRANT SELECT ON TABLE "public"."vw_tro_compte_view" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_tro_mensuel_view" TO "authenticated";
GRANT SELECT ON TABLE "public"."vw_tro_mensuel_view" TO "service_role";



GRANT SELECT ON TABLE "public"."vw_tro_soldes_mensuels_view" TO "authenticated";
GRANT SELECT ON TABLE "public"."vw_tro_soldes_mensuels_view" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT SELECT,USAGE ON SEQUENCES TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT SELECT ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES TO "service_role";




























drop extension if exists "pg_net";

revoke delete on table "public"."budget" from "anon";

revoke insert on table "public"."budget" from "anon";

revoke references on table "public"."budget" from "anon";

revoke select on table "public"."budget" from "anon";

revoke trigger on table "public"."budget" from "anon";

revoke truncate on table "public"."budget" from "anon";

revoke update on table "public"."budget" from "anon";

revoke references on table "public"."budget" from "authenticated";

revoke trigger on table "public"."budget" from "authenticated";

revoke truncate on table "public"."budget" from "authenticated";

revoke delete on table "public"."centre_cout" from "anon";

revoke insert on table "public"."centre_cout" from "anon";

revoke references on table "public"."centre_cout" from "anon";

revoke select on table "public"."centre_cout" from "anon";

revoke trigger on table "public"."centre_cout" from "anon";

revoke truncate on table "public"."centre_cout" from "anon";

revoke update on table "public"."centre_cout" from "anon";

revoke references on table "public"."centre_cout" from "authenticated";

revoke trigger on table "public"."centre_cout" from "authenticated";

revoke truncate on table "public"."centre_cout" from "authenticated";

revoke delete on table "public"."client" from "anon";

revoke insert on table "public"."client" from "anon";

revoke references on table "public"."client" from "anon";

revoke select on table "public"."client" from "anon";

revoke trigger on table "public"."client" from "anon";

revoke truncate on table "public"."client" from "anon";

revoke update on table "public"."client" from "anon";

revoke references on table "public"."client" from "authenticated";

revoke trigger on table "public"."client" from "authenticated";

revoke truncate on table "public"."client" from "authenticated";

revoke delete on table "public"."exercice" from "anon";

revoke insert on table "public"."exercice" from "anon";

revoke references on table "public"."exercice" from "anon";

revoke select on table "public"."exercice" from "anon";

revoke trigger on table "public"."exercice" from "anon";

revoke truncate on table "public"."exercice" from "anon";

revoke update on table "public"."exercice" from "anon";

revoke references on table "public"."exercice" from "authenticated";

revoke trigger on table "public"."exercice" from "authenticated";

revoke truncate on table "public"."exercice" from "authenticated";

revoke delete on table "public"."fisc" from "anon";

revoke insert on table "public"."fisc" from "anon";

revoke references on table "public"."fisc" from "anon";

revoke select on table "public"."fisc" from "anon";

revoke trigger on table "public"."fisc" from "anon";

revoke truncate on table "public"."fisc" from "anon";

revoke update on table "public"."fisc" from "anon";

revoke references on table "public"."fisc" from "authenticated";

revoke trigger on table "public"."fisc" from "authenticated";

revoke truncate on table "public"."fisc" from "authenticated";

revoke references on table "public"."fisc" from "service_role";

revoke trigger on table "public"."fisc" from "service_role";

revoke truncate on table "public"."fisc" from "service_role";

revoke delete on table "public"."operateur" from "anon";

revoke insert on table "public"."operateur" from "anon";

revoke references on table "public"."operateur" from "anon";

revoke select on table "public"."operateur" from "anon";

revoke trigger on table "public"."operateur" from "anon";

revoke truncate on table "public"."operateur" from "anon";

revoke update on table "public"."operateur" from "anon";

revoke references on table "public"."operateur" from "authenticated";

revoke trigger on table "public"."operateur" from "authenticated";

revoke truncate on table "public"."operateur" from "authenticated";

revoke delete on table "public"."operateur_client" from "anon";

revoke insert on table "public"."operateur_client" from "anon";

revoke references on table "public"."operateur_client" from "anon";

revoke select on table "public"."operateur_client" from "anon";

revoke trigger on table "public"."operateur_client" from "anon";

revoke truncate on table "public"."operateur_client" from "anon";

revoke update on table "public"."operateur_client" from "anon";

revoke references on table "public"."operateur_client" from "authenticated";

revoke trigger on table "public"."operateur_client" from "authenticated";

revoke truncate on table "public"."operateur_client" from "authenticated";

revoke delete on table "public"."purchase" from "anon";

revoke insert on table "public"."purchase" from "anon";

revoke references on table "public"."purchase" from "anon";

revoke select on table "public"."purchase" from "anon";

revoke trigger on table "public"."purchase" from "anon";

revoke truncate on table "public"."purchase" from "anon";

revoke update on table "public"."purchase" from "anon";

revoke delete on table "public"."purchase" from "authenticated";

revoke insert on table "public"."purchase" from "authenticated";

revoke references on table "public"."purchase" from "authenticated";

revoke trigger on table "public"."purchase" from "authenticated";

revoke truncate on table "public"."purchase" from "authenticated";

revoke update on table "public"."purchase" from "authenticated";

revoke references on table "public"."purchase" from "service_role";

revoke trigger on table "public"."purchase" from "service_role";

revoke truncate on table "public"."purchase" from "service_role";

revoke delete on table "public"."remboursement" from "anon";

revoke insert on table "public"."remboursement" from "anon";

revoke references on table "public"."remboursement" from "anon";

revoke select on table "public"."remboursement" from "anon";

revoke trigger on table "public"."remboursement" from "anon";

revoke truncate on table "public"."remboursement" from "anon";

revoke update on table "public"."remboursement" from "anon";

revoke references on table "public"."remboursement" from "authenticated";

revoke trigger on table "public"."remboursement" from "authenticated";

revoke truncate on table "public"."remboursement" from "authenticated";

revoke references on table "public"."remboursement" from "service_role";

revoke trigger on table "public"."remboursement" from "service_role";

revoke truncate on table "public"."remboursement" from "service_role";

revoke delete on table "public"."sales" from "anon";

revoke insert on table "public"."sales" from "anon";

revoke references on table "public"."sales" from "anon";

revoke select on table "public"."sales" from "anon";

revoke trigger on table "public"."sales" from "anon";

revoke truncate on table "public"."sales" from "anon";

revoke update on table "public"."sales" from "anon";

revoke delete on table "public"."sales" from "authenticated";

revoke insert on table "public"."sales" from "authenticated";

revoke references on table "public"."sales" from "authenticated";

revoke trigger on table "public"."sales" from "authenticated";

revoke truncate on table "public"."sales" from "authenticated";

revoke update on table "public"."sales" from "authenticated";

revoke references on table "public"."sales" from "service_role";

revoke trigger on table "public"."sales" from "service_role";

revoke truncate on table "public"."sales" from "service_role";

revoke delete on table "public"."societe" from "anon";

revoke insert on table "public"."societe" from "anon";

revoke references on table "public"."societe" from "anon";

revoke select on table "public"."societe" from "anon";

revoke trigger on table "public"."societe" from "anon";

revoke truncate on table "public"."societe" from "anon";

revoke update on table "public"."societe" from "anon";

revoke references on table "public"."societe" from "authenticated";

revoke trigger on table "public"."societe" from "authenticated";

revoke truncate on table "public"."societe" from "authenticated";

revoke delete on table "public"."tro_compte" from "anon";

revoke insert on table "public"."tro_compte" from "anon";

revoke references on table "public"."tro_compte" from "anon";

revoke select on table "public"."tro_compte" from "anon";

revoke trigger on table "public"."tro_compte" from "anon";

revoke truncate on table "public"."tro_compte" from "anon";

revoke update on table "public"."tro_compte" from "anon";

revoke references on table "public"."tro_compte" from "authenticated";

revoke trigger on table "public"."tro_compte" from "authenticated";

revoke truncate on table "public"."tro_compte" from "authenticated";

revoke references on table "public"."tro_compte" from "service_role";

revoke trigger on table "public"."tro_compte" from "service_role";

revoke truncate on table "public"."tro_compte" from "service_role";

revoke delete on table "public"."tro_mensuel" from "anon";

revoke insert on table "public"."tro_mensuel" from "anon";

revoke references on table "public"."tro_mensuel" from "anon";

revoke select on table "public"."tro_mensuel" from "anon";

revoke trigger on table "public"."tro_mensuel" from "anon";

revoke truncate on table "public"."tro_mensuel" from "anon";

revoke update on table "public"."tro_mensuel" from "anon";

revoke references on table "public"."tro_mensuel" from "authenticated";

revoke trigger on table "public"."tro_mensuel" from "authenticated";

revoke truncate on table "public"."tro_mensuel" from "authenticated";

revoke references on table "public"."tro_mensuel" from "service_role";

revoke trigger on table "public"."tro_mensuel" from "service_role";

revoke truncate on table "public"."tro_mensuel" from "service_role";


