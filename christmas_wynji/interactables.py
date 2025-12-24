import pygame
import random
from details import *

class Present:
    def __init__(self, x, y, width, height, color):
        self.rect = pygame.Rect(x, y, width, height)
        self.color = color
        self.ribbon_color = GOLD
        self.is_opened = False
        self.shake_timer = 0
        self.offset_x = 0
        
        # Message/surprise contained (placeholder)
        self.message = "Surprise!"
        
        # Unwrapping animation
        self.lid_offset_y = 0
        self.target_lid_offset = -30
        self.alpha = 255

    def click(self):
        # Trigger open or shake
        if not self.is_opened:
            self.is_opened = True
            # Play sound effect (future)

    def update(self, dt):
        if self.is_opened:
            # Animate lid popping off
            if self.lid_offset_y > self.target_lid_offset:
                self.lid_offset_y -= 60 * dt # Move up
            
            # Fade out box logic could go here
            
        # Shake effect (if we want it to shake on hover or click attempt)
        if self.shake_timer > 0:
            self.shake_timer -= dt
            self.offset_x = random.randint(-2, 2)
        else:
            self.offset_x = 0

    def draw(self, screen):
        # Draw Box Body
        body_rect = pygame.Rect(self.rect.x + self.offset_x, self.rect.y + 10, self.rect.width, self.rect.height - 10)
        pygame.draw.rect(screen, self.color, body_rect)
        
        # Draw Vertical Ribbon
        center_x = body_rect.x + body_rect.width // 2
        pygame.draw.rect(screen, self.ribbon_color, (center_x - 5, body_rect.y, 10, body_rect.height))
        
        # Draw Lid (which animates up)
        lid_y = self.rect.y + self.lid_offset_y
        lid_rect = pygame.Rect(self.rect.x - 2 + self.offset_x, lid_y, self.rect.width + 4, 15)
        pygame.draw.rect(screen, self.color, lid_rect)
        pygame.draw.rect(screen, self.ribbon_color, (center_x - 5, lid_rect.y, 10, lid_rect.height))
        
        # Draw Bow
        if not self.is_opened: # Hide bow if "popped" or move interactions
            pygame.draw.rect(screen, self.ribbon_color, (center_x - 10, lid_rect.y - 5, 20, 5)) 

        # If opened, maybe show a hint of what's inside floating up?
        if self.is_opened and self.lid_offset_y <= self.target_lid_offset:
            # Draw a particle or heart rising
            pass

class LoveLetter:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.width = 60
        self.height = 40
        self.state = "closed" # closed, opening, open, closing
        self.anim_timer = 0
        self.scroll_y = 0
        
        # Envelope geometry
        self.envelope_rect = pygame.Rect(x, y, self.width, self.height)
        
        # Letter Content
        self.lines = [
            "My Dearest Wynji,",
            "",
            "We met on October 8,",
            "and look at us now.",
            "My love for you grows",
            "more and more day by day.",
            "",
            "You are my star,",
            "my joy, and my heart.",
            "",
            "Merry Christmas! 🎄",
            "",
            "Love always,",
            "Your Secret Santa ❤️"
        ]
        
    def click(self, mx, my):
        if self.state == "closed":
            if self.envelope_rect.collidepoint(mx, my):
                self.state = "opening"
                return True
        elif self.state == "open":
            # Click anywhere to close or specific X button
            # For now, simplistic toggle or check close button
            # Check for close button in top right of paper
            paper_rect = pygame.Rect(SCREEN_WIDTH // 2 - 150, 100, 300, 400)
            if not paper_rect.collidepoint(mx, my):
                 self.state = "closing"
            return True
        return False

    def update(self, dt):
        if self.state == "opening":
            self.anim_timer += dt
            if self.anim_timer > 1.0:
                self.state = "open"
                self.anim_timer = 0
        elif self.state == "closing":
            self.anim_timer += dt
            if self.anim_timer > 0.5:
                self.state = "closed"
                self.anim_timer = 0

    def draw(self, screen):
        # Draw Envelope Icon (if closed or animating)
        if self.state == "closed" or self.state == "opening" or self.state == "closing":
            # Draw envelope body
            pygame.draw.rect(screen, SNOW_WHITE, self.envelope_rect)
            pygame.draw.rect(screen, RED, self.envelope_rect, 2)
            # Draw flap (simple lines)
            pygame.draw.line(screen, RED, (self.x, self.y), (self.x + self.width//2, self.y + self.height//2), 2)
            pygame.draw.line(screen, RED, (self.x + self.width, self.y), (self.x + self.width//2, self.y + self.height//2), 2)
            
            # Label
            font = pygame.font.SysFont(FONT_NAME, 14)
            lbl = font.render("For You", True, RED)
            screen.blit(lbl, (self.x + 5, self.y + self.height + 5))

        # Draw Open Letter Overlay
        if self.state == "open" or (self.state == "opening" and self.anim_timer > 0.5) or self.state == "closing":
            # Calculate scale/alpha based on animation
            scale = 1.0
            if self.state == "opening":
                scale = min(1.0, (self.anim_timer - 0.5) * 2)
            
            # Paper background (centered)
            # We'll just pop it in for simplicity of 'draw_rect', doing full transform is complex in pygame without surfaces
            if scale > 0:
                paper_w, paper_h = 300, 400
                px = SCREEN_WIDTH // 2 - paper_w // 2
                py = 100
                paper_rect = pygame.Rect(px, py, paper_w, paper_h)
                
                # Shadow
                pygame.draw.rect(screen, (50, 50, 50), (px+5, py+5, paper_w, paper_h))
                # Paper
                pygame.draw.rect(screen, (255, 250, 240), paper_rect) # FloralWhite
                
                # Text
                font = pygame.font.SysFont(FONT_NAME, 20)
                y_off = 40
                for line in self.lines:
                    surf = font.render(line, True, BLACK)
                    screen.blit(surf, (px + 40, py + y_off))
                    y_off += 30
                
                # Decorations on paper
                pygame.draw.rect(screen, RED, paper_rect, 2)
                
                # Heart
                pygame.draw.circle(screen, RED, (px + paper_w // 2, py + paper_h - 40), 10)
