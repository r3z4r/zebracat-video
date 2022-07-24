import {Composition} from 'remotion';
import {Teaser1} from './Teaser1';
import {Teaser2} from './Teaser2';
import config from '../public/input_data/config.json';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Teaser1"
				component={Teaser1}
				durationInFrames={config.footage.length * 60}
				fps={30}
				width={720}
				height={1080}
				defaultProps={{
					titleColor: 'white',
				}}
			/>
			<Composition
				id="Teaser2"
				component={Teaser2}
				durationInFrames={360}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
