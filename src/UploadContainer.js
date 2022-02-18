export default function UploadContainer({ $target, initialState, onChange }) {
  const $uploadContainer = document.createElement('div');
  $target.appendChild($uploadContainer);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $uploadContainer.innerHTML = `
      <label id="input-label" for="input-file">
        Upload JSON
      </label>
      <input type="file" id="input-file" accept=".json" style="display:none;">
    `;
  };

  this.render();

  $uploadContainer.addEventListener('change', (e) => {
    const { files } = e.target;
    const fileReader = new FileReader();
    fileReader.readAsText(files[0]);
    fileReader.onload = () => {
      onChange(makeObject(JSON.parse(fileReader.result)));
    };
  });
}

function makeObject(fileObj) {
  const jsonObj = {};
  for (const [key, value] of Object.entries(fileObj)) {
    const split_list = key.split('.');
    let temp = jsonObj;
    for (const [index, property] of split_list.entries()) {
      if (index === split_list.length - 1) {
        temp[property] = value;
      } else {
        if (!temp[property]) {
          temp[property] = {};
        }
        temp = temp[property];
      }
    }
  }
  return jsonObj;
}
