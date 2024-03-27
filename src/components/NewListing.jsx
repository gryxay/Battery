import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';
import Toast from 'react-bootstrap/Toast';

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

    const [showModal, setShowModal] = useState(false);
    const [showManufacturerModal, setShowManufacturerModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([])
    const navigate = useNavigate();
    const [category, setCategory] = useState();
    const [manufacturers, setManufacturers] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState('');
    const [deleteText, setDeleteText] = useState('')
    const [confirmationSource, setConfirmationSource] = useState('')

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const openManufacturerModal = () => setShowManufacturerModal(true);
    const closeManufacturerModal = () => setShowManufacturerModal(false);

    const openConfirmationModal = () => setShowConfirmationModal(true);
    const closeConfirmationModal = () => setShowConfirmationModal(false);
  
    const toggleShowToast = () => setShowToast(!showToast);

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

    useEffect(() => {
        if (formData.category) {
            setCategory(formData.category)
        }
    }, [formData.category])

    useEffect(() => {
        const fetchProducers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/manufacturers');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const items = await response.json();
                setManufacturers(items.manufacturers)
            } catch (error) {
                console.error('Error fetching items:', error.message);
            }
        }

        fetchProducers();
    }, [])

    const handleManufacturerOk = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/manufacturers`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.manufacturers.includes(formData.details.manufacturer)) {
                setToastText('Gamintojas jau egzistuoja');
                setShowToast();
            } else {
                setManufacturers([...manufacturers, formData.details.manufacturer])
                closeManufacturerModal();
            }
        } catch (error) {
            console.error('Error adding manufacturer', error);
        }
    }

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
    setImagesToDelete([...imagesToDelete, formData.images[index]])
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
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
                    } else if (key === 'price') {
                        formDataToSend.append('price', parseFloat(formData['price']));
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
            navigate(`/${category}`);
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
                imagesToDelete.forEach((img) => formDataToSend.append('imagesToDelete', img.filename));
            }
    
            const url = `http://localhost:5000/api/update/${id}`
    
            const response = await fetch(url, {
                method: 'PUT',
                body: formDataToSend
            });
    
            const data = await response.json();
            navigate(`/${category}/${id}`);
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
            navigate(`/${category}`);
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

    const confirmationModal =
    <>
        <Modal show={showConfirmationModal} onHide={closeConfirmationModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{deleteText}</Modal.Title>
            </Modal.Header>
            <Modal.Footer className='justify-content-between'>
                <Button variant="secondary" onClick={() => {
                    closeConfirmationModal();
                    if (confirmationSource === 'image') {
                        formData.images = [...formData.images, ...imagesToDelete];
                        openModal();
                    }
                }}>Atšaukti</Button>
                    <Button variant="primary" onClick={() => {
                        if (confirmationSource === 'listing') {
                            handleDelete()
                        }
                        closeConfirmationModal();
                    }}>Taip, noriu trinti</Button>
            </Modal.Footer>

        </Modal>
    </>

    const manufacturerModal = 
    <>
        {/* Manufacturer modal */}
        <div>
        <Button variant="primary" onClick={openManufacturerModal}>
            Pridėti gamintoją
        </Button> 
        <Modal show={showManufacturerModal} onHide={closeManufacturerModal}>
            <Modal.Header closeButton>
                <Modal.Title>Pridėti naują gamintoją</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formManufacturer" className='form-group-crud'>
                        <Form.Label>Gamintojas</Form.Label>
                        <Form.Control type="text" placeholder="Įveskite gamintoją" name="manufacturer" maxLength={100} onChange={handleChange} value={formData.details.manufacturer} />
                    </Form.Group>
                </Modal.Body>
                <Toast show={showToast} bg={'danger'} postion={'top-start'} delay={2000} autohide onClose={toggleShowToast}>
                    <Toast.Header>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                        />
                        <strong className="me-auto">{toastText}</strong>
                    </Toast.Header>
                </Toast>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeManufacturerModal}>Uždaryti</Button>
                <Button variant="primary" onClick={handleManufacturerOk}>OK</Button>
            </Modal.Footer>

        </Modal>
    </div>
    </>

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
                            <option value={formData.category}>Pasirinkite kategoriją</option>
                            {pathsArray.map((path, index) => (
                                <option key={index} value={path}>{path}</option>
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
                        <Form.Control as="select" name="manufacturer" onChange={handleChange} value={formData.manufacturer}>
                            <option value={formData.manufacturer}>Pasirinkite gamintoją</option>
                            {manufacturers.length > 0 && manufacturers.map((manufacturer, index) => (
                                <option key={index} value={manufacturer}>{manufacturer}</option>
                            ))}
                        </Form.Control>
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
                        <Button variant="secondary" id="delete-button-crud" onClick={() => {
                            setConfirmationSource('listing');
                            setDeleteText('Ar tikrai norite ištrinti prekę?');
                            openConfirmationModal();;
                        }}>
                            Ištrinti
                        </Button>

                        {confirmationModal}

                        {manufacturerModal}
                        
                        {/* Image modal */}
                        <div>
                            <Button variant="primary" onClick={openModal}>Keisti nuotraukas</Button>
                            <Modal show={showModal} onHide={closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Keisti nuotraukas</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                        <Row>
                                            {/* Render existing images */}
                                            {formData.images.length === 1 && formData.images.map((image, index) => (
                                                <Col key={index} sm={4}>
                                                    <div className="image-container">
                                                        <img src={`data:${image.type};base64,${image.data}`} alt={`Item ${index}`} style={{ width: '100%' }} />
                                                    </div>
                                                </Col>
                                            ))}
                                            {formData.images.length > 1 && formData.images.map((image, index) => (
                                                <Col key={index} sm={4}>
                                                    <div className="image-container">
                                                        <CloseButton className='delete-image-button-crud' onClick={() => handleDeleteImage(index)} />
                                                        <img src={`data:${image.type};base64,${image.data}`} alt={`Item ${index}`} style={{ width: '100%' }} />
                                                    </div>
                                                </Col>
                                            ))}
                                            {/* Render newly added images */}
                                            {additionalImages.map((image, index) => (
                                                <Col key={index + formData.images.length} sm={4}>
                                                    <div className="image-container">
                                                        <CloseButton className='delete-image-button-crud' onClick={() => handleDeleteNewImage(index)} />
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
                                    <Button variant="primary" onClick={() => {
                                            if (imagesToDelete.length > 0) {
                                                closeModal();
                                                setConfirmationSource('image');
                                                setDeleteText('Ar tikrai norite ištrinti pasirinktas nuotraukas?');
                                                openConfirmationModal();
                                            } else {
                                                handleOk();
                                            }}
                                        }
                                    >
                                        OK
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                        <Button variant="primary" onClick={handleUpdate} id="update-button-crud">
                            Atnaujinti
                        </Button>
                    </div>
                }
                { !id &&
                    <div id="update-buttons">
                        {manufacturerModal}

                        <Button variant="primary" type="submit">
                            Pateikti
                        </Button>
                    </div>
                }
            </Form>
        </Container>
    );
};

export default NewListing;