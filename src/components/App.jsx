import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, ContcTitle, Section } from './Phonebook.styled';
import { ContactForm } from './contactForm/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';

const LS_KEY = 'contacts';
export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const noSetLocalStorage = useRef(true);

  useEffect(() => {
    const savesContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (savesContacts !== null) {
      setContacts(savesContacts);
    }
  }, []);

  useEffect(() => {
    if (noSetLocalStorage.current) {
      noSetLocalStorage.current = false;
      return;
    }
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    console.log(localStorage.getItem(LS_KEY));
  }, [contacts]);

  const handleSubmit = (values, { resetForm }) => {
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase().trim() === values.name.toLowerCase().trim()
      )
    ) {
      alert(`${values.name} is already in contacts`);
      return;
    }
    const newContact = {
      id: nanoid(5),
      name: values.name,
      number: values.number,
    };
    setContacts(state => [...state, newContact]);
    resetForm();
  };

  const onChangeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const findContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
    );
  };

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const results = findContact();
  return (
    <Container>
      <Section>
        <Title>Phonebook</Title>
        <ContactForm onHandleSubmit={handleSubmit} />
        <ContcTitle>Contacts</ContcTitle>
        <Filter filter={filter} onChangeFilter={onChangeFilter} />
        <ContactList
          contacts={results}
          handleDeleteContact={handleDeleteContact}
        />
      </Section>
    </Container>
  );
}
