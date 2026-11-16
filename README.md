# functions.js

A browser tool for plotting 3D surfaces from math formulas. Type `z = f(x, y)` or a parametric
surface `(x(u, v), y(u, v), z(u, v))`, adjust the ranges and parameters, and the mesh updates in
the viewport. The result can be exported to STL, OBJ or CSV.

Built with Next.js 14, React Three Fiber and math.js.

## Features

- **Two plot modes**
  - *Equation*: a height field `z = f(x, y)` sampled over the X and Y ranges.
  - *Parametric*: three formulas in `u` and `v`, with `u` mapped to the X range and `v` to the Y range.
- **Parameters `a` and `b`** that can be used in any formula, e.g. `cos(u) * (a + b*cos(v))`.
- **Z range clipping**: the surface is cut by two clipping planes at the Z minimum and maximum.
- **Formula library** with 26 presets, including the peaks function, Rosenbrock, Rastrigin,
  torus, Möbius strip, Klein bottle and trefoil knot.
- **Appearance**: solid color, color maps (jet, hot, cool and others) or an uploaded image as
  texture; opacity; solid, wireframe or both, with wireframe color and thickness.
- **Transform gizmo** for moving, rotating and scaling the plot.
- **Export** of the current mesh to STL, OBJ or CSV.
- Light and dark theme, Polish and English UI.

## Getting started

Requires Node.js 24. The repository uses Yarn.

```bash
yarn install
yarn dev
```

Open <http://localhost:3000>. You will be redirected to `/pl`, the default locale; `/en` serves
the English UI.

| Command      | What it does              |
| ------------ | ------------------------- |
| `yarn dev`   | Development server        |
| `yarn build` | Production build          |
| `yarn start` | Serve the production build |
| `yarn lint`  | ESLint                    |

## Writing formulas

Formulas are evaluated with [math.js](https://mathjs.org/docs/expressions/syntax.html), so its
expression syntax and function set apply: `sin`, `cos`, `exp`, `sqrt`, `abs`, `log`, `^` for
powers, `pi`, `e` and so on.

Available variables:

| Mode       | Variables          |
| ---------- | ------------------ |
| Equation   | `x`, `y`, `a`, `b` |
| Parametric | `u`, `v`, `a`, `b` |

Examples:

```text
sin(sqrt(x^2 + y^2))                       # ripple (default equation)
x^2 - y^2                                  # saddle

x = cos(u) * (a + b*cos(v))                # torus (default parametric surface)
y = sin(u) * (a + b*cos(v))
z = b * sin(v)
```

A point where the formula throws or returns `NaN` is placed at the origin, so a typo or a
singularity shows up as spikes towards `(0, 0, 0)` rather than an error message.

## Export

| Format | Contents |
| ------ | -------- |
| STL    | Triangle mesh, for slicers and CAD tools |
| OBJ    | Triangle mesh, for Blender and other 3D software |
| CSV    | One `x,y,z` row per mesh vertex |

Exported coordinates use the three.js convention, where Y is the vertical axis. In the CSV this
means the `y` column holds the function value and `z` holds the second input variable.

The mesh is sampled on a fixed 45 × 45 grid, so very detailed functions will look faceted in
both the viewport and the exported file.

## Project structure

```text
src/
  app/[locale]/        Page and layout, one route per locale
  components/
    3d/                Scene, camera, lights, plot mesh and material
    input/             Formula, parameter and axis range inputs
    layout/            Sidebar, toolbox, library and export dialogs
    tools/             Toolbox panels (texture, opacity, transform, display, wireframe)
    ui/                shadcn/ui components on top of Radix
  hooks/               Geometry generation, materials, Z clipping planes
  lib/
    math/              Formula parsing and the (u, v) -> point mapping
    convert/           STL, OBJ and CSV exporters
  assets/library/      Preset formulas shown in the library
  store/               Zustand stores: formulas, ranges and parameters, plot settings
  i18n/                next-intl routing and request config
locales/               Translation files (en, pl)
```

To add a preset to the library, append an entry to `src/assets/library/surfaces.ts`.
To add a language, create `locales/<code>/<code>.json` and add the code to `locales` in
`src/i18n/routing.ts`.
