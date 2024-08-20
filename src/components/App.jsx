import { useState, useEffect } from "react";
import SearchBox from "./SearchBox/SearchBox";
import initialContacts from "../data/initialContacts.json";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import css from "./App.module.css";

function App() {
  const [contacts, setContacts] = useState(() => {
    const saveContacts = localStorage.getItem("contacts");
    return saveContacts ? JSON.parse(saveContacts) : initialContacts;
  });
  const [filter, setFilter] = useState("");

  const addContact = (newContact) => {
    console.log(newContact);
    setContacts((prevContacts) => {
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  console.log(contacts);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}

export default App;
