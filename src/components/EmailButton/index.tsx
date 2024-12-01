interface Props {
	onClick: () => void;
}

const EmailButton = ({ onClick }: Props) => {
	return (
		<img
			src="assets/mail.png"
			alt="Send E-mail button"
			onClick={onClick}
			className="absolute h-[8%] inset-0 mx-auto translate-x-[200%] hover:scale-110 transform active:translate-y-1 transition-all duration-0"
		/>
	);
};

export default EmailButton;
