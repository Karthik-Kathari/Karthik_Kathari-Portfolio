---
name: professional-ui
description: "Design, refine, or review professional frontend UI in an existing application. Use when working on polished cards, forms, navigation, hover states, responsive layouts, visual hierarchy, animations, accessibility, screenshots, or user-reported visual defects."
argument-hint: "Describe the UI surface, desired visual result, and any reference image or interaction requirement."
user-invocable: true
disable-model-invocation: false
---

# Professional UI Workflow

Create interfaces that feel intentional, usable, and consistent with the application already in front of you. Treat screenshots and concrete visual complaints as behavioral evidence, not as decoration requests.

## When to Use

- Build or refine a frontend section, component, card, form, navigation, or interaction.
- Match a reference image or an existing design language.
- Fix hover, focus, animation, spacing, contrast, overflow, or responsive behavior.
- Add professional feedback states such as loading, success, error, toast, or empty states.
- Review a UI implementation for visual quality and interaction problems.

## Procedure

1. **Anchor on the owning surface**
   - Find the exact component, route, or selector that renders the visible behavior.
   - Read the nearby JSX/HTML and its direct styles before searching broadly.
   - Identify one falsifiable hypothesis about the defect and one cheap check that could disprove it.
   - Check for user edits or dirty-worktree changes before modifying a file.

2. **Extract the visual contract**
   - Record the intended hierarchy: primary action, supporting content, metadata, and secondary actions.
   - Identify the visual states required: default, hover, focus-visible, active, disabled, loading, success, error, and reduced motion where relevant.
   - Note exact requirements from screenshots or the request, including colors, border treatments, dimensions, copy, and interaction timing.
   - Preserve established framework, typography, spacing scale, component APIs, and existing design tokens unless the request requires a deliberate change.

3. **Implement the smallest coherent change**
   - Prefer existing components, icons, utilities, and CSS variables over new abstractions.
   - Use real brand or domain assets when the UI calls for recognizable marks; do not approximate them with unrelated generic icons.
   - Keep interactive controls semantically correct: links navigate, buttons act, forms submit, and inputs have labels and names.
   - Add stable dimensions for cards, buttons, icon controls, grids, and dynamic content so hover states do not shift layout.
   - Use motion sparingly and purposefully. Keep transforms, opacity, and shadows smooth; avoid noisy gradients, excessive glow, or overlapping effects.
   - For hover styling, verify CSS precedence when shared classes or component styles can override utility classes.
   - For forms, include validation, pending feedback, success feedback, error recovery, accessible status text, and a non-JavaScript fallback or clear alternative when appropriate.

4. **Check responsive and accessible behavior**
   - Ensure text fits its container at narrow and wide widths without clipping or overlap.
   - Verify keyboard focus, visible focus rings, pointer targets, semantic labels, alt text, and contrast.
   - Respect `prefers-reduced-motion` for nonessential animations.
   - Check that hover-only information is not the only way to access important content.
   - Confirm external links have appropriate target and `rel` behavior.

5. **Validate the touched slice**
   - Run editor diagnostics or a narrow type/lint check for changed files first.
   - Use a focused behavior test or browser check when available.
   - Inspect the rendered state at desktop and mobile widths when the change is visual or responsive.
   - Run the full build only after the implementation is complete or when the user requests it.
   - Do not repeatedly run expensive builds after every small edit unless a compile check is the only available validation.

6. **Report clearly**
   - Summarize the user-visible result, the files changed, and the validation performed.
   - Mention remaining warnings, required environment setup, or unverified browser-only behavior.
   - Do not claim a screenshot or runtime check was performed unless it actually was.

## Quality Checklist

- The component has a clear visual hierarchy and one obvious primary action.
- Default, hover, focus, active, disabled, loading, success, and error states are intentional.
- Hover effects enhance the target element instead of adding an unrelated overlay.
- Borders, shadows, gradients, and animations do not compete with readable content.
- Text, icons, and controls do not overlap or cause layout shifts.
- The UI remains usable on mobile, keyboard navigation, and reduced-motion settings.
- Existing design conventions and user changes are preserved.
- The final validation matches the risk of the change.
