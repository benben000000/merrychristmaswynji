import pygame
import random
from details import *

class Snowflake:
    def __init__(self):
        self.reset(random_y=True)

    def reset(self, random_y=False):
        self.x = random.randint(0, SCREEN_WIDTH)
        self.y = random.randint(0, SCREEN_HEIGHT) if random_y else -10
        self.size = random.randint(2, 5)
        self.speed = random.uniform(SNOW_SPEED_MIN, SNOW_SPEED_MAX)
        self.drift = random.uniform(-0.5, 0.5)
        self.angle = random.uniform(0, 6.28)

    def update(self, dt):
        self.y += self.speed
        self.x += self.drift
        self.angle += 0.05

        # Reset if off screen
        if self.y > SCREEN_HEIGHT + 10:
            self.reset()
        
        # Wrap around x
        if self.x < -10:
            self.x = SCREEN_WIDTH + 10
        elif self.x > SCREEN_WIDTH + 10:
            self.x = -10

    def draw(self, screen):
        pygame.draw.circle(screen, SNOW_WHITE, (int(self.x), int(self.y)), self.size)

class SnowController:
    def __init__(self, count=100):
        self.flakes = [Snowflake() for _ in range(count)]

    def update(self, dt):
        for flake in self.flakes:
            flake.update(dt)

    def draw(self, screen):
        for flake in self.flakes:
            flake.draw(screen)
