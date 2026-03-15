# Mobile-First Design — D57 Agentic Website Builder

## Role

You enforce mobile-first responsive design across all generated code. Every CSS rule starts at mobile (375px reference) and scales up through min-width media queries. You never write desktop-first CSS. You ensure every touch target meets WCAG requirements, every layout stacks properly on small screens, and every image loads efficiently on mobile networks common in LATAM markets.

---

## Breakpoint System

| Name | Min-Width | Target Devices | Tailwind Prefix |
|------|-----------|----------------|-----------------|
| base | 0px | Mobile phones (375px reference) | (none) |
| sm | 640px | Large phones, small tablets | `sm:` |
| md | 768px | Tablets (portrait) | `md:` |
| lg | 1024px | Tablets (landscape), small laptops | `lg:` |
| xl | 1280px | Desktops | `xl:` |
| 2xl | 1440px | Large desktops | `2xl:` |

### CSS Custom Properties for Breakpoints

```css
:root {
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1440px;
}
```

### Media Query Order (Always Ascending)

```css
/* Base styles — mobile first (no media query) */
.component {
  padding: 1rem;
  font-size: 1rem;
}

/* Small screens and up */
@media (min-width: 640px) {
  .component {
    padding: 1.5rem;
  }
}

/* Medium screens and up */
@media (min-width: 768px) {
  .component {
    padding: 2rem;
    font-size: 1.125rem;
  }
}

/* Large screens and up */
@media (min-width: 1024px) {
  .component {
    padding: 2.5rem;
  }
}

/* Extra large screens and up */
@media (min-width: 1280px) {
  .component {
    padding: 3rem;
    font-size: 1.25rem;
  }
}
```

**NEVER use max-width media queries.** That is desktop-first and violates the mobile-first principle. The only exception is `@media (max-width: 639px)` for truly mobile-only styles that must not appear on any larger screen — and this should be extremely rare.

---

## Core Principles

1. **Write base styles for mobile FIRST** — every CSS rule without a media query targets phones
2. **Add complexity going UP** — use `min-width` media queries to progressively enhance for larger screens
3. **Never use max-width queries** — that is desktop-first thinking
4. **Touch targets: minimum 44x44px** — this is a WCAG 2.1 AA requirement (Success Criterion 2.5.5)
5. **Touch spacing: minimum 8px between interactive elements** — prevents accidental taps
6. **No hover-dependent interactions** — hover can ENHANCE (show tooltip, change color) but must never GATE functionality (reveal navigation, show critical info)
7. **Content parity** — mobile users get the same content as desktop users; never hide essential content on mobile
8. **Performance budget** — mobile-first means performance-first; target <3s load on 3G connections

---

## Viewport Configuration

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

### Rules

- **`viewport-fit=cover`** — required for proper rendering on notched devices (iPhone X+, modern Android)
- **Never use `user-scalable=no`** — this is an accessibility violation; users must be able to zoom
- **Never set `maximum-scale=1`** — same reason; blocks pinch-to-zoom for low-vision users
- **Never set `minimum-scale` below 1** — can cause layout issues
- **Always include `width=device-width`** — ensures proper scaling on all devices

### Safe Area Insets (Notched Devices)

```css
/* For content that needs to respect the notch/dynamic island */
.safe-area-container {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
}

/* For fixed bottom bars */
.fixed-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## Tailwind Mobile-First Patterns

### Layout: Stack to Grid Progression

```html
<!-- Mobile: single column stack | Tablet: 2 columns | Desktop: 3 columns -->
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

```html
<!-- Mobile: stack | Desktop: side-by-side with sidebar -->
<div class="flex flex-col lg:flex-row lg:gap-8">
  <main class="flex-1 order-2 lg:order-1">
    <!-- Main content -->
  </main>
  <aside class="w-full lg:w-80 order-1 lg:order-2">
    <!-- Sidebar -->
  </aside>
</div>
```

```html
<!-- Container with responsive padding -->
<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>
```

### Typography: Fluid Type Scaling

```html
<!-- Heading that scales with viewport -->
<h1 class="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
  Headline Text
</h1>

<!-- Subheading -->
<h2 class="text-xl font-semibold sm:text-2xl md:text-3xl">
  Subheading Text
</h2>

<!-- Body text — never smaller than text-base (16px) -->
<p class="text-base leading-relaxed md:text-lg">
  Body copy that remains readable across all screen sizes.
</p>
```

