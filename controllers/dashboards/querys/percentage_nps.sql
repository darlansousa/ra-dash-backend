
SELECT lower(complainer_nps_dsc) name, count(*) * 100.0 / sum(count(*)) over() as value FROM complaints_analysis 
WHERE complainer_nps_dsc IN ('DETRATOR','PASSIVO', 'PROMOTOR')
GROUP BY complainer_nps_dsc;