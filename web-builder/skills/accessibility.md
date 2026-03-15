# Accessibility — D57 Agentic Website Builder

## Role

You enforce WCAG 2.1 AA compliance in all generated code. Every interactive element must be keyboard navigable, screen reader compatible, and meet contrast requirements. Accessibility is not optional — it is a baseline requirement for every page, component, and interaction you generate. When in doubt, choose the more accessible approach.

---

## WCAG 2.1 AA Requirements Summary

### 1. Perceivable — Users must be able to perceive all content

| Criterion | ID | Requirement |
|-----------|-----|-------------|
| Text Alternatives | 1.1.1 | All non-text content (images, icons, charts) has a text alternative |
| Captions | 1.2.2 | Pre-recorded video with audio has captions |
| Audio Description | 1.2.5 | Pre-recorded video has audio description (AA) |
| Info and Relationships | 1.3.1 | Content structure (headings, lists, tables) is programmatically determinable |
| Meaningful Sequence | 1.3.2 | Reading order is logical and programmatically determinable |
| Sensory Characteristics | 1.3.3 | Instructions do not rely solely on shape, color, size, or location |
| Orientation | 1.3.4 | Content is not restricted to a single display orientation |
| Input Purpose | 1.3.5 | Input fields for user data have programmatically identified purpose (autocomplete) |
| Contrast (Minimum) | 1.4.3 | Text has at least 4.5:1 contrast ratio (3:1 for large text) |
| Resize Text | 1.4.4 | Text can be resized up to 200% without loss of functionality |
| Images of Text | 1.4.5 | Text is used instead of images of text (with limited exceptions) |
| Reflow | 1.4.10 | Content reflows at 320px width without horizontal scrolling |
| Non-text Contrast | 1.4.11 | UI components and graphics have at least 3:1 contrast |
| Text Spacing | 1.4.12 | Content adapts to user text spacing adjustments without loss |
| Content on Hover or Focus | 1.4.13 | Hover/focus-triggered content is dismissible, hoverable, and persistent |

### 2. Operable — Users must be able to operate the interface

| Criterion | ID | Requirement |
|-----------|-----|-------------|
| Keyboard | 2.1.1 | All functionality is available via keyboard |
| No Keyboard Trap | 2.1.2 | Keyboard focus is never trapped (except modals with proper handling) |
| Timing Adjustable | 2.2.1 | Time limits can be turned off, adjusted, or extended |
| Pause, Stop, Hide | 2.2.2 | Auto-moving content can be paused, stopped, or hidden |
| Three Flashes | 2.3.1 | No content flashes more than 3 times per second |
| Bypass Blocks | 2.4.1 | Skip navigation link to bypass repeated content |
| Page Titled | 2.4.2 | Pages have descriptive, unique titles |
| Focus Order | 2.4.3 | Focus order is logical and meaningful |
| Link Purpose | 2.4.4 | Link purpose is determinable from link text (or context) |
| Multiple Ways | 2.4.5 | More than one way to locate pages (nav, search, sitemap) |
| Headings and Labels | 2.4.6 | Headings and labels describe topic or purpose |
| Focus Visible | 2.4.7 | Keyboard focus indicator is visible |
| Pointer Gestures | 2.5.1 | Multi-point gestures have single-pointer alternatives |
| Pointer Cancellation | 2.5.2 | Actions trigger on up-event, not down-event |
| Label in Name | 2.5.3 | Accessible name contains the visible label text |
| Motion Actuation | 2.5.4 | Motion-triggered actions have conventional alternatives |

### 3. Understandable — Users must be able to understand the content

| Criterion | ID | Requirement |
|-----------|-----|-------------|
| Language of Page | 3.1.1 | Default language is programmatically identified |
| Language of Parts | 3.1.2 | Language of content sections is identified when different from page |
| On Focus | 3.2.1 | Focusing an element does not trigger unexpected context changes |
| On Input | 3.2.2 | Changing a setting does not trigger unexpected context changes |
| Consistent Navigation | 3.2.3 | Navigation is consistent across pages |
| Consistent Identification | 3.2.4 | Components with same function are identified consistently |
| Error Identification | 3.3.1 | Input errors are identified and described in text |
| Labels or Instructions | 3.3.2 | Input fields have labels or instructions |
| Error Suggestion | 3.3.3 | Error messages suggest corrections when possible |
| Error Prevention | 3.3.4 | Legal/financial/data submissions are reversible, verified, or confirmed |

### 4. Robust — Content must work with assistive technologies

| Criterion | ID | Requirement |
|-----------|-----|-------------|
| Parsing | 4.1.1 | HTML is well-formed (no duplicate IDs, proper nesting) |
| Name, Role, Value | 4.1.2 | All UI components have accessible name, role, and state |
| Status Messages | 4.1.3 | Status messages are programmatically identified without focus |

---

## Color Contrast Rules

### Minimum Ratios

| Element Type | AA Minimum | AAA Target | How to Verify |
|-------------|-----------|------------|---------------|
| Normal text (<18px / <14px bold) | 4.5:1 | 7:1 | Check foreground against immediate background |
| Large text (>=18px bold or >=24px) | 3:1 | 4.5:1 | Headings and large UI text |
| UI components (borders, icons) | 3:1 | 3:1 | Buttons borders, form outlines, icons conveying meaning |
| Focus indicators | 3:1 | 3:1 | Must contrast against both the component AND the background |
| Graphical objects | 3:1 | 3:1 | Charts, infographics, meaningful graphics |
| Placeholder text | 4.5:1 | 7:1 | Placeholders must be readable (never rely on them as labels) |

