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
                    variant="square"
                />
            </Box>
        </CardContent>
        <Divider />
    </Card>
);