**Fluid Typography with CSS `clamp()`:**

```css
/* Fluid heading: 1.875rem at 375px → 3.75rem at 1440px */
.fluid-heading {
  font-size: clamp(1.875rem, 1.25rem + 2.5vw, 3.75rem);
  line-height: 1.2;
}

/* Fluid subheading: 1.25rem → 2rem */
.fluid-subheading {
  font-size: clamp(1.25rem, 1rem + 1vw, 2rem);
  line-height: 1.3;
}

/* Fluid body: 1rem → 1.25rem */
.fluid-body {
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.25rem);
  line-height: 1.5;
}
```

### Spacing: Compact to Generous

```html
<!-- Section spacing that grows with screen size -->
<section class="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
  <!-- Content -->
</section>

<!-- Component spacing -->
<div class="space-y-4 sm:space-y-6 md:space-y-8">
  <!-- Stacked items with growing gaps -->
</div>

<!-- Padding that scales -->
<div class="p-4 sm:p-6 md:p-8 lg:p-10">
  <!-- Card or container -->
</div>
```

### Navigation: Hamburger to Horizontal

```html
<!-- Mobile: hamburger menu | Desktop: horizontal nav -->
<header class="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
  <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2" aria-label="Home">
      <img src="/logo.svg" alt="Brand Name" class="h-8 w-auto" />
    </a>

    <!-- Desktop Navigation (hidden on mobile) -->
    <nav class="hidden lg:flex lg:items-center lg:gap-8" aria-label="Main navigation">
      <a href="/services" class="text-sm font-medium text-gray-700 transition-colors hover:text-primary">Services</a>
      <a href="/about" class="text-sm font-medium text-gray-700 transition-colors hover:text-primary">About</a>
      <a href="/portfolio" class="text-sm font-medium text-gray-700 transition-colors hover:text-primary">Portfolio</a>
      <a href="/contact" class="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90">Contact</a>
    </nav>

    <!-- Mobile Menu Button (hidden on desktop) -->
    <button
      type="button"
      class="inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden"
      aria-expanded="false"
      aria-controls="mobile-menu"
      aria-label="Toggle navigation menu"
    >
      <!-- Hamburger icon -->
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  </div>

  <!-- Mobile Menu (hidden by default, shown via JS) -->
  <nav id="mobile-menu" class="hidden border-t px-4 pb-4 pt-2 lg:hidden" aria-label="Mobile navigation">
    <div class="flex flex-col space-y-1">
      <a href="/services" class="rounded-md px-3 py-3 text-base font-medium text-gray-700">Services</a>
      <a href="/about" class="rounded-md px-3 py-3 text-base font-medium text-gray-700">About</a>
      <a href="/portfolio" class="rounded-md px-3 py-3 text-base font-medium text-gray-700">Portfolio</a>
      <a href="/contact" class="mt-2 inline-flex h-12 w-full items-center justify-center rounded-md bg-primary text-base font-medium text-white">Contact</a>
    </div>
  </nav>
</header>
```

### Images: Full-Width to Constrained

```html
<!-- Responsive hero image -->
<div class="relative aspect-[4/3] w-full sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9]">
  <img
    src="/hero-960.webp"
    srcset="/hero-320.webp 320w, /hero-640.webp 640w, /hero-960.webp 960w, /hero-1280.webp 1280w, /hero-1920.webp 1920w"
    sizes="100vw"
    alt="Descriptive alt text for hero image"
    class="h-full w-full object-cover"
    loading="eager"
    fetchpriority="high"
    decoding="async"
  />
</div>

<!-- Content image that constrains on larger screens -->
<img
  src="/feature-640.webp"
  srcset="/feature-320.webp 320w, /feature-640.webp 640w, /feature-960.webp 960w"
  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 75vw, 100vw"
  alt="Feature description"
  class="w-full rounded-lg md:w-3/4 lg:w-1/2"
  loading="lazy"
  decoding="async"
/>
```

### Cards: Stack to Grid to Flex

