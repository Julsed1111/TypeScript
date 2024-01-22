//Задача _________________________________________________________

//Вам необхідно написати додаток Todo list. У списку нотаток повинні бути методи для додавання нового запису, видалення,
//редагування та отримання повної інформації про нотаток за ідентифікатором, а так само отримання списку всіх нотатік.
//Крім цього, у користувача має бути можливість позначити нотаток, як виконаний, і отримання інформації про те,
//скільки всього нотаток у списку і скільки залишилося невиконаними. Нотатки не повинні бути порожніми.

//Кожний нотаток має назву, зміст, дату створення і редагування та статус. Нотатки бувають двох типів.
//Дефолтні та такі, які вимагають підтвердження при ридагуванні (окремі класи).

//Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка по будь-якому філду,
//або у якості опції вказувати по якому саме вести пошук.

//Також окремо необхідно розширити список можливістю сортування нотаток за статусом або часом створення.

class Note {
  id: number;
  title: string;
  content: string;
  creationDate: Date;
  modificationDate: Date;
  status: boolean;

  [key: string]: string | number | boolean | Date | undefined | unknown;

  constructor(id: number, title: string, content: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.creationDate = new Date();
    this.modificationDate = new Date();
    this.status = false;
  }

  markAsDone() {
    this.status = true;
  }
}

class ConfirmableNote extends Note {
  confirmEdit: boolean;

  constructor(id: number, title: string, content: string) {
    super(id, title, content);
    this.confirmEdit = true;
  }
}

class NoteList {
  notes: Note[];

  constructor() {
    this.notes = [];
  }

  addNote(note: Note) {
    if (note.title && note.content) {
      this.notes.push(note);
    } else {
      console.error("Note name and content cannot be empty.");
    }
  }

  deleteNoteById(id: number) {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  confirmEdit(): boolean {
    const confirmation = window.confirm(
      "Are you sure you want to edit this note?"
    );
    return confirmation;
  }

  editNoteById(id: number, newNote: Note) {
    const existingNote = this.notes.find((note) => note.id === id);

    if (existingNote) {
      if (newNote instanceof ConfirmableNote && newNote.confirmEdit) {
        const userConfirmed = this.confirmEdit();

        if (!userConfirmed) {
          console.log("Edit canceled by user.");
          return;
        }
      }

      existingNote.title = newNote.title;
      existingNote.content = newNote.content;
      existingNote.modificationDate = new Date();
    } else {
      console.error("No notes were found with the specified ID.");
    }
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find((note) => note.id === id);
  }

  getAllNotes(): Note[] {
    return this.notes;
  }

  getUncompletedNotesCount(): number {
    return this.notes.filter((note) => !note.status).length;
  }

  searchNotes(query: string, field: string = "title"): Note[] {
    return this.notes.filter((note) => {
      const noteField = note[field] as unknown;
      return (
        (typeof noteField === "string" &&
          noteField.toLowerCase().includes(query.toLowerCase())) ||
        false
      );
    });
  }

  sortNotesByStatus() {
    this.notes.sort((a, b) => (a.status === b.status ? 0 : a.status ? 1 : -1));
  }

  sortNotesByCreationDate() {
    this.notes.sort(
      (a, b) => a.creationDate.getTime() - b.creationDate.getTime()
    );
  }
}

const noteList = new NoteList();
const note1 = new Note(1, "Title 1", "Info 1");
const note2 = new ConfirmableNote(2, "Title 2", "Info 2");

noteList.addNote(note1);
noteList.addNote(note2);

console.log(noteList.getAllNotes());
console.log(
  "Number of outstanding notes:",
  noteList.getUncompletedNotesCount()
);

noteList.editNoteById(1, new Note(1, "New title", "New Info"));
console.log(noteList.getNoteById(1));

noteList.sortNotesByStatus();
console.log("Sorted by status:", noteList.getAllNotes());

noteList.sortNotesByCreationDate();
console.log("Sorted by creation date:", noteList.getAllNotes());
