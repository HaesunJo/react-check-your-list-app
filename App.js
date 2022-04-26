import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { Fontisto, AntDesign } from "@expo/vector-icons";
import { theme } from "./colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@tasks";

export default function App() {

  const [daily, setDaily] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [tasks, setTasks] = useState({}); // create a hashmap to use this as an object for easy managing the data
  const [completed, setCompleted] = useState(true);
  const [edit, setEdit] = useState(-1);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    // useState of daily has 'true' at the beginning, 
    // if the user close the app on 'Travel' view, useState pass the value as false.
    console.log("daily or what", daily); 
  }, [daily]);

  // const complete = () => setCompleted(false);
  const travel = () => setDaily(false);
  const dailyTask = () => setDaily(true);
  const onChangeText = (inputFromUser) => setUserInput(inputFromUser);

  const saveTasks = async (toSave) => {
    // parse exsisting tasks to string values
    // const stringified = JSON.stringify(toSave);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch(e) {
      console.log("err at save");
    }
  };

  const loadTasks = async () => {
    try {
      const load = await AsyncStorage.getItem(STORAGE_KEY);
      return load != null ? setTasks(JSON.parse(load)): null;
      // console.log(load, JSON.parse(load));
    } catch(e) {
      console.log("err at load");
    }
  };

  const taskAdded = async () => {
    if(userInput === ""){
      return;
    }

    const newTasks = {
      ...tasks,
      [Date.now()]: { userInput, daily, completed: false },
    };
    setTasks(newTasks);
    await saveTasks(newTasks);
    // save the input from users
    setUserInput("");
    // alert("Ta-Da! Your task is added!");
  }
  console.log(tasks);

  const deleteTask = async (key) => {
    if (Platform.OS === "web"){
      const webEnv = confirm("Do you want to delete it?");
      if (webEnv){
        const newTasks = { ...tasks };
        delete newTasks[key];
        setTasks(newTasks);
        saveTasks(newTasks);
      }
    } else {
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
  }

  const completedTask = async (key, type, value) => {
    const newTasks = { ...tasks };
    newTasks[key][type] = value;
    setTasks(newTasks);
    await saveTasks(newTasks);
  }

  const editTask = async (key) => {
    await completedTask(key, "userInput", userInput);
    setUserInput("");
    setEdit(-1);
  }

  const clearData = async () => {
    AsyncStorage.clear();
    alert("You won't see list when you restart the app!");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={dailyTask}>
          <Text 
          style={{
            fontSize: 30,
            fontWeight: "500",
            color: daily ? "white" : theme.grey}}>
            Daily
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={travel}>
          <Text 
          style={{
            fontSize: 30,
            fontWeight: "500",
            color: !daily ? "white" : "#3A3D40"
            }}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        onSubmitEditing={taskAdded}
        returnKeyType="done"
        value={userInput}
        autoCapitalize={"sentences"}
        onChangeText={onChangeText}
        placeholderTextColor={"#8EAEED"}
        placeholder={daily? "Add your daily task here!" : "Don't forget stuff you need for travel!"}
        style={styles.input} />

      <ScrollView>
        {Object.keys(tasks).map((key) => (
          tasks[key].daily === daily ? ( 
            <View style={styles.list} key={key}>
              <TouchableOpacity onPress={() => completedTask(key, "completed", !tasks[key].completed)}>
                {tasks[key].completed === completed ? (
                  <Fontisto name="checkbox-active" size={18} color={theme.grey} />
                ) : (
                  <Fontisto name="checkbox-passive" size={18} color={theme.grey} />
                )}
              </TouchableOpacity>

              {edit != key && (
                <Text style={{ ...styles.listText, 
                  color: tasks[key].completed === false ? "white" : theme.grey, 
                  textDecorationLine: tasks[key].completed === false ? "none" : "line-through"}}>{tasks[key].userInput}</Text>
              )}

              {edit == key && (
                <TextInput
                  returnKeyType="done"
                  onChangeText={onChangeText}
                  placeholderTextColor={theme.grey}
                  style={styles.editTask}
                  onSubmitEditing={() => {
                    editTask(key);
                  }}
                >{tasks[key].userInput}</TextInput>
              )}

              {edit != key && (
                <View style={styles.rightColumn}>
                  <TouchableOpacity onPress={() => {setEdit(key); setUserInput(tasks[key].userInput);}}>
                    <AntDesign name="edit" size={20} color={theme.grey} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => deleteTask(key) }>
                    <Fontisto name="trash" size={18} color={theme.grey} style={{ paddingStart:10}} />
                  </TouchableOpacity>
                </View>
              )}

              {/* {when user edit the input texts this button will be display} */}
              {edit == key && (
                <View style={styles.rightColumn}>
                  <TouchableOpacity onPress={() => editTask(key)}>
                    <AntDesign name="edit" size={20} color={theme.grey} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
        ) : null
        ))}
      </ScrollView>

      <View>
      <TouchableOpacity onPress={clearData}>
        <Text style={{ color: "#8EAEED", marginBottom: 25 }}>If you want to reset your data, click here.</Text>
      </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex             : 1,
    backgroundColor  : '#000',
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection : "row",
    marginTop     : 100,
  },
  btnsText: {
    fontSize  : 30,
    fontWeight: "500",
  },
  input: {
    fontSize         : 16,
    borderRadius     : 30,
    paddingVertical  : 15,
    paddingHorizontal: 20,
    backgroundColor  : "#fff",
    marginVertical   : 15,
  },
  list: {
    backgroundColor  : theme.listBg,
    marginBottom     : 10,
    paddingVertical  : 20,
    paddingHorizontal: 30,
    borderRadius     : 15,
    flexDirection    : "row",
    alignItems       : "center",
    justifyContent   : "space-between",
  },
  listText: {
    color            : "#fff",
    fontSize         : 18,
    fontWeight       : "400",
    paddingHorizontal: 20,
  },
  rightColumn:{
    flexDirection : "row",
    alignItems    : "center",
    justifyContent: "space-between"
  },
  editTask: {
    color     : "#8EAEED",
    fontSize  : 18,
    fontWeight: "400"
  }

});
