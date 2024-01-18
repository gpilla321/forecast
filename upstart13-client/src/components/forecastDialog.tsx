import { Card, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import { WeatherForecastForNextDays } from "../type";
import { useEffect } from "react";
import { encodeForecast } from "../helpers/paramEncondingHelper";


type IForecastDialog = {
    latitude: number;
    longitude: number;
    visible: boolean;
    handleClose: () => void;
}

const dialogStyle = {
    padding: '1em',
    width: '100%'
}

const cardStyle = {
    marginBottom: '10px',
    padding: '1em',
    display: 'flex',
    flexDirection: 'row'
}

const ForecastDialog = ({ latitude, longitude, visible, handleClose }: IForecastDialog) => {
    const { fetchData, data, error, isLoading } = useFetchData<WeatherForecastForNextDays[]>("https://localhost:7222/WeatherForecast/GetForecast");

    useEffect(() => {
        fetchData(encodeForecast(latitude, longitude));
    }, [latitude, longitude])

    return (
        <Dialog onClose={handleClose} open={visible} sx={dialogStyle}>
            <DialogTitle>Forecast for the next week</DialogTitle>
            {isLoading && (
                <CircularProgress />
            )}

            {!isLoading && (
                <DialogContent>

                    {data && data.length > 0 &&
                        data.map(_ => (
                            <Card sx={cardStyle}>
                                <div style={{ marginRight: '10px' }}>
                                    <img src={_.icon} />
                                </div>
                                <div>
                                    <Typography variant="h6">{_.name} - {_.shortForecast} ({_.temperature}°{_.temperatureUnit})</Typography>
                                    <Typography variant="caption">{_.detailedForecast}</Typography>
                                </div>
                            </Card>
                        ))
                    }
                </DialogContent>
            )}

        </Dialog>
    )
}

export default ForecastDialog;