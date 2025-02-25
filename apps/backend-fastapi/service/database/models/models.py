from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean, DateTime, JSON, Table, orm, func
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

class ProjectApiKey(Base):
    __tablename__ = 'project_api_key'
    id = Column('id', Integer, primary_key=True, index=True)
    project_id = Column('project_id', Integer, ForeignKey('project.id'))
    project = relationship("Project")
    is_private = Column('is_private', Boolean, default=False)
    key = Column('key', String, nullable=False)


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

    root_directory_id = Column('directory_id', Integer, ForeignKey('filesystem_directory.id'))
    root_directory = relationship(
        "FilesystemDirectory", foreign_keys=[root_directory_id]
    )

    private_key_id = Column('private_key_id', Integer, ForeignKey('project_api_key.id'))
    private_key = relationship(
        "ProjectApiKey", foreign_keys=[private_key_id]
    )

    public_keys = relationship("ProjectApiKey", back_populates="project")


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
    region = Column('region', String)
    city = Column('city', String, nullable=False)


class StreamGeoLocationFilter(Base):
    __tablename__ = "stream_geo_location_filter"
    id = Column('id', Integer, primary_key=True, index=True)
    stream_id = Column(ForeignKey("stream.id"))

    stream = relationship("Stream", back_populates="geo_locations_filter")
    country = Column('country', String, nullable=False)
    region = Column('region', String)
    city = Column('city', String, nullable=False)
    toggled = Column('toggled', Boolean, nullable=False)


class StreamTimeFrameFilter(Base):
    __tablename__ = "stream_time_frame_filter"
    id = Column('id', Integer, primary_key=True, index=True)
    stream_id = Column(ForeignKey("stream.id"))

    stream = relationship("Stream", back_populates="time_frames_filter")
    from_time = Column('from_time', DateTime, nullable=False)
    to_time = Column('to_time', DateTime, nullable=False)
    toggled = Column('toggled', Boolean, nullable=False)


class StreamOSTypeFilter(Base):
    __tablename__ = "stream_os_type_filter"
    id = Column('id', Integer, primary_key=True, index=True)
    stream_id = Column(ForeignKey("stream.id"))

    stream = relationship("Stream", back_populates="os_types_filter")
    os_type = Column('os_type', Integer, nullable=False)
    toggled = Column('toggled', Boolean, nullable=False)


class StreamDeviceTypeFilter(Base):
    __tablename__ = "stream_device_type_filter"
    id = Column('id', Integer, primary_key=True, index=True)
    stream_id = Column(ForeignKey("stream.id"))

    stream = relationship("Stream", back_populates="device_types_filter")
    device_type = Column('device_type', Integer, nullable=False)
    toggled = Column('toggled', Boolean, nullable=False)


class StreamPageFilter(Base):
    __tablename__ = "stream_page_filter"
    id = Column('id', Integer, primary_key=True, index=True)
    stream_id = Column(ForeignKey("stream.id"))

    stream = relationship("Stream", back_populates="pages_filter")
    page = Column('page', String, nullable=False)
    toggled = Column('toggled', Boolean, nullable=False)


