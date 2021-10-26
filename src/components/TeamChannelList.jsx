import React from "react";

import { AddChannel } from "../assets/AddChannel";

const TeamChannelList = ({ setToggleContainer, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
  if (error) {
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Error de conexion por favor espera un momento o vuelve a intentarlo
        </p>
      </div>
    ) : null;
  }

 if(loading) {
     return (
        <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === "team" ? "Channels" : "Messages"} Cargando...
        </p>
      </div>
        )
 }

  return (
    <div className="team-channel-lits">
        <div className="team-channel-list__header">
            <p className="team-channel-list__header__title">
            {type === "team" ? "Canales" : "Mensajes directos"}
            </p>
            <AddChannel 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              type={type === 'team' ? 'team' : 'messaging'}
              setToggleContainer={setToggleContainer}
            />
        </div>
        {children}
  </div>
  ) 
};

export default TeamChannelList;
