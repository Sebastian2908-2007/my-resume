import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="#1976d2" href="/">
          Resume
        </Link>
        <Link
          underline="hover"
          color="#1976d2"
          href="/material-ui/getting-started/installation/"
        >
          About
        </Link>
        <Link underline="hover" color="#1976d2" href="/">
          Services
        </Link>
      </Breadcrumbs>
    </div>
  );
}
