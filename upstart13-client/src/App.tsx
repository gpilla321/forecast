import './App.css'
import { Card, CircularProgress, Grid, Typography } from '@mui/material'
import SearchForm from './components/searchForm'
import { LocationData, SearchInput, SelectedLatitudeAndLongitude } from './type'
import useFetchData from './hooks/useFetchData'
import { encodeAddressSearchParam } from './helpers/paramEncondingHelper'
import AddressSearchResults from './components/addressSearchResults'
import ForecastDialog from './components/forecastDialog'
import { useState } from 'react'

function App() {
    const { fetchData, data, error, isLoading } = useFetchData<LocationData[]>("https://localhost:7222/WeatherForecast/GetGeoLocation");
    const [selectedAddress, setSelectedAddress] = useState<SelectedLatitudeAndLongitude | null>(null);

    const handleSearch = async (input: SearchInput) => {
        await fetchData(encodeAddressSearchParam(input));
    }

    const handleAddress = (latitude: number, longitude: number) => setSelectedAddress({ latitude, longitude });


    return (
        <Grid container>
            <Grid item xs={0} md={3}></Grid>
            <Grid item xs={12} md={6}>
                <Card sx={{ marginBottom: '10px', padding: '15px' }}>
                    <Typography variant="h6" sx={{ textAlign: 'left', marginBottom: '10px' }}>
                        Enter the address
                    </Typography>
                    <SearchForm handleSearch={handleSearch} />
                </Card>
                {isLoading && (
                    <CircularProgress />
                )}
                {data && data.length > 0 && (
                    <>
                        <Typography variant='h6' sx={{ color: '#323232', textAlign: 'left' }}>Results</Typography>
                        <AddressSearchResults data={data} handleAddress={handleAddress} />
                    </>
                )}

                {data && data.length == 0 && (
                    <Typography variant="h6" sx={{ color: '#323232', textAlign: 'left' }}>No results</Typography>
                )}
            </Grid>

            {selectedAddress && (
                <ForecastDialog
                    visible={true}
                    handleClose={() => setSelectedAddress(null)}
                    latitude={selectedAddress.latitude}
                    longitude={selectedAddress.longitude}
                />
            )}
        </Grid>
    )
}

export default App
