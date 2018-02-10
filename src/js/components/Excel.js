import React from "react";
import { connect } from "react-redux"

import { updateCopiedCells, addRow, addCell, updateCell, deleteRow, deleteCell, pasteCell, sortColumn } from "../actions/ExcelActions"
import TH from "./Table/TH";
import TR from "./Table/TR";
import ContextMenu from "./ContextMenu"

@connect((store) => {
  return {	
        cellTitles: store.cellTitles,		   
        totalRows: store.totalRows
  };
})
export default class Excel extends React.Component {
	constructor() {
		super();
		this.state = {
			isMouseDown :false,
			activeCell : '',
			highlightedCells : [],
			copyAxis : {
			   x: '', y: '', d :''
		   }
		}
	}	
	updateMouseDown = (value) => {
		this.setState({ isMouseDown :value});
	}
	updateActiveCell = (value) => {
		this.setState({ activeCell : value});
	}
	updateCopyAxis = (x,y, d) => {
		let copyAxis = this.state.copyAxis;
		if(d) {
			copyAxis.d = d;
		} else {
			copyAxis.x = x;
			copyAxis.y = y;
			copyAxis.d = '';
		}
	    this.setState({copyAxis});
	}
	updateHighlightedCells = (arr) => {
       this.setState({highlightedCells : arr})
	}
	updateCopiedCells = (arr) => {
	    this.props.dispatch(updateCopiedCells(arr));
	}
	addRow = () => {
         this.props.dispatch(addRow());
	}
	addCell = () => {
	    this.props.dispatch(addCell());
	}
	updateCell = (value, cellData) => {
		this.props.dispatch(updateCell(value, cellData));
	}
	deleteRow = (id) => {
		this.props.dispatch(deleteRow(id));
	}
	deleteCell = (index) => {
		this.props.dispatch(deleteCell(index));
	}
	pasteCell = (cellData) => {
		this.props.dispatch(pasteCell(cellData));
	}
	sortColumn = (index, order) => {
         this.props.dispatch(sortColumn(index, order))
	}
	handleMouseUpEvent = (evt) => { 
	    this.updateMouseDown(false);
	}
    handleKeyEvent = (evt) => {
	    let that = this;
	    if(evt.ctrlKey && (evt.keyCode === 67 || evt.keyCode === 86)) {		 
	        switch(evt.keyCode) {
	            case 67 :  {
		            if(that.state.highlightedCells.length> 0) {			
                        let copiedCells = that.state.highlightedCells.map(function(el, index) {
						    return el;		     		   
                        });
				        if(copiedCells.length > 0){
				            this.updateCopiedCells(copiedCells);
				        }
		            }
		            break;   
	            }	 
	        }
	    }
    }
  	componentWillMount = () => {
		console.error = (function(_error) {
            return function(message) {
                if (typeof message !== 'string' || message.indexOf('component is `contentEditable`') === -1) {
                  _error.apply(console, arguments)
                }
            }
        })(console.error)
	}
    render() {
	    let tRowsElement = [], theadElements = [];
		const that = this;
		this.props.cellTitles.map(function(cell, index) {				 
            theadElements.push(<TH key={index} thdata={cell} sortColumn={that.sortColumn.bind(that)} />); 
        });
  		this.props.totalRows.map(function(row, index) {
            tRowsElement.push(<TR key={index + 1} updateMouseDown={that.updateMouseDown.bind(that)} updateActiveCell={that.updateActiveCell.bind(that)} updateCopyAxis={that.updateCopyAxis.bind(that)} updateHighlightedCells={that.updateHighlightedCells.bind(that)} updateCell={that.updateCell.bind(that)} pasteCell={that.pasteCell.bind(that)} trdata={row}  isMouseDown={that.state.isMouseDown} copyAxis={that.state.copyAxis} highlightedCells={that.state.highlightedCells} activeCell={that.state.activeCell}/>); 
        });
    return (
        <div class="container">
		<section class="sec-excel">
            <div class="excel-box">
	            <div class="excel-title">
		            <h3 class="title">Excel Sheet</h3>
	            </div>
	           <div class="excel-content">
			        <div class="btn-box">
					   <button id="btn-add-row" onClick={this.addRow.bind(this)}>Add Row</button><span> | </span>
					   <button id="btn-add-column" onClick={this.addCell.bind(this)}>Add Column</button>
					</div><br/>
                   <div class="excel-wrapper">
	             	    <table id="excel-table" onMouseUp={this.handleMouseUpEvent.bind(this)}>
	             	        <thead>
		                        <tr>
                                   {theadElements} 
		                        </tr>
		                    </thead>
		                    <tbody  onKeyDown={this.handleKeyEvent.bind(this)}>
						        {tRowsElement}						 
		                    </tbody>
		                </table>
					  	<ContextMenu deleteRow={this.deleteRow.bind(this)} deleteCell={this.deleteCell.bind(this)} activeCell={this.state.activeCell}></ContextMenu>
		            </div>
			      </div>
	         </div>
          </section>
        </div>
    );
  }
}