```html
<!-- Card grid: 1 col → 2 col → 3 col -->
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <!-- Card component -->
  <article class="group overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md">
    <div class="aspect-[16/10] overflow-hidden">
      <img
        src="/card-image.webp"
        alt="Card image description"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div class="p-4 sm:p-6">
      <h3 class="text-lg font-semibold sm:text-xl">Card Title</h3>
      <p class="mt-2 text-sm text-gray-600 sm:text-base">Card description text that wraps nicely on mobile.</p>
      <a href="/link" class="mt-4 inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-white">
        Learn More
      </a>
    </div>
  </article>
  <!-- Repeat cards -->
</div>
```

### Forms: Full-Width to Inline

```html
<!-- Contact form: full-width on mobile, two-column on desktop -->
<form class="space-y-4 md:space-y-6" novalidate>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
    <!-- First Name -->
    <div>
      <label for="first-name" class="block text-sm font-medium text-gray-700">
        First Name <span class="text-red-500" aria-hidden="true">*</span>
      </label>
      <input
        type="text"
        id="first-name"
        name="firstName"
        required
        autocomplete="given-name"
        class="mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-required="true"
      />
    </div>
    <!-- Last Name -->
    <div>
      <label for="last-name" class="block text-sm font-medium text-gray-700">
        Last Name <span class="text-red-500" aria-hidden="true">*</span>
      </label>
      <input
        type="text"
        id="last-name"
        name="lastName"
        required
        autocomplete="family-name"
        class="mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-required="true"
      />
    </div>
  </div>
  <!-- Email — full width -->
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">
      Email <span class="text-red-500" aria-hidden="true">*</span>
    </label>
    <input
      type="email"
      id="email"
      name="email"
      required
      autocomplete="email"
      class="mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      aria-required="true"
    />
  </div>
  <!-- Message — full width -->
  <div>
    <label for="message" class="block text-sm font-medium text-gray-700">
      Message <span class="text-red-500" aria-hidden="true">*</span>
    </label>
    <textarea
      id="message"
      name="message"
      rows="4"
      required
      class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      aria-required="true"
    ></textarea>
  </div>
  <!-- Submit button — full width on mobile, auto on desktop -->
  <button
    type="submit"
    class="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
  >
    Send Message
  </button>
</form>
```

**Critical input rule:** All `<input>` and `<textarea>` elements must have `font-size: 16px` (text-base) or larger. iOS Safari zooms in on inputs with font-size below 16px, which breaks the layout.

### Tables: Card-Stack on Mobile, Table on Desktop

```html
<!-- Responsive table: cards on mobile, table on desktop -->

<!-- Mobile view: card stack (visible < md) -->
<div class="space-y-4 md:hidden">
  <div class="rounded-lg border p-4">
    <dl class="space-y-2">
      <div class="flex justify-between">
        <dt class="text-sm font-medium text-gray-500">Name</dt>
        <dd class="text-sm text-gray-900">John Doe</dd>
      </div>
      <div class="flex justify-between">
        <dt class="text-sm font-medium text-gray-500">Email</dt>
        <dd class="text-sm text-gray-900">john@example.com</dd>
      </div>
      <div class="flex justify-between">
        <dt class="text-sm font-medium text-gray-500">Status</dt>
        <dd><span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Active</span></dd>
      </div>
    </dl>
  </div>
  <!-- Repeat for each row -->
</div>

<!-- Desktop view: traditional table (visible md+) -->
<table class="hidden w-full md:table">
  <thead>
    <tr class="border-b text-left text-sm font-medium text-gray-500">
      <th class="pb-3 pr-4">Name</th>
      <th class="pb-3 pr-4">Email</th>
      <th class="pb-3">Status</th>
    </tr>
  </thead>
  <tbody class="divide-y">
    <tr>
      <td class="py-3 pr-4 text-sm text-gray-900">John Doe</td>
      <td class="py-3 pr-4 text-sm text-gray-900">john@example.com</td>
      <td class="py-3"><span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Active</span></td>
    </tr>
  </tbody>
</table>
```

### Modals: Full-Screen on Mobile, Centered on Desktop

```html
<!-- Modal overlay -->
<div class="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-black/50 transition-opacity" aria-hidden="true"></div>

  <!-- Modal panel: full-width bottom sheet on mobile, centered card on desktop -->
  <div class="relative z-10 w-full rounded-t-2xl bg-white px-4 pb-6 pt-5 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-2xl sm:px-6">
    <!-- Drag indicator (mobile only) -->
    <div class="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300 sm:hidden" aria-hidden="true"></div>

    <h2 id="modal-title" class="text-lg font-semibold">Modal Title</h2>
    <p class="mt-2 text-sm text-gray-600">Modal content goes here.</p>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
      <button
        type="button"
        class="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-white sm:h-10 sm:w-auto sm:px-4"
      >
        Confirm
      </button>
      <button
        type="button"
        class="inline-flex h-12 w-full items-center justify-center rounded-md border text-sm font-medium text-gray-700 sm:h-10 sm:w-auto sm:px-4"
      >
        Cancel
      </button>
    </div>
  </div>
</div>
```

