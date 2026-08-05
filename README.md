# 📌 Sticky Notes Board

A lightweight, interactive, and responsive web application for creating, managing, and persisting sticky notes. Built using modern web technologies (**HTML5**, **CSS3 with Glassmorphism & CSS Grid**, and **Vanilla JavaScript** using **Clean Modular Architecture**), this project provides an intuitive board interface with customizable note color schemes and instant local persistence.

---

## 🚀 Features

- **🎨 Customizable Color Palettes**: Choose from 5 distinct note colors (Gold, Coral Red, Turquoise, Sky Blue, Soft Sage) via a modal picker when creating notes.
- **💾 Local Persistence**: Automatically saves all notes (`id`, `content`, `color`, and `createdAt` timestamp) to the browser's `localStorage` in real-time. Notes persist across browser sessions and reloads.
- **✨ Modern UI & Glassmorphism Aesthetics**: Modern UI featuring dynamic gradient backdrop, glassmorphism header navigation, responsive layout grid, hover tilt animations, and smooth entry keyframes.
- **⚡ Instant Real-Time Editing**: Edit note content effortlessly with seamless continuous text auto-save on input.
- **📱 Fully Responsive**: Uses CSS Grid (`repeat(auto-fill, minmax(270px, 1fr))`) and flexbox media queries to adapt to desktop, tablet, and mobile displays.

---

## 🎨 User Interface

The application interface consists of three primary visual layers:

### 1. Header & Navigation (Glassmorphic Top Bar)
- **Title**: Styled with gradient text drop shadow over a vibrant backdrop gradient (`linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)`).
- **Action Control**: Gradient `+ Add Note` button (`linear-gradient(135deg, #6366f1 0%, #a855f7 100%)`) with hover elevation and box-shadow depth.

### 2. Sticky Notes Grid & Board
- **Dynamic Layout**: Flexible Grid layout supporting automatic reflow based on view width.
- **Interactive Sticky Cards**:
  - Floating 3D card style with rounded corners and subtle drop shadows.
  - Micro-animations: On hover, cards smoothly elevate (`translateY(-6px)`) and tilt slightly (`rotate(1deg)`).
  - Entry animation: New notes animate into view using `@keyframes slideIn`.
- **Note Actions**: Hover-revealed delete action button (`×`) tucked smoothly into the bottom right corner of each card.
- **Empty State Display**: User-friendly zero-state guidance displayed when no notes exist.

### 3. Color Selection Modal
- **Overlay**: Backdrop blur (`backdrop-filter: blur(10px)`) modal overlay.
- **Palette Controls**: Interactive circular swatch buttons with selection indicators representing available color themes:
  - 💛 Yellow Gold (`#ffd700`)
  - ❤️ Coral Red (`#ff6b6b`)
  - 💚 Turquoise (`#4ecdc4`)
  - 💙 Sky Blue (`#45b7d1`)
  - 🌿 Soft Sage (`#96ceb4`)

---

## 🏗️ System Architecture

The application is structured as a client-side Single Page Application (SPA) following a **Modular Layered Architecture** with strict separation of concerns between Data Services, Data Models, UI View Components, and Application Controllers.

```mermaid
flowchart TD
    subgraph View ["View Layer (HTML5 / CSS3 / Glassmorphism)"]
        H["Header & '+ Add Note' Button"]
        M["Color Picker Modal Window"]
        NG["Notes Container Grid"]
        N["Sticky Note Cards & Textareas"]
        E["Empty Board State Indicator"]
    end

    subgraph Controller ["Controller & Logic Layer (JavaScript ES6+)"]
        AC["AppController (App Orchestrator)"]
        MC["ModalController (Modal Manager)"]
        NC["NoteComponent (View Renderer)"]
    end

    subgraph Model ["Model Layer"]
        NM["NoteModel (ID, Content, Color, Timestamps)"]
    end

    subgraph Storage ["Persistence Service Layer"]
        SS["StorageService (localStorage Abstraction)"]
        LS[("Browser localStorage: 'stickyNotes'")]
    end

    %% User Actions
    H -->|Click '+ Add Note'| MC
    MC -->|Open Modal & Pick Swatch| AC
    AC -->|Instantiate Model| NM
    AC -->|Pass Model & Callbacks| NC
    NC -->|Render DOM Element| NG
    N -->|Input Text Event| AC
    N -->|Click Delete Button| AC

    %% Data Flow & Persistence
    AC -->|saveNotes(notes)| SS
    SS -->|setItem / getItem| LS
    LS -->|getNotes() on Load| SS
    SS -->|Initialize App State| AC
    AC -->|Toggle Empty State| E
```

