import {Audio} from 'remotion';
import {AbsoluteFill, Sequence} from 'remotion';
import {Shades} from './Teaser2/Shades';
import {Card} from './Teaser2/Card';
import {Heading} from './Teaser2/Heading';
import {Logo} from './Teaser2/Logo';
import {Clips} from './Teaser2/Clips';
import audio from '../public/input_data/soundtrack/teaser2.mp3';

export const Teaser2: React.FC = () => {
	return (
		<AbsoluteFill>
			<Sequence from={0}>
				<Clips />
			</Sequence>
			<Sequence from={30}>
				<Shades />
			</Sequence>
			<Sequence from={0}>
				<Heading />
			</Sequence>
			<Sequence from={90} durationInFrames={180}>
				<Card />
			</Sequence>
			<Sequence from={280}>
				<Logo />
			</Sequence>
			<Audio src={audio} />
		</AbsoluteFill>
	);
};
