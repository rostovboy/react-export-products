import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faFolder, faFile, faFolderOpen, faCheckSquare, faSquare, faPlusSquare, faMinusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckboxTree from 'react-checkbox-tree';


library.add(faCheckSquare, faSquare, faChevronRight, faChevronDown, faPlusSquare, faMinusSquare, faFile, faFolderOpen, faFolder);

const nodes = [{
  value: '4436',
  label: 'Мебель для ванной комнаты',
  children: [
    { value: '4459', label: 'Мебель для ванной EvaGold' },
    { value: '4460', label: 'Мебель для ванной SFARZOSO' },
  ],
}, {
  value: '4433',
  label: 'Душевые ограждения EvaGold',
}, {
  value: '4438',
  label: 'Душевые кабины и углы EvaGold',
  children: [
    { value: '4466', label: 'Душевые кабины EvaGold' },
    { value: '4468', label: 'Душевые углы EvaGold' },
  ],
}];



class App extends React.Component {

  state = {
    checked: [],
    expanded: [],
  };

  render() {
    console.log(this.state)

    return (
      <CheckboxTree
        nodes={nodes}
        checked={this.state.checked}
        expanded={this.state.expanded}
        onCheck={checked => this.setState({ checked })}
        onExpand={expanded => this.setState({ expanded })}
        showExpandAll={true}
        iconsClass="fa5"
        icons={{
          check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon={['far', 'check-square']} />,
          uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['far', 'square']} />,
          halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon={['far', 'check-square']} />,
          expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
          expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
          expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon={['far', 'square-plus']} />,
          collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon={['far', 'square-minus']} />,
          parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon={['far', 'folder']} />,
          parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon={['far', 'folder-open']} />,
          leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon={['far', 'file']} />
        }}
      />
    );
  }
}

export default App;
