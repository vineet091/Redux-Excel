const initialState = {
	isMouseDown : false,
    copiedCells : [],
    cellIndex : 3,
    cellCount : 3,
    rowIndex : 3,
    cellPrefix : '',		   
    cellTitles: [{index: -1, value: 'No.'}, {index :0, value :'A'}, {index :1, value :'B'}, {index :2, value :'C'}],		   
    totalRows: [{index : 0, data: [
			   { x: 0, y:0, value :1},
			   { x: 0, y:1, value :2},
			   {x: 0, y:2, value :3}]},		   
		    { index :1, data: [
			   { x: 1, y:0, value :4},
			   { x: 1, y:1, value :5},
			   {x: 1, y:2, value :6}]},
	        { index:2, data: [
			   { x: 2, y:0, value :7},
			   { x: 2, y:1, value :8},
			   {x: 2, y:2, value :9}]}]
    }
class Storage {
    getState() {
		if(typeof (localStorage) !== 'undefined') {
			var state = JSON.parse(localStorage.getItem('excelstate'));	
		    return (state === null) ? initialState :   state ;
		}		
		return initialState;
	} 
	setState(state) {
        if (typeof (localStorage) !== 'undefined') {
            localStorage.setItem('excelstate', JSON.stringify(state));
			}
    }
}
const storage = new Storage();
export default storage;
