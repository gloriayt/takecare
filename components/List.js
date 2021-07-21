import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import uuid from 'react-native-uuid';
import Item from './Item'

const STORAGE_KEY = '@save_tasks'

const List = () => {
    const [taskList, editTaskList] = useState([
        {
            task: "Eat 2 meals",
            isComplete: false,
            id: uuid.v4(),
        },
        {
            task: "Exercise once",
            isComplete: false,
            id: uuid.v4(),
        },
    ]);

    useEffect(() => {
        readData();
    }, []);
    
    useEffect(() => {
        saveData();
    }, [taskList]);

    const deleteTaskOnClick = (id) => {
        const tempTaskList = taskList.filter(taskObject => taskObject.id != id)
        editTaskList(tempTaskList);
    }
    const addTaskOnClick = () => {
        editTaskList(taskList => [...taskList, { task: 'New goal', isComplete: false, id: uuid.v4() }]);
    }
    const toggleIsComplete = (id) => {
        const tempTaskList = taskList.map(taskObject => 
            taskObject.id === id ? {...taskObject, isComplete:!taskObject.isComplete} : taskObject
        );
        editTaskList(tempTaskList);
    }
    function checkIfAllComplete() {
        if (taskList.length === 0) return false;
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                return false;
            }
        }
        return true;
    }
    const saveData = async () => {
        try {
            const taskListJSON = JSON.stringify(taskList);
            await AsyncStorage.setItem(STORAGE_KEY, taskListJSON)
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }
    const readData = async () => {
        try {
            const taskListJSON = await AsyncStorage.getItem(STORAGE_KEY)
            if (taskListJSON !== null) {
                editTaskList(JSON.parse(taskListJSON));
            } else {
                return 0;
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }
    return (
        <View style={styles.list}>
            <Text style={styles.title}>{checkIfAllComplete() ? 'All done! :)' : 'Today'}</Text>
            {taskList.length === 0 ?
                <Text style={styles.text}>Make a goal!</Text> :
                taskList.map((taskObject) =>
                    <Item
                        key={taskObject.id}
                        id={taskObject.id}
                        defaultTask={taskObject.task}
                        isComplete={taskObject.isComplete}
                        deleteOnClick={deleteTaskOnClick}
                        toggleIsComplete={toggleIsComplete}
                    />
                )
            }
            <Button
                style={styles.button}
                title={"➕"}
                onPress={addTaskOnClick}
                color='mediumseagreen'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#e1ede4',
        alignItems: 'center',
        height: '97.3%',
        width: '96%',
        padding: 10,
    },
    title: {
        fontSize: 25,
        marginBottom: 20,
        marginTop: 10,
        fontFamily: 'monospace'
    },
    text: {
        fontSize: 15,
        marginBottom: 20,
        fontFamily: 'monospace'
    },
});

export default List;
