import React from "react";
import { Link } from "react-router-dom";

const SocialIcons = ({ Icons }) => {
	return (
		<div className="text-cyan-300">
			{Icons.map((icon) => (
				<Link
					to={icon.link}
					target="_blank"
				>
					<span
						key={icon.name}
						className="p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-700 hover:bg-cyan-300 duration-300 "
					>
						<ion-icon name={icon.name}></ion-icon>
					</span>
				</Link>
			))}
		</div>
	);
};

export default SocialIcons;
