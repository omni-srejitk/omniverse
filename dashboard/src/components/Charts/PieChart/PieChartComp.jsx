import React from 'react'
import { 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip } from 'recharts';

export const PieChartComp = ({colors, data}) => {

  // Data format for pie chart => an array of objects with name and value keys and their respective values and pass colors array with colors that you want to show there 
  // const data = [{  "name": "Group A", "value": 400  }]
  // colors array like this => const COLORS = ['#0088FE', '#FFBB28', '#41e414','#d44133','#00C49F','#FF8042']; 
  return (
    <ResponsiveContainer 
    width={'100%'} 
    height={'100%'}
    margin={{ top: 0 }}
    >
      <PieChart 
      width={'100%'} 
      height={'100%'}
      >
        <Pie 
        data={data} 
        dataKey="value" 
        nameKey="name" 
        cx="50%" 
        cy="50%" 
        innerRadius={70}
        outerRadius={95} 
        fill="#8884d8" 
        labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: "black", opacity: '0.9', borderRadius: '1rem',}}
          wrapperStyle={{outline: 'none'}}
          labelStyle={{ color: "white" }}
          itemStyle={{ color: "white" }}
        />
      </PieChart>
    </ResponsiveContainer>    
  )
}
