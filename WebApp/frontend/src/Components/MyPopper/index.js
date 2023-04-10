import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';

function MyPopper({children, toggle}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" className='bg-white position-relative' onClick={handleClick}>
        {toggle}
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ bgcolor: 'background.paper' }} className="px-3 shadow">
          {children}
        </Box>
      </Popper>
    </div>
  );
}

export default MyPopper