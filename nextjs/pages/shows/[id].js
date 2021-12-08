import Layout from '../../components/MyLayout';
import axios from 'axios';
import { getStaticProps as ShowProps } from './index';
import Image from 'next/image';

export default function show({ data }) {
	return (
		<Layout>
			<div>
				<h1>{data.name} </h1>
				<p>{data.summary ? data.summary.replace(/(<([^>]+)>)/gi, '') : 'No Summary'}</p>

				<Image
					src={data.image ? data.image.medium : 'https://patrickhill.nyc/images/me.jpg'}
					height={294}
					width={209}
				/>
			</div>

			<style jsx>{`
				p::first-letter {
					font-size: 200%;
				}
			`}</style>
		</Layout>
	);
}

export async function getStaticProps({ params }) {
	const { data } = await axios.get('http://api.tvmaze.com/shows/' + params.id);
	console.log(`Fetched a show: ${data.name}`);
	return {
		props: { data }
	};
}

export async function getStaticPaths() {
	const { data } = await axios.get('http://api.tvmaze.com/shows');
	const paths = data.map((show) => {
		return {
			params: { id: show.id.toString() }
		};
	});

	return {
		paths: paths,
		fallback: false
	};
}