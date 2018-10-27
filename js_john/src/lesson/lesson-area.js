import React from 'react';

let lessonItems = [];

class Level extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            phoneticResources: {},
            lessons: [],
            lessonComponents: []
        }
    }

    componentDidMount() {
        fetch("http://localhost/spell-it2/php/controllers/levelscontroller.php?lessonContent=1&levelid=" + getLevelIdFromURL())
            .then(response => response.json())
            .then(
                result => {
                    console.log("Lesson content response", result);

                    this.state.lessons = getLessons(result["lessons"]);
                    console.log("this.state.lessons", this.state.lessons);

                    fetch("http://localhost/spell-it2/php/controllers/phoneticscontroller.php?getcontent=" + getJoinedTexts(result))
                        .then(response => response.json())
                        .then(
                            result => {
                                this.state.phoneticResources = result;
                                console.log("PhoneticResources", this.state.phoneticResources);

                                for(let lesson of this.state.lessons) {
                                    let requiredPhoneticResources = {};
                                    for(let text of lesson["texts"]){
                                        requiredPhoneticResources[text] = this.state.phoneticResources[text];
                                    }
                                    console.log(lesson["text"], requiredPhoneticResources);
                                    this.state.lessonComponents.push(
                                        <Level
                                            text={lesson["text"]}
                                            phonetics={lesson["phonetics"]}
                                            texts={lesson["texts"]}
                                            phoneticResources={requiredPhoneticResources}
                                        />
                                    )
                                }
                            },
                            error => {
                                console.log("Phonetics response", error);
                            }
                        )
                },
                error => {
                    console.log(error);
                }
            )
    }

    render() {
        return <div>a</div>
    }
}

function getLevelIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get("levelid");
}

function getLessons(lessonsResponse) {
    let lessons = [];
    for(let lesson of lessonsResponse) {
        let texts = lesson["word"]["text"].split('').concat(
            lesson["word"]["wordSegments"]
        );
        const word = {
            text: lesson["word"]["text"],
            phonetics: lesson["word"]["phoneticPath"],
            texts: texts
        }
        lessons.push(word);
    }
    return lessons;
}

function getJoinedTexts(levelContent) {
    let allTexts = []
    for(let word of levelContent["lessons"]) {
        const texts = word["word"]["text"].split('');
        const segments = word["word"]["wordSegments"];
        allTexts = allTexts.concat(texts, segments);
    }
    console.log("Concatenated string", allTexts);

    allTexts = Array.from(new Set(allTexts));
    const jointTexts = allTexts.join("_");
    console.log(jointTexts);

    return jointTexts
}

export default Level;