import { useSelector } from 'react-redux';
import { selectTheme } from '../features/theme/theme-selector';

import vkDark from '@/assets/images/icon_vk.png';
import vkLight from '@/assets/images/icon_vk-light.svg';
import facebookDark from '@/assets/images/icon_facebook.png';
import facebookLight from '@/assets/images/icon_facebook-light.svg';
import linkedinDark from '@/assets/images/icon_linkedin.png';
import linkedinLight from '@/assets/images/icon_linkedin-light.svg';
/**
 * Компонент подвала сайта с социальными иконками и копирайтом
 * @component
 * @returns {JSX.Element} Возвращает футер с соц. иконками и копирайтом
 * 
 * @example
 * // Использование компонента
 * <Footer />
 * 
 * @description
 * Компонент подвала с особенностями:
 * - Адаптирует иконки соц. сетей под текущую тему (темная/светлая)
 * - Автоматически обновляет год в копирайте
 * - Содержит ссылки на соц. сети (VK, Facebook, LinkedIn)
 */
export const Footer = () => {
  const theme = useSelector(selectTheme);

  // Массив данных для социальных иконок
  const socialIcons = [
    { 
      name: 'vk', 
      alt: 'VKontakte',
      icon: theme === 'dark' ? vkDark : vkLight
    },
    { 
      name: 'facebook', 
      alt: 'Facebook',
      icon: theme === 'dark' ? facebookDark : facebookLight
    },
    { 
      name: 'linkedin', 
      alt: 'LinkedIn',
      icon: theme === 'dark' ? linkedinDark : linkedinLight
    }
  ];
  return (
    <footer className='footer'>
      <div className='footer__message'>
        {socialIcons.map((icon) => (
          <div key={icon.name} className={`footer__message__${icon.name}`}>
            <img
              src={icon.icon}
              alt={icon.alt}
              width='21px'
              height='21px'
              aria-label={`Link to our ${icon.alt}`}
              role="link"
            />
          </div>
        ))}
      </div>
      <div className='footer__data'>
        © {new Date().getFullYear()} Copyright Text
      </div>
    </footer>
  );
};
