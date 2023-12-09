SELECT month_desc name, CONVERT(avg(complainer_note), DECIMAL(4,2)) as 'value' FROM complaints_analysis WHERE  complainer_note IS NOT NULL GROUP BY month_desc;
