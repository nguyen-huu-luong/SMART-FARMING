import React from 'react';

import {Navigation} from 'react-minimal-side-navigation';
import { AiOutlineHome , AiOutlineCode, AiOutlineHistory} from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { TbDeviceDesktop } from "react-icons/tb";

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useLocation, useNavigate } from 'react-router-dom';


function Navigate() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
      <>
        <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/dashboard"
            onSelect={({itemId}) => {
                navigate(itemId);
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => <AiOutlineHome color="var(--primary)" size={24}/>,
                subNav: [
                    {
                      title: 'Sub menu',
                      itemId: '/management/teams',
                    },
                    {
                      title: 'Sub menu',
                      itemId: '/management/teams',
                    },
                  ],                
              },
              {
                title: 'Devices',
                itemId: '/devices',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => <TbDeviceDesktop color="var(--primary)" size={24}/>,
              },
              {
                title: 'Water plan',
                itemId: '/plan',
                elemBefore: () => <BsCalendarDate color="var(--primary)" size={24}/>,
                // subNav: [ // Sử dụng nếu có menu con
                //   {
                //     title: 'Projects',
                //     itemId: '/management/projects',
                //   },
                //   {
                //     title: 'Members',
                //     itemId: '/management/members',
                //   },
                // ],
              },
              {
                title: 'Set threshold',
                itemId: '/threshold',
                elemBefore: () => <AiOutlineCode color="var(--primary)" size={24}/>,
              },
              {
                title: 'View history',
                itemId: '/history',
                elemBefore: () => <AiOutlineHistory color="var(--primary)" size={24}/>,
                
              },
            ]}
          />
      </>
    );
}

export default Navigate;