import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';

const NewListing = ({ id }) => {
    const pathsArray = [
        "sviesos-diodu-led-e14",
        "sviesos-diodu-led-e27",
        "sviesos-diodu-led-g4",
        "sviesos-diodu-led-gu10",
        "sviesos-diodu-led-gu53",
        "sviesos-diodu-led-g9",
        "sviesos-diodu-led-mr16",
        "sviesos-diodu-led-t8",
        "led-halogenines",
        "led-kaitrines",
        "led-automobiliu",
        "led-kitos",
        "led-sviestuvai-pultu",
        "led-sviestuvai-imontuojami",
        "led-sviestuvai-pavirsiniai",
        "led-sviestuvai-torserai",
        "led-sviestuvai-prozektoriai",
        "led-sviestuvai-pramoniniai",
        "led-sviestuvai-saules",
        "led-sviestuvai-ip44-54-55",
        "led-juostos-ip20",
        "led-juostos-ip65",
        "led-juostos-maitinimo-saltiniai",
        "led-juostos-valdikliai",
        "led-juostos-profiliai",
        "baterijos-aa",
        "baterijos-aaa",
        "baterijos-c",
        "baterijos-d",
        "baterijos-9v",
        "baterijos-3r12",
        "baterijos-kitos",
        "ni-mh-ikraunamos-baterijos-aa",
        "ni-mh-ikraunamos-baterijos-aaa",
        "ni-mh-ikraunamos-baterijos-c",
        "ni-mh-ikraunamos-baterijos-d",
        "ni-mh-ikraunamos-baterijos-9v",
        "ni-mh-ikraunamos-baterijos-kitos",
        "svino-akumuliatoriai",
        "li-on-baterijos",
        "licio-cr-baterjos",
        "mikro-baterijos",
        "ikraunami-zibintuveliai",
        "zibintuveliai-su-baterijomis",
        "zibintuveliai-galvos",
        "elektros-instaliacija-jungikliai",
        "elektros-instaliacija-lizdai",
        "elektros-instaliacija-kaladeles",
        "elektros-instaliacija-kistukai",
        "elektros-instaliacija-sakotuvai",
        "elektros-instaliacija-kabeliu-kanalai",
        "elektros-instaliacija-ilgintuvai",
        "kitos-prekes-pakavimo",
        "kitos-prekes-dazymo",
        "kitos-prekes-profesionalios",
        "kitos-prekes-kitos"
    ];

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([])

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const [formData, setFormData] = useState({
        category: '',
        images: [],
        price: 0.00,
        name: '',
        code: '',
        amount: '',
        details: {
            manufacturer: '',
            weight: '',
            comment: '',
            measurements: '',
            packaging: ''
        }
    });

    const handleOk = () => {
        setFormData({ ...formData, images: [...formData.images] });
        setShowModal(false);
    };

    const handleDeleteNewImage = (index) => {
        const updatedAdditionalImages = [...additionalImages];
        updatedAdditionalImages.splice(index, 1);
        setAdditionalImages(updatedAdditionalImages);
    };

    const handleDeleteImage = (index) => {
    setImagesToDelete([...imagesToDelete, formData.images[index].filename])
    // Create a copy of formData.images array
    const updatedImages = [...formData.images];
    // Remove the image at the specified index
    updatedImages.splice(index, 1);
    // Update the formData state with the modified array
    setFormData({...formData, images: updatedImages});
};
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        const newFormData = { ...formData };
    
        if (name === "images") {
            newFormData.images = Array.from(files); // Store file objects directly in formData
        } else if (name === 'manufacturer' || name === 'weight' || name === 'comment' || name === 'measurements' || name === 'packaging') {
            // Ensure details object is initialized before setting its properties
            newFormData.details = newFormData.details || {};
            newFormData.details[name] = value;
        } else if (name) {
            newFormData[name] = value;
        }
        setFormData(newFormData); // Update formData state
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation for mandatory fields
        for (const key in formData) {
            if (formData.hasOwnProperty(key) && key !== 'packaging' && key !== 'comment' && key !== 'weight' && key !== 'meausurements') {
                if (!formData[key]) {
                    alert(`Įveskite visus duomenis`);
                    return;
                }
            }
        }
    
        try {
            const formDataToSend = new FormData(); // Create FormData object
    
            // Append form data
            for (const key in formData) {
                if (formData.hasOwnProperty(key)) {
                    if (key === 'images') {
                        formData[key].forEach((file) => {
                            formDataToSend.append('images', file); // Append each image file
                        });
                    } else if (key === 'details') {
                        for (const detailKey in formData[key]) {
                            if (formData[key].hasOwnProperty(detailKey)) {
                                formDataToSend.append(`details[${detailKey}]`, formData[key][detailKey]); // Append details object
                            }
                        }
                    } else {
                        formDataToSend.append(key, formData[key]); // Append other form data
                    }
                }
            }
    
            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                body: formDataToSend
            });
    
            const data = await response.json();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const formDataToSend = new FormData();
    
            for (const key in formData) {
                if (formData.hasOwnProperty(key)) {
                    if (key === 'details') {
                        const details = formData[key] || {}; // Initialize details object if it doesn't exist
                        for (const detailKey in details) {
                            if (details.hasOwnProperty(detailKey)) {
                                formDataToSend.append(`details[${detailKey}]`, details[detailKey]); // Append details object
                            }
                        }
                    } else {
                        formDataToSend.append(key, formData[key]); // Append other form data
                    }
                }
            }
    
            if (additionalImages) {
                additionalImages.forEach((img) => formDataToSend.append('additionalImages', img));
            }

            if (imagesToDelete) {
                imagesToDelete.forEach((str) => formDataToSend.append('imagesToDelete', str));
            }
    
            const url = `http://localhost:5000/api/update/${id}`
    
            const response = await fetch(url, {
                method: 'PUT',
                body: formDataToSend
            });
    
            const data = await response.json();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    
    
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/delete/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            navigate('/');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    
    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/items/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch item data');
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        if (id) {
            fetchItemData();
        }
    }, [id]);

    return (
        <Container id="new-listing-container">
            { !id && 
                <h2>Nauja prekė</h2>
            }
            { id && 
                <h2>Atnaujinti prekę</h2>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCategory" className='form-group-crud'>
                        <Form.Label>Kategorija *</Form.Label>
                        <Form.Control as="select" name="category" onChange={handleChange} value={formData.category}>
                            <option value="">Pasirinkite kategoriją</option>
                            {pathsArray.map((path, index) => (
                                formData.category === path ? <option key={index} value={path} selected>{path}</option>: <option key={index} value={path}>{path}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                { !id &&
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Nuotraukos *</Form.Label>
                        <Form.Control type="file" multiple name="images" onChange={handleChange} />
                    </Form.Group>
                }
                <Form.Group controlId="formPrice" className='form-group-crud'>
                    <Form.Label>Kaina *</Form.Label>
                    <Form.Control type="number" placeholder="Įveskite kainą" step="0.01" min={0} name="price" onChange={handleChange} value={formData.price} />
                </Form.Group>
                <Form.Group controlId="formName" className='form-group-crud'>
                    <Form.Label>Pavadinimas *</Form.Label>
                    <Form.Control type="text" placeholder="Įveskite pavadinimą" name="name" onChange={handleChange} maxLength={60} value={formData.name} />
                </Form.Group>
                <Form.Group controlId="formCode" className='form-group-crud'>
                    <Form.Label>Kodas *</Form.Label>
                    <Form.Control type="text" placeholder="Įveskite kodą" name="code" onChange={handleChange} maxLength={50} value={formData.code} />
                </Form.Group>
                <Form.Group controlId="formAmount" className='form-group-crud'>
                    <Form.Label>Kiekis *</Form.Label>
                    <Form.Control type="number" placeholder="Įveskite kiekį" name="amount" min={1} onChange={handleChange} value={formData.amount} />
                </Form.Group>
                <Form.Group controlId="formManufacturer" className='form-group-crud'>
                    <Form.Label>Gamintojas *</Form.Label>
                    <Form.Control type="text" placeholder="Įveskite gamintoją" name="manufacturer" maxLength={100} onChange={handleChange} value={formData.details.manufacturer} />
                </Form.Group>
                <Form.Group controlId="formMeasurements" className='form-group-crud'>
                    <Form.Label>Išmatavimai</Form.Label>
                    <Form.Control type="text" placeholder="Įveskite išmatavimus" name="measurements" maxLength={60} onChange={handleChange} value={formData.details.measurements} />
                </Form.Group>
                <Form.Group controlId="formPackaging" className='form-group-crud'>
                    <Form.Label>Pakavimas</Form.Label>
                    <Form.Control type="text" placeholder="Įveskite pakavimą" name="packaging" onChange={handleChange} maxLength={60} value={formData.details.packaging} />
                </Form.Group>
                <Form.Group controlId="formComment" className='form-group-crud'>
                    <Form.Label>Komentarai</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Įveskite komentarus" name="comment" onChange={handleChange} maxLength={100} value={formData.details.comment} />
                </Form.Group>
                    <Form.Group controlId="formWeight" className='form-group-crud'>
                    <Form.Label>Svoris</Form.Label>
                    <Form.Control type="text" placeholder="Įveskite svorį" name="weight" onChange={handleChange} maxLength={20} value={formData.details.weight} />
                </Form.Group>
                { id &&
                    <div id="update-buttons">
                        <Button variant="secondary" id="delete-button-crud" onClick={handleDelete}>
                            Ištrinti
                        </Button>

                        <div>
                            <Button variant="primary" onClick={openModal}>Keisti nuotraukas</Button>
                            <Modal show={showModal} onHide={closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Keisti nuotraukas</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                        <Row>
                                            {/* Render existing images */}
                                            {formData.images.map((image, index) => (
                                                <Col key={index} sm={4}>
                                                    <div className="image-container">
                                                        <CloseButton className='delete-image-button-crud' onClick={() => handleDeleteNewImage(index)} />
                                                        <img src={`data:${image.type};base64,${image.data}`} alt={`Item ${index}`} style={{ width: '100%' }} />
                                                    </div>
                                                </Col>
                                            ))}
                                            {/* Render newly added images */}
                                            {additionalImages.map((image, index) => (
                                                <Col key={index + formData.images.length} sm={4}>
                                                    <div className="image-container">
                                                        <CloseButton onClick={() => handleDeleteNewImage(index)} />
                                                        <img src={URL.createObjectURL(image)} alt={`New Item ${index}`} style={{ width: '100%' }} />
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                        <Form.Group controlId="formFileMultiple" className="mb-3">
                                            <Form.Label>Pridėti nuotraukas</Form.Label>
                                            <Form.Control type="file" multiple name="images" onChange={(e) => setAdditionalImages([...additionalImages, ...Array.from(e.target.files)])} />
                                        </Form.Group>
                                    </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={closeModal}>Uždaryti</Button>
                                    <Button variant="primary" onClick={handleOk}>OK</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                        <Button variant="primary" onClick={handleUpdate} id="update-button-crud">
                            Atnaujinti
                        </Button>
                    </div>
                }
                { !id &&
                    <Button variant="primary" type="submit" id="submit-button-crud">
                        Pateikti
                    </Button>
                }
            </Form>
        </Container>
    );
};

export default NewListing;