# 📌 Sticky Notes Board

A lightweight, interactive, and responsive web application for creating, managing, and persisting sticky notes. Built using modern web technologies (**HTML5**, **CSS3 with Glassmorphism & CSS Grid**, and **Vanilla JavaScript**), this project provides an intuitive board interface with customizable note color schemes and instant local persistence.

---

## 🚀 Features

- **🎨 Customizable Color Palettes**: Choose from 5 distinct note colors (Gold, Coral Red, Turquoise, Sky Blue, Soft Sage) via a modal picker when creating notes.
- **💾 Local Persistence**: Automatically saves all notes (content and color) to the browser's `localStorage` in real-time. Notes persist across browser sessions and reloads.
- **✨ Modern UI & Glassmorphism Aesthetics**: Modern UI featuring dynamic gradient background, glassmorphism header navigation, responsive layout grid, hover tilt animations, and smooth entry keyframes.
- **⚡ Instant Real-Time Editing**: Edit note content effortlessly with seamless continuous text auto-save on input.
- **📱 Fully Responsive**: Uses CSS Grid (`repeat(auto-fill, minmax(250px, 1fr))`) and flexbox media queries to adapt to desktop, tablet, and mobile displays.

---

## 🎨 User Interface

The application interface consists of three primary visual layers:

### 1. Header & Navigation (Glassmorphic Top Bar)
- **Title**: Styled with a drop shadow over a vibrant backdrop gradient (`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`).
- **Action Control**: Gradient `+ Add Note` button (`linear-gradient(45deg, #ff6b6b, #ee5a24)`) with hover elevation and box-shadow depth.

### 2. Sticky Notes Grid
- **Dynamic Layout**: Flexible Grid layout supporting automatic reflow based on view width.
- **Interactive Sticky Cards**:
  - Floating 3D card style with rounded corners and subtle drop shadows.
  - Micro-animations: On hover, cards smoothly elevate (`translateY(-5px)`) and tilt slightly (`rotate(1deg)`).
  - Entry animation: New notes animate into view using `@keyframes slideIn`.
- **Note Actions**: Hover-revealed delete action button (`×`) tucked smoothly into the bottom right corner of each card.

### 3. Color Selection Modal
- **Overlay**: Backdrop blur (`backdrop-filter: blur(5px)`) modal overlay.
- **Palette Controls**: Interactive circular swatch buttons representing available color themes:
  - 💛 Yellow Gold (`#ffd700`)
  - ❤️ Coral Red (`#ff6b6b`)
  - 💚 Turquoise (`#4ecdc4`)
  - 💙 Sky Blue (`#45b7d1`)
  - 🌿 Soft Sage (`#96ceb4`)

---

## 🏗️ System Architecture

The application is structured as a client-side Single Page Application (SPA) following a modular event-driven Architecture.

```mermaid
flowchart TD
    subgraph UI ["User Interface Layer (HTML5 & CSS3)"]
        H[Header Bar & Add Note Button]
        M[Color Picker Modal Window]
        NG[Notes Container Grid]
        N[Sticky Note Cards & Textareas]
    end

    subgraph Controller ["Application Controller (JavaScript / DOM Engine)"]
        EL[Event Listeners DOMContentLoaded / Click / Input]
        CM[Create Note Engine]
        DM[Delete Note Handler]
        SM[Color Modal Manager]
    end

    subgraph Storage ["Persistence Layer (Browser Context)"]
        LS[(Browser localStorage: 'stickyNotes')]
    end

    %% User Interactions
    H -->|Click '+ Add Note'| SM
    SM -->|Open Modal| M
    M -->|Select Color Swatch| CM
    N -->|Input Text Event| EL
    N -->|Click Delete Button| DM

    %% Data Flow & Persistence
    EL -->|Trigger saveNotes()| LS
    CM -->|Instantiate & Append DOM| NG
    CM -->|Trigger saveNotes()| LS
    DM -->|Remove DOM Element & saveNotes()| LS
    LS -->|loadNotes() on Page Load| CM
```

### Data Flow Lifecycle

1. **Initialization (`DOMContentLoaded`)**:
   - `loadNotes()` executes immediately, querying `localStorage.getItem('stickyNotes')`.
   - Parsed note objects (`{ content: string, color: string }[]`) are iterated over to dynamically construct and populate DOM cards.

2. **Creation Flow**:
   - Clicking `+ Add Note` triggers `openColorModal()`.
   - Selecting a color swatch captures `data-color`, sets `selectedColor`, closes the modal, and calls `createNote()`.
   - A new note element with textarea and delete action is constructed, appended to `#notesContainer`, and initialized with the `slideIn` CSS animation.

3. **Modification & Persistence**:
   - Typing inside any note's `<textarea>` fires an `input` event listener connected directly to `saveNotes()`.
   - `saveNotes()` scans all `.note` elements on the board, extracts current text and background color, and serializes the array into `localStorage.setItem('stickyNotes', JSON.stringify(notes))`.

4. **Deletion Flow**:
   - Clicking a note's delete (`×`) button removes the specific note DOM node from `#notesContainer` and triggers `saveNotes()` to update local storage.

### File & Directory Structure

```text
sticky-notes-board/
├── index.html        # Semantic HTML5 markup, container, and modal structural layout
├── style.css         # Styling, design tokens, Glassmorphism, animations, grid layout
├── script.js        # Controller logic, event handling, DOM manipulation, storage engine
└── README.md         # Documentation
```

---

## 🏃 How to Run

Since the Sticky Notes Board is built entirely with client-side standards, no build steps, Node packages, or backend servers are strictly required.

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
If Python is installed on your machine, you can host a local server from the terminal:

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

* **HTML5**: Semantic tags (`<header>`, `<main>`, `<textarea>`, `<button>`).
* **CSS3**: Dynamic gradients, Glassmorphism styling, CSS Grid, Flexbox, custom `@keyframes`.
* **JavaScript (ES6+)**: DOM manipulation, template string rendering, Event delegation, `localStorage` API.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
