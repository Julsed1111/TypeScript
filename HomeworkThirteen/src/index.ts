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

interface NoteType {
  default: "default";
  confirm: "confirm";
}

const TaskTypes: NoteType = {
  default: "default",
  confirm: "confirm",
};

interface Note {
  id: number;
  title: string;
  content: string;
  creationDate: Date;
  editDate: Date;
  isCompleted: boolean;
}

interface EditableNote {
  type: NoteType[keyof NoteType];
}

abstract class NoteManager {
  protected readonly noteId: number;
  protected readonly creationDate: Date;
  protected editDate: Date;
  protected isCompleted: boolean;

  protected notes: Note[] = [];
  public title: string;
  public content: string;

  constructor(note: Note) {
    this.noteId = note.id;
    this.title = note.title;
    this.content = note.content;
    this.creationDate = new Date();
    this.editDate = note.editDate;
    this.isCompleted = note.isCompleted;
    this.addNote(note);
  }

  public get allNotes(): Note[] {
    return this.notes;
  }

  protected unfinishedNotes(): Note[] {
    return this.notes.filter((note) => !note.isCompleted);
  }

  protected countAllNotes(): number {
    return this.notes.length;
  }

  public completeNote(id: number): void {
    this.notes.forEach((note) => {
      if (note.id === id && !note.isCompleted) {
        note.isCompleted = true;
      }
    });
  }

  public getNoteInfo(id: number): Note | undefined {
    return this.notes.find((note) => note.id === id);
  }

  public removeNote(id: number): void {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  public abstract modifyNote(note: Note): void;

  public addNote(note: Note): void {
    this.notes.push(note);
  }
}

class DefaultNoteManager extends NoteManager implements EditableNote {
  public readonly type: keyof NoteType;

  constructor(note: Note, type: keyof NoteType) {
    super(note);
    this.type = type;
  }

  public modifyNote(note: Note): void {
    this.notes.forEach((element) => {
      if (element.id === note.id) {
        element.title = note.title;
        element.content = note.content;
        element.editDate = note.editDate;
        element.isCompleted = note.isCompleted;
      }
    });
  }
}

class ConfirmNoteManager extends NoteManager implements EditableNote {
  public readonly type: keyof NoteType;

  constructor(note: Note, type: keyof NoteType) {
    super(note);
    this.type = type;
  }

  public modifyNote(note: Note): boolean {
    const result = confirm("Please confirm the note modification");
    if (result) {
      this.notes.forEach((element) => {
        if (element.id === note.id) {
          element.title = note.title;
          element.content = note.content;
          element.editDate = note.editDate;
          element.isCompleted = note.isCompleted;
        }
      });
    }
    return result;
  }
}

class SearchNoteManager extends NoteManager {
  public modifyNote(note: Note): void {
    throw new Error("Note modification is not supported in this class");
  }

  public searchNotes(
    field: keyof Note,
    value: string | number | boolean
  ): Note[] {
    return this.notes.filter((note) => note[field] === value);
  }
}

class SortNoteList {
  public sortNotes(
    compareFn: (a: Note, b: Note) => number,
    notes: Note[]
  ): Note[] {
    return notes.slice().sort(compareFn);
  }
}
