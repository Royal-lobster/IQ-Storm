import Image from "next/image";
import RequirementsForm from "./RequirementsForm";

export default function Home() {
	return (
		<main className="flex flex-col md:flex-row min-h-screen">
			<div className="md:flex-1 grid place-items-center hero-pattern border-r border-pink-500 p-10">
				<Image
					src="/iq-storm.png"
					alt="A picture of brain with lightning bolt below it"
					width={477}
					height={477}
					quality={100}
					className="size-20 md:size-96 object-contain"
				/>
			</div>
			<div className="md:flex-1 grid place-items-center p-10">
				<RequirementsForm />
			</div>
		</main>
	);
}
