# denouer

Denouer is a test management solution that allows the express creation of new test cases your quality assurance professionals may be running and the import of existing automated tests across a range of languages and toolsets. This means you can have your UAT done in Cucumber while the same backend, JUnit tests get imported alongside those suites for your QA to make decisions on as a whole.

## Contributing

After installing [Docker](https://docker.com), [Yarn](https://yarnpkg.com), and [Deno](https://deno.land) just pull the packages for the part of Denouer you want to work in and run `yarn start`.

```bash
# I want to develop for the client.
cd ./ClientApp
yarn
yarn start

# I want to develop for the server.
deno run --allow-read --allow-net mod.ts
```
