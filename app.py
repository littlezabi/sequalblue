from PIL import Image

# Open the image
im = Image.open("image.jpg")

# Make the white pixels transparent
im = im.convert("RGBA")
data = im.getdata()

newData = []
for item in data:
    if item[0] == 255 and item[1] == 255 and item[2] == 255:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)

im.putdata(newData)

# Save the image as a PNG
im.save("image.png", "PNG")
