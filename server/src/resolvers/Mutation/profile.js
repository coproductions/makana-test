const { getUserId, getUserIdOptional, AuthError } = require('../../utils');

const profile = {
  async updateColor(parent, { profileColor }, ctx, info) {
    const id = getUserId(ctx);

    return ctx.db.mutation.updateUser(
      { where: { id }, data: { profileColor } },
      info
    );
  }
};

module.exports = { profile };
