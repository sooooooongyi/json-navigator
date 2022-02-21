import {
  closedList,
  openedList,
  lastList,
  partialList
} from '../assets/constants.js';

export default function ListContainer({
  $target,
  initialState = {},
  onListClick
}) {
  const $listContainer = document.createElement('section');
  $listContainer.id = 'list-container';
  $target.appendChild($listContainer);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const jsonObj = this.state;
    $listContainer.innerHTML = `<ul id="root-list">
      ${Object.entries(jsonObj)
        .map(([property]) =>
          jsonObj[property].isClosed
            ? closedList({ property })
            : `${partialList({ property })}${makeSubList(
                jsonObj[property],
                property
              )}</li>`
        )
        .join('')}
    </ul>`;
  };

  // isClosed 값에 따라 재귀적으로 서브리스트를 만드는 함수
  const makeSubList = (jsonObj, prefix) => {
    let temp = '<ul>';
    if ('value' in jsonObj) {
      temp += lastList({ value: jsonObj.value });
      return temp;
    }
    for (const property of Object.keys(jsonObj)) {
      if (property === 'isClosed') continue;
      let newPrefix = `${prefix}.${property}`;
      if (!jsonObj[property].isClosed) {
        temp += closedList({ newPrefix, property });
        temp += makeSubList(jsonObj[property], newPrefix) + '</li>';
      } else {
        temp += openedList({ prefix: newPrefix, property });
      }
    }
    temp += '</ul>';
    return temp;
  };

  // key의 최상단 자식들의 객체를 얻는 함수
  const findSubObj = (prefix, temp, key) => {
    const splitList = key.split('.');
    for (const property of Object.keys(temp)) {
      if (prefix + property === key) {
        return temp[property];
      } else if (splitList.includes(property)) {
        const nextPrefix = `${prefix}${property}.`;
        return findSubObj(nextPrefix, temp[property], key);
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
    const jsonObj = this.state;
    const $clickedList = e.target.closest('.list-item');
    const { key } = $clickedList.dataset;

    if (!key) return;

    const newObj = setChildTrue(findSubObj('', jsonObj, key));
    newObj.isClosed = !newObj.isClosed;
    onListClick(jsonObj);
  });
}
