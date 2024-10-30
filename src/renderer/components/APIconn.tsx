import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export interface orders {
    id: number
    price: number
    orderLengthDays: number
    paymentResolved: number
    orderCreatedAt: string
    orderStartDate: string
    orderEndDate: string
    orderDue: string
    customerName: string
    customerPhone: string
    customerEmail: string
    orderStatus: string
    message: string
}

function APIconn() {
    const [data, setData] = useState<orders[]>([]);

    useEffect (() => {
        axios.get('LAITA OMA URLI TÄHÄN')
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error.response.data);
            });
    }, []);

    return (
        <Box className="calendarinfo">
                {data.map(item => {
                    return(
                        <div className="eventinfo">
                            <p> {item.orderStartDate} </p>
                            <p> {item.customerName} </p>
                            <p> {item.message} </p>
                        </div>
                    );
                })}
        </Box>
    );
}
export default APIconn;