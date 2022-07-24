import {
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {AbsoluteFill} from 'remotion';
import React from 'react';
import {Clip} from '../Teaser/Clip';

export const Clips: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const rangeGenerator = (delay = 0, range: [number, number] = [0, 1]) =>
		interpolate(
			spring({
				frame: frame - delay,
				fps,
				config: {
					damping: 200,
					mass: 2,
				},
			}),
			[0, 1],
			range
		);
	return (
		<AbsoluteFill>
			<Sequence
				style={{
					opacity: rangeGenerator(20),
				}}
				from={20}
				durationInFrames={70}
			>
				<Clip clipName="2.webm" />
			</Sequence>
			<Sequence
				style={{
					margin: 'auto',
					opacity: rangeGenerator(95),
				}}
				from={95}
				durationInFrames={110}
			>
				<Clip startFrom={29} clipName="2.webm" />
			</Sequence>
			<Sequence
				style={{
					opacity:
						frame < 220 ? rangeGenerator(195) : rangeGenerator(290, [1, 0]),
				}}
				from={200}
				durationInFrames={120}
			>
				<Clip startFrom={29} clipName="10.webm" />
			</Sequence>
		</AbsoluteFill>
	);
};
