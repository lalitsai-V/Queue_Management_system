# Smart Queue Management System for Hospitals 🏥

A production-style, Object-Oriented Software Engineering (OOSE) college project web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Supabase (@supabase/ssr, PostgreSQL, Auth, Realtime, RLS)**, **Zod**, and **Recharts**.

The application solves actual hospital queue problems: manual token management, long waiting times, overcrowded waiting halls, lack of position awareness, and manual doctor callouts.

---

## 🚀 Main Workflows

### 1. Patient Workflow
`LOGIN` → `SELECT DEPARTMENT` → `SELECT DOCTOR` → `GET TOKEN` → `RECEIVE DIGITAL TOKEN (e.g. GM-029)` → `TRACK LIVE QUEUE POSITION` → `SEE ESTIMATED WAIT TIME` → `RECEIVE REALTIME CALL ALERT` → `START CONSULTATION` → `COMPLETE`

### 2. Doctor Workflow
`LOGIN` → `OPEN TODAY'S QUEUE` → `SEE WAITING PATIENTS` → `CALL NEXT` → `START CONSULTATION` → `RECALL / SKIP / ABSENT` → `COMPLETE` → `NEXT PATIENT BECOMES ELIGIBLE`

### 3. Administrator Workflow
`LOGIN` → `EXECUTIVE DASHBOARD` → `MONITOR ALL DEPARTMENTS` → `PAUSE / RESUME QUEUES` → `MANAGE DOCTORS & DEPARTMENTS` → `VIEW AUDIT REPORTS`

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide React icons, Recharts
- **Backend & DB**: Supabase, PostgreSQL, @supabase/ssr, Row Level Security (RLS), Supabase Realtime, Stored Procedures / RPC Functions
- **Validation**: Zod schema validation

---

## 📁 Folder Structure

```
hospital-queue-management/
├── app/                        # Next.js App Router routes
│   ├── page.tsx                # Hospital Landing Page
│   ├── login/                  # Role-based login
│   ├── register/               # Patient registration
│   ├── queue-display/          # Waiting Room TV Display Mode
│   ├── patient/                # Patient portal routes
│   │   ├── dashboard/          # Active token overview & timeline
│   │   ├── queue/              # Realtime live queue tracker
│   │   ├── queue/get-token/    # 4-step token generation wizard
│   │   ├── appointments/       # Scheduled visits
│   │   ├── history/            # Past token log
│   │   └── notifications/      # Real-time queue alerts
│   ├── doctor/                 # Doctor control deck & queue management
│   └── admin/                  # Executive dashboard, queues monitor & reports
├── components/                 # Reusable hospital components
│   ├── ui/                     # Badges, Status Indicators
│   ├── queue/                  # TokenCard, QueueTimeline, DoctorQueuePanel, WaitingTimeCard
│   └── layout/                 # Navbar, PortalSidebar, Footer
├── lib/                        # Supabase clients & queue engine
│   ├── supabase/               # Browser & server SSR clients
│   ├── validations/            # Zod validation schemas
│   └── queue/                  # Queue engine, priority algorithm & analytics
├── types/                      # TypeScript definitions (queue.ts)
└── supabase/                   # PostgreSQL migrations & seeds
    ├── migrations/             # 20260921_init_schema.sql (Tables, RLS, RPCs)
    └── seed.sql                # Seed script
```

---

## 💻 Installation & Local Setup

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Database & Supabase Setup
1. Open your Supabase Project SQL Editor.
2. Run `supabase/migrations/20260921_init_schema.sql`.
3. Run `supabase/seed.sql`.
4. Enable Supabase Realtime for `tokens`, `queues`, and `notifications` tables under Database -> Realtime settings.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing Checklist

- [x] **Patient Registration & Login**: Patient profile created and redirected to patient dashboard.
- [x] **Token Generation**: Select General Medicine -> Dr. Rajesh Sharma -> Issue Token `GM-029`.
- [x] **Live Queue Tracker**: Position 5, 4 patients ahead, 32 min wait, visual timeline (`GM-024 ━━ GM-029`).
- [x] **Doctor Control**: Login as Doctor -> Click **CALL NEXT** -> Token status becomes `CALLED`.
- [x] **Realtime Alert**: Patient UI displays full-screen call banner: "PLEASE PROCEED TO ROOM 102".
- [x] **Consultation State Machine**: `CALLED` → `IN_CONSULTATION` → `COMPLETED`.
- [x] **Waiting Room TV Display**: Open `/queue-display` for high-contrast room display.
- [x] **Admin Dashboard**: Recharts graphs (Hourly activity, token status breakdown, department distribution).