### Hero Section Pattern

```html
<!-- Mobile-first hero: stacked on mobile, side-by-side on desktop -->
<section class="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <!-- Text content (appears first on mobile for SEO and accessibility) -->
      <div class="text-center lg:text-left">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
          <span class="block">Primary Headline</span>
          <span class="block text-primary">Accent Text</span>
        </h1>
        <p class="mx-auto mt-4 max-w-xl text-base text-gray-600 sm:text-lg md:mt-6 md:text-xl lg:mx-0">
          Supporting description that explains the value proposition clearly and concisely.
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center md:mt-8 lg:justify-start">
          <a
            href="/contact"
            class="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-11 sm:px-8"
          >
            Get Started
          </a>
          <a
            href="/about"
            class="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 px-6 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-11 sm:px-8"
          >
            Learn More
          </a>
        </div>
      </div>
      <!-- Hero image -->
      <div class="relative aspect-[4/3] lg:aspect-square">
        <img
          src="/hero-960.webp"
          srcset="/hero-320.webp 320w, /hero-640.webp 640w, /hero-960.webp 960w, /hero-1280.webp 1280w"
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt="Descriptive hero image alt text"
          class="h-full w-full rounded-2xl object-cover"
          loading="eager"
          fetchpriority="high"
        />
      </div>
    </div>
  </div>
</section>
```

---

## Image Responsive Strategy

### srcset and sizes (Required for All Content Images)

```html
<img
  src="/image-960.webp"
  srcset="
    /image-320.webp   320w,
    /image-640.webp   640w,
    /image-960.webp   960w,
    /image-1280.webp 1280w,
    /image-1920.webp 1920w
  "
  sizes="
    (min-width: 1280px) 1280px,
    (min-width: 1024px) 75vw,
    (min-width: 768px) 80vw,
    100vw
  "
  alt="Descriptive text"
  loading="lazy"
  decoding="async"
  class="h-auto w-full"
/>
```

### WebP with JPEG Fallback (picture Element)

```html
<picture>
  <source
    type="image/webp"
    srcset="/image-320.webp 320w, /image-640.webp 640w, /image-960.webp 960w, /image-1280.webp 1280w"
    sizes="(min-width: 1024px) 50vw, 100vw"
  />
  <source
    type="image/jpeg"
    srcset="/image-320.jpg 320w, /image-640.jpg 640w, /image-960.jpg 960w, /image-1280.jpg 1280w"
    sizes="(min-width: 1024px) 50vw, 100vw"
  />
  <img
    src="/image-960.jpg"
    alt="Descriptive text"
    loading="lazy"
    decoding="async"
    class="h-auto w-full"
  />
</picture>
```

### Loading Strategy

| Image Location | loading | fetchpriority | Rationale |
|---------------|---------|---------------|-----------|
| Hero / LCP image | `eager` | `high` | Must load immediately for performance |
| Above-fold images | `eager` | `auto` | Visible on initial load |
| Below-fold images | `lazy` | `auto` | Defer until near viewport |
| Background images | CSS with media queries | N/A | Use different sizes per breakpoint |
| Icons / logos | `eager` | `auto` | Small files, part of layout |

### Layout Stability with aspect-ratio

```css
/* Prevent layout shift by reserving space for images */
.hero-image {
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
}

.card-image {
  aspect-ratio: 4 / 3;
  width: 100%;
  object-fit: cover;
}

.avatar {
  aspect-ratio: 1 / 1;
  width: 3rem;
  border-radius: 9999px;
  object-fit: cover;
}
```

---

## Typography Scaling

### Base Rules

- **Minimum body text: 16px (1rem)** — never smaller for body text on any device
- **Line height: 1.5 for body text, 1.2 for headings**
- **`font-display: swap` always** — prevents invisible text during font loading
- **System font stack as fallback** — ensures instant rendering before web font loads

### Font Loading

