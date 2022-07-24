import styled from 'styled-components';
import config from '../../public/input_data/config.json';

interface TextDefaultProps {
	readonly splitSlide?: number;
	readonly size?: number;
	readonly color?: string;
	readonly reverse?: boolean;
}

const Text = styled.div<TextDefaultProps>`
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 30%;
	color: #0000;
	& h1 {
		font-family: ${config.main_font.join(' ')};
		font-size: ${({size}) => `${size ?? 55}px`};
		display: inline;
		padding: 0.5em;
	}
	& h1.clip {
		position: absolute;
		color: ${({color}) => `${color ?? '#fff'}`};
		clip-path: ${({splitSlide, reverse}) => {
			const amount = `${splitSlide ?? 33}%`;
			if (reverse) return `inset(${amount} -1% -1% 1%)`;
			return `inset(-1% -1% ${amount} 1%)`;
		}};
	}
`;

interface SplitTextProps extends TextDefaultProps {
	readonly text: string;
}

export const SplitText: React.FC<SplitTextProps> = (props) => {
	return (
		<>
			<Text {...props}>
				<h1>{props.text}</h1>
				<h1 className="clip">{props.text}</h1>
			</Text>
		</>
	);
};
