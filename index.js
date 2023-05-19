let addTitle = document.querySelector("#addTitle");
let addText = document.querySelector("#addText");
let addBtn = document.querySelector("#addNoteBtn");
let notesDiv = document.getElementById("notes");
let NotesSection = document.querySelector("#all-notes");
let archiveDiv = document.getElementById("archive");
let archiveSection = document.querySelector("#archiveBtn");
let deletedDiv = document.getElementById("deletedNotes");
let deletedNotesSection = document.getElementById("delete");


window.addEventListener("load", () => {
  displayNotes();
  notesDiv.style.display = "flex";
  archiveDiv.style.display = "none";
  deletedDiv.style.display = "none";
});

NotesSection.addEventListener("click", () => {
  displayNotes();
  notesDiv.style.display = "flex";
  archiveDiv.style.display = "none";
  deletedDiv.style.display = "none";

  NotesSection.style.opacity = 0.8;
  deletedNotesSection.style.opacity = 1;
  archiveSection.style.opacity = 1;
});

archiveSection.addEventListener("click", () => {
  showArchiveNotes();
  notesDiv.style.display = "none";
  archiveDiv.style.display = "flex";
  deletedDiv.style.display = "none";

  archiveSection.style.opacity = 0.8;
  NotesSection.style.opacity = 1;
  deletedNotesSection.style.opacity = 1;
});

deletedNotesSection.addEventListener("click", () => {
  displayDeletedNotes();
  notesDiv.style.display = "none";
  archiveDiv.style.display = "none";
  deletedDiv.style.display = "flex";

  deletedNotesSection.style.opacity = 0.8;
  archiveSection.style.opacity = 1;
  NotesSection.style.opacity = 1;
});

const addNotes = () => {
  let notes = localStorage.getItem("notes");

  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }

  const title = addTitle.value;
  const text = addText.value;
  if (text === "") {
    alert("add note field should not be empty");
    return;
  }

  const notesObj = {
    title: title,
    text: text,
  };

  notes.push(notesObj);
  localStorage.setItem("notes", JSON.stringify(notes));

  addTitle.value = "";
  addText.value = "";

  displayNotes();
};

function displayNotes() {
  let notesHTML = "";
  let notes = localStorage.getItem("notes");

  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }

  for (let i = 0; i < notes.length; i++) {
    notesHTML += `<div class="note">
                <div class="title">${
                  notes[i].title == "" ? "note" : notes[i].title
                }</div>
                <div class="text">${notes[i].text}</div>
                <button class="archiveNote" id=${i} onclick="archiveNote(${i})">Archive</button>
                <button class="deleteNote" id=${i} onclick="deleteNote(${i})" ><img src="./del.svg"></button>
                </div>
                `;
  }

  notesDiv.innerHTML = notesHTML;
}

//archive notes section
function archiveNote(ind) {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  let archiveNotes = localStorage.getItem("archiveNotes");
  if (archiveNotes === null) {
    archiveNotes = [];
  } else {
    archiveNotes = JSON.parse(archiveNotes);
  }
  archiveNotes.push(notes[ind]);
  localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));
  notes.splice(ind, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
  showArchiveNotes();
}

function showArchiveNotes() {
  let archiveNotesHTML = "";
  let archiveNotes = localStorage.getItem("archiveNotes");
  if (archiveNotes === null) {
    return "No item";
  } else {
    archiveNotes = JSON.parse(archiveNotes);
  }
  for (let i = 0; i < archiveNotes.length; i++) {
    archiveNotesHTML += `<div class="note">
                            <span class="title">${
                              archiveNotes[i].title === ""
                                ? "Note"
                                : archiveNotes[i].title
                            }</span>
                            <div class="text">${archiveNotes[i].text}</div>
                            <button class="deleteNote" id=${i} onclick="deleteArchiveNotes(${i})"><img src="./del.svg"></i></button>
                            <button class="undoNote" id=${i} onclick="undoArchiveNotes(${i})">Unarchive</button>
                        </div>`;
  }
  archiveDiv.innerHTML = archiveNotesHTML;
}

const deleteArchiveNotes = (index) => {
  let archiveNotes = localStorage.getItem("archiveNotes");
  let deletedNotes = localStorage.getItem("deletedNotes");
  if (archiveNotes === null) {
    return;
  } else {
    archiveNotes = JSON.parse(archiveNotes);
  }

  if (deletedNotes === null) {
    deletedNotes = [];
  } else {
    deletedNotes = JSON.parse(deletedNotes);
  }

  deletedNotes.push(archiveNotes[index]);
  localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));

  archiveNotes.splice(index, 1);
  localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));

  showArchiveNotes();
};

function undoArchiveNotes(ind) {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  let archiveNotes = localStorage.getItem("archiveNotes");
  if (archiveNotes === null) {
    return;
  } else {
    archiveNotes = JSON.parse(archiveNotes);
  }
  notes.push(archiveNotes[ind]);
  localStorage.setItem("notes", JSON.stringify(notes));
  archiveNotes.splice(ind, 1);
  localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));
  showArchiveNotes();
}

const deleteNote = (index) => {
  let notes = localStorage.getItem("notes");
  let deletedNotes = localStorage.getItem("deletedNotes");
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }

  if (deletedNotes === null) {
    deletedNotes = [];
  } else {
    deletedNotes = JSON.parse(deletedNotes);
  }

  deletedNotes.push(notes[index]);
  notes.splice(index, 1);

  localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
};

const displayDeletedNotes = () => {
  let deletedHTML = "";

  let deletedNotes = localStorage.getItem("deletedNotes");
  if (deletedNotes === null) {
    return;
  } else {
    deletedNotes = JSON.parse(deletedNotes);
  }

  console.log("show data", deletedNotes);

  for (let i = 0; i < deletedNotes.length; i++) {
    deletedHTML += `<div class="note">
                <div class="title">${
                  deletedNotes[i].title == "" ? "note" : deletedNotes[i].title
                }</div>
                <div class="text">${deletedNotes[i].text}</div>
                <button class="restoreNote" id=${i} onclick="restoreTrashNotes(${i})">Restore</button>
                <button class="deleteNote" id=${i} onclick="deleteBinNotes(${i})" ><img src="./del.svg"></button>
                </div>
                `;
  }

  deletedDiv.innerHTML = deletedHTML;
};

function restoreTrashNotes(index) {
  let deletedNotes = localStorage.getItem("deletedNotes");
  let notes = localStorage.getItem("notes");
  if (deletedNotes === null) {
    return;
  } else {
    deletedNotes = JSON.parse(deletedNotes);
  }
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  notes.push(deletedNotes[index]);
  localStorage.setItem("notes", JSON.stringify(notes));
  deletedNotes.splice(index, 1);
  localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
  displayDeletedNotes();
  displayNotes();
}

const deleteBinNotes = (index) => {
  let deletedNotes = localStorage.getItem("deletedNotes");
  if (deletedNotes === null) {
    return;
  } else {
    deletedNotes = JSON.parse(deletedNotes);
  }

  deletedNotes.splice(index, 1);
  localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
  displayDeletedNotes();
};

addBtn.addEventListener("click", addNotes);
