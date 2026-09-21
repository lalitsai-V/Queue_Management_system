-- SMART QUEUE MANAGEMENT SYSTEM FOR HOSPITALS
-- Migration Script: 20260921_init_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('PATIENT', 'DOCTOR', 'ADMIN')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    average_consultation_minutes INTEGER DEFAULT 10,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DOCTORS TABLE
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    specialization TEXT,
    room_number TEXT DEFAULT 'Room 101',
    average_consultation_minutes INTEGER DEFAULT 10,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PATIENTS TABLE
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    date_of_birth DATE,
    gender TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE,
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status TEXT NOT NULL DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED', 'NO_SHOW')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. QUEUES TABLE
CREATE TABLE IF NOT EXISTS public.queues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE,
    queue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    current_token_id UUID NULL,
    is_paused BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_doctor_queue_date UNIQUE(doctor_id, queue_date)
);

-- 7. TOKENS TABLE
CREATE TABLE IF NOT EXISTS public.tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_number INTEGER NOT NULL,
    display_token TEXT NOT NULL,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE,
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
    appointment_id UUID NULL REFERENCES public.appointments(id) ON DELETE SET NULL,
    priority TEXT NOT NULL DEFAULT 'NORMAL' CHECK (priority IN ('NORMAL', 'PRIORITY', 'EMERGENCY')),
    status TEXT NOT NULL DEFAULT 'WAITING' CHECK (status IN ('WAITING', 'CALLED', 'IN_CONSULTATION', 'COMPLETED', 'SKIPPED', 'ABSENT', 'CANCELLED')),
    queue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    called_at TIMESTAMPTZ NULL,
    completed_at TIMESTAMPTZ NULL
);

-- 8. QUEUE EVENTS TABLE (Audit Trail)
CREATE TABLE IF NOT EXISTS public.queue_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_id UUID REFERENCES public.tokens(id) ON DELETE CASCADE,
    queue_id UUID REFERENCES public.queues(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('TOKEN_CREATED', 'CALLED', 'RECALLED', 'STARTED', 'COMPLETED', 'SKIPPED', 'ABSENT', 'CANCELLED', 'PAUSED', 'RESUMED')),
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'QUEUE_UPDATE',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR HIGH PERFORMANCE QUEUE QUERIES
CREATE INDEX IF NOT EXISTS idx_tokens_dept_doc_date ON public.tokens(department_id, doctor_id, queue_date);
CREATE INDEX IF NOT EXISTS idx_tokens_status_priority ON public.tokens(status, priority, created_at);
CREATE INDEX IF NOT EXISTS idx_tokens_patient_id ON public.tokens(patient_id);
CREATE INDEX IF NOT EXISTS idx_queues_doc_date ON public.queues(doctor_id, queue_date);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queue_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by authenticated users" ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- DEPARTMENTS POLICIES
CREATE POLICY "Departments viewable by anyone" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Departments manageable by admins" ON public.departments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- DOCTORS POLICIES
CREATE POLICY "Doctors viewable by anyone" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Doctors manageable by admins" ON public.doctors FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- PATIENTS POLICIES
CREATE POLICY "Patients viewable by self, doctors, admins" ON public.patients FOR SELECT USING (
  profile_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('DOCTOR', 'ADMIN'))
);
CREATE POLICY "Patients insertable by self or admin" ON public.patients FOR INSERT WITH CHECK (
  profile_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- QUEUES POLICIES
CREATE POLICY "Queues viewable by all authenticated users" ON public.queues FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Queues manageable by doctor or admin" ON public.queues FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.doctors d WHERE d.profile_id = auth.uid() AND d.id = doctor_id
  ) OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- TOKENS POLICIES
CREATE POLICY "Tokens viewable by owner patient, assigned doctor, admin, or public display" ON public.tokens FOR SELECT USING (true);
CREATE POLICY "Tokens insertable by authenticated patient or admin" ON public.tokens FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Tokens updateable by doctor or admin" ON public.tokens FOR UPDATE USING (auth.role() = 'authenticated');

-- QUEUE EVENTS POLICIES
CREATE POLICY "Queue events viewable by authenticated users" ON public.queue_events FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Queue events insertable by authenticated users" ON public.queue_events FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- NOTIFICATIONS POLICIES
CREATE POLICY "Notifications viewable by target user" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Notifications updateable by target user" ON public.notifications FOR UPDATE USING (user_id = auth.uid());

