import React from "react";
import ReactDOM from "react-dom";
import {ContextMenuTrigger } from "react-contextmenu"

export default class TD extends React.Component {
	handleMouseDown = (e) =>  {
	 let highlightedCells = [];
	 highlightedCells.push(this.props.celldata);
	 this.props.updateHighlightedCells(highlightedCells);
	 this.props.updateMouseDown(true);	
	  this.props.updateCopyAxis(this.props.celldata.x, this.props.celldata.y);
      return false;
    }
	handleMouseOver = (e) => {
      if (this.props.isMouseDown) { 
		  if(this.props.celldata.x ===  this.props.copyAxis.x || this.props.celldata.y === this.props.copyAxis.y) {
			  if(this.props.copyAxis.d) {
				  if(((this.props.celldata.x === this.props.copyAxis.x) && this.props.copyAxis.d === 'V') || ((this.props.celldata.y === this.props.copyAxis.y) && this.props.copyAxis.d === 'H')){
					  return true;					  
				  }
			  } else{
				    let direction = (this.props.celldata.x ===  this.props.copyAxis.x) ? 'H' : 'V';
				    this.props.updateCopyAxis('','', direction);
			  }
		   let highlightedCells = this.props.highlightedCells;
		   highlightedCells.push(this.props.celldata);
		   this.props.updateHighlightedCells(highlightedCells);
	  }
      }
    }
   handleBlur = (evt) => {
	 let value = evt.target.innerText;
	 if(this.props.celldata.value !== value) {
		this.props.updateCell(value, this.props.celldata); 
	 }
	 this.props.updateActiveCell('');
	  this.props.updateHighlightedCells([]);
  }
  handleKeyEvent = (evt) => {
	 if(evt.ctrlKey && (evt.which === 66 || evt.which === 73 || evt.which === 85 || evt.which === 86 )) {
		var elm = evt.target;
		evt.preventDefault();
	 switch(evt.which) {
	   case 66 :  {
		   elm.style.fontWeight = 'bold';
		break;   
	   }	
	   case 73: {
		   	elm.style.fontFamily = 'italic';
		break   
	   } 
	   case 85 : {
		     	elm.style.textDecoration = 'underline';
	   }
	   case 86: {       
	    if(elm) {
	     	this.props.pasteCell(this.props.celldata);
		}		   
		break   
	   }
	}
	 }
  }
  handleFocus = (evt)  => {
	evt.target.focus();
    this.props.updateActiveCell(this.props.celldata);
  }
  handleInitDrag = (evt) => {
	  	let node =  ReactDOM.findDOMNode(this);
		var startX,startY,startWidth,startHeight;
   startX = evt.clientX;
   startY = evt.clientY;
   startWidth = parseInt(document.defaultView.getComputedStyle(node).width, 10);
   startHeight = parseInt(document.defaultView.getComputedStyle(node).height, 10);
   document.documentElement.addEventListener('mousemove', doDrag, false);
   document.documentElement.addEventListener('mouseup', stopDrag, false);
   function doDrag(e){
        node.style.minWidth = (startWidth + e.clientX - startX) + 'px';
	    node.style.width = (startWidth + e.clientX - startX) + 'px';
        node.style.height = (startHeight + e.clientY - startY) + 'px';
    }
    function stopDrag(e) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);    
     	document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
  }
  
  render() {
	  let cell = JSON.stringify(this.props.celldata);
	  let resizerClass = 'hide';
	  let tdClass = ''; 
	  let resizableClass = '';
	  if(this.props.activeCell && this.props.activeCell.x === this.props.celldata.x && this.props.activeCell.y === this.props.celldata.y) { 
   		   resizerClass ='resizer';
	         tdClass = 'resizable';
	  }
	  this.props.highlightedCells.map((hcell)=> {
		    if(hcell.y === this.props.celldata.y && hcell.x === this.props.celldata.x){
				tdClass += ' highlighted';
			}
	  })
    return (
	          <td key={this.key} data-cell={cell} data-index={this.props.celldata.y} class={tdClass}> <ContextMenuTrigger id="context-menu"><div class="content-box" contentEditable={this.props.edit} onMouseDown={this.handleMouseDown.bind(this)} onMouseOver={this.handleMouseOver.bind(this)} onFocus={this.handleFocus.bind(this)} onKeyDown={this.handleKeyEvent.bind(this)} onBlur={this.handleBlur.bind(this)}>{this.props.celldata.value}</div></ContextMenuTrigger><div class={resizerClass} onMouseDown={this.handleInitDrag.bind(this)}></div></td>
    );
  }
}  


