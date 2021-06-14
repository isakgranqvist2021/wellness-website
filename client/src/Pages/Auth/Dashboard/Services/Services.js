import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AddServiceForm from './AddServiceForm';
import ServicesMangement from './ServicesMangement';

import 'react-tabs/style/react-tabs.css';
import './Services.scss';

function Services(props) {
    return (
        <div className="manage-services container">
            <Tabs>
                <TabList>
                    <Tab>Services</Tab>
                    <Tab>Add Service</Tab>
                </TabList>
                <TabPanel>
                    <ServicesMangement />
                </TabPanel>
                <TabPanel>
                    <AddServiceForm />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Services;