const Records = ({persons, onClick}) => {
    return (
      <div>
        <h2>Numbers</h2>
        {persons.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
            <button  onClick={() => onClick(person.id, person.name)}>delete</button>
          </div>
        ))}
      </div>
    )
  };

  export default Records