# UI/UX Ideas

## Direction

Use an operational SaaS interface: dense, calm, dashboard-first, and optimized for repeated work by PMs, engineers, designers, legal/security reviewers, and SRE teams. The product should feel like a shared command center for product truth, not a marketing site or landing page.

## Information Architecture

- Project switcher: choose the active product workspace.
- Role switcher: PM, Engineer, Designer, Legal / Security, SRE / DevOps.
- Main navigation: Dashboard, Inbox, Conflicts, Artifacts, Timeline.
- Persistent context: current project, current role, latest approved brief version, and pending confirmations.

## Key Screens

### 1. Project Home And Role Entry

- Show project name, latest living brief version, latest approved update, and unresolved conflict count.
- Let users enter through their role while keeping project context visible.
- Remember the user's last role, but make switching roles easy for demos and cross-functional review.

### 2. Role Dashboard

- Lead with "What Changed" and "Top Blockers."
- Show role-specific entities, such as engineer requirements, designer screens, legal risks, or SRE deployment needs.
- Include a PM approval panel so users understand whether changes are draft, in review, approved, or rejected.
- Show open questions and conflict counts without forcing users into the conflict resolver immediately.

![Role dashboard concept](assets/ux-concepts/role-dashboard.png)

### 3. Role Inbox

- Group updates into High Priority, For Me, and Needs Clarification.
- Each item should show source, affected feature, suggested action, owner, timestamp, and acknowledgement state.
- Include a detail panel for source evidence and an explicit Acknowledge action.
- Use inbox status to help the PM see whether impacted teams have read approved changes.

![Role inbox concept](assets/ux-concepts/role-inbox.png)

### 4. Conflict Resolver

- Show the issue statement first, then the source evidence side by side.
- Highlight the conflicting claims, artifact names, timestamps, and owners.
- Summarize impact by role so PMs understand why the conflict matters.
- Provide actions for Assign Owner, Choose Decision, Dismiss, and Mark Resolved.
- Resolved decisions should feed into the PM-approved living brief workflow.

![Conflict resolver concept](assets/ux-concepts/conflict-resolver.png)

### 5. Timeline And Observability Board

- Use features as rows and roles as columns.
- Each cell should show status, next owner, linked evidence, and confirmation state.
- Make blockers and pending acknowledgements scannable from a distance.
- Include an overall progress row so the PM can quickly judge cross-role readiness.

![Timeline board concept](assets/ux-concepts/timeline-board.png)

## Interaction Principles

- Prefer evidence over vague AI confidence: every extracted item should link back to a source artifact.
- Keep PM approval explicit: the living brief should not silently change.
- Make role impact visible: changes should explain who is affected and why.
- Keep confirmations lightweight: one-click acknowledgement with optional notes.
- Make conflicts actionable: every conflict needs an owner, impact, and suggested next step.

## Generated Concept Images

The concept images are saved locally in `assets/ux-concepts/`:

- `role-dashboard.png`: role dashboard with project switcher, role tabs, What Changed, Top Blockers, Core Features, Open Questions, Conflict Count, and PM Approval.
- `role-inbox.png`: inbox grouped by High Priority, For Me, and Needs Clarification, with source badges, affected features, suggested actions, and acknowledgements.
- `conflict-resolver.png`: side-by-side README and Meeting Notes evidence for a login-method conflict, with impact by role and decision controls.
- `timeline-board.png`: feature-by-role status board with evidence links, owners, confirmation markers, and progress.

## Prompt Record

Generation mode: built-in image generation tool.

### Role Dashboard

```text
Use case: ui-mockup
Asset type: project documentation concept image, landscape 16:9
Primary request: high-fidelity operational SaaS web app mockup for Product Brain + Role Dashboards, showing the role dashboard.
Subject: dashboard with project switcher, PM/Engineer/Designer/Legal/SRE tabs, What Changed, Top Blockers, Core Features, Open Questions, Conflict Count, and PM approval status.
Style: realistic polished product UI screenshot, dense but calm operational SaaS, restrained color, crisp typography.
Avoid: landing page, hero section, gradients, oversized cards, abstract decoration.
```

### Role Inbox

```text
Use case: ui-mockup
Asset type: project documentation concept image, landscape 16:9
Primary request: high-fidelity operational SaaS web app mockup for Product Brain + Role Dashboards, showing the role-specific inbox.
Subject: inbox grouped by High Priority, For Me, Needs Clarification; each item shows severity, source badges, affected feature, suggested action, owner, timestamp, and acknowledgement status.
Style: realistic polished product UI screenshot, dense but calm operational SaaS, restrained color, crisp typography.
Avoid: landing page, hero section, gradients, oversized cards, abstract decoration.
```

### Conflict Resolver

```text
Use case: ui-mockup
Asset type: project documentation concept image, landscape 16:9
Primary request: high-fidelity operational SaaS web app mockup for Product Brain + Role Dashboards, showing the conflict resolver.
Subject: side-by-side README and Meeting Notes evidence, login-method conflict, impact by Engineer/Designer/Legal, owner assignment, decision picker, and Mark Resolved action.
Style: realistic polished product UI screenshot, dense but calm operational SaaS, restrained color, crisp typography.
Avoid: landing page, hero section, gradients, oversized cards, abstract decoration.
```

### Timeline Board

```text
Use case: ui-mockup
Asset type: project documentation concept image, landscape 16:9
Primary request: high-fidelity operational SaaS web app mockup for Product Brain + Role Dashboards, showing the timeline and observability board.
Subject: features as rows; PM, Design, Engineering, Legal, and SRE as columns; cells show status pills, owner, evidence link, and confirmation state.
Style: realistic polished product UI screenshot, dense but calm operational SaaS, restrained color, crisp typography.
Avoid: landing page, hero section, gradients, oversized cards, abstract decoration.
```

