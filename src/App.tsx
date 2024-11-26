import { useEffect, useState } from "react";
import { database, ref, onValue, set } from "./firebase";
import Tree from "./components/Tree";
import StatusBubble from "./components/StatusBubble";
import { TreeStatus } from "./constants";
import NumberDisplay from "./components/NumberDisplay";
import WaterButton from "./components/WaterButton";

const App = () => {
	const [humidity, setHumidity] = useState<number>();
	const [temperature, setTemperature] = useState<number>();
	const [light, setLight] = useState<number>();
	const [pumpStatus, setPumpStatus] = useState<boolean>();

	// Fetch data
	useEffect(() => {
		const humidityRef = ref(database, "esp32/humidity");
		onValue(humidityRef, (snapshot) => {
			const data = snapshot.val();
			setHumidity(data);
		});

		const pumpRef = ref(database, "esp32/pump");
		onValue(pumpRef, (snapshot) => {
			const data = snapshot.val();
			setPumpStatus(data);
		});

		const temperatureRef = ref(database, "esp32/temperature");
		onValue(temperatureRef, (snapshot) => {
			const data = snapshot.val();
			setTemperature(data);
		});

		const lightRef = ref(database, "esp32/light");
		onValue(lightRef, (snapshot) => {
			const data = snapshot.val();
			setLight(data);
		});
	}, []);

	// Control water pump
	const controlPump = (status: boolean) => {
		const pumpRef = ref(database, "esp32/pump");
		set(pumpRef, status).catch((error) => {
			console.error("Failed to update pump status:", error);
		});
	};

	return (
		<div className="h-screen w-screen">
			<Tree />
			<StatusBubble status={TreeStatus.Sad} />
			<div className="-z-10 absolute h-screen w-screen flex justify-around mt-auto items-end pb-32">
				<NumberDisplay value={humidity} title="Humidity" />
				<NumberDisplay value={temperature} title="Temp" />
				<NumberDisplay value={light} title="Light" />
				<NumberDisplay value={"100%"} title="Test" />
			</div>
			<div className="flex justify-center items-end absolute bottom-0 w-full mb-10">
				<WaterButton
					onClick={() => {
						console.log("clicked");
					}}
				/>
			</div>
		</div>
	);
};

export default App;
