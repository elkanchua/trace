# Project Creation Demo Feature

## Demo usefulness

Yes, this is useful for the demo.

This feature shows the main value of Trace in a simple, visual way: a PM starts with a PRD in Notion, then Trace turns that product idea into a connected workspace with product, engineering, and design artifacts already organized in the knowledge base.

For a hackathon demo, this is strong because it gives the audience a clear before-and-after moment:

- Before: the product only exists as a PRD idea.
- During: Trace is creating the ERD, design file, GitHub space, and knowledge base links.
- After: the team lands on a product page where the generated artifacts are already grouped by team.

## Simple demo story

The PM wants to create a new product. Instead of manually setting up Notion, GitHub, Figma, and the product workspace one by one, they start from Trace.

Trace helps them:

1. Generate a Notion PRD link.
2. Open that Notion page so the PM can write or paste the PRD.
3. Return to Trace and press Create product.
4. Watch Trace create the workspace pieces.
5. Land on the new product page with the knowledge base already populated.

## User flow

### 1. Start product creation

The user clicks New Product from the Products page.

They see:

- Product name input.
- A Notion PRD setup section.
- A button to generate the Notion PRD link.

### 2. Generate the Notion PRD

When the user clicks Generate Notion PRD, Trace creates a Notion link for the product PRD.

For the demo, this link can open a real Notion new-page URL in a new tab. The app should clearly show that the PRD has been linked, even if we are not using the Notion API yet.

Visible result:

- The Notion PRD row changes to Linked.
- The user can open the Notion page.
- The Create product button becomes available.

### 3. Create the product

After the PRD is linked, the user clicks Create product.

Trace shows a loading/build screen with progress steps:

- Reading Notion PRD
- Creating ERD
- Creating design file
- Creating GitHub workspace
- Updating knowledge base

This should feel like Trace is assembling the product workspace from the PRD.

### 4. Show the generated product page

After the loading sequence, Trace sends the user to a new product page.

The page should show:

- Product name.
- Discovery status.
- Product team members.
- Knowledge base grouped by Product, Engineering, and Design.
- A Notion PRD artifact.
- An ERD artifact.
- A GitHub repository artifact that can be empty for now.
- A Figma file artifact that can be empty for now.

## Demo implementation notes

For the hackathon demo, the Notion, GitHub, and Figma work can be simulated in the UI.

The important part is not full write-enabled integration yet. The important part is showing the product creation experience and proving the core concept: Trace can turn a PRD into a connected product workspace.

Future production version:

- Use the Notion API to create the PRD page inside the connected workspace.
- Use GitHub API to create or link a repository.
- Use Figma API or template links to create the starter design file.
- Persist the generated product in the database.
- Run the ERD/design generation from an actual AI workflow.

