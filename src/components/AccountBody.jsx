import React from 'react';
import { Tab, Tabs, Form, Button } from 'react-bootstrap';

const AccountBody = () => {
    return (
        <div id="account-container">
            <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                justify
                data-bs-theme="light"
            >
                <Tab eventKey="profile" title="Paskyra">
                    <div className='tab-container'>
                        <h1>Asmeninė informacija</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label>Vardas *</Form.Label>
                                <Form.Control type="text" placeholder="Įveskite savo vardą" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Pavardė</Form.Label>
                                <Form.Control type="text" placeholder="Įveskite savo pavardę" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Telefono Numeris</Form.Label>
                                <Form.Control type="text" placeholder="Įveskite savo telefono numerį" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>El. Paštas *</Form.Label>
                                <Form.Control type="email" placeholder="Įveskite savo el. paštą" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBirthDate">
                                <Form.Label>Gimimo Data</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formAddress">
                                <Form.Label>Adresas</Form.Label>
                                <Form.Control type="text" placeholder="Įveskite savo adresą" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCity">
                                <Form.Label>Miestas</Form.Label>
                                <Form.Control type="text" placeholder="Įveskite savo miestą" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formZip">
                                <Form.Label>Pašto Kodas</Form.Label>
                                <Form.Control type="text" placeholder="Įveskite savo pašto kodą" />
                            </Form.Group>
                            <div id='submit-btn-form'>
                            <Button variant="primary" type="submit">
                                Išsaugoti
                            </Button>
                            </div>
                        </Form>
                        <hr className='hr-primary' />
                        <h1>Keisti slaptažodį</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formCurrentPassword">
                                <Form.Label>Dabartinis Slaptažodis *</Form.Label>
                                <Form.Control type="password" placeholder="Įveskite dabartinį slaptažodį" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formNewPassword">
                                <Form.Label>Naujas Slaptažodis *</Form.Label>
                                <Form.Control type="password" placeholder="Įveskite naują slaptažodį" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formConfirmPassword">
                                <Form.Label>Patvirtinti Naują Slaptažodį *</Form.Label>
                                <Form.Control type="password" placeholder="Patvirtinkite naują slaptažodį" />
                            </Form.Group>
                            <div id='submit-btn-form'>
                                <Button variant="primary" type="submit">
                                    Keisti Slaptažodį
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Tab>
                <Tab eventKey="orders" title="Užsakymai">
                    <div className='tab-container'>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default AccountBody;
