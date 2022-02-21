export const uploadComponent =
  '<label id="input-label" for="input-file">Upload JSON</label><input type="file" id="input-file" accept=".json" style="display:none;">';

export const closedList = ({ prefix = '', property }) =>
  `<li class="list-item" data-key=${
    prefix || property
  }><div class="list-text"><span class="list-toggle">▶︎${property}</div></li>`;

export const openedList = ({ prefix, property }) =>
  `<li class="list-item" data-key=${prefix}><div class="list-text">▼${property}</div>`;

export const lastList = ({ value }) =>
  `<li class="list-item" data-item=${value}><div class='list-text'>${value}</div></li></ul>`;

export const partialList = ({ property }) =>
  `<li class="list-item" data-key=${property}><div class="list-text">▼${property}</div>`;
