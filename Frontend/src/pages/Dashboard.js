import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import NavBar from '../components/SideBar/NavBar';
import './Dashboard.css'; // Add your custom CSS for styling
import { useDispatch, useSelector } from 'react-redux';

import { Navigate, useNavigate } from 'react-router-dom';

import Chat from './Chat';
import { setIsLogged } from '../redux/Authentication/slices/authenticationSlice';
import TopicMenu from '../components/SideBar/TopicMenu';
import SideBar from '../components/SideBar/SideBar';
import Quiz from '../components/Quiz';
import Login from './Login'; // Assuming you have a Login component
import { redirectLogout } from '../redux/Authentication/actions/authenticationAction';
import AvailableGroups from './AvailableGroups';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.authentication.isLogged);
    const topics = isLogged ? ["Chat", "Join Group", "Logout"] : ["Login"];
    const [contentIndex, setContentIndex] = useState("0");
    const [selectedKey, setSelectedKey] = useState("0");
    const [collapsed, setCollapsed] = useState(false); // State for sidebar collapse

    const changeSelectedKey = (event) => {
        const key = event.key;
        setSelectedKey(key);
        setContentIndex(+key);
    };

    const role = "user";

    const renderContent = () => {
        if (!isLogged) {
            switch (contentIndex) {
                case 0:
                    return <Login />;
                default:
                    return null;
            }
        } else {
            switch (contentIndex) {
                case 0:
                    return <Chat/>;
                case 1:
                    return <AvailableGroups/>;
                case 2:
                    dispatch(redirectLogout());
                    return null; // Return null or some loading indicator
                default:
                    return topics[contentIndex];
            }
        }
    };

    const Menu = (
        <TopicMenu
            topics={topics}
            selectedKey={selectedKey}
            changeSelectedKey={changeSelectedKey}
        />
    );

    return (
        <div className='vh-100'>
            <NavBar menu={Menu} />
            <Layout>
                <SideBar menu={Menu} collapsed={collapsed} />
                <Layout className="site-layout">
                    <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
                        <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </Button>
                    </Layout.Header>
                    <Layout.Content className="content m-0 p-0">
                        {renderContent()}
                    </Layout.Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Dashboard;
