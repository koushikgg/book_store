import { useState } from "react";
import Book from "../Book/Book";
import './AllBooks.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from "react-redux";
import { Store } from "@mui/icons-material";

function AllBooks() {
    const [booklist, setBooklist] = useState([]);
    const [sortSelect, setSortSelect] = useState('');
    const bookList = useSelector((store)=> store.allbooksStore.allBooks)

    return (
        <>
            <div className="allbooks-name-sort-opt-main-cnt">
                <div className="allbooks-total-count-main-cnt">
                    <p id="allbooks-book-text">Book</p>
                    <p id="allbooks-total-count">(120 items)</p>
                </div>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <InputLabel id="demo-select-small-label">Sort by relevance  </InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Sort by relevance  "
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="allbooks-main-cnt">
                {bookList?.map((book)=>(
                    <Book  bookDetails={book}/>
                ))}
                {/* <Book /> */}
            </div>
        </>
    );
}

export default AllBooks;
