SELECT complainer_state name, count(1) value FROM complaints_analysis WHERE  complainer_state IS NOT NULL AND complainer_state <> ''  GROUP BY complainer_state ORDER BY count(1) ASC;
