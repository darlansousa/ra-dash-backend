SELECT
    MONTH(c.open_date) AS 'MÊS',
    YEAR(c.open_date) AS 'ANO',
    c.id_occurrence AS 'OCORRÊNCIA',
    comp.uc AS 'UC',
    '' AS 'PF, PJ, PRESTADOR DE SERVIÇOS',
    comp.is_client AS 'CLIENTE ÓRIGO',
    name AS 'CLIENTE',
    c.title AS 'TÍTULO DA RECLAMAÇÃO',
    c.description AS 'DESCRIÇÃO DA RECLAMAÇÃO',
    '' AS 'MOTIVO DA RECLAMAÇÃO',
    c.system_sub_reason AS 'SUBMOTIVO DYNAMICS',
    '' AS 'RECLAMAÇÃO PRECEDE',
    '' AS 'JA RECLAMOU NOS CANAIS DE ATENDIMENTO?',
    '' AS 'ATENDIMENTO SATISFATÓRIO NA CENTRAL?',
    comp.city AS 'CIDADE',
    '' AS 'ESTADO',
    '' AS 'ID CMS LEGADO',
    c.ra_id AS 'ID RECLAME AQUI',
    'Reclame aqui' AS 'PONTO DE CONTATO',
    'Dor' AS 'VOZ DO CLIENTE',
    'Sim' AS 'RESPONDIDA',
    DATE_FORMAT(c.open_date, "%Y/%m/%d") AS 'DATA DA ABERTURA',
    DATE_FORMAT(c.close_date, "%Y/%m/%d") AS 'DATA DA RESPOSTA',
    '' AS 'DIAGNÓSTICO DO PROBLEMA',
    '' AS 'TRATATIVA',
    '' AS 'QUEM LIGOU',
    '' AS 'FINALIZAÇÃO',
    c.negotiate_again AS 'AVALIADO - VOLTARIA A FAZER NEGÓCIO?',
    c.complainer_note AS 'NOTA',
    '' AS 'CLIENTES PARA ACOMPANHAR',
    '' AS 'RÉPLICAS'
FROM
    complaints c
    INNER JOIN complainers comp ON comp.id = c.complainer_id
WHERE
    c.complaints_status = 'closed'
    AND NOT EXISTS(
        SELECT
            ra_id
        FROM
            complaints_export_process cep
        WHERE cep.ra_id = c.ra_id
    );