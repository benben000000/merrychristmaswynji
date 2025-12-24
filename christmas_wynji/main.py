import asyncio
import pygame
import sys
from details import *
import snow
import background
import tree 
import interactables
import interactables
import text_effects
import effects

async def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption(TITLE)
    clock = pygame.time.Clock()

    # Initialize Components
    bg = background.Background()
    snow_controller = snow.SnowController(count=80)
    game_tree = tree.ChristmasTree(SCREEN_WIDTH, SCREEN_HEIGHT)
    text_renderer = text_effects.TextRenderer()
    
    # Active Effects List
    active_effects = []
    
    # Konami Code
    konami_code = [pygame.K_UP, pygame.K_UP, pygame.K_DOWN, pygame.K_DOWN, 
                   pygame.K_LEFT, pygame.K_RIGHT, pygame.K_LEFT, pygame.K_RIGHT, 
                   pygame.K_b, pygame.K_a]
    konami_index = 0

    # Initial Greeting
    text_renderer.show_title("Merry Christmas, Wynji! 🎄")
    text_renderer.add_message("You make every day feel like Christmas", duration=5, y_pos=SCREEN_HEIGHT//2 + 50)
    
    love_letter = interactables.LoveLetter(SCREEN_WIDTH - 80, 25)
    
    presents = [
        interactables.Present(SCREEN_WIDTH // 2 - 70, SCREEN_HEIGHT - 50, 40, 40, RED),
        interactables.Present(SCREEN_WIDTH // 2 + 30, SCREEN_HEIGHT - 50, 40, 40, GOLD),
        interactables.Present(SCREEN_WIDTH // 2 - 20, SCREEN_HEIGHT - 40, 40, 30, (34, 139, 34)) # Green
    ]

    running = True
    while running:
        dt = clock.tick(FPS) / 1000.0  # Delta time in seconds

        # Event Handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            if event.type == pygame.KEYDOWN:
                # Easter Egg: 'H' for Hearts
                if event.key == pygame.K_h:
                    active_effects.append(effects.HeartEffect(SCREEN_WIDTH//2, SCREEN_HEIGHT//2))
                    text_renderer.add_message("Heart U! ❤️", duration=2, color=(255, 105, 180))
                
                # Easter Egg: 'F' for Fireworks (Finale)
                if event.key == pygame.K_f:
                    active_effects.append(effects.Firework(random.randint(100, 700), random.randint(100, 400)))
                
                # Konami Code Check
                if event.key == konami_code[konami_index]:
                    konami_index += 1
                    if konami_index == len(konami_code):
                        # Konami Code Success!
                        text_renderer.add_message("GOD MODE ACTIVATED! (Just Kidding, I Love You!)", duration=4, color=GOLD)
                        for _ in range(5):
                            active_effects.append(effects.Firework(random.randint(100, 700), random.randint(100, 400)))
                        konami_index = 0
                else:
                    konami_index = 0

            # Interactable clicks (Phase 3 foundation)
            if event.type == pygame.MOUSEBUTTONDOWN:
                mx, my = pygame.mouse.get_pos()
                
                # Check Love Letter (Priority)
                if love_letter.click(mx, my):
                    pass # Handled
                
                # Only check others if letter is not open (modal behavior)
                elif love_letter.state != "open":
                    # Check Presents
                    for i, p in enumerate(presents):
                        if p.rect.collidepoint(mx, my):
                            if not p.is_opened:
                                p.click()
                                if i == 2: # Green Present -> Photo Gallery
                                    text_renderer.add_message("Photo Gallery Unlocked! 📸", duration=3, color=GOLD)
                                    # FUTURE: Open photo overlay
                    
                    # Check Ornaments and Star
                    result = game_tree.handle_click(mx, my)
                    if result == "star_clicked":
                        text_renderer.add_message("I love you, Wynji! ❤️", duration=4, color=(255, 182, 193))
                
            if event.type == pygame.MOUSEMOTION:
                mx, my = pygame.mouse.get_pos()
                game_tree.handle_hover(mx, my)

        # Updates
        bg.update(dt)
        snow_controller.update(dt)
        game_tree.update(dt)
        for p in presents:
            p.update(dt)
        love_letter.update(dt)
        love_letter.update(dt)
        text_renderer.update(dt)
        
        # Update Effects
        for eff in active_effects:
            eff.update(dt)
        active_effects = [e for e in active_effects if hasattr(e, 'particles') and len(e.particles) > 0] # Cleanup

        # Drawing
        bg.draw(screen)
        game_tree.draw(screen)
        for p in presents:
            p.draw(screen)
        snow_controller.draw(screen)
        text_renderer.draw(screen)
        love_letter.draw(screen)
        
        for eff in active_effects:
            eff.draw(screen)
        
        # UI / Text (Placeholder)
        # render_text(...)

        pygame.display.flip()
        
        # Asyncio sleep is required for pygbag (web assembly)
        await asyncio.sleep(0)

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        # Fallback for environments where asyncio.run might have issues or to catch crashes
        print(f"Error: {e}")
