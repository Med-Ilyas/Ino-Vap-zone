/*
# Seed Additional Products - Batch 4 (Products 81-100)
Final batch to reach approximately 100 products
*/

-- More Steam Equipment
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Steam Desuperheater', 'steam-desuperheater', 'STM-DS-01', 'SDS-1', (SELECT id FROM categories WHERE slug = 'steam-equipment'),
'Steam desuperheater for precise steam temperature control.',
'{"Type": "Atomizing Desuperheater", "Turndown": "10:1"}',
'304', ARRAY['DN25', 'DN50', 'DN80'], 'INO-VAP ZONE', 'Flanged', 'ASME B31.1', false, ARRAY['Steam Systems', 'Power Generation']),
('Steam Injector', 'steam-injector', 'STM-SI-01', 'SSI-1', (SELECT id FROM categories WHERE slug = 'steam-equipment'),
'Live steam injector for direct steam heating of liquids.',
'{"Type": "Steam Injector", "Construction": "SS316", "MaxTemp": "180C"}',
'316', ARRAY['DN15', 'DN25', 'DN40'], 'INO-VAP ZONE', 'Threaded', 'EN 13831', false, ARRAY['Food Processing', 'Dairy'])
ON CONFLICT (sku) DO NOTHING;

-- More Pressure Gauges
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Digital Pressure Gauge', 'digital-pressure-gauge', 'GAG-DIG-01', 'GDG-1', (SELECT id FROM categories WHERE slug = 'pressure-gauges'),
'Digital pressure gauge with battery power and data logging.',
'{"Type": "Digital", "Accuracy": "0.25 percent", "Display": "LCD"}',
'316', ARRAY['0-10', '0-25', '0-100', '0-250'], 'INO-VAP ZONE', 'Threaded', 'EN 837-1', true, ARRAY['Process Control', 'Calibration', 'Laboratory']),
('Sanitary Pressure Gauge', 'sanitary-pressure-gauge', 'GAG-SPG-01', 'GSP-1', (SELECT id FROM categories WHERE slug = 'pressure-gauges'),
'Sanitary pressure gauge with tri-clamp connection for food and pharma.',
'{"Type": "Sanitary", "Accuracy": "1.6 percent", "Cleaning": "CIP/SIP"}',
'316', ARRAY['1', '1.5', '2'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', true, ARRAY['Food Processing', 'Pharmaceutical', 'Biotechnology']),
('Low Pressure Gauge', 'low-pressure-gauge', 'GAG-LP-01', 'GLP-1', (SELECT id FROM categories WHERE slug = 'pressure-gauges'),
'Low pressure gauge for air and gas applications.',
'{"Type": "Capsule", "Accuracy": "2.5 percent", "Range": "0-60 mbar"}',
'304', ARRAY['0-25 mbar', '0-60 mbar', '0-100 mbar'], 'INO-VAP ZONE', 'Threaded', 'EN 837-3', false, ARRAY['HVAC', 'Process Control'])
ON CONFLICT (sku) DO NOTHING;

-- More Industrial Instruments
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Coriolis Flow Meter', 'coriolis-flow-meter', 'INS-CM-01', 'ICM-1', (SELECT id FROM categories WHERE slug = 'industrial-instruments'),
'Coriolis mass flow meter for high-accuracy liquid and gas measurement.',
'{"Type": "Coriolis", "Accuracy": "0.1 percent", "Outputs": "4-20mA, Pulse"}',
'316L', ARRAY['DN15', 'DN25', 'DN40', 'DN50'], 'INO-VAP ZONE', 'Flanged', 'ISO 4064', true, ARRAY['Oil & Gas', 'Pharmaceutical', 'Food Processing']),
('Ultrasonic Level Transmitter', 'ultrasonic-level-transmitter', 'INS-ULT-01', 'IUL-1', (SELECT id FROM categories WHERE slug = 'industrial-instruments'),
'Non-contact ultrasonic level transmitter for tank measurement.',
'{"Type": "Ultrasonic", "Range": "0-10m", "Accuracy": "0.25 percent"}',
'PVDF', ARRAY['Blind', 'Display'], 'INO-VAP ZONE', 'Threaded', 'IEC 60770', false, ARRAY['Water Treatment', 'Chemical', 'Food Processing']),
('Radar Level Gauge', 'radar-level-gauge', 'INS-RLG-01', 'IRL-1', (SELECT id FROM categories WHERE slug = 'industrial-instruments'),
'FMCW radar level gauge for bulk storage tanks.',
'{"Type": "FMCW Radar", "Frequency": "26 GHz", "Range": "0-35m"}',
'316', ARRAY['Flange DN80', 'Flange DN100'], 'INO-VAP ZONE', 'Flanged', 'EN 61326', false, ARRAY['Oil & Gas', 'Chemical', 'Bulk Storage']),
('Capacitance Level Switch', 'capacitance-level-switch', 'INS-CLS-01', 'ICL-1', (SELECT id FROM categories WHERE slug = 'industrial-instruments'),
'Capacitance level switch for point level detection.',
'{"Type": "Capacitive", "Sensitivity": "Adjustable", "Output": "Relay"}',
'316', ARRAY['Rod', 'Cable'], 'INO-VAP ZONE', 'Threaded', 'EN 60947', false, ARRAY['Chemical', 'Food Processing', 'Water Treatment'])
ON CONFLICT (sku) DO NOTHING;

-- More Valves
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Plug Valve', 'plug-valve', 'VAL-PLG-01', 'VPL-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-valves'),
'Lubricated plug valve for on/off service in abrasive applications.',
'{"Type": "Lubricated Plug", "Port": "Full Bore", "Operation": "Lever"}',
'304', ARRAY['DN25', 'DN50', 'DN80', 'DN100'], 'INO-VAP ZONE', 'Flanged', 'API 6D', false, ARRAY['Oil & Gas', 'Mining', 'Chemical']),
('Sample Cock', 'sample-cock', 'VAL-SCK-01', 'VSC-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-valves'),
'Sanitary sample cock for aseptic product sampling.',
'{"Type": "Sample Cock", "Seal": "PTFE", "Valve": "Needle"}',
'316', ARRAY['1/2', '3/4'], 'INO-VAP ZONE', 'Threaded', 'ASME BPE', false, ARRAY['Pharmaceutical', 'Biotechnology', 'Food Processing'])
ON CONFLICT (sku) DO NOTHING;

