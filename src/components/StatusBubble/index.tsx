import { TreeStatus } from "../../constants";

interface StatusProps {
	status: TreeStatus;
}

const StatusBubble = ({ status }: StatusProps) => {
	return (
		<div className="absolute left-1/2 h-1/6 top-[10%] flex items-center justify-center">
			<img
				src={`assets/${status}.gif`}
				alt=""
				className="h-2/3 absolute top-[10%]"
			/>
			<img src="assets/bubble.png" alt="Text Bubble" className="h-full" />
		</div>
	);
};

export default StatusBubble;
