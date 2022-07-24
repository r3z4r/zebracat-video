import {
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import styled from 'styled-components';
import {SplitText} from './SplitText';
import config from '../../public/input_data/config.json';

const Container = styled.div`
	position: absolute;
	height: 300px;
	bottom: 0;
`;

/* CONSTANTS */
// Intro velocity per half frame
const introVelocity = 10;
const introTextWords = config.text.start_text[0].split(' ');
const introFinishFrame = introTextWords.length * introVelocity * 2;
// Subtitle duration in frames
const subDuration = 70;
/* CONSTANTS END */

export const Heading: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const slide = (delay: number, range: [number, number] = [100, 0]) =>
		interpolate(
			spring({
				frame: frame - delay,
				fps,
				config: {
					damping: 200,
					mass: 0.2,
				},
			}),
			[0, 1],
			range
		);

	return (
		<>
			{introTextWords.map((word: string, i) => {
				const delay = introVelocity * 2 * i;
				return (
					<>
						<Sequence
							key={`introWordShow${i}`}
							from={delay}
							durationInFrames={introVelocity}
						>
							<SplitText
								splitSlide={slide(delay, [70, 30])}
								text={word.toUpperCase()}
								size={160}
							/>
						</Sequence>
						<Sequence
							key={`introWordFade${i}`}
							from={delay + introVelocity}
							durationInFrames={introVelocity}
						>
							<SplitText
								reverse
								splitSlide={slide(delay + introVelocity, [30, 70])}
								text={word.toUpperCase()}
								size={160}
							/>
						</Sequence>
					</>
				);
			})}
			{config.text.middle_text.map((midText, index) => {
				const startFrame: number = subDuration * index + introFinishFrame;
				return (
					<Sequence
						key={`seq${index}`}
						from={startFrame}
						durationInFrames={subDuration}
					>
						<Container>
							<SplitText
								splitSlide={slide(startFrame, [70, 20])}
								color={config.color[index]}
								text={Object.values(midText)[0]}
								size={80}
							/>
							<SplitText
								splitSlide={slide(startFrame + subDuration / 4)}
								color="black"
								text={Object.values(midText)[1]}
								size={50}
							/>
						</Container>
					</Sequence>
				);
			})}
		</>
	);
};
