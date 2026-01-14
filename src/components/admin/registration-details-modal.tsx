import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Registration } from "@shared/schema";

interface RegistrationDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    registration: Registration | null;
}

export function RegistrationDetailsModal({
    isOpen,
    onClose,
    registration,
}: RegistrationDetailsModalProps) {
    if (!registration) return null;

    let teamMembers: any[] = [];
    try {
        teamMembers = registration.teamMembers ? JSON.parse(registration.teamMembers) : [];
    } catch (e) {
        console.error("Failed to parse team members", e);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0A0A0F] border border-primary/20 text-white max-w-3xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 border-b border-white/10">
                    <DialogTitle className="text-2xl font-display uppercase tracking-widest text-primary flex items-center gap-4">
                        Registration Details
                        <Badge variant={registration.status === 'CONFIRMED' ? 'default' : 'secondary'} className="bg-primary/20 text-primary border-primary/50">
                            {registration.id.split('-')[0]}
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        {/* Event Info */}
                        <div className="space-y-4">
                            <h3 className="font-oxanium text-lg text-primary uppercase tracking-wide border-l-2 border-primary pl-3">Event Info</h3>
                            <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Event Name</p>
                                    <p className="font-bold">{registration.eventName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Type</p>
                                    <p className="font-bold">{registration.eventType}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Fee</p>
                                    <p className="font-bold">₹{registration.amountExpected}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Team Name</p>
                                    <p className="font-bold text-accent">{registration.teamName || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="space-y-4">
                            <h3 className="font-oxanium text-lg text-green-400 uppercase tracking-wide border-l-2 border-green-400 pl-3">Payment Status</h3>
                            <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Status</p>
                                    <p className={`font-mono font-bold ${registration.paymentStatus === 'PAID' ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {registration.paymentStatus}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Amount Paid</p>
                                    <p className="font-bold">₹{registration.amountPaid || 0}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-gray-400 text-xs uppercase">Order ID</p>
                                    <p className="font-mono text-xs">{registration.razorpayOrderId || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Team Leader / Registrant (Full Details) */}
                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <h3 className="font-oxanium text-lg text-white uppercase tracking-wide border-l-2 border-white pl-3">
                                {registration.eventType === 'Team' ? 'Team Leader' : 'Participant'} Details
                            </h3>
                            <div className="bg-white/5 p-6 rounded-lg border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Full Name</p>
                                    <p className="text-lg font-bold">{registration.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Email</p>
                                    <p className="text-primary font-mono">{registration.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Mobile</p>
                                    <p className="font-mono">{registration.mobile}</p>
                                </div>
                                <Separator className="col-span-full md:hidden bg-white/10" />
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">College</p>
                                    <p>{registration.college}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Branch</p>
                                    <p>{registration.branch}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Class/Year</p>
                                    <p>{registration.class} ({registration.academicYear})</p>
                                </div>
                            </div>
                        </div>

                        {/* Team Roster */}
                        {teamMembers.length > 1 && (
                            <div className="col-span-1 md:col-span-2 space-y-4">
                                <h3 className="font-oxanium text-lg text-secondary uppercase tracking-wide border-l-2 border-secondary pl-3">Team Roster</h3>
                                <div className="space-y-3">
                                    {teamMembers.map((member: any, index: number) => (
                                        <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10 flex flex-col md:flex-row justify-between gap-4">
                                            <div className="flex-1">
                                                <p className="text-xs text-secondary uppercase mb-1">Member {index + 1} {index === 0 && "(Leader)"}</p>
                                                <p className="font-bold text-lg">{member.fullName}</p>
                                                <p className="text-sm text-gray-400">{member.college}</p>
                                            </div>
                                            <div className="text-right flex flex-col justify-center">
                                                <p className="text-sm font-mono text-primary">{member.email}</p>
                                                <p className="text-sm font-mono text-gray-400">{member.mobile}</p>
                                                <p className="text-xs text-gray-500 mt-1">{member.branch} - {member.class} ({member.academicYear})</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="col-span-1 md:col-span-2 text-xs text-gray-500 font-mono pt-4 border-t border-white/10 flex justify-between">
                            <span>Created: {new Date(registration.createdAt).toLocaleString()}</span>
                            <span>ID: {registration.id}</span>
                        </div>

                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
