import React from 'react';
import { shallow } from 'enzyme';
import PersonList from './PersonList';

describe('PersonList', () => {
    let personListWrapper;
    beforeAll(() => {
        personListWrapper = shallow(<PersonList />)
    })
    it('renders a ul element', () => {
        const personListUls = personListWrapper.find('ul');
        expect(personListUls).toHaveLength(1);
    });

    it('renders no li elements when no people exist', () => {
        const people = [];
        personListWrapper = shallow(<PersonList people={people}/>);
        const personListItems = personListWrapper.find('li');
        expect(personListItems).toHaveLength(0);
    })

    it('renders 1 li element when one person exist', () => {
        const people = [{firstName: 'Alan', lastName: 'Turing'}];
        personListWrapper = shallow(<PersonList people={people}/>);
        const personListItems = personListWrapper.find('li');
        expect(personListItems).toHaveLength(1);
    })
})