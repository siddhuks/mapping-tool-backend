// src/models/messagesModel.js
const { poolPromise, sql } = require('../config/db');

const getMessageData = async(messageType) => {
    const query = `
    SELECT 
        s.segment_name,
        s.description AS segment_description,
        s.position AS segment_position,
        s.required AS segment_required,
        s.repeating AS segment_repeating,
        f.field_position,
        f.field_name,
        f.data_type AS field_data_type,
        f.required AS field_required,
        f.repeating AS field_repeating,
        cg.group_name AS component_group_name,
        c.component_position,
        c.component_name,
        c.data_type AS component_data_type,
        scg.group_name AS subcomponent_group_name,
        sc.subcomponent_position,
        sc.subcomponent_name,
        sc.data_type AS subcomponent_data_type
    FROM 
        messages.MessageTypes m
    JOIN 
        messages.Segments s ON s.message_type_id = m.id
    LEFT JOIN 
        messages.Fields f ON f.segment_id = s.id
    LEFT JOIN 
        messages.ComponentGroups cg ON f.component_group_id = cg.id
    LEFT JOIN 
        messages.Components c ON c.group_id = cg.id
    LEFT JOIN 
        messages.SubcomponentGroups scg ON c.subcomponent_group_id = scg.id
    LEFT JOIN 
        messages.Subcomponents sc ON sc.group_id = scg.id
    WHERE 
        m.message_type = @messageType
    ORDER BY 
        s.position, f.field_position, c.component_position, sc.subcomponent_position;
    `;

    const pool = await poolPromise;
    const result = await pool.request()
        .input('messageType', sql.NVarChar, messageType)
        .query(query);

    return result.recordset;
};

module.exports = { getMessageData };