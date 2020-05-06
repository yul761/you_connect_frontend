import React, { useState, useEffect } from "react";

export default function RealTimeChat(props) {
  //{message:text, dir:0/1}

  useEffect(() => {
    // let msg1 = { msg: "welcome message for logged in user", dir: 1 };
    // let msg0 = { msg: "welcome message for incoming user", dir: 0 };
    console.log(props.selectedFriend);
  }, [props.selectedFriend]);

  //   messageDisplayHandler = () => {};

  return <div className="messagePanel__container--right--chatroom"></div>;
}
