import React from "react";
import Head from "next/head";

export default function Seo({
	description = "TaskScheduler application to assign tasks and auto asssign on non completion.",
	author = "Shubham Muthreja",
	meta,
	title = "Task Scheduler",
}) {
	const metaData = [
		{
			name: `description`,
			content: description,
		},
		{
			property: `og:title`,
			content: title,
		},
	].concat(meta);
	return (
		<Head>
			<title>{title}</title>
			{metaData.map(({ name, content }, i) => (
				<meta key={i} name={name} content={content} />
			))}
		</Head>
	);
}

Seo.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``,
};
