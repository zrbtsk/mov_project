import { Status } from '../types';

/**
 * Пропсы компонента PaginationButton
 * @interface PaginationButtonProps
 * @property {() => void} onClick - Обработчик клика по кнопке
 * @property {Status} status - Статус загрузки данных
 * @property {boolean} hasMore - Флаг наличия дополнительных данных
 * @property {string | null} error - Сообщение об ошибке (если есть)
 */
interface PaginationButtonProps {
  onClick: () => void;
  status: Status;
  hasMore: boolean;
  error: string | null;
}

/**
 * Компонент кнопки пагинации с состоянием загрузки
 * @component
 * @returns {JSX.Element} Возвращает кнопку "Show more" или индикатор загрузки
 * @description
 * Компонент кнопки пагинации с особенностями:
 * - Отображается только при наличии дополнительных данных (hasMore) и отсутствии ошибок
 * - Меняет текст на "Loading..." во время загрузки
 * - Блокируется во время загрузки
 * - Автоматически скрывается при ошибках или отсутствии данных
 */
export const PaginationButton = ({
  onClick,
  status,
  hasMore,
  error,
}: PaginationButtonProps) => {
  return (
    <>
      {hasMore && !error && (
        <button
          className='pagination'
          onClick={onClick}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Loading...' : 'Show more'}
        </button>
      )}
    </>
  );
};
