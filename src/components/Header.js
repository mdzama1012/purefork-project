import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
	const [buttonContent, setButtonContent] = useState("SignIn");
	const userData = useContext(UserContext);

	const dishList = useSelector(store => store.cart.dish);

	return (
		<header className="mb-12 flex items-center justify-between px-10 py-3 shadow-md">
			<Link to={"/"}>
				<figure className="flex items-center">
					<img
						className="aspect-square w-14 rounded-xl object-cover transition-all hover:scale-105"
						src={LOGO_URL}
						alt="Logo"
					/>
					<figcaption className="ml-3 text-2xl font-bold">PureFork</figcaption>
				</figure>
			</Link>
			<nav>
				<ul className="flex items-center">
					<li>
						<Link to="/" className="navlink">
							Home
						</Link>
					</li>
					<li>
						<Link to="/about" className="navlink">
							About Us
						</Link>
					</li>
					<li>
						<Link to="/cart" className="navlink">
							Cart - {dishList.length}
						</Link>
					</li>
					<li>
						<Link to="/grocery" className="navlink">
							Grocery App
						</Link>
					</li>
					<li>
						<button
							className="font-mono text-orange-600"
							onClick={() =>
								buttonContent === "SignIn"
									? setButtonContent("SignOut")
									: setButtonContent("SignIn")
							}
						>
							{buttonContent}
						</button>
					</li>
					{buttonContent === "Logout" && (
						<li>{buttonContent ? userData.username : ""}</li>
					)}
					<li>
						<button className="ml-3 rounded bg-orange-500 px-3 py-2 font-mono text-white transition-colors hover:bg-orange-600">
							SignUp
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
