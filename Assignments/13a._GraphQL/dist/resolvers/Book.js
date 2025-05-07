import db from "../database/data.js";
const Book = {
    author: (parent, args, context, info) => {
        const foundAuthor = db.authors.find((author) => author.id === parent.authorId);
        return foundAuthor;
    }
};
export default Book;
