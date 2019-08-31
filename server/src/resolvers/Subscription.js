const Subscription = {
  feedSubscription: {
    subscribe: (parent, { showPrivate, isLoggedIn }, ctx, info) => {
      return ctx.db.subscription.comment(
        {
          where: {
            node: {
              isPublic: !isLoggedIn || !showPrivate
            }
          }
        },
        info
      );
    }
  }
};

module.exports = { Subscription };
