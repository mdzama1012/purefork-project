import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import useInternetStatus from "../hooks/useInternetStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
	const [buttonContent, setButtonContent] = useState("Login");
	const isOnline = useInternetStatus();
	const userData = useContext(UserContext);

	const dishList = useSelector(store => store.cart.dish);

	return (
		<div className="mb-12 flex items-center justify-between px-20 py-3 shadow-md">
			<Link to={"/"}>
				<img
					className="aspect-square w-14 rounded-xl object-cover transition-all hover:scale-105"
					src={LOGO_URL}
					alt="Logo"
				/>
			</Link>
			<ul className="flex items-center gap-5 text-lg font-semibold tracking-tighter text-slate-700">
				<li>Internet Status: {isOnline ? "✅ Online" : "❌ Offline"}</li>
				<li>
					<Link to="/" className="hover:text-orange-600">
						Home
					</Link>
				</li>
				<li>
					<Link to="/about" className="hover:text-orange-600">
						About
					</Link>
				</li>
				<li>
					<Link to="/cart" className="hover:text-orange-600">
						Cart - {dishList.length} items
					</Link>
				</li>
				<li>
					<Link to="/grocery" className="hover:text-orange-600">
						Grocery
					</Link>
				</li>
				<li>
					<button
						className="w-24 rounded-md border-2 border-orange-500 px-5 py-1 font-mono shadow-md"
						onClick={() =>
							buttonContent === "Login"
								? setButtonContent("Logout")
								: setButtonContent("Login")
						}
					>
						{buttonContent}
					</button>
				</li>
				{buttonContent === "Logout" && (
					<li>{buttonContent ? userData.username : ""}</li>
				)}
			</ul>
		</div>
	);
};

export default Header;
