import React, { useContext, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom'
import './Overlay.css'
import { Col, Row} from 'react-bootstrap'
import { ContactsContext } from './Context/ContactsContext'

export const Overlay = (props) => {
    let history = useHistory();
    const contactsContext = useContext(ContactsContext);
    var tempContacts = []
    var tempOriginals = []
    
    useEffect(() => {
        const res = fetch('http://localhost:3000/initialState')
        .then(res => {
            return res.json();
        }).then(data =>{

            for (const original in data.originals){
                tempOriginals.push(data.originals[original])
            }
            console.log(tempOriginals)
            contactsContext.fetchingOriginals(tempOriginals)
            
            for (const contact in data.contacts){
                tempContacts.push(data.contacts[contact])
            }
            contactsContext.fetchingContacts(tempContacts)
        })
    },[])

    return (    
        <>
        <Container fluid className='vh-100 d-flex flex-column'>
            <Row className='h-100'>
                <Col id=''className='p-0 bg-dark' sm={true}>
                    <Nav variant='pills' defaultActiveKey="/teams" className="flex-column bg-dark"
                    onSelect={(selectedKey) => {
                        history.push(selectedKey);
                        }}>
                    <Nav.Link active={true} eventKey="/h" className='text-light'><h4>WORKFLOW</h4></Nav.Link>
                    <Nav.Link eventKey="/dashboard" className='text-light'>Dashboard</Nav.Link>
                    <Nav.Link eventKey="/teams"  className='text-light'>Teams</Nav.Link>
                    <Nav.Link eventKey="/projects" className='text-light'>Projects</Nav.Link>
                    <Nav.Link eventKey="/calendars"className='text-light'>Calendars</Nav.Link>
                    <Nav.Link eventKey="/documents"className='text-light'>Documents</Nav.Link>
                    <Nav.Link eventKey="reports" className='text-light'>Reports</Nav.Link>
                    </Nav>
                </Col>
                <Col className='col-10'>
                    {props.children}
                </Col>
            </Row>
                    </Container>
       </>
    );
}
