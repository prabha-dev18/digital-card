# Digital Business Card — India Flag Theme

A self-service, 3D interactive digital business card generator, themed
around the Indian national flag (saffron / white / Ashoka Chakra /
green). Built with Next.js (App Router, JavaScript), Tailwind CSS,
react-three-fiber, and framer-motion.

## How it works

This is **not** a single static card — it's a generator. You deploy it
once (e.g. on Vercel) and share **one link** with everyone in your
office over WhatsApp, email, Slack, etc.

When someone opens the link:
1. They see a form (name, title, company, phone, email, photo, social
   links).
2. A live 3D card preview updates as they type.
3. They click **"Generate My Card"** to reveal the full interactive
   flip card with download/share buttons.
4. They can download it as a **PNG**, a two-page **PDF** (front +
   back), save it as a **.vcf contact**, copy a shareable link, or use
   their phone's native share sheet.

Everything happens **entirely in the browser** — there is no backend,
database, or file upload server. Each employee's details only ever
exist in their own browser (in React state, `localStorage` for
recovering an in-progress form, and optionally URL-encoded if they
re-share their finished card).

> Note: uploaded photos are not included in the shareable `?data=`
> link (URLs can't hold a several-hundred-KB image). A re-shared link
> shows the card with a placeholder avatar. See the comment in
> `lib/encodeCardData.js` if you want to wire up real image hosting.

## Setup

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploying

Push to a Git repo and import it into [Vercel](https://vercel.com) —
zero config needed, it's a standard Next.js app.

## Project structure

```
app/
  layout.js          Root layout, Tailwind import
  page.js            Form -> live preview -> generated card flow;
                      also handles the read-only ?data= shared view
  globals.css         Tailwind directives + 3D flip CSS helpers
components/
  CardForm.jsx        Self-entry form with validation
  CardPreviewPane.jsx Wraps the 3D card + download actions, owns the
                      DOM refs used for PNG/PDF export
  BusinessCard3D.jsx  Flip (CSS 3D transform) + mouse-tilt (framer-motion)
  CardFront.jsx       Front face: photo, name, title, company
  CardBack.jsx        Back face: contact info, socials, QR, save contact
  AshokaChakra.jsx    Real react-three-fiber 3D rotating chakra emblem
  DownloadActions.jsx PNG / PDF / vCard / copy link / share buttons
lib/
  generateVCard.js    Builds + downloads a .vcf file
  encodeCardData.js   Base64-encodes card data into a URL query param
  decodeCardData.js   Decodes it back out for the read-only view
hooks/
  useCardFormPersistence.js  Saves/restores in-progress form data
                              to localStorage
```

## Customizing

- To lock the "Company" field to your org name by default, edit
  `DEFAULT_DATA.company` in `app/page.js`.
- Colors live in `tailwind.config.js` under `saffron`, `indiaGreen`,
  `chakraNavy`.
- The chakra's rotation speed is set in `AshokaChakra.jsx`
  (`(Math.PI * 2) / 20` = one full turn every 20 seconds).

## Notes on the 3D approach

- The card **flip** and **mouse-tilt** use CSS 3D transforms driven by
  React/framer-motion — this keeps text, photos, and buttons crisp and
  fully accessible (real DOM, not canvas).
- The **Ashoka Chakra** watermark is a genuine `@react-three/fiber`
  WebGL scene (torus ring + 24 spoke meshes) rotating continuously —
  this is the card's actual 3D element, per the brief.
- `prefers-reduced-motion` disables the tilt effect and the CSS flip
  transition speed for users who've asked for reduced motion.
