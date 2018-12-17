# gradlew : no such file or derectory

It is usually caused by [line endings](../../backend/record/gitLineEnding.md). In windows, the line ends with `CRLF` and `LF` in linux and macos. By default, **git** will handle your line encodings with `git checkout` action.

In my case, the `line endings` in **gradlew** file below root path was auto changed to `CRLF` style, it coused the **no such file or derectory** error when execut **gradlew** commond. you can just `vi gradlew` then type `:set fileformat=unix` then `:wq` in linux terminal or have a configureation of [gitattributes](../../backend/record/gitLineEnding.md) to fix this.
