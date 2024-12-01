import { useEffect, useState } from "react";
import { database, ref, onValue, set } from "./firebase";
import Tree from "./components/Tree";
import StatusBubble from "./components/StatusBubble";
import { TreeStatus } from "./constants";
import NumberDisplay from "./components/NumberDisplay";
import WaterButton from "./components/WaterButton";
import EmailButton from "./components/EmailButton";

const App = () => {
	const [humidity, setHumidity] = useState<number>();
	const [temperature, setTemperature] = useState<number>();
	const [light, setLight] = useState<number>();
	const [gas, setGas] = useState<number>();
	const [pumpStatus, setPumpStatus] = useState<boolean>();
	const [soilMoisture, setSoilMoisture] = useState<number>();
	const [treeStatus, setTreeStatus] = useState<TreeStatus>();

	// Fetch data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/process-image`
				);
				const data = await response.json();
				setTreeStatus(data.top);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		};

		fetchData();
		const esp32Ref = ref(database, "esp32");
		onValue(esp32Ref, (snapshot) => {
			const data = snapshot.val();
			setHumidity(data.humidity);
			setTemperature(data.temperature);
			setLight(data.light);
			setGas(data.gas);
			setPumpStatus(data.waterPump);
			setSoilMoisture(data.soilMoisture);
		});
	}, []);

	// Control water pump
	const controlPump = (status: boolean) => {
		const pumpRef = ref(database, "esp32/pump");
		set(pumpRef, status).catch((error) => {
			console.error("Failed to update pump status:", error);
		});
	};

	const sendEmail = () => {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/trigger-sensor-email`);
	};

	return (
		<div className="h-screen w-screen bg-sky-900 isolate">
			<Tree />
			<EmailButton onClick={sendEmail} />
			<StatusBubble status={treeStatus || TreeStatus.Healthy} />
			<div className="-z-10 absolute h-screen w-screen flex justify-center mt-auto items-end pb-32 px-4 isolate">
				<NumberDisplay value={humidity} title="Humidity" />
				<NumberDisplay value={temperature} title="Temp" />
				<NumberDisplay value={light} title="Light" />
				<NumberDisplay value={gas} title="Gas" />
				<NumberDisplay value={soilMoisture} title="Soil" />
				<NumberDisplay value={pumpStatus ? "On" : "Off"} title="Pump" />
			</div>
			<div className="flex justify-center items-end absolute bottom-0 w-full mb-10">
				<WaterButton
					onClick={() => {
						controlPump(!pumpStatus);
					}}
				/>
			</div>
		</div>
	);
};

export default App;
