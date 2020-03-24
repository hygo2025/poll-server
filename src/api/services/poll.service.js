import CustomError from '../utils/CustomError'
import db from '../database/models'
import httpStatus from 'http-status'

export const create = async (obj, user) => {
  if (user) obj.userId = user.userId
  const poll = await db.Polls.create(obj)
  const promises = obj.options.map(async s => {
    return db.PollOptions.create({ value: s, pollId: poll.id })
  })

  const value = poll.toJSON()
  value['options'] = (await Promise.all(promises)).map(s => s.dataValues)

  return value
}

export const get = async id => {
  const poll = await db.Polls.findAll({
    where: { id: id },
    include: [
      {
        model: db.PollOptions,
        as: 'pollOptions',
      },
    ],
  })

  return poll
}

export const getByUserId = async id => {
  const poll = await db.Polls.findAll({
    where: { userId: id },
    include: [
      {
        model: db.PollOptions,
        as: 'pollOptions',
      },
    ],
  })

  return poll
}

export const edit = async (id, obj) => {
  const poll = ((await get(id)) || [{}])[0]
  poll.title = obj.title
  await poll.save()

  db.PollOptions.destroy({
    where: { id: { [db.Sequelize.Op.in]: poll.pollOptions.map(s => s.id) } },
  })

  const promises = obj.options.map(async s => {
    return db.PollOptions.create({ value: s, pollId: poll.id })
  })

  const value = poll.toJSON()
  value['options'] = (await Promise.all(promises)).map(s => s.dataValues)

  return poll
}

const validateOptions = async (id, pollId) => {
  const options = await db.PollOptions.findAll({
    where: { pollId: pollId },
  })

  const found = options.find(s => s.id === id)
  return !!found
}

export const answer = async (pollId, answerid, user) => {
  const isValid = await validateOptions(answerid, pollId)
  if (!isValid) {
    throw new CustomError({
      message: 'Invalid options',
      status: httpStatus.BAD_REQUEST,
    })
  }

  const answer = {
    pollId: pollId,
    optionId: answerid,
    userId: (user || {}).userId || null,
  }

  return await db.Answers.create(answer)
}

export const graph = async userId => {
  const elem = await getByUserId(userId)

  const polls = elem.map(s => s.dataValues)

  for (let index = 0; index < polls.length; index++) {
    const element = polls[index]

    element[
      'answer'
    ] = await db.sequelize.query(
      `select po.value, count(1) from answers a inner join polloptions po on po.id = a."optionId" where a."pollId" = ${element.id} group by po.value`,
      { type: db.Sequelize.QueryTypes.SELECT },
    )
  }

  return polls
}

export const associate = async (userId, pollIds) => {
  await db.Polls.update(
    { userId: parseInt(userId) },
    {
      where: {
        id: { [db.Sequelize.Op.in]: (pollIds || []).map(s => parseInt(s)) },
      },
    },
  )
}

export const listPollsWithoutAssociation = async () => {
  return db.Polls.findAll({
    where: { userId: null },
    include: [
      {
        model: db.PollOptions,
        as: 'pollOptions',
      },
    ],
  })
}
