"""empty message

Revision ID: 4c6ab4a841b4
Revises: cfb007773bd8
Create Date: 2024-01-13 19:17:23.956741

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4c6ab4a841b4'
down_revision = 'cfb007773bd8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('expenses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Numeric(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('category', sa.String(length=255), nullable=True),
    sa.Column('source_account', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('mood')
    op.drop_table('transaction')
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=255),
               existing_nullable=False)
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=255),
               existing_nullable=False)
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=255),
               existing_nullable=False)
        batch_op.alter_column('location',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.Text(),
               nullable=True)
        batch_op.drop_column('name')
        batch_op.drop_column('access_token')
        batch_op.drop_column('birth_date')
        batch_op.drop_column('phone_number')
        batch_op.drop_column('last_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('last_name', sa.VARCHAR(length=80), nullable=False))
        batch_op.add_column(sa.Column('phone_number', sa.VARCHAR(length=80), nullable=False))
        batch_op.add_column(sa.Column('birth_date', sa.VARCHAR(length=80), nullable=False))
        batch_op.add_column(sa.Column('access_token', sa.VARCHAR(length=255), nullable=True))
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=120), nullable=True))
        batch_op.alter_column('location',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(length=80),
               nullable=False)
        batch_op.alter_column('password',
               existing_type=sa.String(length=255),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
        batch_op.alter_column('email',
               existing_type=sa.String(length=255),
               type_=sa.VARCHAR(length=120),
               existing_nullable=False)
        batch_op.alter_column('username',
               existing_type=sa.String(length=255),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)

    op.create_table('transaction',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('amount', sa.FLOAT(), nullable=False),
    sa.Column('description', sa.VARCHAR(length=255), nullable=True),
    sa.Column('category', sa.VARCHAR(length=50), nullable=True),
    sa.Column('type', sa.VARCHAR(length=10), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('mood',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('mood_type', sa.VARCHAR(length=10), nullable=False),
    sa.Column('event_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('expenses')
    op.drop_table('tag')
    # ### end Alembic commands ###