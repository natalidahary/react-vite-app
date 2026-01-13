# Product Explorer Nx Workspace
Short walkthrough: migrated the Vite app into `apps/productexplorer`, added `libs/ui`, `libs/hooks`, `libs/i18n`, and enforced Nx module boundaries.
How to run
- npx nx serve productexplorer
- npx nx build productexplorer
- npx nx lint productexplorer
- npx nx test productexplorer (echoes Playwright e2e command)
Workspace structure
- apps/productexplorer: Vite + React app
- libs: ui (Button/GlobalLoader/Toaster/Navbar/CartSidebar/ErrorMessage/ProductList), hooks (TanStack Query + app hooks/stores), i18n (init/locales/helpers)
Architecture rules (Nx module boundaries)
- type:ui -> type:hooks,type:i18n; type:hooks -> type:i18n; type:i18n -> none; apps -> any lib; libs cannot import apps
Affected demo (A4)
Command:
```
npx nx affected -t lint,build,test
```
Output:
```
NX   Affected criteria defaulted to --base=main --head=HEAD
NX   Running targets lint, build, test for 5 projects:
- productexplorer-workspace
- productexplorer
- hooks
- i18n
- ui
> nx run i18n:lint
> eslint libs/i18n/src
> nx run productexplorer:lint
> eslint apps/productexplorer/src
> nx run productexplorer:build
> vite build --logLevel error
> nx run productexplorer-workspace:build
> echo "workspace build skipped"
workspace build skipped
> nx run productexplorer-workspace:lint
> echo "workspace lint skipped"
workspace lint skipped
> nx run productexplorer-workspace:test
> echo "workspace tests skipped"
workspace tests skipped
> nx run productexplorer:test
> echo "Run npx playwright test for e2e coverage"
Run npx playwright test for e2e coverage
> nx run hooks:lint
> eslint libs/hooks/src
> nx run ui:lint
> eslint libs/ui/src
NX   Successfully ran targets lint, build, test for 5 projects
```
Equivalent to print-affected (Nx 19+)
```
npx nx show projects --affected -t build
```
```
productexplorer-workspace
productexplorer
```
Stretch (S3) CI command
- npx nx affected -t lint,test,build --base=origin/main --head=HEAD
