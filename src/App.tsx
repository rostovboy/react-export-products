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
import axios from 'axios'
//import { nodes } from './data/nodes1'

library.add(faCheckSquare, faSquare, faChevronRight, faChevronDown, faPlusSquare, faMinusSquare, faFile, faFolderOpen, faFolder)


interface IState {
    checked: [],
    expanded: [],
    nodes: Node[],
    result: string,
    isTreeLoading: boolean,
    isLinkLoading: boolean
}

const apiEndpoint = 'https://cors-anywhere.herokuapp.com/https://grandfayans.ru/api/categories'
const authorizationToken = 'Token 67c5604a-0f50-4ad1-927e-ca70200b03d0'

class App extends React.Component {

    state: IState = {
        checked: [],
        expanded: [],
        nodes: [],
        result: '',
        isTreeLoading: true,
        isLinkLoading: true
    }



    /* async componentDidMount() {
        try {
            const response = await fetch('https://grandfayans.ru/api/categories', {
                headers: {
                    Authorization: 'Token 67c5604a-0f50-4ad1-927e-ca70200b03d0',
                },
                //mode: 'no-cors',
            });
            const data = await response.json()
            this.setState({ nodes: data.results })
        } catch (error) {
            // Handle the error
        }
    } 
    
    handleSubmit = () => {
        const { checked } = this.state;
        fetch('https://cors-anywhere.herokuapp.com/https://grandfayans.ru/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 67c5604a-0f50-4ad1-927e-ca70200b03d0',
            },
            body: JSON.stringify({ checked }),
        })
    } */

    handleSelectAll = () => {
        const { nodes } = this.state
        console.log(nodes)
        const allNodeIds = nodes.map(node => node.value)
        console.log(allNodeIds)
        this.setState({ checked: allNodeIds })
    }

    async componentDidMount() {
        try {
            const response = await axios.get(apiEndpoint, {
                headers: {
                    'Authorization': authorizationToken,
                },
            })
            this.setState({ nodes: response.data.results, isTreeLoading: false })
        } catch (error) {
            // Handle the error
        }
    }

    handleSubmit = async () => {
        const { checked } = this.state
        try {
            const response = await axios.post(apiEndpoint, { checked }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorizationToken,
                },
            })
            this.setState({ result: response.data.object, isLinkLoading: false })
        } catch (error) {
            // Handle the error
        }
    }

    clearChecked = () => {
        this.setState({ checked: [], result: '' });
    }

    render() {
        const { nodes, result, checked, isTreeLoading, isLinkLoading } = this.state;

        console.log(this.state)

        return (
            <div>
                {isTreeLoading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Загружается структура каталога...</span>
                    </div>
                ) : (
                    <div>
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

                        <div>
                            <button className="btn btn-primary mt-5 mb-5" onClick={this.handleSelectAll}>Выбрать все</button>
                        </div>

                        {result ? (
                            <div>
                                {isLinkLoading ? (
                                    <div>
                                        <button className="btn btn-primary mt-5 mb-5" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span className="sr-only">Экспорт...</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <a className="btn btn-primary mt-5 mb-5" href={result} onClick={this.clearChecked}>Скачать архив</a>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                className="btn btn-primary mt-5 mb-5"
                                disabled={checked.length === 0}
                                onClick={this.handleSubmit}
                            >
                                Экспорт
                            </button>
                        )}

                    </div>
                )}
            </div>
        )
    }
}

export default App