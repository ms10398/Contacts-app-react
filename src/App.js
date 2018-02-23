import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContacts'

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({contacts})
    })
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))

    ContactsAPI.remove(contact)

    // setState second method
    // this.setState({ Object with the state })

  }

  render() {
    return (<div>
      <Route exact path="/" render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
      )}/>
      <Route path="/create" component={CreateContact}/>
    </div>
    )
  }
}

export default App;
