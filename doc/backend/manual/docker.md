run# docker

## cli

- `docker info`: list infos
- `docker image ls`: list all images
- `docker container ls`: list all containers
- `docker ps -a`: list all containers
- `docker stop <container id>`: stop a container
- `docker start <container id>`: start a container
- `docker restart <container id>`: restart a container
- `docker rm <container id>`: remove a container
- `docker rmi <image id>`: remove an image
- `docker build -t <file name> [-f <docker file dir>] <build context>`: build your own docker image, **docker file dir** is assumed to be located in **build context** if you do not indicate where it is.
- `docker run -d -p <local port>:<container port> <name>:<version>`: run an image, **-d** means running in bg
- `docker logs <container id>`: check logs those had been logged within container.

## Dockerfile

### COPY

### ADD

### WORKDIR

### RUN

### CMD