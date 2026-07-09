/*
# Seed Additional Products - Simplified Batch 1
Adds 20 more products with enhanced fields
*/

-- Update existing products with enhanced data
UPDATE products SET 
  brand = 'INO-VAP ZONE',
  connection_type = CASE 
    WHEN categories.slug IN ('tri-clamp') THEN 'Tri-Clamp'
    WHEN categories.slug = 'sms' THEN 'SMS'
    WHEN categories.slug = 'din' THEN 'DIN'
    WHEN categories.slug = 'bsp-threaded-fittings' THEN 'BSP Threaded'
    WHEN categories.slug = 'stainless-steel-valves' THEN 'Tri-Clamp'
    WHEN categories.slug = 'stainless-steel-flanges' THEN 'Flanged'
    ELSE 'General'
  END,
  standard = CASE
    WHEN categories.slug = 'tri-clamp' THEN 'ISO 2852'
    WHEN categories.slug = 'sms' THEN 'SMS 1145'
    WHEN categories.slug = 'din' THEN 'DIN 11851'
    WHEN categories.slug = 'bsp-threaded-fittings' THEN 'BS 21'
    WHEN categories.slug = 'stainless-steel-flanges' THEN 'ANSI B16.5'
    ELSE 'AISI'
  END,
  applications = CASE
    WHEN categories.slug IN ('tri-clamp', 'sms', 'din') THEN ARRAY['Food Processing', 'Dairy', 'Pharmaceutical', 'Beverage']
    WHEN categories.slug IN ('stainless-steel-valves') THEN ARRAY['Food Processing', 'Pharmaceutical', 'Chemical']
    WHEN categories.slug = 'bsp-threaded-fittings' THEN ARRAY['Industrial', 'Water Treatment', 'Chemical']
    WHEN categories.slug = 'stainless-steel-flanges' THEN ARRAY['Oil & Gas', 'Chemical', 'Industrial']
    WHEN categories.slug = 'pipe-fittings' THEN ARRAY['Industrial', 'Chemical', 'Oil & Gas']
    WHEN categories.slug = 'steam-equipment' THEN ARRAY['Steam Systems', 'Process Heating', 'Industrial']
    WHEN categories.slug = 'pressure-gauges' THEN ARRAY['Industrial Instruments', 'Process Control', 'Steam Systems']
    WHEN categories.slug = 'industrial-instruments' THEN ARRAY['Process Control', 'Industrial Instruments']
    ELSE ARRAY['Industrial']
  END,
  surface_finish = CASE
    WHEN material = '316' THEN 'Ra 0.5'
    WHEN material = '304' THEN 'Ra 0.8'
    ELSE 'Ra 1.6'
  END
FROM categories WHERE products.category_id = categories.id;

