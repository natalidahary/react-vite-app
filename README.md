# Product Explorer Nx Workspace
Short walkthrough: migrated the Vite app into `apps/productexplorer`, added `libs/ui`, `libs/hooks`, `libs/data`, `libs/i18n`, and enforced Nx module boundaries.
How to run
- npx nx serve productexplorer
- npx nx build productexplorer
- npx nx lint productexplorer
- npx nx test productexplorer (echoes Playwright e2e command)
Workspace structure
- apps/productexplorer: Vite + React app
- libs: ui (Button/GlobalLoader/Toaster/Navbar/CartSidebar/ErrorMessage/ProductList), hooks (app hooks/stores), data (types + API helpers), i18n (init/locales/helpers)
Architecture rules (Nx module boundaries)
- type:ui -> type:hooks,type:data,type:i18n; type:hooks -> type:data,type:i18n; type:data -> none; type:i18n -> none; apps -> any lib; libs cannot import apps
Affected demo (A4)
Command:
```
npx nx affected -t lint,build,test
```
Output:
```
NX    Completed 5 lint, build, test tasks, and 4 others they depend on (6.2s)                      Cache   Duration

✔    hooks:lint                                                                                       -       3.7s
✔    productexplorer:lint                                                                             -       4.2s
✔    productexplorer:build                                                                            -       4.4s
✔    productexplorer-workspace:build                                                                  -       22ms
✔    productexplorer-workspace:lint                                                                   -       19ms
✔    productexplorer-workspace:test                                                                   -       22ms
✔    productexplorer:test                                                                             -       17ms
✔    i18n:lint                                                                                        -       1.9s
✔    ui:lint                                                                                          -       2.1s
```
Equivalent to print-affected (Nx 19+)
```
npx nx show projects --affected -t build
```
```
natalidahary@MacBookPro react-vite-app % npx nx show projects --affected -t build

productexplorer-workspace
productexplorer
```
Stretch (S3) CI command
- npx nx affected -t lint,test,build --base=origin/main --head=HEAD
Output:
```
natalidahary@MacBookPro react-vite-app % NX_DAEMON=false NX_ISOLATE_PLUGINS=false npx nx affected -t lint,test,build --base=origin/main --head=HEAD

✔  nx run productexplorer:build
✔  nx run productexplorer:lint
✔  nx run hooks:lint
✔  nx run i18n:lint
✔  nx run ui:lint
✔  nx run productexplorer-workspace:build
✔  nx run productexplorer-workspace:lint
✔  nx run productexplorer-workspace:test
✔  nx run productexplorer:test
```
