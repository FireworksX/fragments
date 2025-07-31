import random
from io import BytesIO
from typing import Any, Dict, List, Optional, Union

import cairo  # pylint: disable=E1101
import svgwrite
from svgwrite.drawing import Drawing

from conf.settings import logger

import gi  # pylint: disable=C0413  # isort:skip

gi.require_version('Rsvg', '2.0')  # pylint: disable=C0413  # isort:skip
from gi.repository import Gio, Rsvg  # pylint: disable=C0413  # isort:skip


AVAILABLE_COLORS: List[str] = [
    '#FFC700',
    '#1BC47D',
    '#f2371f',
    '#18A0FB',
    '#907CFF',
    '#00c5df',
    '#EE46D3',
]


def get_random_int(min_val: int, max_val: int) -> int:
    logger.debug(f"Getting random int between {min_val} and {max_val}")
    return random.randint(min_val, max_val)


def get_random(min_val: float, max_val: float) -> float:
    logger.debug(f"Getting random float between {min_val} and {max_val}")
    return random.uniform(min_val, max_val)


def generate_rectangle_svg(
    x: int,
    y: int,
    width: int,
    height: int,
    fill: str,
    fill_type: str,
    gradient: Optional[Dict[str, Any]] = None,
) -> str:
    logger.debug(f"Generating rectangle SVG at ({x}, {y}) with dimensions {width}x{height}")
    gradient_def = ''
    fill_value = fill

    if fill_type == 'gradient':
        logger.debug('Generating gradient for rectangle')
        x1, y1 = x, y + height / 2
        x2, y2 = x + width, y + height / 2
        stop1_color = random.choice(AVAILABLE_COLORS)
        stop2_color = random.choice(AVAILABLE_COLORS)
        stop1_opacity = get_random(0.5, 1)
        stop2_opacity = get_random(0.5, 1)
        fill_value = f"url(#lg_{x}_{y})"
        gradient_def = f"""
            <linearGradient id="lg_{x}_{y}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">
                <stop offset="0%" stop-color="{stop1_color}" stop-opacity="{stop1_opacity}"/>
                <stop offset="100%" stop-color="{stop2_color}" stop-opacity="{stop2_opacity}"/>
            </linearGradient>"""

    return f'<rect x="{x}" y="{y}" width="{width}" height="{height}" fill="{fill_value}"/> {gradient_def}'


def generate_ellipse_svg(x: int, y: int, width: int, height: int, fill: str) -> str:
    logger.debug(f"Generating ellipse SVG at ({x}, {y}) with dimensions {width}x{height}")
    return f'<ellipse cx="{x}" cy="{y}" rx="{width / 2}" ry="{height / 2}" fill="{fill}"/>'


def generate_triangle_svg(x: int, y: int, width: int, height: int, fill: str) -> str:
    logger.debug(f"Generating triangle SVG at ({x}, {y}) with dimensions {width}x{height}")
    return f'<path d="M{x} {y} L{x - width / 2} {y + height} L{x + width / 2} {y + height} Z" fill="{fill}"/>'


def generate_shape(index: int) -> Dict[str, Union[Dict[str, Any], Dict[str, Union[str, int]]]]:
    logger.debug(f"Generating shape with index {index}")
    x = get_random_int(0, 800)
    y = get_random_int(0, 800)
    width = get_random_int(800, 1280)
    height = get_random_int(800, 1280)
    fill_color = random.choice(AVAILABLE_COLORS)

    shape_config = {'type': 'shape', 'id': index, 'value': fill_color}

    shape = {
        'shape': random.choice(['rectangle', 'ellipse', 'triangle']),
        'x': x,
        'y': y,
        'width': width,
        'height': height,
        'fill': fill_color,
        'fill_type': 'solid',
        'opacity': get_random(0.5, 1),
        'gradient': {},
    }

    if random.random() < 0.2:
        logger.debug('Adding gradient to shape')
        shape['fill_type'] = 'gradient'
        shape['gradient'] = {
            'type': 'linear',
            'x1': x,
            'y1': y + height / 2,
            'x2': x + width,
            'y2': y + height / 2,
        }

    return {'shape': shape, 'color': shape_config}


def generate_gradient_config() -> Dict[str, Any]:
    logger.info('Generating gradient configuration')
    shape_counts = [1, 2, 3, 4, 5, 6]
    config: List[Dict[str, Any]] = []

    background_opacity = get_random(0.1, 0.5)
    background_color = random.choice(AVAILABLE_COLORS)
    light_dark_mode = '#FFFFFF'

    number_of_shapes = random.choice(shape_counts)
    logger.debug(f"Generating {number_of_shapes} shapes")

    shapes = []
    for i in range(number_of_shapes):
        try:
            result = generate_shape(i)
            shape, color = result['shape'], result['color']
            config.append(color)
            shapes.append(shape)
        except Exception as e:
            logger.error(f"Error generating shape {i}: {str(e)}")
            raise e

    config.append({'type': 'background', 'id': len(config), 'value': background_color})

    return {
        'background': {'color': background_color, 'opacity': background_opacity},
        'shapes': shapes,
        'light_dark_mode': light_dark_mode,
        'all_colors': config,
        'noise_config': {
            'is_noise': True,
            'base_frequency': 0.23,
            'num_octaves': 8,
            'value': 7.5,
            'seed': 0,
        },
    }


