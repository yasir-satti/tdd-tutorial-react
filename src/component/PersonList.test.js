import React from 'react';
import { shallow } from 'enzyme';
import PersonList from './PersonList';

describe('PersonList', () => {
    let personListWrapper;
    beforeAll(() => {
        personListWrapper = shallow(<PersonList />)
    })
    it('', () => {
        const personListUls = personListWrapper.find('ul');
        expect(personListUls).toHaveLength(1);
    });
})