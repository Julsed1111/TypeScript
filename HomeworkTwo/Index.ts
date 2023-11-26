class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Area[] = [];
  _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(area: Area): void {
    const index = this._areas.indexOf(area);
    if (index !== -1) {
      this._areas.splice(index, 1);
    }
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: Lecturer): void {
    const index = this._lecturers.indexOf(lecturer);
    if (index !== -1) {
      this._lecturers.splice(index, 1);
    }
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }
}

class Lecturer {
  _name: string;
  _surname: string;
  _position: string;
  _company: string;
  _experience: number;
  _courses: string[];
  _contacts: string;

  constructor(
    name: string,
    surname: string,
    position: string,
    company: string,
    experience: number,
    courses: string[],
    contacts: string
  ) {
    this._name = name;
    this._surname = surname;
    this._position = position;
    this._company = company;
    this._experience = experience;
    this._courses = courses;
    this._contacts = contacts;
  }

  get name(): string {
    return this._name;
  }

  get surname(): string {
    return this._surname;
  }

  get position(): string {
    return this._position;
  }

  get company(): string {
    return this._company;
  }

  get experience(): number {
    return this._experience;
  }

  get courses(): string[] {
    return this._courses;
  }

  get contacts(): string {
    return this._contacts;
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Group[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(group: Group): void {
    const index = this._groups.indexOf(group);
    if (index !== -1) {
      this._groups.splice(index, 1);
    }
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: Area;
  _status: string;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  _directionName: string;
  _levelName: string;

  constructor(directionName: string, levelName: string) {
    this._directionName = directionName;
    this._levelName = levelName;
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.sort(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    const index = this._students.indexOf(student);
    if (index !== -1) {
      this._students.splice(index, 1);
    }
  }

  setStatus(status: string): void {
    this._status = status;
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: { [workName: string]: number } = {}; // workName: mark
  _visits: boolean[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(workName: string, mark: number): void {
    this._grades[workName] = mark;
  }

  setVisit(lesson: number, present: boolean): void {
    this._visits[lesson] = present;
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage =
      (Object.values(this._visits).filter((present) => present).length /
        this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
