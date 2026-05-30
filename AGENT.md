Aim: Reduce context gaps in current project management 
Target users: Product Managers 
Description: Interface with a large database of all details about a product (including designs, images, texts, natural language). App development could happen on the back-end, directly linked to a GitHub Repository 

User Flow: 
Product Manager 
- uploads README / product brief
- added into a main database/brain
- app extracts product goals, features, users, requirements, 

Engineer sees (here are some examples, do expand if necessary): 
- core features
- suggested GitHub issues
- open questions 

Designer sees 
- Design brief
- screens needed 
- design gaps 

Legal sees
- risks 
- checklist

After meetings 
- upload meeting minutes
- main product brief is updated 
- other teams are updated of product brief and have to confirm changes made to project (like engineers need to agree to read me changes) so that they are aware of changes and will build/prompt engineer accordingly 


Some Features: 
1. Role-Based Dashboard
- users enter app and choose a role: 
PM - Product scope, feature status, blockers, conflicts 
Designer - User flows, screens needed, Figma tasks, design gaps
Engineer -  Technical requirements, GitHub issues, repo status, API routes, database schema
Legal / Security - Data risks, compliance checklist, privacy concerns
SRE / DevOps - Deployment status, incidents, infra requirements

2. Role-Specific Inbox 

Example: 
My Updates

[High Priority]
- Engineering requirement changed: Login now requires OTP
- Legal risk: User data storage not specified

[For Me]
- Designer: Add error state for failed login
- Engineer: Update auth API to support OTP
- PM: Confirm whether OTP is MVP or post-MVP

[Needs Clarification]
- Conflict: README says email login, meeting notes say phone login

3. Project Timeline + Observability Board

Example: 
Feature: User Login

PM          Designer       Engineer       Legal        SRE
Brief done  Flow pending   API building   Risk check   Deploy pending

4. AI Conflict Resolver 
- detects when different documents or teams disagree

Example: 
Conflicts Detected

[Conflict #1]
Issue: Login method unclear
Found in:
- README: Email login
- Meeting notes: Google login

Impact:
- Engineer cannot build auth flow
- Designer cannot finalise onboarding

Suggested next step:
- Ask PM to choose one login method

[Button] Assign to PM
[Button] Mark as resolved

5. Agent Chat + Workspace Hybrid 
- upload meeting minutes
- AI returns the changes found, and checks whether they should update accordingly 

(good for non technical people)
