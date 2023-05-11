import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const GeotabApi = require('mg-api-js');


//TODO: how to add the users details? should i create a modal login page that
//will authenticate them?
const authDetails = {
    credentials: {
        database: 'pgt_technologies',
        userName: 'jeffrysandoval24@gmail.com',
        password: 'testPassword'
    },
    // path: 'https://my.geotab.com/'
}

const api = new GeotabApi(authDetails);


function Dropdown() {

    const [selectedVehicle, setSelectedVehicle] = useState(''); 
    const [vehicleList, setVehicleList] = useState([]);

    useEffect(() => {
        getDevices();
    }, [])

    function getDevices() {
        console.log("called get devices")
        api.call('Get', {
            typeName: 'Device',
            // search: {
            //     id: "b1B",
            // }
            resultsLimit: 10,
        }, function (result) {
            console.log("success")
            if (result) {
                result.forEach((res) => {
                    setVehicleList(vehicleList => [...vehicleList, res.name]);
                    console.log(res.name);
                });
                
            }
        }, function (err) {
            console.log("error");
            console.error(err);
        });
    }

    function handleChange(event) {
        setSelectedVehicle(event.target.value);
      };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Vehicles</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedVehicle}
                    label="Vehicle"
                    onChange={handleChange}
                >
                    {vehicleList.map((vehicle, index) => {
                        console.log("vehicle list is");
                        console.log(vehicleList);
                        console.log(vehicle + " in map");
                        return <MenuItem 
                            key={index} 
                            value={vehicle}>
                                {vehicle}</MenuItem>
                    })}
                    
                </Select>
            </FormControl>
        </Box>
        // <div>
        //     <button 
        //         type="button"
        //         onClick={getDevices}>Click me
        //         </button>
        // </div>
    )
}

export default Dropdown;