### What to Verify in Every Design

1. **Body text on page background** — most common contrast check
2. **Body text on card backgrounds** — cards often have different background colors
3. **CTA button text on button background** — e.g., white text on primary color
4. **Link text on its background** — links must also be distinguishable from surrounding text (use underline)
5. **Muted/secondary text on background** — gray text is the most common contrast failure
6. **Text on images or gradients** — add overlay or text shadow to ensure readability
7. **Disabled state text** — disabled elements are exempt from contrast requirements, but should still be perceivable
8. **Error/success/warning text** — status colors on their respective backgrounds
9. **Navigation text on header background** — especially with transparent/blur headers
10. **Footer text on footer background** — footers often use different color schemes

### Contrast in Code

```css
/* Use CSS custom properties for theme colors — pre-validated for contrast */
:root {
  --background: #ffffff;
  --foreground: #0f172a;      /* 15.4:1 on white — passes AAA */
  --muted: #64748b;           /* 4.6:1 on white — passes AA */
  --primary: #1e40af;         /* 7.2:1 on white — passes AAA */
  --primary-foreground: #ffffff; /* Verify against --primary */
  --destructive: #b91c1c;     /* 5.7:1 on white — passes AA */
  --ring: #1e40af;            /* Focus ring color — 3:1 min on background */
}

/* NEVER do this — gray text on slightly gray background */
/* .bad-example { color: #9ca3af; background: #f3f4f6; } — 2.1:1 FAILS */
```

### Text Over Images

```html
<!-- Always use an overlay to guarantee contrast -->
<div class="relative">
  <img src="/hero.webp" alt="" class="h-full w-full object-cover" aria-hidden="true" />
  <div class="absolute inset-0 bg-black/60"></div> <!-- Dark overlay for white text -->
  <div class="relative z-10 text-white">
    <h1>Heading is readable on any image</h1>
  </div>
</div>
```

---

## Semantic HTML Requirements

### Document Structure

```html
<!DOCTYPE html>
<html lang="es"> <!-- or "en" — ALWAYS set the page language -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>Page Title — Brand Name</title> <!-- Unique, descriptive title per page -->
</head>
<body>
  <!-- Skip navigation link — MUST be the first focusable element -->
  <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white">
    Skip to main content
  </a>

  <header>
    <nav aria-label="Main navigation">
      <!-- Primary navigation -->
    </nav>
  </header>

  <main id="main-content">
    <!-- Primary page content — ONE <main> per page -->

    <article>
      <!-- Self-contained content (blog post, product card) -->
    </article>

    <section aria-labelledby="services-heading">
      <!-- Thematic grouping — MUST have a heading -->
      <h2 id="services-heading">Our Services</h2>
    </section>

    <aside aria-label="Related resources">
      <!-- Tangentially related content -->
    </aside>
  </main>

  <footer>
    <nav aria-label="Footer navigation">
      <!-- Secondary navigation -->
    </nav>
    <address>
      <!-- Contact information -->
    </address>
  </footer>
</body>
</html>
```

### Element Reference

| Element | Purpose | Rules |
|---------|---------|-------|
| `<header>` | Site header | Contains logo, primary navigation; one per page (or per `<article>`) |
| `<nav>` | Navigation region | Use `aria-label` when there are multiple `<nav>` elements on the page |
| `<main>` | Primary content | Exactly ONE per page; receives the skip-link target |
| `<article>` | Self-contained content | Blog posts, products, comments — each can have own header/footer |
| `<section>` | Thematic grouping | MUST have a heading (`<h2>`-`<h6>`) or `aria-labelledby` |
| `<aside>` | Tangential content | Sidebars, related links, callouts |
| `<footer>` | Site footer | Contains secondary nav, legal, contact info |
| `<h1>`-`<h6>` | Heading hierarchy | Never skip levels (h1 -> h3); one `<h1>` per page |
| `<p>` | Paragraphs | Use for body text; never use `<div>` for text content |
| `<ul>` / `<ol>` | Lists | Unordered for groups, ordered for sequences/rankings |
| `<a>` | Links | `href` required; descriptive text (never "click here") |
| `<button>` | Actions | `type="button"` for non-submit; never use `<div>` or `<span>` as button |
| `<form>` | Forms | Every input needs a `<label>`; group related inputs with `<fieldset>` |
| `<figure>` / `<figcaption>` | Images with captions | Wraps image + caption together semantically |
| `<time>` | Dates and times | Include `datetime` attribute: `<time datetime="2026-03-14">March 14</time>` |
| `<address>` | Contact information | For the nearest `<article>` or `<body>` ancestor |
| `<details>` / `<summary>` | Disclosure widget | Native expandable/collapsible — no JS or ARIA needed |
| `<dialog>` | Modal dialog | Native modal support — prefer over custom ARIA modals |
| `<abbr>` | Abbreviation | Include `title` attribute: `<abbr title="Search Engine Optimization">SEO</abbr>` |

### Heading Hierarchy Rules

```html
<!-- CORRECT: Logical hierarchy, no skipped levels -->
<h1>Page Title</h1>
  <h2>Section One</h2>
    <h3>Subsection</h3>
    <h3>Subsection</h3>
  <h2>Section Two</h2>
    <h3>Subsection</h3>
      <h4>Sub-subsection</h4>

<!-- INCORRECT: Skipped level (h1 → h3) -->
<h1>Page Title</h1>
  <h3>Section One</h3> <!-- ERROR: h2 is skipped -->
```

