const debug = require('debug')('ranking datamapper');
const client = require('../config/db');

/**
 * @typedef {object} Ranking
 */

module.exports = {
/**
     * Récupère par son id
     * @param {number} id - L'id home
     * @returns {(Myhome|undefined)} -
     * La home souhaité ou undefined si aucun home à cet id
     */

  async findUsersByPk(homeId) {
    debug('dans findByPk');
    // query for my home users
    const result = await client.query(
      `select home.id as home_id, 
      to_json(array_agg(distinct "user"))as "user"
      from home
      LEFT JOIN (
          SELECT "user".id,"user".pseudonym ,"user".home_id
          FROM "user"
         ) AS "user"
          ON  home.id = "user".home_id
      group by home.id
      having home.id =$1`,
      [homeId],
    );
    // debug(result.rows);

    if (result.rowCount === 0) {
      return undefined;
    }

    return result.rows[0];
  },
  /**
     * Récupère par son id
     * @param {number} id - L'id home
     * @returns {(Score|undefined)} -
     * La Score souhaité ou undefined si aucun home à cet id
     */

  async score(homeId) {
    debug('dans findByPk');
    // score for my home
    const result = await client.query(
      `select "user".pseudonym as user_pseudonym, SUM(done_task.value) as user_score ,
      to_json(array_agg(distinct done_task.name)) as done_task
        from "done_task"
        left join "user" on  "user".id=done_task.user_id
        left join "home" on  "user".id=home.user_id
        where to_char(done_task.created_at,'YYYY') = to_char(now(),'YYYY')
              AND to_char(done_task.created_at,'WW') = to_char(now(),'WW')
        group by "user".pseudonym,done_task.home_id
      having done_task.home_id = $1`,
      [homeId],
    );
    // debug(result.rows);

    if (result.rowCount === 0) {
      return undefined;
    }

    return result.rows;
  },
};
