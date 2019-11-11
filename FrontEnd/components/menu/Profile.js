import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from "axios"

export default class Profile extends Component {


    state = {
        _id: null,
        name: null,
        email: null,
        socre: null,
        gold: null,
        itemsHave:{},

        host: "192.168.6.106"
    }

    componentDidMount() {
        this.getUser()
    }

    // GET LOGGED IN USER DATA
    getUser = () => {
        axios.get(`http://localhost:9000/getLoggedInUser`)
            .then(response => {
                let user = response.data
                // console.log(user)
                this.setState({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    score: user.score,
                    gold: user.gold
                });
            })
    }


    // UPDATE USER
    updateUser = () => {
        let _id = this.state._id
        let name = this.state.name
        let email = this.state.email
        let score = this.state.score
        let gold = this.state.gold
        let user = {_id, name, email, score, gold }
        axios.post(`http://localhost:9000/updateUser`, user)
    }

    render() {
        return (
            <View>
                <Text>Profile</Text>

                {/* NAME */}
                <TextInput
                    onChangeText={(name) => {
                        this.setState({
                            name
                        })
                    }}
                    defaultValue={this.state.name}
                    style={styles.TextInput}
                />

                {/* EMAIL */}
                <TextInput onChangeText={(email) => {
                    this.setState({
                        email
                    })
                }}
                    defaultValue={this.state.email}
                    style={styles.TextInput}
                />


                <Button title="Update"
                    onPress={this.updateUser} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TextInput: {
        padding: 2,
        borderColor: "black",
        borderWidth: 1
    }
})


// db.getCollection('users').insertMany([
//     {
//         name: "Abeer Jaafreh",
//         email: "abeer@gmail.com",
//         password: "12345",
//         score: "2500",
//         gold: "150"
//     },
//     {
//         name: 'Mohammad Alaa Aldein',
//         email: "mohamamd@gmail.com",
//         password: "12345",
//         score: "2000",
//         gold: "100"
//     },
//     {
//         name: "Raghad",
//         email: "raghad@gmail.com",
//         password: "12345",
//         score: "1800",
//         gold: "120"
//     },
//     {
//         name: 'Ahmad Taha',
//         email: "ahmad@gmail.com",
//         password: "12345",
//         score: "1700",
//         gold: "180"
//     }
// ])