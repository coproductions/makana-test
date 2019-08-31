import { compose, lifecycle, renderNothing } from 'recompose';
import { useSnackbar } from 'notistack';
import { get } from 'lodash';
import { useSubscription } from 'react-apollo';
import { FEED_SUBSCRIPTION } from '../operations';

const messageTypeMapping = {
  CREATED: 'success',
  UPDATED: 'info',
  DELETED: 'warning',
};

const messageType = type => get(messageTypeMapping, type, 'warning');

// export default compose(
//   withSnackbar,
//   lifecycle({
//     componentDidUpdate(prevProps) {
//       console.log('in here', prevProps, this.props);

//       if (this.props !== prevProps && !this.props.data.loading) {
//         this.props.enqueueSnackbar(this.props.message, {
//           variant: messageType(this.props.mutation),
//         });
//       }
//     },
//   }),
//   renderNothing
// )();

const useFeedSubscription = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { data } = useSubscription(FEED_SUBSCRIPTION);

  return {};
};
