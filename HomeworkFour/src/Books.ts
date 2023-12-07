// Уявіть, що ви створюєте інтерфейси для веб-сервісу, який надає інформацію про книги. Створіть інтерфейси Book, Author,
// і BookService, які описують структуру даних книжок, авторів і методи веб-сервісу для отримання інформації про книжки
// та авторів. Потім створіть об'єкт bookService, який імітує роботу веб-сервісу, і використовуйте інтерфейси
// для отримання інформації про книги та авторів.

interface Book {
  id: number;
  title: string;
  authorId: number;
  publicationDate: string;
}

interface Author {
  id: number;
  name: string;
  birthDate: string;
}

interface BookService {
  getBookById: (id: number) => Book | null;
  getBooksByAuthor: (authorId: number) => Book[];
  getAllAuthors: () => Author[];
}

const database = {
  authors: [
    { id: 1, name: "Автор 1", birthDate: "01-01-1998" },
    { id: 2, name: "Автор 2", birthDate: "01-01-1975" },
  ],
  books: [
    { id: 1, title: "Книга 1", authorId: 1, publicationDate: "01-01-2000" },
    { id: 2, title: "Книга 2", authorId: 1, publicationDate: "01-01-2015" },
    { id: 3, title: "Книга 3", authorId: 2, publicationDate: "01-01-2009" },
  ],
};

const bookService: BookService = {
  getBookById: (id) => {
    const book = database.books.find((b) => b.id === id);
    return book
      ? {
          ...book,
          author: database.authors.find((a) => a.id === book.authorId)!,
        }
      : null;
  },
  getBooksByAuthor: (authorId) => {
    const books = database.books.filter((b) => b.authorId === authorId);
    return books.map((book) => ({
      ...book,
      author: database.authors.find((a) => a.id === book.authorId)!,
    }));
  },
  getAllAuthors: () => [...database.authors],
};

const bookById: Book | null = bookService.getBookById(1);
const booksByAuthor: Book[] = bookService.getBooksByAuthor(1);
const allAuthors: Author[] = bookService.getAllAuthors();
