import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export const contactsSlice = createSlice({
  name: 'items',
  initialState: {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  },
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter: (state, action) => action.payload,
  },
});

export const { changeFilter } = filterSlice.actions;

//Selectors
const getContacts = state => state.items.contacts;
const getFilterValue = state => state.filter;

//Hooks
export const useContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);
  const addNewContact = newContact => dispatch(addContact(newContact));
  const filterContacts = value => dispatch(changeFilter(value));
  const deleteContactById = id => dispatch(deleteContact(id));

  return {
    contacts,
    filter,
    addNewContact,
    filterContacts,
    deleteContact: deleteContactById,
  };
};