-- Add Tri Clamp products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Tri Clamp Reducer', 'tri-clamp-reducer', 'TC-RED-01', 'TCR-1', (SELECT id FROM categories WHERE slug = 'tri-clamp'), 
'Concentric tri-clamp reducer for connecting pipes of different diameters in sanitary systems.',
'{"Standard": "ISO 2852", "Finish": "Ra 0.8", "Type": "Concentric"}',
'304', ARRAY['2x1.5', '3x2', '4x3', '6x4'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', false, ARRAY['Food Processing', 'Dairy', 'Beverage']),
('Tri Clamp Tee Equal', 'tri-clamp-tee-equal', 'TC-TEE-01', 'TCT-1', (SELECT id FROM categories WHERE slug = 'tri-clamp'),
'Equal tri-clamp tee for splitting or combining flow in sanitary piping systems.',
'{"Standard": "ISO 2852", "Finish": "Ra 0.5", "Type": "Equal Tee"}',
'316', ARRAY['1', '1.5', '2', '2.5', '3', '4'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', true, ARRAY['Pharmaceutical', 'Biotechnology', 'Food Processing']),
('Tri Clamp Cross', 'tri-clamp-cross', 'TC-CRS-01', 'TCC-1', (SELECT id FROM categories WHERE slug = 'tri-clamp'),
'Tri-clamp cross fitting for four-way flow distribution in sanitary systems.',
'{"Standard": "ISO 2852", "Finish": "Ra 0.8"}',
'304', ARRAY['1.5', '2', '2.5', '3'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', false, ARRAY['Dairy', 'Beverage', 'Food Processing']),
('Tri Clamp Clamp Ferrule', 'tri-clamp-clamp-ferrule', 'TC-CLF-01', 'TCLF-1', (SELECT id FROM categories WHERE slug = 'tri-clamp'),
'Heavy-duty clamp ferrule for secure tri-clamp connections.',
'{"Standard": "ISO 2852", "Type": "Heavy Duty", "Pin": "Wing nut"}',
'304', ARRAY['1', '1.5', '2', '3', '4'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', false, ARRAY['Food Processing', 'Dairy']),
('Tri Clamp Gaskets EPDM', 'tri-clamp-gaskets-epdm', 'TC-GSK-01', 'TCG-1', (SELECT id FROM categories WHERE slug = 'tri-clamp'),
'EPDM gaskets for tri-clamp connections, suitable for food and dairy applications.',
'{"Material": "EPDM", "Temperature": "-30 to 140C", "FDA": "Approved"}',
'EPDM', ARRAY['1', '1.5', '2', '2.5', '3', '4'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', false, ARRAY['Food Processing', 'Dairy', 'Beverage'])
ON CONFLICT (sku) DO NOTHING;

-- Add SMS products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('SMS Reducer', 'sms-reducer', 'SMS-RED-01', 'SMSR-1', (SELECT id FROM categories WHERE slug = 'sms'),
'SMS concentric reducer for connecting pipes of different diameters.',
'{"Standard": "SMS 1145", "Type": "Concentric", "Finish": "Ra 0.8"}',
'304', ARRAY['DN40/DN25', 'DN50/DN40', 'DN65/DN50', 'DN80/DN50'], 'INO-VAP ZONE', 'SMS', 'SMS 1145', false, ARRAY['Dairy', 'Food Processing', 'Beverage']),
('SMS Elbow 45', 'sms-elbow-45', 'SMS-EL45-01', 'SMSE45-1', (SELECT id FROM categories WHERE slug = 'sms'),
'SMS 45-degree elbow for gentle direction changes in sanitary piping.',
'{"Standard": "SMS 1145", "Angle": "45 degree", "Radius": "1.5D"}',
'316', ARRAY['DN25', 'DN40', 'DN50', 'DN65', 'DN80'], 'INO-VAP ZONE', 'SMS', 'SMS 1145', false, ARRAY['Pharmaceutical', 'Biotechnology', 'Food Processing']),
('SMS Tee Equal', 'sms-tee-equal', 'SMS-TEE-01', 'SMST-1', (SELECT id FROM categories WHERE slug = 'sms'),
'SMS equal tee for branching in sanitary piping systems.',
'{"Standard": "SMS 1145", "Type": "Equal Tee"}',
'316', ARRAY['DN25', 'DN40', 'DN50', 'DN65', 'DN80'], 'INO-VAP ZONE', 'SMS', 'SMS 1145', true, ARRAY['Pharmaceutical', 'Food Processing']),
('SMS Blind Cap', 'sms-blind-cap', 'SMS-BL-01', 'SMSB-1', (SELECT id FROM categories WHERE slug = 'sms'),
'SMS blind cap for sealing pipe ends in sanitary applications.',
'{"Standard": "SMS 1145", "Type": "Blind Cap"}',
'304', ARRAY['DN25', 'DN40', 'DN50', 'DN65'], 'INO-VAP ZONE', 'SMS', 'SMS 1145', false, ARRAY['Dairy', 'Food Processing'])
ON CONFLICT (sku) DO NOTHING;

-- Add DIN products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('DIN Elbow 45', 'din-elbow-45', 'DIN-EL45-01', 'DINE45-1', (SELECT id FROM categories WHERE slug = 'din'),
'DIN 45-degree elbow for smooth flow direction changes.',
'{"Standard": "DIN 11851", "Angle": "45 degree"}',
'304', ARRAY['DN25', 'DN40', 'DN50', 'DN80', 'DN100'], 'INO-VAP ZONE', 'DIN', 'DIN 11851', false, ARRAY['Pharmaceutical', 'Biotechnology', 'Chemical']),
('DIN Tee Equal', 'din-tee-qual', 'DIN-TEEQ-01', 'DINTQ-1', (SELECT id FROM categories WHERE slug = 'din'),
'DIN equal tee for branching in sanitary piping systems.',
'{"Standard": "DIN 11851", "Type": "Equal Tee"}',
'316', ARRAY['DN25', 'DN40', 'DN50', 'DN80', 'DN100'], 'INO-VAP ZONE', 'DIN', 'DIN 11851', true, ARRAY['Pharmaceutical', 'Food Processing']),
('DIN Reducer Eccentric', 'din-reducer-ecc', 'DIN-RECE-01', 'DINRE-1', (SELECT id FROM categories WHERE slug = 'din'),
'DIN eccentric reducer for horizontal pipe diameter reduction.',
'{"Standard": "DIN 11851", "Type": "Eccentric"}',
'304', ARRAY['DN50/DN40', 'DN80/DN50', 'DN100/DN80'], 'INO-VAP ZONE', 'DIN', 'DIN 11851', false, ARRAY['Chemical', 'Water Treatment'])
ON CONFLICT (sku) DO NOTHING;

-- Add BSP products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('BSP Tee Equal', 'bsp-tee-equal', 'BSP-TEE-01', 'BSPT-1', (SELECT id FROM categories WHERE slug = 'bsp-threaded-fittings'),
'BSP threaded equal tee for general industrial piping.',
'{"Thread": "BSP Tapered", "Type": "Equal Tee"}',
'304', ARRAY['1/4', '1/2', '3/4', '1', '1.5', '2'], 'INO-VAP ZONE', 'BSP Threaded', 'BS 21', false, ARRAY['Water Treatment', 'Chemical', 'Oil & Gas']),
('BSP Cross', 'bsp-cross', 'BSP-CRS-01', 'BSPC-1', (SELECT id FROM categories WHERE slug = 'bsp-threaded-fittings'),
'BSP threaded cross for four-way connections.',
'{"Thread": "BSP Tapered", "Type": "Cross"}',
'316', ARRAY['1/2', '3/4', '1', '1.5'], 'INO-VAP ZONE', 'BSP Threaded', 'BS 21', false, ARRAY['Chemical', 'Oil & Gas', 'Steam Systems']),
('BSP Union', 'bsp-union', 'BSP-UNION-01', 'BSPU-1', (SELECT id FROM categories WHERE slug = 'bsp-threaded-fittings'),
'BSP union for easy disconnect and reconnect of threaded pipes.',
'{"Thread": "BSP Tapered", "Type": "Union"}',
'304', ARRAY['1/2', '3/4', '1', '1.5', '2'], 'INO-VAP ZONE', 'BSP Threaded', 'BS 21', true, ARRAY['Water Treatment', 'Chemical', 'Industrial'])
ON CONFLICT (sku) DO NOTHING;

-- Add Valve products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Check Valve Sanitary', 'check-valve-sanitary', 'VAL-CHK-01', 'VCH-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-valves'),
'Sanitary check valve for preventing backflow.',
'{"Type": "Spring-loaded Check", "Crack Pressure": "0.5 bar"}',
'316', ARRAY['1', '1.5', '2', '2.5', '3'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', true, ARRAY['Food Processing', 'Pharmaceutical', 'Beverage']),
('Diaphragm Valve', 'diaphragm-valve', 'VAL-DIA-01', 'VDI-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-valves'),
'Sanitary diaphragm valve for sterile applications.',
'{"Type": "Weir Diaphragm", "Diaphragm": "EPDM/PTFE"}',
'316L', ARRAY['DN15', 'DN25', 'DN40', 'DN50', 'DN65'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', true, ARRAY['Pharmaceutical', 'Biotechnology', 'Chemical']),
('Needle Valve Precision', 'needle-valve', 'VAL-NED-01', 'VNE-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-valves'),
'Precision needle valve for accurate flow control.',
'{"Type": "Needle Valve", "Stem": "Rising"}',
'316', ARRAY['1/4', '3/8', '1/2'], 'INO-VAP ZONE', 'NPT Threaded', 'ASTM A479', false, ARRAY['Pharmaceutical', 'Chemical']),
('Gate Valve', 'gate-valve', 'VAL-GT-01', 'VGT-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-valves'),
'Stainless steel gate valve for on/off flow control.',
'{"Type": "Rising Stem Gate", "Face": "Flanged"}',
'304', ARRAY['DN50', 'DN80', 'DN100', 'DN150'], 'INO-VAP ZONE', 'Flanged', 'API 600', false, ARRAY['Oil & Gas', 'Water Treatment', 'Industrial'])
ON CONFLICT (sku) DO NOTHING;

-- Add Flange products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Slip-On Flange', 'slip-on-flange', 'FLG-SO-01', 'FSO-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-flanges'),
'Slip-on flange for easy installation over pipe end.',
'{"Standard": "ANSI B16.5", "Face": "Raised Face", "Class": "150"}',
'304', ARRAY['DN25', 'DN50', 'DN80', 'DN100', 'DN150'], 'INO-VAP ZONE', 'Flanged', 'ANSI B16.5', false, ARRAY['Oil & Gas', 'Chemical', 'Water Treatment']),
('Socket Weld Flange', 'socket-weld-flange', 'FLG-SW-01', 'FSW-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-flanges'),
'Socket weld flange for high-pressure applications.',
'{"Standard": "ANSI B16.5", "Face": "Raised Face", "Class": "300"}',
'304', ARRAY['DN15', 'DN25', 'DN40', 'DN50'], 'INO-VAP ZONE', 'Flanged', 'ANSI B16.5', false, ARRAY['Oil & Gas', 'Chemical', 'Steam Systems'])
ON CONFLICT (sku) DO NOTHING;
