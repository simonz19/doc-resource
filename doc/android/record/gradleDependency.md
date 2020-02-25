# Gradle dependency

## statement of dependencies

Below set of statement are used to indicate the dependencies those should included in the compilation.
But there are a bit a difference between them, as show here:

### compile

Will expose the dependencies to parent modules.

### api

nearly the same as [compile](#compile), but now we use `api` most of the time to replace [compile](#compile).

Will expose the dependencies to parent modules.

### implementation

Will not expose the dependencies to parent modules, that means you can't get the dependency classes of submodule in the parent module.

That means the dependency declared by implementation is not a trasitive dependency.

### compileOnly

The difference with [compile](#compile) is that packages your java code use from a `compileOnly` dependency will not be listed as Import-Package manifest entries.