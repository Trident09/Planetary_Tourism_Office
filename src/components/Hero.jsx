import React from "react";
import { Link } from "react-router-dom";

const button = [
	{
		name: "Explore",
		link: "/explore",
	},
	{
		name: "Decide Destination",
		link: "/destination",
	},
];

const Hero = () => {
	return (
		<section className="hero min-h-[90vh] flex flex-col justify-center items-center bg-gray-600">
			<div className="flex justify-center items-start w-[90%]">
				<span className="font-medium text-3xl font-mono uppercase tracking-[1.4px] my-auto">
					So, You want to travel to&nbsp;
					<b className="text-5xl text-purple-300 mt-5 mb-3">Space</b>
				</span>
			</div>
			<p className="font-normal w-[90%] text-xl font-[Barlow] my-3 mx-auto">
				Let's face it: if you want to go to space, you might as well
				genuinely go to outer space and not hover kind of on the edge of
				it. Well sit back, and relax because we'll give you a truly out
				of this world experience.
			</p>
			<div className="flex flex-row justify-center items-center min-w-full">
				{button.map((item, index) => (
					<Link
						to={item.link}
						key={index}
					>
						<button className="bg-purple-300 hover:bg-purple-400 text-black font-normal text-3xl py-2 px-4 rounded-full my-5 mx-3">
							{item.name}
						</button>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Hero;
