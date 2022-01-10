import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';

export const ProductProfile = (props) => (
    <Card>
        <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Avatar
                    alt="Product"
                    // src={product.media}
                    variant="square"
                />
                {/* <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {props.product.display_name}
                </Typography> */}
            </Box>
        </CardContent>
        <Divider />
    </Card>
);