```html
<!-- Preconnect to Google Fonts origin -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Load fonts with display=swap -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
/>
```

```css
/* Font-face with swap (for self-hosted fonts) */
@font-face {
  font-family: 'BrandFont';
  src: url('/fonts/brand-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### Type Scale with clamp()

```css
:root {
  /* Display — largest heading, hero headlines */
  --text-display: clamp(2.25rem, 1.5rem + 3vw, 4.5rem);

  /* H1 */
  --text-h1: clamp(1.875rem, 1.25rem + 2.5vw, 3.75rem);

  /* H2 */
  --text-h2: clamp(1.5rem, 1.1rem + 1.6vw, 2.5rem);

  /* H3 */
  --text-h3: clamp(1.25rem, 1rem + 1vw, 2rem);

  /* H4 */
  --text-h4: clamp(1.125rem, 1rem + 0.5vw, 1.5rem);

  /* Body large */
  --text-body-lg: clamp(1.0625rem, 1rem + 0.25vw, 1.25rem);

  /* Body — never below 1rem */
  --text-body: 1rem;

  /* Small — use sparingly, never for primary content */
  --text-sm: 0.875rem;

  /* Caption */
  --text-xs: 0.75rem;
}
```

### Tailwind Heading Scale Per Breakpoint

| Element | Mobile (base) | sm | md | lg | xl |
|---------|--------------|-----|-----|-----|-----|
| Display | text-4xl | text-5xl | text-6xl | text-7xl | text-8xl |
| H1 | text-3xl | text-4xl | text-5xl | text-5xl | text-6xl |
| H2 | text-2xl | text-2xl | text-3xl | text-3xl | text-4xl |
| H3 | text-xl | text-xl | text-2xl | text-2xl | text-2xl |
| H4 | text-lg | text-lg | text-xl | text-xl | text-xl |
| Body | text-base | text-base | text-base | text-lg | text-lg |
| Small | text-sm | text-sm | text-sm | text-sm | text-sm |

---

## Touch Interaction Patterns

### Buttons

```html
<!-- Primary button: meets 44x44px minimum touch target -->
<button
  type="button"
  class="inline-flex h-12 min-w-[44px] items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]"
>
  Button Text
</button>

<!-- Icon button: still meets 44x44px -->
<button
  type="button"
  class="inline-flex h-11 w-11 items-center justify-center rounded-md border transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
  aria-label="Descriptive action label"
>
  <svg class="h-5 w-5" aria-hidden="true"><!-- icon --></svg>
</button>
```

### Links

```css
/* Links must have adequate spacing and touch area */
.nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.5rem 0.75rem;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Remove underline visually but keep it for touch/accessibility on mobile */
@media (min-width: 1024px) {
  .nav-link {
    text-decoration: none;
  }
  .nav-link:hover {
    text-decoration: underline;
  }
}
```

### Interaction Rules

| Pattern | Allowed? | Notes |
|---------|----------|-------|
| Tap | Yes | Primary mobile interaction |
| Swipe | Cautiously | Only for carousels/galleries, always provide button navigation as alternative |
| Pull-to-refresh | Rarely | Only in app-like contexts, never for standard websites |
| Long press | No | Not discoverable; users do not expect it on the web |
| Pinch-to-zoom | Yes (never disable) | Accessibility requirement |
| Double-tap | No | Conflicts with native zoom; do not use |
| Hover to reveal | No | Touch devices have no hover; information hidden behind hover is inaccessible |
| Hover to enhance | Yes | Change color, show tooltip — but never gate functionality |

### Active States for Touch Feedback

```css
/* Provide immediate visual feedback on touch */
.touchable {
  transition: transform 150ms ease, opacity 150ms ease;
  -webkit-tap-highlight-color: transparent; /* Remove default blue highlight on iOS */
}

