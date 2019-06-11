# ngrok

ngrok 1.x is a open source reverse proxy that creates a secure tunnel from a public endpoint to a locally running web service

you have to get the source code and build it youself

> the source code is not available any more after 2.x

## set up golang

the ngrok is based on `go language`, so you have to set up a `go enviroment`, here is the example on 32bit centos:

```bash
$ cd /usr/local
$ wget https://dl.google.com/go/go1.12.5.linux-386.tar.gz
$ tar -xzvf go1.12.5.linux-386.tar.gz
$ touch /etc/profile.d/go.sh
$ vi /etc/profile.d/go.sh
$ soruce /etc/profile
```

the file `go.sh` should be like:

```sh
export GOPATH=/usr/local/go
export PATH=$PATH:$GOPATH/bin
```

## download ngrok executable binary source code

the source code is hosted on github, you can download it here [https://github.com/inconshreveable/ngrok](https://github.com/inconshreveable/ngrok)

## certification

### specify NGROK_DOMAIN env variable

like step [set up golang](#set-up-golang) do, touch a file named `ngrok` below **/etc/profile.d/**, the content should be like:

```sh
export NGROK_DOMAIN="ngrok.<domain>.<top-level domain>"
```

### generate ssl certification

```bash
$ mkdir /usr/local/ngrok/release
$ cd /usr/local/ngrok/release
$ openssl genrsa -out rootCA.key 2048
$ openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$NGROK_DOMAIN" -days 5000 -out rootCA.pem
$ openssl genrsa -out server.key 2048
$ openssl req -new -key server.key -subj "/CN=$NGROK_DOMAIN" -out server.csr
$ openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 5000
```

### copy them to the assetes folder and rename

```bash
$ cp rootCA.pem ../assets/client/tls/ngrokroot.crt
$ cp server.crt ../assets/server/tls/snakeoil.crt
$ cp server.key ../assets/server/tls/snakeoil.key
```

## compile

```bash
$ cd ..
#win server side
$ GOOS=windows GOARCH=386 make release-server
#win client side
$ GOOS=windows GOARCH=386 make release-client
#linux server side
$ GOOS=linux GOARCH=386 make release-server
#linux client side
$ GOOS=linux GOARCH=386 make release-client
```

## server side deployment

```bash
$ cd /usr/local/ngrok/bin
$ cp ngrokd /usr/local/ngrok/release/ngrokd
$ cd /usr/local/ngrok/release
$ ./ngrokd -tlsKey="server.key" -tlsCrt="server.crt" -domain="$NGROK_DOMAIN" -httpAddr=":8081" -httpsAddr=":8082"
```

then you will find the reverse proxy is stared on port `4443`.

## client side

create a config file named `ngrok.cfg` first before start end user application, the content should be:

```bash
server_addr: "$NGROK_DOMAIN:4443" # the $NGROK_DOMAIN should be replace by the real value
trust_host_root_certs: false
```

then just run commond:

```bash
ngrok.exe -subdomain <domain name> -config ngrok.cfg <port>
```

* replace the `<domain name>` to what ever you want to name a subdomain
* replace the `<port>` to your local running service port whitch you want to expose to the public endpoint.