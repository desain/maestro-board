import React from 'react';
import {useTranslation} from "react-i18next";

const ThemeEditor = props => {
  const {t} = useTranslation();
  const {theme, setTheme} = props;
  return (
      <form>
        <h3>{t('Custom Theme')}</h3>
        <label htmlFor="title">{t('Title')}</label>
        <input
            name="title"
            type="text"
            placeholder={t('Enter Maestro title')}
            value={theme.title}
            onChange={e => setTheme({...theme, title: e.target.value})}
        />
        <label htmlFor="customCss">{t('Custom CSS')}</label>
        <textarea
            name="customCss"
            placeholder={t('Put any custom CSS for your theme here!')}
            value={theme.css}
            onChange={e => setTheme({...theme, css: e.target.value})}
        />
      </form>
  );
};
export default ThemeEditor;
