'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function InformationBottom({ dataMap ,Companyname}) {
    const createGraphConfig = useCallback((title, dataValues, colors, total) => {
        return {
            data: {
                labels: ['ผลตรวจออกครบแล้ว', 'ผลตรวจยังไม่ออก'],
                datasets: [
                    {
                        data: [dataValues.Nomal, dataValues.Abnomal],
                        backgroundColor: colors,
                        hoverBackgroundColor: colors.map(color => color + '99'),
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                },
            },
            plugins: [
                {
                    id: 'centerText',
                    beforeDraw: (chart) => {
                        const { width, height } = chart;
                        const ctx = chart.ctx;
                        ctx.restore();

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
            ],
        };
    }, []);

    const maleGraph = useMemo(() => {
        return dataMap
            ? createGraphConfig(
                  'Male Total',
                  { Nomal: dataMap.maleapprove, Abnomal: dataMap.maleunapprove },
                  ['#64C1D6', '#F44336'],
                  dataMap.maleall
              )
            : null;
    }, [dataMap, createGraphConfig]);

    const femaleGraph = useMemo(() => {
        return dataMap
            ? createGraphConfig(
                  'Female Total',
                  { Nomal: dataMap.femaleapprove, Abnomal: dataMap.femaleunapprove },
                  ['#FFC2D2', '#F44336'],
                  dataMap.femaleall
              )
            : null;
    }, [dataMap, createGraphConfig]);

    function calculatePercentage(part, total) {
        if (total === 0) return 0;
        const percentage = (part / total) * 100;
        return percentage % 1 === 0 ? percentage : percentage.toFixed(2);
    }

    return (
        <div className="flex flex-col">
            <label className="text-[#014F7D] font-bold text-xl w-full text-center">
                Information
            </label>
            <label className="w-full text-center mb-5">
                ชุดตรวจสุขภาพ {Companyname}
            </label>
            <div className="flex w-full h-full">
                <div className="w-full flex">
                    <div className="w-1/2 mr-1 flex justify-center">
                        <div className="w-1/2 flex flex-col justify-center items-center">
                            {maleGraph && <Doughnut key={JSON.stringify(maleGraph.data)} {...maleGraph} />}
                            <div className="flex flex-col items-center w-full">
                                <div className="flex border-b-2 border-[#014F7D] w-full justify-center mt-2">
                                    <label className='w-1/3 text-center'>Status</label>
                                    <label className='w-1/3 text-end'>Issues</label>
                                    <label className='w-1/3 text-end'>%</label>
                                </div>
                                <div className="flex w-full justify-center mt-2">
                                    <div className="flex w-1/3 items-center">
                                        <div className='w-3 h-3 bg-[#64C1D6] mr-1 rounded-full'></div>
                                        <label className='text-xs'>ผลตรวจออกครบแล้ว</label>
                                    </div>
                                    <label className='w-1/3 text-end'>{dataMap?.maleapprove}</label>
                                    <label className='w-1/3 text-end'>{calculatePercentage(dataMap?.maleapprove, dataMap?.maleall)}</label>
                                </div>
                                <div className="flex w-full justify-center mt-2">
                                    <div className="flex w-1/3 items-center">
                                        <div className='w-3 h-3 bg-[#E5686A] mr-1 rounded-full'></div>
                                        <label className='text-xs'>ผลตรวจยังไม่ออก</label>
                                    </div>
                                    <label className='w-1/3 text-end'>{dataMap?.maleunapprove}</label>
                                    <label className='w-1/3 text-end'>{calculatePercentage(dataMap?.maleunapprove, dataMap?.maleall)}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 ml-1 flex flex-col justify-center">
                        <div className="w-1/2 flex flex-col justify-center items-center">
                            {femaleGraph && <Doughnut key={JSON.stringify(femaleGraph.data)} {...femaleGraph} />}
                            <div className="flex flex-col items-center w-full">
                                <div className="flex border-b-2 border-[#014F7D] w-full justify-center mt-2">
                                    <label className='w-1/3 text-center'>Status</label>
                                    <label className='w-1/3 text-end'>Issues</label>
                                    <label className='w-1/3 text-end'>%</label>
                                </div>
                                <div className="flex w-full justify-center mt-2">
                                    <div className="flex w-1/3 items-center">
                                        <div className='w-3 h-3 bg-[#FFC2D2] mr-1 rounded-full'></div>
                                        <label className='text-xs'>ผลตรวจออกครบแล้ว</label>
                                    </div>
                                    <label className='w-1/3 text-end'>{dataMap?.femaleapprove}</label>
                                    <label className='w-1/3 text-end'>{calculatePercentage(dataMap?.femaleapprove, dataMap?.femaleall)}</label>
                                </div>
                                <div className="flex w-full justify-center mt-2">
                                    <div className="flex w-1/3 items-center">
                                        <div className='w-3 h-3 bg-[#E5686A] mr-1 rounded-full'></div>
                                        <label className='text-xs'>ผลตรวจยังไม่ออก</label>
                                    </div>
                                    <label className='w-1/3 text-end'>{dataMap?.femaleunapprove}</label>
                                    <label className='w-1/3 text-end'>{calculatePercentage(dataMap?.femaleunapprove, dataMap?.femaleall)}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InformationBottom;
