import React, { useState } from 'react';
import {Button, Collapse, Card} from 'react-bootstrap';


const User = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="dashboard-menu"
        aria-expanded={open}
      >
        click
      </Button>
      <Collapse in={open} dimension="width">
      
        <div id="dashboard-menu">
        <Card body style={{ width: '400px' }}>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Card>
        </div>
      </Collapse>
    </>
  );
};

export default User;