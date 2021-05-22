import React, { useEffect, useState } from 'react';

import personServices from './services/persons';

import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import { Notification } from './components/Notification';

const App = () => {
    const [persons, setPersons] = useState([]);

    const [filterPersons, setFilterPersons] = useState([{}]);

    const [search, setSearch] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        message: null,
        type: null,
    });

    useEffect(() => {
        console.log('effect');

        personServices.getAll().then((data) => {
            setPersons(data);
        });
    }, []);

    const addPerson = (event) => {
        event.preventDefault();

        const existPerson = persons.find((person) => person.name === newName);
        const newPerson = { name: newName, number: newNumber };
        if (!existPerson) {
            personServices
                .create(newPerson)
                .then((data) => {
                    setPersons([...persons, data]);

                    setErrorMessage({
                        message: `Added ${data.name}`,
                        type: 'success',
                    });
                    setTimeout(() => {
                        setErrorMessage({
                            message: null,
                            type: null,
                        });
                    }, 5000);
                })
                .catch((error) => {
                    setErrorMessage({
                        message: `Error Added User`,
                        type: 'Error',
                    });
                    setTimeout(() => {
                        setErrorMessage({
                            message: null,
                            type: null,
                        });
                    }, 5000);
                });
        } else {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one ? `
                )
            ) {
                personServices
                    .update(existPerson.id, newPerson)
                    .then((data) => {
                        setPersons(
                            persons.map((person) =>
                                person.id !== existPerson.id ? person : data
                            )
                        );

                        setErrorMessage({
                            message: `Updated ${existPerson.name}`,
                            type: 'success',
                        });
                        setTimeout(() => {
                            setErrorMessage({
                                message: null,
                                type: null,
                            });
                        }, 5000);
                    })
                    .catch((error) => {
                        setErrorMessage({
                            message: `Error updated user`,
                            type: 'Error',
                        });
                        setTimeout(() => {
                            setErrorMessage({
                                message: null,
                                type: null,
                            });
                        }, 5000);
                    });
            }
        }

        setNewName('');
        setNewNumber('');
    };

    const searchFilter = (event) => {
        event.preventDefault();

        const newFilter = persons.filter((person) =>
            person.name.toLowerCase().includes(search.toLowerCase())
        );

        setFilterPersons(newFilter);

        setSearch('');
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`You want to remove ${name}`)) {
            personServices
                .deleteOne(id)
                .then((response) => {
                    if (response.statusText === 'OK') {
                        setPersons(
                            persons.filter((person) => person.id !== id)
                        );

                        setErrorMessage({
                            message: `Delete ${name}`,
                            type: 'success',
                        });
                        setTimeout(() => {
                            setErrorMessage({
                                message: null,
                                type: null,
                            });
                        }, 5000);
                    }
                })
                .catch((error) => {
                    setErrorMessage({
                        message: `Error delete user`,
                        type: 'Error',
                    });
                    setTimeout(() => {
                        setErrorMessage({
                            message: null,
                            type: null,
                        });
                    }, 5000);
                });
        }
    };

    return (
        <div>
            <Notification messageinfo={errorMessage} />

            <h2>Phonebook</h2>
            <Filter
                searchFilter={searchFilter}
                handleSearchChange={handleSearchChange}
                search={search}
                filterPersons={filterPersons}
            />
            <h2>Add New</h2>
            <PersonForm
                addPerson={addPerson}
                handleNameChange={handleNameChange}
                newName={newName}
                handleNumberChange={handleNumberChange}
                newNumber={newNumber}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} handleDelete={handleDelete} />
        </div>
    );
};

export default App;
