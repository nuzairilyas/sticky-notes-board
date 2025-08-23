document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notesContainer');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const colorModal = document.getElementById('colorModal');
    const closeModal = colorModal.querySelector('.close');
    const colorOptions = colorModal.querySelectorAll('.color-option');
    let selectedColor = '#ffd700'; // Default color

    // Load notes from local storage
    loadNotes();

    // Add note button click event
    addNoteBtn.addEventListener('click', () => {
        openColorModal();
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        colorModal.style.display = 'none';
    });

    // Color option click event
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectedColor = option.getAttribute('data-color');
            createNote();
            colorModal.style.display = 'none';
        });
    });

    // Create a new note
    function createNote() {
        const note = document.createElement('div');
        note.classList.add('note', 'new');
        note.style.backgroundColor = selectedColor;

        const noteContent = document.createElement('textarea');
        noteContent.classList.add('note-content');
        noteContent.placeholder = 'Write your note here...';

        const noteActions = document.createElement('div');
        noteActions.classList.add('note-actions');

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('note-btn', 'delete-btn');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', () => {
            notesContainer.removeChild(note);
            saveNotes();
        });

        noteActions.appendChild(deleteBtn);
        note.appendChild(noteContent);
        note.appendChild(noteActions);
        notesContainer.appendChild(note);

        noteContent.addEventListener('input', saveNotes);
        saveNotes();
    }

    // Load notes from local storage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.style.backgroundColor = note.color;

            const noteContent = document.createElement('textarea');
            noteContent.classList.add('note-content');
            noteContent.value = note.content;

            const noteActions = document.createElement('div');
            noteActions.classList.add('note-actions');

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('note-btn', 'delete-btn');
            deleteBtn.innerHTML = '&times;';
            deleteBtn.addEventListener('click', () => {
                notesContainer.removeChild(noteElement);
                saveNotes();
            });

            noteActions.appendChild(deleteBtn);
            noteElement.appendChild(noteContent);
            noteElement.appendChild(noteActions);
            notesContainer.appendChild(noteElement);

            noteContent.addEventListener('input', saveNotes);
        });
    }

    // Save notes to local storage
    function saveNotes() {
        const notes = [];
        document.querySelectorAll('.note').forEach(note => {
            const content = note.querySelector('.note-content').value;
            const color = note.style.backgroundColor;
            notes.push({ content, color });
        });
        localStorage.setItem('stickyNotes', JSON.stringify(notes));
    }

    // Open color modal
    function openColorModal() {
        colorModal.style.display = 'block';
    }
});
