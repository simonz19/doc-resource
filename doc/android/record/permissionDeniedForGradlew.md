# permission denied for gradlew

## no execute permission

just locate to gradlew folder and commond `chmod +x gradlew` to add execute permission.

## no execute permission width docker volumn

its most likely there is no permission for container to execute gradlew shell whitch located in host filesystem, however, just add `--privilege=true` to `docker run` commond could solve this problem.

## fix chmod with git

A little desciption to understand the problem.
First of all you can check your permissions using:

`git ls-tree HEAD`

You will see:

`100644 blob xxxxxxxxxxx gradlew`

As you can see the file has 644 permission.

Fix it by setting the executable flag on your gradlew file changing it to 755:

`git update-index --chmod=+x gradlew`

Just commit and push the changes
