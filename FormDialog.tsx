import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { v4 as uuidv4 } from 'uuid';

interface FormDialogProps {
  setShow: Function;
  schedule: Array<T>;
  setSchedule: Function;
}

export default function FormDialog(props: FormDialogProps) {
  const { setShow, schedule, setSchedule } = props;
  const [title, setTitle] = React.useState<String>('');
  const [content, setContent] = React.useState<String>('');
  const [dateTime, setDateTime] = React.useState<Date | null>(null);
  const errMsg = 'Is Required !';

  const handleClose = () => {
    setShow(false);
  };

  const handleConfirm = () => {
    if (!title || !dateTime) return;
    setShow(false);
    setSchedule([
      {
        id: uuidv4(),
        title,
        dateTime,
        content,
      },
      ...schedule,
    ]);
  };
  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Add Schedule</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            error={title ? false : true}
            id="name"
            color="warning"
            label="Title"
            margin="normal"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
            helperText={title ? '' : errMsg}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="name"
            color="warning"
            label="Content"
            margin="normal"
            fullWidth
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              renderInput={(props) => (
                <TextField
                  {...props}
                  error={dateTime ? false : true}
                  margin="normal"
                  color="warning"
                  fullWidth
                  required
                  helperText={dateTime ? '' : errMsg}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
              label="DateTime"
              value={dateTime}
              onChange={(newValue) => {
                setDateTime(newValue);
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: '#cc9e06' }}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} style={{ color: '#cc9e06' }}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
