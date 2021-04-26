import React, { useContext, useState } from 'react';

const PostDetail = ({ title, img, img2 }) => {
    const [state, setstate] = useState('');

    return (
        <div className="w-full mx-auto">
            <div className="">
                <img src={img} className="w-full h-auto" />
            </div>
            <h1 className="text-[44px] font-bold my-[10px]">{title}</h1>
            <div className="flex">
                <div className="p-[20px] w-[75%]">
                    <h2 className="text-[30px] font-bold bg-[#38c7b2] text-white w-[50%] mb-[10px]">What it is?</h2>
                    <p className="text-[20px] w-[75%] ">
                        Etiam dapibus volutpat felis at mollis. Nam ligula nisi, facilisis in libero iaculis, blandit tincidunt ipsum. Donec lorem sapien, lobortis quis efficitur et, sollicitudin ut turpis. Aliquam eu lacus at augue imperdiet ornare in quis ligula. Praesent posuere libero lectus, id ornare lacus molestie vel. Curabitur semper suscipit congue. Phasellus in mi enim. Suspendisse imperdiet porta odio. Mauris fermentum nibh libero, quis semper ipsum tempor sed. Sed in nibh purus. Integer vestibulum et urna sit amet accumsan. Aenean auctor lorem in eros tincidunt, vitae porttitor
                        neque imperdiet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    </p>
                    <h2 className="text-[30px] font-bold bg-[#38c7b2] text-white w-[75%] mt-[25px] mb-[10px]">Dificult But Lets Try To Understand!</h2>
                    <p className="text-[20px] w-[75%]">Duis tristique rhoncus maximus. Etiam blandit justo eros, sed mattis neque sollicitudin eu. Nunc at ligula ipsum. Fusce sit amet leo odio. Sed finibus at est quis laoreet. Aliquam viverra lacinia ligula ac dapibus. Nunc accumsan nulla mi, id gravida dolor varius id. Vestibulum mollis porttitor fringilla. Maecenas sollicitudin eros ac enim consequat finibus. Aliquam vehicula mauris in libero sagittis, at venenatis velit eleifend. Quisque bibendum mauris leo, facilisis tincidunt leo vestibulum sed. Quisque fringilla sagittis porttitor.</p>
                    <h2 className="text-[30px] font-bold bg-[#38c7b2] text-white w-[100%] mt-[25px] mb-[10px]">Take aways:</h2>
                    <p className="text-[20px] w-[75%]">Proin ac ante semper, malesuada nulla vel, varius ex. Morbi aliquam mollis hendrerit. Donec lobortis dolor quis turpis euismod, id scelerisque tellus fringilla. Phasellus fermentum venenatis felis sit amet rhoncus. Integer eu molestie urna, eu venenatis turpis. Donec velit eros, fermentum ac elit eget, luctus porttitor tortor. Suspendisse placerat nisl non sem laoreet, non posuere magna egestas.</p>
                </div>
                <div className="w-[25%]">
                    <img src={img2} className="w-full h-auto" />
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
