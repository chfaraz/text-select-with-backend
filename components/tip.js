import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const tip = (props) => {
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
    const hoverRef = useRef(null);
    useOutsideClickTip(hoverRef);

    const deleteFromState = (hovere) => {
        const data = props.state.filter((state) => {
            return hovere[0] !== state.writtenText;
        });
        props.setState(data);
    };
    const deleteData = async () => {
        const hovere = props.hoverData.filter((hoverdata) => {
            return hoverdata !== null;
        });
        const found = await props.state.find((data) => hovere[0] === data.writtenText);
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
        <div ref={hoverRef} id="tip">
            <div>
                <p>{props.hoverData}</p>
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
    );
};
export default tip;
