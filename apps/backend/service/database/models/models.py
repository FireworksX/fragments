import datetime

from sqlalchemy import (
    JSON,
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    LargeBinary,
    String,
    Table,
    UniqueConstraint,
    func,
    orm,
)
from sqlalchemy.orm import relationship

from conf import service_settings
from database import Base


class ProjectGoal(Base):
    __tablename__ = 'project_goal'
    id = Column('id', Integer, primary_key=True, index=True)
    created_at = Column('created_at', DateTime, default=datetime.datetime.now(datetime.UTC))
    name = Column('name', String, nullable=False)
    target_action = Column('target_action', String, nullable=False)
    __table_args__ = (
        UniqueConstraint('project_id', 'target_action', name='unique_project_target_action'),
    )

    project_id = Column(
        'project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False
    )
    project = relationship('Project', back_populates='goals')


class ProjectMemberRole(Base):
    __tablename__ = 'project_members_role'
    user_id = Column(ForeignKey('user.id'), primary_key=True)
    project_id = Column(ForeignKey('project.id'), primary_key=True)
    role = Column('role', Integer, nullable=False)
    project = relationship('Project', back_populates='members')
    user = relationship('User', back_populates='projects')


class User(Base):
    __tablename__ = 'user'
    id = Column('id', Integer, primary_key=True, index=True)
    email = Column('email', String, unique=True)
    first_name = Column('first_name', String, nullable=False)
    last_name = Column('last_name', String)
    hashed_password = Column('hashed_password', String, nullable=False)

    projects = relationship('ProjectMemberRole', back_populates='user')

    avatar_id = Column('avatar_id', Integer, ForeignKey('media.id', ondelete='CASCADE'))
    avatar = relationship('Media')


class ProjectApiKey(Base):
    __tablename__ = 'project_api_key'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String, unique=False, nullable=True)
    is_private = Column('is_private', Boolean, default=False)
    key = Column('key', String, unique=True, nullable=False)

    project_id = Column(Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False)

    # Back reference to Project (One-to-Many)
    project = relationship('Project', back_populates='public_keys', foreign_keys=[project_id])


class Area(Base):
    __tablename__ = 'area'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String, nullable=False)
    description = Column('description', String)
    area_code = Column('area_code', String, nullable=False)
    author_id = Column('author_id', Integer, ForeignKey('user.id'))
    author = relationship('User')
    project_id = Column('project_id', Integer, ForeignKey('project.id'), nullable=False)

    logo_id = Column('logo_id', Integer, ForeignKey('media.id', ondelete='CASCADE'))
    logo = relationship('Media')

    # Relationship to Project
    project = relationship('Project')

    # One-to-Many relationship with Campaign
    campaigns = relationship('Campaign', back_populates='area')

    __table_args__ = (UniqueConstraint('project_id', 'area_code', name='unique_project_area_code'),)


class Project(Base):
    __tablename__ = 'project'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String)
    logo_id = Column('logo_id', Integer, ForeignKey('media.id', ondelete='CASCADE'))
    logo = relationship('Media')

    owner_id = Column('owner_id', Integer, ForeignKey('user.id'))
    owner = relationship('User')

    members = relationship('ProjectMemberRole', back_populates='project')

    areas = relationship('Area', back_populates='project', cascade='all, delete-orphan')

    goals = relationship('ProjectGoal', back_populates='project', cascade='all, delete-orphan')

    root_directory_id = Column('directory_id', Integer, ForeignKey('filesystem_directory.id'))
    root_directory = relationship('FilesystemDirectory', foreign_keys=[root_directory_id])

    # One-to-Many: Project → Multiple API Keys
    public_keys = relationship(
        'ProjectApiKey',
        back_populates='project',
        cascade='all, delete-orphan',
        foreign_keys=[ProjectApiKey.project_id],
        primaryjoin='and_(Project.id == ProjectApiKey.project_id, ProjectApiKey.is_private == False)',
    )

    # One-to-One: Project → Private Key
    private_key_id = Column(
        Integer, ForeignKey('project_api_key.id', ondelete='SET NULL'), unique=True, nullable=True
    )
    private_key = relationship('ProjectApiKey', foreign_keys=[private_key_id], post_update=True)


