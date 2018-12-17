# git line ending (LF && CRLF)

If you're using Git to collaborate with others on GitHub, ensure that Git is properly configured to handle line endings.

## Global settings for line endings

On OS X and Linux, you usually want to pass input for this setting. On Windows, you usually want to use true. For example:

```bash
git config --global core.autocrlf input
# Configure Git on OS X or Linux to properly handle line endings
git config --global core.autocrlf true
# Configure Git on Windows to properly handle line endings
```

## Per-repository settings

Here's an example .gitattributes file. You can use it as a template for your repositories:

```
# Set the default behavior, in case people don't have core.autocrlf set.
* text=auto

# Explicitly declare text files you want to always be normalized and converted
# to native line endings on checkout.
*.c text
*.h text

# Declare files that will always have CRLF line endings on checkout.
*.sln text eol=crlf

# Denote all files that are truly binary and should not be modified.
*.png binary
*.jpg binary
```

You'll notice that files are matched--_.c, _.sln, \*.png--, separated by a space, then given a setting--text, text eol=crlf, binary. We'll go over some possible settings below.

- `text=auto`<br/>
  Git will handle the files in whatever way it thinks is best. This is a good default option.
- `text eol=crlf`<br/>
  Git will always convert line endings to CRLF on checkout. You should use this for files that must keep CRLF endings, even on OSX or Linux.
- `text eol=lf`<br/>
  Git will always convert line endings to LF on checkout. You should use this for files that must keep LF endings, even on Windows.
- `binary`<br/>
  Git will understand that the files specified are not text, and it should not try to change them. The binary setting is also an alias for -text -diff.
