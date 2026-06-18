import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").or(z.literal("")).optional(),
  service: z.string().min(1, "Please select a service"),
  propertyType: z.string().optional(),
  bedrooms: z.string().optional(),
  postcode: z.string().min(2, "Please enter your postcode"),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          sourcePage: window.location.pathname,
        }),
      });

      if (response.ok) {
        toast.success("Quote request sent! We'll be in touch within 2 hours.", {
          description: "Check your inbox for a confirmation email.",
          duration: 6000,
        });
        reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again or use our contact form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const errorClass = "text-red-500 text-xs mt-1";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-900">Get Your Free Quote</h2>
        <p className="text-slate-500 text-sm mt-1">No-obligation estimate. We respond within 2 hours.</p>
        <div className="flex flex-wrap gap-3 mt-3">
          {["Free Quote", "Fully Insured", "5-Star Rated"].map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <input type="hidden" {...register("sourcePage")} />

        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Smith"
              className={inputClass}
              {...register("name")}
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="07700 900000"
              className={inputClass}
              {...register("phone")}
            />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>
        </div>

        {/* Row 2: Email + Postcode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClass}>Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className={inputClass}
              {...register("email")}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="postcode" className={labelClass}>
              Postcode <span className="text-red-500">*</span>
            </label>
            <input
              id="postcode"
              type="text"
              placeholder="UB8 1AB"
              className={`${inputClass} uppercase`}
              {...register("postcode")}
            />
            {errors.postcode && <p className={errorClass}>{errors.postcode.message}</p>}
          </div>
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className={labelClass}>
            Service Required <span className="text-red-500">*</span>
          </label>
          <select id="service" className={inputClass} {...register("service")}>
            <option value="">Select a service...</option>
            <option value="gutter-cleaning">Gutter Cleaning</option>
            <option value="gutter-repair">Gutter Repair</option>
            <option value="gutter-replacement">Gutter Replacement</option>
            <option value="fascia-soffit">Fascia &amp; Soffit</option>
            <option value="multiple">Not Sure / Multiple Services</option>
          </select>
          {errors.service && <p className={errorClass}>{errors.service.message}</p>}
        </div>

        {/* Row 3: Property Type + Bedrooms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="propertyType" className={labelClass}>Property Type</label>
            <select id="propertyType" className={inputClass} {...register("propertyType")}>
              <option value="">Select type...</option>
              <option value="terraced">Terraced</option>
              <option value="semi-detached">Semi-Detached</option>
              <option value="detached">Detached</option>
              <option value="flat">Flat / Apartment</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label htmlFor="bedrooms" className={labelClass}>Bedrooms</label>
            <select id="bedrooms" className={inputClass} {...register("bedrooms")}>
              <option value="">Select size...</option>
              <option value="studio">Studio</option>
              <option value="1-2">1–2 Bedrooms</option>
              <option value="3-4">3–4 Bedrooms</option>
              <option value="5+">5+ Bedrooms</option>
              <option value="na">N/A (Commercial)</option>
            </select>
          </div>
        </div>

        {/* Preferred Date */}
        <div>
          <label htmlFor="preferredDate" className={labelClass}>Preferred Date</label>
          <input
            id="preferredDate"
            type="date"
            className={inputClass}
            {...register("preferredDate")}
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass}>Additional Details</label>
          <textarea
            id="message"
            rows={3}
            placeholder="Any additional information about the job (optional)..."
            className={`${inputClass} resize-none`}
            {...register("message")}
          />
        </div>

        <p className="text-xs text-slate-400">
          <span className="text-red-500">*</span> Required fields
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-base"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Sending...
            </>
          ) : (
            <>
              Get My Free Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
