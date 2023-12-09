SELECT 
	(SELECT count(1) as total FROM complaints_analysis) AS total, 
    (SELECT count(1) FROM complaints_analysis WHERE complaints_status = 'closed') AS closed,
    (SELECT count(1) FROM complaints_analysis WHERE complaints_status = 'pending') AS pending,
    CEILING((SELECT count(1) FROM complaints_analysis WHERE complainer_nps_dsc = 'PROMOTOR') 
	/(SELECT count(1) FROM complaints_analysis WHERE complainer_nps_dsc = 'DETRATOR') * 10) AS nps
FROM complaints_analysis LIMIT 1;