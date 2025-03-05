// Material UI 
import { Box, Container, Divider, Typography } from '@mui/material';

// SCSS
import '@/styles/layout/__footer.scss';

export default function Footer() {
    return (
        <Box className='custom-footer'>
            <div className='footer-container'>
                <Box className='footer-content'>
                    <Box className='section'>
                        <Typography className='title company'>
                            PT Fast Food Indonesia Tbk
                        </Typography>

                        <Box className='child'>
                            <Typography className='sub-child address'>
                                Alamat : Jl. Let. Jend. Haryono M.T. Kav.7 Jakarta 12810, Indonesia
                            </Typography>
                            <Typography className='sub-child'>
                                Operating hours: 24 Hours
                            </Typography>
                            <Typography className='sub-child'>
                                Telephone: 14022
                            </Typography>
                            <Typography className='sub-child'>
                                Fax: (+6221) 79183947
                            </Typography>
                            <Typography className='sub-child'>
                                E-mail: info@kfcindonesia.com
                            </Typography>
                        </Box>   
                    </Box>

                    <Box className="grouped-section">
                        <Box className='section'>
                            <Typography className='title'>
                                Layanan
                            </Typography>

                            <Box className='child'>
                                <Typography className='sub-child'>
                                    Dine-in
                                </Typography>

                                <Typography className='sub-child'>
                                    Take Away
                                </Typography>

                                <Typography className='sub-child'>
                                    Delivery
                                </Typography>

                                <Typography className='sub-child'>
                                    Drive-Thru
                                </Typography>

                                <Typography className='sub-child'>
                                    Catering
                                </Typography>

                                <Typography className='sub-child'>
                                    B'day Party
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Box className='section'>
                            <Typography className='title'>
                                Info
                            </Typography>

                            <Box className='child'>
                                <Typography className='sub-child'>
                                    Terms & Condition
                                </Typography>

                                <Typography className='sub-child'>
                                    Privacy Policy
                                </Typography>

                                <Typography className='sub-child'>
                                    Contact Us
                                </Typography>

                                <Typography className='sub-child'>
                                    About Us
                                </Typography>

                                <Typography className='sub-child'>
                                    FAQ
                                </Typography>
                            </Box>
                            
                        </Box>
                    </Box>
                    
                    <Box className='section'>
                        <Typography className='title'>
                            Download App
                        </Typography>
                        <Box className='child'>
                            <Box className='cta-download'>
                                <img src="/assets/cta/appstore.png" alt="" />
                                <img src="/assets/cta/playstore.png" alt="" />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                
                <Divider sx={{ background: ' #CDD0D4', margin: '40px 0'}}/>
                
                <Box className='social'>
                    <Typography className='reserved'>
                        © {new Date().getFullYear()} KFCKU.com by PT FASTFOOD Indonesia Tbk. | All rights reserved.
                    </Typography>

                    <Box className='social-media'>
                        <img src="/assets/icon/facebook.png" alt="" />
                        <img src="/assets/icon/insta.png" alt="" />
                        <img src="/assets/icon/youtube.png" alt="" />
                        <img src="/assets/icon/x.png" alt="" />
                    </Box>
                </Box>
            </div>
        </Box>
    );
};
