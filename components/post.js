import React from 'react';

const Post = ({ title, img, episode, time, h }) => {
    return (
        <section className={`bg-white rounded-md shadow-md overflow-hidden ${h ? 'mx-auto my-[50px] w-[80%]' : null}`}>
            <div className={`w-full ${h ? 'h-auto' : 'h-[200px]'}  overflow-hidden`}>
                <img src={img} className="w-full h-auto" alt="Blog image" />
            </div>
            <h1 className="text-[25px] my-[10px]">{title}</h1>
            <div className="flex justify-between px-[20px] mb-[20px]">
                <p className="text-[12px]">Episode: {episode}</p>
                <p className="text-[12px]">Date: {time}</p>
            </div>
        </section>
    );
};

export default Post;
