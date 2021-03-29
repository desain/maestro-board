import React from 'react';

const LanguagePicker = props =>
    <select className="float-right form-control-sm" value={props.language} onChange={(e) => props.setLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      <option value="es">Español</option>
    </select>;
export default LanguagePicker;
