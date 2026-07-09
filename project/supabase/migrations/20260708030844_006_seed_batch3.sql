/*
# Seed Additional Products - Batch 3 (Products 61-80)
More products across all categories to reach ~100 total
*/

-- More Tri Clamp products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Tri Clamp Elbow 180', 'tri-clamp-elbow-180', 'TC-E180-01', 'TCE180-1', (SELECT id FROM categories WHERE slug = 'tri-clamp'),
'180-degree return bend for U-bend connections in sanitary systems.',
'{"Standard": "ISO 2852", "Angle": "180 degree", "Radius": "1.5D"}',
'304', ARRAY['1', '1.5', '2', '2.5', '3'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', false, ARRAY['Food Processing', 'Dairy', 'Beverage']),
('Tri Clamp Sight Glass', 'tri-clamp-sight-glass', 'TC-SG-01', 'TCSG-1', (SELECT id FROM categories WHERE slug = 'tri-clamp'),
'Sanitary sight glass for visual inspection of process flow.',
'{"Standard": "ISO 2852", "Glass": "Borosilicate", "MaxPressure": "10 bar"}',
'304', ARRAY['1.5', '2', '3'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', true, ARRAY['Pharmaceutical', 'Food Processing', 'Biotechnology']),
('Tri Clamp Sample Valve', 'tri-clamp-sample-valve', 'TC-SV-01', 'TCSV-1', (SELECT id FROM categories WHERE slug = 'tri-clamp'),
'Sanitary sample valve for aseptic sampling from process lines.',
'{"Type": "Aseptic Sample", "Valve": "Pneumatic", "Volume": "100mL"}',
'316L', ARRAY['1', '1.5', '2'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', false, ARRAY['Pharmaceutical', 'Biotechnology', 'Food Processing']),
('Tri Clamp Spray Ball', 'tri-clamp-spray-ball', 'TC-SB-01', 'TCSB-1', (SELECT id FROM categories WHERE slug = 'tri-clamp'),
'Dynamic spray ball for tank CIP cleaning systems.',
'{"Type": "Dynamic Spray Ball", "Flow": "360 degree", "Pressure": "2-3 bar"}',
'316', ARRAY['1.5', '2', '2.5', '3'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', false, ARRAY['Food Processing', 'Dairy', 'Beverage']),
('Tri Clamp Line Strainer', 'tri-clamp-line-strainer', 'TC-LS-01', 'TCLS-1', (SELECT id FROM categories WHERE slug = 'tri-clamp'),
'Sanitary inline strainer for particle filtration in process lines.',
'{"Type": "Inline Strainer", "Screen": "40 mesh", "Body": "SS304"}',
'304', ARRAY['1.5', '2', '2.5', '3', '4'], 'INO-VAP ZONE', 'Tri-Clamp', 'ISO 2852', false, ARRAY['Food Processing', 'Pharmaceutical'])
ON CONFLICT (sku) DO NOTHING;

-- More Valve products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Control Valve Globe', 'control-valve-globe', 'VAL-CV-01', 'VCV-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-valves'),
'Globe control valve with pneumatic actuator for flow modulation.',
'{"Type": "Globe Control", "Actuator": "Pneumatic", "Flow": "Equal percentage"}',
'316', ARRAY['DN25', 'DN40', 'DN50', 'DN80', 'DN100'], 'INO-VAP ZONE', 'Flanged', 'IEC 60534', false, ARRAY['Process Control', 'Chemical', 'Steam Systems']),
('Ball Valve 3-Way T-Port', 'ball-valve-3way-tport', 'VAL-3WT-01', 'V3T-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-valves'),
'3-way T-port ball valve for mixing or diverting flow.',
'{"Type": "3-way T-Port", "Port": "Full Bore", "Handle": "Lever"}',
'304', ARRAY['1/2', '3/4', '1', '1.5', '2'], 'INO-VAP ZONE', 'NPT Threaded', 'ASTM A351', false, ARRAY['Industrial', 'Chemical', 'Water Treatment']),
('Safety Relief Valve', 'safety-relief-valve', 'VAL-SRV-01', 'VSR-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-valves'),
'Safety relief valve for overpressure protection of vessels.',
'{"Type": "Safety Relief", "Setting": "Adjustable", "Orifice": "Full lift"}',
'316', ARRAY['DN20', 'DN25', 'DN40', 'DN50'], 'INO-VAP ZONE', 'Flanged', 'API 526', true, ARRAY['Steam Systems', 'Pressure Vessels', 'Industrial']),
('Non-Return Valve Wafer', 'non-return-valve-wafer', 'VAL-NR-01', 'VNR-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-valves'),
'Wafer non-return valve for backflow prevention between flanges.',
'{"Type": "Wafer Check", "Disc": "Tilting", "Face": "Wafer"}',
'304', ARRAY['DN25', 'DN50', 'DN80', 'DN100', 'DN150'], 'INO-VAP ZONE', 'Flanged', 'API 594', false, ARRAY['Oil & Gas', 'Water Treatment', 'Industrial']),
('Pneumatic Butterfly Valve', 'pneumatic-butterfly-valve', 'VAL-PBV-01', 'VPB-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-valves'),
'Pneumatically actuated butterfly valve for automated process control.',
'{"Type": "Pneumatic Butterfly", "Actuator": "Double acting", "Positioner": "Optional"}',
'316', ARRAY['DN50', 'DN80', 'DN100', 'DN150', 'DN200'], 'INO-VAP ZONE', 'Flanged', 'ISO 5211', true, ARRAY['Food Processing', 'Pharmaceutical', 'Chemical'])
ON CONFLICT (sku) DO NOTHING;

-- More Flange products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Orifice Flange', 'orifice-flange', 'FLG-OF-01', 'FOF-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-flanges'),
'Orifice flange set for flow measurement applications.',
'{"Standard": "ANSI B16.36", "Face": "Raised Face", "Class": "300"}',
'304', ARRAY['DN50', 'DN80', 'DN100', 'DN150'], 'INO-VAP ZONE', 'Flanged', 'ANSI B16.36', false, ARRAY['Oil & Gas', 'Process Control']),
('Ring Type Joint Flange', 'rtj-flange', 'FLG-RTJ-01', 'FRTJ-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-flanges'),
'RTJ flange for high-pressure/high-temperature sealing applications.',
'{"Standard": "ANSI B16.5", "Face": "Ring Type Joint", "Class": "600"}',
'316', ARRAY['DN50', 'DN80', 'DN100', 'DN150'], 'INO-VAP ZONE', 'Flanged', 'ANSI B16.5', false, ARRAY['Oil & Gas', 'Chemical']),
('Long Weld Neck Flange', 'long-weld-neck-flange', 'FLG-LWN-01', 'FLWN-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-flanges'),
'Long weld neck flange for vessel and tank connections.',
'{"Standard": "ANSI B16.5", "Neck": "Long", "Class": "150"}',
'304', ARRAY['DN50', 'DN80', 'DN100', 'DN150', 'DN200'], 'INO-VAP ZONE', 'Butt Weld', 'ANSI B16.5', false, ARRAY['Pressure Vessels', 'Oil & Gas', 'Industrial']),
('Spectacle Blind Flange', 'spectacle-blind-flange', 'FLG-SB-01', 'FSB-1', (SELECT id FROM categories WHERE slug = 'stainless-steel-flanges'),
'Spectacle blind flange for temporary line isolation.',
'{"Standard": "ANSI B16.48", "Type": "Spectacle Blind", "Class": "150"}',
'304', ARRAY['DN25', 'DN50', 'DN100', 'DN150', 'DN200'], 'INO-VAP ZONE', 'Flanged', 'ANSI B16.48', false, ARRAY['Oil & Gas', 'Chemical', 'Industrial'])
ON CONFLICT (sku) DO NOTHING;