class Stream(Base):
    __tablename__ = 'stream'
    id = Column('id', Integer, primary_key=True, index=True)
    campaign_id = Column('campaign_id', Integer, ForeignKey('campaign.id', ondelete='CASCADE'), nullable=False)
    campaign = relationship("Campaign")
    project_id = Column('project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False)
    project = relationship("Project")
    active = Column('active', Boolean, default=True)
    deleted = Column('deleted', Boolean, default=False)
    name = Column('name', String, nullable=False)
    weight = Column('weight', Float, nullable=False)

    pages_filter = relationship("StreamPageFilter", back_populates="stream", cascade="save-update, merge, "
                                                                                     "delete, delete-orphan")
    device_types_filter = relationship("StreamDeviceTypeFilter", back_populates="stream", cascade="save-update, merge, "
                                                                                                  "delete, delete-orphan")
    os_types_filter = relationship("StreamOSTypeFilter", back_populates="stream", cascade="save-update, merge, "
                                                                                          "delete, delete-orphan")
    time_frames_filter = relationship("StreamTimeFrameFilter", back_populates="stream", cascade="save-update, merge, "
                                                                                                "delete, delete-orphan")
    geo_locations_filter = relationship("StreamGeoLocationFilter", back_populates="stream",
                                        cascade="save-update, merge, "
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
    media = relationship("Media")
    fragment_id = Column(ForeignKey("fragment.id", ondelete='CASCADE'))
    fragment = relationship("Fragment", back_populates="assets")


# linked fragments
fragment_usage = Table(
    "fragment_usage",
    Base.metadata,
    Column(
        "fragment_id",
        Integer,
        ForeignKey("fragment.id", ondelete="CASCADE"),
        primary_key=True
    ),
    Column(
        "used_fragment_id",
        Integer,
        ForeignKey("fragment.id", ondelete="CASCADE"),
        primary_key=True
    ),
)

class Fragment(Base):
    __tablename__ = 'fragment'

    id = Column('id', Integer, primary_key=True, index=True)  # Unique ID for the version
    project_id = Column('project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False)
    project = relationship("Project")

    name = Column('name', String, nullable=False)  # Name of the fragment version
    document = Column('document', JSON, nullable=False)  # Version-specific document
    props = Column('props', JSON, nullable=False)  # Version-specific properties

    created_at = Column('created_at', DateTime, nullable=False, default=func.now())  # Timestamp for version creation
    author_id = Column('author_id', Integer, ForeignKey('user.id'), nullable=False)  # Author of the version
    author = relationship("User")  # Relationship to the User table

    assets = relationship("FragmentMedia", back_populates="fragment", cascade="save-update, merge, "
                                                                                      "delete, delete-orphan")

    directory_id = Column('directory_id', Integer, ForeignKey('filesystem_directory.id'), nullable=False)
    directory = relationship(
        "FilesystemDirectory",
        back_populates="fragments"
    )

    linked_fragments = relationship(
        "Fragment",
        secondary=fragment_usage,             # use the association table
        primaryjoin=id == fragment_usage.c.fragment_id,
        secondaryjoin=id == fragment_usage.c.used_fragment_id,
        # We do NOT define backref or symmetrical references here,
        # since we just want "Fragment has an array of fragments it is using."
    )

class Landing(Base):
    __tablename__ = 'landing'
    id = Column('id', Integer, primary_key=True, index=True)
    project_id = Column('project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False)
    project = relationship("Project")
    stream_id = Column('stream_id', Integer, ForeignKey('stream.id', ondelete='CASCADE'), nullable=False)
    stream = relationship("Stream")
    fragment_id = Column('fragment_id', Integer, ForeignKey('fragment.id', ondelete='CASCADE'))
    fragment = relationship("Fragment")
    props = Column('props', JSON)
    weight = Column('weight', Float)
    name = Column('name', String, nullable=False)
    active = Column('active', Boolean, default=True)
    deleted = Column('deleted', Boolean, default=False)


class Media(Base):
    __tablename__ = 'media'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String)
    path = Column('path', String)
    ext = Column('ext', String)
    public_path = Column('public_path', String)


class FilesystemDirectory(Base):
    __tablename__ = 'filesystem_directory'
    id = Column('id', Integer, primary_key=True, index=True)
    project_id = Column('project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'))
    name = Column('name', String)
    # Reference to the parent (nullable if top-level)
    parent_id = Column(Integer, ForeignKey('filesystem_directory.id', ondelete="CASCADE"), nullable=True)
    # Relationship to parent
    parent = relationship(
        "FilesystemDirectory",
        back_populates="subdirectories",
        remote_side="FilesystemDirectory.id"
    )

    # Relationship to children
    subdirectories = relationship(
        "FilesystemDirectory",
        back_populates="parent",
        cascade="all, delete-orphan"
    )

    # Relationship to fragments in this directory
    fragments = relationship(
        "Fragment",
        back_populates="directory",
        cascade="all, delete-orphan"
    )

    @property
    def items(self):
        """
        Return a combined list of subdirectories and fragments,
        e.g. for display in a file manager.
        """
        return list(self.subdirectories) + list(self.fragments)
