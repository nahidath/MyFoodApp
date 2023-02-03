import {View, Text} from "react-native";
import styles from "../stylesheets/Faq_stylesheet";
import Accordion from "../components/Accordion";


const Faq = () => {

    const questions = [
        {
            title : "What is this app ?",
            answer : "This is a recipe app."
        },
        {
            title : "How can I add a recipe?",
            answer : "You can add a recipe by clicking the plus button in the bottom right corner."
        },
        {
            title : "How can I save a recipe as favorites ?",
            answer : "You can save a recipe as favorites by clicking the heart button in the top right corner."
        },
        {
            title : "Which recipe can I find in this app ?",
            answer : "You can find all kinds of recipes in this app."
        }
    ];

    const renderQuestions = () => {
        let items = [];
        for (let i = 0; i < questions.length; i++) {
            items.push(
                <Accordion title={questions[i].title} data={questions[i].answer} key={i}/>
            );
        }
        return items;
    }


    return (
        <View style={styles.container}>
            {renderQuestions()}
        </View>
    );
};

export default Faq;