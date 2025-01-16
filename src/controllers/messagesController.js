// src/controllers/messagesController.js
const { getMessageData, addemail } = require('../models/messagesModel');

const fetchMessages = async(req, res) => {
    const { messageType } = req.params;

    try {
        console.time('FetchMessages');
        const recordset = await getMessageData(messageType);
        console.timeEnd('FetchMessages');
        const data = {};

        // Process data into the desired format
        // recordset.forEach(row => {
        //     console.log("data[row.segment_name]: ", data[row.segment_name], row.segment_name)
        //         // Ensure the segment exists
        //     if (!data[row.segment_name]) {
        //         data[row.segment_name] = {
        //             description: row.segment_description,
        //             position: row.segment_position,
        //             required: row.segment_required,
        //             repeating: row.segment_repeating,
        //             fields: {}
        //         };
        //     }

        //     // Ensure the field exists
        //     if (!data[row.segment_name].fields[row.field_position]) {
        //         data[row.segment_name].fields[row.field_position] = {
        //             field_name: row.field_name,
        //             data_type: row.field_data_type,
        //             required: row.field_required,
        //             repeating: row.field_repeating,
        //             components: []
        //         };
        //     }

        //     // Ensure the component exists or add it
        //     if (row.component_position) {
        //         let component = data[row.segment_name].fields[row.field_position].components.find(
        //             comp => comp.component_position === row.component_position
        //         );

        //         // If the component doesn't exist, create and add it
        //         if (!component) {
        //             component = {
        //                 component_position: row.component_position,
        //                 component_name: row.component_name,
        //                 data_type: row.component_data_type,
        //                 subcomponent_group: row.subcomponent_group_name || null,
        //                 subcomponents: []
        //             };
        //             data[row.segment_name].fields[row.field_position].components.push(component);
        //         }

        //         // Ensure the subcomponent exists or add it
        //         if (row.subcomponent_position) {
        //             const subcomponentExists = component.subcomponents.some(
        //                 sub => sub.subcomponent_position === row.subcomponent_position
        //             );

        //             if (!subcomponentExists) {
        //                 component.subcomponents.push({
        //                     subcomponent_position: row.subcomponent_position,
        //                     subcomponent_name: row.subcomponent_name,
        //                     data_type: row.subcomponent_data_type
        //                 });
        //             }
        //         }
        //     }
        // });

        recordset.forEach(row => {
            // console.log("Processing row for segment:", row.segment_name);

            // Ensure the segment exists
            if (!data[row.segment_name]) {
                data[row.segment_name] = {
                    description: row.segment_description,
                    position: row.segment_position,
                    required: row.segment_required,
                    repeating: row.segment_repeating,
                    fields: {}
                };
            }

            // Ensure the field exists
            if (row.field_position && !data[row.segment_name].fields[row.field_position]) {
                data[row.segment_name].fields[row.field_position] = {
                    field_name: row.field_name,
                    data_type: row.field_data_type,
                    required: row.field_required,
                    repeating: row.field_repeating,
                    components: []
                };
            }

            // Add components to the field
            if (row.component_position && row.field_position) {
                let field = data[row.segment_name].fields[row.field_position];
                let component = field.components.find(
                    comp => comp.component_position === row.component_position
                );

                // If the component doesn't exist, create and add it
                if (!component) {
                    component = {
                        component_position: row.component_position,
                        component_name: row.component_name,
                        data_type: row.component_data_type,
                        subcomponent_group: row.subcomponent_group_name || null,
                        subcomponents: []
                    };
                    field.components.push(component);
                }

                // Ensure the subcomponent exists or add it
                if (row.subcomponent_position) {
                    const subcomponentExists = component.subcomponents.some(
                        sub => sub.subcomponent_position === row.subcomponent_position
                    );

                    if (!subcomponentExists) {
                        component.subcomponents.push({
                            subcomponent_position: row.subcomponent_position,
                            subcomponent_name: row.subcomponent_name,
                            data_type: row.subcomponent_data_type
                        });
                    }
                }
            }
        });



        res.json(data);
    } catch (error) {
        console.log("error: ", error)
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};


const addEmail = async(req, res) => {
    const { email, userId } = req.body;
    if (!email || !userId) {
        return res.status(400).send({ message: 'Email is required' });
    }

    console.log("email: ", email, " userId: ", userId)

    try {
        await addemail(email, userId);
        res.send({ message: 'Email added successfully!' });
    } catch (error) {
        console.error('Error adding email:', error);
        res.status(500).send({ message: 'Failed to add email.' });
    }
};

module.exports = { fetchMessages, addEmail };