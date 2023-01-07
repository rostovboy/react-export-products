import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {
    faFolder,
    faFile,
    faFolderOpen,
    faCheckSquare,
    faSquare,
    faPlusSquare,
    faMinusSquare
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { Node } from 'react-checkbox-tree'
//import { nodes } from './data/nodes1'

library.add(faCheckSquare, faSquare, faChevronRight, faChevronDown, faPlusSquare, faMinusSquare, faFile, faFolderOpen, faFolder)


interface IState {
    checked: [],
    expanded: [],
    nodes: Node[];
}

class App extends React.Component {

    state: IState = {
        checked: [],
        expanded: [],
        nodes: [],
    };

    async componentDidMount() {
        try {
            const response = await fetch('https://grandfayans.ru/api/categories');
            const data = await response.json();
            this.setState({ nodes: data.results });
        } catch (error) {
            // Handle the error
        }
    }

    render() {
        const { nodes } = this.state

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
        )
    }
}

export default App