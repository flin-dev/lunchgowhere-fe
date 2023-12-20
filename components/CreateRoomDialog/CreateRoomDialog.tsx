"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { LocalDateTime } from "local-date";
import { createRoom } from "@/lib/roomService";
import { DateTimePicker } from "../DateTimePicker/DateTimePicker";

export const CreateRoomDialog = ({ refresh }: { refresh: Function }) => {
    const { toast } = useToast()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDateTime] = useState({
        date: new Date(), // Default to the current date and time
        hasTime: true // Set to true if you want to include time selection
    });
    const [open, setOpen] = useState(false);


    const handleDateTimeChange = ({ date, hasTime }: { date: Date, hasTime: boolean }) => {
        console.log(date);
        setDateTime({ date, hasTime });
    };

    const createRoomHandler = async () => {
        const trimDateTime = dateTime.date.toISOString().split('.')[0];
        const resp = await createRoom({
            name: name,
            description: description,
            //conver dateTime to localDateTime
            targetTime: new LocalDateTime(trimDateTime).toISOString()
        })

        if (resp.ok) {
            setName("");
            setDescription("");
            setDateTime({
                date: new Date(),
                hasTime: true
            });
            setOpen(false);
            refresh();
        } else {
            toast({ title: "Error", description: "Error creating room" })
        }
    }

    return (
        <div className="mx-2">
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>
                    <Button>Jio Ppl for lunch</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Create Session</DialogTitle>
                        <DialogDescription>
                            Fill up the form below to start Jio Ppl for lunch
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Session Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Hawker Marina Bay"
                                className="col-span-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                defaultValue="Famous hawker center in the heart of Singapore"
                                className="col-span-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reason" className="text-right">
                                Reason
                            </Label>

                            <DateTimePicker value={dateTime}
                                onChange={handleDateTimeChange} />
                            {/* <Textarea
                                id="reason"

                                defaultValue="Never been there before"
                                className="col-span-3"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)} */}
                            {/* /> */}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={createRoomHandler}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}