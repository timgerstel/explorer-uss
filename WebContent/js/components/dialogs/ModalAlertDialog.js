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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';

export default class ModalAlertDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { actions, dialogContent } = this.props;

        const modalActions = [];
        actions.forEach(action => {
            modalActions.push(<Button
                label={action.label}
                onClick={() => { action.onClick(); }}
            />);
        });

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogContent>
                        {dialogContent}
                    </DialogContent>
                    <DialogActions >
                        {modalActions}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ModalAlertDialog.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    })).isRequired,
    dialogContent: PropTypes.element.isRequired,
};
