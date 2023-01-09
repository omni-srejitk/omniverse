import React, { useState, useEffect } from 'react';
import { Button } from '../Buttons';
import { Card } from '../Cards';
import {
  TableBody,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '../Table';
import { useSelector } from 'react-redux';
import { selectFilteredSalesData } from '../../redux/actions/dataActions';
import { fetchAllLiveStores } from '../../services/apiCalls';
import { ComingSoon } from '../Placeholders/ComingSoon';
import moment from 'moment';
import { CSVLink } from 'react-csv';

const SaleLog = () => {
  const [auditLog, setAuditLog] = useState([]);
  const BRAND = localStorage.getItem('Name');
  const FILTEREDSALEDATA = useSelector(selectFilteredSalesData);
  const { isLoading: isLiveStoresDataLoading, data: liveStoresData } =
    fetchAllLiveStores(BRAND);

  const fetchAuditData = (arr) => {
    console.log('arr', arr);
    const datemap = new Map();
    arr?.map((saleData) => {
      if (datemap.has(saleData[0])) {
        const foundField = datemap.get(saleData[0]);

        datemap.set(saleData[0], [...foundField, saleData]);
      } else {
        datemap.set(saleData[0], [saleData]);
      }
    });

    let audLog = [];
    let dateDictionary = Object.fromEntries(datemap);

    for (let key of Object.keys(dateDictionary)) {
      audLog.push({
        Date: key,
        Value: dateDictionary[key],
      });
    }

    audLog.sort(
      (a, b) => moment(b.Date, 'DD-MM-YY') - moment(a.Date, 'DD-MM-YY')
    );

    setAuditLog(audLog);
  };

  const csvData = FILTEREDSALEDATA.map((elem) => {
    const ALLOWED = ['DD-MM-YY', 'DD/MM/YY'];
    const date = moment(elem[0].trim(), ALLOWED).format('DD-MM-YY');
    return {
      date: `${date}`,
      Store: `${elem[1]}`,
      Quantity: `${elem[2]}`,
      SkuName: `${elem[6]}`,
      Price: `${elem[7]}`,
    };
  });

  useEffect(() => {
    fetchAuditData(FILTEREDSALEDATA);
  }, [FILTEREDSALEDATA, liveStoresData]);

  const csvHeader = [
    { label: 'Date', key: 'date' },
    { label: 'Store', key: 'Store' },
    { label: 'Quantity', key: 'Quantity' },
    { label: 'SkuName', key: 'SkuName' },
    { label: 'Price', key: 'Price' },
  ];

  const CSVBUTTON = (
    <CSVLink
      data={csvData}
      headers={csvHeader}
      filename={`Omniflo Audit Report - ${BRAND} / ${moment().format(
        'DD-MM-YY'
      )}`}
    >
      <Button>Export to CSV</Button>
    </CSVLink>
  );

  return (
    <Card
      title='Audit Log'
      info='A historical data sheet of all the sales based on audits.'
      classes={
        'row-span-1 col-span-1 lg:col-span-2 max-h-[25rem] overflow-hidden'
      }
      cardHeader={CSVBUTTON}
    >
      {auditLog?.length === 0 ? (
        <ComingSoon
          logo={'table_chart'}
          title={'No matching data.'}
          subtitle={'You will soon see unit wise ssale audits here.'}
        />
      ) : (
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableHeader>Date</TableHeader>
              <TableHeader>SKUs</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>GMV</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditLog?.map((audit) => (
              <tr className='min-h-20 flex w-full' key={audit.Date}>
                <td
                  aria-colspan={audit?.Value?.length}
                  className='flex w-1/4 flex-grow items-center  justify-start overflow-x-scroll text-ellipsis whitespace-pre-wrap break-words  border-y-2 border-gray-100 px-2  font-semibold scrollbar-thin'
                >
                  {audit.Date}
                </td>
                <td className='h-full w-full '>
                  <table className='flex h-full w-full flex-grow flex-col'>
                    <tbody className='h-full w-full'>
                      {audit.Value?.map((sale) => (
                        <tr
                          key={`${sale[0]} -
                              ${sale[1]} -
                                ${sale[2]} -
                                ${sale[3]} -
                                ${sale[4]} -
                                ${sale[5]} -
                                ${sale[6]}-    ${sale[7]} -`}
                          className='flex h-full w-full'
                        >
                          <td className='flex h-20 w-1/3 flex-grow items-center justify-start overflow-x-scroll text-ellipsis whitespace-pre-wrap  break-words border-2 border-gray-100 px-2 font-medium  text-gray-600 scrollbar-thin'>
                            {sale[6] || 0}
                          </td>
                          <td className='flex h-20 w-1/3 flex-grow items-center justify-start overflow-x-scroll text-ellipsis whitespace-pre-wrap  break-words border-2 border-gray-100 px-2 font-semibold  text-gray-600 scrollbar-thin'>
                            {sale[2] || 0}
                          </td>
                          <td className='flex h-20 w-1/3 flex-grow items-center justify-start overflow-x-scroll text-ellipsis whitespace-pre-wrap break-words  border-2 border-gray-100 px-2 font-semibold text-gray-600  scrollbar-thin'>
                            &#8377;{sale[7] || 0}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </TableBody>
        </TableContainer>
      )}
    </Card>
  );
};

export default SaleLog;
