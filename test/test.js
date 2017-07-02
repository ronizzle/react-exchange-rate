var assert = require('assert')
var helpers = require('../helpers')


describe('selected-pagination', function () {
    it('Format lines loaded from the file turned array. ' +
        'We will use dummy data for the array for now', function () {

        let arr1 = ['Line 01 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 02 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 03 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 04 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 05 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 06 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 07 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 08 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 09 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 10 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 11 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 12 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 13 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 14 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 15 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 16 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 17 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 18 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 19 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 20 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 21 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 22 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 23 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 24 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 25 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 26 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 27 - FriJun 23 11:23:44 2017 [5048][1][FATAL]'
        ]
        let obj1 = [
            {
                number: 21,
                text: 'Line 21 - FriJun 23 11:23:44 2017 [5048][1][FATAL]'
            },
            {
                number: 22,
                text: 'Line 22 - FriJun 23 11:23:44 2017 [5048][1][FATAL]'
            },
            {
                number: 23,
                text: 'Line 23 - FriJun 23 11:23:44 2017 [5048][1][FATAL]'
            },
            {
                number: 24,
                text: 'Line 24 - FriJun 23 11:23:44 2017 [5048][1][FATAL]'
            },
            {
                number: 25,
                text: 'Line 25 - FriJun 23 11:23:44 2017 [5048][1][FATAL]'
            },
            {
                number: 26,
                text: 'Line 26 - FriJun 23 11:23:44 2017 [5048][1][FATAL]'
            },
            {
                number: 27,
                text: 'Line 27 - FriJun 23 11:23:44 2017 [5048][1][FATAL]'
            }]
        let limit = 10
        let offset1 = 21
        assert.deepEqual(helpers.formatData(arr1, limit, offset1).lines, obj1)

    });
});

describe('last-page-offset', function () {
    it('Getting the last page offset', function () {
        let arr1 = ['Line 01 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 02 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 03 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 04 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 05 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 06 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 07 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 08 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 09 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 10 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 11 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 12 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 13 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 14 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 15 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 16 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 17 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 18 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 19 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 20 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 21 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 22 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 23 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 24 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 25 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 26 - FriJun 23 11:23:44 2017 [5048][1][FATAL]',
            'Line 27 - FriJun 23 11:23:44 2017 [5048][1][FATAL]'
        ]
        let limit = 10
        let offset1 = 21
        assert.equal(helpers.formatData(arr1, limit, offset1).lastPageOffset, 21)

    });
});