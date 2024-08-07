import { useEffect, useState } from "react";
import Book from "../Book/Book";
import './AllBooks.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from "react-redux";
import { Store } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getValue } from "@testing-library/user-event/dist/utils";


function AllBooks() {
    const [bookList, setBookList] = useState([]);
    const bookListDetails = useSelector((store) => store.allbooksStore.allBooks)
    const bookListSearch = useSelector((store) => store.bookSearchDetails.searchBookValue)
    const [bookCount, setBookCount] = useState(bookList.length)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        setBookCount(bookListDetails.length)
        setBookList(bookListDetails)
    }, [bookListDetails])

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(()=>{
        const filteredbooks = bookListDetails.filter((book)=>{
            if (book.bookName.toLowerCase().includes(bookListSearch.toLowerCase())){
                return book
            }
            if (book.author.includes(bookListSearch)){
                return book
            }
        })
        setBookList(filteredbooks)
    },[bookListSearch])

    function sortTheBooks(action) {
        const sortBooks = [...bookList];
    
        if (action === "Low to High") {
            sortBooks.sort((a, b) => a.discountPrice - b.discountPrice);
            setBookList(sortBooks);
        } else if (action === "High to Low") {
            sortBooks.sort((a, b) => b.discountPrice - a.discountPrice);
            setBookList(sortBooks);
        }else{
            setBookList(bookListDetails);
        }

    }

    const startIndex = (currentPage -1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = bookList.slice(startIndex, endIndex);

    return (
        <>
            <div className="allbooks-name-sort-opt-main-cnt">
                <div className="allbooks-total-count-main-cnt">
                    <p id="allbooks-book-text">Book</p>
                    <p id="allbooks-total-count">({bookCount} items)</p>
                </div>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <InputLabel id="demo-select-small-label">Sort by relevance  </InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Sort by relevance  "
                        onChange={(e)=>sortTheBooks(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Low to High"}>Price: Low to High</MenuItem>
                        <MenuItem value={"High to Low"}>Price: High to Low</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="allbooks-main-cnt">
                {paginatedBooks?.map((book, key) => (
                    <Book bookDetails={book} key={key}/>
                ))}
                {/* <Book /> */}
            </div>
            <Stack spacing={2}>
                <Pagination count={5} shape="rounded" onChange={handlePageChange} style={{justifyContent:"center",margin:"30px 0px 40px 0px"}}/>
            </Stack>
        </>
    );
}

export default AllBooks;
