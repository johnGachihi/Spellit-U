import React from 'react';
import LessonArea from './lesson-area';
import { number } from 'style-value-types';

class Lesson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numberOfStages: this.props.texts.length,
            currentStage: 0,
            currentText: this.props.texts[0],
            currentPhonetic: this.props.phoneticResources[this.props.texts[0]]
        }

        this.handleStageComplete = this.handleStageComplete.bind(this);
    }

    handleStageComplete() {
        // let {currentStage, numberOfStages} = this.state;
        // if(currentStage < numberOfStages) {
        //     this.setState({
        //         currentStage: currentStage += 1,
        //         currentText: this.props.texts[this.state.currentStage+1],
        //         currentPhonetic: this.props.phoneticResources[this.props.texts[this.state.currentStage+1]]
        //     })
        // } else if(currentStage == numberOfStages) {
        //     this.setState({
        //         currentText: this.props.text,
        //         currentPhonetic: this.props.phonetics
        //     })
        // }
        this.setState({currentStage: this.state.currentStage+1});
    }

    render() {
        // console.log("Current lesson" , this.props.index, this.props.currentLesson === this.props.index,);
        console.log("currentText", this.state.currentText);
        const {currentStage, numberOfStages} = this.state;
        if(currentStage < numberOfStages){
            return (
                <div>
                    <div>{"Index: " + this.props.index}</div>
                    <div>{this.props.currentLesson === this.props.index ? "This is current lesson" : ""}</div>
                    {this.props.currentLesson == this.props.index &&
                        <LessonArea
                            text={this.props.texts[currentStage]}
                            phonetics={this.props.phoneticResources[this.props.texts[currentStage]]}
                            lesson={this.props.index}
                            handleComplete={this.handleStageComplete}
                            stopped={false}
                        />
                    }
                </div>
            )
        }
        else if(currentStage === numberOfStages){
            return (
                <div>
                    <div>{"Index: " + this.props.index}</div>
                    <div>{this.props.currentLesson === this.props.index ? "This is current lesson" : ""}</div>
                    {this.props.currentLesson == this.props.index &&
                        <LessonArea
                            text={this.props.text}
                            phonetics={this.props.phonetics}
                            lesson={this.props.index}
                            handleComplete={this.handleStageComplete}
                            stopped={false}
                        />
                    }
                </div>
            );
        }
        else {
            return (
                <div>
                    <div>{"Index: " + this.props.index}</div>
                    <div>{this.props.currentLesson === this.props.index ? "This is current lesson" : ""}</div>
                    {this.props.currentLesson == this.props.index &&
                        <LessonArea
                            text={this.props.text}
                            phonetics={this.props.phonetics}
                            lesson={this.props.index}
                            handleComplete={this.handleStageComplete}
                            stopped={true}
                        />
                    }
                </div>
            );
        }

        // return (
        //     <div>
        //         <div>{"Index: " + this.props.index}</div>
        //         <div>{this.props.currentLesson === this.props.index ? "This is current lesson" : ""}</div>
        //         {this.props.currentLesson == this.props.index &&
        //             <LessonArea
        //                 text={this.state.currentText}
        //                 phonetics={this.state.currentPhonetic}
        //                 lesson={this.props.index}
        //                 handleComplete={this.handleStageComplete}
        //             />
        //         }
        //     </div>
        // );
    }
}

export default Lesson;