class FilesystemDirectory(Base):
    __tablename__ = 'filesystem_directory'
    id = Column('id', Integer, primary_key=True, index=True)
    project_id = Column('project_id', Integer)
    name = Column('name', String)
    # Reference to the parent (nullable if top-level)
    parent_id = Column(
        Integer, ForeignKey('filesystem_directory.id', ondelete='CASCADE'), nullable=True
    )
    # Relationship to parent
    parent = relationship(
        'FilesystemDirectory', back_populates='subdirectories', remote_side='FilesystemDirectory.id'
    )

    # Relationship to children
    subdirectories = relationship(
        'FilesystemDirectory', back_populates='parent', cascade='all, delete-orphan'
    )

    # Relationship to fragments in this directory
    fragments = relationship('Fragment', back_populates='directory', cascade='all, delete-orphan')

    # Relationship to medias in this directory
    medias = relationship('Media', back_populates='directory', cascade='all, delete-orphan')

    @property
    def items(self):
        """
        Return a combined list of subdirectories and fragments,
        e.g. for display in a file manager.
        """
        return list(self.subdirectories) + list(self.fragments)


class Campaign(Base):
    __tablename__ = 'campaign'
    id = Column('id', Integer, primary_key=True, index=True)
    project_id = Column(
        'project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False
    )
    project = relationship('Project')

    area_id = Column('area_id', Integer, ForeignKey('area.id', ondelete='CASCADE'), nullable=False)
    area = relationship('Area', back_populates='campaigns')

    name = Column('name', String)
    description = Column('description', String)

    author_id = Column('author_id', Integer, ForeignKey('user.id'))
    author = relationship('User')

    logo_id = Column('logo_id', Integer, ForeignKey('media.id', ondelete='CASCADE'))
    logo = relationship('Media')

    active = Column('active', Boolean, default=True)
    archived = Column('archived', Boolean, default=False)
    default = Column('default', Boolean, default=False)

    release_condition_id = Column(
        'release_condition_id', Integer, ForeignKey('release_condition.id'), nullable=True
    )
    release_condition = relationship('ReleaseCondition')

    feature_flag_id = Column('feature_flag_id', Integer, ForeignKey('feature_flag.id'), nullable=True)
    feature_flag = relationship('FeatureFlag')

    experiment_id = Column('experiment_id', Integer, ForeignKey('experiment.id'), nullable=True)
    experiment = relationship('Experiment')

    fragment_id = Column('fragment_id', Integer, ForeignKey('fragment.id'), nullable=True)
    fragment = relationship('Fragment')


class ReleaseCondition(Base):
    __tablename__ = 'release_condition'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String, nullable=False)

    condition_sets = relationship(
        'ConditionSet',
        back_populates='release_condition',
        cascade='save-update, merge, delete, delete-orphan',
    )


class ConditionSet(Base):
    __tablename__ = 'condition_set'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String, nullable=False)
    release_condition_id = Column(
        'release_condition_id',
        Integer,
        ForeignKey('release_condition.id', ondelete='CASCADE'),
        nullable=False,
    )
    release_condition = relationship('ReleaseCondition', back_populates='condition_sets')

    conditions = relationship(
        'Condition',
        back_populates='condition_set',
        cascade='save-update, merge, delete, delete-orphan',
    )


class GeoLocation(Base):
    __tablename__ = 'geo_location'
    id = Column('id', Integer, primary_key=True, index=True)
    country = Column('country', String, nullable=False)
    region = Column('region', String)
    city = Column('city', String, nullable=False)


class GeoLocationFilter(Base):
    __tablename__ = 'geo_location_filter'
    id = Column('id', Integer, primary_key=True, index=True)
    country = Column('country', String, nullable=False)
    region = Column('region', String)
    city = Column('city', String, nullable=False)


class TimeFrameFilter(Base):
    __tablename__ = 'time_frame_filter'
    id = Column('id', Integer, primary_key=True, index=True)
    from_time = Column('from_time', DateTime, nullable=False)
    to_time = Column('to_time', DateTime, nullable=False)


class OSTypeFilter(Base):
    __tablename__ = 'os_type_filter'
    id = Column('id', Integer, primary_key=True, index=True)
    os_type = Column('os_type', Integer, nullable=False)


