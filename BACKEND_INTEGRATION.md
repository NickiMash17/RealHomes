# Backend Integration Checklist (RealHomes)

## 1) Configure environments

- Frontend sets API base URL in `frontend/src/utils/api.js` via `VITE_API_URL` (preferred).
- Set `VITE_API_URL` in:
  - Local dev: `frontend/.env` (copy from `frontend/.env.example`)
  - Vercel: Project → Settings → Environment Variables

## 2) Confirm API contract

Frontend calls (current):

- `GET /api/residency` (all properties)
- `GET /api/residency/:id` (single property) via `getProperty(id)`
- `POST /api/residency/create` (create property)
- `POST /api/user/register`
- `POST /api/user/bookVisit/:propertyId`
- `POST /api/user/removeBooking/:propertyId`
- `POST /api/user/toFav/:propertyId`
- `POST /api/user/allFav`
- `POST /api/user/allBookings`

Before wiring “real” data, confirm backend matches these paths + payloads + response shapes.

## 3) Auth + CORS

- Ensure backend CORS allows your deployed frontend origin (e.g. `https://<your-app>.vercel.app`).
- Ensure backend expects/validates `Authorization: Bearer <token>` where used.

## 4) Deployment consistency (make sure changes show up)

- Commit + push:
  - `frontend/src/components/Hero.jsx`
  - `frontend/src/components/Header.jsx`
  - `frontend/src/components/Properties.jsx`
  - `frontend/src/components/Footer.jsx`
  - `frontend/src/pages/Listing.jsx`
  - `frontend/src/pages/Property.jsx`
- Regenerate lockfile after dependency changes:
  - From `frontend/`: remove `node_modules` + `package-lock.json`, run `npm i`, then commit the new `package-lock.json`.
- Verify Vercel build output:
  - Vercel → Deployments → “View Build Logs”
  - Confirm it runs `npm run build` and produces `dist/` (matches `frontend/vercel.json`).

