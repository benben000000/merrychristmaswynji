# Merry Christmas, Wynji! 🎄

A special interactive Christmas animation built with Python and Pygame.

## How to Run Locally

1. **Install Dependencies**
   Ensure you have Python installed. Then install `pygame`:
   ```bash
   pip install pygame pygbag
   ```

2. **Run the Animation**
   Navigate to the project directory and run:
   ```bash
   python christmas_wynji/main.py
   ```

## Controls & Secrets

### Basic Interactions
- **Ornaments**: Click them to make them swing!
- **Presents**: Click the presents under the tree to unwrap them. One might hold a special surprise...
- **Star**: The star on top of the tree looks special. Maybe give it a click?
- **Envelope**: Click the envelope to read a special letter.

### Hidden Easter Eggs
- **Heart Mode**: Press **`H`** on your keyboard to show some love.
- **Finale**: Press **`F`** to trigger the grand fireworks finale.
- **Konami Code**: Can you recall the classic cheat code? (`Up, Up, Down, Down, Left, Right, Left, Right, B, A`) - Try entering it for a fun surprise!

## How to Put on the Web (for Wynji)

To share this with Wynji as a web link, you can use `pygbag` to convert it to WebAssembly.

1. **Build for Web**
   From the parent folder (containing the `christmas_wynji` folder), run:
   ```bash
   pygbag christmas_wynji
   ```

2. **Test**
   It will start a local server (usually `localhost:8000`). Open that in your browser to test.

3. **Deploy to GitHub Pages**
   - The build output is in `build/web`.
   - Upload the contents of `build/web` to a GitHub repository.
   - Enable GitHub Pages for that repository.
   - Send the link to Wynji!

---
*Created with ❤️*