class DeviceTypeFilter(Base):
    __tablename__ = 'device_type_filter'
    id = Column('id', Integer, primary_key=True, index=True)
    device_type = Column('device_type', Integer, nullable=False)


class PageFilter(Base):
    __tablename__ = 'page_filter'
    id = Column('id', Integer, primary_key=True, index=True)
    page = Column('page', String, nullable=False)


class Condition(Base):
    __tablename__ = 'condition'
    id = Column('id', Integer, primary_key=True, index=True)
    condition_set_id = Column(
        'condition_set_id',
        Integer,
        ForeignKey('condition_set.id', ondelete='CASCADE'),
        nullable=False,
    )
    condition_set = relationship('ConditionSet', back_populates='conditions')

    # Type of filter this condition represents
    filter_type = Column('filter_type', Integer, nullable=False)

    # Foreign keys to filter tables
    page_filter_id = Column(Integer, ForeignKey('page_filter.id'))
    device_type_filter_id = Column(Integer, ForeignKey('device_type_filter.id'))
    os_type_filter_id = Column(Integer, ForeignKey('os_type_filter.id'))
    time_frame_filter_id = Column(Integer, ForeignKey('time_frame_filter.id'))
    geo_location_filter_id = Column(Integer, ForeignKey('geo_location_filter.id'))

    # Relationships to filter tables
    page_filter = relationship('PageFilter')
    device_type_filter = relationship('DeviceTypeFilter')
    os_type_filter = relationship('OSTypeFilter')
    time_frame_filter = relationship('TimeFrameFilter')
    geo_location_filter = relationship('GeoLocationFilter')


class FeatureFlag(Base):
    __tablename__ = 'feature_flag'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String, nullable=False, unique=True)
    description = Column('description', String)
    release_condition_id = Column(
        'release_condition_id',
        Integer,
        ForeignKey('release_condition.id', ondelete='CASCADE'),
        nullable=False,
    )
    release_condition = relationship('ReleaseCondition')
    variants = relationship('Variant', back_populates='feature_flag', cascade='all, delete-orphan')


class Variant(Base):
    __tablename__ = 'variant'
    id = Column('id', Integer, primary_key=True, index=True)
    feature_flag_id = Column(
        'feature_flag_id',
        Integer,
        ForeignKey('feature_flag.id', ondelete='CASCADE'),
        nullable=False,
    )
    feature_flag = relationship('FeatureFlag')
    name = Column('name', String, nullable=False)
    rollout_percentage = Column('rollout_percentage', Float, nullable=False, default=0)
    fragment_id = Column('fragment_id', Integer, ForeignKey('fragment.id', ondelete='CASCADE'))
    fragment = relationship('Fragment')


class Experiment(Base):
    __tablename__ = 'experiment'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String, nullable=False, unique=True)
    description = Column('description', String)
    feature_flag_id = Column(
        'feature_flag_id', Integer, ForeignKey('feature_flag.id', ondelete='CASCADE')
    )
    feature_flag = relationship('FeatureFlag')

    created_at = Column('created_at', DateTime, nullable=False, default=func.now())
    updated_at = Column(
        'updated_at', DateTime, nullable=False, default=func.now(), onupdate=func.now()
    )


class Feedback(Base):
    __tablename__ = 'feedback'
    id = Column('id', Integer, primary_key=True, index=True)
    feel = Column('feel', Integer, nullable=False)
    content = Column('content', String)
    page = Column('page', String, nullable=False)


class FragmentMedia(Base):
    __tablename__ = 'fragment_media'
    id = Column('id', Integer, primary_key=True, index=True)
    media_id = Column(ForeignKey('media.id', ondelete='CASCADE'))
    media = relationship('Media')
    fragment_id = Column(ForeignKey('fragment.id', ondelete='CASCADE'))
    fragment = relationship('Fragment', back_populates='assets')


# linked fragments
fragment_usage = Table(
    'fragment_usage',
    Base.metadata,
    Column('fragment_id', Integer, ForeignKey('fragment.id', ondelete='CASCADE'), primary_key=True),
    Column(
        'used_fragment_id', Integer, ForeignKey('fragment.id', ondelete='CASCADE'), primary_key=True
    ),
)


