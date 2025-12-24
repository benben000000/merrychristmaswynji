import pygame
from details import *

class TextRenderer:
    def __init__(self):
        self.font_title = pygame.font.SysFont(FONT_NAME, FONT_SIZE_TITLE, bold=True)
        self.font_msg = pygame.font.SysFont(FONT_NAME, FONT_SIZE_MSG)
        
        self.messages = [] # List of active messages
        self.title_surf = None
        self.title_alpha = 0
        
    def show_title(self, text):
        self.title_surf = self.font_title.render(text, True, GOLD)
        self.title_alpha = 0
        
    def add_message(self, text, duration=3, color=WHITE, y_pos=None):
        # Simple message struct: text, timer, alpha, y
        if y_pos is None:
            y_pos = SCREEN_HEIGHT // 2
            
        surf = self.font_msg.render(text, True, color)
        self.messages.append({
            'surf': surf,
            'timer': duration,
            'alpha': 255,
            'x': SCREEN_WIDTH // 2 - surf.get_width() // 2,
            'y': y_pos
        })

    def update(self, dt):
        # Fade in title
        if self.title_alpha < 255:
            self.title_alpha += 100 * dt
            if self.title_alpha > 255: self.title_alpha = 255
            
        # Update messages
        for msg in self.messages[:]:
            msg['timer'] -= dt
            if msg['timer'] < 1: # Start fading out last second
                msg['alpha'] = int(255 * msg['timer'])
            
            if msg['timer'] <= 0:
                self.messages.remove(msg)

    def draw(self, screen):
        # Draw Title
        if self.title_surf:
            # Need to handle alpha blitting manually usually, but for simple text:
            # Create a copy with alpha
            temp_surf = self.title_surf.copy()
            temp_surf.set_alpha(int(self.title_alpha))
            screen.blit(temp_surf, (SCREEN_WIDTH // 2 - temp_surf.get_width() // 2, 50))
            
        # Draw Messages
        for msg in self.messages:
            temp_surf = msg['surf'].copy()
            temp_surf.set_alpha(msg['alpha'])
            screen.blit(temp_surf, (msg['x'], msg['y']))
