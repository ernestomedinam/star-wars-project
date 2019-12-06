import React from "react";
import AppContextProvider from "./store/AppContext";
import Home from "./views/Home";

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<AppContextProvider>
				<Home />
			</AppContextProvider>
		);
	}
}

export default Layout;
