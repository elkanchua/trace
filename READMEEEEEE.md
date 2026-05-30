# Product Brain + Role Dashboards

Trae Hackathon documentation package for an AI product workspace that reduces context gaps across product, design, engineering, legal, and operations teams.

## Problem

Product teams often work from scattered and evolving sources: READMEs, PRDs, design notes, meeting minutes, GitHub issues, and stakeholder decisions. When one artifact changes, every role needs a different interpretation of the change. Product managers need scope clarity, engineers need implementation requirements, designers need flows and missing states, legal teams need risk signals, and SRE teams need operational requirements.

Product Brain + Role Dashboards turns those messy inputs into a PM-approved living brief, role-specific dashboards, inbox updates, conflicts, and confirmations.

## Hackathon Pitch

Upload your product artifacts once. The app extracts the product brain, detects contradictions, and tells every role what changed, what matters to them, and what needs confirmation before the team builds from stale context.

## Target Users

- Product Managers who own scope, decisions, and cross-team alignment
- Engineers who need clear requirements, open questions, and GitHub issue drafts
- Designers who need user flows, required screens, edge states, and design gaps
- Legal / Security reviewers who need risks, privacy concerns, and compliance checks
- SRE / DevOps teams who need deployment, incident, and infrastructure context

## MVP Scope

- Upload artifacts: README/product brief, PRD, meeting minutes, and design notes
- Extract structured knowledge: goals, users, features, requirements, risks, tasks, and open questions
- Detect conflicts across artifacts and artifact versions
- Maintain a PM-approved living brief as the canonical source of truth
- Show role dashboards and role-specific inboxes
- Require affected roles to confirm awareness when approved changes impact their work
- Generate GitHub issue drafts without writing to GitHub by default

## Core Concepts

- **Project:** A product workspace containing artifacts, extracted knowledge, conflicts, and role activity.
- **Artifact:** An uploaded source such as a README, PRD, meeting note, design note, or repo file.
- **Living Brief:** The PM-approved product truth that the team should build from.
- **Extracted Entity:** A structured item pulled from artifacts, such as a goal, feature, requirement, risk, task, or question.
- **Role Dashboard:** A filtered view of the product brain for PM, Engineer, Designer, Legal / Security, or SRE / DevOps.
- **Inbox Item:** A role-specific update, assignment, blocker, or confirmation request.
- **Conflict:** Two or more claims that disagree across sources or versions.
- **Confirmation:** Acknowledgement from an impacted role that they have seen an approved change.

## Logic Flow

1. Upload artifact with metadata: source, type, owner, project, and timestamp.
2. Parse artifact content into normalized text and sections.
3. Extract product goals, features, requirements, risks, tasks, and open questions.
4. Compare new claims against the current living brief and older artifact versions.
5. Detect deltas and conflicts with source evidence.
6. Ask the PM to approve, reject, or resolve proposed changes.
7. Update the living brief after PM approval.
8. Push role-specific inbox items to impacted teams.
9. Track confirmations so the PM can see who has acknowledged the change.

## User Flows

### Product Manager

1. Creates or opens a project.
2. Uploads a README, product brief, PRD, or meeting minutes.
3. Reviews extracted goals, users, features, requirements, risks, and open questions.
4. Reviews detected conflicts and source evidence.
5. Assigns a conflict owner or makes the product decision directly.
6. Approves updates into the living brief.
7. Monitors which roles have confirmed awareness of the approved changes.

### Engineer

- Sees technical requirements, API or data-model implications, open questions, blocking conflicts, repo status, and suggested GitHub issue drafts.
- Confirms when approved scope or requirement changes affect implementation.

### Designer

- Sees design brief updates, screens needed, flow gaps, missing states, copy changes, and conflicts that affect user journeys.
- Confirms when approved changes affect design work.

### Legal / Security

- Sees privacy risks, compliance checklist items, unclear data-handling requirements, and security-sensitive product changes.
- Confirms when approved changes affect legal or security review.

### SRE / DevOps

- Sees deployment assumptions, infrastructure requirements, operational gaps, incidents, uptime needs, and release blockers.
- Confirms when approved changes affect deployment or operational readiness.

## Demo Scenario

Feature: Login

- README says users sign in with email and password.
- Meeting notes say login will use Google OAuth.
- The app flags a conflict: "Login method unclear."
- Impact:
  - Engineer cannot finalize the auth API.
  - Designer cannot finalize onboarding screens.
  - Legal / Security needs to review third-party auth implications.
- Suggested next step: assign to PM.
- PM chooses the login method, approves the living brief update, and affected roles receive confirmation requests.

## Key Screens

- Project home and role switcher
- Role dashboard
- Role-specific inbox
- Artifact upload and proposed-change review
- Conflict resolver
- Timeline and observability board

## MVP Defaults

- Canonical source of truth: PM-approved living brief
- Default integration behavior: GitHub suggest-only, no write-enabled actions
- Primary artifact types: README/product brief, PRD, meeting minutes, design notes
- First conflict type: inconsistent feature requirements across sources or versions

