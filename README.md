# Practicing TDD with React

## Contents

1. Testing pyramid
2. Introduction to TDD
3. Environment setup
4. Usecase requirements
5. Tests 
<br>#1: Rendering without crashing
<br>#2: 


## 1. Testing pyramid

This is also refered to as the test automation pyramid. It illustrates the type of tests that should be included in an automated suite:
- Unit tests
<br>These test are at the bottom of the pyramid and they are many of them. These test each componenet in isolation to validate it behaves as expected. It is alsoimportant to test a number of scenarios like happy path, error path, exception path, ...etc. A best practise to write robust unit tests is to do them using TDD.
- Integration tests
<br>They test how code interacts with external componenets (other code). It tests that the code communicates effectively with external dependencies and sends/receives right information.
- End-to-End (E2E) tests 
<br>These test the application is working as expected from start to end. They cater for the end-user prespective. They run a variety of user scenarios. Usually they are the logest to run and fragile.

Reference: [Testing Pyramid : How to jumpstart Test Automation](https://www.browserstack.com/guide/testing-pyramid-for-test-automation)
## 2. Introduction to TDD

The three practicies of TDD:

### a. The 3 laws of TDD:

   - You must write a failing test before you write any production code
   - You must not write more of a test than is sufficinet to fail, or fail to compile
   - You must not write more production code than is sufficient to make the current failing test pass

### b. The RED -> GREEN -> REFACTOR cycle

   - RED: write failing test
   - GREEN: write enough code to let the test pass
   - REFACTOR: how can i improve the code?

### ZOMBIE
   - Zero paramaters passed or returned
   - One paramater passed or returned
   - Many paramaters passed or returned
   - Bounderies and Behaviour
   - Interfaces definition
   - Exceptions handling

## 3. Environemtn setup

This uses a react app buuld ussing
```npx create-react-app tdd-tutorial-react```
After the setup is finished. Run the app
```run start```
Then run the tests
```run test```
It will show there one test and it is passing
Install Enzyme library
```npm i -D enzyme```

## 4. Usecase requirements

1. List of names on a page
2. click button take you to a pge to edit a name from the list

## 5. Tests
### #1: Rendering without crashing
    First:
  - In App.js file remove everything between the div elements and you end up with
```
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
    
    </div>
  );
}

export default App;
``` 
Also in App.test.js remove the test so you end up with
```
import { render, screen } from '@testing-library/react';
import App from './App';
```

Now write our test suite
```
describe('App', () => {
  it('', () => {

  })
})
```
This is doing nothing at the moment so it appears as a passing test

Now need an object to ispect in our test, appWrapper
```
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('', () => {
    const appWrapper = shallow(<App />);
  })
})
```
the test is falling => RED

We need to configure the adapter that Jest will use, so I need to import enzyme adater
```
npm i -D enzyme-adapter-react-16
```
Then configure the adapter in file setupTest.js
```
import '@testing-library/jest-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter()})
```
the test is passing => GREEN

Refactor by add description to it('', )
```
it('renders without crashing', () => {
    const appWrapper = shallow(<App />);
  })
```

### #2: render a person list
We need a componenet to hold the person list
```
 it('', () => {
    const appWrapper = shallow(<App />);
    const personList = appWrapper.find(PersonList);
  })
  ```
  The test fails because there is no componeent PersonList. So we need to create one
  ```
  export default () => {};
  ```
  Test still fails, because it looking for PersonList in App and it is not there.
  So we need to declare it
  ```
import React from 'react';
import PersonList from './component/PersonList'

function App() {
  return (
    <div className="App">
      <PersonList />
    </div>
  );
}

export default App;
```
so when we look for the PersonList component it finds it
```
it('', () => {
    const appWrapper = shallow(<App />);
    const personList = appWrapper.find(PersonList);
})
  ```
Test passes. But we are not finished
<br>Now we need to do the assertion.
<br>We need to assert the personList found has element
```
it('', () => {
    const appWrapper = shallow(<App />);
    const personList = appWrapper.find(PersonList);
    expect(personList).toHaveLength(1);
})
```
Test passes.
<br> Refactor by providing description for the test 
```
it('render person list', () => {
    const appWrapper = shallow(<App />);
    const personList = appWrapper.find(PersonList);
    expect(personList).toHaveLength(1);
})
```

### #3: Person list has a state
We want to assert that people list has a state
```
 it('', () => {
    const appWrapper = shallow(<App />);
    const appState = appWrapper.state();
  })
```
It fails complaining state() can only b called on class componenets
```
 ShallowWrapper::state() can only be called on class components

      16 |   it('', () => {
      17 |     const appWrapper = shallow(<App />);
    > 18 |     const appState = appWrapper.state();
         |                                 ^
      19 |   })
      20 | })
      21 |
```
Currently App() is defined as a function
```
import React from 'react';
import PersonList from './component/PersonList'

function App() {
  return (
    <div className="App">
      <PersonList />
    </div>
  );
}

export default App;
```
We need to change that to class. So let go to App componenet and fix that
```
import React, { Component } from "react";
import PersonList from "./component/PersonList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PersonList />
      </div>
    );
  }
}

export default App;
```
Test passes

Now let us write the assertion. We expect state to be not Null
```
expect(appState).not.toBeNull();
```
But it fails. The is because we did not declare state in App comopnenet. So let us fix that
```
class App extends Component {
  state = {}
  render() {
    return (
      <div className="App">
        <PersonList />
      </div>
    );
  }
}
```
Test passes

Refactor by adding test description
```
it('has state', () => {
    const appWrapper = shallow(<App />);
    const appState = appWrapper.state();
    expect(appState).not.toBeNull();
  })
```

### #4: Peoeple property defined for Person list state
Person list will have a list of people. But we need to have a people property first
```
it('', () => {
    const appWrapper = shallow(<App />);
    const appState = appWrapper.state();
    expect(appState.people).toBeDefined();
})
```
Test fails, so let us fix that.
All we need to do is add people property to state.
```
state = {people: []}
```
Test now passes.

Refactor, replace repetitive appWrapper with beforeAll()
```
let appWrapper;

beforeAll(() => {
  appWrapper = shallow(<App />);
})
```
This makes test #1 redundant so delete it.

### #5: passes people property of state to personList as prop
Now we need to check the people property is being passed into PeopleList
```
  it('', () => {
    const personList = appWrapper.find(PersonList);
    expect(personList.props().people).toEqual(appWrapper.state().people);
  })
```
Test fails because we did not pass it
```
 FAIL  src/App.test.js
  App
    ✓ render person list (7 ms)
    ✓ has state
    ✓ has a people proprty on state
    ✕  (6 ms)

  ● App › 

    expect(received).toEqual(expected) // deep equality

    Expected: []
    Received: undefined

      28 |   it('', () => {
      29 |     const personList = appWrapper.find(PersonList);
    > 30 |     expect(personList.props().people).toEqual(appWrapper.state().people);
         |                                       ^
      31 |   })
      32 | })
      33 |
```

```
class App extends Component {
  state = {people: []}
  render() {
    return (
      <div className="App">
        <PersonList />
      </div>
    );
  }
}
```
So let us fix that
```
class App extends Component {
  state = {people: []}
  render() {
    return (
      <div className="App">
        <PersonList  people={this.state.people}/>
      </div>
    );
  }
}
```
Test passes
```
 PASS  src/App.test.js
  App
    ✓ render person list (9 ms)
    ✓ has state (1 ms)
    ✓ has a people proprty on state (1 ms)
    ✓ passes people property of state to personList as prop (4 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.577 s, estimated 1 s
```

### #6: PersonList renders
we want to make sure the PersonList component renders ok.
So we create a test file for the PersonList component with the render test.
We check for ul tag
```
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
```
Test fails because we do not have a ul tag in PersonList componnent, yet. So let us have one
```
import React from "react";

export default () => <ul></ul>;
```
Now test passes.
### #7: PersonList renders no li elements when no people exist (ZOMBIE with zero items)
Now looking at ZOMBIE scenario we want to test when PersonList has Zero items
```
    it('', () => {
        expect(personListItems).toHaveLength(0);
    })
```
Test fails, so need to decalre personListItems.
We need to have an emplty people list passed to personList, and then inspect it
```
    it('renders no li elements when no people exist', () => {
        const people = [];
        personListWrapper = shallow(<PersonList people={people}/>);
        const personListItems = personListWrapper.find('li');
        expect(personListItems).toHaveLength(0);
    })
```
Test passes

### #8: PersonList renders 1 li element when no people list has 1 element (ZOMBIE with 1 item)
Now looking at ZOMBIE scenario we want to test when PersonList has 1 items
```
    it('', () => {
        expect(personListItems).toHaveLength(1);
    })
```
Test fails, so need to decalre personListItems.
We need to have a people list passed to personList with 1 item, and then inspect it
```
    it('renders no li elements when no people exist', () => {
        const people = [{firstName: 'Alan', lastName: 'Turing'}];
        personListWrapper = shallow(<PersonList people={people}/>);
        const personListItems = personListWrapper.find('li');
        expect(personListItems).toHaveLength(1);
    })
```
Test fails because PersonList component still returns single ui element. So let us fix that
```
import React from "react";

export default () => <ul><li></li></ul>;
```
This test passes but breaks the previous test
```
FAIL  src/component/PersonList.test.js
  ● PersonList › renders no li elements when no people exist

    expect(received).toHaveLength(expected)

    Expected length: 0
    Received length: 1
    Received object: {}

      17 |         personListWrapper = shallow(<PersonList people={people}/>);
      18 |         const personListItems = personListWrapper.find('li');
    > 19 |         expect(personListItems).toHaveLength(0);
         |                                 ^
      20 |     })
      21 |
      22 |     it('renders 1 li element when one person exist', () => {
```
Now the previous test gets an element backinstead of zero.
So we need to check the people prop passed to PersonList that it exists and of length 1 to pass the 1 li element test
```
export default (props) => {
  if (props.people && props.people.length == 1)
    return (
      <ul>
        <li></li>
      </ul>
    );
  return <ul></ul>;
};
```
Test passes

We can refactor PersonList component
```
export default (props) =>
    <ul>
        {
            props.people && props.people.length == 1 ? <li></li>: undefined
        }
    </ul>
```
Test passes