SELECT system_sub_reason name, count(1) value FROM complaints_analysis WHERE  system_sub_reason IS NOT NULL AND system_sub_reason <> ''  GROUP BY system_sub_reason ORDER BY count(1) DESC LIMIT 10 ;
