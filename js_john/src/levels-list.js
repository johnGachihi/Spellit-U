import LevelListItem from './level-list-item';
import React from 'react';

class LevelList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            levelIds: [],
            isLoaded: false,
            count: 1
        };

        this.renderListItems = this.renderListItems.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost/spell-it2/php/controllers/levelscontroller.php?levelids")
            .then(response => response.json())
            .then(
                result => {
                    this.setState({
                        levelIds: result,
                        isLoaded: true
                    })
                    console.log(this.state.levelIds);
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    renderListItems() {
        let levelsList = [];
        let count = 1;
        if(this.state.levelIds){
            const ids = this.state.levelIds;
            for(let i in ids) {
                console.log(i);
                if(ids.hasOwnProperty(i)) {
                    console.log("LevelNumber: ", this.state.count);
                    levelsList.push(
                        <LevelListItem levelID={i} levelNumber={this.state.count} key={i}/>
                    )
                    this.state.count += 1;
                }
            }
        }
        return levelsList;
    }

    render() {
        const {error, isLoaded, levelIds} = this.state;
        if(error)
            return <div>{"Error: " + error.message}</div>;
        else if(!isLoaded)
            return <div>Loading</div>;
        else {
            return (
                <div>
                    {this.renderListItems()}
                </div>
            );
        }
    }
}

export default LevelList;