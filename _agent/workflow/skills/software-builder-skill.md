---
name: Software Builder Pro
description: A comprehensive framework and set of professional standards for planning, architecting, developing, and delivering high-quality software projects.
---

# Software Builder Pro Skill

This skill defines the rigorous, professional workflow expected when building robust software applications. It serves as a guide for approaching complex software projects, ensuring quality, maintainability, and scalability.

## 1. Project Planning & Requirements Analysis

Before writing a single line of code, thorough planning is essential.

*   **Understand the "Why":** Clearly define the business goals or user problems the software solves.
*   **Gather Requirements:** Document functional (what it does) and non-functional (performance, security, usability) requirements.
*   **Create Structured Tasks:** Break down requirements into manageable, actionable components or user stories (e.g., using a `task.md` or similar tracking artifact).
*   **Assess Feasibility & Scope:** Identify potential technical risks, external dependencies, and agree on an MVP (Minimum Viable Product) scope.

## 2. Architecture & System Design

Design for tomorrow, but build for today. Keep architecture as simple as possible while allowing for future growth.

*   **Component Separation:** Enforce clear boundaries between subsystems (e.g., Frontend, API/Backend, Database, External Integrations).
*   **Data Modeling:** Design the database schema or data structures carefully before implementing data access layers.
*   **Technology Selection:** Choose the right tools for the job based on the team's expertise, project requirements, and long-term supportability (e.g., avoiding obscure or deprecated libraries).
*   **Document the Design:** Use diagrams (Mermaid, architecture diagrams) or structured documents (like `implementation_plan.md`) to visualize data flow and component relationships.

## 3. Coding Standards & Best Practices

Consistency and readability are paramount for long-term maintainability.

*   **Follow Established Conventions:** Adhere strictly to language-specific style guides (e.g., PEP 8 for Python, ESLint/Prettier configurations for JavaScript/TypeScript).
*   **Descriptive Naming:** Use clear, unambiguous names for variables, functions, and classes. Avoid confusing abbreviations.
*   **Modularity (DRY & SOLID):** Write small, focused functions. Don't Repeat Yourself. Adhere to SOLID principles where applicable (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).
*   **Error Handling:** Implement robust error catching and handling. Never silently swallow exceptions. Provide meaningful error messages to users and logs for developers.
*   **Security by Default:** Always validate external input. Protect against common vulnerabilities (OWASP Top 10 like XSS, SQL Injection).

## 4. Testing & Quality Assurance

Code is not complete until it is tested.

*   **Write Testable Code:** Design functions that are easy to isolate and test (pure functions, dependency injection).
*   **Unit Testing:** Write fast, targeted tests for individual components and logic functions to verify specific behaviors.
*   **Integration Testing:** Test how components interact with each other (e.g., testing the API endpoints against a test database).
*   **Manual/End-to-End Verification:** Perform high-level walkthroughs of critical user journeys in a staging or development environment before considering a feature "done".
*   **Continuous Integration:** (Where applicable) Ensure all tests run automatically when code is committed.

## 5. Documentation & Delivery

Leave the codebase better than you found it. 

*   **Inline Comments:** Explain *why* complex decisions were made, not *what* the code is doing (the code should explain the *what*).
*   **Readmes & Runbooks:** Maintain an up-to-date `README.md` containing setup instructions, key architecture decisions, and how to run tests.
*   **Clear Commit Messages:** Write descriptive commit messages that explain the context and reasoning behind changes.
*   **Review and Iterate:** Once a feature is "complete", review the implementation against the original requirements and look for areas of optimization before moving to the next task.

## Workflow Execution Steps

When acting as a "Software Builder Pro", constantly cycle through this process:

1.  **Analyze Request:** What is the user asking for? Are requirements clear?
2.  **Plan First:** Do not jump into code. Draft an implementation plan (`implementation_plan.md`) or update the task checklist.
3.  **Execute Deliberately:** Write code following the standards in Section 3.
4.  **Verify Rigorously:** Test the changes, ensuring no regressions.
5.  **Document & Review:** Summarize the changes (e.g., in `walkthrough.md`) and seek user feedback when major milestones are reached.
