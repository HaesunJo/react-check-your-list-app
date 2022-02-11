# React project - Check your list

![logo](assets/icon-checkyourlist.png)

## Used skills

- React Native
- Expo Go


## Demo
- Link :  https://expo.dev/@haillie/projects/CheckYourList
- or open this Link on your device : exp://exp.host/@haillie/CheckYourList?release-channel=default
- AR code:
    ![qrcode](asstes/qrcode-checkyourlist.svg)
    ![demo-img](asstes/demo.gif)

    - Basic screen
        ![screen-plain](img/screen-splash) ![screen-plain](img/screen-plain)

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