import React from 'react';
import ReactSlider from 'react-slider';
import '../styles/Slider.css';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; // Importing Modal component
import Button from 'react-bootstrap/Button'; // Importing Button component
import useWindowDimensions from '../hooks/useWindowDimensions'; // Importing the useWindowDimensions hook

const Filter = ({ show, handleCloseFilter }) => {
    const { width } = useWindowDimensions(); // Getting window width using the hook

    return (
        <div id="filters">
            {/* Conditionally render based on window width */}
            {width <= 850 ? (
                // Render modal for width <= 850px
                <Modal show={show} onHide={handleCloseFilter}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Filter content */}
                        <div className='filterCategory'>
                            <h6>Kaina</h6>
                            <ReactSlider
                                className="horizontal-slider"
                                thumbClassName="example-thumb"
                                trackClassName="example-track"
                                defaultValue={[0, 100]}
                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                pearling
                                minDistance={10}
                            />
                            <hr />
                        </div>

                        <div className='filterCategory'>
                            <Form>
                                <Form.Check
                                    type="checkbox"
                                    label="Yra sandelyje"
                                />
                            </Form>
                            <hr />
                        </div>

                          <Accordion defaultActiveKey={['0']} alwaysOpen>
                          <Accordion.Item eventKey="0">
                              <Accordion.Header>Prekinis ženklas</Accordion.Header>
                              <Accordion.Body>
                                  <Form>
                                      <Form.Check
                                          type="checkbox"
                                          label="Firma 1"
                                      />
                                      <Form.Check
                                          type="checkbox"
                                          label="Firma 2"
                                      />
                                      <Form.Check
                                          type="checkbox"
                                          label="Firma 3"
                                      />
                                  </Form>
                              </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                              <Accordion.Header>Galia, W</Accordion.Header>
                              <Accordion.Body>
                                  <Form>
                                      <Form.Check
                                          type="checkbox"
                                          label="5W"
                                      />
                                      <Form.Check
                                          type="checkbox"
                                          label="5.4W"
                                      />
                                      <Form.Check
                                          type="checkbox"
                                          label="7.6W"
                                      />
                                  </Form>
                              </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2">
                              <Accordion.Header>Išėjimo srovė, A</Accordion.Header>
                              <Accordion.Body>
                                  <Form>
                                      <Form.Check
                                          type="checkbox"
                                          label="2.4A"
                                      />
                                      <Form.Check
                                          type="checkbox"
                                          label="5A"
                                      />
                                      <Form.Check
                                          type="checkbox"
                                          label="6A"
                                      />
                                  </Form>
                              </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="3">
                              <Accordion.Header>Maitinimo įtampa, V</Accordion.Header>
                              <Accordion.Body>
                                  <Form>
                                      <Form.Check
                                          type="checkbox"
                                          label="5V"
                                      />
                                      <Form.Check
                                          type="checkbox"
                                          label="5.4V"
                                      />
                                      <Form.Check
                                          type="checkbox"
                                          label="7V"
                                      />
                                  </Form>
                              </Accordion.Body>
                          </Accordion.Item>
                      </Accordion>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseFilter}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : (
                // Render filter directly for width > 850px
                <>
                    {/* Filter content */}
                    <div className='filterCategory'>
                        <h6>Kaina</h6>
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            defaultValue={[0, 100]}
                            ariaLabel={['Lower thumb', 'Upper thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                            pearling
                            minDistance={10}
                        />
                        <hr />
                    </div>

                    <div className='filterCategory'>
                        <Form>
                            <Form.Check
                                type="checkbox"
                                label="Yra sandelyje"
                            />
                        </Form>
                        <hr />
                    </div>

                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Prekinis ženklas</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Form.Check
                                    type="checkbox"
                                    label="Firma 1"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Firma 2"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Firma 3"
                                />
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Galia, W</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Form.Check
                                    type="checkbox"
                                    label="5W"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="5.4W"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="7.6W"
                                />
                            </Form>
                        </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Išėjimo srovė, A</Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    <Form.Check
                                        type="checkbox"
                                        label="2.4A"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="5A"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="6A"
                                    />
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Maitinimo įtampa, V</Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    <Form.Check
                                        type="checkbox"
                                        label="5V"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="5.4V"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="7V"
                                    />
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </>
            )}
        </div>
    );
};

export default Filter;
