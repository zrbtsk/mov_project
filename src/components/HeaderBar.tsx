import { useState } from 'react';

import { Filter } from '../features/filter/Filter';
import { Button } from './Button';

/**
 * Пропсы компонента HeaderBar
 * @interface HeaderBarProps
 * @property {string} type - Тип контента ('movie' | 'tv-series' | 'cartoon')
 */
interface HeaderBarProps {
  type: string;
}

/**
 * Компонент заголовочной панели с описанием контента и фильтрами
 * @component
 * @returns {JSX.Element} Возвращает заголовочную панель с кнопкой "Назад", заголовком, раскрывающимся описанием и фильтрами
 */
export const HeaderBar = ({ type }: HeaderBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);


  return (
    <>
      {type === 'movie' && (
        <>
          <section className='headerBar'>
            <Button />
            <h1 className='headerBar__title'>Movies</h1>
            <span
              className={
                isExpanded === false ? 'headerBar__p' : 'headerBar__expanded'
              }
            >
              Films are an art that can transport the viewer into worlds full of
              emotions and adventures. Since its introduction at the end of the
              19th century, cinema has become an important part of culture and
              entertainment. There are many genres of films, each offering
              viewers a unique experience. Among the most popular genres are
              action films, comedies, dramas, science fiction and horror.
            </span>
            <div
              className='headerBar__btn'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded === false ? 'Show' : 'Hide'}
            </div>
          </section>
          <Filter />
        </>
      )}
      {type === 'tv-series' && (
        <>
          <section className='headerBar'>
            <Button />
            <h1 className='headerBar__title'>Serials</h1>
            <span
              className={
                isExpanded === false ? 'headerBar__p' : 'headerBar__expanded'
              }
            >
              TV series have become an integral part of modern entertainment
              content, attracting viewers with their variety and depth of plot.
              Dramas, comedies and thrillers stand out among the popular genres,
              but doramas and Turkish TV series deserve special attention.
              Dramas, as a rule, offer viewers romantic and melodramatic stories
              that immerse themselves in the unique culture of East Asia.
              Turkish TV series, in turn, are known for their emotional plots
              and vivid characters, often touching on themes of love, betrayal
              and family values.Currently, the world of cinema is also
              experiencing an increase in the popularity of science fiction and
              fantasy genres, which allow viewers to immerse themselves in
              incredible worlds. Crime dramas and psychological thrillers
              continue to capture attention due to their tense atmosphere and
              unexpected plot twists.
            </span>
            <div
              className='headerBar__btn'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded === false ? 'Show' : 'Hide'}
            </div>
          </section>
          <Filter />
        </>
      )}
      {type === 'cartoon' && (
        <>
          <section className='headerBar'>
            <Button />
            <h1 className='headerBar__title'>Cartoons</h1>
            <span
              className={
                isExpanded === false ? 'headerBar__p' : 'headerBar__expanded'
              }
            >
              The collection of cartoons presented in the section is amazing.
              The Soviet classics we`ve known since childhood are here, as well
              as the most high-profile Hollywood premieres of recent years. It`s
              no secret that the West invests as much money in animated films as
              in regular game films. Therefore, they are not much inferior in
              their entertainment to the most anticipated blockbusters. Watching
              such cartoon videos online is very interesting and exciting.
            </span>
            <div
              className='headerBar__btn'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded === false ? 'Show' : 'Hide'}
            </div>
          </section>
          <Filter />
        </>
      )}
    </>
  );
};
