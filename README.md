Fresh Mint - Mobile client
=============================


INSTALLATION
------------

export ANDROID_HOME=${HOME}/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools

brew update && brew cask install react-native-debugger

PROBLEMS ON START
-----------

cd android
sudo /.grandlew clean

adb reverse tcp:8081 tcp:8081