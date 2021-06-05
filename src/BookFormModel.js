import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
class BookFormModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.displayModal} onHide={this.props.closeModal} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label>Book Name: </label>
                            <input type="text" onChange={(e) => { this.props.getName(e) }} />
                            <br />
                            <label>Book Description: </label>
                            <input type="text" onChange={(e) => { this.props.getDescription(e) }} />
                            <br />
                            <label>Book Image: </label>
                            <input type="text" onChange={(e) => { this.props.getImage(e) }} />
                        </form>
                    </Modal.Body>

                    <Modal.Footer> 
                        <Button variant="primary" onClick={this.props.addBook}>
                            Add Book
                        </Button>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default BookFormModal