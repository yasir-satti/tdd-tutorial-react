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


