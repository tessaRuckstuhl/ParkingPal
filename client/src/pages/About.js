import { Divider, Grid, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import React from 'react';
import { Container } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const About = () => {
    return (
        <div className="flex flex-col items-center ">
            <div className="w-3/4">
                <div className="mb-6 mt-6 text-xl"><b>Hello, nice to meet you!</b></div>

                <div className="mb-6 mt-6 text-xl"> <b>We are Team 47 and by far the best looking team in SEBA</b> </div>
                <Divider />
                <br />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item style={{ height: 300, justifyContent: 'begin', textAlign: 'justify' }}>
                            <br />
                            <b>Image Placeholder</b>

                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item style={{ height: 300, justifyContent: 'begin', textAlign: 'justify' }}>

                            <br />
                            <b>Markus Gruber</b>
                            <Divider sx={{ bgcolor: "#883df2" }} />
                            <br />
                            <b>Age:</b> &emsp; &emsp; 35<br />
                            <b>Studies:</b> &emsp; M.Sc. Information Systems<br />

                            <br />
                            "Full Stack Developer"

                        </Item>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item style={{ height: 300, justifyContent: 'begin', textAlign: 'justify' }}>
                            <br />
                            <b>Image Placeholder</b>

                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item style={{ height: 300, justifyContent: 'begin', textAlign: 'justify' }}>

                            <br />
                            <b>Jakob Kempter</b>
                            <Divider sx={{ bgcolor: "#883df2" }} />
                            <br />
                            <b>Age:</b> &emsp; &emsp; 24<br />
                            <b>Studies:</b> &emsp; M.Sc. Information Systems<br />

                            <br />
                            "Funny guy"

                        </Item>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item style={{ height: 300, justifyContent: 'begin', textAlign: 'justify' }}>
                            <br />
                            <b>Image Placeholder</b>

                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item style={{ height: 300, justifyContent: 'begin', textAlign: 'justify' }}>

                            <br />
                            <b>Alexander Karpf</b>
                            <Divider sx={{ bgcolor: "#883df2" }} />
                            <br />
                            <b>Age:</b> &emsp; &emsp; 24<br />
                            <b>Studies:</b> &emsp; M.Sc. Information Systems<br />

                            <br />
                            "Professional Tennis Player"

                        </Item>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item style={{ height: 300, justifyContent: 'begin', textAlign: 'justify' }}>
                            <br />
                            <b>Image Placeholder</b>

                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item style={{ height: 300, justifyContent: 'begin', textAlign: 'justify' }}>

                            <br />
                            <b>Tessa Ruckstuhl</b>
                            <Divider sx={{ bgcolor: "#883df2" }} />
                            <br />
                            <b>Age:</b> &emsp; &emsp; 24<br />
                            <b>Studies:</b> &emsp; M.Sc. Computer Science<br />

                            <br />
                            "Berghain or I stay at home"

                        </Item>
                    </Grid>
                </Grid>
                <br />

            </div>
        </div>
    )
}


export default About;