import ReactHowler from 'react-howler';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import LessonAreaTitle from './titlediv';
import Level from './level';

const TitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

class Temp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <LessonAreaTitle/>
                <Level/>
            </div>
        )
    }
}

ReactDOM.render(
    <Temp/>,
    document.getElementById("root")
);