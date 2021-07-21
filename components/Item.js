import React, { useState } from 'react';
import { Button, View, StyleSheet, TextInput } from 'react-native';

const Item = ({id, defaultTask, isComplete, deleteOnClick, toggleIsComplete}) => {
    const [task, changetask] = useState(defaultTask);
    return (
        <View style={styles.row}> 
            <TextInput
                onChangeText={(text) => changetask(text)}
                defaultValue={defaultTask}
                value={task}
                style={isComplete ? [styles.lineThrough, styles.task] : styles.task}
            />
            <View style={styles.grow}/>
            <Button
                style={styles.button}
                title='✔️'
                color={isComplete ? 'darkseagreen' : 'silver'}
                onPress={() => toggleIsComplete(id)}
            />
            <View style={styles.gap}/>
            <Button
                style={styles.button}
                title={"🗑️"}
                color='silver'
                onPress={() => deleteOnClick(id)}
            />
            <View style={styles.gap}/>

        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '100%',
        marginBottom: 10,
        backgroundColor: '#ffffff',
    },
    task: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 5,
        fontSize: 14.5,
        color: 'black',
        flexWrap: 'wrap',
        maxWidth: '75%',
        fontFamily: 'monospace'
    },
    lineThrough: {
        textDecorationLine: 'line-through',
    },
    button: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        fontSize: 12,
        fontFamily: 'monospace',
    },
    grow: {
        flexGrow: 1,
    },
    gap: {
        width: 7,
    }
});

export default Item;
