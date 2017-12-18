import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFoundsfc from '../ui/NotFound';
import LogIn from '../ui/LogIn';

window.browserHistory = browserHistory;

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/link'];
const onEnterPublicPage = ()=>{
  if (Meteor.userId()) {
    browserHistory.replace('/link');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};
export const onAuthChange= (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/link');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={LogIn} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/link" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFoundsfc}/>
  </Router>
);
