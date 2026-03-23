# Project Design System & Document

This document establishes the **Semantic Design System** for the project. By using functional names (Primary, Secondary, Disabled) instead of specific color hex codes or random sizes, we ensure every page and form remains perfectly consistent.

---

## 1. Global Layout Strategy
To ensure forms and content feel unified, the project uses a **Single-Track Container** system. This prevents forms from feeling "floating" or disconnected from the rest of the application's layout.

### **The Master Container**
* **Standard Page Width:** `max-w-7xl` (1280px).
* **Horizontal Alignment:** `mx-auto` (Centered).
* **Responsive Padding:** `px-4 sm:px-6 lg:px-8`.
* **The Content Card:** Both data tables and forms are housed in the same `Surface` card style to maintain a singular visual language across the app.

---

## 2. Semantic Color & State Palette
All colors are mapped to their **Functional Role**. This allows for global theme changes in one location.

| Token Name | Purpose | Visual Rule |
| :--- | :--- | :--- |
| **Primary** | Main Call to Action (CTA). | High contrast, brand-aligned. |
| **Secondary** | Supportive or "Back" actions. | Subtle, neutral, or outlined. |
| **Disabled** | Inactive states (Forms/Buttons). | Low contrast, gray/muted, no hover. |
| **Surface** | The "Paper" or "Card" layer. | Pure white or light neutral. |
| **Background** | The "Floor" of the application. | Off-white/gray to create depth. |
| **Border** | Structural separation. | Thin, consistent lines for inputs/cards. |

---

## 3. Component Standards

### **Button Hierarchy**
Buttons are defined by their **intent**, not their color.

1.  **Primary Button:** Reserved for the main page action (e.g., *Save*, *Submit*). 
    * *Style:* `bg-primary` text `primary-foreground`.
2.  **Secondary Button:** Used for alternative paths (e.g., *Cancel*, *Back*).
    * *Style:* `bg-secondary` text `secondary-foreground`.
3.  **Disabled Button:** Triggered when a form is invalid or a process is running.
    * *Style:* `bg-disabled` text `disabled-content`.
    * *Behavior:* `cursor-not-allowed`, no hover effects.

### **Background & Surface Usage**
* **Page Background:** Always use the `Background` token. This reduces eye strain and makes the workspace "pop."
* **Section/Card:** Always use the `Surface` token. This is the container for all form fields and data.

---

## 4. Form Design Standards
To achieve layout consistency, forms must follow the same sizing rules as content pages:

* **Width Equality:** A form card should occupy the same horizontal space as a data table or content card on the same page. Never let a form be narrower than the rest of the page.

---

## 5. Card & Spacing Standards

### **Border Radius**
* **Cards / Modals / Panels:** Always use `rounded-lg`. This is the universal standard for all container elements.
* **Pills / Badges / Tags:** Use `rounded-full` for small inline elements.
* **Never use `rounded-md`** for card-like containers — it creates visual inconsistency with the rest of the system.

### **Padding Hierarchy**
A three-tier padding system creates intentional visual hierarchy:

| Tier | Class | Usage |
| :--- | :--- | :--- |
| Compact | `p-3` | Dense items within a grid or list (e.g., angle preview rows, compact cards) |
| Card Content | `p-4` | Standard card body content |
| Panel / Modal | `p-6` | Top-level panels, modals, and primary content cards |

### **Shadows**
* **Cards:** `shadow-sm` — subtle elevation to separate from background.
* **Modals / Dropdowns:** `shadow-lg` — strong elevation for overlay elements.

### **Hover States**
* All interactive elements **must** have a `hover:` state and `transition-colors` (or `transition-opacity` / `transition-all` where appropriate).
* Buttons: `hover:bg-*` color shift.
* Image buttons: `hover:opacity-90` or `hover:scale-*` for visual feedback beyond cursor change.
* Links: `hover:text-foreground` or `hover:underline`.
* Never rely solely on `cursor-pointer` or `cursor-zoom-in` as the only hover signal.

### **Image Surfaces**
* Every generated image surface must be clickable to open a lightbox (`MediaModal`).
* Use `cursor-zoom-in` with a hover overlay (e.g., magnifying glass icon) to signal interactivity.