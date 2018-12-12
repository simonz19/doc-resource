# gradle

## gradle and gradlew

so, whats the diffrence between gralde and gradlew. <br/>
here is the official indication of gradlew:<br/>

`gradlew , gradlew.bat. A shell script and a Windows batch script for executing the build with the Wrapper. You can go ahead and execute the build with the Wrapper without having to install the Gradle runtime.`

gradlew is a script which can invoke all the capcity of gradle, it will donwload the specified version of gralde at runtime automaticaly and there is no point to configure `GRADLE_HOME` any more.

use graldew will generate `.gradle` folder below `C:\Users\administrator\.gradle` in windows and `~/.gradle` in linux.
gradle dist is located in `wrapper` folder and module dependences will be downloaded into `\caches\modules-2\files-2.1\` if not exist, the next time to build will rather use cached dependences to accelerate building.

## cli

- `gradlew clean`: clean previous build
- `gradlew build`: this will assemble all the flavors
- `gradlew lint`: run lint with configuration in apps `build.gradle`
- `gradlew assembleDebug`: build debug apk
- `graldew assembleRelease`: build release apk
- `graldew :<module name>:<commond name>`: specify a module to which the commond belongs.
- `gradlew --refresh-dependencies`: Refresh the state of dependencies

> multi commond can be combined to one, for example: `gradlew clean build`.
