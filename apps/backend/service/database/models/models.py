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
    success_level = Column('success_level', Float, nullable=True)
    failure_level = Column('failure_level', Float, nullable=True)
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


class ProjectAllowedOrigin(Base):
    __tablename__ = 'project_allowed_origin'
    id = Column('id', Integer, primary_key=True, index=True)
    origin = Column('origin', String, unique=False, nullable=False)
    name = Column('name', String, unique=False, nullable=False)

    project_id = Column(Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False)

    project = relationship('Project', back_populates='allowed_origins', foreign_keys=[project_id])


class Area(Base):
    __tablename__ = 'area'
    id = Column('id', Integer, primary_key=True, index=True)
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
    campaigns = relationship('Campaign', back_populates='area', cascade='all, delete-orphan')

    properties = Column('properties', JSON, nullable=True)


class Project(Base):
    __tablename__ = 'project'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String)
    logo_id = Column('logo_id', Integer, ForeignKey('media.id', ondelete='CASCADE'))
    logo = relationship('Media')

    owner_id = Column('owner_id', Integer, ForeignKey('user.id'))
    owner = relationship('User')

    members = relationship(
        'ProjectMemberRole', back_populates='project', cascade='all, delete-orphan'
    )

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

    allowed_origins = relationship(
        'ProjectAllowedOrigin', back_populates='project', cascade='all, delete-orphan'
    )


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
    def items(self) -> list:
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

    status = Column('status', Integer, nullable=False, default=1)
    default = Column('default', Boolean, nullable=False, default=False)
    feature_flag_id = Column(
        'feature_flag_id',
        Integer,
        ForeignKey('feature_flag.id', ondelete='CASCADE'),
        nullable=False,
    )
    feature_flag = relationship('FeatureFlag')


class ReleaseCondition(Base):
    __tablename__ = 'release_condition'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String, nullable=False)
    project_id = Column(
        'project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False
    )
    project = relationship('Project')

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
    city = Column('city', String)

    condition_id = Column(
        'condition_id', Integer, ForeignKey('condition.id', ondelete='CASCADE'), nullable=False
    )
    condition = relationship('Condition', back_populates='geo_location_filters')


class TimeFrameFilter(Base):
    __tablename__ = 'time_frame_filter'
    id = Column('id', Integer, primary_key=True, index=True)
    from_time = Column('from_time', DateTime, nullable=False)
    to_time = Column('to_time', DateTime, nullable=False)

    condition_id = Column(
        'condition_id', Integer, ForeignKey('condition.id', ondelete='CASCADE'), nullable=False
    )
    condition = relationship('Condition', back_populates='time_frame_filters')


class OSTypeFilter(Base):
    __tablename__ = 'os_type_filter'
    id = Column('id', Integer, primary_key=True, index=True)
    os_type = Column('os_type', Integer, nullable=False)

    condition_id = Column(
        'condition_id', Integer, ForeignKey('condition.id', ondelete='CASCADE'), nullable=False
    )
    condition = relationship('Condition', back_populates='os_type_filters')


class DeviceTypeFilter(Base):
    __tablename__ = 'device_type_filter'
    id = Column('id', Integer, primary_key=True, index=True)
    device_type = Column('device_type', Integer, nullable=False)

    condition_id = Column(
        'condition_id', Integer, ForeignKey('condition.id', ondelete='CASCADE'), nullable=False
    )
    condition = relationship('Condition', back_populates='device_type_filters')


class PageFilter(Base):
    __tablename__ = 'page_filter'
    id = Column('id', Integer, primary_key=True, index=True)
    page = Column('page', String, nullable=False)

    condition_id = Column(
        'condition_id', Integer, ForeignKey('condition.id', ondelete='CASCADE'), nullable=False
    )
    condition = relationship('Condition', back_populates='page_filters')


