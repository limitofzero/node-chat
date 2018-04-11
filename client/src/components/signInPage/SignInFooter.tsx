import * as React from 'react';
import { Grid, Button } from 'material-ui';

export default function SignInFooter() {
    return <Grid item className='sign-in_footer' xs={12}>
            <Button>
                Lost your pasport?
            </Button>
            <Button>
                Register
            </Button>
        </Grid>
}