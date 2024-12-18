import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { Option } from './Option';
import { useState, useEffect } from 'react';
import styles from './RadioGroup.module.scss';

type RadioGroupProps = {
	name: string;
	options: OptionType[];
	selected: OptionType;
	onChange?: (value: OptionType) => void;
	title: string;
};

export const RadioGroup = (props: RadioGroupProps) => {
	const { name, options, selected, onChange, title } = props;
	const [selectedOption, setSelectedOption] = useState<OptionType>(
		selected as OptionType
	);
	useEffect(() => {
		setSelectedOption(selected as OptionType);
	}, [selected]);
	const handleChange = (option: OptionType) => {
		if (JSON.stringify(option) !== JSON.stringify(selectedOption)) {
			setSelectedOption(option);
			onChange?.(option);
		}
	};

	return (
		<div className={styles.container}>
			{title && (
				<>
					<Text weight={800} size={12} uppercase>
						{title}
					</Text>
				</>
			)}
			<div className={styles.group}>
				{options.map((option) => (
					<Option
						key={option.value}
						groupName={name}
						value={option.value}
						title={option.title}
						selected={selectedOption}
						onChange={() => handleChange(option)}
						option={option}
					/>
				))}
			</div>
		</div>
	);
};
