import styled, {css} from 'styled-components';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface BackdropProps {
	readonly reverse?: boolean;
	readonly tilt?: number;
	readonly moveY?: number;
}

const BackDrop = styled.div<BackdropProps>`
	position: absolute;
	bottom: 0;
	border-bottom: 100vh solid rgb(255, 123, 0); //view height does not work in chrom player for that change to px
	transform: ${({tilt, moveY}) =>
		`scaleX(${tilt ?? 2})  translateY(${moveY ? moveY : 0}px)`};
	${(props) =>
		props.reverse
			? css`
					border-right: 150vw solid transparent;
			  `
			: css`
					border-left: 150vw solid transparent;
			  `}
`;

export const Shades: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const backdropTranslationProgress = spring({
		frame,
		fps,
		config: {
			damping: 20,
		},
	});
	const backdropMiddleProgress = spring({
		frame: frame - 120,
		fps,
		config: {
			damping: 5,
			mass: 5,
		},
	});
	const backdropReverseProgress = spring({
		frame: frame - 125,
		fps,
		config: {
			damping: 300,
			mass: 1.5,
		},
	});

	const backdropFadeProgress = spring({
		frame: frame - 245,
		fps,
		config: {
			damping: 300,
			mass: 1.5,
		},
	});

	const fadeoutProgress = spring({
		frame: frame - 245,
		fps,
		config: {
			damping: 300,
			mass: 5,
		},
	});

	const fadeout = interpolate(fadeoutProgress, [0, 1], [1, 0]);

	return (
		<AbsoluteFill>
			<Sequence from={0} durationInFrames={120}>
				<BackDrop
					tilt={interpolate(backdropTranslationProgress, [0, 1], [0, 3])}
					moveY={interpolate(backdropTranslationProgress, [0, 1], [850, 0])}
				/>
			</Sequence>
			<Sequence from={120} durationInFrames={5}>
				<BackDrop
					tilt={interpolate(backdropMiddleProgress, [0, 1], [3, 100])}
				/>
			</Sequence>
			<Sequence from={125} durationInFrames={120}>
				<BackDrop
					reverse
					tilt={interpolate(backdropReverseProgress, [0, 1], [100, 3])}
					moveY={interpolate(backdropReverseProgress, [0, 1], [0, 600])}
				/>
			</Sequence>
			<Sequence from={245} durationInFrames={60}>
				<BackDrop
					reverse
					style={{opacity: fadeout}}
					tilt={interpolate(backdropFadeProgress, [0, 1], [3, 100])}
					moveY={interpolate(backdropFadeProgress, [0, 1], [600, 0])}
				/>
			</Sequence>
		</AbsoluteFill>
	);
};
