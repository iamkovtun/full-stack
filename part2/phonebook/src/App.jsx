import React, { useEffect, useState } from "react";
import AddForm from "./AddForm";
import Filter from "./Filter";
import Records from "./Records";
import recordServices from "./services/records/";
import MyNotification from "./MyNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({});

  useEffect(() => {
    recordServices.getAll().then(initialRecords => {
      setPersons(initialRecords);
    });
  }, []);

  const handleChangeName = (event) => setNewName(event.target.value);
  const handleChangePhone = (event) => setNewPhone(event.target.value);
  const handleChangeFilter = (event) => setFilter(event.target.value);

  const showNotification = (message, color) => {
    setNotification({ message, color });
    setTimeout(() => {
      setNotification({ message: null, color: null });
    }, 5000);
  };

  const handleSubmitPersons = (event) => {
    event.preventDefault();
    const duplicate = persons.find((person) => person.name === newName);
    if (duplicate) {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to update the number?`)) {
        const recordObject = { name: newName, number: newPhone };
        recordServices.update(duplicate.id, recordObject)
          .then((updatedRecord) => {
            setPersons(persons.map((person) => (person.id !== duplicate.id ? person : updatedRecord)));
            setNewName('');
            setNewPhone('');
            showNotification(`Updated ${newName}'s number`, 'green');
          })
          .catch((error) => {
            console.error('Update failed:', error);
            showNotification(error.response?.data?.error || 'Failed to update the record', 'red');
          });
      }
      return;
    }

    const recordObject = { name: newName, number: newPhone };
    recordServices.create(recordObject)
      .then((createdRecord) => {
        setPersons([...persons, createdRecord]);
        setNewName('');
        setNewPhone('');
        showNotification(`Added ${newName}`, 'green');
      })
      .catch((error) => {
        console.error('Creation failed:', error);
        showNotification(error.response?.data?.error || 'Failed to add the record', 'red');
      });
  };

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      recordServices.deleteById(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification(`Deleted ${name}`, 'green');
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          showNotification(`Error deleting ${name}. The person may have already been removed.`, 'red');
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>PhoneBook</h1>
      <MyNotification message={notification.message} color={notification.color} />
      <Filter value={filter} onChange={handleChangeFilter} />
      <AddForm
        name={newName}
        number={newPhone}
        onNameChange={handleChangeName}
        onPhoneChange={handleChangePhone}
        onSubmit={handleSubmitPersons}
      />
      <Records persons={filteredPersons} onClick={handleDeletePerson} />
    </div>
  );
};

export default App;