import React from 'react'
import Modal from 'react-modal'
import { useState } from 'react'
import Axios from 'axios'

//need this or an error in console occurs 
Modal.setAppElement('#root'); 
export default function AddProduct() {
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [file, setFile] = useState(''); 
    const [filename, setFilename] = useState('Choose file');

    const onChange = (e) => { 
        setFile(e.target.files[0]); 
        setFilename(e.target.files[0].name); 

    }

    const onSubmit = async (e) => { 
        e.preventDefault(); 
        const formData = new FormData(); 
        formData.append('file', file); 

        try{ 
            const res = await Axios.post('http://localhost:5000/products/upload', formData);
            console.log(res);  
        }
        catch(err) { 
            console.log(err); 
        }
    }

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Add Product</button> 
            {/* //onRequestClose makes it so modal closes with escape and if you click outside 
            //of modal  */}
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={onSubmit}>
                    <h1>{filename}</h1>
                    <input type="file" name="file" onChange={(e) => onChange(e)}></input>
                    <input type="submit" value="Submit"></input>
                </form>
                <button onClick={() => setModalIsOpen(false)}>Cancel</button>
            </Modal>
        </div>
    )
}
