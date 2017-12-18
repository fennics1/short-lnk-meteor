import React from 'react';
import Modal from 'react-modal';
import {Meteor} from 'meteor/meteor';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'David here',
      isOpen: false,
      error: ''
    };
  }
  onSubmit(e) {
    // const url= this.refs.url.value.trim();
    // const url = this.state.url;  //this is identical to the one below
    const { url } = this.state;

    e.preventDefault();

    Meteor.call('linksInsert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
    // Links.insert({ url, userId: Meteor.userId() });
    // this.refs.url.value='';
  }
  onChange(e) {
    this.setState({
      url: e.target.value
    });
  }
  handleModalClose() {
    this.setState({isOpen: false, url: '', error: ''})
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }
  render() {
    return (
      <div>
        <button className="button" onClick={()=>this.setState({isOpen: true})}>+ Add Link</button>
        <Modal
         isOpen={this.state.isOpen}
         contentLabel="AddLink"
         onAfterOpen={() => this.refs.url.focus()} //after open, cursor auto on url
         onRequestClose={this.handleModalClose.bind(this)}
         className="boxed-view__box"
         overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Link!!!!</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input
                type="text"
                placeholder="URL"
                ref="url"
                value={this.state.url}
                onChange={this.onChange.bind(this)}/>
              <button className="button">Add Link></button>
              <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
