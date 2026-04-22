alter table public.app_db_release enable row level security;

drop view if exists public.vw_sales_view;

create view public.vw_sales_view
with (security_invoker=on) as
select
    sa.sal_id,
    sa.clt_id,
    c.clt_nom,
    sa.soc_id,
    s.soc_nom,
    sa.exer_id,
    e.exer_code,
    sa.oper_id,
    o.oper_nom,
    o.oper_prenom,
    sa.sal_invoice_date,
    sa.sal_due_date,
    sa.sal_bank_value_date,
    sa.sal_reference,
    sa.sal_designation,
    sa.sal_amount_ht,
    sa.sal_amount_tax,
    sa.sal_amount_ttc,
    sa.opb_operation_id,
    sa.sal_comments,
    sa.sal_deal_number,
    sa.sal_deal_name,
    sa.sal_revenue_type_id,
    sa.sal_payment_delay_days,
    sa.created_at,
    sa.updated_at,
    sa.sal_lmod
from public.sales sa
left join public.client c on c.clt_id = sa.clt_id
left join public.societe s on s.soc_id = sa.soc_id
left join public.exercice e on e.exer_id = sa.exer_id
left join public.operateur o on o.oper_id = sa.oper_id;