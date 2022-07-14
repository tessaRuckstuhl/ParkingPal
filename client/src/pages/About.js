import { Divider, Grid, Paper, Link } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import Image from 'mui-image'
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
                    <Grid item xs={4} >
                        <Item style={{ justifyContent: 'begin', textAlign: 'justify' }}>
                            <Image
                                src={require('../images/markus.png')} 
                                height="100%"
                                width="100%"
                                fit="cover"
                                duration={
                                    3000
                                }
                                shift={null}
                                distance="100px"
                            />

                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item style={{ justifyContent: 'begin', textAlign: 'justify' }}>

                            <br />
                            <b>Markus Gruber</b>
                            <Divider sx={{ bgcolor: "#883df2" }} />
                            <br />
                            <b>Age:</b> &emsp; &emsp; 26<br />
                            <b>Studies:</b> &emsp; M.Sc. Information Systems<br />

                            <br />
                            "Full Stack Developer"
                            <br />
                            <br />

                            <Link target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/markus-gruber-0b2b41bb/"><LinkedInIcon href="www.google.de" color="primary" fontSize="small"></LinkedInIcon></Link>
                            

                        </Item>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Item style={{ justifyContent: 'begin', textAlign: 'justify' }}>
                            <Image
                                src={require('../images/jakob.png')} 
                                height="100%"
                                width="100%"
                                fit="cover"
                                duration={
                                    3000
                                }
                                shift={null}
                                distance="100px"
                            />

                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item style={{ justifyContent: 'begin', textAlign: 'justify' }}>

                            <br />
                            <b>Jakob Kempter</b>
                            <Divider sx={{ bgcolor: "#883df2" }} />
                            <br />
                            <b>Age:</b> &emsp; &emsp; 24<br />
                            <b>Studies:</b> &emsp; M.Sc. Information Systems<br />

                            <br />
                            "My software never has bugs. It just develops random features."
                            <br />
                            <br />

                            <Link target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jakob-kempter-45b543182/"><LinkedInIcon href="www.google.de" color="primary" fontSize="small"></LinkedInIcon></Link>
                            


                        </Item>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Item style={{  justifyContent: 'begin', textAlign: 'justify' }}>
                            <Image
                                src={require('../images/alex.png')}
                                height="100%"
                                width="100%"
                                fit="cover"
                                duration={
                                    3000
                                }
                                shift={null}
                                distance="100px"
                            />

                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item style={{ justifyContent: 'begin', textAlign: 'justify' }}>

                            <br />
                            <b>Alexander Karpp</b>
                            <Divider sx={{ bgcolor: "#883df2" }} />
                            <br />
                            <b>Age:</b> &emsp; &emsp; 24<br />
                            <b>Studies:</b> &emsp; M.Sc. Information Systems<br />

                            <br />
                            "The best thing about a boolean is even if you are wrong, you are only off by a bit."
                            <br />
                            <br />

                            <Link target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/lxkrpp/"><LinkedInIcon href="www.google.de" color="primary" fontSize="small"></LinkedInIcon></Link>


                            

                        </Item>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Item style={{ justifyContent: 'begin', textAlign: 'justify' }}>
                            <Image
                                src={require('../images/tessa.png')}
                                height="100%"
                                width="100%"
                                fit="cover"
                                duration={
                                    3000
                                }
                                shift={null}
                                distance="100px"
                            />

                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item style={{  justifyContent: 'begin', textAlign: 'justify' }}>

                            <br />
                            <b>Tessa Ruckstuhl</b>
                            <Divider sx={{ bgcolor: "#883df2" }} />
                            <br />
                            <b>Age:</b> &emsp; &emsp; 24<br />
                            <b>Studies:</b> &emsp; M.Sc. Computer Science<br />

                            <br />
                            "Coding is my warmup - debugging is my cardio"
                            <br />
                            <br />

                            <Link target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/tessa-ruckstuhl-3571661a1/"><LinkedInIcon href="www.google.de" color="primary" fontSize="small"></LinkedInIcon></Link>
                            


                        </Item>
                    </Grid>
                </Grid>
                <br />

            </div>
        </div>
    )
}


export default About;