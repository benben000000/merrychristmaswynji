import pygame
import random
import math
from details import *

class Particle:
    def __init__(self, x, y, color, speed, angle, size, decay=5):
        self.x = x
        self.y = y
        self.color = color
        self.vx = math.cos(angle) * speed
        self.vy = math.sin(angle) * speed
        self.size = size
        self.life = 255
        self.decay = decay
        self.gravity = 0.1

    def update(self, dt):
        self.x += self.vx
        self.y += self.vy
        self.vy += self.gravity
        self.life -= self.decay
        
    def draw(self, screen):
        if self.life > 0:
            s_surf = pygame.Surface((int(self.size*2), int(self.size*2)))
            s_surf.set_colorkey(BLACK)
            s_surf.set_alpha(int(self.life))
            pygame.draw.circle(s_surf, self.color, (int(self.size), int(self.size)), int(self.size))
            screen.blit(s_surf, (int(self.x - self.size), int(self.y - self.size)))

class Firework:
    def __init__(self, x, y, color=None):
        self.particles = []
        if color is None:
            color = random.choice([RED, GOLD, (0, 255, 0), (0, 0, 255), (255, 0, 255)])
        
        for i in range(50):
            angle = random.uniform(0, 6.28)
            speed = random.uniform(2, 6)
            self.particles.append(Particle(x, y, color, speed, angle, random.randint(2, 4)))

    def update(self, dt):
        for p in self.particles:
            p.update(dt)
        self.particles = [p for p in self.particles if p.life > 0]

    def draw(self, screen):
        for p in self.particles:
            p.draw(screen)

class HeartEffect:
    def __init__(self, x, y):
        self.particles = []
        for i in range(20):
             # Heart shape math roughly or just pink particles floating up
             angle = random.uniform(0, 6.28)
             speed = random.uniform(0.5, 2)
             # Pink/Red
             color = random.choice([(255, 192, 203), (255, 105, 180), RED]) 
             self.particles.append(Particle(x, y, color, speed, angle, random.randint(3, 5), decay=2))

    def update(self, dt):
        for p in self.particles:
            p.update(dt) 
            p.vy -= 0.2 # Float up
        self.particles = [p for p in self.particles if p.life > 0]

    def draw(self, screen):
        for p in self.particles:
            p.draw(screen)
