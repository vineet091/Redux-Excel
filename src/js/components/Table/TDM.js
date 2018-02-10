import React from "react";

export default class TDM extends React.Component {
	handleOnClick = (evt) => {
		this.props.updateActiveCell({x: this.props.index, y : '', value :''});
    }
	render = () => {
		let rowNumber = this.props.index + 1;
        return (
		    <td key={this.key} onClick={this.handleOnClick.bind(this)} data-index={this.props.index}>{rowNumber}
            </td>
        );
    }
}

