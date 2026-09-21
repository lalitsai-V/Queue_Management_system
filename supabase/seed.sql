-- SMART QUEUE MANAGEMENT SYSTEM FOR HOSPITALS
-- Seed Data Script: seed.sql

-- 1. SEED DEPARTMENTS
INSERT INTO public.departments (id, name, code, description, average_consultation_minutes, is_active)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'General Medicine', 'GM', 'Primary health care, routine checkups and common ailment diagnoses.', 8, true),
    ('22222222-2222-2222-2222-222222222222', 'Cardiology', 'CAR', 'Comprehensive cardiac evaluations, ECG, and cardiovascular care.', 15, true),
    ('33333333-3333-3333-3333-333333333333', 'Orthopedics', 'ORT', 'Bone, joint, spine, and musculoskeletal injury consultations.', 12, true),
    ('44444444-4444-4444-4444-444444444444', 'Pediatrics', 'PED', 'Child health, immunization, pediatric checkups, and growth assessment.', 10, true),
    ('55555555-5555-5555-5555-555555555555', 'Dental', 'DEN', 'Oral health checks, scaling, extractions, and dental procedures.', 15, true)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    average_consultation_minutes = EXCLUDED.average_consultation_minutes;

-- DEMO INSTRUCTIONS:
-- Additional demo records are managed dynamically via the app's seed & fallback provider!