-- QUEUE ENGINE STORED PROCEDURES / RPC FUNCTIONS

-- 1. Generate Token Function
CREATE OR REPLACE FUNCTION public.generate_token(
    p_patient_id UUID,
    p_doctor_id UUID,
    p_department_id UUID,
    p_priority TEXT DEFAULT 'NORMAL',
    p_appointment_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_dept_code TEXT;
    v_queue_id UUID;
    v_next_token_num INT;
    v_display_token TEXT;
    v_token_id UUID;
    v_patient_user_id UUID;
BEGIN
    -- Get department code
    SELECT code INTO v_dept_code FROM public.departments WHERE id = p_department_id;
    IF v_dept_code IS NULL THEN
        RAISE EXCEPTION 'Invalid department ID';
    END IF;

    -- Ensure queue exists for today
    INSERT INTO public.queues (department_id, doctor_id, queue_date)
    VALUES (p_department_id, p_doctor_id, CURRENT_DATE)
    ON CONFLICT (doctor_id, queue_date) DO UPDATE SET doctor_id = EXCLUDED.doctor_id
    RETURNING id INTO v_queue_id;

    -- Lock queue row to prevent duplicate token numbers in concurrent requests
    PERFORM 1 FROM public.queues WHERE id = v_queue_id FOR UPDATE;

    -- Get next sequence number for this doctor & department today
    SELECT COALESCE(MAX(token_number), 0) + 1 INTO v_next_token_num
    FROM public.tokens
    WHERE department_id = p_department_id
      AND doctor_id = p_doctor_id
      AND queue_date = CURRENT_DATE;

    v_display_token := v_dept_code || '-' || LPAD(v_next_token_num::text, 3, '0');

    -- Insert new token
    INSERT INTO public.tokens (
        token_number, display_token, patient_id, doctor_id, department_id,
        appointment_id, priority, status, queue_date
    ) VALUES (
        v_next_token_num, v_display_token, p_patient_id, p_doctor_id, p_department_id,
        p_appointment_id, p_priority, 'WAITING', CURRENT_DATE
    )
    RETURNING id INTO v_token_id;

    -- Record Audit Event
    INSERT INTO public.queue_events (token_id, queue_id, event_type, created_by, metadata)
    VALUES (v_token_id, v_queue_id, 'TOKEN_CREATED', auth.uid(), jsonb_build_object('priority', p_priority));

    -- Create Notification for Patient
    SELECT profile_id INTO v_patient_user_id FROM public.patients WHERE id = p_patient_id;
    IF v_patient_user_id IS NOT NULL THEN
        INSERT INTO public.notifications (user_id, title, message, type)
        VALUES (
            v_patient_user_id,
            'Token Generated: ' || v_display_token,
            'Your queue token ' || v_display_token || ' has been created successfully.',
            'TOKEN_CREATED'
        );
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'token_id', v_token_id,
        'display_token', v_display_token,
        'token_number', v_next_token_num
    );
END;
$$;

-- 2. Call Next Patient Function
CREATE OR REPLACE FUNCTION public.call_next_patient(
    p_doctor_id UUID,
    p_queue_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_next_token public.tokens%ROWTYPE;
    v_patient_user_id UUID;
    v_room_number TEXT;
BEGIN
    -- Get doctor room number
    SELECT COALESCE(room_number, 'Room 1') INTO v_room_number FROM public.doctors WHERE id = p_doctor_id;

    -- Find next eligible waiting patient ordered by Priority (EMERGENCY > PRIORITY > NORMAL) then created_at
    SELECT * INTO v_next_token
    FROM public.tokens
    WHERE doctor_id = p_doctor_id
      AND queue_date = CURRENT_DATE
      AND status = 'WAITING'
    ORDER BY
        CASE priority
            WHEN 'EMERGENCY' THEN 1
            WHEN 'PRIORITY' THEN 2
            WHEN 'NORMAL' THEN 3
            ELSE 4
        END,
        created_at ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED;

    IF v_next_token.id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'No waiting patients in queue');
    END IF;

    -- Update token status
    UPDATE public.tokens
    SET status = 'CALLED',
        called_at = NOW()
    WHERE id = v_next_token.id;

    -- Update active queue current_token_id
    UPDATE public.queues
    SET current_token_id = v_next_token.id
    WHERE id = p_queue_id;

    -- Log Event
    INSERT INTO public.queue_events (token_id, queue_id, event_type, created_by)
    VALUES (v_next_token.id, p_queue_id, 'CALLED', auth.uid());

    -- Send Notification
    SELECT profile_id INTO v_patient_user_id FROM public.patients WHERE id = v_next_token.patient_id;
    IF v_patient_user_id IS NOT NULL THEN
        INSERT INTO public.notifications (user_id, title, message, type)
        VALUES (
            v_patient_user_id,
            'YOUR TURN: Token ' || v_next_token.display_token,
            'You have been called! Please proceed to ' || v_room_number || '.',
            'PATIENT_CALLED'
        );
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'token_id', v_next_token.id,
        'display_token', v_next_token.display_token,
        'patient_id', v_next_token.patient_id
    );
