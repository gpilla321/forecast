import { Button, Card, Typography } from "@mui/material";
import { LocationData } from "../type"

type IAddressSearchResults = {
    data: LocationData[];
    handleAddress: (latitude: number, longitude: number) => void;
}

const cardStyle = {
    textAlign: 'left',
    padding: '1em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
}

const AddressSearchResults = ({ data, handleAddress }: IAddressSearchResults) => {
    return (
        <>
            {data && data.map((_) => (
                <Card sx={cardStyle} key={_.coordinates.x}>
                    <div>
                        <Typography variant="h5">
                            {_.addressComponents.streetName}
                        </Typography>

                        <Typography variant="body1">
                            {_.addressComponents.city}, {_.addressComponents.state} {_.addressComponents.zip}
                        </Typography>
                    </div>
                    <div>
                        <Button variant="contained" onClick={() => handleAddress(_.coordinates.x, _.coordinates.y)}>
                            Choose
                        </Button>
                    </div>
                </Card>
            ))
            }
        </>

    )
}


export default AddressSearchResults;