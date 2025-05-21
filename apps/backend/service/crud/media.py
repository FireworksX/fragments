import math
import os
from io import BytesIO
from typing import Optional
from uuid import uuid4

from fastapi import UploadFile
from PIL import Image
from sqlalchemy.orm import Session

from conf import service_settings
from database import Media


async def create_media_db(
    db: Session, file: UploadFile, directory_id: Optional[int] = None
) -> Media:
    content = await file.read()
    unique_name = f"{uuid4()}_{file.filename}"
    path = os.path.join(service_settings.MEDIA_STORAGE_PATH, unique_name)

    # Save file to disk
    try:
        with open(path, 'wb') as f:
            f.write(content)
    except Exception as e:
        raise e

    media: Media = Media(
        filename=unique_name,
        content_type=file.content_type,
        data=content,
        path=path,
        directory_id=directory_id,
    )
    db.add(media)
    db.commit()
    db.refresh(media)
    return media


async def get_media_by_id_db(db: Session, media_id: int) -> Optional[Media]:
    return db.query(Media).filter(Media.id == media_id).first()


async def delete_media_by_id_db(db: Session, media_id: int) -> None:
    file = db.query(Media).get(media_id)

    if not file:
        return

    if os.path.exists(file.path):
        try:
            os.remove(file.path)
        except Exception as e:
            raise e

    # Delete from DB
    db.delete(file)
    db.commit()


async def generate_default_media(db: Session, filename: str) -> Media:
    """Generate a default gradient image and store it using create_media_db"""
    # Create default gradient image
    width, height = 150, 150
    image = Image.new('RGB', (width, height))

    # Generate a smooth gradient pattern
    # Use filename to generate unique but deterministic colors
    seed = sum(ord(c) for c in f"{uuid4()}_{filename}")  # Removed uuid4 for deterministic results

    # Create 3 colors based on seed for a smoother gradient
    hue1 = (seed % 360) / 360.0  # First hue
    hue2 = ((seed + 120) % 360) / 360.0  # Second hue offset by 120 degrees
    hue3 = ((seed + 240) % 360) / 360.0  # Third hue offset by 240 degrees

    for x in range(width):
        for y in range(height):
            # Calculate normalized coordinates (-1 to 1)
            nx = (x - width / 2) / (width / 2)
            ny = (y - height / 2) / (height / 2)

            # Calculate angle and distance from center
            angle = math.atan2(ny, nx) / (2 * math.pi) + 0.5  # 0 to 1
            dist = min(1.0, math.sqrt(nx * nx + ny * ny))

            # Smoothly interpolate between the three hues based on angle
            if angle < 1 / 3:
                t = angle * 3
                h = hue1 * (1 - t) + hue2 * t
            elif angle < 2 / 3:
                t = (angle - 1 / 3) * 3
                h = hue2 * (1 - t) + hue3 * t
            else:
                t = (angle - 2 / 3) * 3
                h = hue3 * (1 - t) + hue1 * t

            # Adjust saturation and value based on distance
            s = 0.8 - 0.2 * dist  # Slightly desaturate towards edges
            v = 1.0 - 0.3 * dist  # Slightly darker towards edges

            # Convert HSV to RGB
            hi = int(h * 6)
            f = h * 6 - hi
            p = v * (1 - s)
            q = v * (1 - f * s)
            t = v * (1 - (1 - f) * s)

            if hi % 6 == 0:
                r, g, b = v, t, p
            elif hi % 6 == 1:
                r, g, b = q, v, p
            elif hi % 6 == 2:
                r, g, b = p, v, t
            elif hi % 6 == 3:
                r, g, b = p, q, v
            elif hi % 6 == 4:
                r, g, b = t, p, v
            else:
                r, g, b = v, p, q

            # Convert to 8-bit RGB
            r = int(r * 255)
            g = int(g * 255)
            b = int(b * 255)

            image.putpixel((x, y), (r, g, b))

    # Convert to UploadFile
    img_byte_arr = BytesIO()
    image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    upload_file = UploadFile(
        file=img_byte_arr, filename=filename, headers={'content-type': 'image/png'}
    )

    # Create media using existing create_media_db function
    return await create_media_db(db, upload_file)
