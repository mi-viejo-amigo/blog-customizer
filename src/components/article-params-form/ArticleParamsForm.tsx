import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Separator } from 'components/separator';
import { Select } from 'components/select';
import { RadioGroup } from '../radio-group';
import {
	OptionType,
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import { useClose } from './hooks/useClose';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	hendleArticleStateChange: (state: ArticleStateType) => void;
	articleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	hendleArticleStateChange,
	articleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setisMenuOpen] = useState<boolean>(false);
	// Стэйт данных по умолчанию, для ресета.
	const defaultArticleStateRef = useRef<ArticleStateType>(articleState);
	// Стэйт данных который копит все изменения и применяется только при сабмите
	const [selectedStates, setSelectedStates] =
		useState<ArticleStateType>(articleState);
	const formRef = useRef<HTMLFormElement>(null);
	useClose({
		isOpen: isMenuOpen,
		onClose: () => setisMenuOpen(false),
		rootRef: formRef,
	});

	const hendleSelectChange = <K extends keyof ArticleStateType>(
		key: K,
		option: OptionType
	) => {
		setSelectedStates({
			...selectedStates,
			[key]: option,
		});
	};

	const handleClick = () => {
		setisMenuOpen((prev) => !prev);
	};

	const classesAside = clsx(
		isMenuOpen && styles.container_open,
		styles.container
	);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		hendleArticleStateChange({
			...articleState,
			...selectedStates,
		});
	};

	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		hendleArticleStateChange(defaultArticleStateRef.current);
		setSelectedStates(defaultArticleStateRef.current);
	};

	return (
		<>
			<ArrowButton onClick={handleClick} isOpen={isMenuOpen} />
			<aside className={classesAside}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						selected={selectedStates.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							hendleSelectChange('fontFamilyOption', option)
						}
					/>
					<RadioGroup
						name='fontSizeOption'
						title='Размер шрифта'
						selected={selectedStates.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => hendleSelectChange('fontSizeOption', option)}
					/>
					<Select
						title='Цвет шрифта'
						selected={selectedStates.fontColor}
						options={fontColors}
						onChange={(option) => hendleSelectChange('fontColor', option)}
					/>

					<Separator />
					<Select
						title='Цвет фона'
						selected={selectedStates.backgroundColor}
						options={backgroundColors}
						onChange={(option) => hendleSelectChange('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						selected={selectedStates.contentWidth}
						options={contentWidthArr}
						onChange={(option) => hendleSelectChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
