import React from 'react';

class LevelListItem extends React.Component {

    render() {
        return (
            <div className="fullwidth-block cooking-section category-block">
                <div className="container">
                    <figure><img src="dummy/abc.jpg" alt={"Level " + this.props.levelNumber}></img></figure>
                    <div className="category-content">
                        <h1 className="category-title">{"Level " + this.props.levelNumber}</h1>
                        <a href={"lessontime.html?levelid=" + this.props.levelID}>Start</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default LevelListItem;