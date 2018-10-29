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