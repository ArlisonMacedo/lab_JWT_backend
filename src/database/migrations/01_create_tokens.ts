// eslint-disable-next-line
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('tokens', table => {
    table.increments('id').primary()
    table.string('token').notNullable()

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('tokens')
}
