VMG — Velocity Made Good (installable PWA)
==========================================

A self-contained navigation instrument. It uses your phone's GPS to show:
  • VMG  — how fast you're closing on the selected mark (green) or losing ground (coral)
  • Distance and true bearing to the mark
  • SOG (speed over ground) and COG (course over ground)
  • ETA at the current VMG
  • A course-up compass dial with an amber needle pointing to the mark

Everything runs on-device. No account, no server, no internet needed once loaded.
Waypoints are stored locally in your browser.


WHY IT NEEDS HOSTING
--------------------
A PWA's GPS access, installability and offline mode require the files to be served
over HTTPS (or localhost). Opening index.html directly from the file system
(file://) will NOT register the service worker or grant GPS. Put the files on any
static HTTPS host — it takes a minute.


OPTION A — Netlify Drop (fastest, no account needed to try)
-----------------------------------------------------------
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. You get an https://… URL. Open it on your phone.

OPTION B — GitHub Pages
-----------------------
1. Create a repo, upload all files (keep them in the repo root).
2. Settings → Pages → deploy from branch → main / root.
3. Open the published https://USER.github.io/REPO/ URL on your phone.

OPTION C — Any web host
-----------------------
Upload all files to a folder served over HTTPS. Keep them together
(index.html, manifest.webmanifest, sw.js, and the icon-*.png files).


INSTALL ON YOUR PHONE
---------------------
iPhone (Safari):  Share → Add to Home Screen.
Android (Chrome): menu (⋮) → Install app / Add to Home screen.
Launch it from the home-screen icon — it opens full-screen like a native app
and works offline.


USING IT
--------
1. Waypoints tab → choose how to create the mark:
     • Coordinates       — type or paste decimal degrees ("lat, lon" works).
     • My position       — drops a mark at your current GPS fix.
     • Bearing & distance — projects a mark from your current position along a
                            bearing (°true) and distance (m / km / nm / mi).
     • From a waypoint    — same, but measured from another saved waypoint.
   The relative modes show a live preview of the resulting coordinates.
2. Tap a waypoint to select it (amber ring) — that becomes the active mark.
3. Navigate tab shows the live VMG. The big number glows green while you're
   closing and coral while you're losing ground.
4. Top-right button cycles units: kn / km·h / mph (distance follows: nm / km / mi).
5. "Keep screen on" holds the display awake while underway.
6. "Use compass" makes the dial point to the real-world direction when stopped
   (otherwise the dial is course-up from your GPS track, which needs no permission).

Note on accuracy: VMG, SOG and COG come from GPS motion, so they're most reliable
once you're actually moving (roughly >1 kn). When stationary the course is unknown,
so VMG reads 0 and the dial holds north-up.

Files are MIT-style free to modify. Built as a single static page — open
index.html to read or tweak the logic.
