import UploadContainer from './UploadContainer.js';

export default function App({ $target }) {
  const $uploadSection = document.createElement('div');
  $target.appendChild($uploadSection);

  this.state = {
    file: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  const uploadContainer = new UploadContainer({
    $target: $uploadSection,
    initialState: {},
    onChange: (file) => {},
  });
}
