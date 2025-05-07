import db from "../database/data.js";
function books(parent, args, context, info) {
    return db.books;
}
function book(parent, args, context, info) {
    const foundBook = db.books.find((book) => book.id === Number(args.id));
    return foundBook;
}
function author(parent, args, context, info) {
    const foundAuthor = db.authors.find((author) => author.id === Number(args.id));
    return foundAuthor;
}
export default {
    books,
    book,
    author
};
