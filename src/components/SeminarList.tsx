import React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef,
    GridRowParams,
    useGridApiContext
} from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { format } from 'date-fns';
import axios from 'axios';

interface Seminar {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string,
    photo: string
}

interface SeminarListProps {
    seminars: Seminar[];
}

/**
 * Возвращаем список семинаров в виде гридов
 */
const SeminarList: React.FC<SeminarListProps> = ({ seminars }) => {

    // Приводим даты из 13.02.2025 в 2025-02-13 иначе дата собьёться при изменении
    const formatDate = (dateString: string) => {

        // Тут по идеи можно проверять строку с датой

        const parts = dateString.split('.');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        
        return `${year}-${month}-${day}`;
    };

    /**
     * Изменяем запись
     */
    function EditAction(props: Pick<GridRowParams, 'row'>) {

        const { row } = props;
        
        row.date = formatDate(row.date);
    
        // const getDate = new Date(row.date).toLocaleString('ru-RU');
        // Меняем формат даты чтобы форма его проглотила
        row.date = format(row.date, 'yyyy-MM-dd');
    
        const [editing, setEditing] = React.useState(false);
        const [title, setTitle] = React.useState(row.title);
        const [description, setDescription] = React.useState(row.description);
        const [date, setDate] = React.useState(row.date);
        const [time, setTime] = React.useState(row.time);
    
        const apiRef = useGridApiContext();
      
        const handleEdit = (event: React.MouseEvent) => {
          event.stopPropagation();
          setEditing(true);
        };
      
        const handleClose = () => {
          setEditing(false);
        };

        React.useEffect(() => {
            setTitle(row.title);
            setDescription(row.description);
            setDate(row.date);
            setTime(row.time);
        }, [row]);
      
        const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
        
          // Запрос на обновление
          axios.put('http://localhost:7000/seminars/'+row.id, {
              id: row.id,
              title,
              description,
              date: format(date, 'dd.MM.yyyy'), // Возвращаем к формату базы данных
              time,
              photo: row.photo
          }).then(resp => {
              apiRef.current.updateRows([{ id: row.id, title, description, date, time }]);
              console.log(resp.data);
          }).catch(error => {
              console.log(error);
          });

          handleClose();
        };
    
        return (
          <React.Fragment>
            <IconButton aria-label="Edit" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
      
            <Dialog
              open={editing}
              onClose={handleClose}
              PaperProps={{
                component: 'form',
                onSubmit: handleSave,
              }}
            >
              <DialogTitle>Edit Seminar</DialogTitle>
              <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <DialogContentText>
                  Make changes to the seminar&apos;s information.
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="title"
                  name="title"
                  label="Title"
                  fullWidth
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
    
                <TextField
                  rows="5"
                  multiline={true}
                  autoFocus
                  required
                  margin="dense"
                  id="description"
                  name="description"
                  label="Description"
                  fullWidth
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
    
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    name="date"
                    required
                    fullWidth
                    margin="dense"
                    // data-date-format="dd-mm-yyyy"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />
    
                <TextField
                    id="time"
                    label="Time"
                    type="time"
                    name="time"
                    required
                    fullWidth
                    margin="dense"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                />
    
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Save changes</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        );
    }

    /**
     * Удаляем запись
     */
    function DeleteAction(props: Pick<GridRowParams, 'row'>) {

        const { row } = props;
        const apiRef = useGridApiContext();
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
          setOpen(true);
        };

        const handleClose = () => {
          setOpen(false);
        };

        const handleDelete = (event: React.MouseEvent) => {
          
          // Запрос на удаление
          axios.delete('http://localhost:7000/seminars/'+row.id)
          .then(resp => {
              apiRef.current.updateRows([{ id: row.id, _action: 'delete' }])
              console.log(resp.data)
          }).catch(error => {
              console.log(error);
          });

        };
      
        return (
          <React.Fragment>
            <IconButton aria-label="Delete" onClick={handleClickOpen}>
              <DeleteIcon />
            </IconButton>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete the seminar?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  The entry will be deleted permanently.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cansel</Button>
                <Button onClick={handleDelete} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>

        );
    }

    type Row = (typeof seminars)[number];


    /**
     * Список полей в грид-таблице
     */
    const columns = React.useMemo<GridColDef<Row>[]>(
            () => [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'title',
            headerName: 'Title',
            width: 250,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
            editable: false,
        },
        {
            field: 'date',
            headerName: 'Date',
            // type: 'date',
            width: 200,
            editable: false,
            valueGetter: (value, row) => {
                return row.date;
            },
        },
        {
            field: 'time',
            headerName: 'Time',
            type: 'time',
            width: 200,
            editable: false,
            valueGetter: (value, row) => {
                return row.time;
            },
        },
        {
            field: 'photo',
            headerName: 'Photo',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            editable: false,
            renderCell: (params) => {

                // console.log(params.value.photo);
                // console.log(params.row.photo);
                // console.log(params);

                return (
                    <>
                        <Avatar variant='square' src={params.row.photo} />
                        {
                            params.row.title
                        }
                    </>
                );
            }
        },
        {
            field: 'actions',
            type: 'actions',
            width: 120,
            getActions: (params) => [
                // Иконки редактировать, удалять
                <EditAction {...params} />,
                <DeleteAction {...params} />
            ],
          },
        ],
    );

    /**
     * Вывод семинаров в виде гридов
     */
    return (
        <>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={seminars}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    estimatedRowCount={5}
                />

            </Box>
        </>
    );
};

export default SeminarList;