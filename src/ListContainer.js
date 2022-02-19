export default function ListContainer({ $target, initialState }) {
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
        .map(([key]) => `<li class="list-item" data-key=${key}>▶︎${key}</li>`)
        .join('')}
    </ul>`;
  };

  // 전달받은 key의 최상단 자식들로 <ul><li>...</li></ul>로 만드는 함수
  const makeSubTree = (key) => {
    let subTree = '';
    const { subObj } = findKey('', this.state.jsonObj, key);
    if (subObj instanceof Object) {
      for (const property of Object.keys(subObj)) {
        subTree += `<li class="list-item" data-key=${key}.${property}>▶︎${property}</li>`;
      }
    } else {
      subTree += `<li class="list-item" data-item=${key}>${subObj}</li>`;
    }
    return subTree;
  };

  // key의 최상단 자식들의 객체 또는 값을 얻는 함수
  const findKey = (prefix, temp, key) => {
    const keys = Object.keys(temp);
    for (const property of keys) {
      if (prefix + property === key) {
        return { subObj: temp[property] };
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

    if ($clickedList.classList.contains('isOpened')) {
      $clickedList.removeChild($clickedList.lastChild);
      $clickedList.classList.remove('isOpened');
    } else {
      const $subList = document.createElement('ul');
      $subList.innerHTML = makeSubTree(key);
      $clickedList.classList.add('isOpened');
      $clickedList.appendChild($subList);
    }
  });
}
