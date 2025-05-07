import db from "../database/data.js";
import { GraphQLError } from "graphql";
// import pubsub from "../database/pubsubUtil.js";

function addBook(parent: any, args: any, context: any, info: any) {
    const providedAuthorId = Number(args.authorId);
    const foundAuthor = db.authors.find((author) => author.id === providedAuthorId);
    if (!foundAuthor) {
        throw new GraphQLError(`Author not found with ID: ${providedAuthorId}`, {
            extensions: { code: 'AUTHOR_NOT_FOUND'}
        });
    }

    const nextId = db.books[db.books.length - 1].id + 1;

    const newBook = {
        id: nextId,
        title: args.title,
        releaseYear: args.releaseYear,
        authorId: providedAuthorId
    };
    db.books.push(newBook);


    // pubsub.publish('BOOK_ADDED', { bookAdded: newBook });


    return newBook;
}

function updateBook(parent: any, args: any, context: any, info: any) {
    const providedBookId = Number(args.id);
    const findIndex = db.books.findIndex((book) => book.id === providedBookId);
    if (findIndex === -1) {
        throw new GraphQLError(`Book not found with ID: ${providedBookId}`, {
            extensions: { code: 'BOOK_NOT_FOUND'}
        });
    }

    if (args.authorId) {
        const foundAuthor = db.authors.find((author) => author.id === Number(args.authorId));
        if (!foundAuthor) {
            throw new GraphQLError(`Author not found with ID: ${args.authorId}`, {
                extensions: { code: 'AUTHOR_NOT_FOUND'}
            });
        }
    }
    
    const foundBook = db.books[findIndex];
    const updatedBook = {
        id: foundBook.id,
        title: args.title || foundBook.title,
        releaseYear: args.releaseYear || foundBook.releaseYear,
        authorId: args.authorId || foundBook.authorId
    };
    db.books[findIndex] = updatedBook;

    return updatedBook;
}

function deleteBook(parent: any, args: any, context: any, info: any) {
    const providedBookId = Number(args.id);
    const findIndex = db.books.findIndex((book) => book.id === providedBookId);
    if (findIndex === -1) {
        throw new GraphQLError(`Book not found with ID: ${providedBookId}`, {
            extensions: { code: 'BOOK_NOT_FOUND'}
        });
    }

    db.books.splice(findIndex, 1);
    return {
        message: `Book with ID: ${providedBookId} deleted successfully.`
    };
}

export default {
    addBook,
    updateBook,
    deleteBook,
};
