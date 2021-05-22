import React from 'react';

export const Persons = ({ persons, handleDelete }) => {
    return persons.map((person, i) => (
        <div style={{ marginBottom: '10px' }} key={person.id}>
            {person.name} {person.number}
            <button
                style={{
                    marginLeft: '10px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '5px',
                }}
                onClick={() => {
                    handleDelete(person.id, person.name);
                }}
            >
                delete
            </button>
        </div>
    ));
};
