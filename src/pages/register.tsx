import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { insertRegistrationSchema, eventsConfig, type InsertRegistration } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import { NeonButton } from "@/components/ui/neon-button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Users, User, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function Register() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const [success, setSuccess] = useState(false);
    const [regId, setRegId] = useState<string>("");

    // Extend the type for local form handling to include the virtual array
    type RegistrationFormValues = InsertRegistration & {
        teamMembersArray: {
            fullName: string;
            email: string;
            mobile: string;
            class: string;
            branch: string;
            academicYear: string;
        }[];
    };

    const form = useForm<RegistrationFormValues>({
        resolver: zodResolver(insertRegistrationSchema),
        defaultValues: {
            fullName: "",
            email: "",
            mobile: "",
            college: "",
            class: "",
            branch: "",
            academicYear: "",
            eventName: "Code Red: Innixo Files", // Default
            eventType: "Team",
            teamName: "",
            teamLeader: "",
            teamMembers: "[]",
            teamMembersArray: []
        }
    });

    const selectedEventName = form.watch("eventName");
    const eventConfig = eventsConfig[selectedEventName as keyof typeof eventsConfig] || eventsConfig["Code Red: Innixo Files"];
    const isTeamEvent = eventConfig.type === "Team";

    // Auto-select event from URL query params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const eventParam = params.get("event");
        if (eventParam) {
            // Decode URI component to handle special characters
            const decodedEvent = decodeURIComponent(eventParam);
            // Verify if the event exists in config to avoid invalid selections
            if (Object.keys(eventsConfig).includes(decodedEvent)) {
                form.setValue("eventName", decodedEvent);
            }
        }
    }, []);

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "teamMembersArray"
    });

    const mutation = useMutation({
        mutationFn: async (data: InsertRegistration) => {
            const res = await apiRequest("POST", "/api/register", data);
            return res.json();
        },
        onSuccess: (data) => {
            setSuccess(true);
            setRegId(data.id);
            toast({
                title: "Registration Successful!",
                description: "Your spot has been reserved.",
                variant: "default",
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Registration Failed",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const onSubmit = (data: InsertRegistration & { teamMembersArray?: any[] }) => {
        // Override event type from config to ensure consistency
        data.eventType = eventConfig.type;

        // For individual events, clear team fields
        if (!isTeamEvent) {
            data.teamName = null;
            data.teamLeader = null;
            data.teamMembers = null;
        } else {
            // Auto-set team leader
            data.teamLeader = data.fullName;

            // Process team members from virtual field
            if (data.teamMembersArray && data.teamMembersArray.length > 0) {
                const members = data.teamMembersArray.filter((m: any) => m && (m.fullName || m.email));
                data.teamMembers = JSON.stringify(members);
            } else {
                data.teamMembers = "[]";
            }
        }

        // Remove the virtual field before sending to API
        const { teamMembersArray, ...submitData } = data;
        mutation.mutate(submitData as InsertRegistration);
    };

    // Handle Team Member UI logic (Not fully integrated into Zod schema as separate fields, passing as JSON)
    // In a real app, I'd update the Zod schema to complex object, but sticking to flat schema for simplicity as requested.
    // We will just store members as a JSON string in teamMembers

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Grids */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02))] z-0 bg-[length:100%_2px,20px_100%] pointer-events-none" />

            <div className="container max-w-4xl mx-auto relative z-10">
                <button onClick={() => setLocation("/")} className="flex items-center gap-2 text-gray-400 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Back to Home
                </button>

                {success ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center p-12 bg-white/5 border border-primary/20 rounded-2xl backdrop-blur-md"
                    >
                        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/50">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="font-orbitron font-bold text-4xl mb-4 text-white">Registration Confirmed!</h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-md">
                            Thank you for registering for <span className="text-secondary font-bold">{selectedEventName}</span>.
                        </p>
                        <div className="bg-black/50 p-4 rounded-lg border border-white/10 mb-8">
                            <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Registration ID</p>
                            <p className="font-mono text-2xl text-primary">{regId}</p>
                        </div>
                        <NeonButton onClick={() => setLocation("/")} variant="primary">Return Home</NeonButton>
                    </motion.div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Event Details */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card className="bg-white/5 border-white/10 backdrop-blur-md sticky top-24">
                                <CardHeader>
                                    <CardTitle className="font-orbitron text-xl text-primary">Event Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase">Selected Event</span>
                                        <p className="font-bold text-white text-lg">{selectedEventName}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-xs text-gray-500 uppercase">Type</span>
                                            <p className="text-gray-300">{eventConfig.type}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 uppercase">Entry Fee</span>
                                            <p className="text-accent font-bold">₹{eventConfig.fee}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 uppercase">Team Size</span>
                                            <p className="text-gray-300">{eventConfig.teamSize === 1 ? "Individual" : `Max ${eventConfig.teamSize}`}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Registration Form */}
                        <div className="lg:col-span-2">
                            <Card className="bg-white/5 border-white/10">
                                <CardHeader>
                                    <CardTitle className="font-orbitron text-2xl">Participant Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                                            console.error("Form Errors:", errors);
                                            toast({
                                                title: "Check form details",
                                                description: "Please fix the errors highlighted in red.",
                                                variant: "destructive"
                                            });
                                        })} className="space-y-6">

                                            {/* Event Selection */}
                                            <FormField
                                                control={form.control}
                                                name="eventName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Select Event</FormLabel>
                                                        <Select onValueChange={(val) => {
                                                            field.onChange(val);
                                                        }} value={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="bg-black/20 border-white/10">
                                                                    <SelectValue placeholder="Select an event" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {Object.keys(eventsConfig).map((evt) => (
                                                                    <SelectItem key={evt} value={evt}>{evt}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="fullName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Full Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="John Doe" {...field} className="bg-black/20 border-white/10" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="john@example.com" {...field} className="bg-black/20 border-white/10" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="mobile"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Mobile Number</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="+91 98765 43210" {...field} className="bg-black/20 border-white/10" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="academicYear"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Academic Year</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className="bg-black/20 border-white/10">
                                                                        <SelectValue placeholder="Select Year" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="FY">First Year (FY)</SelectItem>
                                                                    <SelectItem value="SY">Second Year (SY)</SelectItem>
                                                                    <SelectItem value="TY">Third Year (TY)</SelectItem>
                                                                    <SelectItem value="Final">Final Year</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="college"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>College Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Your Institute Name" {...field} className="bg-black/20 border-white/10" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="class"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Class/Division</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="CS-A" {...field} className="bg-black/20 border-white/10" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="branch"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Branch/Department</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Computer Science" {...field} className="bg-black/20 border-white/10" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {isTeamEvent && (
                                                <div className="pt-6 border-t border-white/10">
                                                    <h3 className="font-orbitron text-lg text-secondary mb-4 flex items-center gap-2">
                                                        <Users className="w-5 h-5" /> Team Details
                                                    </h3>

                                                    <FormField
                                                        control={form.control}
                                                        name="teamName"
                                                        render={({ field }) => (
                                                            <FormItem className="mb-4">
                                                                <FormLabel>Team Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="The Avengers" {...field} value={field.value || ""} className="bg-black/20 border-white/10" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className="space-y-6">
                                                        <div className="flex justify-between items-center">
                                                            <p className="text-sm text-gray-400">
                                                                <span className="text-primary font-bold">Note:</span> You are the Team Leader.
                                                                Add up to {eventConfig.teamSize - 1} more members.
                                                            </p>
                                                            <div className="text-xs text-gray-500">
                                                                {fields.length} / {eventConfig.teamSize - 1} Members Added
                                                            </div>
                                                        </div>

                                                        {fields.map((field, index) => (
                                                            <div key={field.id} className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-4 relative">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <h4 className="font-orbitron text-sm text-secondary">Member {index + 1}</h4>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => remove(index)}
                                                                        className="text-red-500 hover:text-red-400 text-xs uppercase"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>

                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`teamMembersArray.${index}.fullName` as any}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel className="text-xs">Full Name</FormLabel>
                                                                                <FormControl>
                                                                                    <Input placeholder="Member Name" {...field} className="bg-black/20 border-white/10 h-9 text-sm" />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`teamMembersArray.${index}.email` as any}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel className="text-xs">Email</FormLabel>
                                                                                <FormControl>
                                                                                    <Input placeholder="member@example.com" {...field} className="bg-black/20 border-white/10 h-9 text-sm" />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`teamMembersArray.${index}.mobile` as any}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel className="text-xs">Mobile</FormLabel>
                                                                                <FormControl>
                                                                                    <Input placeholder="+91..." {...field} className="bg-black/20 border-white/10 h-9 text-sm" />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`teamMembersArray.${index}.academicYear` as any}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel className="text-xs">Academic Year</FormLabel>
                                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                                    <FormControl>
                                                                                        <SelectTrigger className="bg-black/20 border-white/10 h-9 text-sm">
                                                                                            <SelectValue placeholder="Year" />
                                                                                        </SelectTrigger>
                                                                                    </FormControl>
                                                                                    <SelectContent>
                                                                                        <SelectItem value="FY">FY</SelectItem>
                                                                                        <SelectItem value="SY">SY</SelectItem>
                                                                                        <SelectItem value="TY">TY</SelectItem>
                                                                                        <SelectItem value="Final">Final</SelectItem>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`teamMembersArray.${index}.class` as any}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel className="text-xs">Class</FormLabel>
                                                                                <FormControl>
                                                                                    <Input placeholder="SE/TE" {...field} className="bg-black/20 border-white/10 h-9 text-sm" />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`teamMembersArray.${index}.branch` as any}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel className="text-xs">Branch</FormLabel>
                                                                                <FormControl>
                                                                                    <Input placeholder="Comp/IT" {...field} className="bg-black/20 border-white/10 h-9 text-sm" />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {fields.length < eventConfig.teamSize - 1 && (
                                                            <NeonButton
                                                                type="button"
                                                                variant="secondary"
                                                                className="w-full py-3 text-sm border-dashed border-secondary/50 bg-secondary/5 hover:bg-secondary/10"
                                                                onClick={() => append({ fullName: "", email: "", mobile: "", academicYear: "", class: "", branch: "" })}
                                                            >
                                                                + Add Team Member
                                                            </NeonButton>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="pt-6 border-t border-white/10">
                                                <div className="flex items-start space-x-3">
                                                    <Checkbox id="terms" required />
                                                    <div className="grid gap-1.5 leading-none">
                                                        <label
                                                            htmlFor="terms"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400"
                                                        >
                                                            I confirm that the above details are correct and I agree to the event rules.
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative z-50">
                                                <NeonButton
                                                    type="button"
                                                    onClick={(e) => {
                                                        console.log("DEBUG: NeonButton Clicked");
                                                        form.handleSubmit(
                                                            (data) => {
                                                                console.log("DEBUG: Validated Data", data);
                                                                onSubmit(data);
                                                            },
                                                            (errors) => {
                                                                console.error("DEBUG: Errors", errors);
                                                                toast({
                                                                    title: "Check form details",
                                                                    description: "Please fix the errors highlighted in red.",
                                                                    variant: "destructive"
                                                                });
                                                            }
                                                        )(e);
                                                    }}
                                                    variant="primary"
                                                    className="w-full text-lg py-6"
                                                    disabled={mutation.isPending}
                                                >
                                                    {mutation.isPending ? "Submitting..." : `Register & Pay ₹${eventConfig.fee}`}
                                                </NeonButton>
                                            </div>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
