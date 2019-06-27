import React, { Component } from "react";
import PropTypes from "prop-types";

class BookShelfChanger extends Component{
    
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
    };

    catagories = [        
        { key: 'move', name: 'Move to...', disabled:true },
        { key: 'currentlyReading', name: 'Currently Reading' , disabled:false },
        { key: 'wantToRead', name: 'Want to Read' , disabled:false },
        { key: 'read', name: 'Read', disabled:false },
        { key: 'none', name: 'None' , disabled:false }
      ];

    state = {
        currentShelf: this.props.book.shelf        
    };

    changeShelf = (event) => {        
        this.props.changeShelf(this.props.book, event.target.value);
        this.setState({
            currentShelf: event.target.value            
        });        
    };

    render(){
        return(
            <div className="book-shelf-changer">                 
                <select
                    value={this.state.currentShelf}
                    onChange={this.changeShelf}
                >
                    {
                       this.catagories.map((category) => (
                            <option key={category.key} value={category.key} disabled={category.disabled} >{category.name}</option>
                        ))
                    }                    
                </select>                
            </div>
        );
    }


}

export default BookShelfChanger;