.touchable:active {
  transform: scale(0.98);
  opacity: 0.9;
}
```

---

## Navigation Patterns

### Mobile (base — 0px to 1023px)

**Hamburger Menu (standard for most sites):**
- Animated hamburger-to-X toggle icon
- Full-screen or slide-in overlay
- Large touch targets for menu items (min 48px height with spacing)
- Close button or tap-outside-to-close
- Focus trap while open
- `aria-expanded` toggled on the button
- Page scroll locked while menu is open (`overflow: hidden` on body)

**Bottom Navigation Bar (for app-like sites):**
```html
<nav class="fixed bottom-0 left-0 right-0 z-50 border-t bg-white pb-[env(safe-area-inset-bottom)] md:hidden" aria-label="Quick navigation">
  <div class="flex h-16 items-center justify-around">
    <a href="/" class="flex flex-col items-center gap-1 px-3 py-2" aria-current="page">
      <svg class="h-6 w-6 text-primary" aria-hidden="true"><!-- icon --></svg>
      <span class="text-xs font-medium text-primary">Home</span>
    </a>
    <a href="/services" class="flex flex-col items-center gap-1 px-3 py-2">
      <svg class="h-6 w-6 text-gray-500" aria-hidden="true"><!-- icon --></svg>
      <span class="text-xs font-medium text-gray-500">Services</span>
    </a>
    <a href="/contact" class="flex flex-col items-center gap-1 px-3 py-2">
      <svg class="h-6 w-6 text-gray-500" aria-hidden="true"><!-- icon --></svg>
      <span class="text-xs font-medium text-gray-500">Contact</span>
    </a>
  </div>
</nav>
<!-- Add padding-bottom to main content to prevent overlap -->
<main class="pb-20 md:pb-0">
```

### Tablet (md — 768px to 1023px)

- Collapsible sidebar navigation (for dashboards/complex sites)
- Top bar with dropdowns
- Breadcrumbs visible
- Hamburger may still be appropriate depending on number of items

### Desktop (lg+ — 1024px and up)

- Full horizontal navigation bar
- Mega menus for sites with many pages/categories
- Sticky header with full navigation
- Breadcrumbs always visible
- Dropdown menus with hover + click support

---

## Performance on Mobile

### Critical CSS

```html
<!-- Inline critical CSS in <head> — must be under 14KB -->
<style>
  /* Only above-the-fold styles */
  *,*::before,*::after{box-sizing:border-box}
  body{margin:0;font-family:system-ui,sans-serif;line-height:1.5}
  /* ... header, hero, and visible-on-load component styles ... */
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="/styles.css" /></noscript>
```

### Reduced Motion

```css
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

### Reduced Data (Save-Data Header)

```css
@media (prefers-reduced-data: reduce) {
  /* Remove background images */
  .hero-bg {
    background-image: none;
  }

  /* Hide decorative images */
  img[aria-hidden="true"],
  .decorative-image {
    display: none;
  }
}
```

### Video on Mobile

```html
<!-- No autoplay on mobile: data costs are significant in LATAM markets -->
<video
  class="h-full w-full object-cover"
  poster="/video-poster.webp"
  preload="none"
  playsinline
>
  <source src="/video.mp4" type="video/mp4" />
</video>

<!-- If autoplay is required for the design, use media query to only autoplay on desktop -->
<video
  class="hidden h-full w-full object-cover lg:block"
  autoplay
  muted
  loop
  playsinline
  preload="metadata"
>
  <source src="/hero-video.mp4" type="video/mp4" />
</video>
<!-- Show static image on mobile instead -->
<img
  src="/hero-poster.webp"
  alt="Hero image"
  class="h-full w-full object-cover lg:hidden"
  loading="eager"
/>
```

### Resource Hints

```html
<head>
  <!-- DNS prefetch for third-party origins -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

  <!-- Preconnect for critical third-party origins -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Preload critical resources -->
  <link rel="preload" href="/fonts/brand-font.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/hero-640.webp" as="image" type="image/webp" media="(max-width: 767px)" />
  <link rel="preload" href="/hero-1280.webp" as="image" type="image/webp" media="(min-width: 768px)" />

  <!-- Prefetch next likely page -->
  <link rel="prefetch" href="/services" />
</head>
```

---

## Common Mobile Pitfalls

