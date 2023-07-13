import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { openDatabase } from 'react-native-sqlite-storage';

let db = openDatabase({ name: 'Employee.db' });


function DetailsActivity(): JSX.Element {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [detailList, setDetailsList] = useState([])
    // For AsyncStorage
    // useEffect(() => { getData(); }, [isFocused])
    //    const getData = async () => {
    //     const details = await AsyncStorage.getItem('DETAILS')
    //     console.log(JSON.parse(details));
    //     setDetailsList(JSON.parse(details))
    // }
    // const deleteItem = async index => {
    //     const tempData = detailList;
    //     const selectedData = tempData.filter((item, ind) => {
    //         return ind != index;
    //     });
    //     setDetailsList(selectedData);
    //     await AsyncStorage.setItem("DETAILS", JSON.stringify(selectedData))
    // };
    useEffect(() => {
        getData();
    }, [isFocused]);

    const getData = () => {
        db.transaction(txn => {
            txn.executeSql('SELECT * FROM table_user',
                [], (tx, res) => {
                    let temp = [];
                    // let i =0;
                    for (let i = 0; i < res.rows.length; i++) {
                        console.log(res.rows.item(i));
                        temp.push(res.rows.item(i));
                    }
                    setDetailsList(temp);
                });
        });
    }

    const deleteItem = id => {
        db.transaction(txn => {
            txn.executeSql('DELETE FROM table_user where user_id=?',
                [id], (tx, res) => {
                    getData();
                });
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={detailList}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.mainCardView}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>{'Name: ' + item.emp_name}</Text>
                                <Text style={styles.textStyle}>{'Emp ID: ' + item.emp_id}</Text>
                                <Text style={styles.textStyle}>{'Department: ' + item.emp_depat}</Text>
                                <Text style={styles.textStyle}>{'Mobile: ' + item.emp_mobile}</Text>
                            </View>
                            <TouchableOpacity style={styles.btnUpdateStyle} onPress={() => {
                                navigation.navigate('UpdateDetails', {
                                    data: {
                                        name: item.emp_name,
                                        empId: item.emp_id,
                                        dept: item.emp_depat,
                                        number: item.emp_mobile,
                                        id: item.user_id,
                                    },
                                });
                            }}>
                                <Text style={{ color: 'white' }}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnStyle} onPress={() => deleteItem(item.user_id)}>
                                <Text style={{ color: 'white' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )

                }} />
            <TouchableOpacity style={styles.btnOppocityStyle} onPress={() => navigation.navigate("ADDDetails")}>
                <Text style={{ color: 'white' }}>Add Details</Text>
            </TouchableOpacity>

        </View>
    );
};
const styles = StyleSheet.create({
    textStyle: {
        color: 'black',
    },
    btnStyle: {
        color: 'white',
        backgroundColor: 'red',
        height: 30,
        width: '20%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1%',
        alignSelf: 'flex-end',
    },
    btnUpdateStyle: {
        color: 'white',
        backgroundColor: '#a9a9a9',
        height: 30,
        width: '20%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
       marginBottom:'1%',
        
    },
    btnOppocityStyle: {
        width: 200,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainCardView: {
        flex: 1,
        height: 100,
        paddingTop: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        paddingLeft: 16,
        paddingRight: 10,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
    subCardView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        // backgroundColor: Colors.history_back,
        // borderColor: Colors.color_eeeeee,
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default DetailsActivity;