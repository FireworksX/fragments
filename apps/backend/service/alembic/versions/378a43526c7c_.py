"""

Revision ID: 378a43526c7c
Revises: ab5069f669bf
Create Date: 2025-07-24 09:17:48.654434

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '378a43526c7c'
down_revision = 'ab5069f669bf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('project_allowed_origin',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('origin', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_project_allowed_origin_id'), 'project_allowed_origin', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_project_allowed_origin_id'), table_name='project_allowed_origin')
    op.drop_table('project_allowed_origin')
    # ### end Alembic commands ###