import { finalTeams } from '../data/constans_finalistas';
import React, { useState } from 'react';
import "../styles/fonts.css";


export function Finalists() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="mx-auto md:w-[950px] sm:w-[950px]">
            <br /><br />
            <p className='text-4xl font-extrabold text-center text-white'> EQUIPOS EN LA <br /> <span className='font-[pointles] text-6xl'> GRAN FINAL</span> </p>
            <div className="flex md:flex-row sm:flex-row flex-col border-b pt-10">
                {finalTeams.map((tab, index) => (
                    <button
                        key={index}
                        className={`flex-1 py-2 text-center ${activeTab === index ? 'border-b-2 border-y-[#ba7ae1] text-[#ba7ae1]' : 'border-b-2 border-transparent text-white'}`}
                        onClick={() => setActiveTab(index)}
                    >
                        <p className='text-2xl font-extrabold'>{tab.category}</p>
                    </button>
                ))}
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {finalTeams[activeTab].teams.map((team, index) => (
                    <div key={index} className=" flex flex-col items-center">
                        <img src="/img/index/teamp.webp" alt={`${team.name}`} className='w-[220px] h-auto' />
                        <div className="relative bottom-10 left-0 right-0 bg-black w-full text-white p-2 text-center">
                            <p className="sm:text-lg text-xs font-[pointles]">{team.name}</p>
                            <p className="sm:text-sm text-xs ">{team.school}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
