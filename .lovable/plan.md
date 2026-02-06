

# Hero Enhancement, Footer Cleanup & Admin Login Fix

## Summary

Three focused improvements:
1. Upgrade the hero particle animation to a premium starfield/nebula effect
2. Strip the "Technologies We Use" section from the footer and make it dark-mode consistent
3. Reset Daniel's password to `123123` so you can access the admin area

---

## 1. Premium Starfield Hero Background

**File:** `src/components/ParticleNetwork.tsx`

Replace the current simple connected-dots animation with a multi-layered cosmic starfield:

- **Layer 1 -- Deep stars**: ~200 tiny static dots of varying brightness, some with a faint twinkle (opacity oscillation). Sizes range from 0.5px to 2px. Colors: warm whites, faint blues, occasional pale gold.
- **Layer 2 -- Drifting particles**: ~40 slightly larger particles that drift very slowly (current behavior but slower, more ethereal). Faint glow effect using `ctx.shadowBlur`.
- **Layer 3 -- Nebula haze**: 3-4 large, soft radial gradients painted at low opacity (~0.03-0.06) in deep blue, purple, and teal. These create the "Milky Way" atmospheric depth without being distracting. They drift very slowly or remain static.
- **Layer 4 -- Occasional shooting star**: Every 8-12 seconds, a single thin bright streak travels across the canvas and fades. Subtle, not flashy.

The background gradient stays dark navy (`#050a15` to `#0c1425` to `#080e1a`) for a true deep-space feel.

Connection lines between particles are removed -- this is a starfield now, not a network diagram. The result is something that feels like staring into a calm, beautiful night sky.

### Technical approach
- Same canvas-based component, same `requestAnimationFrame` loop
- Stars stored as arrays with individual twinkle phase offsets
- Nebula painted once on resize (or on a separate offscreen canvas for performance)
- Shooting star triggered on a random timer, animated as a line with decreasing alpha trail
- Device pixel ratio (`window.devicePixelRatio`) used for crisp rendering on retina displays

---

## 2. Footer Cleanup

**File:** `src/components/Footer.tsx`

- Remove the entire "TECHNOLOGIES WE USE" section (the right 8-column grid with the tool list)
- Change the footer layout to a single centered column: logo, description, social icons, then the copyright bar
- Change footer background from `bg-foreground text-background` (which is white in dark mode) to a consistent dark style: `bg-[#0a0a0a] text-white` or use dark-mode-aware classes so it stays dark regardless of theme
- Keep: logo, tagline, social media links (X, TikTok, Instagram, LinkedIn), copyright line

---

## 3. Admin Login -- Reset Daniel's Password

Daniel's account (`daniel@myhorizon.ai`) already exists in the auth system. I'll update the password to `123123` using the authentication system's admin API via an edge function or direct password update.

**Approach:** Use a database migration to call `auth.admin_update_user` -- however, since we cannot modify the `auth` schema directly, the cleanest approach is:
- Temporarily enable auto-confirm (if not already)
- The user signs in at `/auth` with `daniel@myhorizon.ai` / `123123`

Since I cannot reset passwords through SQL migrations on the `auth` schema, I will create a small one-time edge function that resets the password using the Supabase admin client, call it once, then remove it. Alternatively, the simplest path: I'll update the Auth settings and have you use the "forgot password" flow -- but since there's no forgot-password UI, the edge function approach is cleanest.

**Implementation:** Create `supabase/functions/reset-admin-password/index.ts` that uses the service role key to update Daniel's password, call it once after deploy, then delete it.

---

## Files Summary

| File | Action |
|------|--------|
| `src/components/ParticleNetwork.tsx` | Major rewrite -- starfield with twinkling stars, nebula haze, shooting stars |
| `src/components/Footer.tsx` | Remove tech list, simplify layout, make always-dark background |
| `supabase/functions/reset-admin-password/index.ts` | NEW (temporary) -- one-time password reset for daniel@myhorizon.ai |

---

## Technical Details

### Starfield Particle Types
```text
Star {
  x, y: number           -- position
  radius: number          -- 0.3 to 2px
  baseAlpha: number       -- 0.3 to 1.0
  twinkleSpeed: number    -- 0.005 to 0.02 (radians per frame)
  twinklePhase: number    -- random start offset
  color: string           -- '#ffffff', '#c4d4ff', '#ffe8c4'
}

DriftParticle {
  x, y, vx, vy: number   -- position + velocity (very slow)
  radius: number          -- 1 to 3px
  alpha: number           -- 0.2 to 0.6
  glowRadius: number      -- 4 to 8px
}

ShootingStar {
  x, y: number            -- current position
  angle: number           -- travel direction
  speed: number           -- 3 to 6px per frame
  length: number          -- trail length 40-80px
  alpha: number           -- starts at 1, fades to 0
  active: boolean
}

NebulaCloud {
  x, y: number            -- center position (% of canvas)
  radius: number          -- 200-500px
  color: string           -- deep blue/purple/teal
  alpha: number           -- 0.02 to 0.05
}
```

### Footer Simplified Structure
```text
<footer className="bg-[#0a0a0a] text-white py-16">
  <div className="container text-center">
    -- Logo + name
    -- Tagline (1 line)
    -- Social icons (horizontal row)
    -- Divider
    -- Copyright + "AI Systems & Automation"
  </div>
</footer>
```

### Password Reset Edge Function
```text
-- Uses SUPABASE_SERVICE_ROLE_KEY (auto-available in edge functions)
-- Calls supabase.auth.admin.updateUserById(userId, { password: '123123' })
-- Returns success/failure
-- Will be called once via curl, then deleted
```

