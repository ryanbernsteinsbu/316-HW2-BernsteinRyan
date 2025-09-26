import React from "react";

export default class SidebarHeading extends React.Component {
    handleClick = (event) => {
        const { createNewListCallback } = this.props;
        createNewListCallback();
    };
    render() {
        const { canAddList} = this.props;
        let buttonClass = "sidebar-button" + ((canAddList) ? "" : " disabled");
        console.log(buttonClass);
        return (
            <div id="sidebar-heading">
                <input 
                    type="button" 
                    id="add-list-button" 
                    className={buttonClass} 
                    onClick={this.handleClick}
                    value="+" />
                Your Playlists
            </div>
        );
    }
}
