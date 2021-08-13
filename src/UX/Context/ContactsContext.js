import React, { useState, useReducer } from 'react'

export const ContactsContext = React.createContext({
    contacts: [],
    pinned: [],
    fetchingContacts: () => {},
    fetchingOriginals: () => {}
});

const defaultState = {
    contacts: [],
    pinned: []
}

const contactsReducer = (state, action) => {
    if (action.type === 'FETCH'){
        return {
            contacts: action.payload,
            pinned: state.pinned
        }
    }
    if (action.type === 'FETCHORI'){
        return {
            contacts: state.contacts,
            pinned: action.payload
        }
    }

    return {
        contacts: [],
        pinned: []
    }
}

const ContactsProvider = (props) => {
    const [state, dispatchContacts] = useReducer(contactsReducer, defaultState)

    const fetchingHandler = (contacts) => {
        dispatchContacts({type: 'FETCH', payload: contacts})
        // console.log(state.contacts)
    }
    const fetchingOriginsHandler = (originals) => {
        dispatchContacts({type: 'FETCHORI', payload: originals})
        // console.log(state.contacts)
    }

    const ctxProvided = {
        contacts: state.contacts,
        pinned: state.pinned,
        fetchingContacts: fetchingHandler, 
        fetchingOriginals: fetchingOriginsHandler 
    }

    return (
        <ContactsContext.Provider value={ctxProvided}>
            {props.children}
        </ContactsContext.Provider>
    )
}

export default ContactsProvider;