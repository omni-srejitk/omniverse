import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

export const PieChartComp = React.memo((props) => {
  const { data = {}, vertical = false } = props;
  const colors = [
    '#0088FE',
    '#FFBB28',
    '#41e414',
    '#d44133',
    '#00C49F',
    '#FF8042',
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='flex flex-col items-start rounded-lg border-2 border-gray-200 bg-white/90 p-4'>
          <p className='font-thin'>
            <span className=' font-medium text-black'>Category:</span>
            {`${payload[0].name}`}
          </p>
          <p className='font-thin'>
            <span className=' font-medium text-black'>Count:</span>
            {`${payload[0].value}`}
          </p>
        </div>
      );
    }

    return null;
  };

  const CustomLegend = ({ payload }) => {
    if (payload && payload.length) {
      return (
        <div className={` flex w-full  justify-between`}>
          {payload?.map(({ payload }) => (
            <div
              key={payload.cell}
              className='flex h-24 w-40 flex-col items-start overflow-hidden text-ellipsis whitespace-nowrap break-words rounded-lg  bg-white/90'
            >
              <div
                style={{ background: payload.fill }}
                className={`mb-2 h-4 w-4 rounded-lg border-2`}
              ></div>

              <p
                title={payload.name}
                style={{ color: payload.fill }}
                className='mb-2 font-semibold text-gray-400'
              >{`${payload.name} `}</p>
              <p className='mb-2 text-xl font-semibold text-gray-700'>{`${(
                payload.percent * 100
              ).toFixed(1)}%`}</p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <PieChart align='center'>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='40%'
          ali
          innerRadius={'50%'}
          outerRadius={'60%'}
          fill='#8884d8'
          labelLine={false}
        >
          {data?.map((entry, index) => {
            return (
              entry?.name !== undefined && (
                <Cell
                  key={entry}
                  dataKey={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              )
            );
          })}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout={vertical ? 'vertical' : 'horizontal'}
          verticalAlign='bottom'
          align={vertical ? 'start' : 'center'}
        />
      </PieChart>
    </ResponsiveContainer>
  );
});
