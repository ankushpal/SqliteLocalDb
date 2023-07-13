import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { openDatabase } from 'react-native-sqlite-storage';

let db = openDatabase({ name: 'Employee.db' });

let detailsList = [];


function AddDetails(): JSX.Element {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [empId, setEmpId] = useState('');
    const [dept, setDept] = useState('');
    const [number, setMobile] = useState('');

    useEffect(() => {
        db.transaction(txn => {
            txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [], (tx, res) => {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, emp_name VARCHAR(20), emp_id INT(10), emp_depat VARCHAR(255), emp_mobile INT(12))',
                            [],
                        );
                    } else {
                        console.log('already created table')
                    }
                },
            );
        });
    }, []);

    const saveData = () => {
        db.transaction(txn => {
            txn.executeSql('INSERT INTO table_user ( emp_name, emp_id, emp_depat, emp_mobile) VALUES (?,?,?,?)',
                [name, empId, dept, number],
                (tex, res) => {
                    if (res.rowsAffected == 1) {
                        navigation.goBack();
                    } else {
                        console.log(res);
                    }
                },
            );
        });
    };

    // This method is used for AsyncStorage.
    // const saveData = async () => {
    //     try {
    //         let tempdata = [];
    //         detailsList = [];
    //         let x = JSON.parse(await AsyncStorage.getItem('DETAILS'))
    //         tempdata = x;
    //         if (tempdata != null) {
    //             tempdata.map(item => {
    //                 detailsList.push(item);
    //             });
    //         }
    //         console.log(name + "" + state + "" + city + "" + number)
    //         detailsList.push({ name: name, state: state, city: city, number: number })
    //         await AsyncStorage.setItem("DETAILS", JSON.stringify(detailsList))
    //         navigation.goBack();
    //     } catch (error) {
    //         console.error(error);
    //     }

    // };
    return (
        <View style={{ flex: 1, alignContent: 'center' }}>
            <TextInput
                style={styles.input}
                onChangeText={txt => setName(txt)}
                value={name}
                placeholder="Enter Name"
                placeholderTextColor='#000'
            />
            <TextInput
                style={styles.input}
                onChangeText={txt => setEmpId(txt)}
                value={empId}
                placeholder="Enter Employee ID"
                placeholderTextColor='#000'
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={txt => setDept(txt)}
                value={dept}
                placeholder="Enter Department"
                placeholderTextColor='#000'
            />
            <TextInput
                style={styles.input}
                onChangeText={txt => setMobile(txt)}
                value={number}
                placeholder="Enter Mobile Number"
                keyboardType="numeric"
                placeholderTextColor='#000'
            />
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnStyle} onPress={() => saveData()}>

                    <Text style={{ color: 'white' }}>Save</Text>
                </TouchableOpacity>

            </View>
        </View>

    );
}
const styles = StyleSheet.create({
    textStyle: {
        color: "red",
    },
    container: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },
    input: {
        width: '90%',
        color: '#000',
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    btnStyle: {
        backgroundColor: 'black',
        height: 50,
        borderRadius: 20,
        alignSelf: 'center',
        width: '50%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },


});
export default AddDetails;