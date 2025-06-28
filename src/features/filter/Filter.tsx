import { useSelector } from 'react-redux';
import Select, {
  components,
  GroupBase,
  MultiValue,
  OptionProps,
  ValueContainerProps,
} from 'react-select';
import { useSearchParams } from 'react-router-dom';

import { useGenre } from './use-genre';
import { useCountry } from './use-country';
import { useYears } from './use-years';
import { useRating } from './use-rating';

import { selectTheme } from '../theme/theme-selector';
import { selectFilter } from './filter-selector';
import { clearFilter } from './filter-slice';
import { useAppDispatch } from '../../store';
import { Genre } from '../../types';

import downLightIcon from '@/assets/images/icon_down-light.svg';
import downIcon from '@/assets/images/icon_down.png';
import plusLightIcon from '@/assets/images/icon_plus-light.svg';
import plusIcon from '@/assets/images/icon_plus.png';
import closeLightIcon from '@/assets/images/icon_close-light.svg';
import closeIcon from '@/assets/images/icon_close.png';

// Типы для опций селектов
interface OptionTypeGenre {
  value: Genre;
  label: string;
}
interface OptionType {
  value: string;
  label: string;
}

// Пропсы для кастомных компонентов react-select
interface CustomOptionCountryProps extends OptionProps<OptionType, false> {
  selectOption: (option: OptionType) => void;
}
interface CustomOptionGenreProps
  extends OptionProps<OptionTypeGenre, true, GroupBase<OptionTypeGenre>> {
  selectOption: (option: OptionTypeGenre) => void;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CustomValueContainerProps
  extends ValueContainerProps<
    OptionTypeGenre,
    true,
    GroupBase<OptionTypeGenre>
  > { }

/**
* Компонент фильтра для поиска фильмов/сериалов/мультфильмов.
* Предоставляет интерфейс для фильтрации по:
* - Жанрам (мультиселект)
* - Странам
* - Годам выпуска
* - Рейтингу
* - Подписке (без функционала)
* - Бесплатному контенту (без функционала)
*/
export const Filter = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const theme = useSelector(selectTheme);

  // Хуки для управления фильтрами
  const { optionsG, handleSelectGenre, reduxGenre } = useGenre(searchParams);
  const { optionsC, handleSelectCountry, reduxCountry, optionsCountry } =
    useCountry(searchParams);
  const {
    menuRefYears,
    toggleMenuYear,
    setInputFromYear,
    setInputToYear,
    doneYear,
    isMenuOpenYear,
    resetYear,
    handleKeyDownYears,
  } = useYears();
  const {
    menuRefRating,
    toggleMenuRating,
    isMenuOpenRating,
    setInputFromRating,
    setInputToRating,
    doneRating,
    resetRating,
    handleKeyDownRating,
  } = useRating();

  // Получение текущих значений фильтров из Redux
  const { year: reduxYears } = useSelector(selectFilter);
  const { rating: reduxRating } = useSelector(selectFilter);

  // Очистка всех фильтров
  const cleanFilter = () => dispatch(clearFilter());

  /**
 * Кастомный контейнер для отображения выбранных значений в мультиселекте жанров
 */
  const CustomValueContainer: React.FC<CustomValueContainerProps> = ({
    children,
    ...props
  }) => {
    const { isMulti, value } = props.selectProps;

    const isMultiValue = (val: unknown): val is MultiValue<OptionTypeGenre> => {
      return Array.isArray(val);
    };

    if (!value || (isMulti && !isMultiValue(value))) {
      return (
        <components.ValueContainer {...props}>
          {children}
        </components.ValueContainer>
      );
    }

    if (isMulti && isMultiValue(value) && value.length > 0) {
      return (
        <components.ValueContainer {...props}>
          <div className='filter__genre__multi-value'>
            {value.map((item, index) => (
              <span key={item.value}>
                {item.label}
                {index < value.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </components.ValueContainer>
      );
    }
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  };

  /**
 * Кастомная опция с чекбоксом для селекта жанров
 */
  const OptionWithCheckboxGenre: React.FC<CustomOptionGenreProps> = (props) => {
    const {
      children,
      className,
      cx,
      getStyles,
      isDisabled,
      isFocused,
      innerRef,
      innerProps,
      isSelected,
    } = props;

    return (
      <div
        ref={innerRef}
        style={getStyles('option', props) as React.CSSProperties}
        className={cx(
          {
            option: true,
            'option--is-disabled': isDisabled,
            'option--is-focused': isFocused,
            'option--is-selected': isSelected,
          },
          className
        )}
        {...innerProps}
      >
        {children}
        <input
          type='checkbox'
          checked={isSelected}
          onChange={() => null}
          className='filter__genre__option__checkbox'
        />
      </div>
    );
  };

  /**
 * Кастомная опция с чекбоксом для селекта стран
 */
  const OptionWithCheckboxCountries: React.FC<CustomOptionCountryProps> = (
    props
  ) => {
    const {
      children,
      className,
      cx,
      getStyles,
      isDisabled,
      isFocused,
      innerRef,
      innerProps,
      isSelected,
      selectOption,
    } = props;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      selectOption?.(props.data);
    };

    return (
      <div
        ref={innerRef}
        style={getStyles('option', props) as React.CSSProperties}
        className={cx(
          {
            option: true,
            'option--is-disabled': isDisabled,
            'option--is-focused': isFocused,
            'option--is-selected': isSelected,
          },
          className
        )}
        {...innerProps}
      >
        {children}
        <input
          type='checkbox'
          checked={isSelected}
          onClick={handleClick}
          onChange={() => { }} // eslint-disable-line @typescript-eslint/no-empty-function
          readOnly
          className='filter__countries__option__checkbox'
        />
      </div>
    );
  };
  return (
    <>
      <section className='filter'>
        {/* Селект жанров */}
        <Select
          unstyled
          className='filter__genre'
          classNamePrefix='filter__genre'
          components={{
            Option: OptionWithCheckboxGenre,
            ValueContainer: CustomValueContainer,
            /**
 * Компонент иконки для выпадающего списка
 */
            DropdownIndicator: (dropdownProps) => (
              <components.DropdownIndicator {...dropdownProps}>
                <div>
                  {theme === 'dark' ? (
                    <img
                    src={downIcon}
                      alt='icons'
                      width='21px'
                      height='21px'
                      className='filter__genre__icon'
                    />
                  ) : (
                    <img
                      src={downLightIcon}
                      alt='icons'
                      width='21px'
                      height='21px'
                      className='filter__genre__icon'
                    />
                  )}
                  <p
                    className={`${reduxGenre.length > 0 ? 'hasValue' : 'filter__genre__text'
                      }`}
                  >
                    Genre
                  </p>
                </div>
              </components.DropdownIndicator>
            ),
            IndicatorSeparator: null,
            ClearIndicator: undefined,
          }}
          placeholder=''
          isMulti
          isClearable
          hideSelectedOptions={false}
          isSearchable={false}
          options={optionsG}
          value={reduxGenre}
          onChange={handleSelectGenre}
        />
        {/* Селект стран */}
        <Select
          unstyled
          components={{
            Option: OptionWithCheckboxCountries,
            DropdownIndicator: () => (
              <div>
                <p
                  className={`${reduxCountry ? 'hasValue' : 'filter__countries__text'
                    }`}
                >
                  Countries
                </p>
                {theme === 'dark' ? (
                  <img
                    src={downIcon}
                    alt='icons'
                    width='21px'
                    height='21px'
                    className='filter__countries__icon'
                  />
                ) : (
                  <img
                    src={downLightIcon}
                    alt='icons'
                    width='21px'
                    height='21px'
                    className='filter__countries__icon'
                  />
                )}
              </div>
            ),
            IndicatorSeparator: null,
          }}
          className='filter__countries'
          classNamePrefix='filter__countries'
          placeholder=''
          options={optionsC}
          isSearchable={false}
          isClearable
          hideSelectedOptions={false}
          value={optionsCountry[reduxCountry] || ''}
          onChange={handleSelectCountry}
        />
        {/* Фильтр по годам */}
        <div
          className='years'
          ref={menuRefYears}
          onKeyDown={handleKeyDownYears}
        >
          <div className='filter__years' onClick={toggleMenuYear}>
            <p className={`${reduxYears ? 'hasValue' : 'filter__years__text'}`}>
              Years
            </p>
            {theme === 'dark' ? (
              <img
                src={downIcon}
                alt='icons'
                width='21px'
                height='21px'
                className={`filter__years__icon ${isMenuOpenYear ? 'filter__years__icon--rotated' : ''
                  }`}
              />
            ) : (
              <img
                src={downLightIcon}
                alt='icons'
                width='21px'
                height='21px'
                className={`filter__years__icon ${isMenuOpenYear ? 'filter__years__icon--rotated' : ''
                  }`}
              />
            )}
            <div className='filter__years__label'>{reduxYears}</div>
          </div>
          <div
            className={`filter__years__menu ${isMenuOpenYear ? 'filter__years__menu--visible' : ''
              }`}
          // ref={menuRefYears}
          >
            <p>from</p>
            <p>to</p>
            <input
              type='number'
              className='filter__years__menu__input--from'
              placeholder='1874'
              onChange={setInputFromYear}
            />
            <input
              type='number'
              className='filter__years__menu__input--to'
              placeholder='2025'
              onChange={setInputToYear}
            />
            <div
              className='filter__years__menu__btn--reset'
              onClick={resetYear}
            >
              Reset
            </div>
            <div className='filter__years__menu__btn--done' onClick={doneYear}>
              Done
            </div>
          </div>
        </div>
        {/* Фильтр по рейтингу */}
        <div
          className='rating'
          ref={menuRefRating}
          onKeyDown={handleKeyDownRating}
        >
          <div className='filter__rating' onClick={toggleMenuRating}>
            <p
              className={`${reduxRating ? 'hasValue' : 'filter__rating__text'}`}
            >
              Rating
            </p>
            {theme === 'dark' ? (
              <img
                src={downIcon}
                alt='icons'
                width='21px'
                height='21px'
                className={`filter__rating__icon ${isMenuOpenRating ? 'filter__rating__icon--rotated' : ''
                  }`}
              />
            ) : (
              <img
                src={downLightIcon}
                alt='icons'
                width='21px'
                height='21px'
                className={`filter__rating__icon ${isMenuOpenRating ? 'filter__rating__icon--rotated' : ''
                  }`}
              />
            )}
            <div className='filter__rating__label'>{reduxRating}</div>
          </div>
          <div
            className={`filter__rating__menu ${isMenuOpenRating ? 'filter__rating__menu--visible' : ''
              }`}
          >
            <p>from</p>
            <p>to</p>
            <input
              type='number'
              className='filter__rating__menu__input--from'
              placeholder='1'
              onChange={setInputFromRating}
            />
            <input
              type='number'
              className='filter__rating__menu__input--to'
              placeholder='10'
              onChange={setInputToRating}
            />
            <div
              className='filter__years__menu__btn--reset'
              onClick={resetRating}
            >
              Reset
            </div>
            <div
              className='filter__rating__menu__btn--done'
              onClick={doneRating}
            >
              Done
            </div>
          </div>
        </div>
        {/* Дополнительные фильтры  пока без функционала*/}
        <div className='otherFilters'>
          <div className='otherFilters__subscription'>
            <p className='otherFilters__subscription__text'>
              {theme === 'dark' ? (
                <img
                  src={plusIcon}
                  alt='icons'
                  width='11px'
                  height='11px'
                  className='otherFilters__subscription__icons'
                />
              ) : (
                <img
                  src={plusLightIcon}
                  alt='icons'
                  width='11px'
                  height='11px'
                  className='otherFilters__subscription__icons'
                />
              )}
              by subscription
            </p>
          </div>
          <div className='otherFilters__free'>
            <p className='otherFilters__free__text'>
              {theme === 'dark' ? (
                <img
                  src={plusIcon}
                  alt='icons'
                  width='11px'
                  height='11px'
                  className='otherFilters__free__icons'
                />
              ) : (
                <img
                  src={plusLightIcon}
                  alt='icons'
                  width='11px'
                  height='11px'
                  className='otherFilters__free__icons'
                />
              )}
              free
            </p>
          </div>
          <div className='otherFilters__resetFilters' onClick={cleanFilter}>
            <p className='otherFilters__resetFilters__text'>
              {theme === 'dark' ? (
                <img
                  src={closeIcon}
                  alt='icons'
                  width='11px'
                  height='11px'
                  className='otherFilters__resetFilters__icons'
                />
              ) : (
                <img
                  src={closeLightIcon}
                  alt='icons'
                  width='11px'
                  height='11px'
                  className='otherFilters__resetFilters__icons'
                />
              )}
              Reset filters
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
