import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { AppContext } from "../store/AppContext";

//create your first component
function Home() {
	return (
		<AppContext.Consumer>
			{({ store, actions }) => (
				<React.Fragment>
					<div className="text-center mt-5">
						<h1>Hello Rigo!</h1>
						<p>
							<img src={rigoImage} />
						</p>
						<a href="#" className="btn btn-success">
							If you see this green button... bootstrap is working
						</a>
						<p>
							Made by{" "}
							<a href="http://www.4geeksacademy.com">
								4Geeks Academy
							</a>
							, with love!
						</p>
					</div>
					<div className="row justify-content-center">
						<button
							onClick={() => {
								actions.getResources("people");
							}}
							className="btn btn-primary">
							Get people
						</button>
					</div>
				</React.Fragment>
			)}
		</AppContext.Consumer>
	);
}

export default Home;
