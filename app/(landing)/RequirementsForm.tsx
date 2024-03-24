"use client";

import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RocketIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { type IdeateInput, ideateInputSchema } from "../api/generate/schema";

function RequirementsForm() {
	const router = useRouter();

	const form = useForm<IdeateInput>({
		resolver: zodResolver(ideateInputSchema),
	});

	function onSubmit(values: IdeateInput) {
		const url = new URL(window.location.origin);
		url.pathname = "/ideate";
		for (const key in values) {
			url.searchParams.append(
				key,
				encodeURIComponent(values[key as keyof typeof values]),
			);
		}
		router.push(url.toString());
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 lg:w-96"
			>
				<FormField
					control={form.control}
					name="purpose"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Purpose</FormLabel>
							<FormControl>
								<Input placeholder="Eg: Hackathon" {...field} />
							</FormControl>
							<FormDescription>
								What is the purpose of your idea hunt ?
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="domains"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Domains</FormLabel>
							<FormControl>
								<Input
									placeholder="Eg: Blockchain, AI, Healthcare"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Which domain are you looking to disrupt ?
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="technologies"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Technologies</FormLabel>
							<FormControl>
								<Input
									placeholder="Eg: Nextjs, Tailwind, Postgres"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								What tools you gonna wield for this ?
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="additionalInformation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Additional Information</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Eg: I want to build a platform that..."
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Anything else i need to keep in mind ?
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">
					<RocketIcon />
					<span>Let's Goo !</span>
				</Button>
			</form>
		</Form>
	);
}

export default RequirementsForm;
