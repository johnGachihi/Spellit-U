import React from 'react';

class IncompleteWordText extends React.Component {
    
    //Two types of children: `label` for given parts of word
    //`Custom input` for unknown parts
    renderChildren() {
        const incompleteWord = this.props.incompleteWord;
        const completeWord = this.props.completeWord;

        const known = this.incompleteWord.split('_');

        let missingLetterIndexes = []
        for(let {index, letter} of incompleteWord.split('').entries()) {
            if(!letter == '_'){
                continue;
            } else {
                missingLetterIndexes.push(letter);
            }
        }
    }
}