- Every page MUST have exactly one `<h1>`.
- Headings must follow a logical descending order: h1 > h2 > h3 > h4 > h5 > h6.
- Never use headings for visual styling — use CSS classes instead.
- Never skip heading levels (e.g., h2 followed directly by h4).

---

## ARIA Patterns

### First Rule of ARIA

**Do not use ARIA if a native HTML element or attribute achieves the same result.** ARIA adds complexity and can break assistive technology if used incorrectly. Prefer semantic HTML first.

| Instead of ARIA... | Use native HTML |
|-------------------|-----------------|
| `role="button"` on a `<div>` | `<button>` |
| `role="link"` on a `<span>` | `<a href="...">` |
| `role="navigation"` on a `<div>` | `<nav>` |
| `role="heading" aria-level="2"` | `<h2>` |
| `role="list"` on a `<div>` | `<ul>` or `<ol>` |
| `role="checkbox"` on a `<span>` | `<input type="checkbox">` |
| Custom disclosure with ARIA | `<details>` / `<summary>` |
| Custom dialog with ARIA roles | `<dialog>` |

### Navigation

```html
<!-- Primary navigation with current page indicated -->
<nav aria-label="Main navigation">
  <ul class="flex items-center gap-6" role="list">
    <li><a href="/" aria-current="page" class="font-semibold text-primary">Home</a></li>
    <li><a href="/services" class="text-gray-700 hover:text-primary">Services</a></li>
    <li><a href="/about" class="text-gray-700 hover:text-primary">About</a></li>
    <li><a href="/contact" class="text-gray-700 hover:text-primary">Contact</a></li>
  </ul>
</nav>

<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
  <ol class="flex items-center gap-2 text-sm" role="list">
    <li><a href="/" class="text-gray-500 hover:text-gray-700">Home</a></li>
    <li aria-hidden="true" class="text-gray-400">/</li>
    <li><a href="/services" class="text-gray-500 hover:text-gray-700">Services</a></li>
    <li aria-hidden="true" class="text-gray-400">/</li>
    <li><a href="/services/web-design" aria-current="page" class="font-medium text-gray-900">Web Design</a></li>
  </ol>
</nav>

<!-- Mobile menu with expanded state -->
<button
  type="button"
  aria-expanded="false"
  aria-controls="mobile-menu"
  aria-label="Toggle navigation menu"
  class="lg:hidden"
>
  <svg aria-hidden="true"><!-- hamburger icon --></svg>
</button>
<nav id="mobile-menu" class="hidden lg:hidden" aria-label="Mobile navigation">
  <!-- Menu items -->
</nav>
```

### Buttons and Toggles

```html
<!-- Button with icon only — MUST have aria-label -->
<button
  type="button"
  aria-label="Close dialog"
  class="inline-flex h-11 w-11 items-center justify-center rounded-md"
>
  <svg class="h-5 w-5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>

<!-- Toggle button with state -->
<button
  type="button"
  aria-pressed="false"
  class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors"
>
  <span class="sr-only">Enable notifications</span>
  <span class="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform" aria-hidden="true"></span>
</button>

<!-- Expandable section trigger -->
<button
  type="button"
  aria-expanded="false"
  aria-controls="faq-answer-1"
  class="flex w-full items-center justify-between py-4 text-left"
>
  <span class="text-base font-medium">Frequently asked question?</span>
  <svg class="h-5 w-5 shrink-0 transition-transform" aria-hidden="true"><!-- chevron --></svg>
</button>
<div id="faq-answer-1" class="hidden pb-4 text-gray-600" role="region">
  <p>The answer to the question goes here.</p>
</div>
```

### Forms

```html
<form novalidate>
  <!-- Text input with label, error, and description -->
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">
      Email Address
      <span class="text-red-600" aria-hidden="true">*</span>
    </label>
    <p id="email-description" class="mt-1 text-sm text-gray-500">
      We will use this to send your confirmation.
    </p>
    <input
      type="email"
      id="email"
      name="email"
      required
      autocomplete="email"
      aria-required="true"
      aria-describedby="email-description email-error"
      aria-invalid="false"
      class="mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    />
    <!-- Error message — hidden by default, shown on validation failure -->
    <p id="email-error" class="mt-1 hidden text-sm text-red-600" role="alert">
      Please enter a valid email address (e.g., name@example.com).
    </p>
  </div>

  <!-- Select with label -->
  <div>
    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
    <select
      id="country"
      name="country"
      autocomplete="country-name"
      class="mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 text-base"
    >
      <option value="">Select a country</option>
      <option value="MX">Mexico</option>
      <option value="CO">Colombia</option>
      <option value="US">United States</option>
    </select>
  </div>

  <!-- Checkbox group with fieldset -->
  <fieldset>
    <legend class="text-sm font-medium text-gray-700">Services of Interest</legend>
    <div class="mt-2 space-y-2">
      <label class="flex items-center gap-3">
        <input type="checkbox" name="services" value="web-design" class="h-5 w-5 rounded border-gray-300 text-primary" />
        <span class="text-sm text-gray-700">Web Design</span>
      </label>
      <label class="flex items-center gap-3">
        <input type="checkbox" name="services" value="seo" class="h-5 w-5 rounded border-gray-300 text-primary" />
        <span class="text-sm text-gray-700">SEO Optimization</span>
      </label>
    </div>
  </fieldset>

  <!-- Radio group with fieldset -->
  <fieldset>
    <legend class="text-sm font-medium text-gray-700">Preferred Contact Method</legend>
    <div class="mt-2 space-y-2">
      <label class="flex items-center gap-3">
        <input type="radio" name="contact-method" value="email" class="h-5 w-5 border-gray-300 text-primary" />
        <span class="text-sm text-gray-700">Email</span>
      </label>
      <label class="flex items-center gap-3">
        <input type="radio" name="contact-method" value="phone" class="h-5 w-5 border-gray-300 text-primary" />
        <span class="text-sm text-gray-700">Phone</span>
      </label>
      <label class="flex items-center gap-3">
        <input type="radio" name="contact-method" value="whatsapp" class="h-5 w-5 border-gray-300 text-primary" />
        <span class="text-sm text-gray-700">WhatsApp</span>
      </label>
    </div>
  </fieldset>

  <button
    type="submit"
    class="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-white sm:w-auto"
  >
    Submit
  </button>
</form>
```

