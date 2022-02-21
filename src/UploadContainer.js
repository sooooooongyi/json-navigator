import { uploadComponent } from '../assets/constants.js';

export default function UploadContainer({
  $target,
  initialState = {},
  onFileChange
}) {
  const $uploadContainer = document.createElement('section');
  $target.appendChild($uploadContainer);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $uploadContainer.insertAdjacentHTML('afterbegin', uploadComponent);
  };

  this.render();

  // .으로 표현된 계층관계를 obj으로 바꾸는 함수
  const makeObject = (fileObj) => {
    const jsonObj = {};
    for (const [key, value] of Object.entries(fileObj)) {
      const splitList = key.split('.');
      let temp = jsonObj;
      for (const [index, property] of splitList.entries()) {
        if (index === splitList.length - 1) {
          temp[property] = {
            value,
            isClosed: true
          };
        } else {
          if (!temp[property]) {
            temp[property] = {
              isClosed: true
            };
          }
          temp = temp[property];
        }
      }
    }
    return jsonObj;
  };

  $uploadContainer.addEventListener('change', (e) => {
    const { files } = e.target;
    const fileReader = new FileReader();
    fileReader.readAsText(files[0]);
    fileReader.onload = () => {
      const fileObj = JSON.parse(fileReader.result);
      onFileChange(makeObject(fileObj));
    };
  });
}