class Fragment(Base):
    __tablename__ = 'fragment'

    id = Column('id', Integer, primary_key=True, index=True)  # Unique ID for the version
    project_id = Column(
        'project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False
    )
    project = relationship('Project')

    name = Column('name', String, nullable=False)  # Name of the fragment version
    document = Column('document', JSON, nullable=False)  # Version-specific document
    props = Column('props', JSON, nullable=False)  # Version-specific properties

    created_at = Column(
        'created_at', DateTime, nullable=False, default=func.now()
    )  # Timestamp for version creation
    author_id = Column(
        'author_id', Integer, ForeignKey('user.id'), nullable=False
    )  # Author of the version
    author = relationship('User')  # Relationship to the User table

    assets = relationship(
        'FragmentMedia',
        back_populates='fragment',
        cascade='save-update, merge, ' 'delete, delete-orphan',
    )

    directory_id = Column(
        'directory_id', Integer, ForeignKey('filesystem_directory.id'), nullable=False
    )
    directory = relationship('FilesystemDirectory', back_populates='fragments')

    linked_fragments = relationship(
        'Fragment',
        secondary=fragment_usage,  # use the association table
        primaryjoin=id == fragment_usage.c.fragment_id,
        secondaryjoin=id == fragment_usage.c.used_fragment_id,
        # We do NOT define backref or symmetrical references here,
        # since we just want "Fragment has an array of fragments it is using."
    )


class Media(Base):
    __tablename__ = 'media'
    id = Column('id', Integer, primary_key=True, index=True)

    # file data
    filename = Column(String, nullable=False)
    content_type = Column(String, nullable=False)
    data = Column(LargeBinary, nullable=False)  # File content in DB

    # for static serving
    path = Column('path', String, nullable=False)  # File saved path on disk

    directory_id = Column(
        'directory_id', Integer, ForeignKey('filesystem_directory.id'), nullable=True
    )
    directory = relationship('FilesystemDirectory', back_populates='medias')

    @property
    def public_path(self):
        return f'{service_settings.STATIC_SERVER_URL}/{self.filename}'


class Client(Base):
    __tablename__ = 'client'
    id = Column('id', Integer, primary_key=True, index=True)
    project_id = Column('project_id', Integer, ForeignKey('project.id'))
    created_at = Column('created_at', DateTime, default=datetime.datetime.now(datetime.UTC))
    updated_at = Column(
        'updated_at',
        DateTime,
        default=datetime.datetime.now(datetime.UTC),
        onupdate=datetime.datetime.now(datetime.UTC),
    )
    last_visited_at = Column('last_visited_at', DateTime, nullable=True)

    # Relationships
    history = relationship('ClientHistory', back_populates='client')


class ClientProjectGoal(Base):
    __tablename__ = 'client_project_goal'
    id = Column('id', Integer, primary_key=True, index=True)
    client_id = Column('client_id', Integer, ForeignKey('client.id'))
    project_goal_id = Column('project_goal_id', Integer, ForeignKey('project_goal.id'))
    project_id = Column('project_id', Integer, ForeignKey('project.id'))
    created_at = Column('created_at', DateTime, default=datetime.datetime.now(datetime.UTC))

    # Relationships
    client = relationship('Client')
    project_goal = relationship('ProjectGoal')
    project = relationship('Project')


class ClientHistory(Base):
    __tablename__ = 'client_history'
    id = Column('id', Integer, primary_key=True, index=True)
    client_id = Column('client_id', Integer, ForeignKey('client.id'))
    created_at = Column('created_at', DateTime, default=datetime.datetime.now(datetime.UTC))

    # Device info
    device_type = Column('device_type', Integer)
    os_type = Column('os_type', Integer)
    browser = Column('browser', String)
    language = Column('language', String)
    screen_width = Column('screen_width', Integer)
    screen_height = Column('screen_height', Integer)

    # Page info
    url = Column('url', String)
    referrer = Column('referrer', String)
    domain = Column('domain', String)
    subdomain = Column('subdomain', String)
    page_load_time = Column('page_load_time', Float)  # in milliseconds

    # Geolocation
    country = Column('country', String)
    region = Column('region', String)
    city = Column('city', String)

    # Relationships
    client = relationship('Client', back_populates='history')