### Autocomplete Attributes (Required for Personal Data Fields)

| Field | autocomplete Value |
|-------|-------------------|
| Full name | `name` |
| First name | `given-name` |
| Last name | `family-name` |
| Email | `email` |
| Phone | `tel` |
| Street address | `street-address` |
| City | `address-level2` |
| State/Province | `address-level1` |
| Postal code | `postal-code` |
| Country | `country-name` |
| Credit card number | `cc-number` |
| Expiration date | `cc-exp` |
| Organization | `organization` |
| Job title | `organization-title` |

### Live Regions

```html
<!-- Polite: announces when the screen reader finishes current task -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  <!-- Dynamically insert status updates here -->
  <!-- Example: "Form submitted successfully" -->
  <!-- Example: "3 search results found" -->
</div>

<!-- Assertive: interrupts the screen reader immediately -->
<div aria-live="assertive" aria-atomic="true" class="sr-only">
  <!-- Only for critical alerts -->
  <!-- Example: "Session expiring in 2 minutes" -->
  <!-- Example: "Error: payment failed" -->
</div>

<!-- Status role (implicitly polite) — for ongoing status -->
<div role="status" class="text-sm text-gray-600">
  Showing 1-10 of 42 results
</div>

<!-- Alert role (implicitly assertive) — for error messages -->
<div role="alert" class="rounded-md border border-red-200 bg-red-50 p-4">
  <p class="text-sm text-red-800">An error occurred. Please try again.</p>
</div>
```

### Dialogs and Modals

```html
<!-- Native dialog element (preferred over custom ARIA modals) -->
<dialog
  id="confirm-dialog"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
  class="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-xl backdrop:bg-black/50"
>
  <h2 id="dialog-title" class="text-lg font-semibold">Confirm Action</h2>
  <p id="dialog-description" class="mt-2 text-sm text-gray-600">
    Are you sure you want to proceed? This action cannot be undone.
  </p>
  <div class="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
    <button
      type="button"
      class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white"
      autofocus
    >
      Confirm
    </button>
    <button
      type="button"
      class="inline-flex h-11 items-center justify-center rounded-md border px-4 text-sm font-medium text-gray-700"
      onclick="this.closest('dialog').close()"
    >
      Cancel
    </button>
  </div>
</dialog>
```

**Modal behavior requirements:**
1. **Focus trap** — Tab cycles within the modal only; focus does not escape to background content
2. **Focus on open** — Focus moves to the first focusable element (or the dialog itself)
3. **Focus on close** — Focus returns to the element that triggered the modal
4. **Escape to close** — Pressing Escape closes the modal (native `<dialog>` handles this)
5. **Background scroll lock** — Background content does not scroll while modal is open
6. **Background inert** — Background content is not interactive (native `<dialog>` handles this)

### Tabs

```html
<div>
  <!-- Tab list -->
  <div role="tablist" aria-label="Account settings">
    <button
      role="tab"
      id="tab-profile"
      aria-selected="true"
      aria-controls="panel-profile"
      tabindex="0"
      class="border-b-2 border-primary px-4 py-2 text-sm font-medium text-primary"
    >
      Profile
    </button>
    <button
      role="tab"
      id="tab-security"
      aria-selected="false"
      aria-controls="panel-security"
      tabindex="-1"
      class="border-b-2 border-transparent px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      Security
    </button>
    <button
      role="tab"
      id="tab-billing"
      aria-selected="false"
      aria-controls="panel-billing"
      tabindex="-1"
      class="border-b-2 border-transparent px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      Billing
    </button>
  </div>

  <!-- Tab panels -->
  <div
    role="tabpanel"
    id="panel-profile"
    aria-labelledby="tab-profile"
    tabindex="0"
    class="py-4"
  >
    <p>Profile settings content.</p>
  </div>
  <div
    role="tabpanel"
    id="panel-security"
    aria-labelledby="tab-security"
    tabindex="0"
    class="hidden py-4"
  >
    <p>Security settings content.</p>
  </div>
  <div
    role="tabpanel"
    id="panel-billing"
    aria-labelledby="tab-billing"
    tabindex="0"
    class="hidden py-4"
  >
    <p>Billing settings content.</p>
  </div>
</div>
```

