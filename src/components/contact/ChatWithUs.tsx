"use client";
import React from "react";
import { Stack, Box, Typography, Fab } from "@mui/material";
import styles from "./contact.module.css";
import Image from 'next/image';
import EmailIcon from '@mui/icons-material/Email';
import ButtonImg from "@component/component/Button";

type formType = {
  fullName: string | null,
  cell: string | undefined,
  email: string | null,
  content: string | null
}
type contactMsgType = {
  loaded: boolean,
  data: formType,
  msg: string
}
type contactMainType = {
  contactMsg: contactMsgType
}
const ChatWithUs = ({ contactMsg }: contactMainType) => {
  const staticImage = process.env.NEXT_PUBLIC_aws;
  const phone = `${staticImage}/phone.png`;
  return (
    <Stack component="main" direction="column" className={styles.chatWithUsOut}>
      {contactMsg.loaded &&
        <Stack component="section" direction="column" spacing={2} className={styles.contactMsg}>
          <h4 className="text-3xl text-blue">Message has been sent</h4>
          <h5 className="text-2xl text-white">{contactMsg.msg}</h5>
          <div className={styles.message}>
            <h6>name:{contactMsg.data.fullName}</h6>
            <h6>email:{contactMsg.data.email}</h6>
            <h6>cell:{contactMsg.data.cell}</h6>
            <h6>content</h6>
            <p className="my-2 p-2 border rounded-lg">{contactMsg.data.content}</p>
            <p>Thank you  for the message</p>
            <blockquote className="text-blue text-xl"> The Team</blockquote>
          </div>
        </Stack>
      }
      <Stack component="main" direction="row" spacing={1} className={styles.chatWithUsIn}>


        <a href="tel:+14169175768">

          <ButtonImg
          >Call Us
            <Image src={phone} width={20} height={20} alt="www.masterconnect.ca" className="border border-white rounded-full shadow shadow-white" />
          </ButtonImg>

        </a>
        <a href="mailto:masterconnect919@gmail.com">

          <ButtonImg
          >Email Us
            <EmailIcon sx={{ ml: 1, mr: 1, }} className="border border-white rounded-full shadow shadow-white" />
          </ButtonImg>

        </a>
      </Stack>


    </Stack>
  );
};

export default ChatWithUs;
