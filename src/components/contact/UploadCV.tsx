"use client";
import React, { MouseEvent } from 'react';
import { Container, Fab } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import styles from './contact.module.css';

const UploadCV = () => {
    const getFile = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const resume="https://new-master.s3.ca-central-1.amazonaws.com/static/files/Resume.pdf";
        try {
            // const a:HTMLAnchorElement = document.createElement("a");
            // a.style.display = "none";
            // a.href = resume;
            // a.download = "Resume";
            // a.id="download";
            // document.body.appendChild(a);
            // // a.download =resume;
            // a.type="application/pdf";
            window.open(resume,"_blank");
            
        } catch (error) {
            console.error(new Error("did not open"))
        }

    }
    return (
        <Container maxWidth={'md'} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Fab variant="extended"  onClick={(e) => getFile(e)}
                className={styles.Button}
                >
                    <CloudDownloadIcon sx={{mr:2}}/>
                    view
                </Fab>
        </Container>
    )
}

export default UploadCV