import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
    faFolder,
    faFile,
    faFolderOpen,
    faCheckSquare,
    faSquare,
    faPlusSquare,
    faMinusSquare
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { Node } from 'react-checkbox-tree';
import axios from 'axios';

library.add(faCheckSquare, faSquare, faChevronRight, faChevronDown, faPlusSquare, faMinusSquare, faFile, faFolderOpen, faFolder);

interface IState {
    checked: string[];
    expanded: string[];
    nodes: Node[];
    result: string;
    isTreeLoading: boolean;
    isLinkLoading: boolean;
}

type DownloadType = 'single' | 'separate';

//const apiEndpoint = 'https://cors-anywhere.herokuapp.com/https://grandfayans.ru/api/categories';
const apiEndpoint = 'https://grandfayans.ru/api/categories';
const authorizationToken = 'Token 67c5604a-0f50-4ad1-927e-ca70200b03d0';

class App extends React.Component<{}, IState> {

    state: IState = {
        checked: [],
        expanded: [],
        nodes: [],
        result: '',
        isTreeLoading: true,
        isLinkLoading: true
    };

    // Получить все ID узлов
    getAllNodeIds = (nodes: Node[]): string[] => {
        let ids: string[] = [];
        nodes.forEach(node => {
            ids.push(node.value);
            if (node.children) {
                ids = ids.concat(this.getAllNodeIds(node.children));
            }
        });
        return ids;
    };

    // Проверка, все ли элементы выделены
    isAllSelected = (): boolean => {
        const { nodes, checked } = this.state;
        const allNodeIds = this.getAllNodeIds(nodes);

        // Сравниваем массивы, учитывая порядок элементов
        return allNodeIds.length === checked.length && allNodeIds.every(id => checked.includes(id));
    };

    // Обработчик для кнопки "Выделить все / Снять выделение"
    handleToggleSelectAll = () => {
        const { nodes } = this.state;
        const allNodeIds = this.getAllNodeIds(nodes);

        // Если все элементы уже выделены, снимаем выделение
        if (this.isAllSelected()) {
            this.setState({ checked: [] });
        } else {
            // Иначе выделяем все элементы
            this.setState({ checked: allNodeIds });
        }
    };

    async componentDidMount() {
        try {
            const response = await axios.get(apiEndpoint, {
                headers: {
                    'Authorization': authorizationToken,
                },
            });
            this.setState({ nodes: response.data.results, isTreeLoading: false });
        } catch (error) {
            // Обработка ошибки
        }
    }

    handleSubmit = async (type: DownloadType) => {
        const { checked } = this.state;
        try {
            const response = await axios.post(apiEndpoint, { "categories": checked, "type": type }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorizationToken,
                },
            });
            this.setState({ result: response.data.object, isLinkLoading: false });
        } catch (error) {
            // Обработка ошибки
        }
    };

    clearChecked = () => {
        this.setState({ checked: [], result: '' });
    };

    render() {
        const { nodes, result, checked, isTreeLoading, isLinkLoading } = this.state;

        // Определяем текст кнопки
        const isAllSelected = this.isAllSelected();
        const buttonText = isAllSelected ? 'Снять выделение' : 'Выделить все';

        return (
            <div>
                {isTreeLoading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Загружается структура каталога...</span>
                    </div>
                ) : (
                    <div>
                        <div>
                            <a className="pseudo mb-3" href="#" onClick={(e) => {
                                    e.preventDefault(); // Предотвращает переход по ссылке
                                    this.handleToggleSelectAll();
                                }}>
                                {buttonText}
                            </a>
                        </div>
                        <CheckboxTree
                            nodes={nodes}
                            checked={checked}
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
                                        <a className="btn btn-primary mt-5 mb-5" href={result} onClick={this.clearChecked}>Скачать</a>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // две кнопки Скачать одним файлом и Скачать раздельными файлами, если выбрана одна категория, то будет просто кнопка Скачать
                            <div>
                                <button
                                    className="btn btn-primary mt-5 mb-5 mr-4"
                                    disabled={checked.length === 0}
                                    onClick={() => this.handleSubmit('single')}
                                >
                                    Скачать одним Excel-файлом 
                                </button>

                                <button
                                    className="btn btn-primary mt-5 mb-5"
                                    disabled={checked.length === 0}
                                    onClick={() => this.handleSubmit('separate')}
                                >
                                    Скачать архив с раздельными файлами
                                </button>
                            </div>
                            
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default App;