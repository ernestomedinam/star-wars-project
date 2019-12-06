const getState = ({ getStore, getActions, setStore }) => {
	const swapiBaseUrl = "https://swapi.co/api/";
	return {
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
					console.log("sorry! resource fetch promise rejected...");
				}
				setStore({
					[resourceName]: resources
				});
			}
		}
	};
};

export default getState;
