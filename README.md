# Mini Support Ticketing System

A lightweight, role-based web application for employees to raise IT or facility issues, and for support teams to triage and resolve them efficiently.

---

## Table of contents
- [Overview](#overview)
- [Problem statement](#problem-statement)
- [Goals and scope](#goals-and-scope)
- [Personas and roles](#personas-and-roles)
- [Ticket lifecycle](#ticket-lifecycle)
- [Core features (MVP)](#core-features-mvp)
- [Data model (MVP)](#data-model-mvp)
- [API overview (reference)](#api-overview-reference)
- [Authorization rules](#authorization-rules)
- [UX surfaces](#ux-surfaces)
- [Non-functional requirements](#non-functional-requirements)
- [User stories and acceptance criteria](#user-stories-and-acceptance-criteria)
- [Design rationale](#design-rationale)
- [Future enhancements](#future-enhancements)
- [Getting started (template)](#getting-started-template)
- [Contributing](#contributing)

---

## Overview
Organizations need a simple way for employees to raise and track IT or facility-related issues, and for support teams to triage and resolve them efficiently. This Mini Support Ticketing System focuses on the essentials: ticket submission and tracking for End Users; queue management and status updates for Support Agents; and an optional Admin view for operational metrics.

## Problem statement
Employees often have limited visibility into issue status and ownership, while support teams struggle with scattered requests and inconsistent workflows. The system provides a single place to create, manage, and resolve tickets with clear ownership, simple workflows, and basic metrics.

## Goals and scope

### In scope (MVP)
- Role-based access: End User, Support Agent, optional Admin
- Ticket creation and tracking with essential fields
- Lifecycle: Open → In Progress → Resolved; allow reopen with reason
- Assignment: unassigned on creation; self-assign/reassign by agents/admin
- Comments: public (requester-visible) and internal (agent-only)
- Search and filter by status/category/priority/assignee/date
- Notifications (basic): create, assignment, status change, resolution
- Metrics (Admin): counts, time-to-first-response, time-to-resolution
- Auditability: status and assignee change history, comment history

### Out of scope (for MVP)
- Advanced SLAs, automation rules, third-party integrations, knowledge base
- Mobile apps/offline; multi-tenancy; SSO/OIDC/SAML; custom form builders

## Personas and roles
- End User (Employee)
  - Can create tickets and view their own tickets and status
  - Can add public comments and attachments to own tickets
- Support Agent (IT/Facilities)
  - Can view all tickets; filter/sort; update status
  - Can self-assign/reassign; add public or internal comments
- Admin (optional)
  - Can view metrics dashboard and manage agent accounts

## Ticket lifecycle
- States: `Open` → `In Progress` → `Resolved`
- Reopen allowed: `Resolved` → `Open` (requires reason)
- Each transition records actor, timestamp, and optional note

## Core features (MVP)
- End User portal: create ticket, list own tickets, detail view with status timeline and comments
- Agent console: global ticket list with filters; detail view to update status/assignment/comments
- Admin dashboard: high-level metrics (counts/trends, avg times, workload by agent)
- Notifications: in-app and/or email on key events
- Security: authenticated access; users see only their tickets; server-side RBAC

## Data model (MVP)

### Ticket
| Field        | Type        | Description                                      |
|--------------|-------------|--------------------------------------------------|
| id           | string/uuid | Unique ticket ID                                 |
| title        | string      | Short summary                                    |
| description  | text        | Detailed description                             |
| category     | enum        | `IT`, `Facilities`                               |
| priority     | enum        | `Low`, `Medium`, `High`                         |
| status       | enum        | `Open`, `In Progress`, `Resolved`                |
| requesterId  | string/uuid | End User who created the ticket                  |
| assigneeId   | string/uuid | Agent assigned (nullable)                        |
| createdAt    | datetime    | Creation timestamp                               |
| updatedAt    | datetime    | Last update timestamp                            |
| resolvedAt   | datetime    | Resolution timestamp (nullable)                  |

### Comment
| Field       | Type        | Description                                        |
|-------------|-------------|----------------------------------------------------|
| id          | string/uuid | Unique comment ID                                  |
| ticketId    | string/uuid | Associated ticket                                  |
| authorId    | string/uuid | User who wrote the comment                         |
| visibility  | enum        | `public` (visible to requester) or `internal`      |
| body        | text        | Comment content                                    |
| createdAt   | datetime    | Timestamp                                          |

### User
| Field     | Type        | Description                              |
|-----------|-------------|------------------------------------------|
| id        | string/uuid | Unique user ID                           |
| name      | string      | Display name                              |
| email     | string      | Email address                             |
| role      | enum        | `END_USER`, `AGENT`, `ADMIN`          |
| active    | boolean     | Account status                            |

### Attachment (optional)
| Field       | Type        | Description                             |
|-------------|-------------|-----------------------------------------|
| id          | string/uuid | Unique attachment ID                    |
| ticketId    | string/uuid | Associated ticket                       |
| url         | string      | Storage URL                             |
| filename    | string      | Original filename                       |
| contentType | string      | MIME type                               |
| uploadedBy  | string/uuid | Uploader ID                             |
| createdAt   | datetime    | Timestamp                               |

### AuditLog (optional)
Captures changes in status/assignee and other sensitive actions for traceability.

## API overview (reference)
> Note: Adapt paths/payloads to your chosen stack and conventions.

- Tickets
  - `POST /api/tickets` — create ticket
  - `GET /api/tickets?mine=true&status=&category=&priority=&assignee=&from=&to=` — list tickets
  - `GET /api/tickets/:id` — ticket detail
  - `PATCH /api/tickets/:id/status` — transition status (Open → In Progress → Resolved; reopen)
  - `PATCH /api/tickets/:id/assignee` — assign/reassign/unassign
- Comments
  - `POST /api/tickets/:id/comments` — add public/internal comment
  - `GET /api/tickets/:id/comments` — list comments (respect visibility)
- Metrics (Admin)
  - `GET /api/metrics` — counts by status/category/priority, avg times, tickets per agent

## Authorization rules
- End Users: access only their own tickets/comments; cannot change assignee or internal notes
- Agents: access all tickets; can update status, assignment, and comments (public/internal)
- Admins: all agent permissions plus metrics and user/agent management
- Server-side checks enforce ownership and role permissions on every request

## UX surfaces
- End User portal: simple form to create tickets; list/detail with status timeline and public comments
- Agent console: filterable queue; bulk filters; detail pane with quick actions and audit trail
- Admin dashboard: KPIs and trends; workload by agent; date range controls

## Non-functional requirements
- Performance: typical API responses < 300 ms for list/detail
- Availability: business-hours reliability acceptable for MVP
- Security: protect PII; RBAC; rate limiting; minimal data retention
- Accessibility: WCAG AA best-effort on core flows
- Observability: basic logs for lifecycle events and errors

## User stories and acceptance criteria

1) Submit a ticket (End User)
- Required fields: title, description, category, priority
- Created with status `Open` and unique ID; visible in "My Tickets"
- Inline validation for missing/invalid fields; optional attachments

2) Track and comment on my ticket (End User)
- See only own tickets with filters (status/category/date)
- Detail shows status, assignee, timestamps, comments
- Add public comments; receive notifications on status/assignee changes and resolution

3) Work the queue and update status (Agent)
- View all tickets with filters (status/category/priority/assignee/date)
- Allowed transitions: Open → In Progress → Resolved; Resolved → Open (reopen with reason)
- Status changes log actor, timestamp, optional note; internal vs public comments

4) Assign and reassign tickets (Agent)
- Self-assign unassigned tickets; reassign to active agents
- Assignee changes notify requester and new assignee; audited who/when/from/to
- Only agents/admins can change assignees

5) View metrics dashboard (Admin)
- Counts by status/category/priority and trends; avg time to first response/resolve
- Tickets per agent and open workload by agent; date range filter; admin-only access

## Design rationale
- Three simple roles with least-privilege RBAC
- Minimal 3-state workflow to maximize clarity and speed
- Essential fields only to reduce friction; timestamps/actors for audit and metrics
- Public vs internal comments to balance transparency and collaboration
- Assignment model ensures clear ownership and scalability
- Basic metrics focused on actionable KPIs

## Future enhancements
- Custom workflows & SLAs; escalations and reminders
- Automation & routing (skills-based, load-based, round-robin)
- Knowledge base & suggested articles; macros and templates
- Omnichannel (Slack/Teams/email/SMS), @mentions and notification preferences
- Integrations & APIs (Jira/GitHub/ServiceNow, webhooks, GraphQL/REST)
- Analytics & reporting (custom dashboards, trends, percentiles)
- AI assistance (auto-triage, dedupe, summaries, suggested replies)
- Security & compliance (SSO/SCIM, audit logs, DLP)
- Multi-tenant & i18n; theming; mobile/PWA and offline drafts

## Getting started (template)
This project is implementation-agnostic. Adapt these steps to your chosen stack.

### Prerequisites (example)
- Runtime: Node.js 18+ or your preferred backend runtime
- Database: PostgreSQL/MySQL/SQLite (choose one) or a managed service
- Optional: SMTP or email provider for notifications

### Environment variables (example)
```
# Copy to .env and adapt
DATABASE_URL="postgres://USER:PASS@HOST:5432/DB"
JWT_SECRET="replace-me"
SMTP_URL="smtp://USER:PASS@HOST:587"
```

### Typical workflow (example)
1. Choose stack (e.g., Node/Express + React/Vite + Postgres)
2. Initialize backend and frontend projects
3. Define schema and run migrations
4. Implement endpoints and UI views per API and UX sections
5. Seed development data and run locally

> Replace with concrete commands once the implementation is selected.

## Contributing
- Propose changes via pull requests with a clear description and scope
- Add or update tests where applicable
- Follow established code style and naming conventions
- Keep README and docs in sync with functional changes
