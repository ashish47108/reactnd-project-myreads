import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";


class Book extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired        
    };

    render(){
        const { book } = this.props;
        return(
            <div className="book" id={book.id}>
                <div className="book-top">
                    <div className="book-cover" 
                    style={{backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ''  }")` }} />                    
                    <BookShelfChanger 
                        book={book}
                        changeShelf={this.props.changeShelf}
                    />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }


}

export default Book;