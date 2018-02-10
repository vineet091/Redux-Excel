import React from "react";

export default class TH extends React.Component {
		constructor() {
		super();
		this.state = {
			sortBy: 'asc',
		}
	}

	sortData = () => {
	  let { sortBy } = this.state
      this.props.sortColumn(this.props.thdata.index, sortBy)
      sortBy = (sortBy === 'asc') ? 'desc' : 'asc'
      this.setState({ sortBy })
	}	
    render = () => {
        return (
            <th key={this.props.key} onClick={this.sortData.bind(this)}>{this.props.thdata.value}
            </th>
        );
    }
}  
