VMG — Velocity Made Good (installable PWA)
==========================================

A self-contained sailing instrument. It uses your phone's GPS to show, for a
chosen target, how fast you're actually closing on it:

  • VMG     — closing speed on the target (green) or losing ground (coral)
  • Distance and bearing to the target
  • ETA at the current VMG
  • SOG (speed over ground) and COG (course over ground)
  • Steer   — how many degrees, and which way, to turn to aim straight at it
  • A course-up compass dial with an amber needle pointing at the target

The target can be a single waypoint (a mark) OR a line (see "Lines" below).

Everything runs on-device. No account, no server, no internet once loaded.
Waypoints and lines are stored locally in your browser.


WHY IT NEEDS HOSTING
--------------------
A PWA's GPS access, installability and offline mode require the files to be
served over HTTPS (or localhost). Opening index.html straight off the disk
(file://) will NOT register the service worker or grant GPS. Put the files on
any static HTTPS host — it takes a minute.


OPTION A — Netlify Drop (fastest, no account needed to try)
-----------------------------------------------------------
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. You get an https://… URL. Open it on your phone.
   (Netlify also gives each Git branch its own preview URL — handy for a
   separate "dev" version that won't disturb the one on your home screen.)

OPTION B — GitHub Pages
-----------------------
1. Create a repo, upload all files (keep them in the repo root).
2. Settings → Pages → deploy from branch → main / root.
3. Open the published https://USER.github.io/REPO/ URL on your phone.
   Note: one live site per repo. For a separate test deployment, use a second
   repo (e.g. "vmg-dev") so it gets its own URL and its own cache.

OPTION C — Any web host
-----------------------
Upload all files to a folder served over HTTPS, kept together:
index.html, manifest.webmanifest, sw.js, and the icon-*.png files.


INSTALL ON YOUR PHONE
---------------------
iPhone (Safari):  Share → Add to Home Screen.
Android (Chrome): menu (⋮) → Install app / Add to Home screen.
Launch from the home-screen icon — it opens full-screen and works offline.


CREATING WAYPOINTS  (Waypoints tab)
-----------------------------------
Choose how to create the mark:
  • Coordinates        — type or paste a position. In Decimal format you can
                         paste "lat, lon" straight into the latitude box.
  • My position        — drops a mark at your current GPS fix.
  • Bearing & distance — projects a mark from where you are now, along a
                         bearing (°true) and distance (m / km / nm / mi).
  • From a waypoint    — same projection, but measured from a saved waypoint.

Latitude/longitude have N/S and E/W toggle buttons, so you never need a minus
sign on the phone keypad (longitude defaults to W). A typed or pasted minus
still works and overrides the toggle. Coordinate entry format — decimal
degrees, degrees-minutes, or degrees-minutes-seconds — is set in Options.

Tap a waypoint to select it (◆, amber) — that becomes the active target.
Export saves your waypoints to a JSON file; Import reads JSON or GPX and
merges, skipping duplicates.


LINES  (Lines tab)
------------------
A line gives VMG to the nearest point on it (perpendicular distance), which is
what you want for a start line or a layline. Create one two ways:
  • Two waypoints — a straight line through two saved marks.
  • Wind + mark   — a line through a mark, square to a wind direction you type
                    (°true). VMG then reads progress straight up/down-wind to
                    that mark, regardless of which way the wind blows along it.

Tap a line to select it (⟂). The Navigate screen then shows perpendicular
distance to the line, the bearing/needle to the closest point on it, and VMG
as your closing speed on the line.

Selecting a waypoint switches the target back to that mark; selecting a line
switches to the line. The header shows which is active.


NAVIGATE
--------
The big number is live VMG — green while closing, coral while losing ground,
grey when idle. It reads one decimal below 100 (e.g. 6.4) and whole numbers
above. "Big landscape display" (in Options) is a stripped-back, extra-large read-out, laid out in landscape (turn the phone sideways), for
glancing across the cockpit; "Keep screen on" holds the screen awake.


OPTIONS  (gear tab)
-------------------
  • Speed units: kn / km·h / mph (distance units follow: nm / km / mi).
  • North reference: True or Magnetic, with a manual variation you enter in
    °E/°W (East positive). All bearings shown then follow your choice; °T/°M is
    indicated. Wind directions for lines are entered as °true.
  • Coordinate entry format: decimal / deg-min / deg-min-sec.
  • Keep screen on, Use compass, and Open big display.
  • A faint build marker (e.g. "Build 20 — …") so you can confirm which version
    a deployment is actually running.

"Use compass" rotates the dial to real-world heading when you're stopped;
otherwise the dial is course-up from your GPS track, which needs no permission.


ACCURACY
--------
VMG, SOG and COG come from GPS motion, so they're most reliable once you're
actually moving (roughly >1 kn). When stationary the course is unknown, so VMG
reads 0 and the dial holds steady.

Built as a single static page — open index.html to read or tweak the logic.
