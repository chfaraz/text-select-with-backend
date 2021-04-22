import React, { useState, useEffect, useRef } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

const popup = (props) => {
    const [text, setText] = useState('');
    const [error, setError] = useState(false);

    const closePopup = () => {
        props.setPopup(false);
        setText('');
        setError(false);
    };
    const setData = (e) => {
        if (text !== '') {
            const found = props.state.find((data) => props.selection === data.selectedText);
            console.log(found);
            found === undefined
                ? axios
                      .post('/api/postData', {
                          writtenText: text,
                          selectedText: props.selection,
                      })
                      .then(function (response) {
                          props.setState(
                              props.state.concat({
                                  writtenText: text,
                                  selectedText: props.selection,
                              })
                          );
                      })
                      .catch(function (error) {
                          console.log(error);
                      })
                : toast.error('Please Delete The Previous One First!', {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                  });

            props.setPopup(false);
        } else {
            console.log('please enter some text');
            setError(true);
        }
        var ele = document.getElementById('aa');
        ele.style.display = 'none';
        setText('');
    };

    const handleChange = (e) => {
        setText(e.target.value);
        setError(false);
    };

    return (
        <div id="popup">
            <Card className="">
                <CardContent>
                    <TextField id="outlined-multiline-static" helperText={error ? "Can't be empty" : null} error={error} onChange={(e) => handleChange(e)} label="Enter Some Text" multiline rows={4} defaultValue="" variant="outlined" />
                </CardContent>
                <CardActions>
                    <div className="buttons">
                        <Button variant="contained" color="secondary" onClick={closePopup}>
                            Close
                        </Button>
                        <Button variant="contained" color="primary" onClick={(e) => setData(e)}>
                            Add
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </div>
    );
};
export default popup;
