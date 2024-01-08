

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
    unique_colors = []
    for color in gradient_colors:
        if color not in unique_colors:
            unique_colors.append(color)

    line = ""
    for idx, color in enumerate(unique_colors):
        line += f"'{color}', "
        if (idx + 1) % 4 == 0:
            print(line)
            line = ""

    if line:
        print(line)



color1A = 'rgba(95, 44, 15, 255)'
color1D = 'rgba(201, 130, 38,255)'
color1H = 'rgba(252, 207, 26, 255)'
color1K = 'rgba(246, 240, 58,255)'
color1L = 'rgba(241, 235, 35,255)'
color1P = 'rgba(124,165,63,255)'

color3A = 'rgba(117, 34, 20,255)'
color3D = 'rgba(221, 118, 39,255)'
color3H = 'rgba(253, 200, 44,255)'
color3L = 'rgba(235, 233, 50,255)'
color3P = 'rgba(103,152,56,255)'

color5A = 'rgba(148, 30, 30,255)'
color5D = 'rgba(230, 105, 38,255)'
color5H = 'rgba(255, 198, 75,255)'
color5L = 'rgba(231, 229, 67,255)'
color5P = 'rgba(82,139,49,255)'

color7A = 'rgba(174, 31, 35, 255)'
color7D = 'rgba(241, 96, 43,255)'
color7H = 'rgba(255, 186, 95,255)'
color7L = 'rgba(208, 224, 92,255)'
color7P = 'rgba(61,126,43,255)'

color9A = 'rgba(224, 30, 38,255)'
color9D = 'rgba(240, 78, 63,255)'
color9H = 'rgba(253, 178, 121,255)'
color9L = 'rgba(177, 214, 108,255)'
color9P = 'rgba(40,113,36,255)'

color11A = 'rgba(240, 30, 35,255)'
color11D = 'rgba(239, 94, 99,255)'
color11H = 'rgba(249, 174, 142,255)'
color11L = 'rgba(159, 208, 127,255)'
color11P = 'rgba(20,100,30,255)'

color13A = 'rgba(255, 30, 46,255)'
color13D = 'rgba(240, 88, 113,255)'
color13H = 'rgba(245, 182, 173,255)'
color13L = 'rgba(147, 205, 154,255)'
color13P = 'rgba(29,120,46,255)'

color15A = 'rgba(236, 25, 70,255)'
color15D = 'rgba(241, 79, 139,255)'
color15H = 'rgba(238, 180, 202,255)'
color15L = 'rgba(142, 207, 167,255)'
color15P = 'rgba(39,141,62,255)'

color17A = 'rgba(231, 20, 101,255)'
color17D = 'rgba(223, 85, 160,255)'
color17H = 'rgba(207, 183, 217,255)'
color17L = 'rgba(142, 209, 192,255)'
color17P = 'rgba(48,161,78,255)'


color19A = 'rgba(216, 15, 131,255)'
color19D = 'rgba(190, 94, 165,255)'
color19H = 'rgba(180, 169, 211,255)'
color19L = 'rgba(131, 207, 203,255)'
color19P = 'rgba(58, 182, 94,255)'

color21A = 'rgba(200, 39, 145,255)'
color21D = 'rgba(165, 84, 161,255)'
color21H = 'rgba(151, 148, 201,255)'
color21L = 'rgba(105, 202, 218,255)'
color21P = 'rgba(63, 185, 112,255)'

color23A = 'rgba(179, 51, 148,255)'
color23D = 'rgba(148, 76, 158,255)'
color23H = 'rgba(117, 125, 188,255)'
color23L = 'rgba(57, 199, 239,255)'
color23P = 'rgba(49, 187, 138,255)'

color25A = 'rgba(159, 56, 148,255)'
color25D = 'rgba(130, 67, 156,255)'
color25H = 'rgba(92, 107, 176,255)'
color25L = 'rgba(62, 169, 225,255)'
color25P = 'rgba(33, 187, 161,255)'

color27A = 'rgba(140, 61, 152,255)'
color27D = 'rgba(111, 62, 151,255)'
color27H = 'rgba(72, 89, 167,255)'
color27L = 'rgba(65, 136, 200,255)'
color27P = 'rgba(24, 188, 189,255)'

color29A = 'rgba(125, 62, 153,255)'
color29D = 'rgba(87, 51, 147,255)'
color29H = 'rgba(47, 68, 157,255)'
color29L = 'rgba(58, 112, 184,255)'
color29P = 'rgba(16, 183, 215,255)'

bottomRow1 = 'rgba(124, 165, 63, 255)'
bottomRow6 = 'rgba(20, 100, 30,255)'
bottomRow10 = 'rgba(58, 182, 94,255)'
bottomRow15 = 'rgba(16, 183, 215,255)'



numOfTiles = 3

''' 
old code for determining the bottom row
def printGradientRow(color1,color2,color3,color4):
    gradient_colors = generate_gradient(color1,color2,6)
    gradient_colors += generate_gradient(color2,color3,5)
    gradient_colors += generate_gradient(color3,color4,6)
    printColors(gradient_colors)
'''


def printGradient(colorA,colorD,colorH,colorL,colorP):
    gradient_colors = generate_gradient(colorA, colorD, numOfTiles)
    gradient_colors += generate_gradient(colorD, colorH, numOfTiles)
    gradient_colors += generate_gradient(colorH, colorL, numOfTiles)
    gradient_colors += generate_gradient(colorL, colorP, numOfTiles)
    printColors(gradient_colors)


print("color 1")
printGradient(color1A,color1D,color1H,color1L,color1P)


print("color 2")
printGradient(color3A,color3D,color3H,color3L,color3P)


print("color 3")
printGradient(color5A,color5D,color5H,color5L,color5P)

print("color 4")
printGradient(color7A,color7D,color7H,color7L,color7P)

print("color 5")
printGradient(color9A,color9D,color9H,color9L,color9P)


print("color 6")
printGradient(color11A,color11D,color11H,color11L,color11P)


print("color 7")
printGradient(color13A,color13D,color13H,color13L,color13P)


print("color 8")
printGradient(color15A,color15D,color15H,color15L,color15P)

print("color 9")
printGradient(color17A,color17D,color17H,color17L,color17P)

print("color 10")
printGradient(color19A,color19D,color19H,color19L,color19P)


print("color 11")
printGradient(color21A,color21D,color21H,color21L,color21P)

print("color 12")
printGradient(color23A,color23D,color23H,color23L,color23P)

print("color 13")
printGradient(color25A,color25D,color25H,color25L,color25P)


print("color 14")
printGradient(color27A,color27D,color27H,color27L,color27P)

print("color 15")
printGradient(color29A,color29D,color29H,color29L,color29P)

#printGradientRow(bottomRow1,bottomRow6,bottomRow10,bottomRow15)