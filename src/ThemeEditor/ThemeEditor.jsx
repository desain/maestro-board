import React from 'react';
import {useTranslation} from "react-i18next";

export default props => {
  const {t} = useTranslation();
  return (
      <form>
        <h3>{t('Custom Theme')}</h3>
        <label htmlFor="title">{t('Title')}</label>
        <input
            name="title"
            type="text"
            placeholder={t('Enter Maestro title')}
            value={props.theme.title}
            onChange={e => props.setTheme({...props.theme, title: e.target.value})}
        />
      </form>
  );
};
