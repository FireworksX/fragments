# Base image
# Build and push to dockerhub, for other images to inherit from

FROM python:3.12-slim AS base

ARG RUN_LEVEL

ENV RUN_LEVEL=${RUN_LEVEL}
ENV MEDIA_STORAGE_PATH=${MEDIA_STORAGE_PATH}
ENV POETRY_VERSION=1.8.3

ENV PIP_DISABLE_PIP_VERSION_CHECK=on
ENV PIP_NO_CACHE_DIR=off
ENV PYTHONDONTWRITEBYTECODE=on
ENV PYTHONFAULTHANDLER=on
ENV PYTHONUNBUFFERED=on
ENV PYTHONPATH=/opt/app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install "poetry==$POETRY_VERSION" \
    && poetry config virtualenvs.create false

RUN mkdir /opt/app
RUN mkdir MEDIA_STORAGE_PATH
RUN mkdir MEDIA_STORAGE_PATH/avatars
WORKDIR /opt/app

COPY deployment/pre_start.py /opt/app/

ONBUILD COPY pyproject.toml poetry.loc[k] /opt/app/
ONBUILD RUN RUN poetry install --no-interaction --no-ansi
