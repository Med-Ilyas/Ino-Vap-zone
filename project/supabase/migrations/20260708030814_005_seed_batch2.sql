/*
# Seed Additional Products - Batch 2 (Products 41-60)
More products for Pipe Fittings, Steam Equipment, Pressure Gauges, and Instruments
*/

-- Add Pipe Fittings products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Eccentric Reducer', 'eccentric-reducer', 'PIP-ERE-01', 'PER-1', (SELECT id FROM categories WHERE slug = 'pipe-fittings'),
'Eccentric reducer for horizontal pipe runs, prevents air locking.',
'{"Type": "Eccentric", "Ends": "Butt weld", "Standard": "ASTM A403"}',
'304', ARRAY['2x1.5', '3x2', '4x3', '6x4'], 'INO-VAP ZONE', 'Butt Weld', 'ASTM A403', false, ARRAY['Chemical', 'Water Treatment', 'Oil & Gas']),
('Stainless Reducing Tee', 'reducing-tee', 'PIP-RDT-01', 'PRT-1', (SELECT id FROM categories WHERE slug = 'pipe-fittings'),
'Reducing tee for combining flows of different diameters.',
'{"Type": "Reducing Tee", "Ends": "Butt weld"}',
'316', ARRAY['2x1.5x2', '3x2', '4x3', '6x4'], 'INO-VAP ZONE', 'Butt Weld', 'ASTM A403', true, ARRAY['Oil & Gas', 'Chemical']),
('Stainless Elbow 45 LR', 'elbow-45-lr', 'PIP-EL45-01', 'PE45-1', (SELECT id FROM categories WHERE slug = 'pipe-fittings'),
'45-degree long radius elbow for smooth flow direction change.',
'{"Type": "45 LR", "Radius": "1.5D", "Ends": "Butt weld"}',
'304', ARRAY['1', '1.5', '2', '3', '4', '6'], 'INO-VAP ZONE', 'Butt Weld', 'ASTM A403', false, ARRAY['Industrial', 'Chemical', 'Oil & Gas']),
('Stainless Elbow 90 SR', 'elbow-90-sr', 'PIP-EL90-01', 'PE90-1', (SELECT id FROM categories WHERE slug = 'pipe-fittings'),
'90-degree short radius elbow for tight spaces.',
'{"Type": "90 SR", "Radius": "1D", "Ends": "Butt weld"}',
'304', ARRAY['1', '1.5', '2', '3', '4'], 'INO-VAP ZONE', 'Butt Weld', 'ASTM A403', false, ARRAY['Industrial', 'Chemical']),
('Stainless Cap', 'pipe-cap', 'PIP-CAP-01', 'PCP-1', (SELECT id FROM categories WHERE slug = 'pipe-fittings'),
'Butt weld cap for sealing pipe ends permanently.',
'{"Type": "Cap", "Ends": "Butt weld"}',
'316', ARRAY['1', '1.5', '2', '3', '4', '6'], 'INO-VAP ZONE', 'Butt Weld', 'ASTM A403', false, ARRAY['Oil & Gas', 'Chemical', 'Steam Systems'])
ON CONFLICT (sku) DO NOTHING;

