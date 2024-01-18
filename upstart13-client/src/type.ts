

export type SearchInput = {
    street: string;
    city: string;
    zip: string;
}

export type KeyValuePair = {
    [key: string]: any;
}

export type Coordinates = {
    x: number;
    y: number;
};

export type AddressComponents = {
    zip: string;
    streetName: string;
    preType: string;
    city: string;
    preDirection: string;
    suffixDirection: string;
    fromAddress: string;
    state: string;
    suffixType: string;
    toAddress: string;
    suffixQualifier: string;
    preQualifier: string;
};

export type LocationData = {
    coordinates: Coordinates;
    addressComponents: AddressComponents;
};

export type SelectedLatitudeAndLongitude = {
    latitude: number;
    longitude: number;
}

export interface WeatherForecastResult {
    periods: WeatherForecastForNextDays[];
}

export interface WeatherForecastForNextDays {
    number: number;
    name: string;
    startTime: Date;
    endTime: Date;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    temperatureTrend: any;
    probabilityOfPrecipitation: ProbabilityOfPrecipitation;
    dewpoint: Dewpoint;
    relativeHumidity: RelativeHumidity;
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
}

interface ProbabilityOfPrecipitation {
    unitCode: string;
    value: any;
}

interface Dewpoint {
    unitCode: string;
    value: number;
}

interface RelativeHumidity {
    unitCode: string;
    value: number;
}
