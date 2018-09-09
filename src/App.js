import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Leo', age: 29 },
      { id: 2, name: 'Danay', age: 32 },
      { id: 3, name: 'Buddy', age: 7 }
    ],
    showPersons: false,
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { id: 1, name: newName, age: 30 },
        { id: 2, name: 'Santos', age: 30 }]
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons })
  }

  deletePersonHandler = (personIndex) => {
    //copy array, don't modify the original (bad practice). 
    // Always update state in an immutable fashion!
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  render() {

    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          })}
        </div>
      );
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if ( this.state.persons.length <= 2 ) {
      assignedClasses.push( classes.red )
    } 
    if ( this.state.persons.length <= 1 ) {
      assignedClasses.push( classes.bold )
    } 

    return (
      <div className={classes.App}>
        <h1>react app</h1>
        <p className={assignedClasses.join( ' ' )}>testing testing 123...</p>
        <button
          className={btnClass}
          onClick={() => this.togglePersonHandler("Leon")}>Switch Name</button>
        {persons}
      </div >
    );
  }
}

export default App;
