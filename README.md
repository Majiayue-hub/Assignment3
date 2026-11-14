# My Study Planner

A student study task management web application built with HTML, CSS and JavaScript for
Web Assignment 3.1.

## Project Description

My Study Planner helps a university student keep every assignment, revision task and
deadline in one place. The application has four pages:

| Page | Purpose |
|------|---------|
| `home.html` (index.html) | Introduction, image carousel, information about the app and the author |
| `taskmanager.html` | Login, add / edit / delete study tasks, validation, live clock |
| `blog.html` | Agile three-sprint project plan and two troubleshooting records |
| `ethics.html` | Reflection on ethics and privacy in web development |

Task data is saved in the browser with `localStorage`, so nothing is sent to a server and
the page keeps working without a network connection.

## File structure

```
Assignment3/
├── html/
│   ├── index.html          Home page
│   ├── taskmanager.html    Task manager (login + CRUD)
│   ├── blog.html           Project plan and troubleshooting blog
│   └── ethics.html         Ethics and privacy reflection
├── css/
│   └── style.css           Single shared stylesheet
├── js/
│   ├── script.js           Home page carousel
│   └── task.js             Login, validation, CRUD, clock
├── images/                 Carousel images, study photo, screenshots
└── README.md
```

## How to install and run

1. Download or clone the repository.
2. Open `html/index.html` in any modern browser (Chrome or Edge recommended).
3. No server, build step or dependency is required.

Optional: on Windows, run `python -m http.server 8000` inside the project folder and open
`http://localhost:8000/html/index.html`.

## How to use

1. **Home** – read the app description, use `Prev` / `Next` to move through three study images.
2. **Task Manager** – sign in with the demo account **student / info1012**.
   The task area is hidden until the login succeeds.
3. Add a task: fill in task title, course code, course name, due date, description and notes,
   then press **Save task**. Title, course code and due date are required; the due date must be
   `YYYY-MM-DD` and cannot be earlier than today.
4. Edit a task: press **Edit** in the table, change the fields, press **Save task** again.
5. Delete a task: press **Delete**, then confirm in the dialog. Deletion asks for
   confirmation because it cannot be undone.
6. The black bar under the task list shows the current date and time, updated every second.
7. **Blog** – read the three-sprint Agile plan and the two troubleshooting records.
8. **Ethics** – read the privacy and ethics reflection.

## Validation rules

- Task title, course code and due date are required.
- Task title must be at least three characters.
- Due date must match `YYYY-MM-DD` and must be a real date that is not in the past.
- Every user value is escaped before it is inserted into the table, so HTML typed into a
  field is displayed as text instead of being executed.

## Screenshots

| Screenshot | File |
|------------|------|
| Home page | `images/screen-home.jpg` |
| Task manager after login | `images/screen-tasks.jpg` |
| Blog page | `images/screen-blog.jpg` |
| Ethics page | `images/screen-ethics.jpg` |

## Development plan (Agile)

Three one-week sprints: structure and base styles, then carousel plus login and task form,
then full CRUD, validation, screenshots and documentation. Details and two real bug records
are documented on the blog page.

## Credits

Carousel and layout images are free stock photographs used for educational purposes only.
Code written by Ma Jiayue for Assignment 3.1.

## License

MIT License. This project is submitted for assessment and is not intended for commercial use.
