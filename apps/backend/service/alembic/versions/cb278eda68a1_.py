"""

Revision ID: cb278eda68a1
Revises: 1a2e0dacf904
Create Date: 2025-07-20 10:50:32.109226

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cb278eda68a1'
down_revision = '1a2e0dacf904'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('unique_project_area_code', 'area', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('unique_project_area_code', 'area', ['project_id', 'area_code'])
    # ### end Alembic commands ###