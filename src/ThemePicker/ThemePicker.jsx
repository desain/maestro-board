import React from 'react';
import {useTranslation} from "react-i18next";
import {BUILTIN_THEMES, CUSTOM_THEME_NAME} from "../Constants";

const ThemePicker = props => {
  const {t} = useTranslation();
  return (
      <select className="float-right form-control-sm" value={props.theme} onChange={e => props.setTheme(e.target.value)}>
        {Object.keys(BUILTIN_THEMES).map(theme =>
            <option key={theme} value={theme}>{BUILTIN_THEMES[theme].name}</option>)}
        <option value={CUSTOM_THEME_NAME}>{t('Custom Theme')}</option>
      </select>
  );
};
export default ThemePicker;
