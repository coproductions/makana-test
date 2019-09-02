const Subscription = {
  feedSubscription: {
    subscribe: (parent, { showPrivate, userId }, ctx, info) => {
      const query = !userId ? { where: { node: { isPublic: true } } } : {};
      return ctx.db.subscription.comment(query, info);
    }
  }
};

module.exports = { Subscription };
