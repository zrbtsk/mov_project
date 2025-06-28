
/**
 * Компонент индикатора загрузки
 * @component
 * @returns {JSX.Element} Возвращает анимированный индикатор загрузки
 * @note Рекомендуется использовать при:
 * - Загрузке данных
 * - Ожидании ответа от API
 * - Длительных операциях
 */
export const Preloader = () => {
  return (
    <div className='loader' data-testid='preloader'>
      <div className='content'></div>
    </div>
  );
};
