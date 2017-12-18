import {Meteor} from 'meteor/meteor';
import ReactDom from 'react-dom';
import {Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';

import {routes, onAuthChange } from  '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
  console.log('isAuthenticated', isAuthenticated);
});

Meteor.startup(() =>{
  Session.set('showVisible', true);
  ReactDom.render(routes, document.getElementById('app'));
});
