import pygame
import random
from details import *

class Light:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.colors = [RED, GOLD, (0, 0, 255), (0, 255, 0)] # Red, Gold, Blue, Green
        self.color = random.choice(self.colors)
        self.timer = random.uniform(0, 1)
        self.interval = random.uniform(0.5, 1.5)
        self.on = True
        self.radius = 4

    def update(self, dt):
        self.timer += dt
        if self.timer > self.interval:
            self.timer = 0
            self.on = not self.on

    def draw(self, screen):
        if self.on:
            pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), self.radius)
            # Small glow
            pygame.draw.circle(screen, (self.color[0], self.color[1], self.color[2], 50), (int(self.x), int(self.y)), self.radius + 2)

class Ornament:
    def __init__(self, x, y):
        self.x = x
        self.origin_y = y
        self.y = y
        self.color = random.choice([RED, GOLD, (192, 192, 192), (255, 105, 180)]) # Silver, Pink
        self.radius = 8
        self.angle = 0
        self.angular_velocity = 0
        self.swinging = False

    def swing(self):
        self.swinging = True
        self.angular_velocity = 5 # Impulse

    def update(self, dt):
        if self.swinging:
            # Simple pendulum approximation
            # Force restoring towards 0
            accel = -10 * self.angle - 0.5 * self.angular_velocity
            self.angular_velocity += accel * dt
            self.angle += self.angular_velocity * dt
            
            # Dampen
            if abs(self.angle) < 0.01 and abs(self.angular_velocity) < 0.1:
                self.swinging = False
                self.angle = 0
        
        # Recalculate position based on angle (hanging from a point slightly above)
        # Pivot point is (self.x, self.origin_y - 10)
        # Length is 10
        import math
        pivot_y = self.origin_y - 12
        length = 12
        self.x_offset = length * math.sin(self.angle)
        self.y_offset = length * math.cos(self.angle)
        
        self.current_x = self.x + self.x_offset
        self.current_y = pivot_y + self.y_offset

    # Inside Ornament class
    def check_hover(self, mx, my):
        dist = ((mx - self.current_x)**2 + (my - self.current_y)**2)**0.5
        if dist < self.radius + 2:
            return True
        return False

    def draw(self, screen):
        # Draw string
        pygame.draw.line(screen, (200, 200, 200), (self.x, self.origin_y - 12), (int(self.current_x), int(self.current_y - 5)), 1)
        # Draw bulb
        pygame.draw.circle(screen, self.color, (int(self.current_x), int(self.current_y)), self.radius)
        # Shine
        pygame.draw.circle(screen, WHITE, (int(self.current_x - 2), int(self.current_y - 2)), 2)

class ChristmasTree:
    def __init__(self, screen_width, screen_height):
        # ... existing init ...
        self.x = screen_width // 2
        self.y = screen_height - 50 # Bottom of tree
        self.width = 300
        self.height = 400
        
        self.trunk_rect = pygame.Rect(self.x - 20, self.y - 60, 40, 60)
        
        # Layers definition
        self.layers = [
            [(self.x - 150, self.y - 50), (self.x + 150, self.y - 50), (self.x, self.y - 250)],
            [(self.x - 120, self.y - 180), (self.x + 120, self.y - 180), (self.x, self.y - 350)],
            [(self.x - 90, self.y - 300), (self.x + 90, self.y - 300), (self.x, self.y - 450)]
        ]

        self.lights = []
        self.ornaments = []
        self.generate_decorations()

    def generate_decorations(self):
        # ... existing generate_decorations ...
        # Bottom Layer decorations
        for i in range(5):
            lx = self.x - 100 + i * 50
            ly = self.y - 100 + random.randint(-20, 20)
            self.lights.append(Light(lx, ly))
            
            ox = self.x - 80 + i * 40
            oy = self.y - 80
            self.ornaments.append(Ornament(ox, oy))

        # Middle Layer
        for i in range(3):
            lx = self.x - 60 + i * 60
            ly = self.y - 220 + random.randint(-10, 10)
            self.lights.append(Light(lx, ly))
            
            ox = self.x - 50 + i * 50
            oy = self.y - 200
            self.ornaments.append(Ornament(ox, oy))
            
        # Top Layer
        for i in range(2):
            lx = self.x - 30 + i * 60
            ly = self.y - 350
            self.lights.append(Light(lx, ly))

    def handle_click(self, mx, my):
        # Check Star Click (Top of tree)
        star_x, star_y = self.x, self.y - 450
        dist = ((mx - star_x)**2 + (my - star_y)**2)**0.5
        if dist < 20:
            return "star_clicked" # Signal to main loop

        for ornament in self.ornaments:
            if ornament.check_hover(mx, my):
                ornament.swing()
                return True
        return False

    def handle_hover(self, mx, my):
        for ornament in self.ornaments:
            if ornament.check_hover(mx, my):
                ornament.radius = 10 # Highlight
            else:
                ornament.radius = 8 # Reset

    def update(self, dt):
        for light in self.lights:
            light.update(dt)
        for ornament in self.ornaments:
            ornament.update(dt)

    def draw(self, screen):
        # ... existing draw ...
        # Draw Trunk
        pygame.draw.rect(screen, (139, 69, 19), self.trunk_rect)
        
        # Draw Leaves
        for layer in self.layers:
            pygame.draw.polygon(screen, GREEN, layer)
            
        # Draw Star on Top
        star_pos = (self.x, self.y - 450)
        pygame.draw.circle(screen, GOLD, star_pos, 15) # Outer
        pygame.draw.circle(screen, (255, 255, 200), star_pos, 8) # Inner
        
        # Draw Decorations
        for light in self.lights:
            light.draw(screen)
        for ornament in self.ornaments:
            ornament.draw(screen)
