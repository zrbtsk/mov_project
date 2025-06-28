import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Срез Redux для управления состоянием авторизации пользователя
 * @type {import('@reduxjs/toolkit').Slice<boolean>}
 * @description Хранит булево значение, указывающее на статус авторизации пользователя
 * (true - авторизован, false - не авторизован)
 */
export const autorizationSlice = createSlice({
  name: '@@autorization',
  initialState: false as boolean,
  reducers: {
    /**
 * Устанавливает статус авторизации пользователя
 * @function setAutorization
 * @param {boolean} state - Текущее состояние (не используется)
 * @param {PayloadAction<boolean>} action - Действие с новым статусом авторизации
 * @returns {boolean} Новый статус авторизации
 */
    setAutorization: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

// Экспорт редьюсера и действий
export const autorizationReducer = autorizationSlice.reducer;
export const { setAutorization } = autorizationSlice.actions;
