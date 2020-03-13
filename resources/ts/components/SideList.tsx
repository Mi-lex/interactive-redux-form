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

type Props = {
    closeDrawer: () => void;
};

const SideList = (props: Props): JSX.Element => {
    const classes = useStyles();
    const { closeDrawer } = props;

    return (
        <div className={classes.list} role="presentation" onClick={closeDrawer} onKeyDown={closeDrawer}>
            <List>
                <ListItem button component={Link} to="/passport">
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Паспорт" />
                </ListItem>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <TocIcon />
                    </ListItemIcon>
                    <ListItemText primary="Заказы" />
                </ListItem>
                <Divider />
                {['Статистика', 'Канбан доска', 'Активность', 'Последняя ссылка'].map((text, index) => (
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
