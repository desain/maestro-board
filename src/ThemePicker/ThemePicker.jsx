import React from 'react';
import {useTranslation} from "react-i18next";

export default props => {
  const {t} = useTranslation();
  return (
      <select className="float-right form-control-sm" value={props.theme} onChange={e => props.setTheme(e.target.value)}>
        <option value="default">{t('Default Theme')}</option>
        <option value="tuff">{t('Tuffstro Theme')}</option>
        <option value="nice">{t('Nicestro Theme')}</option>
        <option value="custom">{t('Custom Theme')}</option>
      </select>
  );
};
