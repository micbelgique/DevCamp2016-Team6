> Ce projet a été réalisé dans le cadre du [Dev Camp 2016](http://www.mic-belgique.be/devcamp) du [Microsoft Innovation Center](http://www.mic-belgique.be/).
>
> Le Dev Camp est un Hackathon Open Source permettant aux développeurs de prototyper gratuitement une application pour des porteurs de projets n'ayant pas forcément les fonds nécessaires à son développement.
> Les projets sont sélectionnés en fonction de leur capacité à être réutilisables par d’autres entreprises Wallonnes.
>
> Le code source est Libre et Open Source (licence MIT).
>
> Vous pouvez suivre le MIC sur [Facebook](https://www.facebook.com/micbelgique), sur [Twitter](https://twitter.com/micbelgique) et aussi suivre nos événements sur [Meetup](www.meetup.com/micbelgique/)

# Cliché

## But du projet

Découvrir une région via une série de clichés à collectionner.

## Equipe: Creative Monkeys

+ Aurélien Malisart
+ François Stephany
+ ~~Julien Fontaine (Papa)~~
+ Michaël Hoste

## Backend

    $ cd backend
    $ bundle
    $ rake app:reset
    $ rails server

## Mobile

    $ cd mobile
    $ npm i
    $ react-native start
    $ react-native run-ios
    $ react-native run-android

### Sreenshots React Native Android

![](screenshots/react-android-5.png)
![](screenshots/react-android-2.png)
![](screenshots/react-android-3.png)
![](screenshots/react-android-4.png)

## Android native

The app uses the latest SDK and build tools (24). minSDKVersion: 21 (Lollipop)

Stack:

- Support libraries (24.1.1)
- Google Play Maps
- Retrofit
- RxJava
- Timber
- Glide
- MaterialDialogs

### Installation

	$ cd android-native/
	$ ./gradlew installDebug

### Screenshots

![](screenshots/native-missions-list.png)
![](screenshots/native-mission-description.png)
![](screenshots/native-mission-spots.png)
![](screenshots/native-unlocked-spot.png)
![](screenshots/native-spot-map.png)
![](screenshots/native-confirm-picture.png)
![](screenshots/native-uploading.png)

