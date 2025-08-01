"""

Revision ID: 4589cee84d1c
Revises: 378a43526c7c
Create Date: 2025-07-24 18:37:21.837049

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4589cee84d1c'
down_revision = '378a43526c7c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('geo_location_filter', 'city',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('geo_location_filter', 'city',
               existing_type=sa.VARCHAR(),
               nullable=False)
    # ### end Alembic commands ###