export default function ListContainer({ $target, initialState, onChange }) {
  const $listContainer = document.createElement('div');
  $target.appendChild($listContainer);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $listContainer.innerHTML = `<ul>
      ${Object.entries(this.state.jsonObj)
        .map(([key]) =>
          this.state.jsonObj[key].isClosed
            ? `<li class="list-item" data-key=${key}><span class="list-toggle">▶︎</span>${key}</li>`
            : `<li class="list-item" data-key=${key}><span class="list-toggle">▼</span>${key}${makeSubList(
                this.state.jsonObj[key],
                key
              )}</li>`
        )
        .join('')}
    </ul>`;
  };

  const makeSubList = (jsonObj, prefix) => {
    let temp = '<ul>';
    if ('value' in jsonObj) {
      temp += `<li class="list-item" data-item=${jsonObj.value}>${jsonObj.value}</li></ul>`;
      return temp;
    }
    for (const key of Object.keys(jsonObj)) {
      if (key === 'isClosed') continue;
      let newPrefix = `${prefix}.${key}`;
      if (!jsonObj[key].isClosed) {
        temp += `<li class="list-item" data-key=${newPrefix}><span class="list-toggle">▼</span>${key}`;
        temp += makeSubList(jsonObj[key], newPrefix) + '</li>';
      } else {
        temp += `<li class="list-item" data-key=${newPrefix}><span class="list-toggle">▶︎</span>${key}</li>`;
      }
    }
    temp += '</ul>';
    return temp;
  };

  // key의 최상단 자식들의 객체를 얻는 함수
  const findKey = (prefix, temp, key) => {
    const keys = Object.keys(temp);
    for (const property of keys) {
      if (prefix + property === key) {
        return temp[property];
      } else if (key.split('.').includes(property)) {
        const nextPrefix = `${prefix}${property}.`;
        return findKey(nextPrefix, temp[property], key);
      } else {
        continue;
      }
    }
  };

  $listContainer.addEventListener('click', (e) => {
    const $clickedList = e.target.closest('.list-item');
    const { key } = $clickedList.dataset;

    if (!key) return;

    const newObj = findKey('', this.state.jsonObj, key);
    newObj.isClosed = !newObj.isClosed;
    onChange(this.state);
  });
}
