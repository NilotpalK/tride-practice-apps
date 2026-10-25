# tride-practice-apps

Practice apps for Tride (Coder) workspaces, published as container images that the workspace template pulls.
Each app runs in its own container next to the editor and is built to work behind code-server's `/proxy/<port>/` path.

| App | Image | Port |
|---|---|---|
| [`swag-labs`](swag-labs) | `ghcr.io/nilotpalk/swag-labs:<commit>` | 7410 |

Every push to `main` that touches an app builds its image, tags it with the commit SHA and `latest`,
and smoke-tests it as a non-root user ([`images.yml`](.github/workflows/images.yml)). Templates should pin the commit tag.

## swag-labs

[Sauce Labs' sample app](https://github.com/saucelabs/sample-app-web) (MIT, see [`swag-labs/LICENSE`](swag-labs/LICENSE)),
copied at upstream commit `3f05b93c488c48c94721c95be3037c3d2d476d80` with these changes so it works behind a path prefix:

- `src/index.jsx`: `HashRouter` instead of `BrowserRouter` (pages are `#/inventory.html`, …)
- `vite.config.js`: `base: "./"` so every asset path is relative
- `index.html`: icon and manifest links made relative
- `src/pages/InventoryItem.jsx`: reads `?id=` from the router location (with hash routes it is not in `window.location.search`)

Test users (password `secret_sauce`): `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`.

Run locally:

```sh
docker build -t swag-labs swag-labs && docker run --rm -p 7410:7410 swag-labs
```
