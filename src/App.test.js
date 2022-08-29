import { shallow } from 'enzyme';
import App from './App';
import PersonList from './component/PersonList';

describe('App', () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<App />);
  })

  it('render person list', () => {
    const appWrapper = shallow(<App />);
    const personList = appWrapper.find(PersonList);
    expect(personList).toHaveLength(1);
  })
})
