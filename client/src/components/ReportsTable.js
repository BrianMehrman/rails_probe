import React from 'react';
import { Link } from 'react-router-dom';

import Box from 'grommet/components/Box';
import Table from 'grommet/components/Table';

const ReportsTable = ({ reports }) => {
  const items = reports || [];

  console.log(items);
  return (
    <Box direction='column' flex={true} justify='center' align='center' colorIndex='light-1'>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>action</th>
            <th>Session</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
        { items.map((report) => (
          <tr>
            <td><Link to={report.link()}>{report.id}</Link></td>
            <td>{report.action}</td>
            <td>{report.session}</td>
            <td>{report.start}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </Box>
  )
}

export default ReportsTable;
