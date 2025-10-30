'use client';

import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SlideFBS(props) {
    const { dataMap, moreDetailClick } = props;
    const [malegraph, setMaleGraph] = useState(null);
    const [femalegraph, setFemaleGraph] = useState(null);
    useEffect(() => {
        if (dataMap?.data) {
            setMaleGraph(createGraphConfig('Male Total', { High: dataMap?.data?.malehigh, Nomal: dataMap?.data?.malenomal, Low: dataMap?.data?.malelow }, ['#F44336', '#64C1D6', '#ffeb3b']));
            setFemaleGraph(createGraphConfig('Female Total', { High: dataMap?.data?.femalehigh, Nomal: dataMap?.data?.femalenomal, Low: dataMap?.data?.femalelow }, ['#F44336', '#FFC2D2', '#ffeb3b']));
        }
    }, [dataMap]);

    const createGraphConfig = (title, dataValues, colors) => {
        const data = {
            labels: ['High', 'Nomal', 'Low'],
            datasets: [
                {
                    data: [dataValues.High, dataValues.Nomal, dataValues.Low],
                    backgroundColor: colors,
                    hoverBackgroundColor: colors.map(color => color + '99'), // เพิ่มความโปร่งใสสำหรับ hover
                    borderWidth: 2,
                },
            ],
        };

        const options = {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: true,
                },
            },
        };

        const plugins = [
            {
                id: 'centerText',
                beforeDraw: (chart) => {
                    const { width, height } = chart;
                    const ctx = chart.ctx;
                    ctx.restore();

                    const total = title === 'Male Total' ? dataMap?.data?.maleall : dataMap?.data?.femaleall;


                    const fontSizeLine1 = Math.min(width, height) / 10;
                    const fontSizeLine2 = Math.min(width, height) / 14;

                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';

                    const textX = width / 2;
                    const textYLine1 = height / 2 - fontSizeLine1;
                    const textYLine2 = height / 2 + fontSizeLine2 / 2;

                    ctx.font = `${fontSizeLine1}px sans-serif`;
                    ctx.fillText(title, textX, textYLine1);

                    ctx.font = `${fontSizeLine2}px sans-serif`;
                    ctx.fillText(total, textX, textYLine2);

                    ctx.save();
                },
            },
        ];


        return { data, options, plugins };
    };
    function calculatePercentage(part, total) {
        if (total === 0) {
            return 0; // ป้องกันการหารด้วย 0
        }
        const percentage = (part / total) * 100;
        return percentage % 1 === 0 ? percentage : percentage.toFixed(2);
    }
    return (
        <div className="flex flex-col">
            <div className="flex w-full">
                <div className="w-4/5 flex justify-start">
                    <label className="w-full text-start mb-5">
                        {dataMap?.head || "-"}
                    </label>
                </div>
                <div className="w-1/5 flex justify-end">
                    {dataMap.excelkey && dataMap?.data?.all > 0 ?
                        <button onClick={() => moreDetailClick(dataMap.excelkey)} className="bg-[#7498C6] border border-blue-500 text-white px-2 rounded-lg mr-2">More Detail</button>
                        : ""}
                </div>
            </div>

            <div className="flex w-full h-full">
                <div className="w-full flex">
                    <div className="w-1/2 mr-1 flex justify-center">
                        <div className="w-1/2 flex flex-col justify-center items-center">
                            {malegraph && <Doughnut {...malegraph} />}
                            <div className="flex flex-col items-center w-full">
                                <div className="flex border-b-2 border-[#014F7D] w-full justify-center mt-2">
                                    <label className='w-1/3 text-center'>Status</label>
                                    <label className='w-1/3 text-end'>Issues</label>
                                    <label className='w-1/3 text-end'>%</label>
                                </div>
                                <div className="flex w-full justify-center mt-2">
                                    <div className="flex w-1/3 items-center">
                                        <div className='w-3 h-3 bg-[#E5686A] mr-1 rounded-full'></div>
                                        <label className=''>High</label>
                                    </div>
                                    <label className='w-1/3 text-end'>{dataMap?.data?.malehigh}</label>
                                    <label className='w-1/3 text-end'>{calculatePercentage(dataMap?.data?.malehigh, dataMap?.data?.maleall)}</label>
                                </div>
                                <div className="flex w-full justify-center mt-2">
                                    <div className="flex w-1/3 items-center">
                                        <div className='w-3 h-3 bg-[#64C1D6] mr-1 rounded-full'></div>
                                        <label className=''>Normal</label>
                                    </div>
                                    <label className='w-1/3 text-end'>{dataMap?.data?.malenomal}</label>
                                    <label className='w-1/3 text-end'>{calculatePercentage(dataMap?.data?.malenomal, dataMap?.data?.maleall)}</label>
                                </div>
                                <div className="flex w-full justify-center mt-2">
                                    <div className="flex w-1/3 items-center">
                                        <div className='w-3 h-3 bg-[#ffeb3b] mr-1 rounded-full'></div>
                                        <label className=''>Low</label>
                                    </div>
                                    <label className='w-1/3 text-end'>{dataMap?.data?.malelow}</label>
                                    <label className='w-1/3 text-end'>{calculatePercentage(dataMap?.data?.malelow, dataMap?.data?.maleall)}</label>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 ml-1 flex flex-col justify-center">
                        <div className="w-1/2 flex flex-col justify-center items-center">
                            {femalegraph && <Doughnut {...femalegraph} />}
                            <div className="flex flex-col items-center w-full">
                                <div className="flex border-b-2 border-[#014F7D] w-full justify-center mt-2">
                                    <label className='w-1/3 text-center'>Status</label>
                                    <label className='w-1/3 text-end'>Issues</label>
                                    <label className='w-1/3 text-end'>%</label>
                                </div>
                                <div className="flex w-full justify-center mt-2">
                                    <div className="flex w-1/3 items-center">
                                        <div className='w-3 h-3 bg-[#E5686A] mr-1 rounded-full'></div>
                                        <label className=''>High</label>
                                    </div>
                                    <label className='w-1/3 text-end'>{dataMap?.data?.femalehigh}</label>
                                    <label className='w-1/3 text-end'>{calculatePercentage(dataMap?.data?.femalehigh, dataMap?.data?.femaleall)}</label>
                                </div>
                                <div className="flex w-full justify-center mt-2">
                                    <div className="flex w-1/3 items-center">
                                        <div className='w-3 h-3 bg-[#FFC2D2] mr-1 rounded-full'></div>
                                        <label className=''>Normal</label>
                                    </div>
                                    <label className='w-1/3 text-end'>{dataMap?.data?.femalenomal}</label>
                                    <label className='w-1/3 text-end'>{calculatePercentage(dataMap?.data?.femalenomal, dataMap?.data?.femaleall)}</label>
                                </div>
                                <div className="flex w-full justify-center mt-2">
                                    <div className="flex w-1/3 items-center">
                                        <div className='w-3 h-3 bg-[#ffeb3b] mr-1 rounded-full'></div>
                                        <label className=''>Low</label>
                                    </div>
                                    <label className='w-1/3 text-end'>{dataMap?.data?.femalelow}</label>
                                    <label className='w-1/3 text-end'>{calculatePercentage(dataMap?.data?.femalelow, dataMap?.data?.femaleall)}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlideFBS;
