# Commands
## AWS EKS Cluster

### Generic commands to apply or delete k8s objects
* `kubectl apply -f .` - This will apply all objects found in the current directory.
* `kubectl apply -f <yaml-file-name>` - This will apply specific object found in the current directory.

### Create EKS cluster using eksctl
```sh
eksctl create cluster --name=<cluster-name> \
    --region=<your-aws-region> \
    --vpc-private-subnets=<private-subnet-id-1>,<private-subnet-id-2> \
    --without-nodegroup
```

### Associate IAM OIDC
```sh
eksctl utils associate-iam-oidc-provider \
    --region=<your-aws-region> \
    --cluster=<cluster-name> \
    --approve
```

### Create EKS nodegroup with private subnets
```sh
eksctl create nodegroup --cluster=<cluster-name> \
    --region=<your-aws-region> \
    --name=<>node-group-name> \
    --subnet-ids=<private-subnet-id-1>,<private-subnet-id-2> \
    --node-type=<ec2-instance-type> \
    --nodes=<number-of-nodes> \
    --nodes-min=<min-number-of-nodes> \
    --nodes-max=<max-number-of-nodes> \
    --node-volume-size=20 \
    --ssh-access \
    --ssh-public-key=<ssh-key-file> \
    --managed \
    --asg-access \
    --external-dns-access \
    --full-ecr-access \
    --appmesh-access \
    --alb-ingress-access \
    --node-private-networking
```

### Delete EKS cluster
* Before you can successfully delete your `eks` cluster and its nodegroup, make sure you remove any item you added to either the eks worker nodes security group or its iam role.
  * Example of such items are
    * `Amazon_EBS_CSI_Driver` added to the nodegroup role
    * Inbound rules `http`, `https`, `3000`, `9090` added to the worker nodes security group
* `eksctl delete cluster <cluster-name> --region=<your-region>`

### Delete other resources
* Once your cluster is deleted and you intend to delete resources that cost you, here are the resources you need to delete:
  * `nat gateway`
  * `elastic ip`
  * `mysql database`
  * `postgresql database`
  * `redis elasticache cluster`
  * `route 53 hosted zones`
  * Make sure you don't have any load balancer and target groups running.

### Create IAM policy
* Create policy with aws cli
```sh
aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json
```

### Create IAM service account role with eksctl
```sh
eksctl create iamserviceaccount \
  --cluster=<cluster-name> \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --role-name AmazonEKSLoadBalancerControllerRole \
  --attach-policy-arn=<policy-arn> \
  --approve
```

### Verify service account
* View all service accounts in the `kube-system` namespace
  * `kubectl get sa -n kube-system`
* You can verify that the service account was created using `eksctl`
  * `eksctl get iamserviceaccount --cluster <cluster-name>`
  * `Ex: eksctl get iamserviceaccount --cluster jobberapp`

### Install the AWS Load Balancer Controller using Helm
* Add the `eks-charts` repository
  * `helm repo add eks https://aws.github.io/eks-charts`
* Update your local repo to make sure you have the most recent charts
  * `helm repo update eks`
* Install AWS load balancer controller
  * You can get your image repository url from `https://docs.aws.amazon.com/eks/latest/userguide/add-ons-images.html` based on your region.
```sh
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
    -n kube-system \
    --set clusterName=<cluster-name> \
    --set serviceAccount.create=false \
    --set serviceAccount.name=aws-load-balancer-controller \
    --set region=<region-code> \
    --set vpcId=<vpc-xxxxxxxx> \
    --set image.repository=<account-id>.dkr.ecr.<region-code>.amazonaws.com/amazon/aws-load-balancer-controller
```

### Verify controller installation
* `kubectl get deployment -n kube-system`
* `kubectl get deployment aws-load-balancer-controller -n kube-system`
* `kubectl describe deployment aws-load-balancer-controller -n kube-system`

### Create Service for external-dns
```sh
eksctl create iamserviceaccount \
    --name <service-account-name> \
    --namespace <your-namespace> \
    --cluster <cluster-name> \
    --attach-policy-arn <external-dns-iam-policy-arn> \
    --approve \
    --override-existing-serviceaccounts
```
* If you want to delete a service account
  * `eksctl delete iamserviceaccount --cluster=<cluster-name> --name=<serviceaccount-name> --namespace=<serviceaccount-name-namespace>`

### Verify service account creation
* `kubectl get sa <serviceaccount-name> -o yaml -n <serviceaccount-name-namespace>`

### Install Prometheus with Helm Chart
* Create a Prometheus namespace
  * `kubectl create namespace prometheus`
* Add prometheus-community chart repository
  * `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
* Update helm repo
  * `helm repo update`

### Deploy Prometheus
```sh
helm upgrade -i prometheus prometheus-community/prometheus \
    --namespace prometheus \
    --set alertmanager.persistentVolume.storageClass="gp2",server.persistentVolume.storageClass="gp2" \
    --set prometheus.service.type=NodePort
```

### Prometheus External DNS
* After setting up aws-load-balancer-controller and service accounts for external-dns, you need to create the k8s objects for prometheus external dns.
* Create service account for prometheus
```sh
eksctl create iamserviceaccount \
    --name prometheus-external-dns \
    --namespace prometheus \
    --cluster <cluster-name> \
    --attach-policy-arn <external-dns-iam-policy-arn> \
    --approve \
    --override-existing-serviceaccounts
```
* Get prometheus role arn
  * `kubectl get sa prometheus-external-dns -o yaml -n prometheus`

### Install Grafana with Helm Chart
* Create a namespace for Grafana
  * `kubectl create namespace grafana`
* Add the Grafana Helm repository.
  * `helm repo add grafana https://grafana.github.io/helm-charts`
* Update helm repo
  * `helm repo update`

### Deploy Grafana
```sh
helm install grafana grafana/grafana \
    --namespace grafana \
    --set persistence.storageClass="gp2" \
    --set persistence.enabled=true \
    --set adminPassword='jobberman' \
    --set service.type=NodePort
```

### Grafana External DNS
- After setting up aws-load-balancer-controller and service accounts for external-dns, you need to create the k8s objects for grafana external dns.
- Create service account for grafana
```sh
eksctl create iamserviceaccount \
    --name grafana-external-dns \
    --namespace grafana \
    --cluster <cluster-name> \
    --attach-policy-arn <external-dns-iam-policy-arn> \
    --approve \
    --override-existing-serviceaccounts
```
* Get grafana role arn
  * `kubectl get sa prometheus-external-dns -o yaml -n prometheus`

### Uninstall a chart
* `helm uninstall <chart-name> -n <chart-namespace>`