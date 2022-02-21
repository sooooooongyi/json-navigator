import UploadContainer from './UploadContainer.js';
import ListContainer from './ListContainer.js';

export default function App({ $target }) {
  this.state = null;

  this.setState = (nextState) => {
    this.state = nextState;
    listContainer.setState(nextState);
  };

  new UploadContainer({
    $target: $target,
    initialState: {},
    onFileChange: (jsonObj) => {
      this.setState(jsonObj);
    }
  });

  const listContainer = new ListContainer({
    $target: $target,
    initialState: {},
    onListClick: (nextState) => {
      this.setState(nextState);
    }
  });
}
