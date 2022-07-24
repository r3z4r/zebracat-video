import {AbsoluteFill, Sequence, Audio} from 'remotion';
import {Subtitle} from './Teaser/Subtitle';
import {Title} from './Teaser/Title';
import {Clip} from './Teaser/Clip';
import audio from '../public/input_data/soundtrack/ost.mp3';
import config from '../public/input_data/config.json';

const numberOfClips = config.footage.length;

export const Teaser1: React.FC<{
	titleColor: string;
}> = ({titleColor}) => {
	const getText: (index: number) => {mainText: string; subText: string} = (
		index
	) => {
		// Start text
		if (index === 0) {
			return {mainText: config.text.start_text[0], subText: ''};
		}
		// End text
		if (index + 1 === numberOfClips) {
			return {mainText: config.text.end_text[0], subText: ''};
		}
		// Middle text
		return {
			mainText: Object.values(config.text.middle_text[index % 3])[0],
			subText: Object.values(config.text.middle_text[index % 3])[1],
		};
	};
	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<Audio src={audio} />
			{config.footage.map((clipName, index) => (
				<Sequence key={index} from={index * 60} durationInFrames={61}>
					<AbsoluteFill
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Clip clipName={clipName} />
					</AbsoluteFill>
					<Title titleText={getText(index).mainText} titleColor={titleColor} />
					<Subtitle
						color={config.color[index % config.color.length]}
						text={getText(index).subText}
					/>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