class Condition(Base):
    __tablename__ = 'condition'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String, nullable=False)
    condition_set_id = Column(
        'condition_set_id',
        Integer,
        ForeignKey('condition_set.id', ondelete='CASCADE'),
        nullable=False,
    )
    condition_set = relationship('ConditionSet', back_populates='conditions')

    # Relationships to filter tables
    page_filters = relationship(
        'PageFilter',
        back_populates='condition',
        cascade='save-update, merge, delete, delete-orphan',
    )
    device_type_filters = relationship(
        'DeviceTypeFilter',
        back_populates='condition',
        cascade='save-update, merge, delete, delete-orphan',
    )
    os_type_filters = relationship(
        'OSTypeFilter',
        back_populates='condition',
        cascade='save-update, merge, delete, delete-orphan',
    )
    time_frame_filters = relationship(
        'TimeFrameFilter',
        back_populates='condition',
        cascade='save-update, merge, delete, delete-orphan',
    )
    geo_location_filters = relationship(
        'GeoLocationFilter',
        back_populates='condition',
        cascade='save-update, merge, delete, delete-orphan',
    )


class FeatureFlag(Base):
    __tablename__ = 'feature_flag'
    id = Column('id', Integer, primary_key=True, index=True)
    name = Column('name', String, nullable=False)
    description = Column('description', String)
    project_id = Column(
        'project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), nullable=False
    )
    project = relationship('Project')
    release_condition_id = Column(
        'release_condition_id',
        Integer,
        ForeignKey('release_condition.id', ondelete='CASCADE'),
        nullable=False,
    )
    release_condition = relationship('ReleaseCondition')
    variants = relationship('Variant', back_populates='feature_flag', cascade='all, delete-orphan')
    rotation_type = Column('rotation_type', Integer, nullable=False, default=1)


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
    props = Column('props', JSON, nullable=True)
    status = Column('status', Integer, nullable=False, default=1)


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

# linked goals
fragment_goals = Table(
    'fragment_goals',
    Base.metadata,
    Column('fragment_id', Integer, ForeignKey('fragment.id', ondelete='CASCADE'), primary_key=True),
    Column('goal_id', Integer, ForeignKey('project_goal.id', ondelete='CASCADE'), primary_key=True),
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

    linked_goals = relationship(
        'ProjectGoal',
        secondary=fragment_goals,  # use the association table
        primaryjoin=id == fragment_goals.c.fragment_id,
        secondaryjoin=ProjectGoal.id == fragment_goals.c.goal_id,
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
    def public_path(self) -> str:
        return f'{service_settings.STATIC_SERVER_URL}/{self.filename}'


class Client(Base):
    __tablename__ = 'client'
    id = Column('id', Integer, primary_key=True, index=True)
    project_id = Column('project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'))
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


class ClientHistory(Base):
    __tablename__ = 'client_history'
    id = Column('id', Integer, primary_key=True, index=True)
    client_id = Column(
        'client_id', Integer, ForeignKey('client.id', ondelete='CASCADE'), nullable=False
    )
    created_at = Column('created_at', DateTime, default=datetime.datetime.now(datetime.UTC))

    # Device info
    device_type = Column('device_type', Integer)
    os_type = Column('os_type', Integer)
    browser = Column('browser', String)
    language = Column('language', String)
    screen_width = Column('screen_width', Integer)
    screen_height = Column('screen_height', Integer)
    page = Column('page', String)

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
    client = relationship(
        'Client', back_populates='history', foreign_keys=[client_id], passive_deletes=True
    )

    area_id = Column('area_id', Integer, ForeignKey('area.id', ondelete='SET NULL'), nullable=True)
    campaign_id = Column(
        'campaign_id', Integer, ForeignKey('campaign.id', ondelete='SET NULL'), nullable=True
    )
    campaign = relationship('Campaign', foreign_keys=[campaign_id], passive_deletes=True)
    area = relationship('Area', foreign_keys=[area_id], passive_deletes=True)
    variant_id = Column(
        'variant_id', Integer, ForeignKey('variant.id', ondelete='SET NULL'), nullable=True
    )
    variant = relationship('Variant', foreign_keys=[variant_id], passive_deletes=True)

    feature_flag_id = Column(
        'feature_flag_id',
        Integer,
        ForeignKey('feature_flag.id', ondelete='SET NULL'),
        nullable=True,
    )
    feature_flag = relationship('FeatureFlag', foreign_keys=[feature_flag_id], passive_deletes=True)

    event_type = Column('event_type', Integer, nullable=False)

    goal_id = Column(
        'goal_id', Integer, ForeignKey('project_goal.id', ondelete='SET NULL'), nullable=True
    )
    goal = relationship('ProjectGoal', foreign_keys=[goal_id], passive_deletes=True)
