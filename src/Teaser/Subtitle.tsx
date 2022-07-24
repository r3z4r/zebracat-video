import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import config from '../../public/input_data/config.json';

const subtitle: React.CSSProperties = {
	fontFamily: config.secondary_font.join(' '),
	fontSize: 45,
	textAlign: 'center',
	margin: 10,
	position: 'absolute',
	bottom: 50,
	width: '100%',
};

const backDrop: React.CSSProperties = {
	background: 'rgba(0, 0, 0, 0.4)',
	position: 'absolute',
	height: '20%',
	width: '100%',
	left: 0,
	bottom: 0,
};

export const Subtitle: React.FC<{color: string; text: string}> = ({
	color,
	text,
}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();
	if (text === '') return null;
	const scale = spring({
		fps: videoConfig.fps,
		frame: frame - 15,
		config: {
			damping: 50,
			stiffness: 70,
		},
	});
	const backdropTranslationProgress = spring({
		frame,
		fps: videoConfig.fps,
		config: {
			damping: 20,
		},
	});

	const backdropTranslation = interpolate(
		backdropTranslationProgress,
		[0, 1],
		[200, 0]
	);
	const opacity = interpolate(frame, [45, 61], [1, 0]);
	console.log(color);
	return (
		<div
			style={{
				...backDrop,
				opacity,
				transform: `translateY(${backdropTranslation}px)`,
			}}
		>
			<div style={{...subtitle, opacity, color, transform: `scaleX(${scale})`}}>
				{text}
			</div>
		</div>
	);
};
