SELECT month_desc name, CONVERT(avg(service_time), DECIMAL(4,2)) as 'value' FROM complaints_analysis WHERE  service_time IS NOT NULL GROUP BY month_desc;
