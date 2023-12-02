## Freelance Marketplace Application
* This application is built using these main tools
  * `Vite`
  * `React`
  * `Typescript`
  * `Tailwindcss`
  * `Redux Toolkit`
  * `RTK Query`
  * `Stripe`
  * `Elasticsearch`
  * `Axios`
  * `React Router DOM`
  * `React Redux`
  * `React Quill`
  * `SocketIO Client`
  * `ESlint and Prettier`
* There are other tools and packages used.
* You can update the version of `NodeJS` used inside the `Dockerfile`
* Copy contents of `.env.dev` to `.env` file
  * Create an account on `https://stripe.com`
    * Go to developers page to get your api key for the client (it starts with `pk_`)
    * Add the api key to `VITE_STRIPE_KEY`

### Create docker images
* You can create your own docker image from this microservice.
* Create an account on `hub.docker.com` or login if you already have one.
* Make sure to login on your terminal as well.
* Steps to build and push your image to docker hub
  * `docker build -t <your-dockerhub-username>/jobber-frontend .`
  * `docker tag <your-dockerhub-username>/jobber-frontend <your-dockerhub-username>/jobber-frontend:stable`
  * `docker push <your-dockerhub-username>/jobber-frontend:stable`

