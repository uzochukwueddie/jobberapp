This repo contains all codes for the ECommerce freelance marketplace application.

### Jobber Client
* The `jobber-client` folder contains the frontend code.
* The frontend application is built using `React`, `Typescript` and `Tailwindcss`.

### Kubernetes
* The `jobber-k8s` folder contains the objects code needed to deploy the microservices to kubernetes.
* The microservices are deployed to both `Minikube` and `AWS EKS Cluster`.

### Microservices
* The `microservices` folder contains all the backend code for the application's services.
* The services can be started either individually from the terminal or via docker compose.
* [Microservices README file](https://github.com/uzochukwueddie/jobberapp/blob/main/microservices/README.md)

### Volumes
* The `volumes` folder contains files that are used to run services for local development.
* [Volumes README file](https://github.com/uzochukwueddie/jobberapp/blob/main/volumes/README.md)