-- Add Steam Equipment products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Thermodynamic Steam Trap', 'thermodynamic-steam-trap', 'STM-TD-01', 'STD-1', (SELECT id FROM categories WHERE slug = 'steam-equipment'),
'Thermodynamic steam trap for main steam lines and tracing.',
'{"Type": "Thermodynamic", "Body": "Stainless", "MaxPressure": "32 bar"}',
'304', ARRAY['DN15', 'DN20', 'DN25'], 'INO-VAP ZONE', 'Threaded', 'ISO 6553', true, ARRAY['Steam Systems', 'Process Heating', 'Industrial']),
('Balanced Pressure Trap', 'balanced-pressure-trap', 'STM-BP-01', 'SBP-1', (SELECT id FROM categories WHERE slug = 'steam-equipment'),
'Balanced pressure thermostatic steam trap for process equipment.',
'{"Type": "Balanced Pressure", "Element": "Bimetallic", "MaxPressure": "21 bar"}',
'304', ARRAY['DN15', 'DN20', 'DN25', 'DN40'], 'INO-VAP ZONE', 'Flanged', 'ISO 6553', true, ARRAY['Food Processing', 'Pharmaceutical']),
('Inverted Bucket Trap', 'inverted-bucket-trap', 'STM-IB-01', 'SIB-1', (SELECT id FROM categories WHERE slug = 'steam-equipment'),
'Inverted bucket steam trap for continuous drainage.',
'{"Type": "Inverted Bucket", "Mechanism": "Buoyancy", "MaxPressure": "25 bar"}',
'Cast Iron', ARRAY['DN15', 'DN25', 'DN50'], 'INO-VAP ZONE', 'Flanged', 'ISO 6553', false, ARRAY['Steam Systems', 'Industrial', 'Process Heating']),
('Steam Pressure Reducer', 'steam-pressure-reducer', 'STM-PRV-01', 'SPR-1', (SELECT id FROM categories WHERE slug = 'steam-equipment'),
'Steam pressure reducing valve for precise pressure control.',
'{"Type": "Self-Acting PRV", "Range": "0.2-14 bar out"}',
'304', ARRAY['DN15', 'DN25', 'DN40', 'DN50'], 'INO-VAP ZONE', 'Flanged', 'EN 13709', false, ARRAY['Steam Systems', 'Process Heating']),
('Flash Vessel', 'flash-vessel', 'STM-FV-01', 'SFV-1', (SELECT id FROM categories WHERE slug = 'steam-equipment'),
'Flash vessel for recovering flash steam from condensate.',
'{"Type": "Horizontal Flash Vessel", "DesignPressure": "7 bar"}',
'304', ARRAY['DN200', 'DN300', 'DN400'], 'INO-VAP ZONE', 'Flanged', 'PED 97/23', false, ARRAY['Steam Systems', 'Energy Recovery'])
ON CONFLICT (sku) DO NOTHING;

-- Add Pressure Gauge products
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Glycerin Filled Gauge', 'glycerin-filled-gauge', 'GAG-GLY-01', 'GGL-1', (SELECT id FROM categories WHERE slug = 'pressure-gauges'),
'Glycerin filled pressure gauge for vibration resistance.',
'{"Type": "Glycerin Filled", "Accuracy": "1.6 percent", "Case": "SS304"}',
'304', ARRAY['0-10', '0-16', '0-25', '0-40', '0-60'], 'INO-VAP ZONE', 'BSP Threaded', 'EN 837-1', true, ARRAY['Industrial', 'Steam Systems', 'Hydraulics']),
('Differential Pressure Gauge', 'differential-pressure-gauge', 'GAG-DP-01', 'GDP-1', (SELECT id FROM categories WHERE slug = 'pressure-gauges'),
'Differential pressure gauge for filter monitoring.',
'{"Type": "Differential", "Accuracy": "2.5 percent", "Range": "0-1 bar diff"}',
'304', ARRAY['0-0.5', '0-1', '0-2.5'], 'INO-VAP ZONE', 'Flanged', 'EN 837-1', false, ARRAY['Process Control', 'Water Treatment', 'Pharmaceutical']),
('Absolute Pressure Gauge', 'absolute-pressure-gauge', 'GAG-ABS-01', 'GAB-1', (SELECT id FROM categories WHERE slug = 'pressure-gauges'),
'Absolute pressure gauge for vacuum applications.',
'{"Type": "Absolute", "Reference": "Vacuum", "Accuracy": "1.0 percent"}',
'316', ARRAY['0-1000 mbar', '0-1 bar', '0-2.5 bar'], 'INO-VAP ZONE', 'Flanged', 'EN 837-1', false, ARRAY['Pharmaceutical', 'Chemical', 'Vacuum Systems']),
('Temperature Gauge Bi-Metal', 'temperature-gauge-bimetal', 'GAG-TMP-01', 'GTB-1', (SELECT id FROM categories WHERE slug = 'pressure-gauges'),
'Bi-metal temperature gauge for process temperature measurement.',
'{"Type": "Bi-Metallic", "Accuracy": "1.5 percent", "Range": "-50 to 500C"}',
'304', ARRAY['63mm', '100mm', '150mm'], 'INO-VAP ZONE', 'Threaded', 'EN 13190', true, ARRAY['Industrial', 'Steam Systems', 'Process Heating']),
('Pressure Transmitter', 'pressure-transmitter', 'GAG-TRM-01', 'GTR-1', (SELECT id FROM categories WHERE slug = 'pressure-gauges'),
'4-20mA pressure transmitter for automation systems.',
'{"Type": "Transmitter", "Output": "4-20mA", "Accuracy": "0.5 percent"}',
'316L', ARRAY['0-10', '0-25', '0-100'], 'INO-VAP ZONE', 'Threaded', 'IEC 60770', false, ARRAY['Process Control', 'Industrial Instruments'])
ON CONFLICT (sku) DO NOTHING;

