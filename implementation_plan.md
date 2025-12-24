# Implementation Plan: Merry Christmas Wynji Animation

# Goal Description
Build a heartwarming, interactive Christmas animation experience for Wynji using Python and Pygame, capable of running in a web browser via WebAssembly (Pygbag). The goal is to create a personal, magical gift with hidden surprises and romantic messages.

## User Review Required
> [!IMPORTANT]
> **Assets**: I will use procedural drawing for most graphics (trees, ornaments, snow) to keep the project self-contained and ensure it runs immediately without needing external image files initially. I can add support for loading external photos for the "Photo Gallery" if you provide paths later.

> [!NOTE]
> **Music/Audio**: I will implement the *system* for audio, but I cannot generate actual MP3 files. I will leave placeholders or use basic synthesized sounds if possible, or instructions on where to place your chosen songs.

## Proposed Changes

### Structure
I will create a modular project structure to keep code clean and manageable.

```text
christmas_wynji/
├── assets/             # Directory for images/sounds (initially empty/placeholders)
├── main.py             # Entry point, game loop, and state management
├── details.py          # Constants, configuration (Colors, Screen dims)
├── background.py       # Sky, Moon, Stars classes
├── snow.py             # Snowfall particle system
├── tree.py             # Christmas Tree and Decorations drawing logic
├── interactables.py    # Classes for clickable objects (LoveLetter, Presents)
└── text_effects.py     # Animated text renderer
```

### 1. Core Engine (`main.py`)
- Initialize Pygame.
- specialized "Game" class to manage state (Intro, Explore, LetterOpen, Finale).
- Async game loop (required for Pygbag/WebAssembly).

### 2. Visual Components
#### `snow.py`
- `Snowflake` class: x, y, speed, size, drift.
- Update loop to reset flakes at top when they go off-screen.

#### `tree.py`
- Procedurally drawn pine tree using polygons.
- `Light` class: animating color/brightness.
- `Ornament` class: physics-based swinging on click.

#### `background.py`
- Dark gradient sky.
- `Moon` with glow.
- `ShootingStar` event system.

### 3. Interactivity (`interactables.py`)
- `InputManager`: centralized mouse/touch handling.
- `LoveLetter`:
    - State machine: Closed -> Opening -> Open (Reading) -> Closing.
    - Smooth interpolation for animations.
- `EasterEgg`:
    - Track key sequences (Konami code).
    - Track mouse gestures (Heart shape).

### 4. Personalization (`text_effects.py`)
- Typewriter effect for messages.
- Fade-in/out logic.
- Custom font loading (or fallback system font).

## Verification Plan

### Automated Tests
- Since this is a visual/interactive project, automated unit tests are less critical than manual verification.
- I will run the script locally to verify:
    - 60 FPS performance.
    - No crashes on clicks.
    - Sound system initializes without error (even if no files).

### Manual Verification
- **Browser Output**: I will use `pygbag` to build the web version and confirm it loads in a local browser context.
- **Interactions**:
    - Click every ornament.
    - Open the letter.
    - Wait for timed events.
