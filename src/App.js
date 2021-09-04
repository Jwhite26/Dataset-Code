import React from "react";

import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';


// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter
    )

    return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            <div>Showing the first 20 results of {rows.length} rows</div>
            <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div>
        </div>
    )
}



function FilterTableComponent() {
    const columns = React.useMemo(
        () => [

            {
                Header: 'ID',
                columns: [
                    {
                        Header: 'ID',
                        accessor: 'id'
                    },
                ],
            },

            {
                Header: 'Price',
                columns: [
                    {
                        Header: 'Price',
                        accessor: 'price',
                    },
                ],
            },
            {
                Header: 'Reward Point',
                columns: [
                    {
                        Header: 'Reward Point',
                        accessor: 'rewardpoint'
                    },
                ],
            },
        ],
        []
    )

    const data = [
        {
            "id" : 1,
            "price": "$185",
            "rewardpoint": 220,
        },
        {
            "id" : 2,
            "price": "$115",
            "rewardpoint": 80,
        },
        {
            "id" : 3,
            "price": "$674",
            "rewardpoint": 1198,
        },
        {      
            "id" :4,
            "price": "$322",
            "rewardpoint": 494,
        },
        {      
            "id" : 5,
            "price": "$1016",
            "rewardpoint": 1882,
        },
        {      
            "id" : 6,
            "price": "$16",
            "rewardpoint": 0,
        },
        {      
            "id" : 7,
            "price": "$181",
            "rewardpoint": 212,
        },
        {      
            "id" : 8,
            "price": "$3",
            "rewardpoint": 0,
        },
        {      
            "id" : 9,
            "price": "$120",
            "rewardpoint": 90,
        },
        {      
            "id" : 10,
            "price": "$558",
            "rewardpoint": 966,
        },
        {      
            "id" : 11,
            "price": "$797",
            "rewardpoint": 1444,
        },
        {      
            "id" : 12,
            "price": "$469",
            "rewardpoint": 788,
        },
        {      
            "id" : 13,
            "price": "$124",
            "rewardpoint": 98,
        },
        {      
            "id" : 14,
            "price": "$124",
            "rewardpoint": 98,
        },
        {      
            "id" : 15,
            "price": "$1081",
            "rewardpoint": 2012,
        },

        {      
            "id" : 16,
            "price": "$1081",
            "rewardpoint": 2012,
        },


        {      
            "id" : 17,
            "price": "$224",
            "rewardpoint": 298,
        },


        {      
            "id" : 18,
            "price": "$435",
            "rewardpoint": 720,
        },
        {      
            "id" : 19,
            "price": "$1049",
            "rewardpoint": 1948,
        },
        {      
            "id" : 20,
            "price": "$781",
            "rewardpoint": 1412,
        },
        {      
            "id" : 21,
            "price": "$982",
            "rewardpoint": 1814,
        },
        {      
            "id" : 22,
            "price": "$585",
            "rewardpoint": 1020,
        },
        {      
            "id" : 23,
            "price": "$583",
            "rewardpoint": 1016,
        },
        {      
            "id" : 24,
            "price": "$1097",
            "rewardpoint": 2044,
        },
        {      
            "id" : 25,
            "price": "$127",
            "rewardpoint": 104,
        },
        {      
            "id" : 26,
            "price": "$218",
            "rewardpoint": 286,
        },
        {      
            "id" : 27,
            "price": "$467",
            "rewardpoint": 784,
        },
        {      
            "id" : 28,
            "price": "$521",
            "rewardpoint": 892,
        },
        {      
            "id" : 29,
            "price": "$618",
            "rewardpoint": 1086,
        },
        {      
            "id" : 30,
            "price": "$986",
            "rewardpoint": 1822,
        },
        {      
            "id" : 31,
            "price": "$1105",
            "rewardpoint": 2060,
        },
        {      
            "id" : 32,
            "price": "$723",
            "rewardpoint": 1296,
        },
        {      
            "id" : 33,
            "price": "$533",
            "rewardpoint": 916,
        },
        {      
            "id" : 34,
            "price": "$24",
            "rewardpoint": 0,
        },
        {      
            "id" : 35,
            "price": "$30",
            "rewardpoint": 0,
        },
        {      
            "id" : 36,
            "price": "$531",
            "rewardpoint": 912,
        },
        {      
            "id" : 37,
            "price": "$1142",
            "rewardpoint": 2134,
        },
        {      
            "id" : 38,
            "price": "$1030",
            "rewardpoint": 1910,
        },
        {      
            "id" : 39,
            "price": "$1241",
            "rewardpoint": 2332,
        },
        {      
            "id" : 40,
            "price": "$833",
            "rewardpoint": 1516,
        },{      
            "id" : 41,
            "price": "$1242",
            "rewardpoint": 2334,
        },{      
            "id" : 42,
            "price": "$93",
            "rewardpoint": 43,
        },{      
            "id" : 43,
            "price": "$229",
            "rewardpoint": 308,
        },{      
            "id" : 44,
            "price": "$101",
            "rewardpoint": 52,
        },{      
            "id" : 45,
            "price": "$744",
            "rewardpoint": 1338,
        },{      
            "id" : 46,
            "price": "$771",
            "rewardpoint": 1392,
        },{      
            "id" : 47,
            "price": "$477",
            "rewardpoint": 804,
        },{      
            "id" : 48,
            "price": "$779",
            "rewardpoint": 1408,
        },{      
            "id" : 49,
            "price": "$862",
            "rewardpoint": 1574,
        },{      
            "id" : 50,
            "price": "$559",
            "rewardpoint": 968,
        },{      
            "id" : 51,
            "price": "$771",
            "rewardpoint": 1392,
        },{      
            "id" : 52,
            "price": "$997",
            "rewardpoint": 1844,
        },{      
            "id" : 53,
            "price": "$485",
            "rewardpoint": 820,
        },{      
            "id" : 54,
            "price": "$1078",
            "rewardpoint": 2006,
        },{      
            "id" : 55,
            "price": "$666",
            "rewardpoint": 1182,
        },{      
            "id" : 56,
            "price": "$1175",
            "rewardpoint": 2200,
        },{      
            "id" : 57,
            "price": "$1062",
            "rewardpoint": 1974,
        },{      
            "id" : 58,
            "price": "$527",
            "rewardpoint": 904,
        },{      
            "id" : 59,
            "price": "$652",
            "rewardpoint": 1154,
        },{      
            "id" : 60,
            "price": "$657",
            "rewardpoint": 1164,
        },{      
            "id" : 61,
            "price": "$775",
            "rewardpoint": 1400,
        },{      
            "id" : 62,
            "price": "$1094",
            "rewardpoint": 2038,
        },{      
            "id" : 63,
            "price": "$265",
            "rewardpoint": 380,
        },{      
            "id" : 64,
            "price": "$906",
            "rewardpoint": 1662,
        },{      
            "id" : 65,
            "price": "$1155",
            "rewardpoint": 2160,
        },{      
            "id" : 66,
            "price": "$1206",
            "rewardpoint": 2262,
        },{      
            "id" : 67,
            "price": "$63",
            "rewardpoint": 13,
        },{      
            "id" : 68,
            "price": "$764",
            "rewardpoint": 1378,
        },{      
            "id" : 69,
            "price": "$961",
            "rewardpoint": 1772,
        },{      
            "id" : 70,
            "price": "$1",
            "rewardpoint": 0,
        },{      
            "id" : 71,
            "price": "$623",
            "rewardpoint": 1096,
        },{      
            "id" : 72,
            "price": "$1109",
            "rewardpoint": 2068,
        },{      
            "id" : 73,
            "price": "$1061",
            "rewardpoint": 1972,
        },{      
            "id" : 74,
            "price": "$6",
            "rewardpoint": 0,
        },{      
            "id" : 75,
            "price": "$386",
            "rewardpoint": 622,
        },{      
            "id" : 76,
            "price": "$1065",
            "rewardpoint": 1980,
        },{      
            "id" : 77,
            "price": "$790",
            "rewardpoint": 1430,
        },{      
            "id" : 78,
            "price": "$1112",
            "rewardpoint": 2074,
        },{      
            "id" : 79,
            "price": "$204",
            "rewardpoint": 258,
        },{      
            "id" : 80,
            "price": "$221",
            "rewardpoint": 292,
        },{      
            "id" : 81,
            "price": "$74",
            "rewardpoint": 24,
        },{      
            "id" : 82,
            "price": "$1133",
            "rewardpoint": 2116,
        },{      
            "id" : 83,
            "price": "$564",
            "rewardpoint": 978,
        },{      
            "id" : 84,
            "price": "$865",
            "rewardpoint": 1580,
        },{      
            "id" : 85,
            "price": "$418",
            "rewardpoint": 686,
        },{      
            "id" : 86,
            "price": "$675",
            "rewardpoint": 1200,
        },{      
            "id" : 87,
            "price": "$1107",
            "rewardpoint": 2064,
        },{      
            "id" : 88,
            "price": "$118",
            "rewardpoint": 86,
        },{      
            "id" : 89,
            "price": "$1186",
            "rewardpoint": 2222,
        },{      
            "id" : 90,
            "price": "$1055",
            "rewardpoint": 1960,
        }

        
    ]

    return (
        <div> 
            <h3 style={{textAlign: 'center', textTransform:"capitalize"}}>The Reward report for last 3 months is: </h3> 
            <Table columns={columns} data={data} />
        </div>
    )
}

export default FilterTableComponent;