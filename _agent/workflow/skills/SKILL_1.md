---
name: UI Building
description: Best practices and standard workflow for creating stunning, premium, and dynamic user interfaces using Vanilla HTML, CSS, and JS.
---

# UI Building Skill

This skill provides guidelines and best practices for creating stunning, modern user interfaces that wow the user. Always prioritize rich aesthetics over simple or basic Minimum Viable Products (MVPs).

## 1. Core Technologies
- **Structure**: Use semantic HTML5 elements.
- **Styling**: Use Vanilla CSS for maximum flexibility and control. Avoid TailwindCSS unless explicitly requested by the user.
- **Logic**: Use Vanilla JavaScript for DOM manipulation and state.

## 2. Design Aesthetics & Visual Excellence
The UI must look premium and state-of-the-art.
- **Color Palettes**: Avoid generic colors (plain red, blue, green). Use curated, harmonious color palettes (e.g., HSL tailored colors, sleek dark modes, and glassmorphism themes).
- **Typography**: Integrate modern typography directly from Google Fonts (e.g., Inter, Roboto, Outfit). Do not rely on default browser fonts.
- **Gradients & Shadows**: Implement smooth, subtle gradients and soft, layered box-shadows to create a sense of depth and hierarchy.

## 3. Dynamic Interactive Design
Interfaces should feel responsive and alive to encourage interaction.
- **Hover & Active States**: Every interactive element (buttons, links, image cards) must exhibit clear, distinct hover and active states.
- **Micro-animations**: Add subtle transition effects (e.g., `transition: all 0.3s ease-in-out; transform: translateY(-2px);`) to elements that change state. Elevate user experience with smooth interactions.
- **Loading & Feedback**: Dynamically provide visual feedback during processing or data fetching phases.

## 4. Implementation Workflow
1. **Plan and Understand**: Fully outline the features needed and draw inspiration from modern web designs.
2. **Build the Foundation**: Start with `index.css`. Implement your core design system (CSS variables for tokens like primary colors, accent colors, specific font families, and consistent paddings).
3. **Create Components**: Build isolated, semantic HTML structures styled with your predefined CSS variables, keeping components reusable.
4. **Assemble Pages**: Assemble components into unified, responsive layouts using native CSS features like Flexbox or Grid.
5. **Polish and Optimize**: Review hover states, apply micro-animations, ensure smooth transitions, and optimize overall performance.

## 5. SEO & Accessibility Best Practices
Automatically implement SEO best practices and semantics on every structured page:
- **Title tags & Meta Descriptions**: Provide descriptive and compelling meta tags.
- **Heading Structure**: Stick to a single `<h1>` tag per page and maintain a strict heading hierarchy.
- **Semantic HTML**: Use proper roles, ARIA attributes when beneficial, and meaningful structural tags (`<main>`, `<section>`, `<article>`).
- **Unique IDs**: Ensure all interactive or dynamically driven elements have unique, descriptive IDs to facilitate robust automated testing.

## Example Integration
When tasked to "Refresh the UI" or "Build a new modal wrapper":
1. Review the existing color variables and typography scale.
2. Outline the DOM with valid semantic elements.
3. Attach utility-focused, yet customized Vanilla CSS classes, establishing base, hover, and active states.
4. Ensure animations are smooth without hurting performance or accessibility (respecting `prefers-reduced-motion` if required).