-- Add Industrial Instruments
INSERT INTO products (name, slug, sku, reference, category_id, description, technical_specifications, material, available_sizes, brand, connection_type, standard, is_featured, applications) VALUES
('Thermocouple Assembly', 'thermocouple-assembly', 'INS-TC-01', 'ITC-1', (SELECT id FROM categories WHERE slug = 'industrial-instruments'),
'Industrial thermocouple assembly with thermowell for process temperature.',
'{"Type": "Type K/J", "Sheath": "SS316", "MaxTemp": "1000C"}',
'316', ARRAY['150mm', '300mm', '450mm', '600mm'], 'INO-VAP ZONE', 'Threaded', 'IEC 60584', true, ARRAY['Process Control', 'Industrial', 'Steam Systems']),
('Level Switch Float', 'level-switch-float', 'INS-LV-01', 'ILV-1', (SELECT id FROM categories WHERE slug = 'industrial-instruments'),
'Float level switch for tank level control.',
'{"Type": "Float Switch", "Material": "SS316", "NO/NC": "SPDT"}',
'316', ARRAY['Side entry', 'Top entry'], 'INO-VAP ZONE', 'Flanged', 'EN 13137', false, ARRAY['Water Treatment', 'Food Processing', 'Chemical']),
('Conductivity Sensor', 'conductivity-sensor', 'INS-CD-01', 'ICD-1', (SELECT id FROM categories WHERE slug = 'industrial-instruments'),
'Temperature compensated conductivity sensor for liquid analysis.',
'{"Type": "Conductivity", "Cell": "Graphite", "Range": "0-200mS"}',
'316', ARRAY['0-200uS', '0-2mS', '0-20mS', '0-200mS'], 'INO-VAP ZONE', 'Threaded', 'ASTM D1125', false, ARRAY['Water Treatment', 'Pharmaceutical', 'Food Processing']),
('pH Electrode', 'ph-electrode', 'INS-PH-01', 'IPH-1', (SELECT id FROM categories WHERE slug = 'industrial-instruments'),
'Industrial pH electrode with reference junction.',
'{"Type": "pH Glass Electrode", "Range": "0-14 pH", "Temp": "0-100C"}',
'EPSS', ARRAY['Plug-in', 'Insertion'], 'INO-VAP ZONE', 'Threaded', 'ISO 7888', false, ARRAY['Pharmaceutical', 'Water Treatment', 'Food Processing']),
('Vortex Flow Meter', 'vortex-flow-meter', 'INS-VX-01', 'IVX-1', (SELECT id FROM categories WHERE slug = 'industrial-instruments'),
'Vortex shedding flow meter for steam and gases.',
'{"Type": "Vortex", "Accuracy": "1.0 percent", "Output": "4-20mA"}',
'316', ARRAY['DN25', 'DN50', 'DN80', 'DN100'], 'INO-VAP ZONE', 'Flanged', 'ISO 4064', true, ARRAY['Steam Systems', 'Process Control', 'Industrial'])
ON CONFLICT (sku) DO NOTHING;
