import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'
import Success from './components/Success'

const DisplayName = ({name, number, deletePerson}) => {
  return (
    <div>
      {name} {number}
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Filter = (props) => {
  return (
    <form>
    search: <input
    value={props.nameFilter}
    onChange={props.handleNameFilter}        />

  </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        name: <input
          value={props.newName}
          onChange={props.handleNameChange}        />
        <div>
        number: <input 
          value={props.newNumber}
          onChange={props.handleNumberChange}  />
        <button type="submit">add</button>
        </div>
      </form> 
  )
}

const Persons = ({persons, deletePerson}) => {
  return (
    <div>
    {persons.map(person => 
      <DisplayName key = {person.name} name = {person.name} number = {person.number} deletePerson={() => deletePerson(person)}/>
    )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const deletePerson = (person) => {  
  if (window.confirm(`Do you want to delete ${person.name} from the phonebook?`))
    personService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== person.id))
        setSuccessMessage(          
          `'${person.name}' has been deleted`        
          )        
          setTimeout(() => {          
            setSuccessMessage(null)        
          }, 5000)    
      })
  }

  useEffect(() => {
    personService      
      .getAll()      
      .then(response => {        
        setPersons(response.data)      
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person=>person.name)
    const personObject = {
      name: newName,
      number: newNumber
    }


    if (names.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNewName('')     
            setNewNumber('')
            setSuccessMessage(          
              `'${newName}' information has been changed`        
              )        
              setTimeout(() => {          
                setSuccessMessage(null)        
              }, 5000)
          })
          .catch(error => {
            setErrorMessage(          
              `'Information of${person.name}' has already been removed from server`        
              )        
              setTimeout(() => {          
                setErrorMessage(null)        
              }, 5000)   
              setPersons(persons.filter(n => n.id !== person.id))     
          })
        }
    }
          
    else {
      personService      
        .create(personObject)      
        .then(response => {        
          setPersons(persons.concat(response.data)) 
          setNewName('')     
          setNewNumber('') 
          setSuccessMessage(          
            `'${newName}' has been added`        
            )        
            setTimeout(() => {          
              setSuccessMessage(null)        
            }, 5000)
        })
        
    }
  }

  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {    
    console.log(event.target.value)    
    setNewNumber(event.target.value)  
  }

  const handleNameFilter = (event) => {    
    console.log(event.target.value)    
    setNameFilter(event.target.value)  
  }

  const personsFilter = persons.filter(person => person.name.includes(nameFilter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Success message={successMessage} />
      <Notification message={errorMessage} />
      <Filter nameFilter={nameFilter} handleNameFilter={handleNameFilter}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={personsFilter} deletePerson ={deletePerson}/>
    </div>
  )

}

export default App