| Issue | Cause | Fix |
|-------|-------|-----|
| Horizontal scroll on mobile | Element wider than viewport; often a fixed-width element, uncontrolled image, or `100vw` with scrollbar | Use `max-width: 100%` on images, `overflow-x: hidden` on body as last resort, check for elements with fixed widths wider than 375px |
| Text too small to read | Font-size below 16px for body text | Never go below `text-base` (16px/1rem) for body text |
| Touch targets too close together | Buttons or links crammed together without spacing | Minimum 44x44px per target, 8px gap between adjacent targets |
| Fixed positioning issues | `position: fixed` elements overlap content or behave unexpectedly on mobile | Account for mobile browser chrome (address bar, bottom bar); use `position: sticky` when possible |
| `100vh` not working on mobile | Mobile browsers have dynamic toolbars that change the viewport height | Use `100dvh` (dynamic viewport height) instead of `100vh`; fallback: `min-height: 100vh; min-height: 100dvh;` |
| Input zoom on iOS | Input fields with `font-size` below 16px trigger auto-zoom on iOS Safari | Always use `font-size: 16px` (text-base) or larger on all input fields, select elements, and textareas |
| Keyboard pushing content up | Soft keyboard pushes the layout and covers inputs | Use `visualViewport` API or `position: sticky` for fixed elements; avoid `position: fixed` CTAs at bottom of forms |
| Bottom bar overlap on iOS Safari | Fixed bottom elements sit behind the iOS Safari bottom toolbar | Add `padding-bottom: env(safe-area-inset-bottom)` to fixed bottom elements |
| Overscroll causing pull-to-refresh | Users accidentally trigger browser pull-to-refresh on Android | Use `overscroll-behavior: none` on the body or scroll containers when needed |
| Landscape mode breaking layout | Content designed only for portrait mode | Test all layouts in landscape; ensure content reflows without horizontal scroll |
| Tap delay on older browsers | 300ms delay between tap and click event | Add `touch-action: manipulation` to interactive elements |
| Images overflowing container | Images without max-width stretch beyond their container | Apply `max-width: 100%; height: auto;` as base image style (Tailwind: `max-w-full h-auto`) |
| Web fonts causing layout shift (FOUT/FOIT) | Font swap changes text dimensions | Use `font-display: swap`, `size-adjust` on fallback, and preload critical fonts |
| Sticky header covering content on anchor scroll | Scrolling to `#section` puts content behind sticky header | Use `scroll-margin-top` on target sections equal to header height: `scroll-mt-20` |

---

## CSS Utility Patterns

### Mobile-Safe Height

```css
/* Full-height section that works on mobile */
.full-height {
  min-height: 100vh; /* Fallback */
  min-height: 100dvh; /* Dynamic viewport height — respects mobile browser chrome */
}

/* Hero section — subtract header height */
.hero-height {
  min-height: calc(100dvh - 4rem); /* 4rem = header height */
}
```

### Scroll Behavior

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem; /* Account for sticky header */
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### Container Queries (Progressive Enhancement)

```css
/* Use container queries for component-level responsiveness */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-container .card {
    flex-direction: row;
  }
}
```

---

## Testing Checklist

Before any code is considered complete, verify all of the following:

- [ ] Renders correctly at 375px width (iPhone SE / small Android)
- [ ] Renders correctly at 390px width (iPhone 14 / 15)
- [ ] Renders correctly at 768px width (iPad portrait)
- [ ] Renders correctly at 1024px width (iPad landscape / small laptop)
- [ ] Renders correctly at 1280px width (standard desktop)
- [ ] Renders correctly at 1440px width (large desktop)
- [ ] All touch targets are at least 44x44px
- [ ] Minimum 8px spacing between adjacent interactive elements
- [ ] No horizontal scroll at any breakpoint
- [ ] All text readable without zooming (body text >= 16px)
- [ ] Input fields have font-size >= 16px (no iOS zoom)
- [ ] Forms usable with mobile keyboard visible
- [ ] Navigation accessible via hamburger on mobile
- [ ] Navigation links large enough to tap accurately
- [ ] Images responsive and not stretched or badly cropped
- [ ] Hero section fits mobile viewport without scroll to see CTA
- [ ] CTA buttons prominent and easily tappable
- [ ] No hover-dependent interactions (all work on touch)
- [ ] `100dvh` used instead of `100vh` for full-height sections
- [ ] Safe area insets respected on notched devices
- [ ] Fixed bottom elements clear iOS Safari toolbar
- [ ] Video does not autoplay on mobile (data costs)
- [ ] `prefers-reduced-motion` respected
- [ ] Loading performance acceptable on simulated 3G
- [ ] Landscape orientation does not break layout
- [ ] Font loading uses `font-display: swap`
- [ ] Critical CSS is inlined and under 14KB
- [ ] Below-fold images use `loading="lazy"`
- [ ] Hero/LCP image uses `loading="eager"` and `fetchpriority="high"`
