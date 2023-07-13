import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { openDatabase } from 'react-native-sqlite-storage';
let db = openDatabase({ name: 'Employee.db' });

function UpdateDetails(): JSX.Element{
    const navigation = useNavigation();
    const route = useRoute();
    const [name, setName] = useState('');
    const [empId, setEmpId] = useState('');
    const [dept, setDept] = useState('');
    const [number, setMobile] = useState('');
    useEffect(() =>{
      setName(route.params.data.name);
      setEmpId(route.params.data.empId);
      setDept(route.params.data.dept);
      setMobile(route.params.data.number);
    },[]);

    const updateUser =() =>{
        db.transaction(txn => {
            txn.executeSql('UPDATE table_user set emp_name=?, emp_id=?, emp_depat=?, emp_mobile=? where user_id=?',
                [name,empId,dept,number,route.params.data.id], (tx, res) => {
                    navigation.goBack();
                });
        });
    }
return(
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
        value={empId.toString()}
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
        value={number.toString()}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        placeholderTextColor='#000'
    />
    <View style={styles.container}>
        <TouchableOpacity style={styles.btnStyle} onPress={() => updateUser()}>

            <Text style={{ color: 'white' }}>Update</Text>
        </TouchableOpacity>

    </View>
</View>
)
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
export default UpdateDetails;