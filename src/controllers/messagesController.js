// src/controllers/messagesController.js
const { getMessageData } = require('../models/messagesModel');

const fetchMessages = async(req, res) => {
    const { messageType } = req.params;

    try {
        const recordset = await getMessageData(messageType);
        const data = {};

        // Process data into the desired format
        recordset.forEach(row => {
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
            if (!data[row.segment_name].fields[row.field_position]) {
                data[row.segment_name].fields[row.field_position] = {
                    field_name: row.field_name,
                    data_type: row.field_data_type,
                    required: row.field_required,
                    repeating: row.field_repeating,
                    components: []
                };
            }

            // Ensure the component exists or add it
            if (row.component_position) {
                let component = data[row.segment_name].fields[row.field_position].components.find(
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
                    data[row.segment_name].fields[row.field_position].components.push(component);
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
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

module.exports = { fetchMessages };