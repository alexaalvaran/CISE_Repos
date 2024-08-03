import React, {ChangeEvent,FormEvent,useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Book, DefaultEmptyBook} from "../Books";

const CreateBookComponent = () => {
    const navigate = useRouter();

    const[book, setBook] = useState<Book>(DefaultEmptyBook);

    const onChange = (event:ChangeEvent<HTMLInputElement>) => {
        setBook({...book,[event.target.name]:event.target.value});
    };

    const onSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(book);
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/books', {method: 'POST', headers:{"Content-Type":"application/json"},body:JSON.stringify(book)})
        .then((res) => {
            console.log(res);
            setBook(DefaultEmptyBook);
            navigate.push("/");
        })
        .catch((err) => {
            console.log('Error from CreateBook: ' + err);
        });
    };

    return(
        <div className="CreateBook">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                        <Link href="/" className="btn btn-outline-warning float-left">
                        Show Book List
                        </Link>
                    </div>
                    <div className="col-md-10 m-auto">
                        <h1 className="display-4 text-center">Add Book</h1>
                        <p className="lead text-center">Create new book</p>
                        <form noValidate onSubmit={onSubmit}>
                            <div className="form-group">
                                <input
                                type="text"
                                placeholder="Title of the Book"
                                name="title"
                                className = "form-control"
                                value={book.title}
                                onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                type="text"
                                placeholder="Publisher of this book"
                                name = "publisher"
                                className = "form-control"
                                value={book.publisher}
                                onChange = {onChange}
                                />
                            </div>
                            <button
                            type="submit"
                            className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"
                            >
                                Submit
                            </button>
                        </form>
                       </div>
                  </div>
             </div>
        </div>
    );
};

export default CreateBookComponent;