# Application Layouts Layer

**Layer:** `src/app/layouts/`  
**Purpose:** Reusable enterprise shell layout including Header, Sidebar, Footer, and page framing.

## Structure
```
src/app/layouts/
├── AppLayout.tsx     # Root scaffolding composing Header, Sidebar, Main, and Footer
├── Header.tsx        # Top enterprise header (dynamic domain badge, search, notifications, user session)
├── Sidebar.tsx       # Collapsible navigation showing Dashboard and the 3 Teams (ERP, CRM, HRMS)
├── Footer.tsx        # Enterprise footer (version, environment, support links)
└── README.md
```

## Reusability Rules
- The common shell is defined **strictly in `src/app/layouts/`**.
- It is shared across **ERP, CRM, and HRMS**.
- No team may duplicate the Header, Sidebar, or Footer inside their feature directory.
