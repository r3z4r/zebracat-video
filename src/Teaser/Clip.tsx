import {Video} from 'remotion';
import {staticFile} from 'remotion';

const videoConfig = {
	volume: 0,
	// Style: {width: 1080},
};

export const Clip: React.FC<{startFrom?: number; clipName: string}> = ({
	startFrom,
	clipName,
}) => {
	return (
		<Video
			{...videoConfig}
			startFrom={startFrom}
			src={staticFile(`input_data/footage/${clipName}`)}
		/>
	);
};
