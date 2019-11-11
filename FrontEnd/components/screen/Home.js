import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from "react-native"
import axios from "axios"

export default class Home extends Component {

    state = {
        host: "10.60.243.108",
        user: {},
        questions: [],
        correctAnswer: "",
        quetionsSolved: 0,
        lives: 3
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        axios.get(`http://localhost:9000/getLoggedInUser`)
            .then(response => {
                let user = response.data
                this.setState({ user });
            })
    }

    getQuestions = field => {
        axios.post(`http://localhost:9000/getQuestions`, { field })
            .then(response => {
                let questions = response.data
                this.setState({ questions })
                console.log(this.state.questions)
            })
    }


    //  JUST FOR TEST
    checkQuestion = correctAnswer => {
        this.setState({ correctAnswer })
    }


    validateAnswer = answer => {
        let _id = this.state.user._id
        let score = this.state.user.score
        let gold = this.state.user.gold
        let lives = this.state.lives
        let correctAnswer = this.state.correctAnswer
        if (answer == correctAnswer) {
            console.log("ANSWER IS CORRECT")
            axios.post(`http://localhost:9000/validateAnswer`, { _id, score, gold })
                .then(response => {
                    console.log(response.data)
                })
            this.setState({ quetionsSolved: this.state.quetionsSolved + 1 });
        }
        else {
            console.log("ANSWER IS FALSE")
            this.setState({ lives: this.state.lives - 1 });
            if (lives == 1) { console.log("game over , try again NOOB >.<") } //ABEER كتبته
            //اعمل اكشن انه يطلع + اسئله اذا بده اكسترا لايف 
        }
    }


    levelComplete = () => {
        let _id = this.state.user._id
        let score = this.state.user.score
        axios.post(`http://localhost:9000/levelComplete`, { _id, score })
    }


    render() {
        //console.log(this.state)

        //console.log(this.state.correctAnswer)
        const { questions, lives, quetionsSolved } = this.state
        console.log("quetionsSolved : ", this.state.quetionsSolved);
        console.log('lives : ', lives)

        {
            if (quetionsSolved !== 0 && quetionsSolved == questions.length) {
                console.log("You WIN , level complete")
                this.levelComplete()
                // خليه انه بطلع لبرا   

            }

        }




        return (
            <View>

                <View>
                    <Text>Home</Text>
                    <Button title="IT" onPress={() => this.getQuestions("IT")} />
                    <Button title="Medical" onPress={() => this.getQuestions("Medical")} />
                    <Button title="Culture" onPress={() => this.getQuestions("Culture")} />
                    <Button title="Science" onPress={() => this.getQuestions("Science")} />
                </View>

                <View>
                    {
                        questions.map(question => {
                            return (
                                <View style={styles.question} key={question._id} >
                                    {<Button
                                        onPress={() => this.checkQuestion(question.correctAnswer)}
                                        title={question.question} />}



                                    <Button
                                        style={styles.answers}
                                        onPress={() => this.validateAnswer("option1")}
                                        title={question.answers.option1} />

                                    <Button
                                        onPress={() => this.validateAnswer("option2")}
                                        title={question.answers.option2} />

                                    <Button
                                        onPress={() => this.validateAnswer("option3")}
                                        title={question.answers.option3} />

                                    <Button
                                        onPress={() => this.validateAnswer("option4")}
                                        title={question.answers.option4} />

                                </View>
                            )
                        })
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    question: {
        marginTop: 20
    },
    answers: {
        marginTop: 20
    }

})





// <View>
// {
//     questions.map(question => {
//         return (
//             <View style={styles.question} key={question._id} >
//                 {/* <Text> {question.IT} </Text> */}
//                 {<Button
//                     onPress={() => this.checkQuestion(question._id)}
//                     title={question.query[0].question} />}

//                 <Button
//                     style={styles.answers}
//                     onPress={() => this.validateAnswer("option1")}
//                     title={question.query[0].answer[0].option1} />

//                 <Button
//                     onPress={() => this.validateAnswer("option2")}
//                     title={question.query[0].answer[0].option2} />

//                 <Button
//                     onPress={() => this.validateAnswer("option3")}
//                     title={question.query[0].answer[0].option3} />

//                 <Button
//                     onPress={() => this.validateAnswer("option4")}
//                     title={question.query[0].answer[0].option4} />

//             </View>
//         )
//     })
// }
// </View>










// {
//     fields: "IT",
//         query: [{
//             id: 3,
//             question: "Every number system has a base, which is called __________.",
//             answer: [{
//                 option1: "Index",
//                 option2: "Subscript",
//                 option3: "Radix",
//                 option4: "NON of the above",

//             }],
//             correctIndex: "option3"
//         }]
// },
// {
//     fields: "IT",
//         query: [{
//             id: 3,
//             question: "Which of the following software is used to view web pages?",
//             answer: [{
//                 option1: "Web Browsers",
//                 option2: "Internet Browser",
//                 option3: "Page Browser",
//                 option4: "All of the above",

//             }],
//             correctIndex: "option1"
//         }]
// },
// {
//     fields: "IT",
//         query: [{
//             id: 3,
//             question: "________________ is the process in which a user sends computer information from his computer to another computer through modem.",
//             answer: [{
//                 option1: "Downloading",
//                 option2: "Uploading",
//                 option3: "All the above",
//                 option4: "NON of the above",

//             }],
//             correctIndex: "option2"
//         }]
// },





















