import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Lesson from './lesson';
import Checkpoint from './checkpoint';

let lessonItems = [];

class Level extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            phoneticResources: {},
            lessons: [],
            checkpoint: {},
            lessonComponents: [],
            currentLesson: 0
        }

        this.carousel = React.createRef();

        this.handleSlideChanged = this.handleSlideChanged.bind(this);
        this.renderLessons = this.renderLessons.bind(this);
        this.handleNextClicked = this.handleNextClicked.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost/spell-it2/php/controllers/levelscontroller.php?lessonContent=1&levelid=" + getLevelIdFromURL())
            .then(response => response.json())
            .then(
                result => {
                    console.log("Lesson content response", result);

                    this.state.lessons = getLessons(result["lessons"]);
                    console.log("this.state.lessons", this.state.lessons);

                    this.state.checkpoint = result["checkPoint"];
                    console.log("this.state.checkpoint:", this.state.checkpoint);

                    fetch("http://localhost/spell-it2/php/controllers/phoneticscontroller.php?getcontent=" + getJoinedTexts(result))
                        .then(response => response.json())
                        .then(
                            result => {
                                this.state.phoneticResources = result;
                                console.log("PhoneticResources", this.state.phoneticResources);

                                
                                // let lessonComponents = [];//--//
                                for(let [index, lesson] of this.state.lessons.entries()) {
                                    let requiredPhoneticResources = {};
                                    for(let text of lesson["texts"]){
                                        requiredPhoneticResources[text] = this.state.phoneticResources[text];
                                    }
                                    console.log(lesson["text"], requiredPhoneticResources);
                                    this.state.lessons[index]["requiredPhoneticResources"] = requiredPhoneticResources
                                    //Should I have used setState here
                                    /*lessonComponents.push(
                                        <Lesson
                                        key={lessonComponents.length}
                                        index={lessonComponents.length}
                                        text={lesson["text"]}
                                        phonetics={lesson["phonetics"]}
                                        texts={lesson["texts"]}
                                        phoneticResources={requiredPhoneticResources}
                                        currentLesson={this.state.currentLesson}
                                        />
                                        )*/
                                }
                                console.log("this.state.lessons2", this.state.lessons);
                                //this.setState({lessonComponents: lessonComponents});
                                this.setState({isLoaded: true});
                            },
                            error => {
                                console.log("Phonetics response", error);
                                this.setState({isLoaded: true, error})
                            }
                        )
                },
                error => {
                    this.setState({isLoaded: true, error});
                    console.log(error);
                }
            )
    }

    renderLessons() {
        let lessons = [];
        // const {checkpoint} = this.state;
        // lessons.push(
        //     <Checkpoint
        //         imageFileName={checkpoint["wordImagePath"]}
        //         incompleteWord={checkpoint["incompleteTestWord"]}
        //         completeWord={checkpoint["testWord"]}
        //     />
        // );
        this.state.lessons.map((lesson, index) => {
            lessons.push(
                <Lesson
                    key={index}
                    index={index}
                    text={lesson["text"]}
                    phonetics={lesson["phonetics"]}
                    texts={lesson["texts"]}
                    phoneticResources={lesson["requiredPhoneticResources"]}
                    currentLesson={this.state.currentLesson}
                    onClickNext={this.handleNextClicked}
                />
            )
        })
        const {checkpoint} = this.state;
        lessons.push(
            <Checkpoint
                imageFileName={checkpoint["wordImagePath"]}
                incompleteWord={checkpoint["incompleteTestWord"]}
                completeWord={checkpoint["testWord"]}
            />
        )
        return lessons;
    }

    handleSlideChanged(e) {
        this.setState({currentLesson: e.item});
        console.log("currentIndex", e.item);
        console.log("this.state.currentLesson", this.state.currentLesson);
    }

    handleNextClicked() {
        // this.carousel._slideNext();
        let {currentLesson} = this.state;
        this.setState({currentLesson: currentLesson + 1})
    }

    render() {
        const responsive = {0: {items: 1}};
        let {error, isLoaded} = this.state;
        if(error) {
            return <div>{"Error: " + error.message}</div>
        }
        else if(!isLoaded) {
            return <div>Loading ...</div>
        }
        else {
            console.log("this.state.lessonComponents", this.state.lessonComponents);
            return (
                <div>
                    <AliceCarousel
                        items={this.renderLessons()}
                        // responsive={responsive}
                        startIndex={this.state.currentLesson}
                        // slideToIndex={2}
                        // buttonsDisabled={true}
                        // dotsDisabled={true}
                        // swipeDisabled={true}
                        infinite={false}
                        keysControlDisabled={true}
                        onSlideChanged={this.handleSlideChanged}
                        ref={this.carousel}
                    />
                </div>
            )
        }
    }
}

export function getLevelIdFromURL() {
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