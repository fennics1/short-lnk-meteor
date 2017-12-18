import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';

import '../imports/api/users';
import '../imports/api/links';
import {Links} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id:_id });

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });


  // WebApp.connectHandlers.use((req, res, next) => {
  //   console.log('This is from my custom middleware');
  //   console.log(req.url, req.method, req.headers, req.query);
  //   set HTTP status code
  //   res.statusCode = 404;
  //   //set HTTP headers
  //   res.setHeader('my-custom-header', 'yoyoyo');
  //   //set HTTP body
  //   res.write('<h1>This is middleware at work!</h1>')
  //   //End HTTP request
  //   res.end();
  //
  //   next();
  // });
  // const employeeSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min:1,
  //     max:100
  //   },
  //   hourlywage: {
  //     type: Number,
  //     min: 0
  //   },
  //   email: {
  //     type: String,
  //     min:1,
  //     max:100,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.Email
  //   }
  // });
  // employeeSchema.validate({
  //   name: 'Wall',
  //   hourlywage: 28,
  //   email: 'fenn@gmail.com'
  // });
});
