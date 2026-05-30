# Development Plan

## Product Definition

### Outcome

Build a hackathon-ready Product Brain + Role Dashboards prototype that turns unstructured product artifacts into a maintained living brief, role-specific dashboards, actionable inbox items, and conflict resolution.

### Success Criteria

- A PM can upload artifacts and review extracted goals, features, requirements, risks, tasks, and open questions.
- The app detects at least one concrete conflict type with source evidence.
- The living brief updates only after PM approval.
- Impacted roles receive inbox items and can confirm awareness of approved changes.
- GitHub behavior is suggest-only in the MVP.

## MVP Architecture

### Data Layer

- **Project:** product workspace and settings.
- **Artifact:** uploaded source with type, owner, timestamp, version, raw content, and parsed sections.
- **ExtractedEntity:** goal, user, feature, requirement, risk, task, or open question linked to source evidence.
- **Conflict:** disagreement across artifacts or versions with claims, sources, impact, owner, and status.
- **InboxItem:** role-specific update, task, blocker, clarification request, or confirmation request.
- **Confirmation:** acknowledgement that an impacted role has seen an approved change.

### Product Brain Pipeline

1. Ingest artifact and metadata.
2. Parse text and normalize sections.
3. Extract role-agnostic entities: goals, users, features, requirements, risks, and questions.
4. Extract role-specific outputs for PM, Engineer, Designer, Legal / Security, and SRE / DevOps.
5. Compare new claims to the current living brief and previous artifact versions.
6. Produce proposed changes, deltas, and conflicts.
7. Wait for PM approval before updating the living brief.
8. Generate inbox items and confirmation requests for impacted roles.

### App UI

- Project switcher and role switcher
- Dashboard for role-specific status, blockers, and latest changes
- Inbox grouped by High Priority, For Me, and Needs Clarification
- Artifact upload and proposed-change review
- Conflict resolver with source evidence, impact summary, owner assignment, and decision controls
- Timeline board showing feature status across PM, Design, Engineering, Legal / Security, and SRE / DevOps

## Milestones

### 0. Product Spec

- Finalize MVP artifact types: README/product brief, PRD, meeting minutes, and design notes.
- Define the extraction schema for goals, users, features, requirements, risks, tasks, and questions.
- Define role outputs for PM, Engineer, Designer, Legal / Security, and SRE / DevOps.
- Define conflict states: open, assigned, decision proposed, resolved, dismissed.
- Define confirmation rules for impacted roles after PM-approved living brief changes.
- Lock MVP default: PM-approved living brief is canonical.

### 1. Ingestion And Storage

- Add project creation and project switching.
- Add artifact upload with type, owner, timestamp, and version metadata.
- Persist raw artifact content and normalized parsed sections.
- Store extracted entities with source references.
- Store project settings for artifact types, canonical mode, and integration mode.

### 2. Extraction And Role Views

- Parse uploaded artifacts into structured source sections.
- Extract shared product entities from each artifact.
- Generate role-specific outputs:
  - PM: scope, feature status, blockers, conflicts, and decisions needed.
  - Engineer: technical requirements, API/data implications, open questions, and GitHub issue drafts.
  - Designer: user flows, required screens, missing states, copy needs, and design gaps.
  - Legal / Security: data risks, privacy concerns, compliance checklist, and unresolved policy questions.
  - SRE / DevOps: deployment assumptions, infrastructure requirements, incidents, and operational gaps.
- Populate dashboards and inboxes from those outputs.

### 3. Conflict Detection And Resolution

- Detect contradictions between README/product brief, PRD, meeting notes, and design notes.
- Detect contradictions between older and newer versions of the same artifact.
- Show each conflict with issue summary, source snippets, timestamps, impact by role, owner, and suggested next step.
- Allow PM to assign an owner, choose a decision, dismiss a false positive, or mark resolved.
- Apply resolved decisions only through the PM-approved living brief update flow.

### 4. Change Propagation And Confirmations

- Show a proposed-change review before the living brief updates.
- Generate role-specific inbox items when approved changes affect a role.
- Require impacted roles to confirm awareness of approved changes.
- Show PM a confirmation status view by role and feature.
- Keep an audit trail of what changed, who approved it, and who confirmed it.

### 5. Integrations

- MVP: generate GitHub issue drafts from engineering tasks without writing to GitHub.
- Later: create or update GitHub issues only after explicit user confirmation.
- Later: add Figma task extraction for screens, states, and flow gaps.

## MVP Acceptance Criteria

- PM uploads a README/product brief and meeting notes.
- The system extracts product goals, features, requirements, risks, tasks, and open questions.
- The system flags a login-method conflict with source evidence.
- PM resolves the conflict and approves a living brief update.
- Engineer and Designer receive role-specific inbox items about the approved login decision.
- Impacted roles can confirm awareness.
- GitHub output appears only as issue drafts; no external write action occurs.

## Implementation Defaults

- Source of truth: PM-approved living brief.
- First demo conflict: README says email login, meeting notes say Google login.
- UI direction: operational SaaS, dense and calm rather than marketing-style.
- External integrations: disabled for writes by default.

