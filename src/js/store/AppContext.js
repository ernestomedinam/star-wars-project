import React, { createContext } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext(null);

class AppContextProvider extends React.Component {
	constructor(props) {
		const swapiBaseUrl = "https://swapi.co/api/";
		super(props);
		this.state = {
			store: {
				planets: [],
				people: [],
				vehicles: []
			},
			actions: {
				getResources: async (
					resourceName,
					urlQuery = "",
					resourceId = ""
				) => {
					let resources = [];
					let url = swapiBaseUrl + resourceName + "/";
					if (urlQuery != "") {
						url += urlQuery;
					} else {
						url += resourceId;
					}
					console.log(resourceName, " ", url);
					try {
						let response = await fetch(url, {
							headers: {
								"Content-Type": "application/JSON"
							},
							method: "GET"
						});
						if (response.ok) {
							let data = await response.json();
							resources = data.results;
							console.log(
								resources.length,
								" resources loaded successfuly"
							);
						} else {
							console.log(
								"oh oh, this happened: ",
								response.status,
								" ",
								response.statusText
							);
						}
					} catch (error) {
						console.log(
							"sorry! resource fetch promise rejected..."
						);
					}
					this.setState({
						store: Object.assign(this.state.store, {
							[resourceName]: resources
						}),
						actions: { ...this.state.actions }
					});
				}
			}
		};
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
