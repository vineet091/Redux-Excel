import React from "react";
import Excel from "./Excel";
import Header from "./Header";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
		<Excel />
      </div>
    );
  }
}
