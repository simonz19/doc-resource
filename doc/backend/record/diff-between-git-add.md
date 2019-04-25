# difference between git add

`git add [-u | --update] [-A | --all] [<pathspec>…​]`

## in version 1.x

```git
$ git add .   # stages new files and modifications, without deletions
$ git add -u  # stages modifications and deletions, without new files
$ git add -A  # stages all changes
```

## in version 2.x

**`-A` is now the default**

```git
$ git add .    # stages new/modified/deleted files in the current directory
$ git add -A .    # the same as git add .
$ git add --ignore-removal .    # stages new/modified files in the current directory
$ git add -u .     # stages modified/deleted files in the
current directory
```

> without the dot, stages all files in the project regardless of the current directory