def generate_svg(config: Dict[str, Any]) -> svgwrite.Drawing:
    logger.info('Generating SVG from config')
    # Disable profile to allow custom filters
    dwg = svgwrite.Drawing(
        'noisy_gradient.svg',
        size=('1600px', '1600px'),
        viewBox='0 0 1600 1600',
        fill='none',
        profile=None,
    )

    defs = dwg.defs

    # Background layers
    logger.debug('Adding background layers')
    dwg.add(dwg.rect(insert=(0, 0), size=('1600px', '1600px'), fill=config['light_dark_mode']))
    dwg.add(
        dwg.rect(
            insert=(0, 0),
            size=('1600px', '1600px'),
            fill=config['background']['color'],
            fill_opacity=config['background']['opacity'],
        )
    )

    # Main shape group
    g = dwg.g(clip_path='url(#clip0_50_327)', filter='url(#filter0_f_50_327)')

    logger.debug(f"Adding {len(config['shapes'])} shapes")
    for shape in config['shapes']:
        if shape['shape'] == 'rectangle':
            rect = dwg.rect(
                insert=(shape['x'], shape['y']),
                size=(shape['width'], shape['height']),
                fill=shape['fill'],
            )
            if shape['fill_type'] == 'gradient' and shape.get('gradient'):
                grad = dwg.linearGradient(id=f"grad_{shape['x']}_{shape['y']}")
                for stop in shape['gradient'].get('stops', []):
                    grad.add_stop_color(offset=stop['offset'], color=stop['color'])
                defs.add(grad)
                rect.fill = f"url(#{grad['id']})"
            g.add(rect)

        elif shape['shape'] == 'ellipse':
            ellipse = dwg.ellipse(
                center=(shape['x'], shape['y']),
                r=(shape['width'] / 2, shape['height'] / 2),
                fill=shape['fill'],
            )
            g.add(ellipse)

        elif shape['shape'] == 'triangle':
            points = [
                (shape['x'], shape['y']),
                (shape['x'] + shape['width'] / 2, shape['y'] - shape['height']),
                (shape['x'] + shape['width'], shape['y']),
            ]
            triangle = dwg.polygon(points=points, fill=shape['fill'])
            g.add(triangle)

    dwg.add(g)

    logger.debug('Adding filters and patterns')
    turb_filter = dwg.defs.add(
        dwg.filter(
            id='feTurb02',
            filterUnits='objectBoundingBox',
            x='0%',
            y='0%',
            width='100%',
            height='100%',
        )
    )
    turb_filter.feTurbulence(
        baseFrequency=config['noise_config']['base_frequency'],
        numOctaves=config['noise_config']['num_octaves'],
        seed=config['noise_config']['seed'],
        result='out1',
    )
    turb_filter.feComposite(in_='out1', in2='SourceGraphic', operator='in', result='out2')
    turb_filter.feBlend(in_='SourceGraphic', in2='out2', mode='normal', result='out3')  # ??

    blur_filter = defs.add(
        dwg.filter(
            id='filter0_f_50_327',
            x='0',
            y='0',
            width='1600',
            height='1600',
            filterUnits='userSpaceOnUse',
            color_interpolation_filters='sRGB',
        )
    )
    blur_filter.feFlood(flood_opacity='0', result='BackgroundImageFix')
    blur_filter.feBlend(
        mode='normal', in_='SourceGraphic', in2='BackgroundImageFix', result='shape'
    )
    blur_filter.feGaussianBlur(stdDeviation=250, result='effect1_foregroundBlur_50_327')

    dwg.defs.add(
        dwg.pattern(
            id='pattern0',
            patternUnits='objectBoundingBox',
            width='0.08375',
            height='0.08375',
            patternContentUnits='objectBoundingBox',
        ).add(dwg.use('#image0_50_327', transform='scale(0.001)'))
    )
    dwg.defs.add(
        dwg.clipPath(id='clip0_50_327').add(
            dwg.rect(insert=(0, 0), size=('1600', '1600'), fill='white')
        )
    )
    return dwg


def convert_svg_to_png(dwg: Drawing) -> BytesIO:
    logger.info('Converting SVG to PNG')
    # Convert SVG to UTF-8 bytes
    svg_content = dwg.tostring()
    svg_bytes = svg_content.encode('utf-8')

    # Create Rsvg handle from SVG data
    stream = Gio.MemoryInputStream.new_from_data(svg_bytes, None)
    handle = Rsvg.Handle.new_from_stream_sync(
        stream, Gio.File.new_for_path(''), Rsvg.HandleFlags.FLAGS_NONE
    )

    # Create a Cairo surface and context
    width, height = 300, 300
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, width, height)  # pylint: disable=E1101
    ctx = cairo.Context(surface)  # pylint: disable=E1101

    # Render the SVG to the context
    rect = Rsvg.Rectangle()
    rect.x, rect.y, rect.width, rect.height = 0, 0, 300, 300
    handle.render_document(ctx, rect)

    # Output to BytesIO
    png_io = BytesIO()
    surface.write_to_png(png_io)
    png_io.seek(0)
    logger.debug('Successfully converted SVG to PNG')
    return png_io


def generate_image() -> BytesIO:
    logger.info('Starting image generation')
    config = generate_gradient_config()
    dwg = generate_svg(config)
    png_bytes = convert_svg_to_png(dwg)
    logger.info('Completed image generation')
    return png_bytes
