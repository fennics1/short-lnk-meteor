import React from 'react';
import FlipMove from 'react-flip-move';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    console.log('componentDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub');
      const urls = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({links: urls});
      console.log('all links here', urls);
    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount LinksList byebye');
    this.linksTracker.stop();
  }
  renderLinKsListItems() {
    if(this.state.links.length===0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links Found</p>
        </div>
      );
    } else {
      return this.state.links.map((link) => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
        //return <p key={link._id}>{link.url}-{shortUrl}</p>
      });
    }
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinKsListItems()}
        </FlipMove>
      </div>
    );
  }
};
