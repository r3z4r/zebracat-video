import {
	interpolate,
	Img,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import styled from 'styled-components';
import logo from '../../public/input_data/logo.png';
import config from '../../public/input_data/config.json';

const Container = styled.div`
	text-align: center;
	width: 100%;
	margin-top: 50vh; //view height does not work in chrom player for that change to px
	color: white;
`;

interface TitleProps {
	readonly letterSpacing?: number;
}

const Title = styled.h1<TitleProps>`
	letter-spacing: ${({letterSpacing}) => `${letterSpacing ?? 1}px`};
	display: inline;
	margin: 1em;
	font-size: 2.5em;
	font-weight: 1000;
`;

export const Logo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const rangeGenerator = (range: [number, number] = [0, 1]) =>
		interpolate(
			spring({
				frame,
				fps,
				config: {
					damping: 200,
					mass: 4,
				},
			}),
			[0, 1],
			range
		);
	return (
		<Container style={{opacity: rangeGenerator()}}>
			<Img
				src={logo}
				width="100px"
				height="100px"
				style={{verticalAlign: 'middle'}}
			/>
			<Title letterSpacing={rangeGenerator([0, 30])}>ZEBRACAT</Title>
			<Title
				style={{
					display: 'block',
					fontSize: '1.8em',
					margin: '2em',
					fontWeight: 'lighter',
				}}
			>
				{config.text.end_text[0]}
			</Title>
		</Container>
	);
};
