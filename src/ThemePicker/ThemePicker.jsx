import React from 'react';

export default props =>
  <select className="float-right form-control-sm" value={props.theme} onChange={e => props.setTheme(e.target.value)}>
    <option value="default">Default Theme</option>
    <option value="tuff">Tuffstro Theme</option>
    <option value="nice">Nicestro Theme</option>
    <option value="custom">Custom Theme</option>
  </select>;
