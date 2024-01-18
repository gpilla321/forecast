import { Button, Grid, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form";
import { SearchInput } from "../type";

type SearchForm = {
    street: string,
    city: string,
    zip: number
}

type ISearchForm = {
    handleSearch: (input: SearchInput) => void;
}

const SearchForm = ({ handleSearch }: ISearchForm) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SearchForm>();

    const onSubmit: SubmitHandler<SearchForm> = data => {
        handleSearch({
            street: data.street,
            city: data.city,
            zip: data.zip.toString()
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
                <Grid item xs={12} style={{ marginBottom: '10px' }}>
                    <TextField
                        fullWidth
                        label="Street"
                        type="text"
                        autoComplete="off"
                        {...register('street', { required: true })}
                    />
                    {errors.street?.type === 'required' &&
                        <Typography variant="subtitle2">Street is required</Typography>}
                </Grid>
                <Grid item xs={12} style={{ marginBottom: '10px' }}>
                    <TextField
                        fullWidth
                        label="City"
                        type="text"
                        autoComplete="off"
                        {...register('city', { required: true })}
                    />
                    {errors.city?.type === 'required' &&
                        <Typography variant="subtitle2">City is required</Typography>}
                </Grid>
                <Grid item xs={12} style={{ marginBottom: '10px' }}>
                    <TextField
                        fullWidth
                        label="Zip (only numbers)"
                        type="number"
                        autoComplete="off"
                        {...register('zip', { required: true })}
                    />
                    {errors.zip?.type === 'required' &&
                        <Typography variant="subtitle2">Zip is required</Typography>}
                </Grid>
                <Button type="submit" variant="contained" style={{ marginRight: '10px' }}>Search</Button>
                <Button variant="outlined" onClick={() => reset()}>Clear</Button>
            </Grid>
        </form>
    )
}

export default SearchForm;