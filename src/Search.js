import React, {Component} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book";
import { Debounce } from "react-throttle";

class Search extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired        
    };

    searchForBooks = (query) => {
        this.props.searchForBooks(query.trim());
    };

    componentWillUnmount(){
        this.props.searchForBooks("");
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="600" handler="onChange">
                            <input
                                type="text"
                                placeholder="Search Books by title or author"
                                onChange={(event) => this.searchForBooks(event.target.value)}
                            />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (                            
                            <li key={book.id} className="contact-list-item">
                                <Book
                                    book={book}
                                    changeShelf={this.props.changeShelf}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}


export default Search;