**Tab interaction rules:**
- Arrow Left/Right moves between tabs
- Only the active tab has `tabindex="0"`; inactive tabs have `tabindex="-1"`
- `aria-selected="true"` on the active tab
- Tab panel is linked via `aria-controls` on the tab and `aria-labelledby` on the panel

### Accordion / Disclosure

```html
<!-- Prefer native <details>/<summary> — no ARIA or JS needed -->
<div class="divide-y rounded-lg border">
  <details class="group">
    <summary class="flex cursor-pointer items-center justify-between px-4 py-4 text-base font-medium text-gray-900">
      What services do you offer?
      <svg class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </summary>
    <div class="px-4 pb-4 text-sm text-gray-600">
      <p>We offer web design, SEO optimization, and digital marketing services.</p>
    </div>
  </details>

  <details class="group">
    <summary class="flex cursor-pointer items-center justify-between px-4 py-4 text-base font-medium text-gray-900">
      How long does a project take?
      <svg class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </summary>
    <div class="px-4 pb-4 text-sm text-gray-600">
      <p>Typical projects take 2-4 weeks depending on scope and complexity.</p>
    </div>
  </details>
</div>
```

### Carousel / Slider

```html
<section aria-label="Customer testimonials" aria-roledescription="carousel">
  <div class="flex items-center justify-between">
    <h2 class="text-2xl font-bold">What Our Clients Say</h2>
    <div class="flex gap-2">
      <button
        type="button"
        aria-label="Previous testimonial"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full border"
      >
        <svg class="h-5 w-5" aria-hidden="true"><!-- left arrow --></svg>
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full border"
      >
        <svg class="h-5 w-5" aria-hidden="true"><!-- right arrow --></svg>
      </button>
    </div>
  </div>

  <!-- Slides container -->
  <div class="mt-6" aria-live="polite">
    <div role="group" aria-roledescription="slide" aria-label="Testimonial 1 of 3">
      <blockquote class="rounded-xl border p-6">
        <p class="text-gray-700">"Excellent service and beautiful design."</p>
        <footer class="mt-4">
          <cite class="text-sm font-medium text-gray-900">Maria G.</cite>
          <p class="text-sm text-gray-500">CEO, Company Name</p>
        </footer>
      </blockquote>
    </div>
  </div>

  <!-- Slide indicators -->
  <div class="mt-4 flex justify-center gap-2" role="tablist" aria-label="Testimonial slides">
    <button role="tab" aria-selected="true" aria-label="Show testimonial 1" class="h-2 w-8 rounded-full bg-primary"></button>
    <button role="tab" aria-selected="false" aria-label="Show testimonial 2" class="h-2 w-8 rounded-full bg-gray-300"></button>
    <button role="tab" aria-selected="false" aria-label="Show testimonial 3" class="h-2 w-8 rounded-full bg-gray-300"></button>
  </div>
</section>
```

**Carousel requirements:**
- Must have pause/stop control if auto-advancing
- Must have button-based navigation (not just swipe)
- Must announce current slide to screen readers (`aria-live="polite"`)
- Auto-advancing must pause on hover AND focus

---

## Keyboard Navigation

### Focus Management Rules

1. **All interactive elements must be focusable** — links, buttons, inputs, selects, textareas
2. **Focus order follows visual order** — never use `tabindex` values greater than 0
3. **Skip link is the first focusable element** — "Skip to main content" link
4. **Focus trap in modals** — Tab cycles within the modal, never escaping to background
5. **Focus restoration** — when a modal/dialog closes, focus returns to the trigger element
6. **Visible focus indicator** — 2px solid outline with 3:1 contrast ratio against background, with offset
7. **No keyboard traps** — user must always be able to navigate away using standard keys

### Keyboard Interaction Table

| Key | Expected Action |
|-----|----------------|
| Tab | Move focus to next focusable element |
| Shift + Tab | Move focus to previous focusable element |
| Enter | Activate links; submit forms; activate buttons |
| Space | Activate buttons; toggle checkboxes; select radio buttons |
| Escape | Close modals, menus, popovers, and dropdowns |
| Arrow Up/Down | Navigate within vertical menus, listboxes, and selects |
| Arrow Left/Right | Navigate within tabs, horizontal menus |
| Home | Move to first item in a list/menu |
| End | Move to last item in a list/menu |

### Focus Styles

```css
/* Custom focus indicator — visible, high contrast */
:focus-visible {
  outline: 2px solid var(--ring, #1e40af);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove default browser outline — only when :focus-visible is supported */
:focus:not(:focus-visible) {
  outline: none;
}

/* For dark backgrounds — light focus ring */
.dark-section :focus-visible {
  outline-color: #ffffff;
}

/* Focus within — for custom components */
.custom-input:focus-within {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Skip Navigation Link

```html
<!-- MUST be the very first focusable element in the DOM -->
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg"
>
  Skip to main content
</a>

<!-- Target element -->
<main id="main-content" tabindex="-1">
  <!-- tabindex="-1" allows programmatic focus but removes from Tab order -->
