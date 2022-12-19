//External dependencies
import { useEffect, useState } from 'react';

// Internal dependencies
import { getOptions } from '$src/utils/api';
import { Options } from '_packages/shared/src/types';
import Background from '$src/components/Background/Background';
import SettingInput from './components/SettingInput/SettingInput';
import CopyIcon from '$src/assets/icons/copy.svg';
import style from './Lobby.module.css';

export default function Lobby(): JSX.Element {
	const [options, setOptions] = useState<Options | undefined>(undefined);
	const [host, setHost] = useState<boolean>(true);

	useEffect(() => {
		getOptions().then((options: Options) => setOptions(options));
	}, []);

	return (
		<Background>
			<div className={style.content}>
				<div>
					<h2 className={style.title}>Match Lobby</h2>
					<p className={style.gamePin}>
						Game PIN: <span className={style.gamePinValue}>AB1234 </span>
						<button className={style.copyButton}>
							<CopyIcon />
						</button>
					</p>
				</div>
				<div className={style.mainContent}>
					<div className={style.settings}>
						<h3 className={style.subtitle}>Settings</h3>
						<div className={style.settingsContent}>
							<SettingInput
								label="Region"
								options={options?.regions}
								value={options?.regions[0].value}
								onChange={(value: { value: string; label: string } | undefined): void => console.log(value)}
								edit={host}
								inputType="select"
							/>
							<SettingInput
								label="Category"
								options={options?.categories}
								value={options?.categories[0].value}
								onChange={(value: { value: string; label: string } | undefined): void => console.log(value)}
								edit={host}
								inputType="select"
							/>
							<SettingInput
								label="Tag"
								options={options?.tags}
								value={options?.tags[0].value}
								onChange={(value: { value: string; label: string } | undefined): void => console.log(value)}
								edit={host}
								inputType="select"
							/>
							<SettingInput
								label="Difficulty"
								options={options?.difficulties}
								value={options?.difficulties[0].value}
								onChange={(value: { value: string; label: string } | undefined): void => console.log(value)}
								edit={host}
								inputType="select"
							/>
							<SettingInput
								label="Time per question"
								value="30"
								onChange={(value: { value: string; label: string } | undefined): void => console.log(value)}
								edit={host}
								inputType="number"
							/>
							<SettingInput
								label="Number of questions"
								value="10"
								onChange={(value: { value: string; label: string } | undefined): void => console.log(value)}
								edit={host}
								inputType="number"
							/>
						</div>
					</div>
					<div className={style.players}>
						<h3 className={style.subtitle}>Players</h3>
					</div>
				</div>
			</div>
		</Background>
	);
}
