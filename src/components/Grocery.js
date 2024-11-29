import React from "react";

const Grocery = () => {
	return (
		<section className="flex h-[70vh] items-center justify-center">
			<div className="rounded border border-slate-500 p-4">
				<h1 className="mb-5 text-xl font-bold">Grocery</h1>
				<p>
					This is a Grocery App within our PureFork App, similar to Swiggy
					Instamart. The code for this app contains many components and
					demonstrates the concept of lazy loading.
				</p>
			</div>
		</section>
	);
};

export default Grocery;
