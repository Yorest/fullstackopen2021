import React from 'react';

export const Filter = ({
    searchFilter,
    handleSearchChange,
    search,
    filterPersons,
}) => {
    return (
        <form onSubmit={searchFilter}>
            <div>
                filter shown with
                <input onChange={handleSearchChange} value={search} />
            </div>
            {filterPersons.map((person, i) => (
                <div style={{ marginBottom: '10px' }} key={person.id*2}>
                    {person.name} {person.number}
                </div>
            ))}
        </form>
    );
};
