## Shared Library
* The shared library contains codes that are used acrossed the microservices.
* The idea behind this was to prevent code duplication.
* The library is published as an npm package to `github package registry`.
* You need to publish this `shared library` to `github package registry` to be able to use it.

### Steps required to publish your package
* Clone or download this repo
* Open the project in a terminal and remove `.git` folder from the package
  * On Unix, run `rm -rf .git`
  * On Windows, you can use git bash or show hiddens files
* Execute `git init` command inside the project.
* Create a `personal access token` on github.
* Export the token locally with key `NPM_TOKEN`.
* Keep the `personal access token` because it will be needed.
* In your `.npmrc` file, add
```sh
@<your-github-username>:registry=https://npm.pkg.github.com/<your-github-username>
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```
* Replace `<your-github-username>` with your github username.
* In your `Package.json` file, add the value to the following fields
  * `name`: `@<your-github-username>/<your-library-name>`
  * `author`: `<your-name>`
  * `url`: `git+<shared-library-github-url>.git`
* You can update the `dependencies` and `devDependencies`.
* In the `.github/workflows` folder, replace `<your-github-username>` inside the `publish.yml` with your own github username.
* You can change the `node-version` to something higher.
* Create your own github project for the package.
* Push the code to github.
* Once you push, a github actions build will be triggered. If no error, your package will be published.

## Import
Whenever you make any change to the shared library folder, make sure to increment the `version` number inside `Package.json` file.
