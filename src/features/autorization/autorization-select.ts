import { RootState } from '../../store';

/**
 * Селектор для получения статуса авторизации пользователя
 * @function selectAutorization
 * @param {RootState} state - Корневое состояние Redux
 * @returns {boolean} Возвращает текущий статус авторизации (true - авторизован, false - не авторизован)
 * 
 * @example
 * // Использование в компоненте
 * const isAuthorized = useSelector(selectAutorization);
 */
export const selectAutorization = (state: RootState) => state.autorization;