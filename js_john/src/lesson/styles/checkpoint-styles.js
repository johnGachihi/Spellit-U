import styled from 'styled-components';

export const LessonAreaDiv = styled.div`
    width: 90%;
    height: 500px;
    margin: auto;
    background-color: white;
    border-radius: 25px;
    padding: 20px;
    display: flex;
    ${'' /* justify-content: center; */}
    align-items: center;
    flex-direction: column;
`;

export const CheckpointImage = styled.img`
    width: 15em;
    border-radius: 10px;
`;

export const CheckpointTitle = styled.div`
    font-size: 3em;
    font-family: luckiest_guyregular;
    margin-top: 10px;
    margin-bottom: 40px;
`;

export const IncompleteWordDiv = styled.div`
    font-size: 5em;
    margin-top: 50px;
    font-family: "Open Sans", Arial, sans-serif;
    font-weight: 400;
`;

export const UnknownLetterTextInput = styled.input`
    width: 77px;
    height: 69px;
    border-width: 0 0 2px;
    border-color: #2d2d2d;
    text-align: center;
    color: #282828;
`;