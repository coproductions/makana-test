const Subscription = {
  feedSubscription: {
    subscribe: (parent, { showPrivate, userId }, ctx, info) => {
      const where = !userId ? { node: { isPublic: true } } : null;
      return ctx.db.subscription.comment(
        {
          where
        },
        info
      );
    }
  }
};

module.exports = { Subscription };
