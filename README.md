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
