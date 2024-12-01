interface Props {
	title?: string;
	value?: number | string;
}

const NumberDisplay = ({ title, value }: Props) => {
	return (
		<div className="h-[10%] w-[20%] lg:w-[10%]">
			<div className="flex items-center justify-center relative h-1/2 z-10 ">
				<img
					src="assets/textbox.png"
					alt=""
					className="absolute z-0 h-[300%] w-auto object-contain"
				/>
				<p className="font-jersey text-base z-10">{title}</p>
			</div>
			<div className="flex items-center justify-center relative top-[0%] h-1/2">
				<img
					src="assets/display.png"
					alt="number display background"
					className="absolute h-[250%] w-auto object-contain"
				/>
				<p className="font-jersey text-3xl z-10">{value}</p>
			</div>
		</div>
	);
};

export default NumberDisplay;
