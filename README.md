# Practicing TDD with React

## Contents

1. Introduction to TDD
2. First test

## 1. Introduction to TDD

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

## 2. Environemtn setup

This uses a react app buuld ussing
```npx create-react-app tdd-tutorial-react```
After the setup is finished. Run the app
```run start```
Then run the tests
```run test```
It will show there one test and it is passing
Install Enzyme library
```npm i -D enzyme```

## 3. Write the first TDD test
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

