import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import bonLogo from 'src/assets/images/bonecoleNav.png'

import Searchbar from './Searchbar2';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';
import Searchbar2 from './Searchbar2';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import { useLocation,useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
   // width: `calc(100% - ${NAV_WIDTH + 1}px)`,
   width:"100%"
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPathname = location.pathname;

  const clickOnly = (e) =>{
    e.stopPropagation()
    navigate('/dashboard/home')
  }

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton onClick={(e)=>{clickOnly(e)}}
          //onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'block' },
          }}
        >
           <img  style={{height:"25px"}} src ={bonLogo}/> 
          {/*<Iconify icon="eva:menu-2-fill" />*/}
        </IconButton>
       
        
        {/* <Searchbar /> */}
        {/* <Searchbar2 /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
         <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'block' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
         {/*<AccountPopover />*/}
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
