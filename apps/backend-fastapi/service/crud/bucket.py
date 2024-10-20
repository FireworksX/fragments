from typing import AnyStr
import os


def add_file(filepath: str, content: AnyStr):
    with open(filepath, mode="w") as file:
        file.write(content)


def delete_file(filepath: str):
    os.remove(filepath)
