const Subscription = {
  feedSubscription: {
    subscribe: (parent, { showPrivate, userId }, ctx, info) => {
      const where = !userId ? { isPublic: true } : null;
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
