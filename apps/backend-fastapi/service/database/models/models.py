from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean, DateTime, JSON, Table, orm
from sqlalchemy.orm import relationship

from database import Base


class ProjectMemberRole(Base):
    __tablename__ = "project_members_role"
    user_id = Column(ForeignKey("user.id"), primary_key=True)
    project_id = Column(ForeignKey("project.id"), primary_key=True)
    role = Column('role', Integer, nullable=False)
    project = relationship("Project", back_populates="members")
    user = relationship("User", back_populates="projects")


class ProjectCampaign(Base):
    __tablename__ = "project_camnpaign"
    campaign_id = Column(ForeignKey("campaign.id"), primary_key=True)
    project_id = Column(ForeignKey("project.id"), primary_key=True)
    project = relationship("Project", back_populates="campaigns")
    campaign = relationship("Campaign")


class CampaignStream(Base):
    __tablename__ = "campaign_stream"
    campaign_id = Column(ForeignKey("campaign.id"), primary_key=True)
    stream_id = Column(ForeignKey("stream.id"), primary_key=True)
    stream = relationship("Stream")
    campaign = relationship("Campaign", back_populates="streams")


class User(Base):
    __tablename__ = 'user'
    id = Column('id', Integer, primary_key=True, index=True)
    email = Column('email', String, unique=True)
    first_name = Column('first_name', String, nullable=False)
    last_name = Column('last_name', String)
    hashed_password = Column('hashed_password', String, nullable=False)

    projects = relationship("ProjectMemberRole", back_populates="user")

    avatar_id = Column('avatar_id', Integer, ForeignKey('media.id'))
    avatar = relationship("Media")

    @orm.reconstructor
    def init(self) -> None:
        self.logo = None if self.avatar is None else self.avatar.public_path


class Project(Base):
    __tablename__ = 'project'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String)
    logo_id = Column('logo_id', Integer, ForeignKey('media.id'))
    logo = relationship("Media")

    owner_id = Column('owner_id', Integer, ForeignKey('user.id'))
    owner = relationship("User")
    members = relationship("ProjectMemberRole", back_populates="project")
    campaigns = relationship("ProjectCampaign", back_populates="project")


