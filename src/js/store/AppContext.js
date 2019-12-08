import React, { createContext } from "react";
import PropTypes from "prop-types";
import getState from "./flux";

export const AppContext = createContext(null);

class AppContextProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = getState({
			getStore: () => this.state.store,
			getActions: () => this.state.actions,
			setStore: updatedStore =>
				this.setState({
					store: Object.assign(this.state.store, updatedStore),
					actions: { ...this.state.actions }
				})
		});
	}
	async componentDidMount() {
		let newStore = {};
		let resourceNames = ["people", "vehicles", "planets"];
		for (let resource of resourceNames) {
			newStore[resource] = await this.state.actions.getResources(
				resource
			);
		}
		this.setState({
			...this.state,
			store: newStore
		});
	}
	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}

export default AppContextProvider;

AppContextProvider.propTypes = {
	children: PropTypes.node.isRequired
};
