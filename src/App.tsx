import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { faFolder, faFile, faFolderOpen, faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


library.add(faCheckSquare, faSquare, faChevronRight, faChevronDown, faPlusSquare, faMinusSquare, faFile, faFolderOpen, faFolder);

function App() {
  return (
    <div>
        <FontAwesomeIcon icon={['far', 'check-square']} size="xl" />
    </div>
  );
}

export default App;
