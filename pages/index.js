import React, { useState, useEffect, useRef } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { CSVLink, CSVDownload } from 'react-csv';
import regexifyString from 'regexify-string';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [popup, setPopup] = useState(false);
    const [button, setButton] = useState(false);
    const [error, setError] = useState(false);
    const [state, setState] = useState([]);
    const [text, setText] = useState('');
    const [key, setKey] = useState('');
    const [selection, setSelection] = useState('');
    const [hoverData, setHover] = useState('');
    const [paragraph, setParagraph] = useState(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque equat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, eque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,'
    );
    useEffect(() => {
        var x = '';
        state.forEach((state) => {
            if (state.selectedText === selection) {
                x = state.writtenText;
                console.log(x);
            }
        });
    }, [selection, state]);
    useEffect(() => {
        // setState(JSON.parse(localStorage.getItem('data')));
    }, [state]);
    useEffect(() => {
        // let data = JSON.stringify(state);
        // localStorage.setItem('data', data);
        let data = axios
            .get('/api/getData')
            .then((response) => {
                // handle success
                console.log(response.data);
                setState(response.data);
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }, []);

    function useOutsideClick(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    if (!selection) {
                        var ele = document.getElementById('aa');
                        ele.style.display = 'none';
                    }
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }
    function useOutsideClickTip(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    var ele2 = document.getElementById('tip');
                    ele2.style.display = 'none';
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }
    // push to github and eploy to github pages
    const mouseUp = function (e) {
        var aaa = document.getElementById('aa');
        var x = e.clientX;
        var y = e.clientY;
        var selection;
        var p = '';
        selection = window.getSelection();
        if (!popup) {
            p = selection.toString();
            setSelection(p);
        }
        // selection.toString() !== '' && alert(selection.toString() + e.pageX + '/' + e.pageY);
        if (p.length > 0 && !popup) {
            aaa.style.display = 'block';
            aaa.style.top = y - 140 + 'px';
            aaa.style.left = x - 90 + 'px';
        }
        setKey(p);
    };
    const clicked = (e) => {
        setPopup(true);
        var ele = document.getElementById('aa');
        ele.style.display = 'none';
        // e.stopPropagation();
    };
    const closePopup = () => {
        setPopup(false);
        setText('');
        setError(false);
    };
    const setData = (e) => {
        var d = new Date();
        let duplicate = false;
        if (text !== '') {
            const found = state.find((data) => selection === data.selectedText);
            console.log(found);
            // if (state.length !== 0) {
            //     state.find((data, index) => {
            //         if (selection === data.selectedText) {
            //             toast.error('Please Delete The Previous One First!', {
            //                 position: 'top-right',
            //                 autoClose: 5000,
            //                 hideProgressBar: false,
            //                 closeOnClick: true,
            //                 pauseOnHover: true,
            //                 draggable: true,
            //                 progress: undefined,
            //             });
            //             // let temp_state = [...state];
            //             // let temp_element = { ...temp_state[index] };
            //             // temp_element.writtenText = text;
            //             // temp_state[index] = temp_element;
            //             // setState(temp_state);
            //             duplicate = true;
            //         } else {
            //             setState(
            //                 state.concat({
            //                     writtenText: text,
            //                     selectedText: selection,
            //                 })
            //             );
            //         }
            //     });
            // } else if (state.length === 0) {
            //     setState(
            //         state.concat({
            //             writtenText: text,
            //             selectedText: selection,
            //         })
            //     );
            // }
            found === undefined
                ? axios
                      .post('/api/postData', {
                          writtenText: text,
                          selectedText: selection,
                      })
                      .then(function (response) {
                          setState(
                              state.concat({
                                  writtenText: text,
                                  selectedText: selection,
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

            setPopup(false);
        } else {
            console.log('please enter some text');
            setError(true);
        }
        var ele = document.getElementById('aa');
        ele.style.display = 'none';
        setText('');
    };
    // const hideButton = (e) => {
    //     var ele = document.getElementById('aa');
    //     ele.style.display = 'none';
    //     e.stopPropagation();
    // };

    const handleChange = (e) => {
        setText(e.target.value);
        setError(false);
    };

    const hover = (e) => {
        let data = state.map((state) => {
            return state.selectedText.toUpperCase() === e.target.innerText.toUpperCase() ? state.writtenText : null;
        });
        setHover(data);
        console.log(data.join(''));
        console.log(e.clientX, e.clientY);

        var tip = document.getElementById('tip');
        var x = e.clientX;
        var y = e.clientY;

        tip.style.display = 'block';
        tip.style.top = y - 70 + 'px';
        tip.style.left = x - 40 + 'px';
    };
    const mouseOut = (e) => {
        var tip = document.getElementById('tip');
        console.log('sssssssssssssssssssssssssssssssssssssssssss');
        tip.style.display = 'none';
    };
    //paragraph.match(/h/g);

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);
    const hoverRef = useRef(null);
    useOutsideClickTip(hoverRef);
    const popupDiv = (
        <div id="popup">
            {/* <h2>enter some text</h2>
            <textarea value={text} onChange={(e) => handleChange(e)}></textarea>
            <div className="buttons">
                <Button variant="contained" color="secondary" onClick={() => setPopup(false)}>
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={(e) => setData(e)}>
                    Add
                </Button>
            </div> */}
            <Card className="">
                <CardContent>
                    {/* <Typography className="" color="textSecondary" gutterBottom>
                        enter some text
                    </Typography> */}
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
    console.log(state);
    const highlight = state.map((state) => {
        return state.selectedText;
    });
    var values = highlight.join('|');

    //  const exportCSVFile=( items, fileTitle)=> {

    //     const convertToCSV=(arr)=> {
    //         const array = [Object.keys(arr[0])].concat(arr)

    //         return array.map(it => {
    //           return Object.values(it).toString()
    //         }).join('\n')
    //       }
    //     // Convert Object to JSON
    //     var jsonObject = JSON.stringify(items)

    //     var csv = convertToCSV(items) ;

    //     var exportedFilename = fileTitle + '.csv' || 'export.csv'

    //     var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    //     if (navigator.msSaveBlob) { // IE 10+
    //       navigator.msSaveBlob(blob, exportedFilename)
    //     } else {
    //       var link = document.createElement('a')
    //       if (link.download !== undefined) { // feature detection
    //         // Browsers that support HTML5 download attribute
    //         var url = URL.createObjectURL(blob)
    //         link.setAttribute('href', url)
    //         link.setAttribute('download', exportedFilename)
    //         link.style.visibility = 'hidden'
    //         document.body.appendChild(link)
    //         link.click()
    //         document.body.removeChild(link)
    //       }
    //     }
    //   }
    const deleteFromState = (hovere) => {
        const data = state.filter((state) => {
            return hovere[0] !== state.writtenText;
        });
        setState(data);
    };
    const deleteData = async () => {
        const hovere = hoverData.filter((hoverdata) => {
            return hoverdata !== null;
        });
        const found = await state.find((data) => hovere[0] === data.writtenText);
        console.log(found);
        if (found !== undefined) {
            axios
                .post('/api/delete', {
                    selectedText: found.selectedText,
                })
                .then(function (response) {
                    deleteFromState(hovere);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        var ele2 = document.getElementById('tip');
        ele2.style.display = 'none';
    };

    return (
        <div className="App">
            <h1>Select And Mark Some Text</h1>
            <div className="">
                <div id="ele2" className="text" onMouseUp={(e) => mouseUp(e)}>
                    <span>
                        {/* 
                    {' '}
                        {parts.map((part, i) =>
                            part.toLowerCase() === values.toLowerCase() ? (
                                <span key={i} style={{ fontWeight: 'bold', background: 'yellow' }} onMouseOver={hover}>
                                    {part}
                                </span>
                            ) : (
                                <span key={i}>{part}</span>
                            )
                        )}{' '} */}

                        {highlight.length !== 0
                            ? regexifyString({
                                  pattern: new RegExp(`(${values})`, 'gi'),
                                  decorator: (highlight, index) => {
                                      return (
                                          <span key={index} style={{ fontWeight: 'bold', background: 'yellow', cursor: 'pointer' }} onClick={(e) => hover(e)}>
                                              {highlight}
                                          </span>
                                      );
                                  },
                                  input: paragraph,
                              })
                            : paragraph}
                    </span>
                    <div ref={wrapperRef} id="aa" onClick={(e) => clicked(e)}>
                        <Button variant="contained" color="secondary">
                            +
                        </Button>
                    </div>
                </div>
                <div ref={hoverRef} id="tip">
                    <div>
                        <p>{hoverData}</p>
                        <span onClick={deleteData}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="4" y1="7" x2="20" y2="7" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        </span>
                    </div>
                </div>
                {popup ? popupDiv : null}
                <div className="download">
                    <Button variant="contained" color="secondary">
                        <CSVLink data={state}>Download</CSVLink>
                    </Button>
                    {/* <Button variant="contained" color="secondary" onClick={()=>exportCSVFile(state, "data")}>
                        Download 2
                    </Button> */}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            {/* Same as */}
            <ToastContainer />
        </div>
    );
}

export default Home;
