'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(1, 'Please enter your full name.'),
  countryCode: z.string().min(1, 'Country code is required.'),
  contactNumber: z.string().min(5, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  dateOfTravel: z.string().refine((dateString) => {
    if (!dateString) return false;
    const travelDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return travelDate >= today;
  }, { message: 'Please select a future travel date.' }),
  numberOfPeople: z.number().int().min(1, 'Number of people must be at least 1.'),
  hotelCategory: z.enum(['Standard', 'Deluxe', 'Luxury']),
  numberOfChildren: z.number().int().min(0, 'Cannot be negative.'),
});

type FormData = z.infer<typeof formSchema>;

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: '+91',
      numberOfPeople: 2,
      numberOfChildren: 0,
      hotelCategory: 'Deluxe',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong while submitting your enquiry.');
      }

      setIsSuccess(true);
      toast.success('Enquiry submitted successfully!');
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong while submitting your enquiry. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-100 h-full flex flex-col justify-center items-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Thank You!</h3>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Your travel enquiry has been received successfully. Our experiential travel expert will contact you within 24 hours to craft your journey.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          Plan Another Trip
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-teal-400"></div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan Your Trip</h2>
        <p className="text-gray-600">Fill in the details below and we&apos;ll get back to you with a custom itinerary.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            id="fullName"
            type="text"
            className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-gray-50 text-gray-900 placeholder-gray-500`}
            placeholder="John Doe"
            {...register('fullName')}
            disabled={isSubmitting}
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
            <select
              id="countryCode"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-900"
              {...register('countryCode')}
              disabled={isSubmitting}
            >
              <option value="+91" className="text-gray-900 bg-white">+91 (IN)</option>
              <option value="+1" className="text-gray-900 bg-white">+1 (US/CA)</option>
              <option value="+44" className="text-gray-900 bg-white">+44 (UK)</option>
              <option value="+61" className="text-gray-900 bg-white">+61 (AU)</option>
              <option value="+971" className="text-gray-900 bg-white">+971 (AE)</option>
            </select>
            {errors.countryCode && <p className="mt-1 text-sm text-red-600">{errors.countryCode.message}</p>}
          </div>
          <div className="md:col-span-3">
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
            <input
              id="contactNumber"
              type="tel"
              className={`w-full px-4 py-3 rounded-lg border ${errors.contactNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-gray-50 text-gray-900 placeholder-gray-500`}
              placeholder="9876543210"
              {...register('contactNumber')}
              disabled={isSubmitting}
            />
            {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input
            id="email"
            type="email"
            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-gray-50 text-gray-900 placeholder-gray-500`}
            placeholder="john@example.com"
            {...register('email')}
            disabled={isSubmitting}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Travel Date */}
        <div>
          <label htmlFor="dateOfTravel" className="block text-sm font-medium text-gray-700 mb-1">Date of Travel *</label>
          <input
            id="dateOfTravel"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 rounded-lg border ${errors.dateOfTravel ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-gray-50 text-gray-900`}
            {...register('dateOfTravel')}
            disabled={isSubmitting}
          />
          {errors.dateOfTravel && <p className="mt-1 text-sm text-red-600">{errors.dateOfTravel.message}</p>}
        </div>

        {/* Travelers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1">Number of Adults *</label>
            <input
              id="numberOfPeople"
              type="number"
              min="1"
              className={`w-full px-4 py-3 rounded-lg border ${errors.numberOfPeople ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-gray-50 text-gray-900 placeholder-gray-500`}
              {...register('numberOfPeople', { valueAsNumber: true })}
              disabled={isSubmitting}
            />
            {errors.numberOfPeople && <p className="mt-1 text-sm text-red-600">{errors.numberOfPeople.message}</p>}
          </div>
          <div>
            <label htmlFor="numberOfChildren" className="block text-sm font-medium text-gray-700 mb-1">Children (Optional)</label>
            <input
              id="numberOfChildren"
              type="number"
              min="0"
              className={`w-full px-4 py-3 rounded-lg border ${errors.numberOfChildren ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-gray-50 text-gray-900 placeholder-gray-500`}
              {...register('numberOfChildren', { valueAsNumber: true })}
              disabled={isSubmitting}
            />
            {errors.numberOfChildren && <p className="mt-1 text-sm text-red-600">{errors.numberOfChildren.message}</p>}
          </div>
        </div>

        {/* Hotel Category */}
        <div>
          <label htmlFor="hotelCategory" className="block text-sm font-medium text-gray-700 mb-1">Hotel Category *</label>
          <select
            id="hotelCategory"
            className={`w-full px-4 py-3 rounded-lg border ${errors.hotelCategory ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-gray-50 text-gray-900`}
            {...register('hotelCategory')}
            disabled={isSubmitting}
          >
            <option value="Standard" className="text-gray-900 bg-white">Standard (3 Star)</option>
            <option value="Deluxe" className="text-gray-900 bg-white">Deluxe (4 Star)</option>
            <option value="Luxury" className="text-gray-900 bg-white">Luxury (5 Star)</option>
          </select>
          {errors.hotelCategory && <p className="mt-1 text-sm text-red-600">{errors.hotelCategory.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Submitting...
            </>
          ) : (
            'Submit Enquiry'
          )}
        </button>
      </form>
    </div>
  );
}
