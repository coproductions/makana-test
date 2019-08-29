import { compose, lifecycle, renderNothing } from 'recompose';
import { withSnackbar } from 'notistack';
import { get } from 'lodash';

const messageTypeMapping = {
  CREATED: 'success',
  UPDATED: 'info',
  DELETED: 'warning',
};

const messageType = type => get(messageTypeMapping, type, 'error');

export default compose(
  withSnackbar,
  lifecycle({
    componentDidUpdate(prevProps) {
      if (this.props === prevProps) {
        return;
      }

      this.props.enqueueSnackbar(this.props.message, {
        variant: messageType(this.props.mutation),
      });
    },
  }),
  renderNothing
)();
