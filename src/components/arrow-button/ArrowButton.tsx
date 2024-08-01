import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export const ArrowButton = ({
	onClick,
	isOpen,
}: {
	onClick: OnClick;
	isOpen: boolean;
}) => {
	const classesContainer = clsx(
		isOpen && styles.container_open,
		styles.container
	);
	const classesArrow = clsx(isOpen && styles.arrow_open, styles.arrow);

	const ariaLabel = isOpen
		? 'Закрыть форму параметров статьи'
		: 'Открыть форму параметров статьи';

	return (
		<div
			role='button'
			aria-label={ariaLabel}
			tabIndex={0}
			className={classesContainer}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={classesArrow} />
		</div>
	);
};
