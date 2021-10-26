import React, { useState }  from 'react';
import { useChatContext }  from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets'

//! Editar canales
const ChannelNameInput = ({ channelName = '', setChannelName }) => {

    const handleChange = (event) => {
        event.preventDefault(); //! evita que el navegador se vuelva a cargar
        setChannelName(event.target.value);
    }
    
    return (
        <div className="channel-name-input__wrapper">
             <p>Nombre</p>
             <input value={channelName} onChange={handleChange} placeholder="channel-name" />
             <p>Agregar Usuarios</p>
        </div>
    )
}

const EditChannel = ({ setIsEditing }) => {
    const { channel } = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const updateChannel = async (event) => {
        event.preventDefault();

        const nameChanged = channelName !== (channel.data.name ||channel.data.id);

        if(nameChanged) {
            await channel.update({ name: channelName }, { text: `Nombre del canal cambiado por ${channelName}`});
        }

        if(selectedUsers.lenght) {
            await channel.addMembers(selectedUsers);
        }

        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);

    }

    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Editar Canal</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Guardar cambios</p>
            </div>
        </div>
    )
}

export default EditChannel;
