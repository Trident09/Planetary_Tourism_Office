import React from "react";
import "../css/waves.css";

function Waves() {
	return (
		<div className="waves relative mt-[100px]">
			<div
				className="wave absolute -top-[100px] left-0 w-full h-[100px] bg-transparent"
				id="wave1"
			></div>
			<div
				className="wave absolute -top-[100px] left-0 w-full h-[100px] bg-transparent"
				id="wave2"
			></div>
			<div
				className="wave absolute -top-[100px] left-0 w-full h-[100px] bg-transparent"
				id="wave3"
			></div>
			<div
				className="wave absolute -top-[100px] left-0 w-full h-[100px] bg-transparent"
				id="wave4"
			></div>
		</div>
	);
}

export default Waves;
