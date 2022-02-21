export default function ListContainer({ $target, initialState, onChange }) {
  const $listContainer = document.createElement('section');
  $listContainer.id = 'list-container';
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
            ? `<li class="list-item" data-key=${key}><div class='list-text'><span class="list-toggle">▶︎</span>${key}</div></li>`
            : `<li class="list-item" data-key=${key}><div class='list-text'><span class="list-toggle">▼</span>${key}</div>${makeSubList(
                this.state.jsonObj[key],
                key
              )}</li>`
        )
        .join('')}
    </ul>`;
  };

  // isClosed 값에 따라 재귀적으로 서브리스트를 만드는 함수
  const makeSubList = (jsonObj, prefix) => {
    let temp = '<ul>';
    if ('value' in jsonObj) {
      temp += `<li class="list-item" data-item=${jsonObj.value}><div class='list-text'>${jsonObj.value}</div></li></ul>`;
      return temp;
    }
    for (const key of Object.keys(jsonObj)) {
      if (key === 'isClosed') continue;
      let newPrefix = `${prefix}.${key}`;
      if (!jsonObj[key].isClosed) {
        temp += `<li class="list-item" data-key=${newPrefix}><div class='list-text'><span class="list-toggle">▼</span>${key}</div>`;
        temp += makeSubList(jsonObj[key], newPrefix) + '</li>';
      } else {
        temp += `<li class="list-item" data-key=${newPrefix}><div class='list-text'><span class="list-toggle">▶︎</span>${key}</div></li>`;
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

  // 자식의 isClosed를 모두 true로 만드는 함수
  const setChildTrue = (childObj) => {
    for (const property of Object.keys(childObj)) {
      if (childObj[property] instanceof Object) {
        childObj[property].isClosed = true;
      }
    }
    return childObj;
  };

  $listContainer.addEventListener('click', (e) => {
    const $clickedList = e.target.closest('.list-item');
    const { key } = $clickedList.dataset;

    if (!key) return;

    const newObj = setChildTrue(findKey('', this.state.jsonObj, key));
    newObj.isClosed = !newObj.isClosed;
    onChange(this.state);
  });
}
