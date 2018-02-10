import storage from "../services/Storage"

export default function excelReducer(state=storage.getState(), action) {

    switch (action.type) {
	    case "UPDATE_COPIED_CELLS" : {
		    let copiedCells = action.payload;
		    let newState = {...state , copiedCells};
		    return newState;
		}
        case "ADD_ROW": {
		    let rowIndex = state.rowIndex;
		    let newRow = {index: rowIndex, data: []};
		    for(let i =0;i < state.cellCount; i++) {
			    newRow.data.push({
				    x: rowIndex,
				    y: i,
				    value :''
			    });
		    }	    
		    let totalRows = [];
		    state.totalRows.map(function(row) {
			    totalRows.push(row);
		    });
		    totalRows.push(newRow);
		    rowIndex = rowIndex + 1;
		    let newState = {...state , totalRows, rowIndex};
		    storage.setState(newState);
		    return newState;

        }
        case "ADD_CELL": {
		    let cellTitles = [];
		    let cellPrefix = state.cellPrefix;
		    let cellCount = state.cellCount; 
		    let cellIndex = state.cellIndex; 
		    state.cellTitles.map(function(cellTitle, index) {
			   cellTitles.push(cellTitle);
		   })
	    	cellCount = cellCount + 1;
		    let totalRows = [];
		    let newCellIndex;
		    state.totalRows.map(function(row, index) {
			    let lastCell = row.data[row.data.length -1];
			    newCellIndex = lastCell ? lastCell.y + 1 : 0; 
			    row.data.push({
				    x: row.index,
				    y: newCellIndex,
				    value :''
			     })
			     totalRows.push(row);
		    });
		    let cellTitle = {
			    index : newCellIndex,
			    value : cellPrefix  + String.fromCharCode(65 + (cellIndex % 26))
	     	}	
		    cellIndex = cellIndex + 1;			
	        if(cellIndex % 26 === 0) {
			    cellPrefix = isNaN(cellPrefix.charCodeAt(0))  ?  'A' : String.fromCharCode(cellPrefix.charCodeAt(0) + 1);
		    }	
		    cellTitles.push(cellTitle);
		    let newState = {...state, totalRows, cellCount, cellIndex, cellPrefix, cellTitles};
		    storage.setState(newState);
            return newState;
        }
	    case "UPDATE_CELL": {
		    let payload = action.payload;
		    let totalRows = [];
		    state.totalRows.map(function(row, index) {
			    if(row.index === payload.cellData.x) {
				    row.data.map(function(cell, cellIndex) {
					    if(cell.y === payload.cellData.y) {
					     	row.data[cellIndex].value = payload.value;
					    }
				    });
			    }
	            totalRows.push(row);
		    });  			 
     		let newState = {...state, totalRows};
	    	storage.setState(newState);
            return newState;
        }
        case "SORT_COLUMN" : {
        		    let columnData = [];
        		    let totalRows = []
	     	let columndIndex = parseInt(action.payload.index);
	        state.totalRows.map(function(row, index) {
			    row.data.map(function(cell, cellIndex) {
				    if(cell.y === columndIndex) {
					    columnData.push(cell.value);
				    }
			    })

    		});
    			    columnData.sort();
            state.totalRows.map(function(row, index) {
			    row.data.map(function(cell, cellIndex) {
				    if(cell.y === columndIndex) {
					    row.data[cellIndex].value = (action.payload.order === 'asc') ? columnData[0] : columnData[columnData.length-1];
					    (action.payload.order === 'asc') ? columnData.splice(0, 1) : columnData.splice(columnData.length-1, 1);
				    }
			    })
			    totalRows.push(row);

    		});
    			    let newState = {...state, totalRows};
		    storage.setState(newState);
            return newState;
        }
	    case "DELETE_ROW": {
		    let totalRows = [];
		    let deletdIndex  = parseInt(action.payload);
	        state.totalRows.map(function(row, index) {
			    if(row.index !== deletdIndex) {
			 	    totalRows.push(row);
			    }
		    });  
		    let newState = {...state, totalRows};
		    storage.setState(newState);
            return newState;
        }
	    case "DELETE_CELL": {
		    let totalRows = [];
	     	let deletedIndex = parseInt(action.payload);
	        state.totalRows.map(function(row, index) {
			    row.data.map(function(cell, cellIndex) {
				    if(cell.y === deletedIndex) {
					    row.data.splice(cellIndex, 1);
				    }
			    })
			    totalRows.push(row);
    		});  
	    	let cellTitles = [];
		    state.cellTitles.map(function(cell, index) {
			    if(cell.index !== deletedIndex) {
				    cellTitles.push(cell);   
			    }
		    }); 
		    let cellCount = state.cellCount - 1; 
		    let newState = {...state, totalRows, cellTitles, cellCount};
		    storage.setState(newState);
            return newState;
        }
	    case "PASTE_CELL": {
		    let activeCell  = action.payload;
		    let values = state.copiedCells;
		    let direction = 'V';
		    if(values.length > 1 && values[0].x === values[1].x) {
			    direction = 'H';
		    }
		    let totalRows = [];
		    let oldRows = state.totalRows;
		    oldRows.map(function(row, rowIndex) {
			    if(row.index === activeCell.x) {
				    row.data.map(function(cell, cellIndex) {
					   if(cell.y === activeCell.y) {
						    row.data[cellIndex].value = values[0].value;
						    if(direction === 'H') {
							    for(let p = 1; p < values.length;p++) {
								    let nextCell = row.data[cellIndex + p];
							        if(nextCell) {
								        row.data[cellIndex + p].value = values[p].value;
								    }
							    }
						    } else if(values.length > 1) {
						            for(let q = 1; q < values.length;q++) {
							            let nextRow = oldRows[rowIndex + q];
						   	            if (nextRow) {
								           oldRows[rowIndex + q].data[cellIndex].value = values[q].value;
							            }
								
							        }
						    }
					    }
				    });
			    }
	            totalRows.push(row);
		    });  
		    let newState = {...state, totalRows};
		    storage.setState(newState);
            return newState;
        }
    }
    return state
}
