import React, { useState, useEffect, useRef } from 'react';

import Button from '@material-ui/core/Button';

import { CSVLink, CSVDownload } from 'react-csv';
import regexifyString from 'regexify-string';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Popup from '../components/popup';
import Tip from '../components/tip';

function Home({ data }) {
    const [state, setState] = useState(data);
    const [popup, setPopup] = useState(false);
    const [selection, setSelection] = useState('');
    const [hoverData, setHover] = useState('');
    const [paragraph, setParagraph] = useState(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque equat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, eque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,'
    );

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
        if (p.length > 0 && !popup) {
            aaa.style.display = 'block';
            aaa.style.top = y - 140 + 'px';
            aaa.style.left = x - 90 + 'px';
        }
    };
    const clicked = (e) => {
        setPopup(true);
        var ele = document.getElementById('aa');
        ele.style.display = 'none';
        // e.stopPropagation();
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

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    console.log(state);
    const highlight = state.map((state) => {
        return state.selectedText;
    });
    var values = highlight.join('|');

    return (
        <div className="App">
            <h1>Select And Mark Some Text</h1>
            <div className="">
                <div id="ele2" className="text" onMouseUp={(e) => mouseUp(e)}>
                    <span>
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
                <Tip hoverData={hoverData} state={state} setState={setState} />
                {popup ? <Popup selection={selection} setState={setState} setPopup={setPopup} state={state} /> : null}
                <div className="download">
                    <Button variant="contained" color="secondary">
                        <CSVLink data={state}>Download</CSVLink>
                    </Button>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            {/* Same as */}
            <ToastContainer />
        </div>
    );
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/api/getData`);
    const data = await res.json();
    console.log(data);
    // Pass data to the page via props
    return { props: { data } };
}

export default Home;
