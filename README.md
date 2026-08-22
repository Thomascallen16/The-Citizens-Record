# The-Citizens-Record
The Citizen's Record is a civic education project, not a news outlet or an advocacy organization.


## Quality checks

The repository includes dependency-free structural validation and Node-native tests for the source-first civic-workbench experience.

```bash
npm run validate
npm test
npm run check
```

GitHub Actions runs the same validation on pull requests to `main`, pushes to `main`, and manual workflow dispatches. The checks protect the Record Builder entry path, source-first method, Truth Standard, local asset links, required deployment materials, and reusable skill package.


## Deployment

The static production assets are staged with:

```bash
npm run build:pages
```

After **Static Site CI** passes for `main`, the **Deploy GitHub Pages** workflow deploys the staged `dist/` assets to [GitHub Pages](https://thomascallen16.github.io/The-Citizens-Record/). The deployment workflow can also be run manually from the repository’s Actions tab. It deploys only public website assets and intentionally excludes the deployment archives, reusable skill package, tests, and repository documentation.
