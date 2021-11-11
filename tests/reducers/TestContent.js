/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

// import expect from 'expect';

// describe('Reducer: content', () => {
//     it('Should return the initial state', () => {
//         expect(content(undefined, {})).toEqual(contentResources.baseContent);
//     });

//     it('Should handle REQUEST_CONTENT', () => {
//         const action = { type: contentActions.REQUEST_CONTENT };
//         expect(content(contentResources.baseContent, action)).toEqual(contentResources.requestedContent);
//     });

//     it('Should handle RECEIVE_CONTENT', () => {
//         const action = {
//             type: contentActions.RECEIVE_CONTENT,
//             sourceId: 'jobs/JCAIN/ids/TSU05471/files/101',
//             label: 'SYSOUT',
//             isFetching: false,
//             content: 'test',
//         };
//         expect(content(contentResources.baseContent, action)).toEqual(contentResources.receivedContent);
//     });

//     it('Should handle REQUEST_DS_CONTENT', () => {
//         const action = { type: contentActions.REQUEST_DS_CONTENT };
//         expect(content(contentResources.baseContent, action)).toEqual(contentResources.requestedContent);
//     });

//     it('Should handle RECEIVE_DS_CONTENT', () => {
//         const action = {
//             type: contentActions.RECEIVE_DS_CONTENT,
//             DSName: 'ATLAS.TEST.JCL',
//             DSMember: 'ATLJ0001',
//             content: 'test',
//             cheskcum: '123456789',
//         };
//         expect(content(contentResources.baseContent, action)).toEqual(contentResources.receivedDSContent);
//     });

//     it('Should handle REQUEST_USS_CONTENT', () => {
//         const action = { type: contentActions.REQUEST_USS_CONTENT };
//         expect(content(contentResources.baseContent, action)).toEqual(contentResources.requestedContent);
//     });

//     it('Should handle RECEIVE_USS_CONTENT', () => {
//         const action = {
//             type: contentActions.RECEIVE_USS_CONTENT,
//             path: '/u/jcain/test.txt',
//             content: 'testWorld',
//         };
//         expect(content(contentResources.baseContent, action)).toEqual(contentResources.receivedUSSContent);
//     });

//     it('Should handle INVALIDATE_CONTENT with baseContent', () => {
//         const action = { type: contentActions.INVALIDATE_CONTENT };
//         expect(content(contentResources.baseContent, action)).toEqual(contentResources.invalidatedContent);
//     });

//     it('Should handle INVALIDATE_CONTENT with ReceivedContent', () => {
//         const action = { type: contentActions.INVALIDATE_CONTENT };
//         expect(content(contentResources.receivedContent, action)).toEqual(contentResources.invalidatedContent);
//     });

//     it('Should handle TOGGLE_CONTENT_VIEWER toggle to true', () => {
//         const action = { type: contentActions.TOGGLE_CONTENT_VIEWER, expandedUpdate: true };
//         expect(content(contentResources.baseContent, action)).toEqual(contentResources.toggledContent);
//     });

//     it('Should handle TOGGLE_CONTENT_VIEWER toggle to false', () => {
//         const action = { type: contentActions.TOGGLE_CONTENT_VIEWER, expandedUpdate: false };
//         expect(content(contentResources.toggledContent, action)).toEqual(contentResources.baseContent);
//     });
// });
