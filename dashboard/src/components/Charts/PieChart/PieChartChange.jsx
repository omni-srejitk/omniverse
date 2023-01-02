import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

export const PieChartChange = React.memo((props) => {
  const {
    data = {},
    vertical = false,
    customLabel = false,
    cx = '50%',
    cy = '50%',
  } = props;
  const colors = [
    '#0088FE',
    '#FFBB28',
    '#41e414',
    '#d44133',
    '#00C49F',
    '#FF8042',
  ];
  const gray = ['#000'];

  const RADIAN = Math.PI / 180;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      if (payload[0]?.payload?.satisfies) {
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
      } else {
        return (
          <div className='flex flex-col items-start rounded-lg border-2 border-gray-200 bg-white/90 p-4'>
            <p className='font-thin'>
              <span className=' font-medium text-black'>Category:</span>
              Others
            </p>
          </div>
        );
      }
    }

    return null;
  };

  const CustomLegend = ({ payload }) => {
    console.log('payload', payload);
    if (payload && payload.length) {
      return (
        <div
          className={`-mt-16 flex w-[95%] flex-col justify-start gap-0 text-base`}
        >
          {payload?.slice(0, 3)?.map(({ payload }) => (
            <div
              key={payload.cell}
              className='flex h-fit w-full items-center gap-2 bg-white/90'
            >
              <div
                style={{ background: payload.fill }}
                className={` h-4 w-4 rounded-lg `}
              ></div>

              <span
                title={payload.name}
                style={{ color: payload.fill }}
                className='mb-1 font-semibold text-gray-400'
              >{`${
                payload?.name?.charAt(0).toUpperCase() + payload.name?.slice(1)
              } `}</span>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.33;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <PieChart align='center'>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx={cx}
          cy={cy}
          ali
          innerRadius={'20%'}
          outerRadius={'60%'}
          fill='#8884d8'
          labelLine={false}
          label={customLabel ? renderCustomizedLabel : null}
          stroke='none'
        >
          {data?.map((entry, index) => {
            if (entry.satisfies) {
              return (
                entry?.name !== undefined && (
                  <Cell
                    key={entry}
                    dataKey={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                )
              );
            } else {
              return (
                entry?.name !== undefined && (
                  <Cell
                    key={entry}
                    dataKey={`cell-${index}`}
                    stroke='none'
                    fill={'#808080'}
                  />
                )
              );
            }
          })}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} iconType={'dot'} />
      </PieChart>
    </ResponsiveContainer>
  );
});
