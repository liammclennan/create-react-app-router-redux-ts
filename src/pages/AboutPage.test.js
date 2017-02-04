import React from 'react';
import ReactDOM from 'react-dom';
import aboutPage from './AboutPage';

it('can mock http', () => {
  const div = document.createElement('div');
  const dummyData = {a:1};
  const About = aboutPage.pageFactory({
    dispatch: function (action) {
      expect(action.type).toBe('STUFF_FROM_WORLD_BANK');
      expect(action.data).toBe(dummyData);
    },
    getState: function() {
      return {about:{data: {}}};
    }
  },{
    onLoad: function () {
      return Promise.resolve(dummyData);
    }
  })
  ReactDOM.render(<About/>, div);
});