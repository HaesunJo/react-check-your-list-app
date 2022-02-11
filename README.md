# React project - Check your list

<!-- ![logo](assets/icon-checkyourlist.png) -->
<img src="/assets/icon-checkyourlist.png" width="30%" height="30%"/>

## Used skills

- React Native
- Expo Go


## Demo
- Link :  https://expo.dev/@haillie/projects/CheckYourList
- or open this Link on your device : exp://exp.host/@haillie/CheckYourList?release-channel=default
- AR code:
    ![qrcode-checkyourlist](asstes/qrcode-checkyourlist.svg)
    ![demo](asstes/demo.gif)

    - Basic screen
        ![screen-plain](img/screen-splash.png) ![screen-plain](img/screen-plain.png)

## Features

- Authentication with Firebase
    - Login
    ```javascript
    <div
        className="login-button google"
        onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
    >
        <GoogleOutlined /> Sign In with Google
    </div>
    ```
