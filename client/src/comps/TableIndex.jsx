import React from 'react'

const TableIndex = ({e}) => {
  return (
    <tr>
        <td>{e.companyName}</td>
        <td>{e.incorporationCountry}</td>
        <td>{e.officeCount}</td>
        <td>{e.website}</td>
    </tr>
  )
}

export default TableIndex