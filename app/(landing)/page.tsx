import Image from "next/image";
import RequirementsForm from "./RequirementsForm";

export default function Home() {
	return (
		<main className="flex min-h-screen">
			<div className="flex-1 grid place-items-center hero-pattern border-r border-pink-500">
				<Image
					src="/iq-storm-large.png"
					alt="A picture of brain with lightning bolt below it"
					width={477}
					height={477}
					quality={100}
				/>
			</div>
			<div className="flex-1 grid place-items-center">
				<RequirementsForm />
			</div>
		</main>
	);
}