### Data Flow Lifecycle

1. **Initialization (`DOMContentLoaded`)**:
   - `AppController.init()` executes, querying `StorageService.getNotes()`.
   - `StorageService` fetches and parses serialized note records from `localStorage.getItem('stickyNotes')`.
   - If notes exist, `NoteComponent.render()` constructs DOM elements for each note and appends them to `#notesContainer`. If empty, `#emptyState` is rendered.

2. **Creation Flow**:
   - Clicking `+ Add Note` invokes `ModalController.open()`.
   - Selecting a color swatch highlights the swatch and sets `selectedColor`.
   - Confirming choice triggers `AppController.addNote(color)`, generating a structured `NoteModel` entity (`{ id, content, color, createdAt }`).
   - `NoteComponent.render()` appends the new DOM note card with `slideIn` animation, and auto-saves state via `StorageService`.

3. **Modification & Persistence**:
   - Typing inside any note's `<textarea>` triggers an `input` callback handled by `AppController.updateNoteContent(id, content)`.
   - `StorageService.saveNotes()` serializes the updated notes array into `localStorage.setItem('stickyNotes', JSON.stringify(notes))`.

4. **Deletion Flow**:
   - Clicking a note's delete (`×`) button triggers `AppController.deleteNote(id, element)`.
   - The note is filtered out of memory, the DOM node is removed with smooth transition, and `StorageService` updates `localStorage`.

### File & Directory Structure

```text
sticky-notes-board/
├── index.html        # Semantic HTML5 markup, layout container, modal layout
├── style.css         # Styling, design tokens, Glassmorphism, animations, responsive grid
├── script.js         # Modular architecture: StorageService, NoteModel, NoteComponent, ModalController, AppController
└── README.md         # Comprehensive project architecture documentation
```

---

## 🏃 How to Run

Since the Sticky Notes Board is built entirely with client-side web standards, no build steps, Node packages, or backend servers are strictly required.

### Method 1: Direct File Launch (Quickest)
1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/sticky-notes-board.git
   ```
2. Navigate to the project folder.
3. Open `index.html` directly by double-clicking it or right-clicking and selecting **Open with** > **Google Chrome** (or Edge, Firefox, Safari).

---

### Method 2: VS Code Live Server Extension
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Extension ID `ritwickdey.LiveServer`).
3. Right-click `index.html` and select **Open with Live Server** (or click **Go Live** in the bottom status bar).
4. Access the web app in your browser at `http://127.0.0.1:5500`.

---

### Method 3: Python Local Server
If Python is installed on your machine, host a local server from the terminal:

```bash
# Navigate to the project directory
cd sticky-notes-board

# Python 3.x
python -m http.server 8000
```
Then open your browser and go to `http://localhost:8000`.

---

### Method 4: Node.js `npx serve`
If Node.js is installed on your system:

```bash
# Navigate to the project directory
cd sticky-notes-board

# Run local web server
npx serve .
```
Open the provided URL (e.g., `http://localhost:3000`).

---

## 🛠️ Built With

* **HTML5**: Semantic tags (`<header>`, `<main>`, `<dialog>`, `<button>`).
* **CSS3**: Dynamic gradients, Glassmorphism styling, CSS Grid, Flexbox, custom `@keyframes`.
* **JavaScript (ES6+)**: Clean Layered Architecture (`StorageService`, `NoteModel`, `NoteComponent`, `ModalController`, `AppController`), DOM manipulation, Event delegation, `localStorage` API.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
