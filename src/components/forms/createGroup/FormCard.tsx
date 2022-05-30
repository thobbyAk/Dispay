import * as React from 'react'
import { IGroup } from '@/types/group'
import { Grid, Typography, Box } from '@mui/material'
import Layout from '../../Layout'
import { useFormContext } from 'react-hook-form'
import { Container } from 'reactstrap'

interface IStep {
  children: React.ReactNode
  formStep: number
}
export default function FormCard({ children, formStep }: IStep) {
  const { getValues } = useFormContext<IGroup>()
  return (
    <>
      <Layout>
        <Box sx={{ p: 5 }}>
          <Grid
            container
            direction="row"
            justifyContent="Center"
            alignItems="center"
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                CREATE A GROUP
              </Typography>
            </Box>
          </Grid>
        </Box>
        <Box
          sx={{
            maxWidth: '30rem',
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 4,
          }}
        >
          {formStep > 0 && (
            <>
              <Typography
                component="span"
                variant="subtitle2"
                sx={{ color: '#959ca7', textAlign: 'left' }}
              >
                What should we call this group?
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: 'white', mr: 3, textAlign: 'left' }}
              >
                {getValues('name')}
                <Typography
                  component="span"
                  variant="subtitle2"
                  sx={{ color: '#959ca7', mx: 3, textAlign: 'left' }}
                >
                  Group Token :{getValues('symbol')}
                </Typography>
              </Typography>
            </>
          )}

          {formStep > 1 && (
            <>
              <Typography
                variant="subtitle2"
                sx={{ color: '#959ca7', mt: 4, textAlign: 'left' }}
              >
                What’s the upper limit of the groups raise?
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: 'white', textAlign: 'left' }}
              >
                {getValues('depositLimit')}
                <Typography
                  component="span"
                  variant="subtitle2"
                  sx={{ color: '#959ca7', mx: 3, textAlign: 'left' }}
                >
                  <img
                    src={getValues('token.logoURI')}
                    alt={getValues('token.symbol')}
                    style={{ marginRight: '10px' }}
                  />

                  {getValues('token.symbol')}
                </Typography>
              </Typography>
            </>
          )}

          {formStep > 2 && (
            <>
              <Typography
                variant="subtitle2"
                sx={{ color: '#959ca7', mt: 5, textAlign: 'left' }}
              >
                When will deposits close?
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: 'white', mr: 3, textAlign: 'left' }}
              >
                <> {getValues('depositEndDate').toLocaleDateString()}</>
              </Typography>
            </>
          )}
        </Box>
        <Box
          sx={{
            maxWidth: '30rem',
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Container>
            <>{children}</>
          </Container>
        </Box>
      </Layout>
    </>
  )
}
