## API Gateway Microservice
* The gateway microservice is responsible for managing requests that comes from the frontend.
* Every request that comes from the frontend must pass through the `API Gateway Service`.
* The communication style used in the service is the `Request/Response` pattern.
* The gateway service is also responsible for request validation. It adds the `json web token` to the cookie session and checks if the token in a request is valid.
* All client side errors from other microservices are sent to the gateway service. The gateway service sends these errors to the client.
* Server side errors from the gateway microservice is sent to `elasticsearch` and can be viewed on `kibana`.
* Gateway service uses these tools as the main tools
  * `Your shared library`
  * `NodeJS`
  * `Express`
  * `Typescript`
  * `Axios`
  * `Redis`
  * `Elasticsearch`
  * `Json web token`
  * `SocketIO`
  * `SocketIO client`
* There are other packages that are used.
* You can update the version of `NodeJS` used inside the `Dockerfile` and `Dockerfile.dev`.
* Make sure you already have your own shared library published.
* Copy the `.npmrc` file from your shared library folder and replace `${NPM_TOKEN}` with the actual `personal access token` you created.
* Once you have your `.npmrc` and before you run `npm install` command, replace all occurrences of `@uzochukwueddie/jobber-shared` with your own shared library.
* After replacing all occurrences of `@uzochukwueddie/jobber-shared`, you can then run `npm install` command.
* Copy contents of `.env.dev` to `.env` file
  * In the `DATABASE_HOST` env variable, use your own ip as its value.
  * You can generate a new `GATEWAY_JWT_TOKEN` and `JWT_TOKEN`
    * Just note that whatever you generate, that is what you will need to use in all the microservices that require those variables.
* You can start the service with `npm run dev`.

### Create docker images
* You can create your own docker image from this microservice.
* Create an account on `hub.docker.com` or login if you already have one.
* Make sure to login on your terminal as well.
* Steps to build and push your image to docker hub
  * `docker build -t <your-dockerhub-username>/jobber-review .`
  * `docker tag <your-dockerhub-username>/jobber-review <your-dockerhub-username>/jobber-review:stable`
  * `docker push <your-dockerhub-username>/jobber-review:stable`
