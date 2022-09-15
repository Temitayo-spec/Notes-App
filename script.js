const addBox = document.querySelector(".add__box"),
  popupBox = document.querySelector(".modal__bx"),
  popupTitle = document.querySelector("header p"),
  closeIcon = document.querySelector("b"),
  titleInput = document.querySelector("input"),
  descInput = document.querySelector("textarea"),
  form = document.querySelector("form"),
  addBtn = document.querySelector(".add__btn"),
  deleteBtn = document.querySelector(".delete"),
  cancelBtn = document.querySelector(".cancel"),
  deleteModal = document.querySelector(".delete__modal__ctn");

const notes = JSON.parse(localStorage.getItem("notes")) || [];

let isUpdating = false,
  updateId,
  noteID;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const showNotes = () => {
  document.querySelectorAll(".note__ctn").forEach((note) => note.remove());

  notes.forEach((note, index) => {
    let output = `
        <div class="note__ctn">
        <div class="details">
          <p>${note.title}</p>
          <span
            >${note.description}</span
          >
        </div>
        <div class="bottom__ctn">
          <span>${note.date}</span>
          <div class="settings">
            <div onclick="showMenu(this)" class="drop__icon">...</div>
            <ul class="menu">
              <li onclick="updateNote('${index}', '${note.title}', '${note.description}')">Edit</li>
              <li onclick="deleteNote('${index}')">Delete</li>
            </ul>
          </div>
        </div>
      </div>
        `;
    addBox.insertAdjacentHTML("afterend", output);
  });
};

showNotes();

const showMenu = (elem) => {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
};

const updateNote = (id, noteTitle, noteDesc) => {
  isUpdating = true;
  updateId = id;
  addBox.click();
  addBtn.textContent = "Update Note";
  popupTitle.textContent = "Update a Note";
  titleInput.value = noteTitle;
  descInput.value = noteDesc;
};

const deleteNote = (noteId) => {
  deleteModal.classList.add("show__delete");
  noteID = noteId;
};

deleteBtn.addEventListener("click", () => {
  notes.splice(noteID, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  deleteModal.classList.remove("show__delete");
  showNotes();
});

cancelBtn.addEventListener("click", () => {
  deleteModal.classList.remove("show__delete");
  noteID;
});

addBox.addEventListener("click", () => {
  titleInput.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
  addBtn.textContent = "Add Note";
  popupTitle.textContent = "Add a new Note";
  titleInput.value = "";
  descInput.value = "";
  isUpdating = false;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let noteTitle = titleInput.value,
    noteDesc = descInput.value;

  if (noteTitle || noteDesc) {
    let date = new Date(),
      month = months[date.getMonth()],
      day = date.getDate(),
      year = date.getFullYear();

    let noteContent = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };

    if (!isUpdating) {
      notes.push(noteContent);
    } else {
      isUpdating = false;
      notes[updateId] = noteContent;
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
