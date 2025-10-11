# Mini Support Ticketing System

A lightweight app for employees to raise IT/facility tickets and for agents to triage and resolve them.

## What it does (MVP)
- Roles & permissions: End User, Support Agent, Admin (optional)
- Lifecycle: Open → In Progress → Resolved; allow reopen (Resolved → Open) with reason
- Ticket model: title, description, category (IT/Facilities), priority (Low/Medium/High), status, requester, assignee, timestamps; comments (public/internal); attachments (optional)
- Core features:
  - End User portal: create ticket, view my tickets, comment
  - Agent console: view all, filter/sort, assign/reassign, update status, internal/public notes
  - Admin (optional): basic metrics (counts, avg times, workload by agent)
  - Search/filters, notifications on create/assignment/status change/resolution
  - RBAC + server-side authorization; audit trail for status/assignee changes

## API (reference)
- POST /api/tickets — create ticket
- GET /api/tickets?mine=&status=&category=&priority=&assignee=&from=&to= — list
- GET /api/tickets/:id — detail
- PATCH /api/tickets/:id/status — transition (incl. reopen)
- PATCH /api/tickets/:id/assignee — assign/reassign/unassign
- POST /api/tickets/:id/comments — add comment (public/internal)

## Non-functional (targets)
- Fast responses (<300 ms typical list/detail), business-hours availability
- Basic security (RBAC, rate limiting) and logs for lifecycle events
- Accessibility best-effort on core flows

## Future enhancements (short)
- Custom workflows & SLAs, automation/routing
- Knowledge base & deflection, templates/macros
- Omnichannel (Slack/Teams/email/SMS), notification preferences
- Integrations & APIs (Jira/GitHub/ServiceNow, webhooks), analytics & dashboards
- AI assistance (auto-triage, dedupe, summaries), SSO/SCIM & audit logs
- Multi-tenant/i18n, mobile/PWA & offline drafts

## Getting started (template)
Prereqs (example): Node.js 18+, PostgreSQL/MySQL/SQLite, SMTP (optional)

Environment (example):
```
DATABASE_URL="postgres://USER:PASS@HOST:5432/DB"
JWT_SECRET="replace-me"
SMTP_URL="smtp://USER:PASS@HOST:587"
```

Next steps:
1) Choose stack (e.g., Node/Express + React + Postgres)
2) Define schema and run migrations
3) Implement endpoints and UI per sections above
4) Seed dev data and run locally
