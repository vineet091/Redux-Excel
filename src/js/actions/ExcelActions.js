
export function updateCopiedCells(arr) {
  return {
    type: 'UPDATE_COPIED_CELLS',
	payload : arr
  }
}

export function addRow() {
  return {
    type: 'ADD_ROW'
  }
}

export function addCell() {
  return {
    type: 'ADD_CELL',
  }
}


export function sortColumn(index, order) {
  return {
    type: 'SORT_COLUMN',
    payload: {
      index,
      order
    }
  }
}

export function updateCell(value, cellData) {
  return {
    type: 'UPDATE_CELL',
	payload : {
		value,
		cellData
	}
  }
}
export function deleteRow(id) {
  return {
    type: 'DELETE_ROW',
	payload: id
  }
}
export function deleteCell(index) {
  return {
    type: 'DELETE_CELL',
	payload: index
  }
}
export function pasteCell(cellData) {
  return {
    type: 'PASTE_CELL',
	payload: cellData
  }
}

