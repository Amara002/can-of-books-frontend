import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Carousel from 'react-bootstrap/Carousel'

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      displayBooks: false,
    }
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

  render() {
    return (
      <>
        {this.state.displayBooks &&

          <>
            <Carousel style={{ width: '18rem' }} >
              {this.state.books.map((item, idx) => {
                return (
                  <Carousel.Item interval={1000} key={idx}>
                    <img
                      className="d-block w-100"
                      src={item.imgUrl}
                      alt="Book Cover Image"
                      height='80%'
                    />
                    <Carousel.Caption>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
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