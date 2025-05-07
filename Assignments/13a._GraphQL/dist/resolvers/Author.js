import db from "../database/data.js";
const Author = {
    books: (parent, args, context, info) => {
        const booksByAuthor = db.books.filter((book) => book.authorId === Number(parent.id));
        return booksByAuthor;
    }
};
export default Author;
