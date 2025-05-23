"""

Revision ID: ef90710fc5ca
Revises: 3f2bb65773ab
Create Date: 2025-05-21 14:23:16.908699

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'ef90710fc5ca'
down_revision = '3f2bb65773ab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute('DROP TABLE area CASCADE')
    op.create_table('area',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('project_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('area_code', sa.String(), nullable=False),
        sa.Column('author_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['author_id'], ['user.id'], ),
        sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_unique_constraint('unique_project_area_code', 'area', ['project_id', 'area_code'])
    op.drop_column('campaign', 'weight')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('campaign', sa.Column('weight', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False))
    op.drop_constraint('unique_project_area_code', 'area', type_='unique')
    op.drop_column('area', 'area_code')
    # ### end Alembic commands ###