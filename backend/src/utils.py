import io
from PIL import Image


def resolve_image(image):
    if image:
        image = Image.open(image)
        image.thumbnail((500, 500), Image.ANTIALIAS)

        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format="PNG")
        return img_byte_arr.getvalue()
