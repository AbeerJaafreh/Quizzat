import React, { Component } from 'react'
import { View, Text, Button } from "react-native"


const Landing = (props) => {

    return (
        <View>
            <Text>Landing</Text>

            <View >
                <Button
                    title="Navbar"
                    onPress={() => props.navigation.navigate("Navbar")}
                />
            </View>
        </View>
    )
}

export default Landing