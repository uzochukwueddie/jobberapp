######################
# Become a Certificate Authority
######################

# Generate private key
openssl genrsa -des3 -out domain.key 2048
# Generate root certificate
openssl req -x509 -new -nodes -key domain.key -sha256 -days 825 -out domain.pem

######################
# Create CA-signed certs
######################

NAME=jobberapp.info # Use your own domain name
# Generate a private key
openssl genrsa -out $NAME.key 2048
# Create a certificate-signing request
openssl req -new -key $NAME.key -out $NAME.csr
# Create a config file for the extensions
>$NAME.ext cat <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = $NAME # Be sure to include the domain name here because Common Name is not so commonly honoured by itself
DNS.2 = api.$NAME # Optionally, add additional domains (I've added a subdomain here)
# IP.1 = 192.168.0.13 # Optionally, add an IP address (if the connection which you have planned requires it)
EOF
# Create the signed certificate
openssl x509 -req -in $NAME.csr -CA domain.pem -CAkey domain.key -CAcreateserial \
-out $NAME.crt -days 825 -sha256 -extfile $NAME.ext