import { useTranslation } from 'react-i18next';
import { useState, useMemo, useEffect, useRef } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { companyData } from '@/data/company';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faYoutube,
  faInstagram,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);

  const contactFormSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, { message: t('contact.form.validation.nameRequired') || 'Required' }),
        company: z.string().optional(),
        email: z.string().email({ message: t('contact.form.validation.emailInvalid') || 'Invalid email' }),
        phone: z.string().optional(),
        service: z.string().min(1, { message: t('contact.form.validation.serviceRequired') || 'Required' }),
        message: z.string().min(10, { message: t('contact.form.validation.messageLength') || 'Min 10 chars' }),
        privacy: z.boolean().refine((val) => val === true, {
          message: t('contact.form.validation.privacyRequired') || 'Required'
        })
      }),
    [t, i18n.language]
  );

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      privacy: false
    }
  });

  useEffect(() => {
    form.clearErrors();
  }, [i18n.language, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof contactFormSchema>) => {
      const { privacy, ...contactData } = values;
      return await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactData),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.message'),
        variant: 'default'
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('contact.error.title'),
        description: error instanceof Error ? error.message : t('contact.error.message'),
        variant: 'destructive'
      });
    }
  });

  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll('.reveal-up');
    elements.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el as Element,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.08
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-28 md:py-36 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-cream" />
      <div className="absolute inset-0 mesh-gradient-italian opacity-40" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-48 h-48 border border-italian-green/10 rounded-full" />
      <div className="absolute bottom-32 left-16 w-32 h-32 bg-gold/5 rounded-full blur-2xl" />
      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-italian-green rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Asymmetric */}
        <div className="mb-16 lg:mb-20 max-w-2xl reveal-up">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold font-accent text-xs font-semibold uppercase tracking-[0.25em]">
              Get Started
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy font-display leading-[1.1] mb-6">
            Let's Start Your{' '}
            <span className="italic text-italian-green">Success Story</span>
          </h2>

          <p className="text-navy/60 font-body max-w-lg">
            {t('contact.subtitle', 'Book a free consultation and take the first step toward your business in Italy.')}
          </p>
        </div>

        {/* Content Grid - Asymmetric */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Form - Glassmorphism Card */}
          <div className="lg:w-[60%] reveal-up">
            <div className="glass-card p-8 lg:p-10 rounded-3xl">
              <h3 className="text-xl font-headline font-bold text-navy mb-2">
                {t('contact.form.title')}
              </h3>
              <p className="text-navy/50 text-sm mb-8">We typically reply within 24 hours.</p>

              <Form {...form}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit((values) => mutate(values))();
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
                            {t('contact.form.name')} *
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white/50 border-white/30 focus:border-italian-green"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
                            {t('contact.form.email')} *
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white/50 border-white/30 focus:border-italian-green"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
                            {t('contact.form.company')}
                          </FormLabel>
                          <FormControl>
                            <Input className="bg-white/50 border-white/30" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
                            {t('contact.form.phone')}
                          </FormLabel>
                          <FormControl>
                            <Input className="bg-white/50 border-white/30" type="tel" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
                          {t('contact.form.service')} *
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/50 border-white/30">
                              <SelectValue placeholder="Select a service..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="company_formation">Company Formation</SelectItem>
                            <SelectItem value="accounting">Tax & Accounting</SelectItem>
                            <SelectItem value="freelancer">Freelancer Services</SelectItem>
                            <SelectItem value="relocation">Relocation Support</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
                          {t('contact.form.message')} *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="bg-white/50 border-white/30 min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacy"
                    render={({ field }) => (
                      <FormItem className="flex items-start gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-navy/30 data-[state=checked]:bg-italian-green data-[state=checked]:border-italian-green rounded-sm"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-navy/60 font-normal leading-relaxed">
                          I agree to the{' '}
                          <a href="/privacy-policy" className="text-italian-green hover:underline">
                            Privacy Policy
                          </a>
                        </FormLabel>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-italian-green text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-italian-green-dark transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isPending ? 'Sending...' : t('contact.form.send')}
                    <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                  </button>
                </form>
              </Form>
            </div>
          </div>

          {/* Info Side */}
          <div className="lg:w-[40%] space-y-8">
            
            {/* Contact Cards */}
            <div className="reveal-up glass-card-dark p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">
                    Headquarters
                  </h4>
                  <p className="text-white font-body text-sm">
                    {companyData.address.city}, {companyData.address.country}
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm font-body leading-relaxed">
                {companyData.address.street}, {companyData.address.postalCode}
              </p>
            </div>

            <div className="reveal-up bg-white p-8 rounded-2xl shadow-lg border border-neutral-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-italian-green/10 flex items-center justify-center text-italian-green">
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-navy/40 mb-1">
                    Direct Contact
                  </h4>
                  <a href={`tel:${companyData.contact.phone.replace(/\s/g, '')}`} className="text-navy font-body text-sm hover:text-italian-green transition-colors">
                    {companyData.contact.phone}
                  </a>
                </div>
              </div>
              <a
                href={`mailto:${companyData.contact.email}`}
                className="text-italian-green text-sm font-body hover:underline"
              >
                {companyData.contact.email}
              </a>
            </div>

            <div className="reveal-up p-6 bg-cream rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                <FontAwesomeIcon icon={faClock} className="text-sm" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-navy/40 mb-1">
                  Response Time
                </h4>
                <p className="text-navy text-sm font-body">Within 24 hours</p>
              </div>
            </div>

            {/* Social */}
            <div className="reveal-up flex gap-4">
              {[
                { icon: faLinkedinIn, url: 'https://www.linkedin.com/company/partitaiva', label: 'LinkedIn' },
                { icon: faInstagram, url: 'https://www.instagram.com/partitaiva.it/', label: 'Instagram' },
                { icon: faWhatsapp, url: 'https://wa.me/39095643533', label: 'WhatsApp' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white border border-neutral-100 flex items-center justify-center text-navy/40 hover:text-white hover:bg-italian-green hover:border-italian-green transition-all duration-300 shadow-sm hover:shadow-lg magnetic"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
