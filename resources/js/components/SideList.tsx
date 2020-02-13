import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TocIcon from '@material-ui/icons/Toc';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const SideList = props => {
    const classes = useStyles();
    const { closeDrawer } = props;

    return (
        <div className={classes.list} role="presentation" onClick={closeDrawer} onKeyDown={closeDrawer}>
            <List>
                <Link to="/">
                    <ListItem button>
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Пасспорт" />
                    </ListItem>
                </Link>
                <Link to="/orders">
                    <ListItem button>
                        <ListItemIcon>
                            <TocIcon />
                        </ListItemIcon>
                        <ListItemText primary="Заказы" />
                    </ListItem>
                </Link>
                <Divider />
                {['Список заказов', 'Канбан доска', 'Другая ссылка', 'Последняя ссылка'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default SideList;
