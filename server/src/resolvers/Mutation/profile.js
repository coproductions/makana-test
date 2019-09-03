const profile = {
  async updateColor(parent, { id, profileColor }, ctx, info) {
    const user = await ctx.db.query.user({ where: { id } });
    if (!user) {
      throw new Error(`No such user found for id: ${id}`);
    }

    return ctx.db.mutation.updateUser(
      { where: { id }, data: { profileColor } },
      info
    );
  }
};

module.exports = { profile };
