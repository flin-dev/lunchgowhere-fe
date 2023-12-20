"use client"
import { Location } from "@/components/Location/Location";
import { Listing } from "@/components/Listing/Listing";
import { SubmissionDialog } from "@/components/SubmissionDialog/SubmissionDialog";
import React, { useState, } from 'react';
import {
    StompSessionProvider
} from "react-stomp-hooks";
import styles from './page.module.css'


export default function Home({ params }: { params: { roomId: string } }) {
    return (
        <StompSessionProvider
            url={"http://localhost:9090/sock"}
        >
            <main className="p-6 space-y-6">
                <Location roomId={params.roomId} />
                <SubmissionDialog />
                <Listing roomId={params.roomId} />
            </main>


        </StompSessionProvider>
    )
}