import os
from typing import AnyStr


def add_file(filepath: str, content: AnyStr):
    with open(filepath, mode='wb') as file:
        file.write(content)


def delete_file(filepath: str):
    os.remove(filepath)