-- More Pipe Fittings
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Stainless Stub End', 'stub-end', 'PIP-SE-01', 'PSE-1', (SELECT id FROM categories WHERE slug = 'pipe-fittings'),
'Stainless stub end for lap joint flange connections.',
'{"Type": "Long Pattern Stub End", "Material": "SS304"}',
'304', ARRAY['1', '1.5', '2', '3', '4', '6'], 'INO-VAP ZONE', 'Lap Joint', 'MSS SP-43', false, ARRAY['Chemical', 'Water Treatment', 'Industrial']),
('Stainless Lateral Tee', 'lateral-tee', 'PIP-LT-01', 'PLT-1', (SELECT id FROM categories WHERE slug = 'pipe-fittings'),
'Lateral tee (Y-tee) for combining flows at 45 degrees.',
'{"Type": "Lateral Tee 45°", "Ends": "Butt weld"}',
'304', ARRAY['2', '3', '4', '6'], 'INO-VAP ZONE', 'Butt Weld', 'ASTM A403', false, ARRAY['Oil & Gas', 'Chemical', 'Industrial']),
('Stainless U-Bend', 'u-bend', 'PIP-UB-01', 'PUB-1', (SELECT id FROM categories WHERE slug = 'pipe-fittings'),
'U-bend pipe section for heat exchanger tube bundles.',
'{"Type": "U-Bend", "Radius": "Custom", "Ends": "Beveled"}',
'316', ARRAY['3/4', '1', '1.25', '1.5'], 'INO-VAP ZONE', 'Butt Weld', 'ASTM A249', false, ARRAY['Heat Exchangers', 'Oil & Gas', 'Chemical'])
ON CONFLICT (sku) DO NOTHING;

-- More Steam Equipment
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Condensate Pump', 'condensate-pump', 'STM-CP-01', 'SCP-1', (SELECT id FROM categories WHERE slug = 'steam-equipment'),
'Electric condensate return pump for boiler feed systems.',
'{"Type": "Condensate Return", "Drive": "Electric", "Head": "Up to 35m"}',
'Cast Iron', ARRAY['DN25', 'DN40', 'DN50'], 'INO-VAP ZONE', 'Flanged', 'API 610', false, ARRAY['Steam Systems', 'Boiler Feed']),
('Cooling Coil', 'cooling-coil', 'STM-CC-01', 'SCC-1', (SELECT id FROM categories WHERE slug = 'steam-equipment'),
'Stainless cooling coil for process fluid cooling applications.',
'{"Type": "Helical Coil", "Surface": "Custom", "Material": "SS316"}',
'316', ARRAY['Custom'], 'INO-VAP ZONE', 'Flanged', 'TEMA', false, ARRAY['Food Processing', 'Chemical', 'Pharmaceutical'])
ON CONFLICT (sku) DO NOTHING;