</main>
```

### Focus Trap for Modals (JavaScript Pattern)

```javascript
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });

  // Focus the first element
  firstFocusable.focus();
}
```

---

## Form Accessibility

### Complete Rules

1. **Every input MUST have a visible `<label>`** — placeholders are NOT labels; they disappear on focus
2. **Error messages MUST be linked via `aria-describedby`** — screen readers must announce the error
3. **Required fields indicated BOTH visually AND programmatically** — use `aria-required="true"` plus a visual indicator
4. **Error states announced immediately** — use `role="alert"` or `aria-live="assertive"` for error containers
5. **Validation messages MUST be specific** — "Email must include @" not "Invalid input"
6. **Autocomplete attributes on all personal data fields** — enables autofill for users with motor disabilities
7. **Input type must match content** — `type="email"` for emails, `type="tel"` for phones, etc.
8. **Never use `placeholder` as the only label** — it fails multiple WCAG criteria
9. **Group related inputs with `<fieldset>` and `<legend>`** — radio groups, checkbox groups, address fields
10. **Submit buttons must have clear, descriptive text** — "Send Message" not "Submit"

### Input Types

| Content | HTML Input Type | Keyboard on Mobile |
|---------|----------------|-------------------|
| Email address | `type="email"` | Email keyboard (@ key visible) |
| Phone number | `type="tel"` | Numeric keypad |
| URL | `type="url"` | URL keyboard (/ key visible) |
| Number | `type="number"` | Numeric keypad |
| Search | `type="search"` | Standard keyboard with search action |
| Password | `type="password"` | Standard keyboard, input masked |
| Date | `type="date"` | Native date picker |

### Error Handling Pattern

```html
<!-- Input in error state -->
<div>
  <label for="phone" class="block text-sm font-medium text-gray-700">
    Phone Number <span class="text-red-600" aria-hidden="true">*</span>
  </label>
  <input
    type="tel"
    id="phone"
    name="phone"
    required
    autocomplete="tel"
    aria-required="true"
    aria-invalid="true"
    aria-describedby="phone-error"
    class="mt-1 block h-12 w-full rounded-md border-2 border-red-500 px-4 text-base focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
    value="123"
  />
  <!-- Error icon + text (not just color) -->
  <p id="phone-error" class="mt-1 flex items-center gap-1 text-sm text-red-600" role="alert">
    <svg class="h-4 w-4 shrink-0" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
    Phone number must be 10 digits (e.g., 55 1234 5678).
  </p>
</div>
```

### Form Submission Feedback

```html
<!-- Success message after form submission -->
<div role="alert" class="rounded-md border border-green-200 bg-green-50 p-4">
  <div class="flex items-start gap-3">
    <svg class="h-5 w-5 shrink-0 text-green-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
    <div>
      <h3 class="text-sm font-medium text-green-800">Message sent successfully</h3>
      <p class="mt-1 text-sm text-green-700">We will get back to you within 24 hours.</p>
    </div>
  </div>
</div>
```

---

## Image Accessibility

### Alt Text Rules

| Image Type | Alt Text Rule | Example |
|-----------|---------------|---------|
| **Informative** | Describe the content and purpose | `alt="Team of five designers working in the Digital57 office"` |
| **Decorative** | Empty alt (not missing!) | `alt=""` plus `aria-hidden="true"` |
| **Functional** (inside link/button) | Describe the ACTION, not the image | `alt="Go to homepage"` (for logo link) |
| **Complex** (chart, graph, diagram) | Brief alt + detailed text description nearby | `alt="Q1 2026 revenue chart"` + `<figcaption>` with data |
| **Text in image** | Repeat the text exactly | `alt="50% off all services this month"` |
| **Icon with text** | Hide icon from AT | `aria-hidden="true"` on the icon SVG |
| **Icon without text** | Icon needs a label | Use `aria-label` on the parent button/link |
| **Background/hero** | Decorative — use CSS background or `alt=""` | Empty alt if purely atmospheric |
| **Product photo** | Describe the product | `alt="Navy blue leather crossbody bag with gold hardware"` |
| **Person photo** | Name and context | `alt="Maria Gonzalez, CEO of Digital57"` |

### Implementation Examples

```html
<!-- Informative image -->
<img
  src="/team-photo.webp"
  alt="Our team of designers and developers collaborating in the Digital57 Mexico City office"
  class="h-auto w-full rounded-lg"
  loading="lazy"
/>

<!-- Decorative image (purely visual) -->
<img
  src="/abstract-pattern.webp"
  alt=""
  aria-hidden="true"
  class="absolute inset-0 h-full w-full object-cover opacity-10"
  loading="lazy"
/>

<!-- Functional image (logo as link) -->
<a href="/" aria-label="Digital57 — Go to homepage">
  <img src="/logo.svg" alt="" class="h-8 w-auto" /> <!-- alt="" because aria-label on the <a> is sufficient -->
</a>

<!-- Complex image with description -->
<figure>
  <img
    src="/revenue-chart.webp"
    alt="Revenue growth chart showing 35% increase from Q1 to Q4 2025"
    class="w-full"
  />
  <figcaption class="mt-2 text-sm text-gray-600">
    Revenue grew from $120K in Q1 to $162K in Q4, driven primarily by web development services
    which accounted for 60% of total revenue.
  </figcaption>
</figure>

<!-- SVG icon with visible text label — hide icon from AT -->
<button type="button" class="inline-flex items-center gap-2">
  <svg class="h-5 w-5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
  <span>Add to Favorites</span>
</button>

<!-- SVG icon WITHOUT text — icon needs accessible name -->
<button type="button" aria-label="Add to favorites" class="inline-flex h-11 w-11 items-center justify-center">
  <svg class="h-5 w-5" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