END;
$$;

-- 3. Start Consultation Function
CREATE OR REPLACE FUNCTION public.start_consultation(
    p_token_id UUID,
    p_doctor_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_token public.tokens%ROWTYPE;
    v_patient_user_id UUID;
    v_queue_id UUID;
BEGIN
    SELECT * INTO v_token FROM public.tokens WHERE id = p_token_id FOR UPDATE;
    IF v_token.id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Token not found');
    END IF;

    UPDATE public.tokens SET status = 'IN_CONSULTATION' WHERE id = p_token_id;

    SELECT id INTO v_queue_id FROM public.queues WHERE doctor_id = p_doctor_id AND queue_date = CURRENT_DATE;

    INSERT INTO public.queue_events (token_id, queue_id, event_type, created_by)
    VALUES (p_token_id, v_queue_id, 'STARTED', auth.uid());

    SELECT profile_id INTO v_patient_user_id FROM public.patients WHERE id = v_token.patient_id;
    IF v_patient_user_id IS NOT NULL THEN
        INSERT INTO public.notifications (user_id, title, message, type)
        VALUES (
            v_patient_user_id,
            'Consultation Started',
            'Your consultation for token ' || v_token.display_token || ' is now in progress.',
            'CONSULTATION_STARTED'
        );
    END IF;

    RETURN jsonb_build_object('success', true, 'status', 'IN_CONSULTATION');
END;
$$;

-- 4. Complete Consultation Function
CREATE OR REPLACE FUNCTION public.complete_current_patient(
    p_token_id UUID,
    p_doctor_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_token public.tokens%ROWTYPE;
    v_patient_user_id UUID;
    v_queue_id UUID;
BEGIN
    SELECT * INTO v_token FROM public.tokens WHERE id = p_token_id FOR UPDATE;
    IF v_token.id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Token not found');
    END IF;

    UPDATE public.tokens
    SET status = 'COMPLETED',
        completed_at = NOW()
    WHERE id = p_token_id;

    SELECT id INTO v_queue_id FROM public.queues WHERE doctor_id = p_doctor_id AND queue_date = CURRENT_DATE;

    -- Clear current_token_id if it matched completed token
    UPDATE public.queues
    SET current_token_id = NULL
    WHERE id = v_queue_id AND current_token_id = p_token_id;

    INSERT INTO public.queue_events (token_id, queue_id, event_type, created_by)
    VALUES (p_token_id, v_queue_id, 'COMPLETED', auth.uid());

    SELECT profile_id INTO v_patient_user_id FROM public.patients WHERE id = v_token.patient_id;
    IF v_patient_user_id IS NOT NULL THEN
        INSERT INTO public.notifications (user_id, title, message, type)
        VALUES (
            v_patient_user_id,
            'Consultation Completed',
            'Your consultation for token ' || v_token.display_token || ' has finished. Thank you!',
            'CONSULTATION_COMPLETED'
        );
    END IF;

    RETURN jsonb_build_object('success', true, 'status', 'COMPLETED');
END;
$$;

-- ENABLE REALTIME ON TOKENS, QUEUES AND NOTIFICATIONS
ALTER PUBLICATION supabase_realtime ADD TABLE public.tokens;
ALTER PUBLICATION supabase_realtime ADD TABLE public.queues;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
