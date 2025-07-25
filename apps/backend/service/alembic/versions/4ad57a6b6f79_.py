"""

Revision ID: 4ad57a6b6f79
Revises: ef3d4f5dbbe2
Create Date: 2025-07-17 14:22:00.591683

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4ad57a6b6f79'
down_revision = 'ef3d4f5dbbe2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('condition', 'filter_type')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('condition', sa.Column('filter_type', sa.INTEGER(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###