def generate_gradient(color1, color2, steps):
    c1 = [int(x) for x in color1.strip('rgba()').split(',')]
    c2 = [int(x) for x in color2.strip('rgba()').split(',')]

    gradient = []

    for i in range(steps):
        r = int(c1[0] + (i / (steps - 1)) * (c2[0] - c1[0]))
        g = int(c1[1] + (i / (steps - 1)) * (c2[1] - c1[1]))
        b = int(c1[2] + (i / (steps - 1)) * (c2[2] - c1[2]))
        a = int(c1[3] + (i / (steps - 1)) * (c2[3] - c1[3]))

        gradient.append(f'rgba({r},{g},{b},{a})')

    return gradient

def printColors(gradient_colors):
    for color in gradient_colors:
        print(color)


color1A = 'rgba(95, 44, 15, 255)'
color1H = 'rgba(252, 207, 26, 255)'
color1P = 'rgba(124, 165, 63, 255)'

color2A = 'rgba(107, 39, 16, 255)'
color2H = 'rgba(254, 204, 43,255)'
color2P = 'rgba(117, 170, 64,255)'

color3A = 'rgba(117, 34, 20,255)'
color3H = 'rgba(253, 200, 44,255)'
color3P = 'rgba(111, 167, 68,255)'

color5A = 'rgba(148, 30, 30,255)'
color5H = 'rgba(255, 198, 75,255)'
color5P = 'rgba(90, 163, 71,255)'

gradient_colors = generate_gradient(color5A, color5H, 6)
printColors(gradient_colors)
gradient_colors = generate_gradient(color5H, color5P, 7)
printColors(gradient_colors)


