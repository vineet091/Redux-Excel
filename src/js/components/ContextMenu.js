import React from "react";
import ReactDOM from "react-dom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";


export default class Context extends React.Component {
	deleteRow = () => { 
		if(this.props.activeCell && (this.props.activeCell.x || this.props.activeCell.x === 0)) {
			this.props.deleteRow(this.props.activeCell.x);			
		}		 
	}
	
	deleteColumn = () => {
		if(this.props.activeCell && (this.props.activeCell.y || this.props.activeCell.y === 0)) {
			this.props.deleteCell(this.props.activeCell.y); 
		}
	}
	
  render() {
    return (
        <ContextMenu id="context-menu">
            <MenuItem onClick={this.deleteRow.bind(this)}>
                Delete Row
            </MenuItem>
            <MenuItem onClick={this.deleteColumn.bind(this)}>
                Delete Column
            </MenuItem>
        </ContextMenu>
    );
  }
}
