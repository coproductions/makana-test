const Subscription = {
  feedSubscription: {
    subscribe: (parent, { showPrivate, userId }, ctx, info) => {
      return ctx.db.subscription.comment(
        {
          where: {
            node: {
              // isPublic: !!userId || !showPrivate,
              NOT: {
                author: {
                  id: userId
                }
              }
            }
          }
        },
        info
      );
    }
  }
};

module.exports = { Subscription };
