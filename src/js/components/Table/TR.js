import React from "react";

import TD from "./TD";
import TDM from "./TDM";

export default class TR extends React.Component {
    render = () => {
	    let tCells = [];
        let styleClass = '';	  
	    tCells.push(<TDM key={0} index={this.props.trdata.index} updateActiveCell={this.props.updateActiveCell} />);
	    const that =this;
		this.props.trdata.data.map(function(tcell, index){
			tCells.push(<TD edit={true} key={index + 1} updateMouseDown={that.props.updateMouseDown} updateActiveCell={that.props.updateActiveCell} updateCopyAxis={that.props.updateCopyAxis} updateHighlightedCells={that.props.updateHighlightedCells} updateCell={that.props.updateCell} pasteCell={that.props.pasteCell} celldata={tcell} isMouseDown={that.props.isMouseDown} copyAxis={that.props.copyAxis} highlightedCells={that.props.highlightedCells} activeCell={that.props.activeCell} />);  
		});
		if(this.props.activeCell && this.props.activeCell.x === this.props.trdata.index) {
			styleClass = 'row-selected';
		}
        return (
            <tr class={styleClass} key={this.key} data-index={this.props.trdata.index}>
	            {tCells}
            </tr>
    );
  }
}
