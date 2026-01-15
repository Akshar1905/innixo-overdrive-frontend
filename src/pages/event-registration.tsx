// import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { getEventBySlug } from "@/lib/events";
import { MainLayout as Layout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, ChevronRight, UserPlus, Users } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { RegistrationSuccessModal } from "@/components/registration-success-modal";

// --- Schema Definition ---
// We create a flexible schema that validates based on the event's constraints
const memberSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  // Relaxed mobile validation: Allow 10-digit number, with optional +91 country code and spaces/dashes
  mobile: z.string().regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, "Invalid mobile number"),
  college: z.string().min(2, "College is required"),
  branch: z.string().min(2, "Branch is required"),
  class: z.string().min(1, "Class is required"),
  academicYear: z.string().min(1, "Year is required"),
});

const createRegistrationSchema = (minMembers: number, maxMembers: number) => z.object({
  teamName: maxMembers > 1 ? z.string().min(2, "Team Name is required") : z.string().optional(),
  members: z.array(memberSchema).min(minMembers, `Minimum ${minMembers} members required`).max(maxMembers, `Maximum ${maxMembers} members allowed`),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type RegistrationFormValues = z.infer<ReturnType<typeof createRegistrationSchema>>;

export default function EventRegistrationPage() {
  const [, params] = useRoute("/register/:slug");
  const { toast } = useToast();
  const slug = params?.slug;
  const event = getEventBySlug(slug || "");

  // Redirect or show 404 if event not found (handled by rendering null here)
  if (!event) return <div className="text-center text-red-500 pt-20">Event Not Found</div>;

  const minMembers = event.teamSize.min;
  const maxMembers = event.teamSize.max;
  const isTeamEvent = maxMembers > 1;

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(createRegistrationSchema(minMembers, maxMembers)),
    defaultValues: {
      teamName: "",
      members: Array(minMembers).fill({
        fullName: "",
        email: "",
        mobile: "",
        college: "",
        branch: "",
        class: "",
        academicYear: "",
      }),
      terms: true, // Default to true or false? usually false but let's see logic. Checkbox needs explicit check.
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  // State for success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ eventName: string; email: string } | null>(null);

  const mutation = useMutation({
    mutationFn: (data: RegistrationFormValues) => {
      // Structure payload for backend
      const payload = {
        // Required fields per schema
        fullName: data.members[0].fullName,
        email: data.members[0].email,
        mobile: data.members[0].mobile,
        college: data.members[0].college,
        class: data.members[0].class,
        branch: data.members[0].branch,
        academicYear: data.members[0].academicYear,

        eventName: event.title,
        eventType: event.type,

        teamName: data.teamName || "",
        teamLeader: data.members[0].fullName,
        teamMembers: JSON.stringify(data.members), // Stringify for backend storage
      };

      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      console.log(`[EventRegistration] Submitting to: ${baseUrl}/api/register`, payload);
      return apiRequest("POST", `${baseUrl}/api/register`, payload);
    },
    onSuccess: (_, variables) => {
      // Show success modal instead of just toast
      setSubmittedData({
        eventName: event.title,
        email: variables.members[0].email
      });
      setShowSuccessModal(true);

      // Optional: still show a small toast or rely on modal entirely.
      // Let's rely on modal for "modern ui".
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto pb-20 pt-32">
        <Link href="/register">
          <span className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 text-sm uppercase tracking-wider transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
          </span>
        </Link>

        {/* Event Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-8"
        >
          {/* Background Gradient or Image */}
          {event.image ? (
            <>
              <div className="absolute inset-0">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-40 blur-sm" />
              </div>
              <div className={`absolute inset-0 ${event.backgroundStyle} opacity-60 mix-blend-overlay pointer-events-none`} />
              <div className="absolute inset-0 bg-black/60 pointer-events-none" />
            </>
          ) : (
            <div className={`absolute inset-0 opacity-20 ${event.backgroundStyle} pointer-events-none`} />
          )}

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase neon-text-primary">
                {event.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded font-mono font-bold text-xl">
                  ₹{event.entryFee}
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              {event.shortDescription}
            </p>

            <div className="flex gap-6 mt-6 text-sm font-mono text-muted-foreground uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                Team Size: {minMembers === maxMembers ? minMembers : `${minMembers} - ${maxMembers}`}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Registration Open
              </div>
            </div>
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              {isTeamEvent && (
                <div className="glass-panel p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-display text-primary mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5" /> Team Details
                  </h3>
                  <FormField
                    control={form.control}
                    name="teamName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter unique team name" {...field} className="bg-black/50 border-white/10 focus:border-primary/50 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="space-y-6">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel p-6 rounded-lg border border-white/10 relative overflow-hidden"
                  >
                    {/* Decorative Number */}
                    <div className="absolute top-0 right-0 p-4 text-6xl font-display font-bold text-white/5 pointer-events-none">
                      {index + 1}
                    </div>

                    <h3 className="text-xl font-display text-secondary mb-6 flex items-center gap-2">
                      {index === 0 ? "Team Leader" : `Member ${index + 1}`}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name={`members.${index}.fullName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} className="bg-black/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`members.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@college.edu" {...field} className="bg-black/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`members.${index}.mobile`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                              <Input placeholder="9876543210" {...field} maxLength={10} className="bg-black/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`members.${index}.college`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>College Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Institute of Technology" {...field} className="bg-black/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`members.${index}.branch`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Branch</FormLabel>
                            <FormControl>
                              <Input placeholder="Computer Science" {...field} className="bg-black/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`members.${index}.class`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Class/Division</FormLabel>
                            <FormControl>
                              <Input placeholder="SE-A" {...field} className="bg-black/50 border-white/10 focus:border-primary/50 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`members.${index}.academicYear`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Academic Year</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-black/50 border-white/10 focus:border-primary/50 text-white">
                                  <SelectValue placeholder="Select Year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-card border-white/10 text-white">
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

                    {/* Remove Member Button (Only for non-mandatory members) */}
                    {index >= minMembers && (
                      <div className="mt-4 flex justify-end">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(index)}
                          className="bg-red-500/20 text-red-400 hover:bg-red-500/40"
                        >
                          Remove Member
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Add Member Button */}
              {fields.length < maxMembers && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed border-white/20 hover:border-primary hover:text-primary bg-transparent py-8 uppercase tracking-widest"
                  onClick={() => append({ fullName: "", email: "", mobile: "", college: "", branch: "", class: "", academicYear: "" })}
                >
                  <UserPlus className="w-4 h-4 mr-2" /> Add Team Member
                </Button>
              )}

              {/* Terms Checkbox */}
              <div className="glass-panel p-6 rounded-lg border border-white/10">
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value === true}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4 rounded border-white/30 bg-black/50 text-primary focus:ring-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I confirm that the above details are correct and I agree to the event rules.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full h-14 text-lg font-display uppercase tracking-widest bg-primary hover:bg-primary/90 text-black font-bold shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all hover:scale-[1.01]"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      Confirm Registration <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                <p className="text-center text-muted-foreground text-xs mt-4">
                  By clicking confirm, you agree to the event rules and regulations.
                </p>
              </div>

            </form>
          </Form>
        </motion.div>
      </div>

      {/* Success Modal */}
      {submittedData && (
        <RegistrationSuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          eventName={submittedData.eventName}
          email={submittedData.email}
        />
      )}
    </Layout>
  );
}
