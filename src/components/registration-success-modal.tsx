import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, Share2, Calendar, Mail } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface RegistrationSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventName: string;
    email: string;
}

export function RegistrationSuccessModal({
    isOpen,
    onClose,
    eventName,
    email,
}: RegistrationSuccessModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0A0A0F] border border-primary/20 text-white sm:max-w-md p-0 overflow-hidden shadow-[0_0_50px_rgba(var(--primary),0.3)]">
                {/* Animated Header Background */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />

                <div className="p-6 relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
                        className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-6 shadow-[0_0_20px_theme(colors.primary)]"
                    >
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                    </motion.div>

                    <DialogHeader className="mb-2">
                        <DialogTitle className="text-2xl font-display uppercase tracking-widest text-white text-center">
                            Registration <span className="text-primary">Confirmed</span>
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-gray-400 font-poppins text-sm mb-8 leading-relaxed">
                        You are officially registered for <br />
                        <span className="text-white font-bold text-lg font-oxanium">{eventName}</span>
                    </p>

                    <div className="w-full bg-white/5 rounded-lg border border-white/10 p-4 mb-8">
                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                            <Mail className="w-4 h-4 text-primary" />
                            <span className="truncate">{email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>Feb 4-6, 2026</span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                            <p className="text-xs text-gray-500 uppercase tracking-wider text-left">Next Steps</p>
                            <p className="text-xs text-start text-gray-300">Check your inbox for the confirmation email and ticket details.</p>
                        </div>
                    </div>

                    <DialogFooter className="flex-col gap-3 w-full sm:flex-col sm:space-x-0">
                        <Link href="/">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest h-12">
                                <Home className="w-4 h-4 mr-2" /> Back to Home
                            </Button>
                        </Link>

                        <Button variant="outline" onClick={onClose} className="w-full border-white/10 text-gray-400 hover:text-white hover:border-white/30 h-12 uppercase tracking-widest bg-transparent">
                            Close & Register Another
                        </Button>
                    </DialogFooter>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-[50px] pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none" />
            </DialogContent>
        </Dialog>
    );
}
