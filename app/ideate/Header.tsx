import Image from "next/image";
import React from "react";

export interface HeaderProps {
	purpose: string;
	domains: string;
	technologies: string;
}

function Header({ purpose, domains, technologies }: HeaderProps) {
	return (
		<header className="flex flex-col items-center justify-center">
			<Image
				src="/iq-storm.png"
				alt="A picture of brain with lightning bolt below it"
				width={80}
				height={80}
				quality={100}
				className="size-20 object-contain"
			/>
			<p className="text-lg text-center max-w-2xl">
				Generating ideas for{" "}
				<span className="text-primary text-xl">{purpose}</span> on domains{" "}
				<span className="text-primary text-xl">{technologies}</span> with
				technologies <span className="text-primary text-xl">{domains}</span>
			</p>
		</header>
	);
}

export default Header;
