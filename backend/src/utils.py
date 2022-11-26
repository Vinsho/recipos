from os.path import join
from pathlib import Path

ROOT_PATH = Path(__file__).parent
IMAGES_PATH = join(ROOT_PATH, "static", "images")


def save_image(image, name):
    if image:
        image.save(f"{IMAGES_PATH}/{name}.jpg")
