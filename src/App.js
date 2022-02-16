export default function App({ $target}) {
  const $uploadContainer = document.createElement('div');
  const $treeContainer = document.createElement('div');

  $target.appendChild($uploadContainer);
  $target.appendChild($treeContainer);

}