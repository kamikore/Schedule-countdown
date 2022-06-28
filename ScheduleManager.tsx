import * as React from 'react';
import CountdownTimer from './CountdownTimer';
import FormDialog from './FormDialog';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface ScheduleManagerProps {}

function ScheduleManager(props: ScheduleManagerProps) {
  const [schedule, setSchedule] = React.useState([]);
  const [showDialog, setShow] = React.useState(false);

  return (
    <div>
      {showDialog ? (
        <FormDialog
          setShow={setShow}
          schedule={schedule}
          setSchedule={setSchedule}
        />
      ) : (
        ''
      )}
      {schedule.length
        ? schedule.map((item, index) => (
            <CountdownTimer schedule={item} key={item.id} />
          ))
        : ''}
      <div id="tipBox">
        <AddCircleOutlineIcon
          fontSize="large"
          onClick={() => {
            setShow(true);
          }}
        />
        <span>Click me to add schedule</span>
      </div>
    </div>
  );
}

ScheduleManager.defaultProps = {
  schedule: null,
};

export default ScheduleManager;
