# docker

## cli

- `docker info`: list infos
- `docker image ls`: list all images
- `docker image ls -a | grep <image name>`: check image info by its name.
- `docker container ls`: list all running containers
- `docker container ls -a`: list all containers, even those not running
- `docker container ls -a | grep <container name>`: check container info by its name.
- `docker ps -a`: List all containers, even those not running
- `docker stop <container id>`: stop a container
- `docker start <container id>`: start a container
- `docker restart <container id>`: restart a container
- `docker rm <container id>`: remove a container
- `docker rmi <image id>`: remove an image
- `docker build -t <file name> [-f <docker file dir>] <build context>`: build your own docker image, **docker file dir** is assumed to be located in **build context** if you do not indicate where it is.
- `docker run [-i] [-t] [-d] [-v <localdir:containerdir>] [-p <local port>:<container port>] <name>[:<version>]`: run an image, **-d** means running in bg. **-i** means Keep STDIN open even if not attached. **-t** means Allocate a pseudo-TTY
- `docker logs <container id>`: check logs those had been logged within container.
- `docker commit -m "commit message" -a "MAINTAINER" <container id> <image name>[:<image id>]`: build an image from container.
- `docker-machine stop default`: stop the default docker virture machine.
- `docker cp <container id>:<path> <target path>`: copy a file from container out to target path
- `docker exec -it <container id> /bin/bash`: use `exec` to enter a container instead of `attach` whitch is already deprecated.

> Single character command line options can be combined, so rather than typing `docker run -i -t --name test busybox sh`, you can write `docker run -it --name test busybox sh`

## Dockerfile

### ENV

```bash
ENV <key> <value>
```

The ENV instruction sets the environment variable `<key>` to the value `<value>`

### COPY

```bash
COPY <src>... <dest>
```

The COPY instruction copies new files or directories from `<src>` and adds them to the filesystem of the container at the path `<dest>`.

- Multiple `<src>` resources may be specified but the paths of files and directories will be interpreted as relative to the source of the context of the build.
- The `<dest>` is an absolute path, or a path relative to **WORKDIR**, into which the source will be copied inside the destination container.

### ADD

```bash
ADD <src>... <dest>
```

The ADD instruction copies new files, directories or remote file URLs from `<src>` and adds them to the filesystem of the image at the path `<dest>`.

> almost the same as `COPY` instruction.

### EXPOSE

```bash
EXPOSE <port>[/<protocol>...]
```

The **EXPOSE** instruction informs Docker that the container listens on the specified network ports at runtime. You can specify whether the port listens on TCP or UDP, and the default is TCP if the protocol is not specified.

### WORKDIR

The **WORKDIR** instruction sets the working directory for any **RUN**, **CMD**, **COPY** and **ADD** instructions that **follow** it in the Dockerfile

The **WORKDIR** instruction can be used multiple times in a Dockerfile. If a relative path is provided, it will be relative to the path of the previous **WORKDIR** instruction. For example:

```bash
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd
```

The output of the final pwd command in this Dockerfile would be /a/b/c.

### RUN

```bash
RUN <command> (shell form)
RUN ["executable", "param1", "param2"] (exec form)
```

The **RUN** instruction will execute any commands in a new layer on top of the current image and commit the results. The resulting committed image will be used for the next step in the Dockerfile.

### CMD

```bash
CMD ["executable","param1","param2"] (exec form, this is the preferred form)
CMD ["param1","param2"] (as default parameters to ENTRYPOINT)
CMD command param1 param2 (shell form)
```

When used in the **shell** or **exec** formats, the CMD instruction sets the command to be executed when running the image.

### ENTRYPOINT

```bash
ENTRYPOINT ["executable", "param1", "param2"] (exec form, preferred)
ENTRYPOINT command param1 param2 (shell form)
```

Command line arguments to `docker run <image>`will be appended after all elements in an **exec form** **ENTRYPOINT**, and will override all elements specified using **CMD**. This allows arguments to be passed to the entry point, i.e., `docker run <image> -d` will pass the `-d` argument to the entry point. You can override the **ENTRYPOINT** instruction using the `docker run --entrypoint` flag.

The shell form prevents any **CMD** or **run** command line arguments from being used, but has the disadvantage that your **ENTRYPOINT** will be started as a subcommand of /bin/sh -c, which does not pass signals. This means that the executable will not be the container’s PID 1 - and will not receive Unix signals - so your executable will not receive a SIGTERM from `docker stop <container>`.

## how to rm all useless images and containers

1. docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker stop
2. docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker rm
3. docker images|grep none|awk '{print $3 }'|xargs docker rmi
