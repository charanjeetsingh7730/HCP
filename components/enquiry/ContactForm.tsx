'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ContactFormData, ContactFormSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

const SUBJECTS = ['Product enquiry', 'Price & availability', 'COA / documentation', 'Delivery & logistics', 'Other'];

export function ContactForm() {
  const { success, error: toastError } = useToast();
  const [sentRef, setSentRef] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { name: '', email: '', phone: '', company: '', subject: SUBJECTS[0], message: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Could not send your message.');
      setSentRef(json.referenceId);
      reset();
      success('Message sent', 'Our team will get back to you shortly.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error. Please try again.';
      setSubmitError(msg);
      toastError('Message not sent', msg);
    }
  };

  if (sentRef) {
    return (
      <div className="py-10 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf-50 text-leaf">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-xl font-bold">Thank you — your message has been sent</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-body">
          Reference <strong className="font-mono text-ink">{sentRef}</strong>. Our team will reply by email or phone.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSentRef(null)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      {submitError && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800 sm:col-span-2">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {submitError}
        </div>
      )}
      <div>
        <label className="label" htmlFor="c-name">
          Full name *
        </label>
        <input id="c-name" autoComplete="name" {...register('name')} className={clsx('field', errors.name && 'field-error')} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="label" htmlFor="c-company">
          Company
        </label>
        <input id="c-company" autoComplete="organization" {...register('company')} className="field" />
      </div>
      <div>
        <label className="label" htmlFor="c-email">
          Email *
        </label>
        <input id="c-email" type="email" autoComplete="email" {...register('email')} className={clsx('field', errors.email && 'field-error')} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label className="label" htmlFor="c-phone">
          Phone *
        </label>
        <input
          id="c-phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91"
          {...register('phone')}
          className={clsx('field', errors.phone && 'field-error')}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-subject">
          Subject *
        </label>
        <select id="c-subject" {...register('subject')} className="field cursor-pointer">
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-message">
          Message *
        </label>
        <textarea
          id="c-message"
          rows={5}
          {...register('message')}
          placeholder="Products, grades, quantities or any question…"
          className={clsx('field', errors.message && 'field-error')}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" isLoading={isSubmitting} rightIcon={<Send className="h-4 w-4" />} className="w-full sm:w-auto">
          Send Message
        </Button>
      </div>
    </form>
  );
}
