import pygame
import random
from details import *

class Star:
    def __init__(self):
        self.x = random.randint(0, SCREEN_WIDTH)
        self.y = random.randint(0, SCREEN_HEIGHT // 2) # Stars mostly in top half
        self.brightness = random.randint(100, 255)
        self.flicker_speed = random.uniform(2, 5)
        self.timer = random.uniform(0, 6.28)

    def update(self, dt):
        self.timer += dt * self.flicker_speed
        # Sine wave for pulsating brightness
        import math
        val = math.sin(self.timer)
        # Map -1..1 to 100..255 roughly
        self.brightness = 180 + int(val * 75)
        
    def draw(self, screen):
        color = (self.brightness, self.brightness, self.brightness)
        # Small pixels for distance stars
        screen.set_at((int(self.x), int(self.y)), color)

class Background:
    def __init__(self):
        self.stars = [Star() for _ in range(100)]
        self.surface = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
        self.create_gradient()

    def create_gradient(self):
        # Create a vertical gradient from DARK_BLUE to MIDNIGHT_BLUE
        for y in range(SCREEN_HEIGHT):
            # Lerp factor
            t = y / SCREEN_HEIGHT
            r = int(DARK_BLUE[0] * (1-t) + MIDNIGHT_BLUE[0] * t)
            g = int(DARK_BLUE[1] * (1-t) + MIDNIGHT_BLUE[1] * t)
            b = int(DARK_BLUE[2] * (1-t) + MIDNIGHT_BLUE[2] * t)
            pygame.draw.line(self.surface, (r, g, b), (0, y), (SCREEN_WIDTH, y))

    def update(self, dt):
        for star in self.stars:
            star.update(dt)

    def draw(self, screen):
        screen.blit(self.surface, (0, 0))
        for star in self.stars:
            star.draw(screen)
        
        # Draw Moon (Static for now)
        pygame.draw.circle(screen, (255, 255, 220), (700, 80), 40) # Moon body
        pygame.draw.circle(screen, (255, 255, 220, 50), (700, 80), 45) # Moon glow 1
