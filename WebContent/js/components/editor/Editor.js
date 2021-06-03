/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrionEditor from 'orion-editor-component';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import EditorMenuBar from './EditorMenuBar';

import { fetchUSSFile, saveUSSResource } from '../../actions/editor';
import USSSaveAsDialog from '../dialogs/USS/SaveAsDialog';

const NO_DIALOG = 'NO_DIALOG';
const SAVE_AS_USS = 'SAVE_AS_USS';

const PLAIN_TEXT = 'text/plain';
const REXX = 'text/rexxcontext';

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentContent: props.content,
            currentChecksum: props.checksum,
            syntax: PLAIN_TEXT,
        };
        this.getContent = this.getContent.bind(this);
        this.handleChangeSyntax = this.handleChangeSyntax.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveAs = this.handleSaveAs.bind(this);
        this.dialogReturn = this.dialogReturn.bind(this);
    }

    componentWillMount() {
        const { dispatch, location } = this.props;
        if (location) {
            dispatch(fetchUSSFile(location.query.file));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { checksum, location, content, file } = this.props;
        if (checksum !== nextProps.checksum) {
            this.setState({ currentChecksum: nextProps.checksum });
        }
        if (location && (nextProps.content !== content)) {
            this.setState({ currentContent: nextProps.content });
        }
        if (nextProps.file && file !== nextProps.file) {
            if (nextProps.file.includes('rexx')) {
                this.setState({ syntax: REXX });
            }
        }
    }

    getContent = content => {
        this.setState({ currentContent: content });
    }

    handleChangeSyntax(syntax) {
        this.setState({ syntax });
    }

    handleSave() {
        const { dispatch, file } = this.props;
        dispatch(saveUSSResource(file, this.state.currentContent, this.state.currentChecksum));
    }

    handleSaveAs() {
        this.setState({ dialog: SAVE_AS_USS });
    }

    dialogReturn = () => {
        this.setState({ dialog: NO_DIALOG });
    }

    renderDialog() {
        const { dispatch, file, checksum } = this.props;
        switch (this.state.dialog) {
            case SAVE_AS_USS:
                return (<USSSaveAsDialog
                    file={file}
                    content={this.state.currentContent}
                    checksum={checksum}
                    dispatch={dispatch}
                    dialogReturn={this.dialogReturn}
                />);
            default:
                return null;
        }
    }

    render() {
        const { content, file } = this.props;
        return (
            <div>
                <Card class="component-no-vertical-pad">
                    <CardContent
                        class="component-no-vertical-pad"
                        style={{ paddingTop: '2px' }}
                    >
                        <EditorMenuBar
                            file={file}
                            updateEditorSyntax={this.handleChangeSyntax}
                            initialSyntax={this.state.syntax}
                            handleSave={this.handleSave}
                            handleSaveAs={this.handleSaveAs}
                        />
                        <OrionEditor
                            content={content}
                            syntax={this.state.syntax}
                            passContentToParent={this.getContent}
                            languageFilesHost={location.host}
                            fullscreen={!!location}
                            editorTopOffset={56}
                        />
                    </CardContent>
                </Card>
                {this.renderDialog()}
            </div>
        );
    }
}

Editor.propTypes = {
    content: PropTypes.string,
    checksum: PropTypes.string,
    file: PropTypes.string,
    dispatch: PropTypes.func,
    location: PropTypes.shape({
        query: PropTypes.shape({
            file: PropTypes.string,
        }),
    }),
};

function mapStateToProps(state) {
    const editorRoot = state.get('editor');
    return {
        content: editorRoot.get('content'),
        checksum: editorRoot.get('checksum'),
        file: editorRoot.get('file'),
    };
}

const ConnectedEditor = connect(mapStateToProps)(Editor);
export default ConnectedEditor;
