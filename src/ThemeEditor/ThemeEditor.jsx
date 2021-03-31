import React from 'react';
import {useTranslation} from "react-i18next";
import {FormControl, FormLabel} from "react-bootstrap";

const ThemeEditor = props => {
  const {t} = useTranslation();
  const {theme, setTheme} = props;
  return (
      <>
        <h3>{t('Custom Theme')}</h3>
        <FormLabel htmlFor="title">{t('Title')}</FormLabel>
        <FormControl
            name="title"
            type="text"
            placeholder={t('Enter Maestro title')}
            value={theme.title}
            onChange={e => setTheme({...theme, title: e.target.value})}
        />
        <FormLabel htmlFor="customCss">{t('Custom CSS')}</FormLabel>
        <FormControl
            as="textarea"
            name="customCss"
            placeholder={t('Put any custom CSS for your theme here!')}
            value={theme.css}
            onChange={e => setTheme({...theme, css: e.target.value})}
        />
      </>
  );
};
export default ThemeEditor;
