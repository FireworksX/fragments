"""

Revision ID: 66b8aa2df6f7
Revises: 114e1b277c9f
Create Date: 2025-07-08 17:21:15.165763

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = '66b8aa2df6f7'
down_revision = '114e1b277c9f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('campaign', sa.Column('status', sa.Integer(), nullable=False, server_default='1'))
    op.alter_column('campaign', 'default', existing_type=sa.BOOLEAN(), nullable=False)
    op.drop_column('campaign', 'active')
    op.drop_column('campaign', 'archived')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        'campaign', sa.Column('archived', sa.BOOLEAN(), autoincrement=False, nullable=True)
    )
    op.add_column('campaign', sa.Column('active', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.alter_column('campaign', 'default', existing_type=sa.BOOLEAN(), nullable=True)
    op.drop_column('campaign', 'status')
    # ### end Alembic commands ###