</button>
```

---

## Motion and Animation

### Reduced Motion (Required)

```css
/* All animations MUST respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Animation Rules

| Rule | Rationale |
|------|-----------|
| All animations must respect `prefers-reduced-motion` | Users with vestibular disorders can experience nausea and disorientation from motion |
| No content conveyed ONLY through animation | Information must be available statically |
| No auto-playing carousels without a pause/stop button | Users must control moving content (WCAG 2.2.2) |
| No flashing content (>3 flashes per second) | Can trigger seizures in users with photosensitive epilepsy (WCAG 2.3.1) |
| Transitions should be 150-300ms | Fast enough to feel responsive, slow enough to be perceivable |
| Use `transform` and `opacity` for animations | These properties are GPU-accelerated and do not trigger layout recalculation |
| Scroll-triggered animations must not cause content to be invisible until scrolled | Content must be visible even if animations fail to trigger |

### Safe Animation Patterns

```css
/* Fade-in that respects reduced motion */
.fade-in {
  opacity: 0;
  transition: opacity 300ms ease-out;
}

.fade-in.visible {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    opacity: 1; /* Content visible immediately */
    transition: none;
  }
}

/* Subtle hover effect */
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgb(0 0 0 / 0.1);
}

@media (prefers-reduced-motion: reduce) {
  .card:hover {
    transform: none; /* No movement */
    /* Shadow change is fine — it's not motion */
  }
}
```

### Tailwind Motion-Safe Utilities

```html
<!-- Only animate if the user has not requested reduced motion -->
<div class="opacity-0 transition-opacity duration-300 motion-safe:animate-fade-in">
  Content that fades in
</div>

<!-- Alternative: motion-reduce to provide a static alternative -->
<div class="motion-reduce:opacity-100 motion-reduce:transition-none opacity-0 transition-opacity duration-300">
  Content
</div>
```

---

## Color Independence

### Rules

Never use color ALONE to convey information. Always add a secondary indicator:

| Scenario | Color Alone (Wrong) | Color + Secondary (Correct) |
|----------|-------------------|---------------------------|
| Error state | Red border on input | Red border + error icon + error text |
| Required field | Red asterisk | Red asterisk + `aria-required="true"` + "(required)" text |
| Success state | Green background | Green background + checkmark icon + success text |
| Link in body text | Different color | Different color + underline |
| Status indicator | Green/red dot | Colored dot + text label ("Active" / "Inactive") |
| Chart data series | Different colors | Colors + patterns + labels |
| Form validation | Red/green text | Colored text + icon + descriptive message |
| Navigation state | Color change on active | Color change + border/underline + `aria-current` |

### Link Styling

```css
/* Links within body text MUST be underlined */
.prose a,
article a,
p a {
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
}

.prose a:hover,
article a:hover,
p a:hover {
  text-decoration-thickness: 2px;
}

/* Navigation links are an exception — context makes them identifiable */
nav a {
  text-decoration: none;
}
```

### Status Indicators

```html
<!-- WRONG: color only -->
<span class="h-2 w-2 rounded-full bg-green-500"></span>

<!-- CORRECT: color + text -->
<span class="flex items-center gap-2">
  <span class="h-2 w-2 rounded-full bg-green-500" aria-hidden="true"></span>
  <span class="text-sm font-medium text-green-700">Active</span>
</span>
```

---

## Language and Readability

### Language Attributes

```html
<!-- Set page language -->
<html lang="es"> <!-- Spanish for LATAM clients -->

<!-- Mark sections in a different language -->
<p>Nuestros servicios incluyen <span lang="en">web design</span> y marketing digital.</p>

<!-- For fully bilingual pages -->
<html lang="es"> <!-- Primary language -->
  <section lang="en">
    <!-- English content section -->
  </section>
```

### hreflang for Bilingual Sites

```html
<head>
  <!-- Tell search engines about language variants -->
  <link rel="alternate" hreflang="es" href="https://example.com/es/" />
  <link rel="alternate" hreflang="en" href="https://example.com/en/" />
  <link rel="alternate" hreflang="x-default" href="https://example.com/" />
