interface Props {
	onClick: () => void;
}

const WaterButton = ({ onClick }: Props) => {
	return (
		<img
			src="/assets/water.png"
			alt="Water Button"
			className="h-[8vh] transform active:translate-y-1 transition-all duration-0 hover:scale-110"
			onClick={onClick}
		/>
	);
};

export default WaterButton;
