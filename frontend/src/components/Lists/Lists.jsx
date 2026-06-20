import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Lists({ data }) {
    let complete = parseInt((data.listItemsBought / data.listTotalItems) * 100) + '%';
    console.log(data);
    return (
        <Link to={`/list/${data._id}`}>
            <div className="sm:w-80 hover:-translate-y-0.5 relative transition-transform z-0 w-full  min-h-47.5 rounded-2xl flex flex-col justify-around items-center  border-t-10 bg-white shadow " style={{ borderColor: data.color }}>
                <div className="flex w-[90%] gap-2  h-12.5 items-center">
                    <div className={`h-full flex justify-center items-center w-12.5 rounded-2xl text-3xl `} style={{ backgroundColor: data.color }}>
                    </div>
                    <div>
                        <div className="font-bold text-xl">{data.listName}</div>
                        <div className="text-xs  font-mono font-extrabold text-olive-400">{data.listTotalItems - data.listItemsBought} items left</div>
                    </div>
                </div>
                <div className="w-[90%]  ">
                    <div>
                        <div className="w-full h-2 rounded-2xl bg-gray-200">
                            <div style={{ width: complete, backgroundColor: data.color }} className={`h-2 bg-amber-500 rounded-2xl`}></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs  font-mono font-extrabold text-olive-400">
                        <div>{data.listItemsBought} done</div>
                        <div>{data.listTotalItems} total</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Lists;