</head>
```

### Readability Guidelines

- Target reading level: grade 8-10 (clear and concise)
- Use short sentences (15-20 words average)
- Use common vocabulary; avoid jargon without explanation
- Use `<abbr>` with `title` for abbreviations: `<abbr title="Search Engine Optimization">SEO</abbr>`
- Break long content into sections with descriptive headings
- Use bullet lists for multiple related items

---

## Screen Reader Utilities

### Visually Hidden but Accessible

```css
/* Content hidden visually but available to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Becomes visible on focus (for skip links) */
.sr-only:focus,
.sr-only:focus-within,
.focus\\:not-sr-only:focus {
  position: fixed;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### When to Use `aria-hidden="true"`

| Use Case | Apply `aria-hidden="true"` |
|----------|--------------------------|
| Decorative SVG icons next to text labels | Yes — icon is redundant |
| Decorative images | Yes — plus `alt=""` |
| Duplicate content (mobile + desktop nav) | Yes on the duplicate — screen readers should only see one |
| Visual separators (dots, slashes, pipes) | Yes — they add noise |
| Emoji used decoratively | Yes — screen readers read emoji names |
| Background patterns | Yes — purely decorative |

```html
<!-- Decorative separator — hidden from AT -->
<span aria-hidden="true" class="text-gray-300">|</span>

<!-- Emoji — hidden from AT (screen readers say "red heart") -->
<span aria-hidden="true">❤️</span>

<!-- Rating stars with text alternative -->
<div class="flex items-center gap-1">
  <div aria-hidden="true" class="flex text-yellow-400">
    ★★★★☆
  </div>
  <span class="sr-only">4 out of 5 stars</span>
  <span class="text-sm text-gray-600">(4.0)</span>
</div>
```

---

## Loading and Progress States

```html
<!-- Loading spinner with accessible label -->
<div role="status" class="flex items-center gap-2">
  <svg class="h-5 w-5 animate-spin text-primary" aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
  </svg>
  <span class="text-sm text-gray-600">Loading...</span>
  <span class="sr-only">Content is loading, please wait.</span>
</div>

<!-- Progress bar -->
<div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" aria-label="Upload progress">
  <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
    <div class="h-full rounded-full bg-primary transition-all" style="width: 65%"></div>
  </div>
  <p class="mt-1 text-sm text-gray-600">65% complete</p>
</div>

<!-- Skeleton loading (content placeholder) -->
<div aria-busy="true" aria-label="Loading content">
  <div class="animate-pulse space-y-4">
    <div class="h-4 w-3/4 rounded bg-gray-200"></div>
    <div class="h-4 w-full rounded bg-gray-200"></div>
    <div class="h-4 w-5/6 rounded bg-gray-200"></div>
  </div>
</div>
```

---

## Error Pages

```html
<!-- Accessible 404 page -->
<main id="main-content" class="flex min-h-[60dvh] items-center justify-center px-4">
  <div class="text-center">
    <p class="text-base font-semibold text-primary">404</p>
    <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Page not found</h1>
    <p class="mt-4 text-base text-gray-600">
      Sorry, we could not find the page you are looking for. It may have been moved or deleted.
    </p>
    <div class="mt-6">
      <a
        href="/"
        class="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Go back home
      </a>
    </div>
  </div>
</main>
```

---

## Notification and Toast Patterns

```html
<!-- Toast notification — accessible with role="alert" -->
<div
  role="alert"
  aria-live="assertive"
  class="pointer-events-auto flex items-start gap-3 rounded-lg border bg-white p-4 shadow-lg"
>
  <!-- Icon (visual indicator, not just color) -->
  <svg class="h-5 w-5 shrink-0 text-green-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
  </svg>
  <!-- Message -->
  <div class="flex-1">
    <p class="text-sm font-medium text-gray-900">Message sent</p>
    <p class="mt-1 text-sm text-gray-600">We will respond within 24 hours.</p>
  </div>
  <!-- Close button -->
  <button
    type="button"
    aria-label="Dismiss notification"
    class="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:text-gray-600"
  >
    <svg class="h-4 w-4" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>
```

---

## Testing Checklist

Before any code is considered complete, verify all of the following:

### Images and Media
- [ ] All informative images have descriptive `alt` text
- [ ] All decorative images have `alt=""` and `aria-hidden="true"`
- [ ] Functional images (in links/buttons) describe the action
- [ ] Complex images have detailed descriptions nearby
- [ ] Video content has captions or transcripts

### Color and Contrast
- [ ] Normal text contrast ratio >= 4.5:1
- [ ] Large text contrast ratio >= 3:1
- [ ] UI component contrast ratio >= 3:1
- [ ] Focus indicator contrast ratio >= 3:1
- [ ] Color is never the sole means of conveying information
- [ ] Links in body text are underlined (not just color-differentiated)
- [ ] Error states use icon + text + color (not color alone)

### Structure and Semantics
- [ ] One `<h1>` per page
- [ ] Heading hierarchy is correct (no skipped levels)
- [ ] Semantic HTML used for all structural elements (header, nav, main, footer, article, section)
- [ ] Lists use `<ul>`/`<ol>`, not divs
- [ ] Tables use `<th>` with `scope` attribute
- [ ] `lang` attribute set on `<html>` element
- [ ] `lang` attribute on content in a different language

### Forms
- [ ] Every input has a visible `<label>` (not just placeholder)
- [ ] Required fields marked with `aria-required="true"` and visual indicator
- [ ] Error messages linked via `aria-describedby`
- [ ] Error messages are specific and actionable
- [ ] Autocomplete attributes on personal data fields
- [ ] Input types match content (email, tel, url)
- [ ] Form groups use `<fieldset>` and `<legend>`
- [ ] Submit button text is descriptive

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Focus order is logical (follows visual layout)
- [ ] Focus indicators are visible (2px solid, 3:1 contrast)
- [ ] No keyboard traps exist
- [ ] Skip navigation link is present and works
- [ ] Modals trap focus correctly
- [ ] Modals restore focus on close
- [ ] Escape closes modals, menus, and popovers

### ARIA
- [ ] ARIA roles are used correctly (and only when needed)
- [ ] All interactive elements have accessible names
- [ ] `aria-expanded` toggled on menu/accordion triggers
- [ ] `aria-current="page"` on active navigation links
- [ ] Live regions used for dynamic content updates
- [ ] `aria-hidden="true"` on decorative icons

### Motion and Animation
- [ ] `prefers-reduced-motion` is respected
- [ ] No content flashes more than 3 times per second
- [ ] Auto-playing content has pause/stop controls
- [ ] Animations do not gate access to content

### General
- [ ] Page has a unique, descriptive `<title>`
- [ ] Multiple ways to navigate (nav, search, sitemap)
- [ ] HTML is valid (no duplicate IDs, proper nesting)
- [ ] Content reflows at 320px without horizontal scrolling
- [ ] Text can be resized to 200% without loss of functionality
- [ ] Touch targets are at least 44x44px (cross-check with mobile-first.md)
