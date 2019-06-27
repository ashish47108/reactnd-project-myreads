import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";
import Search from "./Search";
import "./App.css";
import Shelf from "./Shelf";

class BooksApp extends React.Component {    

  state = {
    searchBooks: [],
    books: []    
  };

  shelfs = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' }
  ];

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({books});
    });
  }

  searchForBooks = (query) => {
    if(query){
        BooksAPI.search(query).then((books) => {            
            if(books.length){                
                books=books.map(book =>{
                    let myBook= this.state.books.find((b) => b.id === book.id);
                    book.shelf = myBook ? myBook.shelf : 'none'; 
                    return book;                   
                } )
                this.setState({
                    searchBooks: books
                });
            }

        });     
    } else {
    this.setState({
        searchBooks: []
    });
    }
  };

changeShelf = (book, newShelf) => {  
  BooksAPI.update(book, newShelf).then(() => {
    book.shelf = newShelf;
    this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }));

  });
};

getShelfBooks(shelfName){
  return this.state.books.filter((b) => b.shelf === shelfName)
}

  render() {
    return (
      <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>                                
                            {this.shelfs.map(shelf => (
                            <Shelf
                                key={shelf.key}
                                title={shelf.name}
                                books={this.getShelfBooks(shelf.key)}
                                changeShelf={this.changeShelf}                                
                            />
                            ))}
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search"/>
                        </div>
                    </div>
                )}/>

                <Route path="/search" render={() => (
                            <Search
                                books={this.state.searchBooks}
                                searchForBooks={this.searchForBooks} 
                                changeShelf={this.changeShelf}                       
                            />
                        )}/>
      </div>
    )
  }
}

export default BooksApp
