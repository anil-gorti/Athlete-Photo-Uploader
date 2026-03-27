# Athlete Photo Uploader

> A production-ready admin tool for reliably associating profile photos with participant records in structured databases.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

---

## The Problem

In any platform managing participant records — sports events, conferences, corporate directories — a persistent operational failure mode exists:

- Profile images are stored as files
- Participant records live in a structured database
- Without a stable join mechanism, **filenames become the source of truth**

This leads to:
- Mismatched photos and participant records
- Manual errors that compound over time
- Fragile gallery rendering downstream

---

## The Solution

This tool gives admins a **fast, deterministic interface** to attach or replace a participant's profile photo by selecting them from a searchable list and associating a specific event — ensuring the database record, not the filename, is always the canonical source of truth.

No bulk processing. No automation magic. Just a clean, auditable join between identity and media.

---

## Features

- **Searchable participant selector** — find records by name or ID instantly
- **Event-scoped uploads** — photos are always tagged to a specific event, preventing cross-event collisions
- **Drag-and-drop photo zone** — with live preview and existing-photo awareness
- **Upload state machine** — idle → no-photo → pending → saving → success, with clear UI feedback at every step
- **Memory-safe** — object URLs are revoked on unmount to prevent leaks
- **Reset/clear flow** — one-click state reset for rapid sequential updates

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| UI Framework | React 18 + TypeScript | Type-safe component composition |
| Build Tool | Vite | Fast HMR, optimized production builds |
| Styling | Tailwind CSS | Utility-first, no runtime overhead |
| Icons | Lucide React | Consistent, tree-shakeable icon set |
| Linting | ESLint | Enforced code quality |

---

## Architecture

```
src/
  components/
    AthletePhotoUploader.tsx   # Root orchestrator — state machine + save logic
    AthleteSelector.tsx        # Searchable dropdown with click-outside dismiss
    RaceSelector.tsx           # Event picker (renders after participant selected)
    PhotoDropzone.tsx          # Drag-and-drop zone with preview + replace support
    StatusIndicator.tsx        # Upload state display (idle/pending/success/error)
  App.tsx                      # Entry point, layout wrapper
  index.tsx                    # React DOM mount
```

**State flow:**
1. Admin selects a participant → resets downstream state
2. Admin selects an event → unlocks photo zone
3. Admin drops/selects a photo → preview rendered, status → pending
4. Admin clicks Save → simulated API call, status → success
5. Clear/Reset returns all state to idle

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## Connecting a Real Backend

The `handleSave` function in `AthletePhotoUploader.tsx` currently simulates an API call. To wire up a real backend:

```typescript
// Replace the setTimeout simulation with:
const formData = new FormData();
formData.append('photo', uploadedFile);
formData.append('participantId', selectedAthlete.id);
formData.append('eventId', selectedRace.id);

await fetch('/api/photos/upload', {
  method: 'POST',
  body: formData,
});
```

The mock data arrays (`MOCK_ATHLETES`, `MOCK_RACES`) are designed to be drop-in replaced by API responses — same shape, same props interface.

---

## Design Decisions & Trade-offs

**Why not bulk upload?**
Bulk flows introduce matching ambiguity — which file goes to which record? The one-at-a-time UX forces explicit intent, making each upload auditable and error-resistant.

**Why event-scoped?**
Participants appear across multiple events. Scoping uploads to an event prevents stale photos from bleeding across contexts and supports per-event gallery rendering.

**Why a state machine over boolean flags?**
Upload flows have 5+ states. Boolean combinations (`isLoading && !isError && hasFile`) become unreadable. An explicit `UploadStatus` type makes invalid states unrepresentable.

---

## What I'd Build Next

- [ ] **Real API integration** — replace mock data with REST/GraphQL calls
- [ ] **Optimistic UI** — show success immediately, roll back on error
- [ ] **Image validation** — enforce dimensions, aspect ratio, and file size limits pre-upload
- [ ] **Audit log** — record who uploaded what, and when, for accountability
- [ ] **Batch mode with explicit matching** — CSV upload with a review-before-commit step
- [ ] **Role-based access** — restrict upload capability to verified admin roles only

---

## License

MIT
