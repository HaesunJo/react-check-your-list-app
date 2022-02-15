# React project - Check your list

<!-- ![logo](assets/icon-checkyourlist.png) -->
<img src="/assets/icon-checkyourlist.png" width="30%" height="30%"/>

## Used skills

- React Native
- Expo Go


## How to run?
- Download Expo or Expo Go app, and run the command below:


        $ expo start
           


## What I learn from this project
- How to create the app with [React Native](https://reactnative.dev/) and [Expo](https://docs.expo.dev/).
- Building knowledges about React Native and Expo.
- How to use Async storage for keeping the String data that user added.
- Build Create, Read, Update and Delete functions.




## Demo
- Link :  https://expo.dev/@haillie/projects/CheckYourList
- or open this Link on your device : exp://exp.host/@haillie/CheckYourList?release-channel=default
- AR code:

    <img src="/assets/qrcode-checkyourlist.svg" width="30%" height="30%"/>


- Demo

    <img src="/img/demo.gif" width="25%" height="25%"/>


    ### Screens
    
    <img src="/img/screen-splash.PNG" width="23%" height="23%"/> <img src="/img/screen-plain.PNG" width="23%" height="23%"/>
    <img src="/img/screen-input.PNG" width="23%" height="23%"/> <img src="/img/screen-list01.PNG" width="23%" height="23%"/>


    - Check and delete

    <img src="/img/screen-list-checked.PNG" width="25%" height="25%"/> <img src="/img/screen-list-delete.PNG" width="25%" height="25%"/>
    
    
    
     - All data delete and clear the storage

    <img src="/img/screen-data-clear.PNG" width="25%" height="25%"/>




## Features

- Delete individual list


```javascript
  const deleteTask = async (key) => {
     Alert.alert("Delete a Task", "Do you want to delete it?", [
        { text: "Cancel" },
        {
          text: "I do",
          style: "destructive",
          onPress: () => {
            const newTasks = { ...tasks };
            delete newTasks[key];
            setTasks(newTasks);
            saveTasks(newTasks);
          },
        },
     ]);
  }
```

- Empty Async storage(delete all data)

```javascript
  const clearData = async () => {
    AsyncStorage.clear();
    alert("You won't see list when you restart the app!");
  }
```
