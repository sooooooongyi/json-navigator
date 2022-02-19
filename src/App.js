import UploadContainer from './UploadContainer.js';
import ListContainer from './ListContainer.js';

export default function App({ $target }) {
  this.state = {
    jsonObj: null
  };

  this.setState = (nextState) => {
    this.state = nextState;
    listContainer.setState(nextState);
  };

  const uploadContainer = new UploadContainer({
    $target: $target,
    initialState: {},
    onChange: (jsonObj) => {
      this.setState({ jsonObj });
    }
  });

  const listContainer = new ListContainer({
    $target: $target,
    initialState: {},
    onChange: (nextState) => {
      this.setState(nextState);
    }
  });
}