class Campaign(Base):
    __tablename__ = 'campaign'
    id = Column('id', Integer, primary_key=True, index=True)
    project_id = Column('project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False)
    name = Column('name', String)
    description = Column('description', String)
    active = Column('active', Boolean, default=True)
    deleted = Column('deleted', Boolean, default=False)

    author_id = Column('author_id', Integer, ForeignKey('user.id'))
    author = relationship("User")

    streams = relationship("CampaignStream", back_populates="campaign")

    logo_id = Column('logo_id', Integer, ForeignKey('media.id'))
    logo = relationship("Media")


class GeoLocation(Base):
    __tablename__ = 'geo_location'
    id = Column('id', Integer, primary_key=True, index=True)
    country = Column('country', String, nullable=False)
    region = Column('region', String, nullable=False)
    city = Column('city', String, nullable=False)
    stream_id = Column('stream_id', Integer, ForeignKey('stream.id', ondelete='CASCADE'), nullable=False)


class StreamGeoLocation(Base):
    __tablename__ = "stream_geo_location"
    geo_location_id = Column(ForeignKey("geo_location.id"), primary_key=True)
    stream_id = Column(ForeignKey("stream.id"), primary_key=True)

    stream = relationship("Stream", back_populates="geo_locations")
    geo_location = relationship("GeoLocation")


class TimeFrame(Base):
    __tablename__ = 'time_frame'
    id = Column('id', Integer, primary_key=True, index=True)
    stream_id = Column('stream_id', Integer, ForeignKey('stream.id', ondelete='CASCADE'), nullable=False)
    from_time = Column('from_time', DateTime, nullable=False)
    to_time = Column('to_time', DateTime, nullable=False)


class StreamTimeFrame(Base):
    __tablename__ = "stream_time_frame"
    time_frame_id = Column(ForeignKey("time_frame.id"), primary_key=True)
    stream_id = Column(ForeignKey("stream.id"), primary_key=True)

    stream = relationship("Stream", back_populates="time_frames")
    time_frame = relationship("TimeFrame")


class OSType(Base):
    __tablename__ = 'os_type'
    id = Column('id', Integer, primary_key=True, index=True)
    stream_id = Column('stream_id', Integer, ForeignKey('stream.id', ondelete='CASCADE'), nullable=False)
    os_type = Column('os_type', Integer, nullable=False)


class StreamOSType(Base):
    __tablename__ = "stream_os_type"
    os_type_id = Column(ForeignKey("os_type.id"), primary_key=True)
    stream_id = Column(ForeignKey("stream.id"), primary_key=True)

    stream = relationship("Stream", back_populates="os_types")
    os_type = relationship("OSType")


class DeviceType(Base):
    __tablename__ = 'device_type'
    id = Column('id', Integer, primary_key=True, index=True)
    stream_id = Column('stream_id', Integer, ForeignKey('stream.id', ondelete='CASCADE'), nullable=False)
    device_type = Column('device_type', Integer, nullable=False)


class StreamDeviceType(Base):
    __tablename__ = "stream_device_type"
    device_type_id = Column(ForeignKey("device_type.id"), primary_key=True)
    stream_id = Column(ForeignKey("stream.id"), primary_key=True)

    stream = relationship("Stream", back_populates="device_types")
    device_type = relationship("DeviceType")


class Page(Base):
    __tablename__ = 'page'
    id = Column('id', Integer, primary_key=True, index=True)
    stream_id = Column('stream_id', Integer, ForeignKey('stream.id', ondelete='CASCADE'), nullable=False)
    page = Column('page', String, nullable=False)


class StreamPage(Base):
    __tablename__ = "stream_page"
    page_id = Column(ForeignKey("page.id"), primary_key=True)
    stream_id = Column(ForeignKey("stream.id"), primary_key=True)

    stream = relationship("Stream", back_populates="pages")
    page = relationship("Page")


class Stream(Base):
    __tablename__ = 'stream'
    id = Column('id', Integer, primary_key=True, index=True)
    campaign_id = Column('campaign_id', Integer, ForeignKey('campaign.id', ondelete='CASCADE'), nullable=False)
    active = Column('active', Boolean, default=True)
    deleted = Column('deleted', Boolean, default=False)
    name = Column('name', String, nullable=False)
    weight = Column('weight', Float, nullable=False)

    pages = relationship("StreamPage", back_populates="stream", cascade="save-update, merge, "
                                                                        "delete, delete-orphan")
    device_types = relationship("StreamDeviceType", back_populates="stream", cascade="save-update, merge, "
                                                                                     "delete, delete-orphan")
    os_types = relationship("StreamOSType", back_populates="stream", cascade="save-update, merge, "
                                                                             "delete, delete-orphan")
    time_frames = relationship("StreamTimeFrame", back_populates="stream", cascade="save-update, merge, "
                                                                                   "delete, delete-orphan")
    geo_locations = relationship("StreamGeoLocation", back_populates="stream", cascade="save-update, merge, "
                                                                                       "delete, delete-orphan")


class Feedback(Base):
    __tablename__ = 'feedback'
    id = Column('id', Integer, primary_key=True, index=True)
    feel = Column('feel', Integer, nullable=False)
    content = Column('content', String)
    page = Column('page', String, nullable=False)


class FragmentMedia(Base):
    __tablename__ = "fragment_media"
    id = Column('id', Integer, primary_key=True, index=True)
    media_id = Column(ForeignKey("media.id", ondelete='CASCADE'))
    fragment_id = Column(ForeignKey("fragment.id", ondelete='CASCADE'))
    media = relationship("Media")
    fragment = relationship("Fragment", back_populates="assets")


class Fragment(Base):
    __tablename__ = 'fragment'
    id = Column('id', Integer, primary_key=True, index=True)
    project_id = Column('project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False)
    name = Column('name', String)
    document = Column('document', JSON, nullable=False)
    props = Column('props', JSON, nullable=False)

    author_id = Column('author_id', Integer, ForeignKey('user.id'))
    author = relationship("User")
    assets = relationship("FragmentMedia", back_populates="fragment", cascade="save-update, merge, "
                                                                              "delete, delete-orphan")


class Landing(Base):
    __tablename__ = 'landing'
    id = Column('id', Integer, primary_key=True, index=True)
    project_id = Column('project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False)
    project = relationship("Project")
    stream_id = Column('stream_id', Integer, ForeignKey('stream.id', ondelete='CASCADE'), nullable=False)
    stream = relationship("Stream")
    fragment_id = Column('fragment_id', Integer, ForeignKey('fragment.id', ondelete='CASCADE'), nullable=False)
    fragment = relationship("Fragment")
    props = Column('props', JSON, nullable=False)
    weight = Column('weight', Float, nullable=False)
    name = Column('name', String)
    active = Column('active', Boolean, default=True)
    deleted = Column('deleted', Boolean, default=False)


class Media(Base):
    __tablename__ = 'media'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String)
    path = Column('path', String)
    ext = Column('ext', String)
    public_path = Column('public_path', String)
