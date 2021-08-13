import React, { Component } from 'react'
import {Table, Image, InputGroup, Button, FormControl, Card, ListGroupItem, ListGroup, Row, Col } from 'react-bootstrap'
import { ContactsContext } from '../UX/Context/ContactsContext'

export default class Teams extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            filterContacts: [],
        }
    }
    static contextType = ContactsContext;

    inputHandler(evt){
        const userInput = evt.target.value;
        this.setState ({
            input: userInput
        })
        // console.log(this.state.input)
    }

    componentDidUpdate(prevState){
        if (prevState.input !== this.state.input){
            console.log(this.state.input)
        }
    }
    
    render() {  
        const contactsList = this.context.contacts.filter(contact => {
            if(contact.title.includes(this.state.input)) return true
        }).map(contact => {
            return (
                <tr key={contact.id} className='p-0'>
                    <td className='p-1'><Image fluid roundedCircle src={contact.cover} width={40} height={40} className=''/>{contact.title}</td>
                    <td className='p-1'>{contact.type}</td>
                    <td className='p-1'>{contact.language}</td>
                    </tr>
            )
        })

            const pinnedList = this.context.contacts.filter(contact => {
                if(contact.title.includes(this.state.input)) return true
            }).map(contact => {
                    return (
                        <Card className='mr-4' style={{ width: '18rem', height:'7rem', marginBottom:'1rem', margin: '4px'}}>
                        <Card.Body className='pt-0'>
                            <Row className='d-flex align-items-center'>
                                <Col className='col-9 '>
                            <Card.Title>{contact.title}</Card.Title>
                            <Card.Subtitle className="text-muted">{contact.type}</Card.Subtitle>
                                </Col>
                                <Col>
                                <Image fluid roundedCircle src={contact.cover} width={40} height={40} className=''/>
                                </Col>
                            </Row>
                            <ListGroup className="list-group-flush" >
                            <ListGroupItem></ListGroupItem>
                            <ListGroupItem className='d-flex justify-content-around'>
                            <Card.Link as='div' href="#" className='mr-5'>{contact.year}</Card.Link>|
                            <Card.Link as='div' href="#" className=''>{contact.language}</Card.Link>
                            </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                        </Card>
                )}
            ) 

        return (
            <div>
                <Row className= 'mb-0'>
                 <InputGroup className="mb-1 mt-2">
                    <Button variant="outline-secondary" id="button-addon1" >
                    •
                    </Button>
                    <FormControl
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    onChange={this.inputHandler.bind(this)}
                    />
                </InputGroup>
                </Row>

                    <h6 className='m-0 font-size-10px'>PINNED CONTACTS</h6>
                <Row className='d-flex justify-content-around'>
            {pinnedList}
                </Row >

                <Row className="d-flex">
                <h6 className='m-0 font-weight-normal'>ALL CONTACTS</h6>
                <Table hover >
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactsList}
                    </tbody>
                    
                    </Table>
                </Row>
            </div>
        )
    }
}
