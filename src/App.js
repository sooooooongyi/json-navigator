import UploadContainer from './UploadContainer.js';
import ListContainer from './ListContainer.js';

export default function App({ $target }) {
  const $uploadSection = document.createElement('section');
  const $listSection = document.createElement('section');
  $target.appendChild($uploadSection);
  $target.appendChild($listSection);

  this.state = {
    jsonObj: null
  };

  this.setState = (nextState) => {
    this.state = nextState;
    listContainer.setState(nextState);
  };

  const uploadContainer = new UploadContainer({
    $target: $uploadSection,
    initialState: {},
    onChange: (jsonObj) => {
      this.setState({ jsonObj });
    }
  });

  const listContainer = new ListContainer({
    $target: $listSection,
    initialState: {}
  });
}