-- Add Downloads for Technical Documentation
INSERT INTO downloads (product_id, type, title, filename, file_size_kb) VALUES
((SELECT id FROM products WHERE sku = 'TC-FER-01'), 'datasheet', 'Tri Clamp Ferrule Datasheet', 'TC-FER-01-datasheet.pdf', 245),
((SELECT id FROM products WHERE sku = 'VAL-BAL-01'), 'datasheet', 'Sanitary Ball Valve Datasheet', 'VAL-BAL-01-datasheet.pdf', 312),
((SELECT id FROM products WHERE sku = 'STM-TRP-01'), 'datasheet', 'Float Steam Trap Datasheet', 'STM-TRP-01-datasheet.pdf', 278),
((SELECT id FROM products WHERE sku = 'GAG-SS-01'), 'datasheet', 'Stainless Pressure Gauge Datasheet', 'GAG-SS-01-datasheet.pdf', 198),
((SELECT id FROM products WHERE sku = 'INS-EMF-01'), 'datasheet', 'Electromagnetic Flow Meter Datasheet', 'INS-EMF-01-datasheet.pdf', 456),
((SELECT id FROM products WHERE sku = 'VAL-BAL-01'), 'certificate', 'Material Certificate EN 10204 3.1', 'VAL-BAL-01-certificate.pdf', 89),
((SELECT id FROM products WHERE sku = 'INS-EMF-01'), 'manual', 'Installation and Operation Manual', 'INS-EMF-01-manual.pdf', 1250),
((SELECT id FROM products WHERE sku = 'VAL-DIA-01'), 'datasheet', 'Diaphragm Valve Datasheet', 'VAL-DIA-01-datasheet.pdf', 356)
ON CONFLICT (id) DO NOTHING;

-- Update product counts
UPDATE products SET downloads_count = (SELECT COUNT(*) FROM downloads WHERE downloads.product_id = products.id);

-- Add more product relations
INSERT INTO product_relations (product_id, related_product_id)
SELECT 
    p1.id, 
    p2.id 
FROM products p1 
CROSS JOIN products p2 
WHERE p1.sku = 'VAL-BAL-01' AND p2.sku IN ('TC-TEE-01', 'CHECK-VALVE-SANITARY', 'VAL-DIA-01', 'TC-SG-01')
ON CONFLICT (product_id, related_product_id) DO NOTHING;

INSERT INTO product_relations (product_id, related_product_id)
SELECT 
    p1.id, 
    p2.id 
FROM products p1 
CROSS JOIN products p2 
WHERE p1.sku = 'INS-EMF-01' AND p2.sku IN ('INS-TC-01', 'GAG-TRM-01', 'INS-CM-01', 'VAL-CV-01')
ON CONFLICT (product_id, related_product_id) DO NOTHING;
