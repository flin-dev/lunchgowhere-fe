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
import { createLocationSubmission } from "@/lib/roomService"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export const SubmissionDialog = ({ roomId }: { roomId: string }) => {
    const { toast } = useToast()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [reason, setReason] = useState("");

    const submitHandler = async () => {
        if (roomId) {
            console.log("submitting")
            try {
                const res = await createLocationSubmission({ name, description, reason }, roomId);
            } catch (error) {
                toast({
                    title: "Error",
                    description: (error as Error).message
                })
            }
        }
    }

    return (
        <div className="mx-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Submit Location</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Submit Lunch Location</DialogTitle>
                        <DialogDescription>
                            Fill up the form below to submit a lunch location.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Location" className="text-right">
                                Location
                            </Label>
                            <Input
                                id="Location"
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
                            <Textarea
                                id="reason"

                                defaultValue="Never been there before"
                                className="col-span-3"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={submitHandler}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}