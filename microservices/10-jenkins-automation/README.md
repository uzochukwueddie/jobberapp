## Jenkins Automation
* The jenkins automation repo contains some methods that are used inside the different microservices `Jenkinsfile`.
* In the `notifiySlack` method, you need to get your own slack webhook
  * `https://api.slack.com/messaging/webhooks`
  * Download slack and create an account.
  * Follow the steps in the documentation to create a webhook.
  * Add the webhook url to `slackURL`
* Create a github repo for the jenkins automation project.
* Push your code to the repo.
* Use the repo url inside all the microservices `Jenkinsfile`
