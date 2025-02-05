import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'notification/clearNotification' }); // Clear notification after 5 seconds
      }, 5000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [notification, dispatch]);

  if (notification === '') {
    return null;
  }
  return (
    <div style={style}>
      {notification}
    </div>
  );
}

export default Notification;