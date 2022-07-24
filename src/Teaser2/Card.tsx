import {interpolate, useCurrentFrame} from 'remotion';
import {useVideoConfig} from 'remotion';
import {spring} from 'remotion';
import styled from 'styled-components';
import {SplitText} from './SplitText';

const Container = styled.div`
	background-color: rgba(255, 255, 255, 0.7);
	margin-left: 0;
	margin-top: 1000px;
	width: 700px;
	height: 400px;
	border-radius: 0 10px 10px 0;
`;

const startEndAnimationOn = 30;

export const Card: React.FC = () => {
	const {fps, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();

	const driver = spring({
		frame,
		fps,
	});
	const xTransition = interpolate(driver, [0, 1], [-700, -100]);

	const outDriver = spring({
		frame: frame - durationInFrames + startEndAnimationOn,
		fps,
		config: {damping: 200, mass: 0.2},
	});

	const outInterpolate = interpolate(outDriver, [0, 1], [-100, -701]);

	const slide = (delay: number) =>
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
			[67, 33]
		);

	return (
		<Container
			style={{
				transform: `translateX(${
					frame < durationInFrames - startEndAnimationOn
						? xTransition
						: outInterpolate
				}px)`,
			}}
		>
			<SplitText splitSlide={slide(0)} color="#318CE7" text="GO FOR MORE" />
			<SplitText splitSlide={slide(10)} color="#318CE7" text="SEASON PASSES" />
			<SplitText
				splitSlide={slide(20)}
				color="#318CE7"
				text="30% off"
				size={110}
			/>
		</Container>
	);
};
