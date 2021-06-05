import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModel';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      displayBooks: false,
      displayModal: false,
      email: '',
      name: '',
      description: '',
      image_url: ''
    }
  }

  addBook = async () => {
    const { user } = this.props.auth0;
    try {
      const body = {
        email: user.email,
        name: this.state.name,
        description: this.state.description,
        imgUrl: this.state.image_url
      }
      console.log('body', body);
      const newBook = await axios.post(`https://book-app-amara.herokuapp.com/books`, body);
      console.log('hiiii0', newBook);
      this.setState({
        books: newBook.data
      });
      this.state.closeModal();

    } catch (error) {
      console.log(error);
    }
  }

  removeBook = async (id) => {
    // console.log(index);
    const { user } = this.props.auth0;

    await axios.delete(`https://book-app-amara.herokuapp.com/books/${id}`, { params: {email: user.email} });

  }


    displayModal = () => {
      this.setState({
        displayModal: true,
      });

    }

    closeModal = () => {
      this.setState({
        displayModal: false,
      });
    }


    componentDidMount = async () => {
      try {
        let booksURL = await axios.get(`https://book-app-amara.herokuapp.com/books?email=${this.props.auth0.user.email}`);
        console.log('Books List>>>>>>>>>>>>>', booksURL.data)
        this.setState({
          books: booksURL.data,
          displayBooks: true
        });
      } catch (error) {
        console.error(error);
      }
    }

    updateName = (e) => this.setState({ name: e.target.value });
    updateDescription = (e) => this.setState({ description: e.target.value });
    updateImage = (e) => this.setState({ image_url: e.target.value });

    render() {
      return (
        <>
          <button onClick={this.displayModal}>Add Books</button>
          {this.state.displayModal &&
            <>
              <BookFormModal
                getName={this.updateName}
                getDescription={this.updateDescription}
                getImage={this.updateImage}
                displayModal={this.state.displayModal}
                closeModal={this.closeModal}
                addBook={this.addBook}

              />
            </>
          }

          {this.state.displayBooks &&

            <>
              <Carousel style={{ width: '18rem' }} >
                {this.state.books.map((item, idx) => {
                  return (
                    <Carousel.Item interval={1000} key={idx}>
                      <img
                        className="d-block w-100"
                        src={item.imgUrl}
                        alt="Book Cover"
                        height='80%'
                      />
                      <Carousel.Caption>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <button onClick={() => { this.removeBook(item._id) }}>Delete</button>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                })
                }
              </Carousel>
            </>

          }

        </>
      )
    }
  }  

  export default withAuth0(BestBooks);