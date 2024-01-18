import { SearchInput } from "../type";



export const encodeAddressSearchParam = (input: SearchInput) => {
    const encodedStreet = encodeURIComponent(input.street);
    const encodedCity = encodeURIComponent(input.city);
    const encodedZip = encodeURIComponent(input.zip);

    return `street=${encodedStreet}&city=${encodedCity}&zip=${encodedZip}`
}

export const encodeForecast = (latitude: number, longitude: number) => {
    const encodedLatitude = encodeURIComponent(latitude);
    const encodedLongitude = encodeURIComponent(longitude);
    return `longitude=${encodedLatitude}&latitude=${encodedLongitude}`
}