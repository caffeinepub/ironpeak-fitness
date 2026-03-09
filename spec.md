# IronPeak Fitness

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Multi-page gym fitness website with 4 pages: Home, Programs, Trainers, Contact
- Home page: hero section with tagline and CTA, features/benefits section, stats (members, trainers, programs), testimonials section
- Programs page: list of fitness programs (e.g. Strength Training, HIIT, Yoga, Cardio, Crossfit, Nutrition) with descriptions, duration, difficulty level, and enrollment CTA
- Trainers page: grid of trainer profiles with name, specialty, bio, certifications, and social links
- Contact page: contact form (name, email, subject, message), gym location/hours info, and FAQ section
- Persistent navigation bar with links to all 4 pages and a prominent CTA button
- Footer with gym info, quick links, and social media links
- Backend stores contact form submissions and exposes program/trainer data

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Motoko canister with data types for Programs, Trainers, ContactSubmissions. Expose query/update methods for reading programs, trainers, and submitting contact form.
2. Frontend: React multi-page app using React Router. Pages: Home, Programs, Trainers, Contact. Shared Navbar and Footer components.
3. Home: Hero with video/image background, stats counters, program highlights, testimonials.
4. Programs: Grid/card layout for each program with details and CTA.
5. Trainers: Grid of trainer profile cards with photo, bio, specialty.
6. Contact: Form wired to backend submitContact, plus location/hours sidebar and FAQ accordion.
7. Nav: Sticky navbar with mobile hamburger menu, active link highlighting.
