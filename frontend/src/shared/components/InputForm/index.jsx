import { useState } from "react";
import Styles from "./InputForm.module.css";

const InputForm = ({
	title,
 	type = 'text',
 	Width,
 	Height,
 	options,
 	onChange = () => {},
 	content,
 	value,
 	name = '',
 	flexGrow,
}) => {
	const [visiblePassword, setVisiblePassword] = useState(false);

	// Soporte para modo controlado y no controlado: si `value` viene definido
	// el componente actúa controlado; si no, mantiene su propio estado local
	const isControlled = value !== undefined;
	const [localValue, setLocalValue] = useState(content ?? '');
	const displayedValue = isControlled ? value : localValue;

	function handleChange(e) {
		const v = e?.target?.value;
		if (!isControlled) setLocalValue(v);
		// siempre notificar hacia afuera si el padre pasó onChange
		onChange && onChange(e);
	}

	return (
		<>
			{type !== "select" && type !== "area" ? (
				<div
					className={Styles.inputFormContainer}
					style={{ width: Width, height: Height }}
				>
					<input
						name={name}
						type={type === 'password' && visiblePassword ? 'text' : type}
						className={Styles.inputForm}
						required
						autoComplete="off"
						style={{
							width: Width,
							height: Height,
							paddingRight: type === 'password' && '2.5vw',
						}}
						onChange={handleChange}
						value={displayedValue}
					/>
					<label htmlFor="" className={Styles.labelInputForm}>
						{title}
					</label>
					{type === "password" && (
						<button
							type="button"
							className={Styles.eyePassword}
							onClick={() => setVisiblePassword(!visiblePassword)}
						>
							<img
								src={`/Graphics/Icons/${
									visiblePassword ? "open" : "closed"
								}-eye.png`}
								alt=""
								draggable="false"
								style={{ width: "100%", opacity: "60%" }}
							/>
						</button>
					)}
				</div>
			) : (
				<div
					className={Styles.inputFormContainer}
					style={{ width: Width, height: Height }}
				>
					{type === "select" && (
						<>
							<select
								name={name}
								id=""
								className={Styles.inputForm}
								onChange={handleChange}
								required
								style={{ width: Width, height: Height }}
								value={displayedValue}
							>
								{options?.map((optionVal, i) => (
									<option
										value={optionVal}
										key={`${optionVal}-${i}`}
									>
										{optionVal}
									</option>
								))}
							</select>
							<label htmlFor="" className={Styles.labelInputForm}>
								{title}
							</label>
						</>
					)}
					{type === "area" && (
						<>
							<textarea
								name={name}
								id=""
								cols="30"
								rows="10"
								className={Styles.inputForm}
								style={{
									width: Width,
									height: Height,
									resize: 'none',
									paddingTop: '10px',
									flexGrow: flexGrow,
								}}
								onChange={handleChange}
								value={displayedValue} // Valor controlado para textarea
							/>
							<label htmlFor="" className={Styles.labelInputForm}>
								{title}
							</label>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default InputForm;
